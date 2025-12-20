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
export const supabase = createClient(
    supabaseUrl || '',
    supabaseServiceKey || '',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

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
