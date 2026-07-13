#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_PROJECT = 'Astralo';
const DEFAULT_DAYS = 90;
const DEFAULT_ENV = 'production';

export async function runCommerceExport(rawArgs = process.argv.slice(2)) {
  const args = parseArgs(rawArgs);

  if (args.help) {
    console.log(`Usage: node scripts/export_commerce_data.mjs --out=reports/commerce-export.csv [--days=90] [--env=production] [--include-pii]

Exports available Stripe and Supabase commerce rows in the analytics CSV format:
project,source,dataset,row_number,data_json

By default, customer emails, names, birth data, and free-form metadata are redacted.
Use --include-pii only for local incident investigation, never for committed reports.

Default env: production

Environment:
- STRIPE_SECRET_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Env modes:
- production: .env.production.local, .vercel/.env.production.local, .env.production
- preview: .env.preview.local, .vercel/.env.preview.local, .env.preview
- local: .env.local, .env.development.local, .vercel/.env.development.local, .env.development, .env
`);
    return;
  }

  const envMode = normalizeEnvMode(args.env || DEFAULT_ENV);
  const loadedEnvFiles = loadEnvFiles(envFilesForMode(envMode));
  const includePii = Boolean(args['include-pii']);
  printEnvSummary({ envMode, loadedEnvFiles, includePii });

  const days = Number(args.days || DEFAULT_DAYS);
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);
  const sinceIso = since.toISOString();
  const sinceUnix = Math.floor(since.getTime() / 1000);
  const project = args.project || DEFAULT_PROJECT;
  const rows = [];

  await exportStripeRows({ rows, project, sinceUnix });
  await exportSupabaseRows({ rows, project, sinceIso });

  const csv = renderRows(rows, { includePii });

  if (args.out) {
    const outPath = path.resolve(args.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, csv, 'utf8');
    console.log(`Wrote ${outPath}`);
  } else {
    console.log(csv);
  }
}

async function exportStripeRows({ rows, project, sinceUnix }) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error('Skipping Stripe export: STRIPE_SECRET_KEY is not configured.');
    addExportSummary(rows, project, 'stripe', 'stripe_checkout_sessions', 'skipped', 0, 'STRIPE_SECRET_KEY is not configured');
    addExportSummary(rows, project, 'stripe', 'stripe_payment_intents', 'skipped', 0, 'STRIPE_SECRET_KEY is not configured');
    return;
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeKey);

  let checkoutIndex = 1;
  let checkoutCount = 0;
  for await (const session of stripe.checkout.sessions.list({
    created: { gte: sinceUnix },
    limit: 100,
    expand: ['data.payment_intent'],
  })) {
    rows.push(toRow(project, 'stripe', 'stripe_checkout_sessions', checkoutIndex, {
      id: session.id,
      created: new Date(session.created * 1000).toISOString(),
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_email || session.customer_details?.email || null,
      payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || null,
      metadata: session.metadata || {},
    }));
    checkoutIndex += 1;
    checkoutCount += 1;
  }
  addExportSummary(rows, project, 'stripe', 'stripe_checkout_sessions', 'ok', checkoutCount);

  let paymentIntentIndex = 1;
  let paymentIntentCount = 0;
  for await (const intent of stripe.paymentIntents.list({
    created: { gte: sinceUnix },
    limit: 100,
  })) {
    rows.push(toRow(project, 'stripe', 'stripe_payment_intents', paymentIntentIndex, {
      id: intent.id,
      created: new Date(intent.created * 1000).toISOString(),
      status: intent.status,
      amount: intent.amount,
      amount_received: intent.amount_received,
      currency: intent.currency,
      metadata: intent.metadata || {},
    }));
    paymentIntentIndex += 1;
    paymentIntentCount += 1;
  }
  addExportSummary(rows, project, 'stripe', 'stripe_payment_intents', 'ok', paymentIntentCount);
}

