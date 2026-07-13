import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/horoscope-ai.ts');
    } finally {
        await server.close();
    }
}

test('returns trimmed OpenAI response text with privacy-safe storage disabled', async () => {
    const { generateHoroscopeText } = await loadModule();
    let request;
    const client = {
        responses: {
            async create(input) {
                request = input;
                return { output_text: '  Your horoscope  ' };
            },
        },
    };

    const result = await generateHoroscopeText('prompt', { client, maxOutputTokens: 500 });

    assert.equal(result, 'Your horoscope');
    assert.equal(request.model, 'gpt-5.6-terra');
    assert.equal(request.input, 'prompt');
    assert.equal(request.max_output_tokens, 500);
    assert.equal(request.store, false);
    assert.deepEqual(request.reasoning, { effort: 'low' });
});

test('rejects an empty provider response instead of emailing blank content', async () => {
    const { generateHoroscopeText } = await loadModule();
    const client = {
        responses: {
            async create() {
                return { output_text: '   ' };
            },
        },
    };

    await assert.rejects(
        generateHoroscopeText('prompt', { client }),
        /OpenAI returned an empty horoscope/,
    );
});

test('reports a missing OpenAI key without attempting a live request', async () => {
    const { verifyOpenAIProvider } = await loadModule();
    const health = await verifyOpenAIProvider();

    assert.deepEqual(health, {
        configured: false,
        ok: false,
        message: 'OPENAI_API_KEY is not configured.',
    });
});
