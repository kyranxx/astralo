import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { buildFollowupEmailHtml, type EmailFollowupRow } from '../../lib/email-drip';
import { supabase } from '../../lib/supabase';
import { getPasswordFromRequest, verifyAdminPassword } from '../../lib/auth';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CRON_SECRET } = import.meta.env;

function isAuthorized(request: Request): boolean {
    const authHeader = request.headers.get('authorization');

    if (CRON_SECRET && authHeader === `Bearer ${CRON_SECRET}`) {
        return true;
    }

    if (import.meta.env.DEV) {
        const password = getPasswordFromRequest(request);
        return verifyAdminPassword(password);
    }

    return false;
}

export const GET: APIRoute = async ({ request }) => {
    if (!isAuthorized(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return new Response(JSON.stringify({ error: 'SMTP not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
        .from('email_followups')
        .select('*')
        .is('sent_at', null)
        .lte('scheduled_for', nowIso)
        .order('scheduled_for', { ascending: true })
        .limit(100);

    if (error) {
        console.error('Email drip fetch failed:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch followups', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const followups = (data || []) as EmailFollowupRow[];
    let sent = 0;
    let failed = 0;

    for (const followup of followups) {
        const emailContent = buildFollowupEmailHtml(followup.email, followup.lang, followup.step_key);

        if (!emailContent) {
            failed += 1;
            await supabase
                .from('email_followups')
                .update({ last_error: `Unknown step key: ${followup.step_key}` })
                .eq('email', followup.email)
                .eq('step_key', followup.step_key);
            continue;
        }

        try {
            await transporter.sendMail({
                from: `"Astralo ✨" <${SMTP_USER}>`,
                to: followup.email,
                subject: emailContent.subject,
                html: emailContent.html,
            });

            sent += 1;

            await supabase
                .from('email_followups')
                .update({
                    sent_at: new Date().toISOString(),
                    last_error: null,
                })
                .eq('email', followup.email)
                .eq('step_key', followup.step_key);
        } catch (sendError) {
            failed += 1;
            const message = sendError instanceof Error ? sendError.message : 'Unknown send failure';
            console.error(`Email drip send failed for ${followup.email}/${followup.step_key}:`, sendError);

            await supabase
                .from('email_followups')
                .update({ last_error: message })
                .eq('email', followup.email)
                .eq('step_key', followup.step_key);
        }
    }

    return new Response(JSON.stringify({
        ok: true,
        processed: followups.length,
        sent,
        failed,
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
