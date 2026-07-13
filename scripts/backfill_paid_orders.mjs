#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_DAYS = 180;
const DEFAULT_ENV = 'production';
const PRODUCT_NAMES = {
  daily: 'Daily Horoscope',
  weekly: 'Weekly Horoscope',
  monthly: 'Monthly Horoscope',
  partner: 'Partner Compatibility',
  lifetime: 'Lifetime Horoscope',
};

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(`Usage: node scripts/backfill_paid_orders.mjs [--env=production] [--days=180] [--apply]

Finds paid Stripe Checkout Sessions that do not have matching Supabase orders.
Default is dry-run. Use --apply to insert missing order rows.

This script does not send product emails or generate horoscope content.
`);
  process.exit(0);
}

const envMode = normalizeEnvMode(args.env || DEFAULT_ENV);
const loadedEnvFiles = loadEnvFiles(envFilesForMode(envMode));
const apply = Boolean(args.apply);
const days = Number(args.days || DEFAULT_DAYS);
const since = new Date();
since.setUTCDate(since.getUTCDate() - days);
const sinceUnix = Math.floor(since.getTime() / 1000);

printEnvSummary({ envMode, loadedEnvFiles, apply });

const stripeKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!stripeKey || !supabaseUrl || !supabaseServiceKey) {
  console.error('Missing STRIPE_SECRET_KEY, SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const Stripe = (await import('stripe')).default;
const { createClient } = await import('@supabase/supabase-js');

const stripe = new Stripe(stripeKey);
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const missingOrders = [];
let paidSessions = 0;

for await (const session of stripe.checkout.sessions.list({
  created: { gte: sinceUnix },
  limit: 100,
  expand: ['data.payment_intent'],
})) {
  if (session.status !== 'complete' || session.payment_status !== 'paid') continue;
  paidSessions += 1;

  const { data: existingOrder, error } = await supabase
    .from('orders')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed checking order for ${session.id}: ${error.message}`);
  }
  if (existingOrder) continue;

  const order = buildOrderRow(session);
  missingOrders.push(order);

  if (apply) {
    const { error: insertError } = await supabase.from('orders').insert(order);
    if (insertError) {
      throw new Error(`Failed inserting order for ${session.id}: ${insertError.message}`);
    }
  }
}

console.log(`Paid Stripe sessions checked: ${paidSessions}`);
console.log(`Missing Supabase orders found: ${missingOrders.length}`);

for (const order of missingOrders) {
  console.log([
    apply ? 'inserted' : 'would insert',
    order.stripe_session_id,
    order.created_at,
    order.product_key,
    `${(order.amount / 100).toFixed(2)} ${order.currency.toUpperCase()}`,
    order.customer_email ? 'has_email' : 'missing_email',
  ].join(' | '));
}

function buildOrderRow(session) {
  const metadata = session.metadata || {};
  const productKey = isValidProductKey(metadata.productKey) ? metadata.productKey : 'daily';
  const customerAddress = session.customer_details?.address;
  const countryCode = customerAddress?.country || '';

  return {
    id: generateOrderId(),
    stripe_session_id: session.id,
    stripe_payment_intent_id: getStripeId(session.payment_intent) || null,
    created_at: new Date(session.created * 1000).toISOString(),
    customer_email: session.customer_details?.email || session.customer_email || metadata.customerEmail || '',
    customer_name: metadata.name || metadata.name1 || session.customer_details?.name || 'Unknown',
    birth_date: metadata.birthDate || metadata.birthDate1 || null,
    birth_time: metadata.birthTime || metadata.birthTime1 || null,
    birth_place: metadata.birthPlace || metadata.birthPlace1 || null,
    partner_name: metadata.partnerName || metadata.name2 || null,
    partner_birth_date: metadata.partnerBirthDate || metadata.birthDate2 || null,
    partner_birth_time: metadata.partnerBirthTime || metadata.birthTime2 || null,
    partner_birth_place: metadata.partnerBirthPlace || metadata.birthPlace2 || null,
    product_key: productKey,
    product_name: PRODUCT_NAMES[productKey],
    amount: session.amount_total || 0,
    currency: session.currency || 'eur',
    country: getCountryName(countryCode),
    country_code: countryCode || null,
    status: 'completed',
    lang: metadata.lang || 'en',
  };
}

function getStripeId(value) {
  if (!value) return '';
  return typeof value === 'string' ? value : value.id || '';
}

function isValidProductKey(value) {
  return Object.prototype.hasOwnProperty.call(PRODUCT_NAMES, value);
}

function getCountryName(code) {
  if (!code) return 'Unknown';
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code.toUpperCase()) || code;
  } catch {
    return code;
  }
}

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AST-${timestamp}-${random}`;
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

function printEnvSummary({ envMode, loadedEnvFiles, apply }) {
  const stripeMode = detectStripeMode(process.env.STRIPE_SECRET_KEY);
  const supabaseHost = safeHost(process.env.SUPABASE_URL) || 'not configured';
  const loaded = loadedEnvFiles.length ? loadedEnvFiles.join(', ') : 'none';

  console.error(`Commerce env: ${envMode}; loaded files: ${loaded}`);
  console.error(`Stripe key mode: ${stripeMode}`);
  console.error(`Supabase host: ${supabaseHost}`);
  console.error(`Mode: ${apply ? 'apply' : 'dry-run'}`);
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
