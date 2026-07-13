#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_WINDOW_DAYS = 28;
const DEFAULT_TOP = 12;

export function parseAnalyticsCsv(text) {
  const rows = parseCsv(text);
  const headers = rows.shift() || [];

  return rows
    .filter((row) => row.length && row.some(Boolean))
    .map((row) => {
      const record = Object.fromEntries(headers.map((header, index) => [header, row[index] || '']));
      return {
        project: record.project,
        source: record.source,
        dataset: record.dataset,
        rowNumber: Number(record.row_number || 0),
        data: JSON.parse(record.data_json || '{}'),
      };
    });
}

export function buildGrowthReport(records, options = {}) {
  const windowDays = Number(options.windowDays || DEFAULT_WINDOW_DAYS);
  const top = Number(options.top || DEFAULT_TOP);
  const sourcePath = options.sourcePath || '';
  const datasets = groupBy(records, (record) => record.dataset);

  const gscDaily = getDatasetRows(datasets, '_Graf').map(normalizeGscDaily).filter(Boolean);
  const ga4Daily = getDatasetRows(datasets, 'ga4_daily').map(normalizeGa4Daily).filter(Boolean);
  const pageQueries = getDatasetRows(datasets, '_PageQuery')
    .concat(getDatasetRows(datasets, '_QueryPage'))
    .map(normalizePageQuery)
    .filter(Boolean);
  const queries = getDatasetRows(datasets, '_Dopyty').map(normalizeGscQuery).filter(Boolean);
  const pages = getDatasetRows(datasets, '_Strany').map(normalizeGscPage).filter(Boolean);
  const ga4Events = getDatasetRows(datasets, 'ga4_events').map(normalizeGa4Event).filter(Boolean);
  const ga4Channels = getDatasetRows(datasets, 'ga4_channels').map(normalizeGa4Channel).filter(Boolean);
  const ga4Pages = getDatasetRows(datasets, 'ga4_pages').map(normalizeGa4Page).filter(Boolean);
  const landingPages = getDatasetRows(datasets, 'ga4_landing_pages').map(normalizeGa4LandingPage).filter(Boolean);
  const clarity = getDatasetRows(datasets, 'clarity-live-insights').map(normalizeClarityMetric).filter(Boolean);
  const exportSummary = getDatasetRows(datasets, 'commerce_export_summary').map(normalizeCommerceExportSummary).filter(Boolean);
  const stripeCheckoutSessions = getDatasetRows(datasets, 'stripe_checkout_sessions').map(normalizeStripeCheckoutSession).filter(Boolean);
  const stripePaymentIntents = getDatasetRows(datasets, 'stripe_payment_intents').map(normalizeStripePaymentIntent).filter(Boolean);
  const supabaseOrders = getDatasetRows(datasets, 'supabase_orders').map(normalizeSupabaseOrder).filter(Boolean);
  const supabaseSubscribers = getDatasetRows(datasets, 'supabase_email_subscribers').map(normalizeSupabaseSubscriber).filter(Boolean);
  const supabaseFollowups = getDatasetRows(datasets, 'supabase_email_followups').map(normalizeSupabaseFollowup).filter(Boolean);
  const exportedDatasets = new Set(exportSummary.filter((row) => row.status === 'ok').map((row) => row.dataset));
  const datasetExported = (dataset) => datasets.has(dataset) || exportedDatasets.has(dataset);

  const gscWindows = aggregateGscWindows(gscDaily, windowDays);
  const ga4Windows = aggregateGa4Windows(ga4Daily, windowDays);
  const commerceWindows = aggregateCommerceWindows({
    stripeCheckoutSessions,
    stripePaymentIntents,
    supabaseOrders,
    supabaseSubscribers,
    supabaseFollowups,
    windowDays,
  });
  const subscriberSources = summarizeSubscriberSources(
    filterRowsByRange(supabaseSubscribers, commerceWindows.currentRange),
    top
  );

  const searchOpportunities = buildSearchOpportunities(pageQueries, queries, top);
  const nonBrandOpportunities = searchOpportunities
    .filter((row) => !isBrandQuery(row.query))
    .slice(0, top);
  const lowCtrQueries = queries
    .filter((query) => query.impressions >= 20 && query.position <= 10 && query.ctr < 0.03)
    .sort((a, b) => opportunityScore(b) - opportunityScore(a))
    .slice(0, top);
  const strikingDistance = queries
    .filter((query) => query.impressions >= 10 && query.position > 3 && query.position <= 20)
    .sort((a, b) => a.position - b.position || b.impressions - a.impressions)
    .slice(0, top);

  const noisyPages = ga4Pages
    .filter((page) => page.sessions >= 10 && page.engagementRate <= 0.1)
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, top);

  const dataGaps = [];
  if (!datasetExported('stripe_checkout_sessions') && !datasetExported('stripe_payment_intents')) {
    dataGaps.push('Stripe export not present in this CSV, so successful payments cannot be proven from this file.');
  }
  if (!datasetExported('supabase_orders')) {
    dataGaps.push('Supabase orders export not present in this CSV, so saved orders cannot be proven from this file.');
  }
  if (!datasetExported('supabase_email_subscribers')) {
    dataGaps.push('Supabase subscriber export not present in this CSV, so lead capture volume cannot be proven from this file.');
  }
  if (!ga4Events.some((event) => /purchase/i.test(event.event))) {
    dataGaps.push('GA4 purchase event is missing or has zero exported rows.');
  }

  return {
    generatedAt: new Date().toISOString(),
    sourcePath,
    windowDays,
    datasets: Object.fromEntries([...datasets.entries()].map(([name, rows]) => [name, rows.length])),
    gsc: {
      ...gscWindows,
      topQueries: queries.slice(0, top),
      topPages: pages.slice(0, top),
    },
    ga4: {
      ...ga4Windows,
      events: ga4Events,
      channels: ga4Channels,
      pages: ga4Pages.slice(0, top),
      landingPages: landingPages.slice(0, top),
    },
    clarity,
    commerce: { ...commerceWindows, exportSummary },
    subscriberSources,
    searchOpportunities,
    nonBrandOpportunities,
    lowCtrQueries,
    strikingDistance,
    noisyPages,
    dataGaps,
  };
}

