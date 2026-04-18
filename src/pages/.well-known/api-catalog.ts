import type { APIRoute } from 'astro';
import { apiDocsPath, healthPath, openApiPath } from '../../lib/agent-ready';
import { siteUrl } from '../../lib/seo';

function buildApiCatalog() {
    return JSON.stringify({
        linkset: [
            {
                anchor: `${siteUrl}/api`,
                'service-desc': [
                    {
                        href: `${siteUrl}${openApiPath}`,
                        type: 'application/json',
                    },
                ],
                'service-doc': [
                    {
                        href: `${siteUrl}${apiDocsPath}`,
                        type: 'text/html',
                    },
                ],
                status: [
                    {
                        href: `${siteUrl}${healthPath}`,
                        type: 'application/json',
                    },
                ],
            },
        ],
    }, null, 2);
}

function createResponse(body: string | null) {
    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}

export const GET: APIRoute = async () => createResponse(buildApiCatalog());
export const HEAD: APIRoute = async () => createResponse(null);

