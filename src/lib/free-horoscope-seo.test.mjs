import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Danish free-horoscope page keeps its gratis fødselshoroskop content and FAQ', async () => {
    const source = await readFile('src/components/FreeHoroscopeLeadPage.astro', 'utf8');

    assert.match(source, /Gratis fødselshoroskop \| Horoskop gratis \| Astralo/i);
    assert.match(source, /Er Astralos gratis fødselshoroskop virkelig gratis\?/i);
});

test('Dutch free-horoscope page keeps its gratis geboortehoroscoop content and FAQ', async () => {
    const source = await readFile('src/components/FreeHoroscopeLeadPage.astro', 'utf8');

    assert.match(source, /Gratis geboortehoroscoop \| Horoscoop gratis \| Astralo/i);
    assert.match(source, /Is de gratis geboortehoroscoop van Astralo echt gratis\?/i);
});

test('Czech free-horoscope page keeps its astrologický horoskop zdarma content and FAQ', async () => {
    const source = await readFile('src/components/FreeHoroscopeLeadPage.astro', 'utf8');

    assert.match(source, /Astrologický horoskop zdarma \| Osobní horoskop \| Astralo/i);
    assert.match(source, /Je astrologický horoskop na Astralo opravdu zdarma\?/i);
});

test('Turkish free-horoscope page keeps its ücretsiz doğum haritası content and FAQ', async () => {
    const source = await readFile('src/components/FreeHoroscopeLeadPage.astro', 'utf8');

    assert.match(source, /Ücretsiz doğum haritası başlangıcı \| Astroloji yorumu \| Astralo/i);
    assert.match(source, /Astralo ücretsiz doğum haritası başlangıcını gerçekten ücretsiz sunuyor mu\?/i);
});

test('localized free-horoscope metadata descriptions stay compact', async () => {
    const source = await readFile('src/components/FreeHoroscopeLeadPage.astro', 'utf8');
    const descriptions = [...source.matchAll(/description: '([^']+)'/g)].map((match) => match[1]);

    assert.ok(descriptions.length > 0);

    for (const description of descriptions) {
        assert.ok(description.length <= 160, `Description is ${description.length} characters: ${description}`);
    }
});
