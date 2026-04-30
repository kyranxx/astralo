import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { supabase } from '../../lib/supabase';
import { HoroscopeRequestSchema, validateReferer } from '../../lib/validation';
import { getProductPriceInEuros, isValidProductKey, type ProductKey } from '../../lib/products';

const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeKey);

function getResponsePrice(productKey: string): number {
    if (!isValidProductKey(productKey)) {
        return 0;
    }

    return getProductPriceInEuros(productKey as ProductKey);
}

function formatBirthSummary(name: string | undefined, birthDate: string | undefined, birthTime: string | undefined, birthPlace: string | undefined): string {
    const timePart = birthTime ? ` at ${birthTime}` : '';
    const placePart = birthPlace ? ` in ${birthPlace}` : '';
    return `${name || 'Unknown'}, born ${birthDate || 'Unknown'}${timePart}${placePart}`;
}

// Set max duration for Vercel Serverless Functions to 60 seconds (requires Pro plan, will be 10s on Hobby)
export const maxDuration = 60;

export const POST: APIRoute = async ({ request }) => {
    // 1. Security Check: Origin/Referer
    if (!validateReferer(request)) {
        console.warn('🔮 Horoscope API: Unauthorized origin blocked');
        return new Response(JSON.stringify({ error: 'Unauthorized origin' }), { status: 403 });
    }

    console.log('🔮 Horoscope API: Request received');
    let sessionId;
    try {
        const body = await request.json();
        const validation = HoroscopeRequestSchema.safeParse(body);

        if (!validation.success) {
            console.error('🔮 Horoscope API: Validation failed', validation.error);
            return new Response(JSON.stringify({ error: 'Invalid Session ID format' }), { status: 400 });
        }
        sessionId = validation.data.sessionId;
    } catch (e) {
        console.error('🔮 Horoscope API: Failed to parse request body');
        return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
    }

    console.log('🔮 Horoscope API: Session ID:', sessionId);

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), { status: 400 });
    }

    // Check if this session was already completed in DB (prevents duplicate generation)
    // We check specifically for completed status or if horoscope_content is already present
    try {
        const { data: existingOrder, error: fetchError } = await supabase
            .from('orders')
            .select('id, status, horoscope_content, customer_email, customer_name, product_key, lang, birth_date, birth_place, birth_time')
            .eq('stripe_session_id', sessionId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
            console.error('🔮 Horoscope API: DB Check Error:', fetchError);
            // Continue intentionally - if DB fails, we still try to generate to not block user
        }

        if (existingOrder && existingOrder.horoscope_content) {
            console.log('🔮 Horoscope API: Order already has content, returning cached data');
            const price = getResponsePrice(existingOrder.product_key);

            return new Response(JSON.stringify({
                error: 'already_processed', // Keep this flag so frontend knows to show "Success" immediately
                message: 'Horoscope already generated',
                horoscope: existingOrder.horoscope_content,
                product: existingOrder.product_key,
                email: existingOrder.customer_email,
                name: existingOrder.customer_name,
                price,
                lang: existingOrder.lang
            }), { status: 200 });
        }
    } catch (dbError) {
        console.error('🔮 Horoscope API: Unexpected DB error:', dbError);
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const formData = session.metadata;

        // Customer email is stored in session, not in metadata
        const customerEmail = session.customer_details?.email || session.customer_email || '';

        if (!formData) {
            return new Response(JSON.stringify({ error: 'No metadata found for this session.' }), { status: 400 });
        }

        const { productKey, lang } = formData;
        const language = lang || 'en';

        // Language name mapping for dynamic prompts
        const languageNames: Record<string, string> = {
            en: 'English', sk: 'Slovak', cs: 'Czech', de: 'German', fr: 'French',
            es: 'Spanish', it: 'Italian', pt: 'Portuguese', nl: 'Dutch', pl: 'Polish',
            hu: 'Hungarian', ro: 'Romanian', bg: 'Bulgarian', hr: 'Croatian', sl: 'Slovenian',
            uk: 'Ukrainian', ru: 'Russian', el: 'Greek', tr: 'Turkish', ar: 'Arabic',
            hi: 'Hindi', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', th: 'Thai',
            vi: 'Vietnamese', id: 'Indonesian', sv: 'Swedish', da: 'Danish', fi: 'Finnish',
            no: 'Norwegian', bn: 'Bengali', he: 'Hebrew', sr: 'Serbian'
        };

        // Now using local fonts for all languages including CJK - no more English fallback needed!
        const langName = languageNames[language] || 'English';
        const useLangForPdf = langName; // All languages use their native script now

        // Progressive benefits based on product type
        const productBenefits: Record<string, string> = {
            daily: `REQUIRED SECTIONS:
                    🌅 Today's Energy Forecast
                    🍀 Lucky Number (one number with explanation)
                    💎 Lucky Color (one color with meaning)
                    ⭐ Personal Daily Advice (2-3 sentences)`,
            weekly: `REQUIRED SECTIONS:
                    📅 Day-by-Day Overview (brief for each day)
                    🎯 Lucky Day of the Week (which day and why)
                    💰 Financial Forecast
                    ❤️ Love & Relationships Insights
                    💼 Career Guidance
                    🍀 Lucky Number and Color`,
            monthly: `REQUIRED SECTIONS:
                    🗓️ Week-by-Week Predictions (overview of each week)
                    🌟 Best Days of the Month (top 3-5 dates)
                    💎 Lucky Stones & Crystals
                    🌈 Energy Cycles & Phases
                    💰 Financial Opportunities
                    ❤️ Relationship Insights
                    🎯 Goal-Setting Guidance
                    🍀 Lucky Numbers, Colors, and Elements`,
            partner: `REQUIRED SECTIONS:
                    💕 Compatibility Score (percentage with explanation)
                    🔮 Relationship Dynamics Analysis
                    💪 Your Strengths as a Couple
                    ⚠️ Areas to Work On
                    💬 Communication Styles Comparison
                    ❤️ Love Language Match
                    💫 Future Potential Together
                    🌟 Synastry Insights (planetary connections)`
        };

        let prompt;

        if (productKey === 'partner') {
            const { birthDate1, birthTime1, birthPlace1, name1, birthDate2, birthTime2, birthPlace2, name2 } = formData;
            prompt = `You are a friendly astrologer writing for everyday people. Write a detailed partner compatibility horoscope in ${useLangForPdf} language.

Person 1: ${formatBirthSummary(name1, birthDate1, birthTime1, birthPlace1)}
Person 2: ${formatBirthSummary(name2, birthDate2, birthTime2, birthPlace2)}

${productBenefits.partner}

WRITING STYLE - VERY IMPORTANT:
- Use SIMPLE, everyday language that anyone can understand (avoid complex astrological jargon)
- Write like you're talking to a friend, warm and approachable
- Use short sentences and paragraphs (2-3 sentences max)
- PROOFREAD for grammar - ensure the ${useLangForPdf} grammar is 100% correct
- Use relevant emojis (💖❤️✨🌟💫⭐🔮🌙💕🪐💝)
- Start with an attention-grabbing opening
- End with encouraging advice
- DO NOT use markdown like ## or **. Use emojis as section headers.
- Write entirely in ${useLangForPdf} language with correct grammar and spelling.

CONTENT RULES:
- NEVER mention any religion, religious figures (Jesus, Muhammad, Buddha, etc.)
- Focus on planets, stars, cosmic energy - universal spirituality only
- Avoid politics, religious holidays, dietary restrictions
- Be inclusive and positive`;
        } else {
            const { birthDate, birthTime, birthPlace, name } = formData;
            const benefits = productBenefits[productKey] || productBenefits.daily;
            const wordCount = { daily: 200, weekly: 400, monthly: 1000, partner: 1200 };

            prompt = `You are a friendly astrologer writing for everyday people. Write a detailed ${productKey} horoscope (~${wordCount[productKey as keyof typeof wordCount]} words) in ${useLangForPdf} language.

For: ${formatBirthSummary(name, birthDate, birthTime, birthPlace)}

${benefits}

WRITING STYLE - VERY IMPORTANT:
- Use SIMPLE, everyday language that anyone can understand
- Avoid complex astrological jargon - explain things in plain terms
- Write like you're talking to a friend, warm and approachable
- Use short sentences (no long, complicated sentences)
- Short paragraphs (2-3 sentences max)
- PROOFREAD for grammar - ensure the ${useLangForPdf} grammar is 100% correct
- Double-check spelling and sentence structure in ${useLangForPdf}
- Use relevant emojis (✨🌟💫⭐🔮🌙🪐💖🌸🎯💪🌈☀️)
- Make it practical and actionable
- End with positive, encouraging words
- DO NOT use markdown like ## or **. Use emojis as section headers.
- Write entirely in ${useLangForPdf} language with perfect grammar.

CONTENT RULES:
- NEVER mention any religion, religious figures (Jesus, Muhammad, Buddha, etc.)
- Focus on planets, stars, cosmic energy - universal spirituality only
- Avoid politics, religious holidays, dietary restrictions
- Be inclusive and positive`;
        }

        const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('🔮 Horoscope API: GEMINI_API_KEY is missing');
            throw new Error('GEMINI_API_KEY is not configured');
        }

        console.log('🔮 Horoscope API: Generating content with Gemini...');
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const result = await model.generateContent(prompt);
        const horoscope = result.response.text();
        console.log('🔮 Horoscope API: Content generated successfully');

        const price = getResponsePrice(productKey);

        // SAVE TO DATABASE - Prevent data loss
        try {
            console.log('🔮 Horoscope API: Saving content to Supabase...');
            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    horoscope_content: horoscope,
                    updated_at: new Date().toISOString()
                })
                .eq('stripe_session_id', sessionId);

            if (updateError) {
                console.error('🔮 Horoscope API: Failed to save content to DB:', updateError);
                // We don't stop execution, user still needs potential email/response
            } else {
                console.log('🔮 Horoscope API: Content saved to DB successfully');
            }
        } catch (dbSaveError) {
            console.error('🔮 Horoscope API: DB Save Exception:', dbSaveError);
        }

        const responseData = JSON.stringify({
            horoscope,
            product: productKey,
            email: customerEmail, // Email from Stripe session, not metadata
            name: formData.name || formData.name1,
            price,
            lang: language,
            // Include birth data for email image generation
            birthDate: formData.birthDate || formData.birthDate1,
            birthPlace: formData.birthPlace || formData.birthPlace1,
            birthTime: formData.birthTime || formData.birthTime1
        });

        return new Response(responseData, { status: 200 });

    } catch (error: any) {
        // Log detailed error server-side only
        console.error('Horoscope generation error:', error.message);

        // Return generic error to client (no stack traces or sensitive info)
        return new Response(JSON.stringify({
            error: 'Failed to generate horoscope. Please try again or contact support.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
