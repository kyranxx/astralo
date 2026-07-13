import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadMarketingCopyModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/marketing-copy.ts');
    } finally {
        await server.close();
    }
}

test('detects unsupported social proof with locale-spaced thousands separators', async () => {
    const { hasUnsupportedSocialProof } = await loadMarketingCopyModule();

    assert.equal(hasUnsupportedSocialProof('Gå med i 50 000+ andra.'), true);
    assert.equal(hasUnsupportedSocialProof('Liity 50\u00a0000+ muun joukkoon.'), true);
    assert.equal(hasUnsupportedSocialProof('৫০,০০০+ মানুষের সাথে যুক্ত হন।'), true);
});

test('strips unsupported social proof with a locale-spaced thousands separator', async () => {
    const { stripUnsupportedSocialProof } = await loadMarketingCopyModule();

    assert.equal(
        stripUnsupportedSocialProof('Med över 50 000 nöjda kunder får du en personlig läsning.'),
        'Med över nöjda kunder får du en personlig läsning.',
    );
});

test('all localized commercial copy is free from unsupported proof and ratings', async () => {
    const [{ hasUnsupportedSocialProof }, localeModule] = await Promise.all([
        loadMarketingCopyModule(),
        (async () => {
            const server = await createServer({
                root: process.cwd(),
                logLevel: 'silent',
                server: { middlewareMode: true },
                appType: 'custom',
            });

            try {
                return await server.ssrLoadModule('/src/locales/index.ts');
            } finally {
                await server.close();
            }
        })(),
    ]);

    function collectStrings(value, output = []) {
        if (typeof value === 'string') output.push(value);
        else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
        else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, output));
        return output;
    }

    for (const [locale, catalog] of Object.entries(localeModule.translations)) {
        for (const text of collectStrings(catalog)) {
            assert.equal(hasUnsupportedSocialProof(text), false, `${locale} contains unsupported social proof: ${text}`);
            assert.equal(/4[.,]9\s*\/\s*5/u.test(text), false, `${locale} contains an unsupported rating: ${text}`);
        }
    }
});
