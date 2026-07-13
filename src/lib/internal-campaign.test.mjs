import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadCampaignModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/internal-campaign.ts');
    } finally {
        await server.close();
    }
}

test('builds internal campaign URLs for blog-to-product attribution', async () => {
    const { buildInternalCampaignUrl } = await loadCampaignModule();

    assert.equal(
        buildInternalCampaignUrl('/horoscope/monthly', {
            source: 'blog',
            campaign: 'monthly-horoscope-june-2026',
            content: 'mid_article_cta',
        }),
        '/horoscope/monthly?utm_source=blog&utm_medium=internal&utm_campaign=monthly-horoscope-june-2026&utm_content=mid_article_cta'
    );
});

test('preserves existing query params when adding internal campaign tags', async () => {
    const { buildInternalCampaignUrl } = await loadCampaignModule();

    assert.equal(
        buildInternalCampaignUrl('/de/horoscope/monthly?from=hero', {
            source: 'blog',
            campaign: 'astral-horoskop',
            content: 'product_grid_monthly',
        }),
        '/de/horoscope/monthly?from=hero&utm_source=blog&utm_medium=internal&utm_campaign=astral-horoskop&utm_content=product_grid_monthly'
    );
});