async function exportSupabaseRows({ rows, project, sinceIso }) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Skipping Supabase export: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured.');
    addExportSummary(rows, project, 'supabase', 'supabase_orders', 'skipped', 0, 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured');
    addExportSummary(rows, project, 'supabase', 'supabase_email_subscribers', 'skipped', 0, 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured');
    addExportSummary(rows, project, 'supabase', 'supabase_email_followups', 'skipped', 0, 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured');
    return;
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await exportSupabaseTable({
    rows,
    project,
    supabase,
    source: 'supabase',
    dataset: 'supabase_orders',
    table: 'orders',
    select: '*',
    dateColumn: 'created_at',
    sinceIso,
  });

  await exportSupabaseTable({
    rows,
    project,
    supabase,
    source: 'supabase',
    dataset: 'supabase_email_subscribers',
    table: 'email_subscribers',
    select: 'email, source, lang, gdpr_consent, subscribed_at, updated_at',
    dateColumn: 'subscribed_at',
    sinceIso,
  });

  await exportSupabaseTable({
    rows,
    project,
    supabase,
    source: 'supabase',
    dataset: 'supabase_email_followups',
    table: 'email_followups',
    select: 'email, lang, step_key, step_number, product_key, scheduled_for, sent_at, last_error, created_at, updated_at',
    dateColumn: 'scheduled_for',
    sinceIso,
  });
}

async function exportSupabaseTable({ rows, project, supabase, source, dataset, table, select, dateColumn, sinceIso }) {
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .gte(dateColumn, sinceIso)
    .order(dateColumn, { ascending: false });

  if (error) {
    console.error(`Skipping ${table}: ${formatSupabaseError(error)}`);
    addExportSummary(rows, project, source, dataset, 'error', 0, formatSupabaseError(error));
    return;
  }

  (data || []).forEach((item, index) => {
    rows.push(toRow(project, source, dataset, index + 1, item));
  });
  addExportSummary(rows, project, source, dataset, 'ok', (data || []).length);
}

function toRow(project, source, dataset, rowNumber, data) {
  return { project, source, dataset, rowNumber, data };
}

function addExportSummary(rows, project, source, dataset, status, rowCount, message = '') {
  const rowNumber = rows.filter((row) => row.dataset === 'commerce_export_summary').length + 1;
  rows.push(toRow(project, 'export', 'commerce_export_summary', rowNumber, {
    source,
    dataset,
    status,
    row_count: rowCount,
    message,
    exported_at: new Date().toISOString(),
  }));
}

export function renderRows(rows, options = {}) {
  const includePii = Boolean(options.includePii);
  const lines = ['project,source,dataset,row_number,data_json'];
  for (const row of rows) {
    const data = includePii ? row.data : sanitizeCommerceExportData(row.dataset, row.data);
    lines.push([
      row.project,
      row.source,
      row.dataset,
      String(row.rowNumber),
      JSON.stringify(data),
    ].map(csvEscape).join(','));
  }
  return `${lines.join('\n')}\n`;
}

export function sanitizeCommerceExportData(dataset, data = {}) {
  const row = isObject(data) ? data : {};

  if (dataset === 'stripe_checkout_sessions') {
    return compactObject({
      id: row.id,
      created: row.created,
      status: row.status,
      payment_status: row.payment_status,
      amount_total: row.amount_total,
      currency: row.currency,
      customer_email_present: Boolean(row.customer_email || row.customer_details?.email),
      payment_intent: row.payment_intent,
      metadata: sanitizeMetadata(row.metadata),
    });
  }

  if (dataset === 'stripe_payment_intents') {
    return compactObject({
      id: row.id,
      created: row.created,
      status: row.status,
      amount: row.amount,
      amount_received: row.amount_received,
      currency: row.currency,
      metadata: sanitizeMetadata(row.metadata),
    });
  }

  if (dataset === 'supabase_orders') {
    return compactObject({
      id: row.id,
      stripe_session_id: row.stripe_session_id,
      stripe_payment_intent_id: row.stripe_payment_intent_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      product_key: row.product_key,
      product_name: row.product_name,
      amount: row.amount,
      currency: row.currency,
      country: row.country,
      country_code: row.country_code,
      status: row.status,
      lang: row.lang,
      email_sent_at: row.email_sent_at,
      refunded_at: row.refunded_at,
      stripe_refund_id: row.stripe_refund_id,
      customer_email_present: Boolean(row.customer_email || row.email),
    });
  }

  if (dataset === 'supabase_email_subscribers') {
    const email = row.email || row.customer_email || '';
    return compactObject({
      email_hash: row.email_hash || hashEmail(email),
      email_present: Boolean(email || row.email_hash || row.email_present),
      source: row.source,
      lang: row.lang,
      gdpr_consent: row.gdpr_consent,
      subscribed_at: row.subscribed_at,
      updated_at: row.updated_at,
    });
  }

  if (dataset === 'supabase_email_followups') {
    const email = row.email || row.customer_email || '';
    return compactObject({
      email_hash: row.email_hash || hashEmail(email),
      email_present: Boolean(email || row.email_hash || row.email_present),
      lang: row.lang,
      step_key: row.step_key,
      step_number: row.step_number,
      product_key: row.product_key,
      scheduled_for: row.scheduled_for,
      sent_at: row.sent_at,
      failed: Boolean(row.failed || row.last_error),
      created_at: row.created_at,
      updated_at: row.updated_at,
    });
  }

  if (dataset === 'commerce_export_summary') {
    return { ...row };
  }

  return sanitizeUnknownObject(row);
}

const SAFE_METADATA_KEYS = new Set([
  'productKey',
  'product_key',
  'productName',
  'product_name',
  'lang',
  'locale',
  'currentPath',
  'current_path',
  'currentUrl',
  'current_url',
  'landingPath',
  'landing_path',
  'lastPath',
  'last_path',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
]);

const HASHED_METADATA_KEYS = new Set([
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'ttclid',
  'li_fat_id',
  'gaClientId',
  'ga_client_id',
  'client_id',
]);

function sanitizeMetadata(metadata) {
  if (!isObject(metadata)) return {};

  const sanitized = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (HASHED_METADATA_KEYS.has(key)) {
      const hash = hashValue(value);
      if (hash) sanitized[`${key}_hash`] = hash;
      continue;
    }

    if (!SAFE_METADATA_KEYS.has(key)) continue;
    if (isSensitiveKey(key)) continue;

    const sanitizedValue = isPathLikeKey(key) ? sanitizeUrlOrPath(value) : sanitizeScalar(value);
    if (sanitizedValue !== undefined && sanitizedValue !== '') {
      sanitized[key] = sanitizedValue;
    }
  }
  return sanitized;
}

function sanitizeUnknownObject(row) {
  return Object.fromEntries(
    Object.entries(row)
      .filter(([key]) => !isSensitiveKey(key))
      .map(([key, value]) => [key, sanitizeScalar(value)])
      .filter(([, value]) => value !== undefined)
  );
}

function isSensitiveKey(key) {
  return /email|e-mail|mail|birth|born|place|address|phone|customer|person|user|ip|city|postal|zip|street|first_name|last_name|full_name|dob/i.test(String(key));
}

function isPathLikeKey(key) {
  return /url|path/i.test(String(key));
}

function sanitizeUrlOrPath(value) {
  const text = String(value || '').trim();
  if (!text) return '';

  try {
    const parsed = new URL(text, 'https://astralo.online');
    const safeParams = new URLSearchParams();
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const paramValue = parsed.searchParams.get(key);
      if (paramValue) safeParams.set(key, paramValue);
    }
    const query = safeParams.toString();
    return `${parsed.pathname}${query ? `?${query}` : ''}`;
  } catch {
    return text.split('?')[0].slice(0, 256);
  }
}

