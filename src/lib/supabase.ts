/**
 * Supabase Client Configuration
 * Server-side client using service role key for full database access
 */

import { createClient } from '@supabase/supabase-js';
import type { ProductKey } from './products';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('⚠️ Supabase credentials not configured. Order storage will fail.');
}

// Server-side client with service role (bypasses RLS)
// We wrap this to prevent crash on module load if keys are missing
let supabaseClient;

try {
    if (supabaseUrl && supabaseServiceKey) {
        supabaseClient = createClient(
            supabaseUrl,
            supabaseServiceKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );
    } else {
        console.warn('⚠️ Supabase credentials missing. Database operations will fail.');
        // Create a dummy client/proxy that logs errors instead of crashing immediately
        // allowing the server to start
        supabaseClient = {
            from: () => ({
                select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
                insert: async () => ({ error: { message: 'Supabase not configured' } }),
                update: async () => ({ error: { message: 'Supabase not configured' } }),
                delete: async () => ({ error: { message: 'Supabase not configured' } }),
            })
        } as any;
    }
} catch (e) {
    console.error('Failed to initialize Supabase client:', e);
    supabaseClient = { from: () => ({ select: async () => ({ error: { message: 'Init failed' } }) }) } as any;
}

export const supabase = supabaseClient;

/**
 * Verify the configured Supabase project actually answers HTTP requests.
 * A paused or deleted project keeps its config values valid while its host
 * no longer resolves, which would otherwise show as "configured" and hide
 * a total database outage.
 */
export async function verifySupabaseReachability(
    options: { timeoutMs?: number } = {},
): Promise<{ configured: boolean; ok: boolean; message: string }> {
    if (!supabaseUrl || !supabaseServiceKey) {
        return {
            configured: false,
            ok: false,
            message: 'Supabase credentials are not configured.',
        };
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

        // Any HTTP response (even 401) proves the project host is reachable.
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
            method: 'GET',
            headers: {
                apikey: supabaseServiceKey,
                Authorization: `Bearer ${supabaseServiceKey}`,
                Accept: 'application/json',
            },
            signal: controller.signal,
        });

        clearTimeout(timeout);

        return {
            configured: true,
            ok: true,
            message: `Supabase project responds (HTTP ${response.status}).`,
        };
    } catch (error) {
        const detail = error instanceof Error ? error.message : 'Unknown network error';
        return {
            configured: true,
            ok: false,
            message: `Supabase project is unreachable: ${detail}. Check that the project is resumed in the Supabase dashboard.`,
        };
    }
}

// Database types
export interface OrderRow {
    id: string;
    stripe_session_id: string;
    stripe_payment_intent_id: string | null;
    created_at: string;
    customer_email: string;
    customer_name: string;
    birth_date: string | null;
    birth_time: string | null;
    birth_place: string | null;
    partner_name: string | null;
    partner_birth_date: string | null;
    partner_birth_time: string | null;
    partner_birth_place: string | null;
    product_key: ProductKey;
    product_name: string;
    amount: number;
    currency: string;
    country: string | null;
    country_code: string | null;
    status: 'pending' | 'completed' | 'refunded' | 'failed';
    horoscope_pdf_path: string | null;
    horoscope_pdf_url: string | null;
    horoscope_content: string | null;
    lang: string;
    email_sent_at: string | null;
    refunded_at: string | null;
    refund_reason: string | null;
    stripe_refund_id: string | null;
}

export interface EmailSubscriberRow {
    email: string;
    source: string;
    lang: string;
    gdpr_consent: boolean;
    subscribed_at: string;
    updated_at: string;
}
