import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/fulfillment-email-template.ts');
    } finally {
        await server.close();
    }
}

test('builds a branded Romanian recovery email with an apology', async () => {
    const { buildFulfillmentEmail } = await loadModule();
    const email = buildFulfillmentEmail(
        { customerName: 'Patricia', productName: 'Horoscop de cuplu', lang: 'ro' },
        '💕 Compatibilitate\n\nO relație caldă și echilibrată.',
        'https://pay.stripe.com/receipts/example',
        { serviceMessage: 'Ne cerem sincer scuze pentru întârziere.' },
    );

    assert.equal(email.subject, 'Lectura ta personalizată este gata | Astralo');
    assert.match(email.html, /Lectura ta personalizată este gata/);
    assert.match(email.html, /Ne cerem sincer scuze pentru întârziere/);
    assert.match(email.html, /logo\.png/);
    assert.match(email.html, /Vezi dovada plății/);
});

test('escapes customer and generated content and contains no customer-visible provider label', async () => {
    const { buildFulfillmentEmail } = await loadModule();
    const email = buildFulfillmentEmail(
        { customerName: '<script>alert(1)</script>', productName: 'Reading', lang: 'en' },
        '<img src=x onerror=alert(1)>',
        'javascript:alert(1)',
    );

    assert.doesNotMatch(email.html, /<script>|<img src=x|javascript:/i);
    assert.match(email.html, /&lt;script&gt;/);
    assert.doesNotMatch(email.html, /OpenAI|ChatGPT|\bGPT\b|AI-assisted/i);
});
