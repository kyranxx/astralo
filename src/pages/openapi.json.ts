import type { APIRoute } from 'astro';
import { buildOpenApiSpec } from '../lib/agent-ready';

function createResponse(body: string | null) {
    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}

export const GET: APIRoute = async () => createResponse(JSON.stringify(buildOpenApiSpec(), null, 2));
export const HEAD: APIRoute = async () => createResponse(null);

