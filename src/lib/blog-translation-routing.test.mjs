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
        getLatestArticleSlugs,
        getLatestArticleSlugsForLang,
    } = await loadBlogModule();

    const supportedLocales = [
        'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro',
        'bg', 'hr', 'sl', 'sr', 'uk', 'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja',
        'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn',
    ];

    assert.deepEqual(new Set(getArticleLanguageCodes('monthly-horoscope-july-2026')), new Set(supportedLocales));
    for (const locale of supportedLocales) {
        assert.ok(getExactArticleTranslation('monthly-horoscope-july-2026', locale));
        assert.equal(getLatestArticleSlugsForLang(locale, 1)[0], 'monthly-horoscope-july-2026');
    }
    assert.equal(getLatestArticleSlugs(1)[0], 'monthly-horoscope-july-2026');
});
