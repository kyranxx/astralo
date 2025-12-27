import type { APIRoute } from 'astro';

/**
 * IndexNow API Endpoint
 * Notifies Bing, Yandex, Seznam, and Naver about new/updated URLs
 * 
 * Usage: POST /api/indexnow with JSON body: { urls: ["https://..."] }
 * Or GET /api/indexnow?url=https://...
 * 
 * Requires INDEXNOW_KEY environment variable
 */

const INDEXNOW_ENDPOINTS = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
];

export const GET: APIRoute = async ({ url }) => {
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return notifyIndexNow([targetUrl]);
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const urls = body.urls || [body.url];

        if (!urls || urls.length === 0) {
            return new Response(JSON.stringify({ error: 'No URLs provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return notifyIndexNow(urls);
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

async function notifyIndexNow(urls: string[]): Promise<Response> {
    const key = import.meta.env.INDEXNOW_KEY || process.env.INDEXNOW_KEY;

    if (!key) {
        return new Response(JSON.stringify({
            error: 'INDEXNOW_KEY not configured',
            info: 'Generate a key at https://www.bing.com/indexnow and add it to environment variables'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const host = 'astralo.online';
    const results: Record<string, string> = {};

    // Notify all IndexNow endpoints
    for (const endpoint of INDEXNOW_ENDPOINTS) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    host,
                    key,
                    keyLocation: `https://${host}/${key}.txt`,
                    urlList: urls
                })
            });

            results[endpoint] = response.ok ? 'success' : `error: ${response.status}`;
        } catch (e) {
            results[endpoint] = `error: ${e instanceof Error ? e.message : 'unknown'}`;
        }
    }

    return new Response(JSON.stringify({
        message: 'IndexNow notifications sent',
        urls,
        results
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
