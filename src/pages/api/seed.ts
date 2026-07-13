
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { getPasswordFromRequest, verifyAdminPassword } from '../../lib/auth';
import { getProductKeys, getProductName, productPrices } from '../../lib/products';

export const GET: APIRoute = async ({ request }) => {
    // Block in production - seeding should only be done in development
    if (!import.meta.env.DEV) {
        return new Response('Not available', { status: 404 });
    }

    const password = getPasswordFromRequest(request);
    if (!verifyAdminPassword(password)) {
        return new Response('Unauthorized', { status: 401 });
    }

    console.log('🌱 Seeding database from API...');

    const countries = [
        { name: 'Slovakia', code: 'SK' },
        { name: 'United States', code: 'US' },
        { name: 'Germany', code: 'DE' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'France', code: 'FR' },
        { name: 'Czech Republic', code: 'CZ' }
    ];

    const products = getProductKeys().map((key) => ({
        key,
        name: getProductName(key, 'en'),
        price: productPrices[key],
    }));

    const names = [
        'Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Ross', 'Edward Norton',
        'Fiona Apple', 'George Michael', 'Hannah Montana', 'Ian McKellen', 'Julia Roberts',
        'Karl Lagerfeld', 'Lana Del Rey'
    ];

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
            horoscope_content: `✨ Sample Horoscope for ${name} ✨\n\nThe stars are aligned in your favor today! Jupiter brings prosperity while Venus enhances your charm.\n\n🌟 Career: New opportunities await\n❤️ Love: Romance is in the air\n💰 Finance: Positive growth expected\n\n🍀 Lucky Numbers: 7, 14, 23`,
            refunded_at: isRefunded ? date.toISOString() : null,
            refund_reason: isRefunded ? 'Customer requested refund' : null
        });
    }

    const { error } = await supabase.from('orders').insert(orders);

    if (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Seeded 50 orders' }), { status: 200 });
};
