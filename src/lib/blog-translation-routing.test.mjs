import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadBlogModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/blog/index.ts');
    } finally {
        await server.close();
    }
}

test('July 2026 article has an exact translation for every supported language', async () => {
    const {
        getArticleLanguageCodes,
        getExactArticleTranslation,
    } = await loadBlogModule();

    const supportedLocales = [
        'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro',
        'bg', 'hr', 'sl', 'sr', 'uk', 'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja',
        'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn',
    ];

    assert.deepEqual(new Set(getArticleLanguageCodes('monthly-horoscope-july-2026')), new Set(supportedLocales));
    for (const locale of supportedLocales) {
        assert.ok(getExactArticleTranslation('monthly-horoscope-july-2026', locale));
    }
});

test('latest article lists exclude stale monthly horoscope articles', async () => {
    const {
        getLatestArticleSlugs,
        getLatestArticleSlugsForLang,
    } = await loadBlogModule();

    // Monthly articles older than the current month must never surface as "latest".
    const staleMonthlyPattern = /^monthly-horoscope-(january|february|march|april|may|june|july)-2026$/;

    const latest = getLatestArticleSlugs(10);
    assert.ok(latest.length > 0);
    for (const slug of latest) {
        assert.doesNotMatch(slug, staleMonthlyPattern);
    }

    for (const locale of ['en', 'sk', 'cs', 'de', 'fr', 'es', 'pt', 'pl', 'hu', 'fi', 'no', 'sv']) {
        const localeLatest = getLatestArticleSlugsForLang(locale, 10);
        assert.ok(localeLatest.length > 0);
        for (const slug of localeLatest) {
            assert.doesNotMatch(slug, staleMonthlyPattern);
        }
    }
});
