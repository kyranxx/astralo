export type PageFeedbackRating = 'helpful' | 'not_helpful';

export interface PageFeedbackSubmission {
    rating: PageFeedbackRating;
    feedback: string;
    email: string;
    pageUrl: string;
    pagePath: string;
    pageTitle: string;
    lang: string;
    userAgent: string;
    referrer: string;
    hcaptchaToken: string;
}

type ParseResult =
    | { ok: true; value: PageFeedbackSubmission }
    | { ok: false; error: string };

const MIN_OPEN_MS = 2500;
const MAX_OPEN_MS = 2 * 60 * 60 * 1000;
const SITE_BASE_URL = 'https://astralo.online';
const ALLOWED_HOSTS = new Set([
    'astralo.online',
    'www.astralo.online',
    'localhost',
    '127.0.0.1',
]);

export function parsePageFeedbackPayload(payload: unknown, now = Date.now()): ParseResult {
    if (!isRecord(payload)) {
        return { ok: false, error: 'Invalid feedback.' };
    }

    if (readString(payload.website)) {
        return { ok: false, error: 'Feedback could not be accepted.' };
    }

    const openedAt = Number(readString(payload.openedAt));
    if (!Number.isFinite(openedAt)) {
        return { ok: false, error: 'Please reopen the feedback form and try again.' };
    }

    const elapsedMs = now - openedAt;
    if (elapsedMs < MIN_OPEN_MS) {
        return { ok: false, error: 'Please spend a moment on the page before sending feedback.' };
    }

    if (elapsedMs > MAX_OPEN_MS) {
        return { ok: false, error: 'Please reopen the feedback form and try again.' };
    }

    const rating = readString(payload.rating);
    if (rating !== 'helpful' && rating !== 'not_helpful') {
        return { ok: false, error: 'Please choose whether the page was helpful.' };
    }

    const feedback = readString(payload.feedback).slice(0, 1500);
    if (rating === 'not_helpful' && feedback.length === 0) {
        return { ok: false, error: 'Please tell us what you expected, wanted changed, or wanted added.' };
    }

    const hcaptchaToken = readString(payload.hcaptchaToken || payload['h-captcha-response']);
    if (!hcaptchaToken) {
        return { ok: false, error: 'Please complete the captcha.' };
    }

    const email = normalizeEmail(readString(payload.email));
    if (email === null) {
        return { ok: false, error: 'Please enter a valid email or leave it empty.' };
    }

    const page = normalizePageUrl(readString(payload.pageUrl));
    if (!page) {
        return { ok: false, error: 'Invalid page URL.' };
    }

    return {
        ok: true,
        value: {
            rating,
            feedback,
            email,
            pageUrl: page.url,
            pagePath: page.path,
            pageTitle: readString(payload.pageTitle).slice(0, 180),
            lang: normalizeLang(readString(payload.lang)),
            userAgent: readString(payload.userAgent).slice(0, 300),
            referrer: readString(payload.referrer).slice(0, 500),
            hcaptchaToken,
        },
    };
}

export function buildPageFeedbackEmailSubject(submission: PageFeedbackSubmission): string {
    const label = submission.rating === 'helpful' ? 'Helpful' : 'Not helpful';
    const path = submission.pagePath || '/';
    return `[Astralo Feedback] ${label} - ${path}`.slice(0, 180);
}

export function buildPageFeedbackEmailHtml(submission: PageFeedbackSubmission): string {
    const ratingLabel = submission.rating === 'helpful' ? 'Helpful' : 'Not helpful';
    const feedbackText = submission.feedback || 'No extra comment.';
    const replyLine = submission.email || 'No visitor email provided.';

    return `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
            <h2 style="color: #92400e;">New Astralo Page Feedback</h2>
            <p><strong>Rating:</strong> ${escapeHtml(ratingLabel)}</p>
            <p><strong>Visitor email:</strong> ${escapeHtml(replyLine)}</p>
            <p><strong>Page:</strong> <a href="${escapeAttribute(submission.pageUrl)}">${escapeHtml(submission.pagePath || submission.pageUrl)}</a></p>
            <p><strong>Title:</strong> ${escapeHtml(submission.pageTitle || 'Unknown')}</p>
            <p><strong>Language:</strong> ${escapeHtml(submission.lang)}</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p><strong>Feedback:</strong></p>
            <div style="white-space: pre-wrap; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">${escapeHtml(feedbackText)}</div>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">
                Referrer: ${escapeHtml(submission.referrer || 'None')}<br>
                Browser: ${escapeHtml(submission.userAgent || 'Unknown')}
            </p>
        </div>
    `;
}

function normalizePageUrl(value: string): { url: string; path: string } | null {
    if (!value) return null;

    try {
        const url = new URL(value, SITE_BASE_URL);
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
        if (!isAllowedHost(url.hostname)) return null;

        const path = `${url.pathname}${url.search}`;
        return {
            url: `${url.origin}${path}`,
            path: url.pathname || '/',
        };
    } catch {
        return null;
    }
}

function isAllowedHost(hostname: string): boolean {
    return ALLOWED_HOSTS.has(hostname) || hostname.endsWith('.vercel.app');
}

function normalizeEmail(value: string): string | null {
    if (!value) return '';

    const email = value.toLowerCase().slice(0, 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
    return email;
}

function normalizeLang(value: string): string {
    const lang = value.toLowerCase().replace(/[^a-z-]/g, '').slice(0, 8);
    return lang || 'en';
}

function readString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttribute(value: string): string {
    return escapeHtml(value).replace(/`/g, '&#096;');
}
