/**
 * Supabase Client Configuration
 * Server-side client using service role key for full database access
 */

import { createClient } from '@supabase/supabase-js';

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
    product_key: 'daily' | 'weekly' | 'monthly' | 'partner';
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
