#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const DEFAULT_SITE = 'https://astralo.online';
const DEFAULT_MEASUREMENT_ID = 'G-M4VCEJ31XV';

const args = parseArgs(process.argv.slice(2));
const site = args.site || process.env.GSC_SITE_URL || DEFAULT_SITE;
const measurementId = args.measurement || process.env.GA4_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID;
const explicitProperty = args.property || process.env.GA4_PROPERTY_ID;

const token = getAccessToken();
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const windowDates = getWindowDates(args);

try {
  const gscSite = await findGscSite(site);
  const ga4Property = explicitProperty
    ? normalizeProperty(explicitProperty)
    : await findGa4Property(measurementId);

  const [gsc, ga4] = await Promise.all([
    fetchGscReport(gscSite, windowDates),
    fetchGa4Report(ga4Property, windowDates),
  ]);

  printReport({
    site: gscSite,
    ga4Property,
    measurementId,
    windowDates,
    gsc,
    ga4,
  });
} catch (error) {
  if (isScopeError(error)) {
    console.error(`Google auth is missing read-only GSC/GA4 scopes.

Run this once, finish the browser login, then rerun this script:

gcloud auth application-default login --scopes="openid,email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/analytics.readonly"

Then:

npm run pull:growth
`);
    process.exitCode = 2;
  } else {
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

function parseArgs(values) {
  const parsed = {};
  for (const value of values) {
    const match = value.match(/^--([^=]+)=(.*)$/);
    if (match) parsed[match[1]] = match[2];
  }
  return parsed;
}

function getAccessToken() {
  try {
    return runGcloud(['auth', 'application-default', 'print-access-token']).trim();
  } catch {
    return runGcloud(['auth', 'print-access-token']).trim();
  }
}

function runGcloud(args) {
  if (process.platform === 'win32') {
    return execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', `gcloud ${args.map(psQuote).join(' ')}`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  }

  return execFileSync('gcloud', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
}

function psQuote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function getWindowDates(options) {
  const end = options.end ? parseDate(options.end) : addDays(todayUtc(), -2);
  const start = options.start ? parseDate(options.start) : inferPostStart(end);
  const days = diffDays(start, end) + 1;
  const previousEnd = addDays(start, -1);
  const previousStart = addDays(previousEnd, -(days - 1));

  return {
    current: { start: formatDate(start), end: formatDate(end) },
    previous: { start: formatDate(previousStart), end: formatDate(previousEnd) },
    days,
  };
}

function inferPostStart(end) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const start = addDays(parseDate(iso.slice(0, 10)), 1);
    if (start <= end) return start;
  } catch {
    // Fall back below when git metadata is unavailable.
  }
  return addDays(end, -6);
}

async function findGscSite(targetSite) {
  const data = await googleJson('https://www.googleapis.com/webmasters/v3/sites');
  const sites = data.siteEntry || [];
  const candidates = [
    targetSite,
    targetSite.endsWith('/') ? targetSite.slice(0, -1) : `${targetSite}/`,
    `sc-domain:${new URL(targetSite).hostname.replace(/^www\./, '')}`,
  ];

  const match = sites.find((entry) => candidates.includes(entry.siteUrl));
  if (!match) {
    const available = sites.map((entry) => `- ${entry.siteUrl}`).join('\n') || 'No GSC sites returned.';
    throw new Error(`Could not find a matching GSC property for ${targetSite}.\n\nAvailable:\n${available}`);
  }

  return match.siteUrl;
}

async function findGa4Property(targetMeasurementId) {
  const summaries = await googleJson('https://analyticsadmin.googleapis.com/v1beta/accountSummaries');
  const properties = (summaries.accountSummaries || []).flatMap((account) => account.propertySummaries || []);

  for (const property of properties) {
    const streams = await googleJson(`https://analyticsadmin.googleapis.com/v1beta/${property.property}/dataStreams`);
    const found = (streams.dataStreams || []).some((stream) => {
      return stream.webStreamData?.measurementId === targetMeasurementId;
    });
    if (found) return property.property;
  }

  const available = properties.map((property) => `- ${property.property} ${property.displayName}`).join('\n') || 'No GA4 properties returned.';
  throw new Error(`Could not find GA4 property for measurement ID ${targetMeasurementId}.\n\nAvailable:\n${available}`);
}

async function fetchGscReport(gscSite, dates) {
  const siteId = encodeURIComponent(gscSite);
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${siteId}/searchAnalytics/query`;

  const [current, previous, pages, queries, countries] = await Promise.all([
    gscQuery(endpoint, dates.current),
    gscQuery(endpoint, dates.previous),
    gscQuery(endpoint, dates.current, ['page'], 10),
    gscQuery(endpoint, dates.current, ['query'], 10),
    gscQuery(endpoint, dates.current, ['country'], 10),
  ]);

  return { current, previous, pages, queries, countries };
}

async function fetchGa4Report(property, dates) {
  const metrics = await availableGa4Metrics(property, [
    'activeUsers',
    'sessions',
    'screenPageViews',
    'eventCount',
    'keyEvents',
    'totalRevenue',
    'ecommercePurchases',
  ]);

  const [current, previous, pages, events] = await Promise.all([
    ga4RunReport(property, dates.current, metrics),
    ga4RunReport(property, dates.previous, metrics),
    ga4RunReport(property, dates.current, ['screenPageViews', 'activeUsers'], ['pagePath'], 10),
    ga4RunReport(property, dates.current, ['eventCount', 'keyEvents'].filter((metric) => metrics.includes(metric)), ['eventName'], 20),
  ]);

  return { current, previous, pages, events, metrics };
}

async function availableGa4Metrics(property, desired) {
  const metadata = await googleJson(`https://analyticsdata.googleapis.com/v1beta/${property}/metadata`);
  const available = new Set((metadata.metrics || []).map((metric) => metric.apiName));
  return desired.filter((metric) => available.has(metric));
}

async function gscQuery(endpoint, range, dimensions = [], rowLimit = 1) {
  const body = {
    startDate: range.start,
    endDate: range.end,
    dimensions,
    rowLimit,
    dataState: 'final',
  };
  const data = await googleJson(endpoint, { method: 'POST', body });
  return dimensions.length ? data.rows || [] : data.rows?.[0] || zeroGscRow();
}

async function ga4RunReport(property, range, metrics, dimensions = [], limit = 1) {
  if (!metrics.length) return dimensions.length ? [] : {};
  const body = {
    dateRanges: [{ startDate: range.start, endDate: range.end }],
    metrics: metrics.map((name) => ({ name })),
    dimensions: dimensions.map((name) => ({ name })),
    limit,
    orderBys: metrics.includes('activeUsers')
      ? [{ metric: { metricName: 'activeUsers' }, desc: true }]
      : [{ metric: { metricName: metrics[0] }, desc: true }],
  };
  const data = await googleJson(`https://analyticsdata.googleapis.com/v1beta/${property}:runReport`, {
    method: 'POST',
    body,
  });

  if (dimensions.length) return data.rows || [];
  const values = data.rows?.[0]?.metricValues || [];
  return Object.fromEntries(metrics.map((metric, index) => [metric, Number(values[index]?.value || 0)]));
}

async function googleJson(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const error = new Error(data.error?.message || `Google API error: ${response.status}`);
    error.status = response.status;
    error.details = data.error;
    throw error;
  }

  return data;
}

function printReport(report) {
  const { windowDates, gsc, ga4 } = report;
  console.log(`# Astralo Google Growth Report

Current window: ${windowDates.current.start} to ${windowDates.current.end}
Previous window: ${windowDates.previous.start} to ${windowDates.previous.end}
GSC property: ${report.site}
GA4 property: ${report.ga4Property}
GA4 measurement ID: ${report.measurementId}

## GSC Summary
${metricLine('Clicks', gsc.current.clicks, gsc.previous.clicks)}
${metricLine('Impressions', gsc.current.impressions, gsc.previous.impressions)}
${metricLine('CTR', gsc.current.ctr, gsc.previous.ctr, true)}
${metricLine('Avg position', gsc.current.position, gsc.previous.position, false, true)}

## GA4 Summary
${ga4.metrics.map((metric) => metricLine(metric, ga4.current[metric], ga4.previous[metric])).join('\n')}

## Top GSC Pages
${formatGscRows(gsc.pages, 'page')}

## Top GSC Queries
${formatGscRows(gsc.queries, 'query')}

## Top GSC Countries
${formatGscRows(gsc.countries, 'country')}

## Top GA4 Pages
${formatGa4Rows(ga4.pages)}

## GA4 Events
${formatGa4Rows(ga4.events)}
`);
}

function metricLine(label, current, previous, percentValue = false, lowerIsBetter = false) {
  const currentValue = Number(current || 0);
  const previousValue = Number(previous || 0);
  const delta = currentValue - previousValue;
  const pct = previousValue === 0 ? null : (delta / previousValue) * 100;
  const direction = delta === 0 ? '' : delta > 0 ? '+' : '';
  const good = lowerIsBetter ? delta < 0 : delta > 0;
  const marker = delta === 0 ? '' : good ? ' up' : ' down';
  return `- ${label}: ${formatMetric(currentValue, percentValue)} vs ${formatMetric(previousValue, percentValue)} (${direction}${formatMetric(delta, percentValue)}${pct === null ? '' : `, ${direction}${pct.toFixed(1)}%`}${marker})`;
}

function formatGscRows(rows, labelKey) {
  if (!rows.length) return 'No rows.';
  return rows.map((row) => {
    const label = row.keys?.[0] || '(not set)';
    return `- ${label}: ${Math.round(row.clicks || 0)} clicks, ${Math.round(row.impressions || 0)} impressions, ${(Number(row.ctr || 0) * 100).toFixed(2)}% CTR, ${Number(row.position || 0).toFixed(1)} pos`;
  }).join('\n');
}

function formatGa4Rows(rows) {
  if (!rows.length) return 'No rows.';
  return rows.map((row) => {
    const label = row.dimensionValues?.map((item) => item.value).join(' / ') || '(not set)';
    const values = row.metricValues?.map((item) => item.value).join(', ') || '0';
    return `- ${label}: ${values}`;
  }).join('\n');
}

function formatMetric(value, percentValue = false) {
  if (percentValue) return `${(value * 100).toFixed(2)}%`;
  if (Number.isInteger(value)) return value.toLocaleString('en-US');
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function zeroGscRow() {
  return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

function normalizeProperty(property) {
  return property.startsWith('properties/') ? property : `properties/${property}`;
}

function isScopeError(error) {
  return error.status === 403 && JSON.stringify(error.details || {}).includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT');
}

function todayUtc() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function diffDays(start, end) {
  return Math.round((end - start) / 86400000);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
