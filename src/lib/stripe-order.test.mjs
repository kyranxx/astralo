import assert from 'node:assert/strict';
import test from 'node:test';

import {
    buildOrderFromCheckoutSession,
    isPaidCheckoutSession,
} from './stripe-order.ts';

test('builds a local order from a paid Stripe Checkout session', () => {
    const session = {
        id: 'cs_test_recovery',
        payment_intent: 'pi_test_recovery',
        status: 'complete',
        payment_status: 'paid',
        amount_total: 499,
        currency: 'eur',
        customer_email: 'fallback@example.com',
        customer_details: {
            email: 'customer@example.com',
            name: 'Stripe Name',
            address: { country: 'SK' },
        },
        metadata: {
            productKey: 'monthly',
            lang: 'pt',
            name: 'Customer Name',
            birthDate: '1990-01-01',
            birthTime: '12:00',
            birthPlace: 'Bratislava',
        },
    };

    const order = buildOrderFromCheckoutSession(session);

    assert.equal(order.stripeSessionId, 'cs_test_recovery');
    assert.equal(order.stripePaymentIntentId, 'pi_test_recovery');
    assert.equal(order.customerEmail, 'customer@example.com');
    assert.equal(order.customerName, 'Customer Name');
    assert.equal(order.productKey, 'monthly');
    assert.equal(order.productName, 'Horóscopo mensal');
    assert.equal(order.amount, 499);
    assert.equal(order.currency, 'eur');
    assert.equal(order.countryCode, 'SK');
    assert.equal(order.country, 'Slovakia');
    assert.equal(order.lang, 'pt');
    assert.equal(order.status, 'completed');
});

test('recognizes only completed paid Checkout sessions as paid', () => {
    assert.equal(isPaidCheckoutSession({ status: 'complete', payment_status: 'paid' }), true);
    assert.equal(isPaidCheckoutSession({ status: 'open', payment_status: 'unpaid' }), false);
    assert.equal(isPaidCheckoutSession({ status: 'complete', payment_status: 'unpaid' }), false);
});