export function renderMarkdown(report) {
  const searchVerdict = verdict(
    report.gsc.delta.clicks > 0,
    report.gsc.delta.clicks === 0,
    `Search clicks improved by ${formatDelta(report.gsc.delta.clicks)}.`,
    `Search clicks did not improve (${formatDelta(report.gsc.delta.clicks)}).`
  );
  const sessionVerdict = verdict(
    report.ga4.delta.sessions > 0,
    report.ga4.delta.sessions === 0,
    `Sessions improved by ${formatDelta(report.ga4.delta.sessions)}.`,
    `Sessions did not improve (${formatDelta(report.ga4.delta.sessions)}).`
  );
  const commerceRevenue = Math.max(report.commerce.current.stripeRevenue, report.commerce.current.supabaseRevenue);
  const revenueVerdict = report.ga4.current.revenue > 0
    ? `Revenue was recorded in GA4: ${money(report.ga4.current.revenue)}.`
    : commerceRevenue > 0
      ? `Revenue was recorded in commerce exports: ${money(commerceRevenue)}.`
      : 'No revenue was recorded in the exported GA4 or commerce rows.';

  return `# Astralo Weekly Growth Report

Source: ${report.sourcePath || 'not provided'}
Generated: ${report.generatedAt}
Window: last ${report.windowDays} available days vs previous ${report.windowDays} days

## Did We Improve?

- ${searchVerdict}
- ${sessionVerdict}
- ${revenueVerdict}

## Scorecard

| Metric | Previous | Current | Change |
| --- | ---: | ---: | ---: |
| GSC clicks | ${num(report.gsc.previous.clicks)} | ${num(report.gsc.current.clicks)} | ${formatDelta(report.gsc.delta.clicks)} |
| GSC impressions | ${num(report.gsc.previous.impressions)} | ${num(report.gsc.current.impressions)} | ${formatDelta(report.gsc.delta.impressions)} |
| GSC CTR | ${pct(report.gsc.previous.ctr)} | ${pct(report.gsc.current.ctr)} | ${formatPctPointDelta(report.gsc.delta.ctr)} |
| GSC avg position | ${decimal(report.gsc.previous.position)} | ${decimal(report.gsc.current.position)} | ${formatPositionDelta(report.gsc.delta.position)} |
| GA4 sessions | ${num(report.ga4.previous.sessions)} | ${num(report.ga4.current.sessions)} | ${formatDelta(report.ga4.delta.sessions)} |
| GA4 engaged sessions | ${num(report.ga4.previous.engagedSessions)} | ${num(report.ga4.current.engagedSessions)} | ${formatDelta(report.ga4.delta.engagedSessions)} |
| GA4 engagement rate | ${pct(report.ga4.previous.engagementRate)} | ${pct(report.ga4.current.engagementRate)} | ${formatPctPointDelta(report.ga4.delta.engagementRate)} |
| GA4 revenue | ${money(report.ga4.previous.revenue)} | ${money(report.ga4.current.revenue)} | ${money(report.ga4.delta.revenue)} |
| Stripe paid checkouts | ${num(report.commerce.previous.stripePaidCheckouts)} | ${num(report.commerce.current.stripePaidCheckouts)} | ${formatDelta(report.commerce.delta.stripePaidCheckouts)} |
| Supabase completed orders | ${num(report.commerce.previous.supabaseCompletedOrders)} | ${num(report.commerce.current.supabaseCompletedOrders)} | ${formatDelta(report.commerce.delta.supabaseCompletedOrders)} |
| Email subscribers | ${num(report.commerce.previous.subscribers)} | ${num(report.commerce.current.subscribers)} | ${formatDelta(report.commerce.delta.subscribers)} |

## Commerce Funnel

| Metric | Previous | Current | Change |
| --- | ---: | ---: | ---: |
| Stripe paid checkouts | ${num(report.commerce.previous.stripePaidCheckouts)} | ${num(report.commerce.current.stripePaidCheckouts)} | ${formatDelta(report.commerce.delta.stripePaidCheckouts)} |
| Stripe unpaid/expired checkouts | ${num(report.commerce.previous.stripeUnpaidCheckouts)} | ${num(report.commerce.current.stripeUnpaidCheckouts)} | ${formatDelta(report.commerce.delta.stripeUnpaidCheckouts)} |
| Stripe revenue | ${money(report.commerce.previous.stripeRevenue)} | ${money(report.commerce.current.stripeRevenue)} | ${money(report.commerce.delta.stripeRevenue)} |
| Supabase saved orders | ${num(report.commerce.previous.supabaseOrders)} | ${num(report.commerce.current.supabaseOrders)} | ${formatDelta(report.commerce.delta.supabaseOrders)} |
| Supabase completed orders | ${num(report.commerce.previous.supabaseCompletedOrders)} | ${num(report.commerce.current.supabaseCompletedOrders)} | ${formatDelta(report.commerce.delta.supabaseCompletedOrders)} |
| Supabase order revenue | ${money(report.commerce.previous.supabaseRevenue)} | ${money(report.commerce.current.supabaseRevenue)} | ${money(report.commerce.delta.supabaseRevenue)} |
| Product emails sent | ${num(report.commerce.previous.orderEmailsSent)} | ${num(report.commerce.current.orderEmailsSent)} | ${formatDelta(report.commerce.delta.orderEmailsSent)} |
| Completed orders missing product email | ${num(report.commerce.previous.completedOrdersMissingEmail)} | ${num(report.commerce.current.completedOrdersMissingEmail)} | ${formatDelta(report.commerce.delta.completedOrdersMissingEmail)} |
| Email subscribers | ${num(report.commerce.previous.subscribers)} | ${num(report.commerce.current.subscribers)} | ${formatDelta(report.commerce.delta.subscribers)} |
| Followups sent | ${num(report.commerce.previous.followupsSent)} | ${num(report.commerce.current.followupsSent)} | ${formatDelta(report.commerce.delta.followupsSent)} |

## Exported Commerce Totals

| Metric | Total |
| --- | ---: |
| Stripe paid checkouts | ${num(report.commerce.all.stripePaidCheckouts)} |
| Stripe unpaid/expired checkouts | ${num(report.commerce.all.stripeUnpaidCheckouts)} |
| Stripe revenue | ${money(report.commerce.all.stripeRevenue)} |
| Supabase saved orders | ${num(report.commerce.all.supabaseOrders)} |
| Supabase completed orders | ${num(report.commerce.all.supabaseCompletedOrders)} |
| Supabase order revenue | ${money(report.commerce.all.supabaseRevenue)} |
| Product emails sent | ${num(report.commerce.all.orderEmailsSent)} |
| Completed orders missing product email | ${num(report.commerce.all.completedOrdersMissingEmail)} |
| Email subscribers | ${num(report.commerce.all.subscribers)} |
| Followups sent | ${num(report.commerce.all.followupsSent)} |

Integrity checks:

- Paid Stripe checkouts missing Supabase orders in current window: ${num(report.commerce.integrity.paidCheckoutsMissingOrders)}
- Paid Stripe checkouts missing Supabase orders in all exported rows: ${num(report.commerce.integrity.allPaidCheckoutsMissingOrders)}
- Supabase orders missing Stripe checkout rows in current window: ${num(report.commerce.integrity.ordersMissingStripeCheckouts)}
- Supabase orders missing Stripe checkout rows in all exported rows: ${num(report.commerce.integrity.allOrdersMissingStripeCheckouts)}

## Email Subscriber Sources

${table(
  ['Source', 'Language', 'Subscribers'],
  report.subscriberSources,
  (row) => [row.source, row.lang, num(row.count)]
)}

## Search Opportunities

${table(
  ['Query', 'Page', 'Clicks', 'Impressions', 'CTR', 'Position'],
  report.searchOpportunities,
  (row) => [
    row.query,
    shortUrl(row.page),
    num(row.clicks),
    num(row.impressions),
    pct(row.ctr),
    decimal(row.position),
  ]
)}

## Non-Brand Opportunities

${table(
  ['Query', 'Page', 'Clicks', 'Impressions', 'CTR', 'Position'],
  report.nonBrandOpportunities,
  (row) => [
    row.query,
    shortUrl(row.page),
    num(row.clicks),
    num(row.impressions),
    pct(row.ctr),
    decimal(row.position),
  ]
)}

## Low CTR Queries

${table(
  ['Query', 'Clicks', 'Impressions', 'CTR', 'Position'],
  report.lowCtrQueries,
  (row) => [row.query, num(row.clicks), num(row.impressions), pct(row.ctr), decimal(row.position)]
)}

## Striking Distance Queries

${table(
  ['Query', 'Clicks', 'Impressions', 'CTR', 'Position'],
  report.strikingDistance,
  (row) => [row.query, num(row.clicks), num(row.impressions), pct(row.ctr), decimal(row.position)]
)}

## GA4 Events

${table(
  ['Event', 'Count', 'Users'],
  report.ga4.events,
  (row) => [row.event, num(row.count), num(row.users)]
)}

## GA4 Channels

${table(
  ['Channel', 'Sessions', 'Engaged', 'Engagement', 'Revenue'],
  report.ga4.channels,
  (row) => [row.channel, num(row.sessions), num(row.engagedSessions), pct(row.engagementRate), money(row.revenue)]
)}

## Possible Noise / UX Watchlist

${table(
  ['Page', 'Sessions', 'Engagement', 'Revenue'],
  report.noisyPages,
  (row) => [shortUrl(row.page), num(row.sessions), pct(row.engagementRate), money(row.revenue)]
)}

## Data Gaps

${report.dataGaps.length ? report.dataGaps.map((gap) => `- ${gap}`).join('\n') : '- No obvious data gaps in this export.'}

## Next Actions

${nextActions(report).map((action) => `- ${action}`).join('\n')}
`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

function getDatasetRows(datasets, suffix) {
  return [...datasets.entries()]
    .filter(([name]) => name === suffix || name.endsWith(suffix))
    .flatMap(([, records]) => records.map((record) => record.data));
}

function normalizeGscDaily(row) {
  const date = row['Dátum'] || row.Date;
  if (!date) return null;
  const clicks = number(row['Kliknutia'] ?? row.Clicks);
  const impressions = number(row['Zobrazenia'] ?? row.Impressions);
  return {
    date,
    clicks,
    impressions,
    ctr: ratioOrValue(row.MP ?? row.CTR, clicks, impressions),
    position: number(row['Pozícia'] ?? row.Position),
  };
}

function normalizeGa4Daily(row) {
  const date = normalizeGa4Date(row.Date || row['Dátum']);
  if (!date) return null;
  return {
    date,
    sessions: number(row.Sessions ?? row['Relácie']),
    users: number(row['Total users'] ?? row.Users ?? row['Používatelia']),
    newUsers: number(row['New users']),
    engagedSessions: number(row['Engaged sessions'] ?? row['Relácie s interakciou']),
    eventCount: number(row['Event count'] ?? row['Počet udalostí']),
    revenue: number(row['Total revenue'] ?? row['Celkové výnosy']),
  };
}

function normalizePageQuery(row) {
  const query = row.Query || row['Najlepšie dopyty'];
  const page = row.Page || row['Najlepšie stránky'];
  if (!query || !page) return null;
  const clicks = number(row.Clicks ?? row['Kliknutia']);
  const impressions = number(row.Impressions ?? row['Zobrazenia']);
  return {
    query,
    page,
    clicks,
    impressions,
    ctr: ratioOrValue(row.CTR ?? row.MP, clicks, impressions),
    position: number(row.Position ?? row['Pozícia']),
  };
}

function normalizeGscQuery(row) {
  const query = row['Najlepšie dopyty'] || row.Query;
  if (!query) return null;
  const clicks = number(row['Kliknutia'] ?? row.Clicks);
  const impressions = number(row['Zobrazenia'] ?? row.Impressions);
  return {
    query,
    clicks,
    impressions,
    ctr: ratioOrValue(row.MP ?? row.CTR, clicks, impressions),
    position: number(row['Pozícia'] ?? row.Position),
  };
}

function normalizeGscPage(row) {
  const page = row['Najlepšie stránky'] || row.Page;
  if (!page) return null;
  const clicks = number(row['Kliknutia'] ?? row.Clicks);
  const impressions = number(row['Zobrazenia'] ?? row.Impressions);
  return {
    page,
    clicks,
    impressions,
    ctr: ratioOrValue(row.MP ?? row.CTR, clicks, impressions),
    position: number(row['Pozícia'] ?? row.Position),
  };
}

function normalizeGa4Event(row) {
  const event = row.Event || row.eventName;
  if (!event) return null;
  return {
    event,
    count: number(row['Event count'] ?? row.eventCount),
    users: number(row['Total users'] ?? row.totalUsers ?? row.Users),
  };
}

function normalizeGa4Channel(row) {
  const channel = row['Hlavná skupina kanálov relácie (Predvolená skupina kanálov)'] || row.Channel;
  if (!channel) return null;
  const sessions = number(row['Relácie'] ?? row.Sessions);
  const engagedSessions = number(row['Relácie s interakciou'] ?? row['Engaged sessions']);
  return {
    channel,
    sessions,
    engagedSessions,
    engagementRate: ratioOrValue(row['Miera interakcie'] ?? row['Engagement rate'], engagedSessions, sessions),
    eventCount: number(row['Počet udalostí'] ?? row['Event count']),
    revenue: number(row['Celkové výnosy'] ?? row['Total revenue']),
  };
}

function normalizeGa4Page(row) {
  const page = row.Page;
  if (!page) return null;
  const sessions = number(row.Sessions);
  return {
    page,
    views: number(row.Views),
    users: number(row['Total users']),
    sessions,
    engagementRate: ratioOrValue(row['Engagement rate'], 0, sessions),
    revenue: number(row['Total revenue']),
  };
}

function normalizeGa4LandingPage(row) {
  const page = row['Vstupná stránka'] || row['Landing page'] || row.Page;
  if (!page) return null;
  const sessions = number(row['Relácie'] ?? row.Sessions);
  return {
    page,
    sessions,
    engagementRate: ratioOrValue(row['Miera interakcie'] ?? row['Engagement rate'], 0, sessions),
    revenue: number(row['Celkové výnosy'] ?? row['Total revenue']),
  };
}

function normalizeClarityMetric(row) {
  if (!row.metricName || !Array.isArray(row.information)) return null;
  const total = row.information.reduce((sum, item) => sum + number(item.subTotal || item.sessionsCount || item.totalSessionCount), 0);
  return { metric: row.metricName, total, rows: row.information.length };
}

function normalizeCommerceExportSummary(row) {
  const dataset = row.dataset;
  if (!dataset) return null;
  return {
    source: row.source || '',
    dataset,
    status: row.status || 'ok',
    rowCount: number(row.row_count ?? row.rowCount),
    message: row.message || '',
  };
}

function normalizeStripeCheckoutSession(row) {
  const id = row.id || row.session_id || row.stripe_session_id;
  const date = normalizeDate(row.created_at || row.created);
  if (!id || !date) return null;
  const metadata = row.metadata || {};
  const status = row.status || '';
  const paymentStatus = row.payment_status || row.paymentStatus || '';
  const amount = centsToMoney(row.amount_total ?? row.amountTotal ?? row.amount);

  return {
    id,
    date,
    status,
    paymentStatus,
    amount,
    currency: row.currency || 'eur',
    productKey: metadata.productKey || metadata.product_key || row.product_key || row.productKey || '',
    lang: metadata.lang || row.lang || 'en',
    isPaid: status === 'complete' && paymentStatus === 'paid',
    isUnpaid: paymentStatus !== 'paid' || ['expired', 'open'].includes(status),
  };
}

function normalizeStripePaymentIntent(row) {
  const id = row.id || row.payment_intent || row.stripe_payment_intent_id;
  const date = normalizeDate(row.created_at || row.created);
  if (!id || !date) return null;
  const status = row.status || '';
  const amount = centsToMoney(row.amount_received ?? row.amountReceived ?? row.amount);

  return {
    id,
    date,
    status,
    amount,
    currency: row.currency || 'eur',
    isPaid: status === 'succeeded',
  };
}

function normalizeSupabaseOrder(row) {
  const id = row.id || row.order_id;
  const date = normalizeDate(row.created_at || row.createdAt);
  if (!id || !date) return null;
  const status = row.status || '';

  return {
    id,
    date,
    stripeSessionId: row.stripe_session_id || row.stripeSessionId || '',
    stripePaymentIntentId: row.stripe_payment_intent_id || row.stripePaymentIntentId || '',
    status,
    amount: centsToMoney(row.amount),
    currency: row.currency || 'eur',
    productKey: row.product_key || row.productKey || '',
    lang: row.lang || 'en',
    emailSent: Boolean(row.email_sent_at || row.emailSentAt),
    isCompleted: status === 'completed',
  };
}

function normalizeSupabaseSubscriber(row) {
  const email = row.email || row.email_hash || row.emailHash || (row.email_present || row.emailPresent ? 'redacted' : '');
  const date = normalizeDate(row.subscribed_at || row.subscribedAt || row.created_at || row.createdAt);
  if (!email || !date) return null;

  return {
    email,
    date,
    source: row.source || 'website',
    lang: row.lang || 'en',
  };
}

function normalizeSupabaseFollowup(row) {
  const email = row.email || row.email_hash || row.emailHash || (row.email_present || row.emailPresent ? 'redacted' : '');
  const date = normalizeDate(row.sent_at || row.sentAt || row.scheduled_for || row.scheduledFor);
  if (!email || !date) return null;

  return {
    email,
    date,
    stepKey: row.step_key || row.stepKey || '',
    sent: Boolean(row.sent_at || row.sentAt),
    failed: Boolean(row.failed || row.last_error || row.lastError),
  };
}

function aggregateGscWindows(rows, windowDays) {
  const { currentRows, previousRows, currentRange, previousRange } = splitWindows(rows, windowDays);
  const current = aggregateGsc(currentRows);
  const previous = aggregateGsc(previousRows);
  return { current, previous, delta: diffObjects(current, previous), currentRange, previousRange };
}

function aggregateGa4Windows(rows, windowDays) {
  const { currentRows, previousRows, currentRange, previousRange } = splitWindows(rows, windowDays);
  const current = aggregateGa4(currentRows);
  const previous = aggregateGa4(previousRows);
  return { current, previous, delta: diffObjects(current, previous), currentRange, previousRange };
}

function aggregateCommerceWindows({
  stripeCheckoutSessions,
  stripePaymentIntents,
  supabaseOrders,
  supabaseSubscribers,
  supabaseFollowups,
  windowDays,
}) {
  const datedRows = [
    ...stripeCheckoutSessions,
    ...stripePaymentIntents,
    ...supabaseOrders,
    ...supabaseSubscribers,
    ...supabaseFollowups,
  ].filter((row) => row.date);

  const { currentRange, previousRange } = splitWindows(datedRows, windowDays);
  const currentRows = filterCommerceRows({
    range: currentRange,
    stripeCheckoutSessions,
    stripePaymentIntents,
    supabaseOrders,
    supabaseSubscribers,
    supabaseFollowups,
  });
  const previousRows = filterCommerceRows({
    range: previousRange,
    stripeCheckoutSessions,
    stripePaymentIntents,
    supabaseOrders,
    supabaseSubscribers,
    supabaseFollowups,
  });

  const current = aggregateCommerce(currentRows);
  const previous = aggregateCommerce(previousRows);
  const all = aggregateCommerce({
    stripeCheckoutSessions,
    stripePaymentIntents,
    supabaseOrders,
    supabaseSubscribers,
    supabaseFollowups,
  });
  const paidSessionIds = new Set(currentRows.stripeCheckoutSessions.filter((session) => session.isPaid).map((session) => session.id));
  const allPaidSessionIds = new Set(stripeCheckoutSessions.filter((session) => session.isPaid).map((session) => session.id));
  const allOrderSessionIds = new Set(supabaseOrders.map((order) => order.stripeSessionId).filter(Boolean));
  const currentOrderSessionIds = new Set(currentRows.supabaseOrders.map((order) => order.stripeSessionId).filter(Boolean));

  const allPaidCheckoutsMissingOrders = [...allPaidSessionIds].filter((sessionId) => !allOrderSessionIds.has(sessionId)).length;
  const allOrdersMissingStripeCheckouts = stripeCheckoutSessions.length
    ? [...allOrderSessionIds].filter((sessionId) => !allPaidSessionIds.has(sessionId)).length
    : 0;

  return {
    current,
    previous,
    all,
    delta: diffObjects(current, previous),
    currentRange,
    previousRange,
    integrity: {
      paidCheckoutsMissingOrders: [...paidSessionIds].filter((sessionId) => !allOrderSessionIds.has(sessionId)).length,
      allPaidCheckoutsMissingOrders,
      ordersMissingStripeCheckouts: stripeCheckoutSessions.length
        ? [...currentOrderSessionIds].filter((sessionId) => !allPaidSessionIds.has(sessionId)).length
        : 0,
      allOrdersMissingStripeCheckouts,
    },
  };
}

function filterCommerceRows({
  range,
  stripeCheckoutSessions,
  stripePaymentIntents,
  supabaseOrders,
  supabaseSubscribers,
  supabaseFollowups,
}) {
  const inRange = (row) => Boolean(range && row.date >= range.start && row.date <= range.end);
  return {
    stripeCheckoutSessions: stripeCheckoutSessions.filter(inRange),
    stripePaymentIntents: stripePaymentIntents.filter(inRange),
    supabaseOrders: supabaseOrders.filter(inRange),
    supabaseSubscribers: supabaseSubscribers.filter(inRange),
    supabaseFollowups: supabaseFollowups.filter(inRange),
  };
}

function filterRowsByRange(rows, range) {
  if (!range) return [];
  return rows.filter((row) => row.date >= range.start && row.date <= range.end);
}

function summarizeSubscriberSources(subscribers, top) {
  const groups = new Map();

  for (const subscriber of subscribers) {
    const source = subscriber.source || 'website';
    const lang = subscriber.lang || 'en';
    const key = `${source}\u0000${lang}`;
    const existing = groups.get(key) || { source, lang, count: 0 };
    existing.count += 1;
    groups.set(key, existing);
  }

  return [...groups.values()]
    .sort((left, right) => right.count - left.count || left.source.localeCompare(right.source) || left.lang.localeCompare(right.lang))
    .slice(0, top);
}

function splitWindows(rows, windowDays) {
  if (!rows.length) {
    return { currentRows: [], previousRows: [], currentRange: null, previousRange: null };
  }
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted.at(-1).date;
  const currentStart = addDays(latest, -(windowDays - 1));
  const previousEnd = addDays(currentStart, -1);
  const previousStart = addDays(previousEnd, -(windowDays - 1));

  return {
    currentRows: sorted.filter((row) => row.date >= currentStart && row.date <= latest),
    previousRows: sorted.filter((row) => row.date >= previousStart && row.date <= previousEnd),
    currentRange: { start: currentStart, end: latest },
    previousRange: { start: previousStart, end: previousEnd },
  };
}

function aggregateGsc(rows) {
  const clicks = sum(rows, 'clicks');
  const impressions = sum(rows, 'impressions');
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: weightedAverage(rows, 'position', 'impressions'),
  };
}

