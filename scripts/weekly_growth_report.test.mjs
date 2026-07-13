import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildGrowthReport,
  parseAnalyticsCsv,
  renderMarkdown,
} from './weekly_growth_report.mjs';

function csvRow(source, dataset, rowNumber, data) {
  const json = JSON.stringify(data).replaceAll('"', '""');
  return `Astralo,${source},${dataset},${rowNumber},"${json}"`;
}

test('builds a current-vs-previous growth report from exported analytics CSV rows', () => {
  const csv = [
    'project,source,dataset,row_number,data_json',
    csvRow('gsc', 'gsc_https_astralo_online_Graf', 1, { 'Dátum': '2026-05-01', 'Kliknutia': '1', 'Zobrazenia': '20', 'MP': '0.05', 'Pozícia': '10' }),
    csvRow('gsc', 'gsc_https_astralo_online_Graf', 2, { 'Dátum': '2026-05-02', 'Kliknutia': '2', 'Zobrazenia': '40', 'MP': '0.05', 'Pozícia': '8' }),
    csvRow('gsc', 'gsc_https_astralo_online_Graf', 3, { 'Dátum': '2026-05-03', 'Kliknutia': '4', 'Zobrazenia': '45', 'MP': '0.0888', 'Pozícia': '6' }),
    csvRow('gsc', 'gsc_https_astralo_online_Graf', 4, { 'Dátum': '2026-05-04', 'Kliknutia': '5', 'Zobrazenia': '45', 'MP': '0.1111', 'Pozícia': '5' }),
    csvRow('gsc', 'gsc_https_astralo_online_Dopyty', 1, { 'Najlepšie dopyty': 'astralo', 'Kliknutia': '1', 'Zobrazenia': '100', 'MP': '0.01', 'Pozícia': '3.5' }),
    csvRow('gsc', 'gsc_https_astralo_online_PageQuery', 1, { Page: 'https://astralo.online/pt', Query: 'melhor horóscopo personalizado online 2026', Clicks: '0', Impressions: '37', CTR: '0', Position: '3.32' }),
    csvRow('ga4', 'ga4_daily', 1, { Date: '20260501', Sessions: '8', 'Total users': '8', 'Engaged sessions': '4', 'Event count': '20', 'Total revenue': '0' }),
    csvRow('ga4', 'ga4_daily', 2, { Date: '20260502', Sessions: '12', 'Total users': '12', 'Engaged sessions': '6', 'Event count': '30', 'Total revenue': '0' }),
    csvRow('ga4', 'ga4_daily', 3, { Date: '20260503', Sessions: '7', 'Total users': '7', 'Engaged sessions': '1', 'Event count': '15', 'Total revenue': '0' }),
    csvRow('ga4', 'ga4_daily', 4, { Date: '20260504', Sessions: '8', 'Total users': '8', 'Engaged sessions': '1', 'Event count': '15', 'Total revenue': '0' }),
    csvRow('ga4', 'ga4_events', 1, { Event: 'form_start', 'Event count': '4', 'Total users': '4' }),
    csvRow('ga4', 'ga4_events', 2, { Event: 'sign_up', 'Event count': '1', 'Total users': '1' }),
    csvRow('stripe', 'stripe_checkout_sessions', 1, { id: 'cs_paid', created: '2026-05-04T10:00:00.000Z', status: 'complete', payment_status: 'paid', amount_total: 499, currency: 'eur', metadata: { productKey: 'monthly', lang: 'pt' } }),
    csvRow('stripe', 'stripe_checkout_sessions', 2, { id: 'cs_unpaid', created: '2026-05-04T11:00:00.000Z', status: 'expired', payment_status: 'unpaid', amount_total: 199, currency: 'eur', metadata: { productKey: 'weekly', lang: 'en' } }),
    csvRow('stripe', 'stripe_checkout_sessions', 3, { id: 'cs_paid_099', created: '2026-05-04T12:00:00.000Z', status: 'complete', payment_status: 'paid', amount_total: 99, currency: 'eur', metadata: { productKey: 'quick', lang: 'en' } }),
    csvRow('supabase', 'supabase_orders', 1, { id: 'ord_1', stripe_session_id: 'cs_paid', created_at: '2026-05-04T10:02:00.000Z', status: 'completed', amount: 499, currency: 'eur', product_key: 'monthly', lang: 'pt', email_sent_at: '2026-05-04T10:03:00.000Z' }),
    csvRow('supabase', 'supabase_orders', 2, { id: 'ord_2', stripe_session_id: 'cs_paid_099', created_at: '2026-05-04T12:02:00.000Z', status: 'completed', amount: 99, currency: 'eur', product_key: 'quick', lang: 'en', email_sent_at: '2026-05-04T12:03:00.000Z' }),
    csvRow('supabase', 'supabase_email_subscribers', 1, { email: 'lead@example.com', source: 'inline_blog', lang: 'pt', subscribed_at: '2026-05-04T09:00:00.000Z' }),
    csvRow('supabase', 'supabase_email_followups', 1, { email: 'lead@example.com', step_key: 'day_1_weekly', scheduled_for: '2026-05-05T09:00:00.000Z', sent_at: '2026-05-05T09:01:00.000Z' }),
    csvRow('export', 'commerce_export_summary', 1, { source: 'supabase', dataset: 'supabase_orders', status: 'ok', row_count: 2 }),
  ].join('\n');

  const records = parseAnalyticsCsv(csv);
  const report = buildGrowthReport(records, { windowDays: 2, top: 5, sourcePath: 'sample.csv' });
  const markdown = renderMarkdown(report);

  assert.equal(report.gsc.current.clicks, 9);
  assert.equal(report.gsc.previous.clicks, 3);
  assert.equal(report.gsc.delta.clicks, 6);
  assert.equal(report.ga4.current.sessions, 15);
  assert.equal(report.ga4.previous.sessions, 20);
  assert.equal(report.commerce.current.stripePaidCheckouts, 2);
  assert.equal(report.commerce.current.stripeUnpaidCheckouts, 1);
  assert.equal(report.commerce.current.stripeRevenue, 5.98);
  assert.equal(report.commerce.current.supabaseCompletedOrders, 2);
  assert.equal(report.commerce.current.supabaseRevenue, 5.98);
  assert.equal(report.commerce.current.completedOrdersMissingEmail, 0);
  assert.equal(report.commerce.all.stripePaidCheckouts, 2);
  assert.equal(report.commerce.all.supabaseCompletedOrders, 2);
  assert.equal(report.commerce.current.subscribers, 1);
  assert.deepEqual(report.subscriberSources[0], { source: 'inline_blog', lang: 'pt', count: 1 });
  assert.equal(report.commerce.integrity.paidCheckoutsMissingOrders, 0);
  assert.equal(report.commerce.integrity.allPaidCheckoutsMissingOrders, 0);
  assert.equal(report.searchOpportunities[0].query, 'melhor horóscopo personalizado online 2026');
  assert.match(markdown, /Did We Improve/);
  assert.match(markdown, /melhor horóscopo personalizado online 2026/);
  assert.match(markdown, /Commerce Funnel/);
  assert.match(markdown, /Exported Commerce Totals/);
  assert.match(markdown, /Email Subscriber Sources/);
  assert.match(markdown, /inline_blog/);
  assert.match(markdown, /Stripe paid checkouts/);
  assert.match(markdown, /form_start/);
});

