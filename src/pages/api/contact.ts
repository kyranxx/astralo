import type { APIRoute } from 'astro';
import { Resend } from 'resend';

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

    // hCaptcha enabled for production
    const HCAPTCHA_DISABLED_FOR_DEV = false;

    // Verify hCaptcha token
    const hcaptchaSecret = import.meta.env.HCAPTCHA_SECRET;
    if (!HCAPTCHA_DISABLED_FOR_DEV && hcaptchaSecret && hcaptchaToken) {
        try {
            const verifyResponse = await fetch('https://api.hcaptcha.com/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `response=${hcaptchaToken}&secret=${hcaptchaSecret}`,
            });
            const verifyResult = await verifyResponse.json();

            if (!verifyResult.success) {
                console.error('hCaptcha verification failed:', verifyResult);
                return new Response(JSON.stringify({ error: 'Captcha verification failed. Please try again.' }), { status: 400 });
            }
        } catch (e) {
            console.error('hCaptcha verification error:', e);
            // Allow through if hCaptcha service is down
        }
    } else if (!HCAPTCHA_DISABLED_FOR_DEV && hcaptchaSecret && !hcaptchaToken) {
        return new Response(JSON.stringify({ error: 'Please complete the captcha' }), { status: 400 });
    }

    // Send email via Resend
    const resendKey = import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
        console.error('RESEND_API_KEY not configured');
        return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    try {
        // Send to the owner
        await resend.emails.send({
            from: 'Astralo Contact <noreply@astralo.online>',
            to: ['apollotechsro@gmail.com'],
            replyTo: email,
            subject: `[Astralo Contact] ${subject} - from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #f59e0b;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 1px solid #eee;">
                    <div style="padding: 20px 0;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        Reply directly to this email to respond to the customer.
                    </p>
                </div>
            `,
        });

        // Send confirmation to customer
        await resend.emails.send({
            from: 'Astralo <noreply@astralo.online>',
            to: [email],
            subject: 'We received your message - Astralo',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 40px; margin-bottom: 20px;">
                    <h2 style="color: #f59e0b;">Thank you for contacting us!</h2>
                    <p>Hi ${name},</p>
                    <p>We've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your message:</strong></p>
                        <p style="white-space: pre-wrap; color: #666;">${message}</p>
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