function sanitizeScalar(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.map(sanitizeScalar).filter((item) => item !== undefined);
  if (!isObject(value)) return String(value);
  return sanitizeUnknownObject(value);
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => item !== undefined)
      .filter(([, item]) => !isObject(item) || Object.keys(item).length)
  );
}

function hashEmail(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return normalized ? hashValue(normalized) : '';
}

function hashValue(value) {
  const normalized = String(value || '').trim();
  return normalized ? `sha256:${crypto.createHash('sha256').update(normalized).digest('hex')}` : '';
}

function isObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function parseArgs(values) {
  const parsed = {};
  for (const value of values) {
    const match = value.match(/^--([^=]+)(?:=(.*))?$/);
    if (match) parsed[match[1]] = match[2] ?? true;
  }
  return parsed;
}

function normalizeEnvMode(value) {
  const mode = String(value || '').toLowerCase();
  if (['prod', 'production'].includes(mode)) return 'production';
  if (['preview', 'staging'].includes(mode)) return 'preview';
  if (['dev', 'development', 'local'].includes(mode)) return 'local';
  throw new Error(`Unsupported --env value "${value}". Use production, preview, or local.`);
}

function envFilesForMode(mode) {
  if (mode === 'production') {
    return ['.env.production.local', '.vercel/.env.production.local', '.env.production'];
  }
  if (mode === 'preview') {
    return ['.env.preview.local', '.vercel/.env.preview.local', '.env.preview'];
  }
  return ['.env.local', '.env.development.local', '.vercel/.env.development.local', '.env.development', '.env'];
}

function printEnvSummary({ envMode, loadedEnvFiles, includePii }) {
  const stripeMode = detectStripeMode(process.env.STRIPE_SECRET_KEY);
  const supabaseHost = safeHost(process.env.SUPABASE_URL) || 'not configured';
  const loaded = loadedEnvFiles.length ? loadedEnvFiles.join(', ') : 'none';

  console.error(`Commerce env: ${envMode}; loaded files: ${loaded}`);
  console.error(`PII export: ${includePii ? 'included (--include-pii)' : 'redacted'}`);
  console.error(`Stripe key mode: ${stripeMode}`);
  console.error(`Supabase host: ${supabaseHost}`);

  if (envMode === 'production' && stripeMode === 'test') {
    console.error('Warning: production export is using a Stripe test key.');
  }
}

function detectStripeMode(key) {
  if (!key) return 'not configured';
  if (String(key).startsWith('sk_live_')) return 'live';
  if (String(key).startsWith('sk_test_')) return 'test';
  return 'configured';
}

function safeHost(value) {
  if (!value) return '';
  try {
    return new URL(value).host;
  } catch {
    return 'invalid-url';
  }
}

function formatSupabaseError(error) {
  const message = error.message || String(error);
  const cause = error.cause?.message ? ` (${error.cause.message})` : '';
  const hint = /fetch failed|ENOTFOUND|getaddrinfo/i.test(`${message} ${cause}`)
    ? ' Check SUPABASE_URL; the configured project host may be stale or unreachable.'
    : '';
  return `${message}${cause}${hint}`;
}

function loadEnvFiles(files) {
  const loadedFiles = [];
  for (const file of files) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) continue;

    loadedFiles.push(file);
    const text = fs.readFileSync(filePath, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
    }
  }
  return loadedFiles;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCommerceExport().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
