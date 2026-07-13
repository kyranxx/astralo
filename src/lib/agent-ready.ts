import crypto from 'node:crypto';
import { getSupportedLocales } from './i18n';
import { getProductKeys, getProductName, productPrices, type ProductKey } from './products';
import { siteUrl } from './seo';

export const contentSignal = 'ai-train=no, search=yes, ai-input=yes';
export const apiCatalogPath = '/.well-known/api-catalog';
export const apiDocsPath = '/docs/api';
export const openApiPath = '/openapi.json';
export const healthPath = '/api/health';
export const agentSkillsIndexPath = '/.well-known/agent-skills/index.json';
export const llmsPath = '/llms.txt';

export const supportedLocaleCodes = getSupportedLocales();

export const productCatalog = Object.fromEntries(
    getProductKeys().map((productKey) => [
        productKey,
        {
            slug: productKey,
            name: getProductName(productKey, 'en'),
            priceEur: productPrices[productKey] / 100,
            path: `/horoscope/${productKey}`,
        },
    ]),
) as Record<ProductKey, { slug: ProductKey; name: string; priceEur: number; path: string }>;

export type ProductSlug = keyof typeof productCatalog;

export function getDiscoveryLinks() {
    return [
        `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
        `</openapi.json>; rel="service-desc"; type="application/json"`,
        `</docs/api>; rel="service-doc"; type="text/html"`,
        `</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
        `</llms.txt>; rel="describedby"; type="text/plain"`,
    ];
}

export function acceptsMarkdown(acceptHeader: string | null) {
    if (!acceptHeader) {
        return false;
    }

    return acceptHeader
        .split(',')
        .map((value) => value.trim())
        .some((value) => {
            if (!value.startsWith('text/markdown')) {
                return false;
            }

            const qMatch = value.match(/;\s*q=([0-9.]+)/i);
            return !qMatch || Number(qMatch[1]) > 0;
        });
}

export function estimateMarkdownTokens(markdown: string) {
    return Math.max(1, Math.ceil(markdown.length / 4));
}

export function stripHtmlForMarkdown(html: string) {
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
}

export function extractTitle(html: string) {
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match?.[1]?.trim() || 'Astralo';
}

export function extractDescription(html: string) {
    const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    return match?.[1]?.trim() || '';
}

export function buildOpenApiSpec() {
    return {
        openapi: '3.1.0',
        info: {
            title: 'Astralo Public API',
            version: '1.0.0',
            description: 'Public endpoints used by the Astralo website for checkout, horoscope generation, subscriptions, contact requests, and health checks.',
        },
        servers: [
            {
                url: siteUrl,
            },
        ],
        tags: [
            { name: 'System', description: 'Operational endpoints.' },
            { name: 'Checkout', description: 'Checkout and horoscope generation flow.' },
            { name: 'Marketing', description: 'Lead capture and contact forms.' },
        ],
        paths: {
            '/api/health': {
                get: {
                    tags: ['System'],
                    summary: 'Health check',
                    operationId: 'getHealth',
                    responses: {
                        '200': {
                            description: 'Service is healthy.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: { type: 'string', example: 'ok' },
                                            service: { type: 'string', example: 'astralo' },
                                            timestamp: { type: 'string', format: 'date-time' },
                                        },
                                        required: ['status', 'service', 'timestamp'],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/checkout': {
                post: {
                    tags: ['Checkout'],
                    summary: 'Create a Stripe Checkout session',
                    description: 'Used by the website checkout form. Requests must come from an allowed Astralo origin or referer.',
                    operationId: 'createCheckoutSession',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        productKey: {
                                            type: 'string',
                                            enum: getProductKeys(),
                                        },
                                        lang: {
                                            type: 'string',
                                            minLength: 2,
                                            maxLength: 2,
                                            example: 'en',
                                        },
                                        name: { type: 'string', maxLength: 100 },
                                        email: { type: 'string', format: 'email', maxLength: 254 },
                                        birthDate: { type: 'string', format: 'date' },
                                        birthTime: { type: 'string', example: '08:30' },
                                        birthPlace: { type: 'string', maxLength: 100 },
                                        name1: { type: 'string', maxLength: 100 },
                                        email1: { type: 'string', format: 'email', maxLength: 254 },
                                        birthDate1: { type: 'string', format: 'date' },
                                        birthTime1: { type: 'string', example: '08:30' },
                                        birthPlace1: { type: 'string', maxLength: 100 },
                                        name2: { type: 'string', maxLength: 100 },
                                        birthDate2: { type: 'string', format: 'date' },
                                        birthTime2: { type: 'string', example: '10:15' },
                                        birthPlace2: { type: 'string', maxLength: 100 },
                                        landingPath: { type: 'string', maxLength: 300 },
                                        lastPath: { type: 'string', maxLength: 300 },
                                        referrer: { type: 'string', maxLength: 500 },
                                        firstSeenAt: { type: 'string' },
                                        lastSeenAt: { type: 'string' },
                                        utm_source: { type: 'string', maxLength: 200 },
                                        utm_medium: { type: 'string', maxLength: 200 },
                                        utm_campaign: { type: 'string', maxLength: 200 },
                                        utm_term: { type: 'string', maxLength: 200 },
                                        utm_content: { type: 'string', maxLength: 200 },
                                        gclid: { type: 'string', maxLength: 200 },
                                        fbclid: { type: 'string', maxLength: 200 },
                                        msclkid: { type: 'string', maxLength: 200 },
                                        currentUrl: { type: 'string', format: 'uri' },
                                    },
                                    required: ['productKey'],
                                },
                                examples: {
                                    single: {
                                        value: {
                                            productKey: 'monthly',
                                            lang: 'en',
                                            name: 'Jane Doe',
                                            email: 'jane@example.com',
                                            birthDate: '1994-08-11',
                                            birthTime: '08:30',
                                            birthPlace: 'Bratislava',
                                        },
                                    },
                                    partner: {
                                        value: {
                                            productKey: 'partner',
                                            lang: 'en',
                                            name1: 'Jane Doe',
                                            email1: 'jane@example.com',
                                            birthDate1: '1994-08-11',
                                            birthTime1: '08:30',
                                            birthPlace1: 'Bratislava',
                                            name2: 'John Doe',
                                            birthDate2: '1992-04-21',
                                            birthTime2: '10:15',
                                            birthPlace2: 'Prague',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Checkout session created.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            url: { type: 'string', format: 'uri' },
                                        },
                                        required: ['url'],
                                    },
                                },
                            },
                        },
                        '400': { description: 'Invalid request payload.' },
                        '403': { description: 'Origin or referer not allowed.' },
                        '500': { description: 'Checkout session could not be created.' },
                    },
                },
            },
            '/api/horoscope': {
                post: {
                    tags: ['Checkout'],
                    summary: 'Generate or return horoscope content for a Stripe session',
                    description: 'Used after a successful checkout. Requests must come from an allowed Astralo origin or referer.',
                    operationId: 'generateHoroscope',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        sessionId: { type: 'string', minLength: 10 },
                                    },
                                    required: ['sessionId'],
                                },
                                example: {
                                    sessionId: 'cs_test_1234567890',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Horoscope was generated or already exists.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        additionalProperties: true,
                                    },
                                },
                            },
                        },
                        '400': { description: 'Invalid session data.' },
                        '403': { description: 'Origin or referer not allowed.' },
                        '500': { description: 'Horoscope generation failed.' },
                    },
                },
            },
            '/api/subscribe': {
                post: {
                    tags: ['Marketing'],
                    summary: 'Subscribe an email address',
                    operationId: 'subscribeEmail',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', format: 'email' },
                                        source: { type: 'string', default: 'website' },
                                        lang: { type: 'string', default: 'en' },
                                        gdprConsent: { type: 'boolean', default: true },
                                    },
                                    required: ['email'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Subscription accepted.' },
                        '400': { description: 'Invalid email or missing consent.' },
                        '500': { description: 'Subscription failed.' },
                    },
                },
            },
            '/api/contact': {
                post: {
                    tags: ['Marketing'],
                    summary: 'Send a contact request',
                    operationId: 'sendContactRequest',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        email: { type: 'string', format: 'email' },
                                        subject: { type: 'string' },
                                        message: { type: 'string' },
                                        'h-captcha-response': { type: 'string' },
                                    },
                                    required: ['name', 'email', 'subject', 'message'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Message delivered.' },
                        '400': { description: 'Invalid form data or captcha failure.' },
                        '500': { description: 'Email service failed.' },
                    },
                },
            },
        },
    };
}

