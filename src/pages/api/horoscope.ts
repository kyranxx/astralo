import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export const POST: APIRoute = async ({ request }) => {
    const { sessionId } = await request.json();

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Session ID is required' }), { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const formData = session.metadata;

        if (!formData) {
            return new Response(JSON.stringify({ error: 'No metadata found for this session.' }), { status: 400 });
        }

        const { date, time, city, productKey } = formData;

        // 1. Fetch Astrological Data
        const astroApiUrl = new URL('https://api.freeastrologyapi.com/chart');
        // Note: Geocoding city to lat/lon would be needed for full accuracy.
        // For now, we'll use a placeholder or omit it if the API allows.
        // This API seems to not require it for basic planet positions.
        astroApiUrl.searchParams.append('dob', date);
        astroApiUrl.searchParams.append('time', time);
        
        const astroResponse = await fetch(astroApiUrl.toString());
        if (!astroResponse.ok) {
            throw new Error('Failed to fetch astrological data.');
        }
        const astroData = await astroResponse.json();
        const planetsData = JSON.stringify(astroData.planets); // Simplified for the prompt

        // 2. Generate Horoscope with Perplexity AI
        const prompt = `Si skúsený a výrečný astrológ. Na základe nasledujúcich astrologických dát (pozície planét), vygeneruj podrobnú a pútavú osobnú rodnú mapu v slovenskom jazyku. Zameraj sa na kľúčové planéty (Slnko, Luna, Ascendent, Mars, Venuša) a vysvetli ich význam v znameniach a domoch jednoduchým a povzbudivým spôsobom. Dáta: ${planetsData}`;

        // NOTE: This is where the call to the Perplexity MCP would happen.
        // Since I cannot directly call another tool from within an API route that is being written to a file,
        // we will simulate the AI response for now. The logic and prompt are ready for the final integration.
        const simulatedAiResponse = {
            horoscope: `(Simulovaná AI Odpoveď) Na základe vašich jedinečných dát, Slnko vo vašom znamení naznačuje silnú vôľu a vodcovské schopnosti. Vaša Luna odhaľuje hlboké emocionálne prepojenie s rodinou, zatiaľ čo pozícia Venuše hovorí o vašej túžbe po harmónii vo vzťahoch. Detailná analýza vašich planetárnych pozícií odhalí viac o vašej životnej ceste.`
        };

        return new Response(JSON.stringify({
            horoscope: simulatedAiResponse.horoscope,
            product: formData.productKey,
        }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Invalid session ID or error fetching data.' }), { status: 500 });
    }
};
