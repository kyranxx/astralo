import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createServer } from 'vite';

process.env.ENABLE_LIFETIME_PRODUCT = 'true';

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

const singleCustomerPayload = {
    productKey: 'lifetime',
    lang: 'en',
    name: 'Jane Doe',
    email: 'jane@example.com',
    birthDate: '1994-08-11',
    birthTime: '08:30',
    birthPlace: 'Bratislava',
};

test('lifetime is a first-class paid product at 29.99 EUR', async () => {
    const {
        getProductKeys,
        getProductName,
        getProductPriceInEuros,
        isLifetimeProductEnabled,
        isValidProductKey,
        productPrices,
    } = await loadModule('/src/lib/products.ts');

    assert.equal(isLifetimeProductEnabled({}), false);
    assert.deepEqual(getProductKeys({}), ['daily', 'weekly', 'monthly', 'partner']);
    assert.equal(isLifetimeProductEnabled({ ENABLE_LIFETIME_PRODUCT: 'true' }), true);
    assert.deepEqual(getProductKeys(), ['daily', 'weekly', 'monthly', 'partner', 'lifetime']);
    assert.equal(productPrices.lifetime, 2999);
    assert.equal(getProductPriceInEuros('lifetime'), 29.99);
    assert.equal(isValidProductKey('lifetime'), true);
    assert.equal(getProductName('lifetime', 'en'), 'Lifetime Horoscope');
    assert.equal(getProductName('lifetime', 'sk'), 'Celo\u017eivotn\u00fd horoskop');
});

test('checkout validation accepts lifetime with the standard customer fields', async () => {
    const { CheckoutSchema } = await loadModule('/src/lib/validation.ts');
    const result = CheckoutSchema.safeParse(singleCustomerPayload);

    assert.equal(result.success, true);
});

test('paid Stripe sessions preserve lifetime instead of falling back to daily', async () => {
    const { buildOrderFromCheckoutSession } = await loadModule('/src/lib/stripe-order.ts');
    const order = buildOrderFromCheckoutSession({
        id: 'cs_test_lifetime',
        payment_intent: 'pi_lifetime',
        status: 'complete',
        payment_status: 'paid',
        amount_total: 2999,
        currency: 'eur',
        customer_email: 'jane@example.com',
        customer_details: {
            email: 'jane@example.com',
            name: 'Jane Doe',
            address: { country: 'SK' },
        },
        metadata: {
            productKey: 'lifetime',
            lang: 'en',
            name: 'Jane Doe',
            birthDate: '1994-08-11',
            birthTime: '08:30',
            birthPlace: 'Bratislava',
        },
    });

    assert.equal(order.productKey, 'lifetime');
    assert.equal(order.productName, 'Lifetime Horoscope');
    assert.equal(order.amount, 2999);
});

test('lifetime generation prompt describes the high-value lifetime report', async () => {
    const { buildHoroscopeGenerationPrompt } = await loadModule('/src/lib/fulfillment.ts');
    const prompt = buildHoroscopeGenerationPrompt({
        id: 'order_lifetime',
        customerEmail: 'jane@example.com',
        customerName: 'Jane Doe',
        birthDate: '1994-08-11',
        birthTime: '08:30',
        birthPlace: 'Bratislava',
        productKey: 'lifetime',
        productName: 'Lifetime Horoscope',
        amount: 2999,
        currency: 'eur',
        status: 'completed',
        lang: 'en',
        createdAt: new Date('2026-07-04T12:00:00Z').toISOString(),
    });

    assert.match(prompt, /lifetime horoscope/i);
    assert.match(prompt, /~3000 words/i);
    assert.match(prompt, /life path/i);
    assert.match(prompt, /long-term/i);
});

test('public product schemas and agent metadata include lifetime', async () => {
    const { buildOfferCatalogSchema } = await loadModule('/src/lib/seo.ts');
    const { translations } = await loadModule('/src/lib/i18n.ts');
    const { buildOpenApiSpec, productCatalog } = await loadModule('/src/lib/agent-ready.ts');

    const offerCatalog = buildOfferCatalogSchema('en', translations.en);
    const lifetimeOffer = offerCatalog.itemListElement.find((item) =>
        item.url.endsWith('/horoscope/lifetime')
    );

    assert.ok(lifetimeOffer, 'OfferCatalog should expose /horoscope/lifetime');
    assert.equal(lifetimeOffer.price, '29.99');
    assert.equal(productCatalog.lifetime.priceEur, 29.99);

    const spec = buildOpenApiSpec();
    const checkoutSchema = spec.paths['/api/checkout'].post.requestBody.content['application/json'].schema;
    assert.ok(checkoutSchema.properties.productKey.enum.includes('lifetime'));
});

test('static product landing and form routes use the shared product key list', async () => {
    const routeFiles = [
        'src/pages/horoscope/[type].astro',
        'src/pages/[lang]/horoscope/[type].astro',
        'src/pages/form/[type].astro',
        'src/pages/[lang]/form/[type].astro',
    ];

    for (const file of routeFiles) {
        const source = await readFile(file, 'utf8');
        assert.match(source, /getProductKeys/, `${file} should import/use getProductKeys`);
        assert.doesNotMatch(
            source,
            /\['daily', 'weekly', 'monthly', 'partner'\]/,
            `${file} should not hard-code the four legacy products`,
        );
    }
});

test('checkout API blocks disabled products even if validation knows the product', async () => {
    const source = await readFile('src/pages/api/checkout.ts', 'utf8');

    assert.match(source, /getProductKeys/);
    assert.match(source, /Product is not available/);
});

test('zodiac product routes intentionally exclude lifetime from thin sign pages', async () => {
    const { getZodiacProductKeys } = await loadModule('/src/lib/products.ts');
    const routeFiles = [
        'src/pages/horoscope/[type]/[sign].astro',
        'src/pages/[lang]/horoscope/[type]/[sign].astro',
    ];

    assert.deepEqual(getZodiacProductKeys(), ['daily', 'weekly', 'monthly', 'partner']);

    for (const file of routeFiles) {
        const source = await readFile(file, 'utf8');
        assert.match(source, /getZodiacProductKeys/, `${file} should import/use getZodiacProductKeys`);
        assert.doesNotMatch(
            source,
            /\['daily', 'weekly', 'monthly', 'partner'\]/,
            `${file} should not hard-code zodiac product keys`,
        );
    }
});
