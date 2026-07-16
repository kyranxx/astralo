import type { APIRoute } from 'astro';
import { readSitemapUrls, submitIndexNowUrls, validateAstraloUrls } from '../../lib/indexnow';

export const maxDuration = 60;

const { CRON_SECRET, INDEXNOW_KEY } = import.meta.env;

function isAuthorized(request: Request): boolean {
    return Boolean(CRON_SECRET && request.headers.get('authorization') === `Bearer ${CRON_SECRET}`);
}

export const GET: APIRoute = async ({ request, url }) => {
    if (!isAuthorized(request)) return json({ error: 'Unauthorized' }, 401);
    if (!INDEXNOW_KEY) return json({ error: 'INDEXNOW_KEY not configured' }, 500);

    try {
        const requestedUrl = url.searchParams.get('url');
        const urls = requestedUrl ? validateAstraloUrls([requestedUrl]) : await readSitemapUrls();
        if (urls.length === 0) return json({ error: 'No valid Astralo URLs found' }, 400);

        const batches = await submitIndexNowUrls(urls, INDEXNOW_KEY);
        return json({ message: 'IndexNow submission accepted', submitted: urls.length, batches });
    } catch (error) {
        return json({ error: error instanceof Error ? error.message : 'IndexNow submission failed' }, 502);
    }
};

export const POST: APIRoute = async ({ request }) => {
    if (!isAuthorized(request)) return json({ error: 'Unauthorized' }, 401);
    if (!INDEXNOW_KEY) return json({ error: 'INDEXNOW_KEY not configured' }, 500);

    try {
        const body = await request.json();
        const supplied = Array.isArray(body.urls) ? body.urls : [body.url];
        const urls = validateAstraloUrls(supplied.filter((value): value is string => typeof value === 'string'));
        if (urls.length === 0) return json({ error: 'No valid Astralo URLs provided' }, 400);

        const batches = await submitIndexNowUrls(urls, INDEXNOW_KEY);
        return json({ message: 'IndexNow submission accepted', submitted: urls.length, batches });
    } catch (error) {
        return json({ error: error instanceof Error ? error.message : 'Invalid request' }, 400);
    }
};

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
