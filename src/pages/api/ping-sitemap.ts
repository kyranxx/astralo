import type { APIRoute } from 'astro';

/**
 * Sitemap ping endpoints from Google and Bing were deprecated.
 * This route now returns current guidance instead of pretending to submit.
 */

const SITEMAP_URL = 'https://astralo.online/sitemap-index.xml';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({
        message: 'Anonymous sitemap ping endpoints are deprecated.',
        sitemap: SITEMAP_URL,
        recommendedActions: [
            'Keep robots.txt and sitemap-index.xml publicly accessible.',
            'Submit the sitemap in Google Search Console and Bing Webmaster Tools.',
            'Use /api/indexnow for newly published or materially updated URLs.',
        ],
        timestamp: new Date().toISOString(),
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
