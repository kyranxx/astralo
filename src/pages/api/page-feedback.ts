import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import {
    buildPageFeedbackEmailHtml,
    buildPageFeedbackEmailSubject,
    parsePageFeedbackPayload,
} from '../../lib/page-feedback';

const jsonHeaders = { 'Content-Type': 'application/json' };

export const POST: APIRoute = async ({ request }) => {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: jsonHeaders,
        });
    }

    const enrichedBody = enrichPayloadWithRequestContext(body, request);
    const parsed = parsePageFeedbackPayload(enrichedBody);

    if (!parsed.ok) {
        return new Response(JSON.stringify({ error: parsed.error }), {
            status: 400,
            headers: jsonHeaders,
        });
    }

    const { HCAPTCHA_SECRET, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, PAGE_FEEDBACK_TO_EMAIL } = import.meta.env;

    if (!HCAPTCHA_SECRET) {
        console.error('Page feedback hCaptcha secret missing');
        return new Response(JSON.stringify({ error: 'Feedback protection is not configured.' }), {
            status: 500,
            headers: jsonHeaders,
        });
    }

    const captchaOk = await verifyHcaptcha(
        parsed.value.hcaptchaToken,
        HCAPTCHA_SECRET,
        getForwardedIp(request),
    );

    if (!captchaOk) {
        return new Response(JSON.stringify({ error: 'Captcha verification failed. Please try again.' }), {
            status: 400,
            headers: jsonHeaders,
        });
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.error('Page feedback SMTP configuration missing');
        return new Response(JSON.stringify({ error: 'Email service is not configured.' }), {
            status: 500,
            headers: jsonHeaders,
        });
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Astralo Feedback" <${SMTP_USER}>`,
            to: PAGE_FEEDBACK_TO_EMAIL || 'apollotechsro@gmail.com',
            replyTo: parsed.value.email || undefined,
            subject: buildPageFeedbackEmailSubject(parsed.value),
            html: buildPageFeedbackEmailHtml(parsed.value),
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error('Page feedback email error:', error);
        return new Response(JSON.stringify({ error: 'Failed to send feedback.' }), {
            status: 500,
            headers: jsonHeaders,
        });
    }
};

function enrichPayloadWithRequestContext(body: unknown, request: Request): unknown {
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
        return body;
    }

    return {
        ...(body as Record<string, unknown>),
        userAgent: request.headers.get('user-agent') || '',
        referrer: (body as Record<string, unknown>).referrer || request.headers.get('referer') || '',
    };
}

function getForwardedIp(request: Request): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    return forwardedFor ? forwardedFor.split(',')[0].trim() : '';
}

async function verifyHcaptcha(token: string, secret: string, remoteIp: string): Promise<boolean> {
    const params = new URLSearchParams({
        response: token,
        secret,
    });

    if (remoteIp) {
        params.set('remoteip', remoteIp);
    }

    try {
        const response = await fetch('https://api.hcaptcha.com/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });

        if (!response.ok) return false;

        const result = await response.json();
        return result?.success === true;
    } catch (error) {
        console.error('Page feedback hCaptcha verification error:', error);
        return false;
    }
}
