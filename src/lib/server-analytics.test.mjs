import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

import {
    buildGa4PurchasePayload,
    normalizeGaClientId,
    sendGa4PurchaseEvent,
} from './server-analytics.ts';

test('normalizes GA cookie client id for Measurement Protocol', () => {
    assert.equal(normalizeGaClientId('GA1.1.123456789.987654321'), '123456789.987654321');
    assert.equal(normalizeGaClientId('123456789.987654321'), '123456789.987654321');
    assert.equal(normalizeGaClientId('   '), '');
});

test('builds a GA4 purchase payload without customer PII', () => {
    const payload = buildGa4PurchasePayload({
        transactionId: 'cs_test_123',
        gaClientId: 'GA1.1.111.222',
        productKey: 'monthly',
        productName: 'Monthly Horoscope',
        amountCents: 499,
        currency: 'eur',
        lang: 'pt',
    });

    assert.equal(payload.client_id, '111.222');
    assert.equal(payload.events[0].name, 'purchase');
    assert.equal(payload.events[0].params.transaction_id, 'cs_test_123');
    assert.equal(payload.events[0].params.value, 4.99);
    assert.equal(payload.events[0].params.currency, 'EUR');
    assert.deepEqual(payload.events[0].params.items[0], {
        item_id: 'monthly',
        item_name: 'Monthly Horoscope',
        item_category: 'horoscope',
        item_variant: 'pt',
        price: 4.99,
        quantity: 1,
    });
    assert.doesNotMatch(JSON.stringify(payload), /@/);
});

test('skips GA4 purchase send when Measurement Protocol secret is missing', async () => {
    const result = await sendGa4PurchaseEvent({
        transactionId: 'cs_test_123',
        productKey: 'daily',
        productName: 'Daily Horoscope',
        amountCents: 99,
        currency: 'eur',
        lang: 'en',
    }, { measurementId: 'G-TEST', apiSecret: '' });

    assert.deepEqual(result, {
        sent: false,
        reason: 'missing_ga4_measurement_protocol_config',
    });
});

test('purchase is emitted only by the paid server fulfillment path', async () => {
    const successPage = await readFile('src/pages/success.astro', 'utf8');

    assert.doesNotMatch(successPage, /track\(['"]purchase['"]/);
    assert.doesNotMatch(successPage, /astralo_purchase_tracked_/);
});