test('does not report a data gap when an exported commerce table has zero rows', () => {
  const csv = [
    'project,source,dataset,row_number,data_json',
    csvRow('gsc', 'gsc_https_astralo_online_Graf', 1, { 'Dátum': '2026-05-04', 'Kliknutia': '1', 'Zobrazenia': '20', 'MP': '0.05', 'Pozícia': '10' }),
    csvRow('ga4', 'ga4_daily', 1, { Date: '20260504', Sessions: '1', 'Total users': '1', 'Engaged sessions': '1', 'Event count': '1', 'Total revenue': '0' }),
    csvRow('stripe', 'stripe_checkout_sessions', 1, { id: 'cs_unpaid', created: '2026-05-04T11:00:00.000Z', status: 'expired', payment_status: 'unpaid', amount_total: 199, currency: 'eur', metadata: {} }),
    csvRow('export', 'commerce_export_summary', 1, { source: 'stripe', dataset: 'stripe_checkout_sessions', status: 'ok', row_count: 1 }),
    csvRow('export', 'commerce_export_summary', 2, { source: 'stripe', dataset: 'stripe_payment_intents', status: 'ok', row_count: 0 }),
    csvRow('export', 'commerce_export_summary', 3, { source: 'supabase', dataset: 'supabase_orders', status: 'ok', row_count: 0 }),
    csvRow('export', 'commerce_export_summary', 4, { source: 'supabase', dataset: 'supabase_email_subscribers', status: 'ok', row_count: 0 }),
    csvRow('export', 'commerce_export_summary', 5, { source: 'supabase', dataset: 'supabase_email_followups', status: 'ok', row_count: 0 }),
  ].join('\n');

  const records = parseAnalyticsCsv(csv);
  const report = buildGrowthReport(records, { windowDays: 1, top: 5, sourcePath: 'sample.csv' });

  assert.equal(report.commerce.current.supabaseCompletedOrders, 0);
  assert.ok(!report.dataGaps.some((gap) => gap.startsWith('Supabase orders')));
  assert.ok(!report.dataGaps.some((gap) => gap.startsWith('Supabase subscriber')));
});

test('flags paid Stripe checkouts missing Supabase orders across all exported rows', () => {
  const csv = [
    'project,source,dataset,row_number,data_json',
    csvRow('gsc', 'gsc_https_astralo_online_Graf', 1, { 'Dátum': '2026-05-04', 'Kliknutia': '1', 'Zobrazenia': '20', 'MP': '0.05', 'Pozícia': '10' }),
    csvRow('ga4', 'ga4_daily', 1, { Date: '20260504', Sessions: '1', 'Total users': '1', 'Engaged sessions': '1', 'Event count': '1', 'Total revenue': '0' }),
    csvRow('stripe', 'stripe_checkout_sessions', 1, { id: 'cs_paid_missing', created: '2026-05-04T11:00:00.000Z', status: 'complete', payment_status: 'paid', amount_total: 199, currency: 'eur', metadata: {} }),
    csvRow('export', 'commerce_export_summary', 1, { source: 'stripe', dataset: 'stripe_checkout_sessions', status: 'ok', row_count: 1 }),
    csvRow('export', 'commerce_export_summary', 2, { source: 'supabase', dataset: 'supabase_orders', status: 'ok', row_count: 0 }),
  ].join('\n');

  const records = parseAnalyticsCsv(csv);
  const report = buildGrowthReport(records, { windowDays: 1, top: 5, sourcePath: 'sample.csv' });
  const markdown = renderMarkdown(report);

  assert.equal(report.commerce.integrity.paidCheckoutsMissingOrders, 1);
  assert.equal(report.commerce.integrity.allPaidCheckoutsMissingOrders, 1);
  assert.match(markdown, /missing Supabase orders in all exported rows: 1/);
});
