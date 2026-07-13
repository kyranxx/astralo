# Astralo production commerce truth — 2026-07-13

Scope: current live Stripe and Supabase records from the last 180 days. Customer data is redacted.

## Purchase verdict

- **1 real paid purchase**: €2.99 gross, Romanian (`ro`, country `RO`), partner horoscope.
- Stripe: checkout complete and paid; payment intent succeeded.
- Supabase: matching order exists, status `completed`, generated content is present, and the fulfillment email has a sent timestamp.
- Refunds: 0.
- No mismatch exists between the real paid Stripe checkout/payment intent and its Supabase order.

## Funnel records

- Stripe checkout sessions: 24 total — 1 paid/complete, 22 unpaid/expired, 1 unpaid/open.
- Stripe payment intents: 2 total — 1 succeeded (€2.99), 1 canceled.
- Supabase orders: 2 completed rows.
  - 1 is the real €2.99 Romanian purchase.
  - 1 is a €0 English daily proof/seed order; it has no payment intent and must not be counted as a purchase or revenue.
- Both Supabase rows currently contain generated content and an email sent timestamp.

## Important distinction

The live commercial result is **one customer purchase and €2.99 gross revenue**, not two purchases. The second database order is a zero-value verification record.

Source: `reports/commerce-export-production-redacted-2026-07-13.csv`, plus a read-only Supabase fulfillment-state query limited to non-PII fields. Export environment confirmed Stripe live mode and the production Supabase host.
