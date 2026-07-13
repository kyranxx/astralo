import assert from 'node:assert/strict';
import test from 'node:test';

import { needsProductEmailFulfillment } from './order-fulfillment-state.ts';

const baseOrder = {
    status: 'completed',
    customerEmail: 'customer@example.com',
};

test('paid completed order needs fulfillment until product email is sent', () => {
    assert.equal(needsProductEmailFulfillment(baseOrder), true);
});

test('order no longer needs product email fulfillment after email was sent', () => {
    assert.equal(needsProductEmailFulfillment({
        ...baseOrder,
        emailSentAt: '2026-05-27T10:05:00.000Z',
    }), false);
});

test('order without a usable customer email cannot be fulfilled by email', () => {
    assert.equal(needsProductEmailFulfillment({
        ...baseOrder,
        customerEmail: '   ',
    }), false);
});

test('non-completed order is not fulfilled by product email retry logic', () => {
    assert.equal(needsProductEmailFulfillment({
        ...baseOrder,
        status: 'refunded',
    }), false);
});
