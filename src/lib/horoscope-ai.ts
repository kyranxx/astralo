import OpenAI from 'openai';

export const DEFAULT_OPENAI_MODEL = 'gpt-5.6-terra';

type OpenAITextClient = Pick<OpenAI, 'responses'>;

function getRuntimeValue(name: 'OPENAI_API_KEY' | 'OPENAI_MODEL'): string | undefined {
    const env = import.meta.env as Record<string, string | undefined>;
    return env?.[name] || process.env[name];
}

export function getHoroscopeModel(): string {
    return getRuntimeValue('OPENAI_MODEL') || DEFAULT_OPENAI_MODEL;
}

function createOpenAIClient(): OpenAI {
    const apiKey = getRuntimeValue('OPENAI_API_KEY');
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured');
    }

    return new OpenAI({ apiKey });
}

export async function generateHoroscopeText(
    prompt: string,
    options: { client?: OpenAITextClient; maxOutputTokens?: number } = {},
): Promise<string> {
    const client = options.client || createOpenAIClient();
    const response = await client.responses.create({
        model: getHoroscopeModel(),
        reasoning: { effort: 'low' },
        input: prompt,
        max_output_tokens: options.maxOutputTokens || 16_000,
        store: false,
        text: { verbosity: 'high' },
    });
    if (response.usage) {
        console.info('[horoscope-generation] token usage', {
            model: getHoroscopeModel(),
            inputTokens: response.usage.input_tokens,
            outputTokens: response.usage.output_tokens,
            totalTokens: response.usage.total_tokens,
        });
    }
    const text = response.output_text?.trim();

    if (!text) {
        throw new Error('OpenAI returned an empty horoscope');
    }

    return text;
}

export interface OpenAIProviderHealth {
    configured: boolean;
    ok: boolean;
    message: string;
}

export async function verifyOpenAIProvider(): Promise<OpenAIProviderHealth> {
    const apiKey = getRuntimeValue('OPENAI_API_KEY');
    if (!apiKey) {
        return {
            configured: false,
            ok: false,
            message: 'OPENAI_API_KEY is not configured.',
        };
    }

    try {
        const client = new OpenAI({ apiKey });
        await client.models.retrieve(getHoroscopeModel());
        return {
            configured: true,
            ok: true,
            message: `${getHoroscopeModel()} is reachable with the configured OpenAI key.`,
        };
    } catch (error) {
        const detail = error instanceof Error ? error.message : 'Unknown provider error';
        return {
            configured: true,
            ok: false,
            message: `OpenAI provider check failed: ${detail}`,
        };
    }
}
