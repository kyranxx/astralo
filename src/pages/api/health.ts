import type { APIRoute } from 'astro';

function buildPayload() {
    return JSON.stringify({
        status: 'ok',
        service: 'astralo',
        timestamp: new Date().toISOString(),
    });
}

function createResponse(body: string | null) {
    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=60',
        },
    });
}

export const GET: APIRoute = async () => createResponse(buildPayload());
export const HEAD: APIRoute = async () => createResponse(null);

