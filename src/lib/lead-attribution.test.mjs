import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadLeadAttributionModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/lead-attribution.ts');
    } finally {
        await server.close();
    }
}

test('keeps blog campaign context when a free-horoscope signup came from an article', async () => {
    const {
        buildLeadAttributionEventParams,
        buildSubscriberSource,
        getLeadAttributionFromSearch,
        getSignupArticleSlug,
    } = await loadLeadAttributionModule();

    const attribution = getLeadAttributionFromSearch(
        '?ref_source=blog&ref_medium=internal&ref_campaign=monthly-horoscope-july-2026&ref_content=final_free_horoscope_cta'
    );

    assert.equal(
        buildSubscriberSource({
            captureSource: 'inline',
            pageType: 'free_horoscope',
            attribution,
        }),
        'inline_free_horoscope_from_blog'
    );
    assert.equal(getSignupArticleSlug('/free-horoscope', attribution), 'monthly-horoscope-july-2026');
    assert.deepEqual(buildLeadAttributionEventParams(attribution), {
        lead_utm_source: 'blog',
        lead_utm_medium: 'internal',
        lead_utm_campaign: 'monthly-horoscope-july-2026',
        lead_utm_content: 'final_free_horoscope_cta',
    });
});

test('keeps direct and in-article signup sources stable', async () => {
    const {
        buildSubscriberSource,
        getCapturePageType,
        getLeadAttributionFromSearch,
        getSignupArticleSlug,
    } = await loadLeadAttributionModule();

    const directAttribution = getLeadAttributionFromSearch('');

    assert.equal(getCapturePageType('/pt/blog/monthly-horoscope-july-2026'), 'blog');
    assert.equal(getSignupArticleSlug('/pt/blog/monthly-horoscope-july-2026', directAttribution), 'monthly-horoscope-july-2026');
    assert.equal(
        buildSubscriberSource({
            captureSource: 'inline',
            pageType: 'blog',
            attribution: directAttribution,
        }),
        'inline_blog'
    );
    assert.equal(
        buildSubscriberSource({
            captureSource: 'inline',
            pageType: 'free_horoscope',
            attribution: directAttribution,
        }),
        'inline_free_horoscope'
    );
});

test('classifies detailed subscriber sources by capture surface', async () => {
    const { getSubscriberCaptureSurface } = await loadLeadAttributionModule();

    assert.equal(getSubscriberCaptureSurface('inline'), 'inline');
    assert.equal(getSubscriberCaptureSurface('inline_blog'), 'inline');
    assert.equal(getSubscriberCaptureSurface('inline_free_horoscope_from_blog'), 'inline');
    assert.equal(getSubscriberCaptureSurface('popup_site'), 'popup');
    assert.equal(getSubscriberCaptureSurface('website'), 'other');
});
