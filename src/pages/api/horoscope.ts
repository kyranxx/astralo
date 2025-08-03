import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QC4Q2GkhBz4CXszcZn9kZ6RIaBH2lSvLrDAw1nnXRwk4tQ3pXEKr79U6zDDVjFne3dDotHHyW5NGCtQl1IG4fGI00dOvATdZL', {
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

        const { productKey } = formData;

        let prompt;

        if (productKey === 'partner') {
            const { birthDate1, birthTime1, birthPlace1, name1, birthDate2, birthTime2, birthPlace2, name2 } = formData;
            prompt = `Si skúsený a výrečný astrológ. Vygeneruj podrobný partnerský horoskop (synastria) pre dve osoby v slovenskom jazyku.
            Osoba 1: ${name1}, narodená ${birthDate1} o ${birthTime1} v ${birthPlace1}.
            Osoba 2: ${name2}, narodená ${birthDate2} o ${birthTime2} v ${birthPlace2}.
            Zameraj sa na kľúčové aspekty ich vzťahu, silné stránky, výzvy a potenciál pre dlhodobú harmóniu.`;
        } else {
            const { birthDate, birthTime, birthPlace, name } = formData;
            let horoscopeType = '';
            switch (productKey) {
                case 'weekly': horoscopeType = 'týždenný horoskop'; break;
                case 'monthly': horoscopeType = 'mesačný horoskop'; break;
                case 'yearly': horoscopeType = 'ročný horoskop'; break;
                case 'natal': horoscopeType = 'osobnú rodnú mapu'; break;
            }
            prompt = `Si skúsený a výrečný astrológ. Vygeneruj podrobný a pútavý ${horoscopeType} pre ${name}, narodeného ${birthDate} o ${birthTime} v ${birthPlace} v slovenskom jazyku. Zameraj sa na kľúčové planéty a ich význam.`;
        }

        const perplexity = await fetch('http://localhost:3333/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: prompt,
            }),
        });

        const { response: horoscope } = await perplexity.json();

        return new Response(JSON.stringify({
            horoscope,
            product: productKey,
        }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Invalid session ID or error fetching data.' }), { status: 500 });
    }
};
