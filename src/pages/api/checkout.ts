import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
};

// Localized product names for Stripe checkout
const productNames: Record<string, Record<string, string>> = {
    en: { daily: 'Daily Horoscope', weekly: 'Weekly Horoscope', monthly: 'Monthly Horoscope', partner: 'Partner Horoscope' },
    sk: { daily: 'Denný horoskop', weekly: 'Týždenný horoskop', monthly: 'Mesačný horoskop', partner: 'Partnerský horoskop' },
    cs: { daily: 'Denní horoskop', weekly: 'Týdenní horoskop', monthly: 'Měsíční horoskop', partner: 'Partnerský horoskop' },
    de: { daily: 'Tageshoroskop', weekly: 'Wochenhoroskop', monthly: 'Monatshoroskop', partner: 'Partnerhoroskop' },
    fr: { daily: 'Horoscope du jour', weekly: 'Horoscope de la semaine', monthly: 'Horoscope du mois', partner: 'Horoscope de couple' },
    es: { daily: 'Horóscopo diario', weekly: 'Horóscopo semanal', monthly: 'Horóscopo mensual', partner: 'Horóscopo de pareja' },
    it: { daily: 'Oroscopo giornaliero', weekly: 'Oroscopo settimanale', monthly: 'Oroscopo mensile', partner: 'Oroscopo di coppia' },
    pt: { daily: 'Horóscopo diário', weekly: 'Horóscopo semanal', monthly: 'Horóscopo mensal', partner: 'Horóscopo de casal' },
    nl: { daily: 'Daghoroscoop', weekly: 'Weekhoroscoop', monthly: 'Maandhoroscoop', partner: 'Partnerhoroscoop' },
    pl: { daily: 'Horoskop dzienny', weekly: 'Horoskop tygodniowy', monthly: 'Horoskop miesięczny', partner: 'Horoskop partnerski' },
    hu: { daily: 'Napi horoszkóp', weekly: 'Heti horoszkóp', monthly: 'Havi horoszkóp', partner: 'Partner horoszkóp' },
    ro: { daily: 'Horoscop zilnic', weekly: 'Horoscop săptămânal', monthly: 'Horoscop lunar', partner: 'Horoscop de cuplu' },
    bg: { daily: 'Дневен хороскоп', weekly: 'Седмичен хороскоп', monthly: 'Месечен хороскоп', partner: 'Партньорски хороскоп' },
    hr: { daily: 'Dnevni horoskop', weekly: 'Tjedni horoskop', monthly: 'Mjesečni horoskop', partner: 'Partnerski horoskop' },
    sl: { daily: 'Dnevni horoskop', weekly: 'Tedenski horoskop', monthly: 'Mesečni horoskop', partner: 'Partnerski horoskop' },
    sr: { daily: 'Дневни хороскоп', weekly: 'Недељни хороскоп', monthly: 'Месечни хороскоп', partner: 'Партнерски хороскоп' },
    uk: { daily: 'Денний гороскоп', weekly: 'Тижневий гороскоп', monthly: 'Місячний гороскоп', partner: 'Партнерський гороскоп' },
    ru: { daily: 'Дневной гороскоп', weekly: 'Недельный гороскоп', monthly: 'Месячный гороскоп', partner: 'Партнёрский гороскоп' },
    el: { daily: 'Ημερήσιο ωροσκόπιο', weekly: 'Εβδομαδιαίο ωροσκόπιο', monthly: 'Μηνιαίο ωροσκόπιο', partner: 'Ωροσκόπιο ζευγαριού' },
    tr: { daily: 'Günlük burç', weekly: 'Haftalık burç', monthly: 'Aylık burç', partner: 'Partner burcu' },
    ar: { daily: 'البرج اليومي', weekly: 'البرج الأسبوعي', monthly: 'البرج الشهري', partner: 'برج الشريك' },
    he: { daily: 'הורוסקופ יומי', weekly: 'הורוסקופ שבועי', monthly: 'הורוסקופ חודשי', partner: 'הורוסקופ לזוג' },
    hi: { daily: 'दैनिक राशिफल', weekly: 'साप्ताहिक राशिफल', monthly: 'मासिक राशिफल', partner: 'पार्टनर राशिफल' },
    ja: { daily: '今日の運勢', weekly: '週間運勢', monthly: '月間運勢', partner: 'パートナー運勢' },
    ko: { daily: '오늘의 운세', weekly: '주간 운세', monthly: '월간 운세', partner: '커플 운세' },
    zh: { daily: '每日运势', weekly: '每周运势', monthly: '每月运势', partner: '伴侣运势' },
    th: { daily: 'ดวงวันนี้', weekly: 'ดวงรายสัปดาห์', monthly: 'ดวงรายเดือน', partner: 'ดวงคู่รัก' },
    vi: { daily: 'Tử vi hàng ngày', weekly: 'Tử vi hàng tuần', monthly: 'Tử vi hàng tháng', partner: 'Tử vi cặp đôi' },
    id: { daily: 'Horoskop Harian', weekly: 'Horoskop Mingguan', monthly: 'Horoskop Bulanan', partner: 'Horoskop Pasangan' },
    sv: { daily: 'Dagens horoskop', weekly: 'Veckans horoskop', monthly: 'Månadens horoskop', partner: 'Parhoroskop' },
    da: { daily: 'Dagligt horoskop', weekly: 'Ugens horoskop', monthly: 'Månedens horoskop', partner: 'Parhoroskop' },
    fi: { daily: 'Päivän horoskooppi', weekly: 'Viikon horoskooppi', monthly: 'Kuukauden horoskooppi', partner: 'Parihoroskooppi' },
    no: { daily: 'Dagens horoskop', weekly: 'Ukens horoskop', monthly: 'Månedens horoskop', partner: 'Parhoroskop' },
    bn: { daily: 'দৈনিক রাশিফল', weekly: 'সাপ্তাহিক রাশিফল', monthly: 'মাসিক রাশিফল', partner: 'পার্টনার রাশিফল' },
};

const productPrices = {
    daily: 199,
    weekly: 399,
    monthly: 999,
    partner: 1499,
};

const getProductName = (productKey: string, lang: string): string => {
    const names = productNames[lang] || productNames.en;
    return names[productKey] || productNames.en[productKey] || productKey;
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
            // Remove non-ASCII characters but preserve basic Latin characters
            return str.replace(/[^\x20-\x7E]/g, '').substring(0, 500); // Stripe metadata limit is 500 chars
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
