import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadTranslations() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return (await server.ssrLoadModule('/src/locales/index.ts')).translations;
    } finally {
        await server.close();
    }
}

function leafPaths(value, prefix = '', output = []) {
    if (typeof value === 'string') {
        output.push(prefix);
    } else if (Array.isArray(value)) {
        value.forEach((item, index) => leafPaths(item, `${prefix}.${index}`, output));
    } else if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, item]) => leafPaths(item, prefix ? `${prefix}.${key}` : key, output));
    }
    return output;
}

test('every supported locale has the same complete catalog shape as English', async () => {
    const translations = await loadTranslations();
    const expected = leafPaths(translations.en).sort();

    assert.equal(Object.keys(translations).length, 34);
    for (const [locale, catalog] of Object.entries(translations)) {
        assert.deepEqual(leafPaths(catalog).sort(), expected, `${locale} catalog differs from English`);
    }
});

test('Bengali customer copy does not contain accidental Devanagari text', async () => {
    const translations = await loadTranslations();
    const bengaliText = JSON.stringify(translations.bn);
    // U+0964/U+0965 are shared Indic danda punctuation, not Hindi text.
    assert.equal(/[\u0900-\u0963\u0966-\u097f]/u.test(bengaliText), false);
});

test('localized ad headings are not assembled from grammar-sensitive fragments', async () => {
    const source = await import('node:fs').then(({ readFileSync }) => readFileSync('src/components/CosmicAd.astro', 'utf8'));
    assert.doesNotMatch(source, /ads\?\.unlock/);
    assert.doesNotMatch(source, /ads\?\.getFor/);
});
