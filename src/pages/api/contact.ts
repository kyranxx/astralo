import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
    let data;
    try {
        data = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    const { name, email, subject, message } = data;
    const hcaptchaToken = data['h-captcha-response'];

    if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    // hCaptcha verification enabled
    const HCAPTCHA_DISABLED_FOR_DEV = false;

    // Verify hCaptcha token
    const hcaptchaSecret = import.meta.env.HCAPTCHA_SECRET;
    console.log('Contact form: hCaptcha check - secret exists:', !!hcaptchaSecret, 'token exists:', !!hcaptchaToken);

    if (!HCAPTCHA_DISABLED_FOR_DEV && hcaptchaSecret && hcaptchaToken) {
        try {
            const verifyResponse = await fetch('https://api.hcaptcha.com/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `response=${hcaptchaToken}&secret=${hcaptchaSecret}`,
            });
            const verifyResult = await verifyResponse.json();
            console.log('hCaptcha verification result:', JSON.stringify(verifyResult));

            if (!verifyResult.success) {
                console.error('hCaptcha verification failed:', verifyResult);
                const errorCodes = verifyResult['error-codes'] || [];
                const errorMessage = errorCodes.includes('sitekey-secret-mismatch')
                    ? 'hCaptcha configuration error. Please contact support.'
                    : 'Captcha verification failed. Please try again.';
                return new Response(JSON.stringify({
                    error: errorMessage,
                    debug: errorCodes.join(', ')
                }), { status: 400 });
            }
        } catch (e) {
            console.error('hCaptcha verification error:', e);
            // Allow through if hCaptcha service is down
        }
    } else if (!HCAPTCHA_DISABLED_FOR_DEV && hcaptchaSecret && !hcaptchaToken) {
        console.log('Contact form: No captcha token provided');
        return new Response(JSON.stringify({ error: 'Please complete the captcha' }), { status: 400 });
    } else if (!hcaptchaSecret) {
        console.log('Contact form: No HCAPTCHA_SECRET configured, skipping verification');
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
        // Send to the owner
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

        // Send confirmation to customer
        await transporter.sendMail({
            from: `"Astralo" <${SMTP_USER}>`,
            to: email,
            subject: 'We received your message - Astralo',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 40px; margin-bottom: 20px;">
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

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        console.error('Contact email error:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
};
