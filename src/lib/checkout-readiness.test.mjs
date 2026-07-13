import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadReadinessModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/checkout-readiness.ts');
    } finally {
        await server.close();
    }
}

const readyConfig = {
    STRIPE_SECRET_KEY: 'sk_live_example',
    STRIPE_WEBHOOK_SECRET: 'whsec_example',
    SUPABASE_URL: 'https://example.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'service-role',
    OPENAI_API_KEY: 'openai',
    OPENAI_MODEL: 'gpt-5.6-terra',
    SMTP_HOST: 'smtp.example.com',
    SMTP_USER: 'user',
    SMTP_PASS: 'pass',
    GA4_API_SECRET: 'ga4-secret',
    ADMIN_PASSWORD: 'admin',
    CRON_SECRET: 'cron',
};

test('marks checkout proof order ready when all required and tracking config exists', async () => {
    const { getCheckoutReadiness } = await loadReadinessModule();
    const readiness = getCheckoutReadiness(readyConfig);

    assert.equal(readiness.status, 'ready');
    assert.equal(readiness.canAcceptPaidOrders, true);
    assert.equal(readiness.canTrackServerPurchases, true);
    assert.equal(readiness.readyForProofOrder, true);
    assert.equal(readiness.stripeKeyMode, 'live');
    assert.deepEqual(readiness.actions, [
        'Run one real paid test order.',
        'Verify Stripe paid checkout, Supabase order row, product email delivery, and GA4 purchase event.',
    ]);
});

test('flags missing GA4 secret as attention needed, not core checkout blocking', async () => {
    const { getCheckoutReadiness } = await loadReadinessModule();
    const readiness = getCheckoutReadiness({ ...readyConfig, GA4_API_SECRET: '' });

    assert.equal(readiness.status, 'needs_attention');
    assert.equal(readiness.canAcceptPaidOrders, true);
    assert.equal(readiness.canTrackServerPurchases, false);
    assert.equal(readiness.readyForProofOrder, false);
    assert.ok(readiness.actions.some((action) => action.includes('GA4_API_SECRET')));
});

test('blocks checkout readiness when critical order fulfillment config is missing', async () => {
    const { getCheckoutReadiness } = await loadReadinessModule();
    const readiness = getCheckoutReadiness({
        ...readyConfig,
        STRIPE_SECRET_KEY: 'sk_test_example',
        SMTP_PASS: '',
    });

    assert.equal(readiness.status, 'blocked');
    assert.equal(readiness.canAcceptPaidOrders, false);
    assert.equal(readiness.readyForProofOrder, false);
    assert.equal(readiness.stripeKeyMode, 'test');
    assert.ok(readiness.checks.some((check) => check.id === 'stripe_secret_key' && check.severity === 'critical'));
    assert.ok(readiness.checks.some((check) => check.id === 'smtp' && check.severity === 'critical'));
});

test('blocks checkout readiness when OpenAI is missing or its live check fails', async () => {
    const { getCheckoutReadiness } = await loadReadinessModule();
    const missing = getCheckoutReadiness({ ...readyConfig, OPENAI_API_KEY: '' });
    const unreachable = getCheckoutReadiness(readyConfig, {
        configured: true,
        ok: false,
        message: 'OpenAI provider check failed.',
    });

    assert.equal(missing.canAcceptPaidOrders, false);
    assert.ok(missing.checks.some((check) => check.id === 'openai_api_key' && check.severity === 'critical'));
    assert.equal(unreachable.canAcceptPaidOrders, false);
    assert.ok(unreachable.checks.some((check) => check.id === 'openai_provider_live' && check.severity === 'critical'));
});
