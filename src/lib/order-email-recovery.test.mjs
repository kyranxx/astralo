import assert from 'node:assert/strict';
import test from 'node:test';

import {
    getOrderRecoveryWindow,
    recoverMissingProductEmails,
} from './order-email-recovery.ts';

function order(overrides = {}) {
    return {
        id: 'ord_ok',
        status: 'completed',
        customerEmail: 'customer@example.com',
        emailSentAt: undefined,
        productKey: 'daily',
        createdAt: '2026-05-01T10:00:00.000Z',
        ...overrides,
    };
}

test('dry run reports eligible missing product emails without sending', async () => {
    const fulfilled = [];

    const result = await recoverMissingProductEmails({
        dryRun: true,
        loadOrders: async () => [order()],
        fulfillOrder: async (candidate) => fulfilled.push(candidate.id),
    });

    assert.equal(result.scanned, 1);
    assert.equal(result.eligible, 1);
    assert.equal(result.fulfilled, 0);
    assert.equal(result.failed, 0);
    assert.equal(result.results[0].status, 'dry_run');
    assert.deepEqual(fulfilled, []);
});

test('fulfills only eligible orders and keeps going after failures', async () => {
    const fulfilled = [];
    const result = await recoverMissingProductEmails({
        dryRun: false,
        loadOrders: async () => [
            order({ id: 'ord_ok' }),
            order({ id: 'ord_no_email', customerEmail: '   ' }),
            order({ id: 'ord_sent', emailSentAt: '2026-05-01T10:05:00.000Z' }),
            order({ id: 'ord_refunded', status: 'refunded' }),
            order({ id: 'ord_fail' }),
        ],
        fulfillOrder: async (candidate) => {
            fulfilled.push(candidate.id);
            if (candidate.id === 'ord_fail') throw new Error('SMTP unavailable');
        },
    });

    assert.deepEqual(fulfilled, ['ord_ok', 'ord_fail']);
    assert.equal(result.scanned, 5);
    assert.equal(result.eligible, 2);
    assert.equal(result.fulfilled, 1);
    assert.equal(result.skipped, 3);
    assert.equal(result.failed, 1);
    assert.deepEqual(result.results.map((row) => row.status), [
        'fulfilled',
        'skipped',
        'skipped',
        'skipped',
        'failed',
    ]);
    assert.match(result.results.at(-1).reason, /SMTP unavailable/);
});

test('builds a bounded recent recovery window', () => {
    const window = getOrderRecoveryWindow({
        now: new Date('2026-05-27T12:00:00.000Z'),
        minAgeMinutes: 30,
        maxAgeDays: 14,
    });

    assert.equal(window.newestCreatedAt, '2026-05-27T11:30:00.000Z');
    assert.equal(window.oldestCreatedAt, '2026-05-13T12:00:00.000Z');
});
