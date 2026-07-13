import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { verifyTurnstileToken } from '../../lib/turnstile';

export const POST: APIRoute = async ({ request }) => {
    let data;
    try {
        data = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    const name = typeof data?.name === 'string' ? data.name.trim().slice(0, 120) : '';
    const email = typeof data?.email === 'string' ? data.email.trim().slice(0, 254) : '';
    const subject = typeof data?.subject === 'string' ? data.subject.trim().slice(0, 80) : '';
    const message = typeof data?.message === 'string' ? data.message.trim().slice(0, 5000) : '';
    const turnstileToken = typeof data?.turnstileToken === 'string' ? data.turnstileToken.trim() : '';

    if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
        console.error('Contact form: TURNSTILE_SECRET_KEY is missing');
        return new Response(JSON.stringify({ error: 'Contact form protection is not configured.' }), { status: 503 });
    }

    if (!turnstileToken) {
        return new Response(JSON.stringify({ error: 'Please complete the security check.' }), { status: 400 });
    }

    const remoteIp = request.headers.get('cf-connecting-ip')
        || request.headers.get('x-real-ip')
        || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || undefined;
    const turnstileResult = await verifyTurnstileToken({
        token: turnstileToken,
        secret: turnstileSecret,
        remoteIp,
        expectedAction: 'contact',
    });

    if (!turnstileResult.success) {
        console.error('Contact form: Turnstile verification failed', turnstileResult.errorCodes);
        return new Response(JSON.stringify({ error: 'Security check failed. Please try again.' }), { status: 400 });
    }

    // Send email via SMTP (same as horoscope emails)
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.error('SMTP configuration missing');
        return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
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

    // Escape HTML to prevent XSS in emails
    const escapeHtml = (text: string): string => {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    try {
        // Owner delivery is the primary operation. Customer confirmation must
        // never turn a successfully received support request into a UI failure.
        await transporter.sendMail({
            from: `"Astralo Contact" <${SMTP_USER}>`,
            to: 'apollotechsro@gmail.com',
            replyTo: email,
            subject: `[Astralo Contact] ${safeSubject} - from ${safeName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #f59e0b;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
                    <p><strong>Subject:</strong> ${safeSubject}</p>
                    <hr style="border: 1px solid #eee;">
                    <div style="padding: 20px 0;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${safeMessage}</p>
                    </div>
                    <hr style="border: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        Reply directly to this email to respond to the customer.
                    </p>
                </div>
            `,
        });

    } catch (error: any) {
        console.error('Contact owner email error:', {
            code: error?.code,
            command: error?.command,
            responseCode: error?.responseCode,
            message: error?.message,
        });
        return new Response(JSON.stringify({
            error: 'Your message could not be delivered to support. Please email apollotechsro@gmail.com directly.',
            errorCode: 'owner_email_failed',
        }), { status: 502 });
    }

    let confirmationSent = true;
    try {
        await transporter.sendMail({
            from: `"Astralo" <${SMTP_USER}>`,
            to: email,
            subject: 'We received your message - Astralo',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 40px; width: auto; margin-bottom: 20px;">
                    <h2 style="color: #f59e0b;">Thank you for contacting us!</h2>
                    <p>Hi ${safeName},</p>
                    <p>We've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your message:</strong></p>
                        <p style="white-space: pre-wrap; color: #666;">${safeMessage}</p>
                    </div>
                    <p>Best regards,<br>The Astralo Team</p>
                </div>
            `,
        });

    } catch (error: any) {
        confirmationSent = false;
        console.error('Contact confirmation email error:', {
            code: error?.code,
            command: error?.command,
            responseCode: error?.responseCode,
            message: error?.message,
        });
    }

    return new Response(JSON.stringify({ success: true, confirmationSent }), { status: 200 });
};
