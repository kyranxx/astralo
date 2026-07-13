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

test('localized home SEO overrides expose search-targeted hero headings', async () => {
    const { getHomeSeoOverride } = await loadSeoModule();

    assert.match(getHomeSeoOverride('da').heroTitle, /Professionelt horoskop online/i);
    assert.match(getHomeSeoOverride('de').heroTitle, /Astral Horoskop/i);
    assert.match(getHomeSeoOverride('fr').supportingCopy, /thème astral en ligne/i);
    assert.match(getHomeSeoOverride('hr').heroTitle, /Astral horoskop online/i);
    assert.match(getHomeSeoOverride('sl').heroTitle, /Astral horoskop online/i);
    assert.match(getHomeSeoOverride('fi').heroTitle, /Päivittäinen horoskooppi/i);
    assert.match(getHomeSeoOverride('pt').heroTitle, /horóscopo diário personalizado/i);
    assert.match(getHomeSeoOverride('no').heroTitle, /Gratis personlig horoskop/i);
    assert.match(getHomeSeoOverride('sv').heroTitle, /Personligt horoskop online/i);
    assert.match(getHomeSeoOverride('ro').heroTitle, /Horoscop personalizat gratuit/i);
    assert.match(getHomeSeoOverride('id').heroTitle, /Horoskop gratis hari ini/i);
});

test('English homepage meta description stays compact and brand-focused', async () => {
    const source = await readFile('src/pages/index.astro', 'utf8');
    const description = source.match(/const homepageDescription = '([^']+)';/)?.[1];

    assert.ok(description, 'Expected a fixed English homepage meta description');
    assert.match(description, /^Official Astralo website/i);
    assert.ok([...description].length <= 160, description);
});

test('Portuguese homepage description matches proven daily horoscope demand', async () => {
    const { getHomeSeoOverride } = await loadSeoModule();
    const description = getHomeSeoOverride('pt').description;

    assert.match(description, /horóscopo diário/i);
    assert.ok([...description].length <= 160, description);
});

test('high-ranking low-CTR locales have concise native homepage SEO overrides', async () => {
    const { getHomeSeoOverride } = await loadSeoModule();
    const expectedTerms = {
        ar: /أبراج اليوم/,
        hi: /आज का राशिफल/,
        ja: /今日の運勢/,
        ko: /오늘의 별자리 운세/,
        ru: /гороскоп на сегодня/i,
        tr: /günlük burç yorumları/i,
        zh: /今日星座运势/,
    };

    for (const [lang, term] of Object.entries(expectedTerms)) {
        const seo = getHomeSeoOverride(lang);
        assert.ok(seo, `Missing homepage SEO override for ${lang}`);
        assert.match(`${seo.title} ${seo.heroTitle} ${seo.description}`, term);
        assert.ok([...seo.title].length <= 60, `${lang} title: ${seo.title}`);
        assert.ok([...seo.description].length <= 160, `${lang} description: ${seo.description}`);
    }
});

test('priority-market free CTAs use native horoscope wording instead of literal reading copy', async () => {
    const expectedCtas = {
        ar: 'اعرض برجي المجاني',
        de: 'Kostenloses Horoskop ansehen',
        es: 'Ver mi horóscopo gratis',
        fi: 'Näytä ilmainen horoskooppini',
        fr: 'Voir mon horoscope gratuit',
        hi: 'मेरा मुफ्त राशिफल देखें',
        id: 'Lihat horoskop gratis saya',
        ja: '無料の運勢を見る',
        ko: '무료 운세 보기',
        pl: 'Sprawdź bezpłatny horoskop',
        pt: 'Ver o meu horóscopo gratuito',
        ru: 'Посмотреть бесплатный гороскоп',
        tr: 'Ücretsiz burç yorumumu gör',
        zh: '查看免费运势',
    };

    for (const [lang, cta] of Object.entries(expectedCtas)) {
        const source = await readFile(`src/locales/${lang}.ts`, 'utf8');
        assert.ok(source.includes(`button: '${cta}'`), `${lang} CTA does not match search intent`);
    }
});

test('Slovak and Czech homepage descriptions target horoskop online compactly', async () => {
    const { getHomeSeoOverride } = await loadSeoModule();

    for (const lang of ['sk', 'cs']) {
        const seo = getHomeSeoOverride(lang);
        assert.match(seo.title, /Horoskop online/i);
        assert.match(seo.heroTitle, /Horoskop online/i);
        assert.match(seo.description, /horoskop online/i);
        assert.ok([...seo.description].length <= 160, seo.description);
    }
});

test('Danish homepage keeps its professionelt horoskop intent section and FAQ', async () => {
    const source = await readFile('src/pages/[lang]/index.astro', 'utf8');

    assert.match(source, /Professionelt horoskop: personlig læsning frem for standardtekst/i);
    assert.match(source, /Hvad er et professionelt horoskop\?/i);
});

test('Finnish homepage keeps its ilmainen päivähoroskooppi intent section and FAQ', async () => {
    const source = await readFile('src/pages/[lang]/index.astro', 'utf8');

    assert.match(source, /Ilmainen päivähoroskooppi henkilökohtaisen astrologian alkuun/i);
    assert.match(source, /Onko Astralon päivähoroskooppi ilmainen\?/i);
});

test('Swedish homepage keeps its gratis personligt horoskop intent section and FAQ', async () => {
    const source = await readFile('src/pages/[lang]/index.astro', 'utf8');

    assert.match(source, /Gratis personligt horoskop som en tydlig start/i);
    assert.match(source, /Var kan jag få ett gratis personligt horoskop\?/i);
});
