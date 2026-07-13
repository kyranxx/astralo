import assert from 'node:assert/strict';
import test from 'node:test';

import { handleCompletedCheckoutSession } from './checkout-session-handler.ts';

const baseSession = {
    id: 'cs_live_paid_test',
    payment_intent: 'pi_live_paid_test',
    status: 'complete',
    payment_status: 'paid',
    amount_total: 499,
    currency: 'eur',
    customer_email: 'customer@example.com',
    customer_details: {
        email: 'customer@example.com',
        name: 'Stripe Customer',
        address: { country: 'SK' },
    },
    metadata: {
        productKey: 'monthly',
        lang: 'en',
        name: 'Launch Customer',
        birthDate: '1990-01-01',
        birthTime: '12:00',
        birthPlace: 'Bratislava',
        gaClientId: '123.456',
    },
};

function createDeps({ existingOrder = null, artifacts = {} } = {}) {
    const calls = [];
    const savedOrders = [];

    return {
        calls,
        savedOrders,
        deps: {
            findOrderBySessionId: async (sessionId) => {
                calls.push(['find', sessionId]);
                return existingOrder;
            },
            addOrder: async (order) => {
                calls.push(['add', order.stripeSessionId]);
                savedOrders.push(order);
            },
            loadFulfillmentArtifacts: async (session) => {
                calls.push(['artifacts', session.id]);
                return {
                    invoicePdfBuffer: null,
                    invoiceFilename: 'Invoice.pdf',
                    downloadUrl: '',
                    ...artifacts,
                };
            },
            fulfillOrder: async (order, invoicePdfBuffer, invoiceFilename, downloadUrl) => {
                calls.push(['fulfill', order.stripeSessionId, invoicePdfBuffer, invoiceFilename, downloadUrl]);
            },
            trackServerPurchase: async (order, gaClientId) => {
                calls.push(['track', order.stripeSessionId, gaClientId]);
            },
        },
    };
}

test('paid new Checkout session creates an order, fulfills it, then tracks purchase', async () => {
    const { calls, deps, savedOrders } = createDeps();

    const result = await handleCompletedCheckoutSession(baseSession, deps);

    assert.deepEqual(result, { received: true, duplicate: false, fulfilled: true });
    assert.equal(savedOrders.length, 1);
    assert.equal(savedOrders[0].stripeSessionId, 'cs_live_paid_test');
    assert.equal(savedOrders[0].stripePaymentIntentId, 'pi_live_paid_test');
    assert.equal(savedOrders[0].customerEmail, 'customer@example.com');
    assert.equal(savedOrders[0].productKey, 'monthly');
    assert.deepEqual(calls.map(([name]) => name), ['find', 'add', 'artifacts', 'fulfill', 'track']);
    assert.deepEqual(calls.at(-1), ['track', 'cs_live_paid_test', '123.456']);
});

test('duplicate already-fulfilled Checkout session does not fulfill or track again', async () => {
    const existingOrder = {
        id: 'ord_existing',
        stripeSessionId: 'cs_live_paid_test',
        createdAt: '2026-07-04T18:00:00.000Z',
        customerEmail: 'customer@example.com',
        customerName: 'Launch Customer',
        birthDate: '1990-01-01',
        productKey: 'monthly',
        productName: 'Monthly Horoscope',
        amount: 499,
        currency: 'eur',
        country: 'Slovakia',
        countryCode: 'SK',
        status: 'completed',
        lang: 'en',
        emailSentAt: '2026-07-04T18:01:00.000Z',
    };
    const { calls, deps } = createDeps({ existingOrder });

    const result = await handleCompletedCheckoutSession(baseSession, deps);

    assert.deepEqual(result, { received: true, duplicate: true, fulfilled: true, skipped: undefined });
    assert.deepEqual(calls.map(([name]) => name), ['find']);
});

test('unpaid Checkout session is acknowledged without creating or fulfilling an order', async () => {
    const { calls, deps } = createDeps();
    const session = {
        ...baseSession,
        status: 'open',
        payment_status: 'unpaid',
    };

    const result = await handleCompletedCheckoutSession(session, deps);

    assert.deepEqual(result, {
        received: true,
        skipped: 'checkout_session_not_paid',
        payment_status: 'unpaid',
        status: 'open',
    });
    assert.deepEqual(calls, []);
});

test('paid Checkout session without customer email is saved but not tracked as a fulfilled purchase', async () => {
    const { calls, deps, savedOrders } = createDeps();
    const session = {
        ...baseSession,
        customer_email: '',
        customer_details: {
            ...baseSession.customer_details,
            email: '',
        },
        metadata: {
            ...baseSession.metadata,
            customerEmail: '',
        },
    };

    const result = await handleCompletedCheckoutSession(session, deps);

    assert.deepEqual(result, {
        received: true,
        duplicate: false,
        fulfilled: false,
        skipped: 'missing_customer_email',
    });
    assert.equal(savedOrders.length, 1);
    assert.equal(savedOrders[0].customerEmail, '');
    assert.deepEqual(calls.map(([name]) => name), ['find', 'add']);
});

test('paid Checkout session acknowledges Stripe and queues recovery without tracking an unfulfilled purchase', async () => {
    const { calls, deps, savedOrders } = createDeps();
    deps.fulfillOrder = async (order) => {
        calls.push(['fulfill', order.stripeSessionId]);
        throw new Error('AI provider unavailable');
    };

    const result = await handleCompletedCheckoutSession(baseSession, deps);

    assert.equal(savedOrders.length, 1);
    assert.deepEqual(result, {
        received: true,
        duplicate: false,
        fulfilled: false,
        queuedForRecovery: true,
    });
    assert.deepEqual(calls.map(([name]) => name), ['find', 'add', 'artifacts', 'fulfill']);
});
