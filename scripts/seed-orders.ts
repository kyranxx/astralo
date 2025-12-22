
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env or .env.local
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const countries = [
    { name: 'Slovakia', code: 'SK' },
    { name: 'United States', code: 'US' },
    { name: 'Germany', code: 'DE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'France', code: 'FR' },
    { name: 'Czech Republic', code: 'CZ' }
];

const products = [
    { key: 'daily', name: 'Daily Horoscope', price: 199 },
    { key: 'weekly', name: 'Weekly Horoscope', price: 499 },
    { key: 'monthly', name: 'Monthly Horoscope', price: 999 },
    { key: 'partner', name: 'Partner Compatibility', price: 1499 }
];

const names = [
    'Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Ross', 'Edward Norton',
    'Fiona Apple', 'George Michael', 'Hannah Montana', 'Ian McKellen', 'Julia Roberts',
    'Karl Lagerfeld', 'Lana Del Rey'
];

async function seed() {
    console.log('🌱 Seeding database...');

    const orders = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - Math.floor(Math.random() * 60)); // last 60 days

        const country = countries[Math.floor(Math.random() * countries.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        const name = names[Math.floor(Math.random() * names.length)];
        const email = name.toLowerCase().replace(' ', '.') + '@example.com';

        const isRefunded = Math.random() < 0.1;

        orders.push({
            id: `AST-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            stripe_session_id: `cs_test_${Math.random().toString(36).substring(2, 20)}`,
            stripe_payment_intent_id: `pi_${Math.random().toString(36).substring(2, 20)}`,
            created_at: date.toISOString(),
            customer_email: email,
            customer_name: name,
            birth_date: '1990-01-01',
            product_key: product.key,
            product_name: product.name,
            amount: product.price,
            currency: 'EUR',
            country: country.name,
            country_code: country.code,
            status: isRefunded ? 'refunded' : 'completed',
            lang: 'en',
            refunded_at: isRefunded ? date.toISOString() : null,
            refund_reason: isRefunded ? 'Customer requested refund' : null
        });
    }

    const { error } = await supabase.from('orders').insert(orders);

    if (error) {
        console.error('Error seeding orders:', error);
    } else {
        console.log('✅ Successfully seeded 50 orders!');
    }
}

seed();
