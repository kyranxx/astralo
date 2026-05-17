import { defineMiddleware } from 'astro:middleware';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import {
    acceptsMarkdown,
    contentSignal,
    estimateMarkdownTokens,
    extractDescription,
    extractTitle,
    getDiscoveryLinks,
    stripHtmlForMarkdown,
} from './lib/agent-ready';

const markdownConverter = new NodeHtmlMarkdown({
    bulletMarker: '-',
    codeFence: '```',
    useLinkReferenceDefinitions: false,
});

function appendVary(headers: Headers, value: string) {
    const current = headers.get('Vary');

    if (!current) {
        headers.set('Vary', value);
        return;
    }

    const values = current.split(',').map((item) => item.trim().toLowerCase());
    if (!values.includes(value.toLowerCase())) {
        headers.set('Vary', `${current}, ${value}`);
    }
}

function shouldAdvertiseDiscovery(pathname: string) {
    return pathname === '/' || /^\/[a-z]{2}\/?$/.test(pathname);
}

function getCanonicalPathname(pathname: string) {
    if (pathname === '/' || !pathname.endsWith('/')) {
        return pathname;
    }

    return pathname.replace(/\/+$/, '') || '/';
}

export const onRequest = defineMiddleware(async ({ request, url, isPrerendered }, next) => {
    if (request.method === 'GET' || request.method === 'HEAD') {
        const canonicalPathname = getCanonicalPathname(url.pathname);

        if (canonicalPathname !== url.pathname) {
            const redirectUrl = new URL(request.url);
            redirectUrl.pathname = canonicalPathname;

            return new Response(null, {
                status: 308,
                headers: {
                    Location: `${redirectUrl.pathname}${redirectUrl.search}`,
                },
            });
        }
    }

    const response = await next();
    const headers = new Headers(response.headers);
    const contentType = headers.get('content-type') || '';

    if (!url.pathname.startsWith('/api/')) {
        headers.set('Content-Signal', contentSignal);
    }

    if (shouldAdvertiseDiscovery(url.pathname)) {
        for (const link of getDiscoveryLinks()) {
            headers.append('Link', link);
        }
    }

    if (response.status === 204 || request.method === 'HEAD') {
        return new Response(null, {
            status: response.status,
            statusText: response.statusText,
            headers,
        });
    }

    if (isPrerendered) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
        });
    }

    if (!acceptsMarkdown(request.headers.get('accept')) || !contentType.includes('text/html')) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
        });
    }

    const html = await response.text();
    const markdownBody = markdownConverter.translate(stripHtmlForMarkdown(html)).trim();
    const title = extractTitle(html);
    const description = extractDescription(html);
    const markdown = [
        `# ${title}`,
        `Source: ${url.toString()}`,
        description ? `Description: ${description}` : '',
        markdownBody,
    ]
        .filter(Boolean)
        .join('\n\n');

    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('x-markdown-tokens', String(estimateMarkdownTokens(markdown)));
    headers.delete('Content-Length');
    appendVary(headers, 'Accept');

    return new Response(markdown, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
});
