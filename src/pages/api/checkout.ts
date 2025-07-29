import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const products = {
    weekly: { name: 'Osobný Horoskop na Týždeň', price: 399 },
    monthly: { name: 'Osobný Horoskop na Mesiac', price: 999 },
    yearly: { name: 'Osobný Horoskop na Rok', price: 2499 },
    natal: { name: 'Osobná Rodná Mapa', price: 499 },
    partner: { name: 'Partnerský Horoskop', price: 1499 },
};

export const POST: APIRoute = async ({ request }) => {
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10',
    });

    const data = await request.json();
    const { productKey, formData } = data;

    const product = products[productKey as keyof typeof products];

    if (!product) {
        return new Response(JSON.stringify({ error: 'Invalid product' }), { status: 400 });
    }

    try {
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
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/`,
            metadata: {
                ...formData,
                productKey,
            }
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error creating checkout session' }), { status: 500 });
    }
};
