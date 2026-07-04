import assert from 'node:assert/strict';
import test from 'node:test';

import { createServer } from 'vite';

async function loadFeedbackModules() {
    const server = await createServer({
        root: process.cwd(),
        logLevel: 'silent',
        server: { middlewareMode: true },
        appType: 'custom',
    });

    try {
        const copyModule = await server.ssrLoadModule('/src/lib/feedback-widget-copy.ts');
        const i18nModule = await server.ssrLoadModule('/src/lib/i18n.ts');
        return { copyModule, i18nModule };
    } finally {
        await server.close();
    }
}

test('provides localized feedback widget copy and hCaptcha language for every supported locale', async () => {
    const { copyModule, i18nModule } = await loadFeedbackModules();
    const {
        getFeedbackWidgetCopy,
        getFeedbackWidgetLocales,
        getHcaptchaLanguage,
    } = copyModule;
    const { locales } = i18nModule;

    const supportedLocales = Object.keys(locales).sort();
    const feedbackLocales = getFeedbackWidgetLocales().sort();

    assert.deepEqual(feedbackLocales, supportedLocales);

    for (const locale of supportedLocales) {
        const copy = getFeedbackWidgetCopy(locale);
        assert.equal(typeof getHcaptchaLanguage(locale), 'string');
        assert.ok(getHcaptchaLanguage(locale).length >= 2);

        for (const [key, value] of Object.entries(copy)) {
            assert.equal(typeof value, 'string', `${locale}.${key} should be a string`);
            assert.ok(value.trim().length > 0, `${locale}.${key} should not be empty`);
        }
    }
});

test('uses Spanish copy and hCaptcha language on Spanish pages', async () => {
    const { copyModule } = await loadFeedbackModules();
    const { getFeedbackWidgetCopy, getHcaptchaLanguage } = copyModule;

    const copy = getFeedbackWidgetCopy('es');

    assert.equal(copy.buttonQuestion, '¿Te gusta esta página?');
    assert.equal(copy.submit, 'Enviar comentarios');
    assert.equal(getHcaptchaLanguage('es'), 'es');
});

test('falls back to English copy and hCaptcha language for unknown locales', async () => {
    const { copyModule } = await loadFeedbackModules();
    const { getFeedbackWidgetCopy, getHcaptchaLanguage } = copyModule;

    assert.equal(getFeedbackWidgetCopy('unknown').buttonQuestion, 'Do you like this page?');
    assert.equal(getHcaptchaLanguage('unknown'), 'en');
});
