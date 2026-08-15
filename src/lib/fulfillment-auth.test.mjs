import assert from 'node:assert/strict';
import test from 'node:test';
import { createHmac } from 'node:crypto';

// The module reads the key at call time, so set it before the assertions run.
process.env.FULFILLMENT_HMAC_KEY = 'test-secret-key';

import {
    createFulfillmentToken,
    verifyFulfillmentToken,
    isFulfillmentAuthConfigured,
} from './fulfillment-auth.ts';

// Mirror the module's key derivation (FULFILLMENT_HMAC_KEY wins here).
function deriveKey() {
    return process.env.FULFILLMENT_HMAC_KEY
        || process.env.CRON_SECRET
        || process.env.ADMIN_PASSWORD
        || '';
}

function expectToken(sessionId, email) {
    const key = deriveKey();
    return createHmac('sha256', key)
        .update(`${sessionId}:${email.toLowerCase().trim()}`)
        .digest('hex');
}

test('creates a deterministic HMAC token bound to session and email', () => {
    const token = createFulfillmentToken('cs_test_123', 'Customer@Example.com');

    assert.equal(token, expectToken('cs_test_123', 'Customer@Example.com'));
    // Email is normalized case-insensitively, so the same email in another case matches.
    assert.equal(createFulfillmentToken('cs_test_123', 'customer@example.com'), token);
});

test('verifies a correct token and rejects wrong tokens', () => {
    assert.equal(verifyFulfillmentToken('cs_test_123', 'customer@example.com', expectToken('cs_test_123', 'customer@example.com')), true);
    assert.equal(verifyFulfillmentToken('cs_test_123', 'other@example.com', expectToken('cs_test_123', 'customer@example.com')), false);
    assert.equal(verifyFulfillmentToken('cs_test_other', 'customer@example.com', expectToken('cs_test_123', 'customer@example.com')), false);
});

test('rejects missing, malformed, or empty tokens', () => {
    assert.equal(verifyFulfillmentToken('cs_test_123', 'customer@example.com', ''), false);
    assert.equal(verifyFulfillmentToken('cs_test_123', 'customer@example.com', 'not-hex'), false);
    assert.equal(verifyFulfillmentToken('', 'customer@example.com', 'abcd'), false);
    assert.equal(verifyFulfillmentToken('cs_test_123', 'customer@example.com', 'abcd'), false);
});

test('reports configuration state', () => {
    assert.equal(typeof isFulfillmentAuthConfigured(), 'boolean');
});
