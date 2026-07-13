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

test('builds concise blog SEO titles while preserving article H1 titles', async () => {
    const { getArticleTranslation, getBlogSeoTitle } = await loadBlogModule();
    const article = getArticleTranslation('monthly-horoscope-july-2026', 'en');

    assert.equal(
        getBlogSeoTitle(article.title, article.seoTitle),
        'Monthly Horoscope July 2026'
    );
    assert.ok(`${getBlogSeoTitle(article.title, article.seoTitle)} | Astralo`.length <= 60);
});

test('strips decorative emoji from generated SEO titles', async () => {
    const { getBlogSeoTitle } = await loadBlogModule();

    assert.equal(
        getBlogSeoTitle('⭐ Daily Horoscope 2026: The Ultimate Guide'),
        'Daily Horoscope 2026'
    );
});

test('builds clean display titles without repeating decorative article emoji', async () => {
    const { getBlogDisplayTitle } = await loadBlogModule();

    assert.equal(
        getBlogDisplayTitle('❤️ Zodiac Compatibility: Best Matches for Every Star Sign in 2026'),
        'Zodiac Compatibility: Best Matches for Every Star Sign in 2026'
    );
});

test('keeps the compatibility guide explicit SEO title under 60 characters with brand', async () => {
    const { getArticleTranslation, getBlogSeoTitle } = await loadBlogModule();
    const article = getArticleTranslation('zodiac-compatibility-complete-guide', 'en');
    const title = `${getBlogSeoTitle(article.title, article.seoTitle)} | Astralo`;

    assert.equal(title, 'Zodiac Compatibility 2026: Sign Match Table | Astralo');
    assert.ok(title.length <= 60);
});

test('keeps the Norwegian daily guide aligned to dagens horoskop search intent', async () => {
    const { getArticleTranslation, getBlogSeoTitle } = await loadBlogModule();
    const article = getArticleTranslation('daily-horoscope-guide', 'no');
    const title = `${getBlogSeoTitle(article.title, article.seoTitle)} | Astralo`;

    assert.equal(title, 'Dagens horoskop: Guide til dagshoroskop | Astralo');
    assert.ok(title.length <= 60);
    assert.match(article.metaDescription, /dagens horoskop/i);
    assert.match(article.metaDescription, /dagshoroskop/i);
    assert.ok([...article.metaDescription].length <= 160);
});
