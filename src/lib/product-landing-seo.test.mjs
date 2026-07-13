import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createServer } from 'vite';

async function loadModule(modulePath) {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule(modulePath);
    } finally {
        await server.close();
    }
}

test('paid landing descriptions do not mix an English connector into localized snippets', async () => {
    const source = await readFile('src/components/ProductLandingPage.astro', 'utf8');

    assert.doesNotMatch(source, /\$\{product\.name\} from Astralo/);
});

test('paid landing templates do not show hard-coded English price labels on localized pages', async () => {
    const templates = await Promise.all([
        readFile('src/components/ProductLandingPage.astro', 'utf8'),
        readFile('src/components/ZodiacProductLandingPage.astro', 'utf8'),
    ]);

    for (const source of templates) {
        assert.doesNotMatch(source, /Today(?:&apos;|')s Price/i);
        assert.doesNotMatch(source, />Limited offer</i);
        assert.doesNotMatch(source, /alt="Sample horoscope PDF preview"/i);
    }
});

test('paid landing descriptions remain localized and compact across every locale and product', async () => {
    const { buildProductLandingDescription } = await loadModule('/src/lib/product-landing-seo.ts');
    const { translations } = await loadModule('/src/lib/i18n.ts');
    const { getProductKeys } = await loadModule('/src/lib/products.ts');
    const productKeys = getProductKeys();

    for (const [lang, t] of Object.entries(translations)) {
        for (const productKey of productKeys) {
            const description = buildProductLandingDescription(t, productKey);

            assert.ok(
                [...description].length <= 160,
                `${lang}/${productKey} description is too long: ${description}`,
            );
            assert.doesNotMatch(description, /\bfrom Astralo\b/i);
            assert.match(description, /[.!?。！？]$/u);
        }
    }
});

test('Swedish daily paid landing copy matches Search Console daily-horoscope intent', async () => {
    const { buildProductLandingDescription } = await loadModule('/src/lib/product-landing-seo.ts');
    const { translations } = await loadModule('/src/lib/i18n.ts');
    const { getProductName } = await loadModule('/src/lib/products.ts');
    const product = translations.sv.products.daily;
    const description = buildProductLandingDescription(translations.sv, 'daily');

    assert.equal(product.name, 'Dagens horoskop');
    assert.equal(product.name, getProductName('daily', 'sv'));
    assert.match(description, /^Dagens horoskop\./);
    assert.match(description, /horoskop idag/i);
    assert.ok([...description].length <= 160, description);
});

test('Norwegian and Finnish daily paid landing copy matches Search Console daily intent', async () => {
    const { buildProductLandingDescription } = await loadModule('/src/lib/product-landing-seo.ts');
    const { translations } = await loadModule('/src/lib/i18n.ts');
    const { getProductName } = await loadModule('/src/lib/products.ts');

    const norwegianDescription = buildProductLandingDescription(translations.no, 'daily');
    assert.equal(translations.no.products.daily.name, 'Dagens horoskop');
    assert.equal(translations.no.products.daily.name, getProductName('daily', 'no'));
    assert.match(norwegianDescription, /^Dagens horoskop\./);

    const finnishDescription = buildProductLandingDescription(translations.fi, 'daily');
    assert.equal(translations.fi.products.daily.name, 'Päivittäinen horoskooppi');
    assert.equal(translations.fi.products.daily.name, getProductName('daily', 'fi'));
    assert.match(finnishDescription, /^Päivittäinen horoskooppi\./);
});

test('testimonial output stays disabled until real customer proof exists', async () => {
    const { getTestimonials, getAvailableTestimonialLocales } = await loadModule('/src/lib/testimonials.ts');
    const testimonialSource = await readFile('src/lib/testimonials.ts', 'utf8');
    const paidLandingTemplate = await readFile('src/components/ProductLandingPage.astro', 'utf8');
    const zodiacLandingTemplate = await readFile('src/components/ZodiacProductLandingPage.astro', 'utf8');

    assert.deepEqual(getTestimonials('en'), []);
    assert.deepEqual(getTestimonials('sk'), []);
    assert.deepEqual(getAvailableTestimonialLocales(), []);
    assert.doesNotMatch(testimonialSource, /Sarah Mitchell|Jana Kováčová|Amazing accuracy/i);
    assert.doesNotMatch(paidLandingTemplate, /getTestimonials|testimonials\.map|What Our Customers Say/);
    assert.match(zodiacLandingTemplate, /testimonials\.length > 0 &&/);
});

test('Portuguese weekly paid landing has visible Search Console intent content', async () => {
    const {
        buildProductLandingDescription,
        getProductLandingSeoContent,
    } = await loadModule('/src/lib/product-landing-seo.ts');
    const { translations } = await loadModule('/src/lib/i18n.ts');
    const template = await readFile('src/components/ProductLandingPage.astro', 'utf8');
    const description = buildProductLandingDescription(translations.pt, 'weekly');
    const content = getProductLandingSeoContent('pt', 'weekly');

    assert.match(description, /horóscopo semanal personalizado/i);
    assert.ok([...description].length <= 160, description);
    assert.ok(content, 'Expected Portuguese weekly product SEO content');
    assert.match(content.title, /Horóscopo semanal personalizado/i);
    assert.match(content.intro, /próximos 7 dias/i);
    assert.ok(content.points.some((point) => /Portugal/i.test(point.body)));
    assert.equal(content.faqs.length, 3);
    assert.match(template, /productSeoContent\.faqs\.map/);
    assert.match(template, /\.\.\.\(productSeoContent\?\.faqs \|\| \[\]\)/);
});
