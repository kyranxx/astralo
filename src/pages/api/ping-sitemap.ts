import type { APIRoute } from 'astro';

/**
 * Sitemap Ping API Endpoint
 * Notifies Google and Bing that sitemap has been updated
 * 
 * Usage: GET /api/ping-sitemap
 * 
 * Call this after deploying to speed up crawler discovery
 */

const SITEMAP_URL = 'https://astralo.online/sitemap-index.xml';

const PING_ENDPOINTS = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
];

export const GET: APIRoute = async () => {
    const results: Record<string, string> = {};

    for (const endpoint of PING_ENDPOINTS) {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 'User-Agent': 'Astralo Sitemap Ping Bot/1.0' }
            });

            results[endpoint.split('?')[0]] = response.ok
                ? `success (${response.status})`
                : `error: ${response.status}`;
        } catch (e) {
            results[endpoint.split('?')[0]] = `error: ${e instanceof Error ? e.message : 'unknown'}`;
        }
    }

    return new Response(JSON.stringify({
        message: 'Sitemap ping sent to search engines',
        sitemap: SITEMAP_URL,
        results,
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
