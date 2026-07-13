import { z } from 'zod';
import { productKeys } from './products';

// Helper to validate date strings YYYY-MM-DD
const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format (YYYY-MM-DD)" });
const timeString = z.string().regex(/^\d{2}:\d{2}$/, { message: "Invalid time format (HH:MM)" }).optional().or(z.literal(''));

export const CheckoutSchema = z.object({
    productKey: z.enum(productKeys),
    lang: z.string().length(2).default('en'),

    // Common fields
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().max(254).optional(),
    birthDate: dateString.optional(),
    birthTime: timeString,
    birthPlace: z.string().max(100).optional(),

    // Partner fields
    name1: z.string().max(100).optional(),
    email1: z.string().email().max(254).optional(),
    birthDate1: dateString.optional(),
    birthTime1: timeString,
    birthPlace1: z.string().max(100).optional(),

    name2: z.string().max(100).optional(),
    birthDate2: dateString.optional(),
    birthTime2: timeString,
    birthPlace2: z.string().max(100).optional(),

    // Marketing attribution
    landingPath: z.string().max(300).optional(),
    lastPath: z.string().max(300).optional(),
    referrer: z.string().max(500).optional(),
    firstSeenAt: z.string().max(100).optional(),
    lastSeenAt: z.string().max(100).optional(),
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    fbclid: z.string().max(200).optional(),
    msclkid: z.string().max(200).optional(),
    gaClientId: z.string().max(100).optional(),

    // Payment source URL for redirection (security check)
    currentUrl: z.string().url().optional(),
}).refine(data => {
    // If partner product, ensure partner fields are present
    if (data.productKey === 'partner') {
        return !!(data.name1 && data.email1 && data.birthDate1 && data.name2 && data.birthDate2);
    }
    // Otherwise standard fields
    return !!(data.name && data.email && data.birthDate);
}, {
    message: "Missing required fields for selected product",
    path: ["productKey"]
});

export const HoroscopeRequestSchema = z.object({
    sessionId: z.string().min(10, "Invalid Session ID"),
});

function isAllowedRequestUrl(value: string | null) {
    if (!value) return false;

    try {
        const url = new URL(value);
        const hostname = url.hostname.toLowerCase();
        const isHttps = url.protocol === 'https:';
        const isHttp = url.protocol === 'http:';

        if (isHttps && (hostname === 'astralo.online' || hostname === 'www.astralo.online')) {
            return true;
        }

        if (isHttps && hostname.startsWith('astralo-') && hostname.endsWith('.vercel.app')) {
            return true;
        }

        if ((isHttp || isHttps) && (hostname === 'localhost' || hostname === '127.0.0.1')) {
            const port = url.port ? Number(url.port) : undefined;
            return port === undefined || (Number.isInteger(port) && port > 0 && port <= 65535);
        }
    } catch {
        return false;
    }

    return false;
}

// Basic CSRF protection for browser-submitted commerce endpoints.
export function validateReferer(request: Request) {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');

    const originAllowed = origin ? isAllowedRequestUrl(origin) : false;
    const refererAllowed = referer ? isAllowedRequestUrl(referer) : false;

    if (origin && !originAllowed) return false;
    if (referer && !refererAllowed) return false;

    return originAllowed || refererAllowed;
}
