import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadTurnstileModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/turnstile.ts');
    } finally {
        await server.close();
    }
}

function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

test('accepts a valid Turnstile token for the contact action and Astralo hostname', async () => {
    const { verifyTurnstileToken } = await loadTurnstileModule();
    let receivedBody;

    const result = await verifyTurnstileToken({
        token: 'valid-token',
        secret: 'secret',
        remoteIp: '203.0.113.4',
        expectedAction: 'contact',
        fetchImpl: async (_url, options) => {
            receivedBody = options.body;
            return jsonResponse({ success: true, hostname: 'astralo.online', action: 'contact' });
        },
    });

    assert.equal(result.success, true);
    assert.equal(receivedBody.get('response'), 'valid-token');
    assert.equal(receivedBody.get('remoteip'), '203.0.113.4');
});

test('rejects successful tokens issued for another hostname or action', async () => {
    const { verifyTurnstileToken } = await loadTurnstileModule();

    const wrongHostname = await verifyTurnstileToken({
        token: 'token',
        secret: 'secret',
        expectedAction: 'contact',
        fetchImpl: async () => jsonResponse({ success: true, hostname: 'attacker.example', action: 'contact' }),
    });
    assert.equal(wrongHostname.success, false);
    assert.ok(wrongHostname.errorCodes.includes('hostname-mismatch'));

    const wrongAction = await verifyTurnstileToken({
        token: 'token',
        secret: 'secret',
        expectedAction: 'contact',
        fetchImpl: async () => jsonResponse({ success: true, hostname: 'astralo.online', action: 'other' }),
    });
    assert.equal(wrongAction.success, false);
    assert.ok(wrongAction.errorCodes.includes('action-mismatch'));
});

test('fails closed when Turnstile cannot be reached', async () => {
    const { verifyTurnstileToken } = await loadTurnstileModule();
    const result = await verifyTurnstileToken({
        token: 'token',
        secret: 'secret',
        fetchImpl: async () => { throw new Error('network down'); },
    });

    assert.deepEqual(result, { success: false, errorCodes: ['siteverify-unavailable'] });
});
