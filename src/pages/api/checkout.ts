import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
};

const products = {
    daily: { name: 'Denný Horoskop', price: 199 },
    weekly: { name: 'Týždenný Horoskop', price: 399 },
    monthly: { name: 'Mesačný Horoskop', price: 999 },
    partner: { name: 'Partnerský Horoskop', price: 1499 },
};

export const POST: APIRoute = async ({ request }) => {
    const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        return new Response(JSON.stringify({ error: 'Stripe configuration missing' }), { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
        apiVersion: '2024-11-20.acacia' as any,
    });

    let data;
    try {
        if (request.headers.get('Content-Type')?.includes('application/json')) {
            data = await request.json();
        } else {
            const text = await request.text();
            console.log('Raw request body:', text);
            data = text ? JSON.parse(text) : {};
        }
        console.log('Parsed request data:', data);
    } catch (e) {
        console.error('Error parsing request body:', e);
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { productKey, ...formData } = data;

    console.log('==================== CHECKOUT REQUEST ====================');
    console.log('Product Key:', productKey);
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    console.log('=========================================================');

    const product = products[productKey as keyof typeof products];

    if (!product) {
        console.error('Invalid product key:', productKey);
        return new Response(JSON.stringify({ error: 'Invalid product' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const origin = request.headers.get('origin') || `http://localhost:${import.meta.env.DEV ? '4321' : '3000'}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            invoice_creation: {
                enabled: true,
                invoice_data: {
                    description: product.name,
                    metadata: {
                        productKey,
                        ...formData
                    },
                },
            },
            automatic_tax: {
                enabled: true,
            },
            locale: (data.lang as Stripe.Checkout.SessionCreateParams.Locale) || 'en',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/${data.lang === 'en' ? '' : data.lang + '/'}form/${productKey}`,
            metadata: {
                productKey,
                ...formData
            }
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (error: any) {
        console.error('==================== STRIPE CHECKOUT ERROR ====================');
        console.error('Error type:', error.type);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error param:', error.param);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        console.error('Stack trace:', error.stack);
        console.error('============================================================');
        return new Response(JSON.stringify({
            error: 'Error creating checkout session',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
