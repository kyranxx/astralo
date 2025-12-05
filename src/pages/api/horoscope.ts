import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeKey);

export const POST: APIRoute = async ({ request }) => {
    const { sessionId } = await request.json();

    console.log('==================== HOROSCOPE REQUEST ====================');
    console.log('Session ID:', sessionId);
    console.log('===========================================================');

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), { status: 400 });
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
            no: 'Norwegian', bn: 'Bengali'
        };

        const langName = languageNames[language] || 'English';

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
            prompt = `You are a warm, professional astrologer. Write a detailed partner compatibility horoscope in ${langName} language.

Person 1: ${name1}, born ${birthDate1} at ${birthTime1} in ${birthPlace1}
Person 2: ${name2}, born ${birthDate2} at ${birthTime2} in ${birthPlace2}

${productBenefits.partner}

STYLE REQUIREMENTS:
- Use relevant emojis throughout (💖❤️✨🌟💫⭐🔮🌙💕🪐💝)
- Write in a warm, conversational tone
- Short paragraphs (2-3 sentences max)
- Make it engaging and practical
- Start with an attention-grabbing opening
- End with encouraging advice
- DO NOT use markdown like ## or **. Use emojis as section headers.
- Write in ${langName} language.`;
        } else {
            const { birthDate, birthTime, birthPlace, name } = formData;
            const benefits = productBenefits[productKey] || productBenefits.daily;
            const wordCount = { daily: 200, weekly: 400, monthly: 1000, partner: 1200 };

            prompt = `You are a warm, professional astrologer. Write a detailed ${productKey} horoscope (~${wordCount[productKey as keyof typeof wordCount]} words) in ${langName} language.

For: ${name}, born ${birthDate} at ${birthTime} in ${birthPlace}

${benefits}

STYLE REQUIREMENTS:
- Start with a warm greeting and astrological portrait
- Use relevant emojis throughout (✨🌟💫⭐🔮🌙🪐💖🌸🎯💪🌈☀️)
- Write in short paragraphs (2-3 sentences max)
- Make it practical and actionable
- Include current planetary influences
- End with positive affirmations
- DO NOT use markdown like ## or **. Use emojis as section headers.
- Write entirely in ${langName} language.`;
        }

        const apiKey = import.meta.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not configured');
        }

        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const result = await model.generateContent(prompt);
        const horoscope = result.response.text();

        // Get price based on product
        const products = {
            daily: 1.99,
            weekly: 3.99,
            monthly: 9.99,
            partner: 14.99,
        };
        const price = products[productKey as keyof typeof products] || 0;

        return new Response(JSON.stringify({
            horoscope,
            product: productKey,
            email: formData.email || formData.email1, // Handle partner form email
            name: formData.name || formData.name1,
            price,
            lang: language
        }), { status: 200 });

    } catch (error: any) {
        console.error('==================== HOROSCOPE GENERATION ERROR ====================');
        console.error('Session ID:', sessionId);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        console.error('Stack trace:', error.stack);
        console.error('====================================================================');
        return new Response(JSON.stringify({ error: 'Invalid session ID or error fetching data.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
