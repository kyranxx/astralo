
import { supabase } from './supabase'; // You might need to adjust this path
import { generateHoroscopeImage } from './png-generator';
import nodemailer from 'nodemailer';
import { generateLegalPDFs } from './pdf-generator';
import type { Order } from './orders';
import type { ProductKey } from './products';
import { generateHoroscopeText } from './horoscope-ai';
import { buildFulfillmentEmail, type FulfillmentEmailOptions } from './fulfillment-email-template';

// Configuration
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;

// --- Horoscope Content Generation (from api/horoscope.ts) ---

const productBenefits: Record<ProductKey, string> = {
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
            🌟 Synastry Insights (planetary connections)`,
    lifetime: `REQUIRED SECTIONS:
            🌌 Life Path Overview
            🪞 Core Personality Pattern
            ❤️ Love and Relationship Patterns
            💼 Career and Vocation Cycles
            💰 Money and Security Themes
            🪐 Long-Term Timing Windows
            🌱 Growth Lessons and Practical Next Steps
            ⭐ Personal Strengths to Use for the Rest of Life`
};

// Language map
const languageNames: Record<string, string> = {
    en: 'English', sk: 'Slovak', cs: 'Czech', de: 'German', fr: 'French',
    es: 'Spanish', it: 'Italian', pt: 'Portuguese', nl: 'Dutch', pl: 'Polish',
    hu: 'Hungarian', ro: 'Romanian', bg: 'Bulgarian', hr: 'Croatian', sl: 'Slovenian',
    uk: 'Ukrainian', ru: 'Russian', el: 'Greek', tr: 'Turkish', ar: 'Arabic',
    hi: 'Hindi', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', th: 'Thai',
    vi: 'Vietnamese', id: 'Indonesian', sv: 'Swedish', da: 'Danish', fi: 'Finnish',
    no: 'Norwegian', bn: 'Bengali', he: 'Hebrew', sr: 'Serbian'
};

export async function generateHoroscopeContent(order: Order): Promise<string> {
    const prompt = buildHoroscopeGenerationPrompt(order);
    return generateHoroscopeText(prompt);
}

export function buildHoroscopeGenerationPrompt(order: Order): string {
    const language = order.lang || 'en';
    const langName = languageNames[language] || 'English';
    const productKey = order.productKey;

    if (productKey === 'partner') {
        const { birthDate, birthTime, birthPlace, customerName, partnerName, partnerBirthDate, partnerBirthTime, partnerBirthPlace } = order;

        return `You are a friendly astrologer writing for everyday people. Write a detailed partner compatibility horoscope in ${langName} language.

Person 1: ${customerName}, born ${birthDate} at ${birthTime || 'Unknown'} in ${birthPlace || 'Unknown'}
Person 2: ${partnerName}, born ${partnerBirthDate} at ${partnerBirthTime || 'Unknown'} in ${partnerBirthPlace || 'Unknown'}

${productBenefits.partner}

WRITING STYLE - VERY IMPORTANT:
- Use SIMPLE, everyday language that anyone can understand (avoid complex astrological jargon)
- Write like you're talking to a friend, warm and approachable
- Use short sentences and paragraphs (2-3 sentences max)
- PROOFREAD for grammar - ensure the ${langName} grammar is 100% correct
- Use relevant emojis (💖❤️✨🌟💫⭐🔮🌙💕🪐💝)
- Start with an attention-grabbing opening
- End with encouraging advice
- DO NOT use markdown like ## or **. Use emojis as section headers.
- Write entirely in ${langName} language with correct grammar and spelling.

CONTENT RULES:
- NEVER mention any religion, religious figures (Jesus, Muhammad, Buddha, etc.)
- Focus on planets, stars, cosmic energy - universal spirituality only
- Avoid politics, religious holidays, dietary restrictions
- Be inclusive and positive`;
    }

    const { birthDate, birthTime, birthPlace, customerName } = order;
    const benefits = productBenefits[productKey] || productBenefits.daily;
    const wordCount: Record<ProductKey, number> = {
        daily: 200,
        weekly: 400,
        monthly: 1000,
        partner: 1200,
        lifetime: 3000,
    };

    return `You are a friendly astrologer writing for everyday people. Write a detailed ${productKey} horoscope (~${wordCount[productKey]} words) in ${langName} language.

For: ${customerName}, born ${birthDate} at ${birthTime || 'Unknown'} in ${birthPlace || 'Unknown'}

${benefits}

WRITING STYLE - VERY IMPORTANT:
- Use SIMPLE, everyday language that anyone can understand
- Avoid complex astrological jargon - explain things in plain terms
- Write like you're talking to a friend, warm and approachable
- Use short sentences (no long, complicated sentences)
- Short paragraphs (2-3 sentences max)
- PROOFREAD for grammar - ensure the ${langName} grammar is 100% correct
- Double-check spelling and sentence structure in ${langName}
- Use relevant emojis (✨🌟💫⭐🔮🌙🪐💖🌸🎯💪🌈☀️)
- Make it practical and actionable
- End with positive, encouraging words
- DO NOT use markdown like ## or **. Use emojis as section headers.
- Write entirely in ${langName} language with perfect grammar.

CONTENT RULES:
- NEVER mention any religion, religious figures (Jesus, Muhammad, Buddha, etc.)
- Focus on planets, stars, cosmic energy - universal spirituality only
- Avoid politics, religious holidays, dietary restrictions
- Be inclusive and positive`;
}


// --- Email and Fulfillment ---

export async function fulfillOrder(
    order: Order,
    invoicePdfBuffer: Buffer | null = null,
    invoiceFilename: string = 'Invoice.pdf',
    downloadUrl: string = '',
    emailOptions: FulfillmentEmailOptions = {},
) {
    console.log(`🚀 Starting fulfillment for Order ${order.id}`);

    // 1. Check if content already exists
    let content = order.horoscopeContent;
    if (!content) {
        console.log(`Generating content for Order ${order.id}...`);
        try {
            content = await generateHoroscopeContent(order);
            // Save immediately
            await supabase.from('orders').update({
                horoscope_content: content,
                updated_at: new Date().toISOString()
            }).eq('id', order.id);
            console.log(`Content saved for Order ${order.id}`);
        } catch (e) {
            console.error(`Generation failed for Order ${order.id}:`, e);
            throw e;
        }
    } else {
        console.log(`Content already exists for Order ${order.id}`);
    }

    // 2. Generate PNGs (Attachment)
    console.log(`Generating images for Order ${order.id}...`);
    let horoscopeImages: { filename: string; content: Buffer }[] = [];
    try {
        horoscopeImages = await generateHoroscopeImage({
            customerName: order.customerName,
            productName: order.productName,
            horoscopeContent: content,
            birthDate: order.birthDate,
            birthPlace: order.birthPlace || '',
            birthTime: order.birthTime || '',
            lang: order.lang,
        });
    } catch (e) {
        console.error(`Image generation failed for Order ${order.id}:`, e);
        // Continue - do not fail fulfillment just because image failed
    }

    // 3. Send Email
    console.log(`Sending email for Order ${order.id}...`);
    await sendFulfillmentEmail(order, content, horoscopeImages, invoicePdfBuffer, invoiceFilename, downloadUrl, emailOptions);

    // 4. Update Status
    await supabase.from('orders').update({
        status: 'completed',
        email_sent_at: new Date().toISOString()
    }).eq('id', order.id);

    console.log(`✅ Fulfillment complete for Order ${order.id}`);
}

export async function sendFulfillmentPreviewToOwner(
    order: Order,
    content: string,
    emailOptions: FulfillmentEmailOptions = {},
) {
    if (!SMTP_USER) {
        throw new Error('SMTP preview recipient is not configured');
    }

    let horoscopeImages: { filename: string; content: Buffer }[] = [];
    try {
        horoscopeImages = await generateHoroscopeImage({
            customerName: order.customerName,
            productName: order.productName,
            horoscopeContent: content,
            birthDate: order.birthDate,
            birthPlace: order.birthPlace || '',
            birthTime: order.birthTime || '',
            lang: order.lang,
        });
    } catch (error) {
        console.error(`Preview image generation failed for Order ${order.id}:`, error);
    }

    await sendFulfillmentEmail(
        { ...order, customerEmail: SMTP_USER },
        content,
        horoscopeImages,
        null,
        'Invoice.pdf',
        '',
        emailOptions,
    );
}


async function sendFulfillmentEmail(
    order: Order,
    content: string,
    images: { filename: string; content: Buffer }[],
    invoicePdf: Buffer | null,
    invoiceFilename: string,
    link: string,
    emailOptions: FulfillmentEmailOptions,
) {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        throw new Error('SMTP configuration missing');
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const legalDocs = await generateLegalPDFs(order.lang || 'en');

    const attachments = [
        ...(invoicePdf ? [{ filename: invoiceFilename, content: invoicePdf }] : []),
        ...images.map(img => ({ filename: img.filename, content: img.content })),
        ...legalDocs.map(doc => ({ filename: doc.filename, content: Buffer.from(doc.content) }))
    ];

    const email = buildFulfillmentEmail(order, content, link, emailOptions);

    await transporter.sendMail({
        from: `"Astralo ✨" <${SMTP_USER}>`,
        to: order.customerEmail,
        subject: email.subject,
        html: email.html,
        attachments
    });
}
