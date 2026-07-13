import assert from 'node:assert/strict';
import test from 'node:test';

import { buildHoroscopeResponseFromOrder } from './horoscope-response.ts';

const baseOrder = {
    id: 'AST-TEST',
    stripeSessionId: 'cs_test_cached',
    createdAt: '2026-05-27T10:00:00.000Z',
    customerEmail: 'customer@example.com',
    customerName: 'Customer',
    birthDate: '1990-01-01',
    birthTime: '12:00',
    birthPlace: 'Bratislava',
    productKey: 'daily',
    productName: 'Daily Horoscope',
    amount: 99,
    currency: 'eur',
    country: 'Slovakia',
    countryCode: 'SK',
    status: 'completed',
    horoscopeContent: 'Cached horoscope',
    lang: 'en',
};

test('cached horoscope response retries product email when email was not sent', () => {
    const response = buildHoroscopeResponseFromOrder(baseOrder, 0.99);

    assert.equal(response.error, undefined);
    assert.equal(response.emailSent, false);
    assert.equal(response.horoscope, 'Cached horoscope');
    assert.equal(response.email, 'customer@example.com');
});

test('cached horoscope response skips email retry only when email was sent', () => {
    const response = buildHoroscopeResponseFromOrder({
        ...baseOrder,
        emailSentAt: '2026-05-27T10:05:00.000Z',
    }, 0.99);

    assert.equal(response.error, 'already_processed');
    assert.equal(response.emailSent, true);
});
