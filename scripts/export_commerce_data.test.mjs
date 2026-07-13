import assert from 'node:assert/strict';
import test from 'node:test';

import {
  renderRows,
  sanitizeCommerceExportData,
} from './export_commerce_data.mjs';
import {
  buildGrowthReport,
  parseAnalyticsCsv,
} from './weekly_growth_report.mjs';

test('sanitizes Stripe checkout customer fields and risky metadata', () => {
  const sanitized = sanitizeCommerceExportData('stripe_checkout_sessions', {
    id: 'cs_test',
    created: '2026-05-04T10:00:00.000Z',
    status: 'complete',
    payment_status: 'paid',
    amount_total: 499,
    currency: 'eur',
    customer_email: 'customer@example.com',
    payment_intent: 'pi_test',
    metadata: {
      productKey: 'monthly',
      lang: 'de',
      currentUrl: 'https://astralo.online/de?utm_source=google&email=customer@example.com',
      gaClientId: '123.456',
      customerName: 'Private Person',
      birthDate: '1990-01-01',
      birthPlace: 'Berlin',
    },
  });

  assert.equal(sanitized.customer_email_present, true);
  assert.equal(sanitized.customer_email, undefined);
  assert.equal(sanitized.metadata.productKey, 'monthly');
  assert.equal(sanitized.metadata.lang, 'de');
  assert.equal(sanitized.metadata.currentUrl, '/de?utm_source=google');
  assert.match(sanitized.metadata.gaClientId_hash, /^sha256:/);
  assert.equal(sanitized.metadata.customerName, undefined);
  assert.equal(sanitized.metadata.birthDate, undefined);
  assert.equal(sanitized.metadata.birthPlace, undefined);
});

test('sanitizes Supabase orders while keeping report fields', () => {
  const sanitized = sanitizeCommerceExportData('supabase_orders', {
    id: 'ord_1',
    stripe_session_id: 'cs_test',
    stripe_payment_intent_id: 'pi_test',
    created_at: '2026-05-04T10:02:00.000Z',
    updated_at: '2026-05-04T10:03:00.000Z',
    customer_email: 'customer@example.com',
    customer_name: 'Private Person',
    birth_date: '1990-01-01',
    birth_time: '12:00',
    birth_place: 'Berlin',
    product_key: 'monthly',
    amount: 499,
    currency: 'eur',
    country_code: 'DE',
    status: 'completed',
    lang: 'de',
    email_sent_at: '2026-05-04T10:04:00.000Z',
  });

  assert.equal(sanitized.customer_email_present, true);
  assert.equal(sanitized.customer_email, undefined);
  assert.equal(sanitized.customer_name, undefined);
  assert.equal(sanitized.birth_date, undefined);
  assert.equal(sanitized.birth_time, undefined);
  assert.equal(sanitized.birth_place, undefined);
  assert.equal(sanitized.id, 'ord_1');
  assert.equal(sanitized.stripe_session_id, 'cs_test');
  assert.equal(sanitized.status, 'completed');
  assert.equal(sanitized.amount, 499);
  assert.equal(sanitized.email_sent_at, '2026-05-04T10:04:00.000Z');
});

test('renders redacted CSVs that weekly reports can still count', () => {
  const csv = renderRows([
    {
      project: 'Astralo',
      source: 'supabase',
      dataset: 'supabase_email_subscribers',
      rowNumber: 1,
      data: {
        email: 'lead@example.com',
        source: 'inline',
        lang: 'pt',
        subscribed_at: '2026-05-04T09:00:00.000Z',
      },
    },
    {
      project: 'Astralo',
      source: 'supabase',
      dataset: 'supabase_email_followups',
      rowNumber: 1,
      data: {
        email: 'lead@example.com',
        lang: 'pt',
        step_key: 'day_1_weekly',
        scheduled_for: '2026-05-05T09:00:00.000Z',
        sent_at: '2026-05-05T09:01:00.000Z',
        last_error: 'temporary SMTP issue for lead@example.com',
      },
    },
  ]);

  assert.doesNotMatch(csv, /lead@example\.com/);
  assert.match(csv, /email_hash/);
  assert.match(csv, /""failed"":true/);

  const records = parseAnalyticsCsv(csv);
  assert.equal(records[1].data.failed, true);

  const report = buildGrowthReport(records, {
    windowDays: 2,
    top: 5,
    sourcePath: 'redacted-commerce.csv',
  });

  assert.equal(report.commerce.current.subscribers, 1);
  assert.equal(report.commerce.current.followupsSent, 1);
  assert.equal(report.commerce.current.followupsFailed, 1);
});