function aggregateGa4(rows) {
  const sessions = sum(rows, 'sessions');
  const engagedSessions = sum(rows, 'engagedSessions');
  return {
    sessions,
    users: sum(rows, 'users'),
    newUsers: sum(rows, 'newUsers'),
    engagedSessions,
    eventCount: sum(rows, 'eventCount'),
    revenue: sum(rows, 'revenue'),
    engagementRate: sessions ? engagedSessions / sessions : 0,
  };
}

function aggregateCommerce(rows) {
  const paidCheckouts = rows.stripeCheckoutSessions.filter((session) => session.isPaid);
  const unpaidCheckouts = rows.stripeCheckoutSessions.filter((session) => !session.isPaid && session.isUnpaid);
  const paidIntents = rows.stripePaymentIntents.filter((intent) => intent.isPaid);
  const completedOrders = rows.supabaseOrders.filter((order) => order.isCompleted);
  const completedOrdersMissingEmail = completedOrders.filter((order) => !order.emailSent);
  const followupsSent = rows.supabaseFollowups.filter((followup) => followup.sent);
  const followupsFailed = rows.supabaseFollowups.filter((followup) => followup.failed);
  const checkoutRevenue = sum(paidCheckouts, 'amount');
  const paymentIntentRevenue = sum(paidIntents, 'amount');

  return {
    stripePaidCheckouts: paidCheckouts.length,
    stripeUnpaidCheckouts: unpaidCheckouts.length,
    stripeSucceededPaymentIntents: paidIntents.length,
    stripeRevenue: checkoutRevenue || paymentIntentRevenue,
    supabaseOrders: rows.supabaseOrders.length,
    supabaseCompletedOrders: completedOrders.length,
    supabaseRevenue: sum(completedOrders, 'amount'),
    orderEmailsSent: rows.supabaseOrders.filter((order) => order.emailSent).length,
    completedOrdersMissingEmail: completedOrdersMissingEmail.length,
    subscribers: rows.supabaseSubscribers.length,
    followupsSent: followupsSent.length,
    followupsFailed: followupsFailed.length,
  };
}

