import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { sendWelcomeEmail } from '../../lib/email-service';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { email, source = 'website', lang = 'en', gdprConsent = true } = body;

        // Validate email
        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Invalid email address' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate GDPR consent
        if (!gdprConsent) {
            return new Response(JSON.stringify({ error: 'GDPR consent required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('email_subscribers')
            .upsert(
                {
                    email: email.toLowerCase().trim(),
                    source,
                    lang,
                    gdpr_consent: gdprConsent
                },
                { onConflict: 'email' }
            );

        if (error) {
            console.error('Supabase error:', error);
            // If it's a duplicate, that's fine - treat as success
            if (error.code === '23505') {
                return new Response(JSON.stringify({ success: true, message: 'Already subscribed' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Send the newsletter welcome email without blocking subscription
        try {
            await sendWelcomeEmail(email, lang);
        } catch (emailErr) {
            console.error('Failed to send welcome email:', emailErr);
            // Don't fail the whole request if email sending fails
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error('Subscribe API error:', err);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