const productSkillBody = `# Browse Astralo Horoscope Products

Use this skill when a user wants to compare, open, or explain Astralo horoscope products.

## Product routes

${getProductKeys().map((productKey) => `- ${productKey}: ${siteUrl}/horoscope/${productKey}`).join('\n')}

## Notes

- English lives at the root path.
- Localized pages use /{lang}/... for supported two-letter locale codes.
- Astralo currently supports these locales: ${supportedLocaleCodes.join(', ')}.

## Product pricing

${getProductKeys().map((productKey) => `- ${productKey}: EUR ${productCatalog[productKey].priceEur.toFixed(2)}`).join('\n')}
`;

const blogSkillBody = `# Read Astralo Blog Content

Use this skill when a user wants to discover or open Astralo editorial content.

## Main entry points

- Blog index: ${siteUrl}/blog
- RSS feed: ${siteUrl}/rss.xml
- LLM summary file: ${siteUrl}/llms.txt

## Notes

- Blog articles are public and localized.
- English articles live under /blog/{slug}.
- Localized articles live under /{lang}/blog/{slug}.
`;

const apiSkillBody = `# Use the Astralo Public API

Use this skill when an agent needs the machine-readable API description for Astralo.

## Discovery

- OpenAPI: ${siteUrl}${openApiPath}
- API docs: ${siteUrl}${apiDocsPath}
- API catalog: ${siteUrl}${apiCatalogPath}
- Health endpoint: ${siteUrl}${healthPath}

## Notes

- Checkout and horoscope generation endpoints are intended for Astralo website flows.
- Some endpoints enforce allowed origin or referer checks.
- JSON responses are returned over HTTPS.
`;

export const agentSkills = [
    {
        slug: 'browse-horoscope-products',
        name: 'browse-horoscope-products',
        type: 'skill-md',
        description: 'Open Astralo horoscope product pages, compare product types, and understand supported locales and pricing.',
        body: productSkillBody,
    },
    {
        slug: 'read-blog-content',
        name: 'read-blog-content',
        type: 'skill-md',
        description: 'Discover Astralo blog entry points, article routes, and RSS resources.',
        body: blogSkillBody,
    },
    {
        slug: 'use-public-api',
        name: 'use-public-api',
        type: 'skill-md',
        description: 'Discover the Astralo OpenAPI document, API catalog, docs page, and health endpoint.',
        body: apiSkillBody,
    },
] as const;

export function getAgentSkill(slug: string) {
    return agentSkills.find((skill) => skill.slug === slug);
}

export function sha256(value: string) {
    return `sha256:${crypto.createHash('sha256').update(value).digest('hex')}`;
}