function buildSearchOpportunities(pageQueries, queries, top) {
  const sourceRows = pageQueries.length
    ? dedupeBy(pageQueries, (row) => `${row.query} ${row.page}`)
    : queries.map((query) => ({ ...query, page: '' }));

  return sourceRows
    .filter((row) => row.impressions >= 10 && row.position <= 20)
    .sort((a, b) => opportunityScore(b) - opportunityScore(a))
    .slice(0, top);
}

function opportunityScore(row) {
  const zeroClickBoost = row.clicks === 0 ? 2 : 1;
  const positionBoost = Math.max(0.5, 21 - Math.min(row.position || 21, 21));
  return row.impressions * Math.max(0.05, 1 - row.ctr) * zeroClickBoost * positionBoost;
}

function nextActions(report) {
  const actions = [];
  const topOpportunity = report.nonBrandOpportunities[0] || report.searchOpportunities[0];
  if (topOpportunity) {
    actions.push(`Update and internally link the page for "${topOpportunity.query}" (${shortUrl(topOpportunity.page) || 'best matching page'}).`);
  }
  if (report.lowCtrQueries.length) {
    actions.push('Rewrite titles/descriptions for low-CTR queries already ranking on page 1.');
  }
  if (report.commerce.integrity.paidCheckoutsMissingOrders > 0 || report.commerce.integrity.allPaidCheckoutsMissingOrders > 0) {
    actions.push('Investigate paid Stripe checkouts that did not create Supabase order rows.');
  }
  if (report.commerce.current.stripeUnpaidCheckouts > 0) {
    actions.push('Review unpaid or expired Checkout Sessions for checkout UX/payment friction.');
  }
  if (report.commerce.current.subscribers > 0 && report.commerce.current.supabaseCompletedOrders === 0) {
    actions.push('Improve subscriber follow-up and product CTAs because leads are not turning into completed orders yet.');
  }
  if (report.commerce.all.completedOrdersMissingEmail > 0) {
    actions.push('Review completed orders missing product email delivery before driving more paid traffic.');
  }
  if (report.ga4.current.revenue === 0 && report.commerce.current.stripeRevenue === 0 && report.commerce.current.supabaseRevenue === 0) {
    actions.push('Keep testing checkout, purchase tracking, Stripe webhooks, and Supabase order creation until revenue/orders appear in reports.');
  }
  if (report.noisyPages.length) {
    actions.push('Separate low-engagement direct/bot traffic from organic decisions.');
  }
  if (report.dataGaps.length) {
    const missingStripe = report.dataGaps.some((gap) => gap.startsWith('Stripe export'));
    const missingSupabase = report.dataGaps.some((gap) => gap.startsWith('Supabase'));
    if (missingStripe && missingSupabase) {
      actions.push('Add Stripe and Supabase exports to the weekly report input so traffic can be tied to paid orders.');
    } else if (missingSupabase) {
      actions.push('Fix or update Supabase export credentials so saved orders and subscribers appear in the weekly report.');
    } else if (missingStripe) {
      actions.push('Add Stripe export rows so checkout/payment status appears in the weekly report.');
    }
  }
  return actions.length ? actions : ['Keep monitoring the same report weekly and prioritize pages with rising impressions but weak CTR.'];
}

