import { z } from 'zod';

// Helper to validate date strings YYYY-MM-DD
const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format (YYYY-MM-DD)" });
const timeString = z.string().regex(/^\d{2}:\d{2}$/, { message: "Invalid time format (HH:MM)" }).optional().or(z.literal(''));

export const CheckoutSchema = z.object({
    productKey: z.enum(['daily', 'weekly', 'monthly', 'partner']),
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

// Simple Referer Check (Basic CSRF protection)
export function validateReferer(request: Request) {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    const allowed = [
        'https://astralo.online',
        'http://localhost:4321',
        'http://localhost:3000'
    ];

    const check = (url: string | null) => {
        if (!url) return false;
        return allowed.some(domain => url.startsWith(domain));
    };

    // Strict mode: both must be valid if present, but typically Referer is enough
    if (!check(origin) && !check(referer)) {
        return false;
    }
    return true;
}
