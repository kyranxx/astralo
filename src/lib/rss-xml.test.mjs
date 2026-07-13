import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function renderRssXml() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        const route = await server.ssrLoadModule('/src/pages/rss.xml.ts');
        const response = await route.GET();
        return response.text();
    } finally {
        await server.close();
    }
}

test('RSS feed excludes stale monthly horoscope articles', async () => {
    const xml = await renderRssXml();

    assert.doesNotMatch(xml, /monthly-horoscope-january-2026/);
    assert.doesNotMatch(xml, /monthly-horoscope-february-2026/);
    assert.doesNotMatch(xml, /monthly-horoscope-march-2026/);
    assert.doesNotMatch(xml, /monthly-horoscope-april-2026/);
    assert.doesNotMatch(xml, /monthly-horoscope-june-2026/);
    assert.match(xml, /monthly-horoscope-july-2026/);
});
