import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

test('checkout and shared promo copy avoid unsupported urgency claims', async () => {
    const files = [
        'src/layouts/Layout.astro',
        'src/pages/form/[type].astro',
        'src/pages/[lang]/form/[type].astro',
        'src/components/BlogCTA.astro',
    ];

    for (const file of files) {
        const source = await readFile(file, 'utf8');

        assert.doesNotMatch(source, /Last Hours/i, file);
        assert.doesNotMatch(source, /Special Discount Unlocked/i, file);
        assert.doesNotMatch(source, />\s*(?:\{[^}]+\}\s*)?Limited offer\s*</i, file);
    }
});

test('paid form banners use localized delivery and secure-payment copy', async () => {
    const formTemplates = [
        await readFile('src/pages/form/[type].astro', 'utf8'),
        await readFile('src/pages/[lang]/form/[type].astro', 'utf8'),
    ];

    for (const source of formTemplates) {
        assert.match(source, /t\.promo\.secure/);
        assert.match(source, /t\.promo\.delivery/);
        assert.doesNotMatch(source, /<strong>Limited offer<\/strong>/i);
    }
});

test('sales surfaces avoid unsupported crossed-out discount pricing', async () => {
    const files = [
        'src/pages/index.astro',
        'src/pages/[lang]/index.astro',
        'src/pages/form/[type].astro',
        'src/pages/[lang]/form/[type].astro',
        'src/components/ProductLandingPage.astro',
        'src/components/ZodiacProductLandingPage.astro',
        'src/components/BlogCTA.astro',
        'src/components/CosmicAd.astro',
        'src/pages/blog/[slug].astro',
        'src/pages/[lang]/blog/[slug].astro',
    ];

    for (const file of files) {
        const source = await readFile(file, 'utf8');

        assert.doesNotMatch(source, /line-through/, file);
        assert.doesNotMatch(source, /-\s*50%/i, file);
        assert.doesNotMatch(source, /Was\s*€/i, file);
        assert.doesNotMatch(source, /getProductOriginalPriceInEuros/, file);
    }
});

test('lead capture requires explicit consent', async () => {
    const source = await readFile('src/components/EmailCapture.astro', 'utf8');

    assert.doesNotMatch(source, /name="gdprConsent"\s+checked/);
});

test('commerce pages do not render the page feedback widget over buying surfaces', async () => {
    const source = await readFile('src/layouts/Layout.astro', 'utf8');

    assert.match(source, /isCommercePath/);
    assert.match(source, /form\|horoscope\|free-horoscope/);
    assert.match(source, /showFeedbackWidget && <FeedbackWidget/);
});

test('checkout uses Stripe dynamic payment methods instead of card-only checkout', async () => {
    const source = await readFile('src/pages/api/checkout.ts', 'utf8');

    assert.match(source, /dashboard-configured dynamic payment methods/);
    assert.doesNotMatch(source, /automatic_payment_methods/);
    assert.doesNotMatch(source, /payment_method_types:\s*\[\s*['"]card['"]\s*\]/);
});

test('footer payment badges render without lazy-loading blank placeholders', async () => {
    const source = await readFile('src/components/Footer.astro', 'utf8');
    const paymentBlock = source.slice(
        source.indexOf('<!-- Payment Methods -->'),
        source.indexOf('<!-- Trust badges -->'),
    );

    assert.match(paymentBlock, /alt="Visa"/);
    assert.match(paymentBlock, /alt="Mastercard"/);
    assert.match(paymentBlock, /alt="Stripe"/);
    assert.doesNotMatch(paymentBlock, /loading="lazy"/);
});

test('local checkout CSRF allowlist supports localhost and 127 dev origins', async () => {
    const source = await readFile('src/lib/validation.ts', 'utf8');

    assert.match(source, /new URL\(value\)/);
    assert.match(source, /hostname === 'localhost'/);
    assert.match(source, /hostname === '127\.0\.0\.1'/);
    assert.match(source, /Number\.isInteger\(port\)/);
    assert.match(source, /hostname === 'astralo\.online'/);
    assert.match(source, /hostname === 'www\.astralo\.online'/);
    assert.doesNotMatch(source, /startsWith\(domain\)/);
});

test('locale sales copy avoids unsupported proof and discount claims', async () => {
    const localeFiles = (await readdir('src/locales'))
        .filter((file) => file.endsWith('.ts') && !['types.ts', 'index.ts', 'contact.ts'].includes(file))
        .map((file) => `src/locales/${file}`);

    for (const file of localeFiles) {
        const source = await readFile(file, 'utf8');

        assert.doesNotMatch(source, /50[\s,.]000\+?/u, file);
        assert.doesNotMatch(source, /\+50[\s,.]000/u, file);
        assert.doesNotMatch(source, /50\s*%|%\s*50|5折/u, file);
        assert.doesNotMatch(source, /4[,.]9\/5/u, file);
        assert.doesNotMatch(source, /special discount|discount unlocked/i, file);
    }
});
