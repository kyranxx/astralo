import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { productPrices, getProductName, type ProductKey } from '../../lib/products';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
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
            data = text ? JSON.parse(text) : {};
        }
    } catch (e) {
        console.error('Error parsing request body:', e);
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { productKey, ...formData } = data;

    const productPrice = productPrices[productKey as keyof typeof productPrices];
    const lang = (data.lang as string) || 'en';
    const productName = getProductName(productKey, lang);

    if (!productPrice) {
        console.error('Invalid product key:', productKey);
        return new Response(JSON.stringify({ error: 'Invalid product' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const origin = request.headers.get('origin') || `http://localhost:${import.meta.env.DEV ? '4321' : '3000'}`;

        // Sanitize metadata values for Stripe (only allow ASCII characters for metadata)
        // Stripe has strict character set requirements for metadata
        const sanitizeForStripe = (value: any): string => {
            if (value === null || value === undefined) return '';
            const str = String(value);
            // Allow all characters, just limit length
            return str.substring(0, 500);
        };

        const sanitizedFormData: Record<string, string> = {};
        for (const [key, value] of Object.entries(formData)) {
            sanitizedFormData[key] = sanitizeForStripe(value);
        }


        // Determine Stripe locale
        const getStripeLocale = (lang: string): Stripe.Checkout.SessionCreateParams.Locale => {
            const supported = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'sk', 'cs',
                'hu', 'ro', 'bg', 'hr', 'sl', 'ru', 'el', 'tr', 'ja', 'ko', 'zh', 'th',
                'vi', 'id', 'sv', 'da', 'fi', 'nb', 'et', 'lv', 'lt', 'ms', 'mt', 'fil'];
            if (lang === 'no') return 'nb';
            if (supported.includes(lang)) return lang as Stripe.Checkout.SessionCreateParams.Locale;
            return 'auto'; // Fallback for unsupported locales (ar, hi, bn, uk, sr)
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: productName,
                        },
                        unit_amount: productPrice,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            invoice_creation: {
                enabled: true,
                invoice_data: {
                    description: productName,
                    metadata: {
                        productKey,
                        ...sanitizedFormData
                    },
                },
            },
            // automatic_tax disabled - not needed for small business under €10k EU threshold
            // Enable later after OSS registration if EU sales exceed €10,000
            // automatic_tax: {
            //     enabled: true,
            // },
            locale: getStripeLocale(data.lang as string || 'en'),
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&lang=${data.lang || 'en'}`,
            cancel_url: `${origin}/${data.lang === 'en' ? '' : data.lang + '/'}form/${productKey}`,
            metadata: {
                productKey,
                lang: data.lang || 'en',
                ...sanitizedFormData
            }
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (error: any) {
        // Log detailed error server-side only
        console.error('Stripe checkout error:', error.message);

        return new Response(JSON.stringify({
            error: 'Error creating checkout session. Please try again.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