function isBrandQuery(query) {
  const normalized = String(query || '').toLowerCase().trim();
  return ['astralo', 'atrolo', 'астроло'].some((brand) => normalized.includes(brand));
}

function dedupeBy(rows, keyFn) {
  const seen = new Set();
  const result = [];
  for (const row of rows) {
    const key = keyFn(row);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(row);
  }
  return result;
}

function diffObjects(current, previous) {
  return Object.fromEntries(Object.keys(current).map((key) => [key, current[key] - (previous[key] || 0)]));
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + number(row[key]), 0);
}

function weightedAverage(rows, valueKey, weightKey) {
  const weight = sum(rows, weightKey);
  if (!weight) return 0;
  return rows.reduce((total, row) => total + number(row[valueKey]) * number(row[weightKey]), 0) / weight;
}

function number(value) {
  const parsed = Number(String(value ?? '').replace('%', '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function centsToMoney(value) {
  return number(value) / 100;
}

function ratioOrValue(value, numerator, denominator) {
  const parsed = number(value);
  if (parsed) return parsed > 1 ? parsed / 100 : parsed;
  return denominator ? numerator / denominator : 0;
}

function normalizeDate(value) {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'number' || /^\d+$/.test(String(value))) {
    const numeric = Number(value);
    const milliseconds = numeric > 10_000_000_000 ? numeric : numeric * 1000;
    return new Date(milliseconds).toISOString().slice(0, 10);
  }
  const raw = String(value);
  if (/^\d{8}$/.test(raw)) return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  return '';
}

function normalizeGa4Date(value) {
  const raw = String(value || '');
  if (/^\d{8}$/.test(raw)) return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  return raw;
}

function addDays(date, days) {
  const parsed = new Date(`${date}T00:00:00Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

function verdict(ok, neutral, okText, badText) {
  if (neutral) return okText.replace('improved by +0', 'was flat');
  return ok ? okText : badText;
}

function table(headers, rows, mapRow) {
  if (!rows.length) return '_No rows._';
  const header = `| ${headers.join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${mapRow(row).map(escapeCell).join(' | ')} |`);
  return [header, divider, ...body].join('\n');
}

function escapeCell(value) {
  return String(value ?? '').replaceAll('|', '\\|');
}

function shortUrl(value) {
  return String(value || '').replace(/^https?:\/\/astralo\.online\/?/, '/');
}

function num(value) {
  return Math.round(number(value)).toLocaleString('en-US');
}

function decimal(value) {
  return number(value).toFixed(2);
}

function pct(value) {
  return `${(number(value) * 100).toFixed(2)}%`;
}

function formatDelta(value) {
  const rounded = Math.round(number(value));
  return `${rounded >= 0 ? '+' : ''}${rounded.toLocaleString('en-US')}`;
}

function formatPctPointDelta(value) {
  const points = number(value) * 100;
  return `${points >= 0 ? '+' : ''}${points.toFixed(2)} pp`;
}

function formatPositionDelta(value) {
  const current = number(value);
  return `${current <= 0 ? '' : '+'}${current.toFixed(2)}`;
}

function money(value) {
  return `€${number(value).toFixed(2)}`;
}

function parseArgs(values) {
  const args = {};
  for (const value of values) {
    const match = value.match(/^--([^=]+)=(.*)$/);
    if (!match) continue;
    const [, key, parsedValue] = match;
    if (args[key] === undefined) {
      args[key] = parsedValue;
    } else if (Array.isArray(args[key])) {
      args[key].push(parsedValue);
    } else {
      args[key] = [args[key], parsedValue];
    }
  }
  return args;
}

function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.csv) {
    console.error('Usage: node scripts/weekly_growth_report.mjs --csv=path/to/export.csv [--csv=commerce.csv] [--out=reports/growth.md] [--window=28] [--top=12]');
    process.exitCode = 2;
    return;
  }

  const csvPaths = [args.csv].flat().map((csvPath) => path.resolve(csvPath));
  const records = csvPaths.flatMap((csvPath) => parseAnalyticsCsv(fs.readFileSync(csvPath, 'utf8')));
  const report = buildGrowthReport(records, {
    sourcePath: csvPaths.join(', '),
    windowDays: Number(args.window || DEFAULT_WINDOW_DAYS),
    top: Number(args.top || DEFAULT_TOP),
  });
  const markdown = renderMarkdown(report);

  if (args.out) {
    const outPath = path.resolve(args.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, markdown, 'utf8');
    console.log(`Wrote ${outPath}`);
  } else {
    console.log(markdown);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) runCli();
