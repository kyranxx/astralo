import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createServer } from 'vite';

async function loadSeoModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/seo.ts');
    } finally {
        await server.close();
    }
}

test('localized homepage paths use the site-wide no-trailing-slash policy', async () => {
    const { getHomePath } = await loadSeoModule();

    assert.equal(getHomePath('en'), '/');
    assert.equal(getHomePath('de'), '/de');
    assert.equal(getHomePath('id'), '/id');
});

test('canonical URLs drop trailing slashes, query strings, and fragments', async () => {
    const { normalizeCanonicalUrl } = await loadSeoModule();

    assert.equal(normalizeCanonicalUrl('https://astralo.online/de/'), 'https://astralo.online/de');
    assert.equal(normalizeCanonicalUrl('/fr/blog/?utm_source=test#top'), 'https://astralo.online/fr/blog');
    assert.equal(normalizeCanonicalUrl('https://astralo.online/'), 'https://astralo.online/');
});

test('framework and deployment configs agree on trailing-slash policy', async () => {
    const astroConfig = await readFile('astro.config.mjs', 'utf8');
    const vercelConfig = JSON.parse(await readFile('vercel.json', 'utf8'));

    assert.match(astroConfig, /trailingSlash:\s*['"]never['"]/);
    assert.equal(vercelConfig.trailingSlash, false);
});

test('homepage templates do not create redirecting trailing-slash article links', async () => {
    const rootHome = await readFile('src/pages/index.astro', 'utf8');
    const localizedHome = await readFile('src/pages/[lang]/index.astro', 'utf8');

    assert.doesNotMatch(rootHome, /href=\{`\/blog\/\$\{article\.slug\}\/`\}/);
    assert.doesNotMatch(localizedHome, /href=\{`\/\$\{currentLang\}\/blog\/\$\{article\.slug\}\/`\}/);
    assert.doesNotMatch(localizedHome, /href=\{`\/\$\{currentLang\}\/`\}/);
});
