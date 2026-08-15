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

    // All 2026 monthly articles published before the current month are stale.
    assert.doesNotMatch(xml, /monthly-horoscope-(january|february|march|april|may|june|july)-2026/);
    // Evergreen articles stay in the feed.
    assert.match(xml, /daily-horoscope-guide/);
    assert.match(xml, /zodiac-compatibility-complete-guide/);
});
