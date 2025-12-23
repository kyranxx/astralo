import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeKey);

// In-memory cache to prevent duplicate horoscope generation for the same session
// This prevents issues when success page reloads during dev (hot-reload) or user refreshes
const processedSessions = new Set<string>();

export const POST: APIRoute = async ({ request }) => {
    console.log('🔮 Horoscope API: Request received');
    let sessionId;
    try {
        const body = await request.json();
        sessionId = body.sessionId;
    } catch (e) {
        console.error('🔮 Horoscope API: Failed to parse request body');
        return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
    }

    console.log('🔮 Horoscope API: Session ID:', sessionId);

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), { status: 400 });
    }

    // Check if this session was already processed (prevents duplicate generation on page reload)
    if (processedSessions.has(sessionId)) {
        console.log('🔮 Horoscope API: Session already processed, returning cached response indicator');
        return new Response(JSON.stringify({
            error: 'already_processed',
            message: 'Horoscope already generated for this session'
        }), { status: 200 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const formData = session.metadata;

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

Person 1: ${name1}, born ${birthDate1} at ${birthTime1} in ${birthPlace1}
Person 2: ${name2}, born ${birthDate2} at ${birthTime2} in ${birthPlace2}

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

For: ${name}, born ${birthDate} at ${birthTime} in ${birthPlace}

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

        // Get price based on product
        const products = {
            daily: 0.99,
            weekly: 2.99,
            monthly: 7.99,
            partner: 7.99,
        };
        const price = products[productKey as keyof typeof products] || 0;

        const responseData = JSON.stringify({
            horoscope,
            product: productKey,
            email: formData.email || formData.email1, // Handle partner form email
            name: formData.name || formData.name1,
            price,
            lang: language
        });

        // Mark session as processed AFTER successful generation
        processedSessions.add(sessionId);
        console.log('🔮 Horoscope API: Session marked as processed');

        return new Response(responseData, { status: 200 });

    } catch (error: any) {
        console.error('==================== HOROSCOPE GENERATION ERROR ====================');
        console.error('Session ID:', sessionId);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        console.error('Stack trace:', error.stack);
        console.error('====================================================================');
        return new Response(JSON.stringify({
            error: 'Invalid session ID or error fetching data.',
            details: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
