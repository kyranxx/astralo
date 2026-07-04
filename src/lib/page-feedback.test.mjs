import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadFeedbackModule() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        return await server.ssrLoadModule('/src/lib/page-feedback.ts');
    } finally {
        await server.close();
    }
}

test('normalizes a valid helpful page feedback submission', async () => {
    const { parsePageFeedbackPayload } = await loadFeedbackModule();
    const now = Date.now();

    const result = parsePageFeedbackPayload({
        rating: 'helpful',
        feedback: 'The reading was clear and easy to understand.',
        email: ' Visitor@Example.COM ',
        pageUrl: 'https://astralo.online/blog/daily-horoscope-guide?utm_source=test#top',
        pageTitle: 'Daily Horoscope Guide',
        lang: 'en',
        openedAt: String(now - 5000),
        hcaptchaToken: 'captcha-token',
        website: '',
    }, now);

    assert.equal(result.ok, true);
    assert.equal(result.value.rating, 'helpful');
    assert.equal(result.value.email, 'visitor@example.com');
    assert.equal(result.value.pagePath, '/blog/daily-horoscope-guide');
    assert.equal(result.value.lang, 'en');
});

test('rejects negative feedback without an explanation', async () => {
    const { parsePageFeedbackPayload } = await loadFeedbackModule();
    const now = Date.now();

    const result = parsePageFeedbackPayload({
        rating: 'not_helpful',
        feedback: '   ',
        pageUrl: 'https://astralo.online/',
        openedAt: String(now - 5000),
        hcaptchaToken: 'captcha-token',
        website: '',
    }, now);

    assert.equal(result.ok, false);
    assert.equal(result.error, 'Please tell us what you expected, wanted changed, or wanted added.');
});

test('rejects honeypot and too-fast bot submissions', async () => {
    const { parsePageFeedbackPayload } = await loadFeedbackModule();
    const now = Date.now();

    const honeypot = parsePageFeedbackPayload({
        rating: 'helpful',
        feedback: 'Looks good.',
        pageUrl: 'https://astralo.online/',
        openedAt: String(now - 5000),
        hcaptchaToken: 'captcha-token',
        website: 'filled by bot',
    }, now);

    assert.equal(honeypot.ok, false);
    assert.equal(honeypot.error, 'Feedback could not be accepted.');

    const tooFast = parsePageFeedbackPayload({
        rating: 'helpful',
        feedback: 'Looks good.',
        pageUrl: 'https://astralo.online/',
        openedAt: String(now - 300),
        hcaptchaToken: 'captcha-token',
        website: '',
    }, now);

    assert.equal(tooFast.ok, false);
    assert.equal(tooFast.error, 'Please spend a moment on the page before sending feedback.');
});

test('builds escaped owner email html with page context', async () => {
    const { buildPageFeedbackEmailHtml } = await loadFeedbackModule();

    const html = buildPageFeedbackEmailHtml({
        rating: 'not_helpful',
        feedback: '<script>alert("x")</script> Needs examples.',
        email: '',
        pageUrl: 'https://astralo.online/free-horoscope',
        pagePath: '/free-horoscope',
        pageTitle: 'Free Horoscope',
        lang: 'en',
        userAgent: 'Test Browser',
        referrer: '',
    });

    assert.match(html, /Not helpful/);
    assert.match(html, /\/free-horoscope/);
    assert.doesNotMatch(html, /<script>/);
    assert.match(html, /&lt;script&gt;alert/);
});
