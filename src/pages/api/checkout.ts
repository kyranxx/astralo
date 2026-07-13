import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { productPrices, getProductName, getProductKeys } from '../../lib/products';
import { CheckoutSchema, validateReferer } from '../../lib/validation';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
};

export const POST: APIRoute = async ({ request }) => {
    // 1. Security Check: Origin/Referer
    if (!validateReferer(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized origin' }), { status: 403 });
    }

    const checkoutPaused = import.meta.env.CHECKOUT_PAUSED || process.env.CHECKOUT_PAUSED;
    if (checkoutPaused === 'true') {
        console.error('[checkout] paused because fulfillment is unavailable');
        return new Response(JSON.stringify({
            error: 'Paid readings are temporarily unavailable while we restore delivery. Please try again later.',
            errorCode: 'fulfillment_paused',
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json', 'Retry-After': '3600' },
        });
    }

    const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        return new Response(JSON.stringify({ error: 'Stripe configuration missing' }), { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
        apiVersion: undefined, // Use default or account setting
    });

    let rawData;
    try {
        if (request.headers.get('Content-Type')?.includes('application/json')) {
            rawData = await request.json();
        } else {
            const text = await request.text();
            rawData = text ? JSON.parse(text) : {};
        }
    } catch (e) {
        console.error('Error parsing request body:', e);
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    // 2. Input Validation
    const validation = CheckoutSchema.safeParse(rawData);
    if (!validation.success) {
        console.error('Validation error:', validation.error.format());
        return new Response(JSON.stringify({
            error: 'Invalid request data',
            details: validation.error.flatten()
        }), { status: 400 });
    }

    const data = validation.data;
    const { productKey } = data;

    if (!getProductKeys().includes(productKey)) {
        return new Response(JSON.stringify({ error: 'Product is not available' }), { status: 400 });
    }

    const productPrice = productPrices[productKey as keyof typeof productPrices];
    const lang = data.lang;
    const productName = getProductName(productKey, lang);

    if (!productPrice) {
        // Schema check should catch this already via enum, but double check
        return new Response(JSON.stringify({ error: 'Invalid product' }), { status: 400 });
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
        const attributionFields = {
            landingPath: data.landingPath,
            lastPath: data.lastPath,
            referrer: data.referrer,
            firstSeenAt: data.firstSeenAt,
            lastSeenAt: data.lastSeenAt,
            utm_source: data.utm_source,
            utm_medium: data.utm_medium,
            utm_campaign: data.utm_campaign,
            utm_term: data.utm_term,
            utm_content: data.utm_content,
            gclid: data.gclid,
            fbclid: data.fbclid,
            msclkid: data.msclkid,
            ref_source: data.ref_source,
            ref_medium: data.ref_medium,
            ref_campaign: data.ref_campaign,
            ref_content: data.ref_content,
            gaClientId: data.gaClientId,
            currentUrl: data.currentUrl,
        };

        const normalizedCustomerData = productKey === 'partner'
            ? {
                name: data.name1,
                birthDate: data.birthDate1,
                birthTime: data.birthTime1,
                birthPlace: data.birthPlace1,
                partnerName: data.name2,
                partnerBirthDate: data.birthDate2,
                partnerBirthTime: data.birthTime2,
                partnerBirthPlace: data.birthPlace2,
                customerEmail: data.email1,
            }
            : {
                name: data.name,
                birthDate: data.birthDate,
                birthTime: data.birthTime,
                birthPlace: data.birthPlace,
                customerEmail: data.email,
            };

        for (const [key, value] of Object.entries({ ...attributionFields, ...normalizedCustomerData })) {
            sanitizedFormData[key] = sanitizeForStripe(value);
        }


        // Determine Stripe locale - use 'auto' for English to let Stripe handle it, potentially avoiding specific module loading errors
        const getStripeLocale = (lang: string): Stripe.Checkout.SessionCreateParams.Locale => {
            if (!lang || lang === 'en') return 'auto'; // Use auto for default/en

            const supported = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'sk', 'cs',
                'hu', 'ro', 'bg', 'hr', 'sl', 'ru', 'el', 'tr', 'ja', 'ko', 'zh', 'th',
                'vi', 'id', 'sv', 'da', 'fi', 'nb', 'et', 'lv', 'lt', 'ms', 'mt', 'fil'];

            if (lang === 'no') return 'nb';
            if (supported.includes(lang)) return lang as Stripe.Checkout.SessionCreateParams.Locale;
            return 'auto';
        };

        // Build session params. Omitting payment_method_types lets Stripe Checkout use
        // dashboard-configured dynamic payment methods for the customer locale.
        const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
            customer_email: data.email || data.email1,
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
        };

        // Invoice creation disabled - requires business profile on Stripe
        // Enable after completing Stripe business verification
        // sessionParams.invoice_creation = {
        //     enabled: true,
        //     invoice_data: {
        //         description: productName,
        //         metadata: {
        //             productKey,
        //             ...sanitizedFormData
        //         },
        //     },
        // };

        const session = await stripe.checkout.sessions.create(sessionParams);

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (error: any) {
        // Log detailed error server-side only
        console.error('Stripe checkout error:', error);
        console.error('Error type:', error.type);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Stripe key prefix:', stripeKey?.substring(0, 7));

        return new Response(JSON.stringify({
            error: 'Error creating checkout session. Please try again.',
            details: error.message,
            type: error.type,
            code: error.code
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
