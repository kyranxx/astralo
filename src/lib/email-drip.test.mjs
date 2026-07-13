import assert from 'node:assert/strict';
import test from 'node:test';

import {
    buildFollowupEmailHtml,
    buildFollowupRows,
} from './email-drip.ts';

test('normalizes queued followup emails and falls back to English for invalid locales', () => {
    const subscribedAt = new Date('2026-05-27T08:00:00.000Z');

    const rows = buildFollowupRows(' USER@Example.COM ', 'xx', subscribedAt);

    assert.equal(rows.length, 6);
    assert.equal(rows[0].email, 'user@example.com');
    assert.equal(rows.every((row) => row.lang === 'en'), true);
    assert.equal(rows[0].scheduled_for, '2026-05-28T08:00:00.000Z');
});

test('builds Portuguese followup copy with tracked product links', () => {
    const email = buildFollowupEmailHtml('lead@example.com', 'pt', 'day_2_monthly');

    assert.ok(email);
    assert.equal(email.subject, 'Dia 2: aprofunde mais do que um horóscopo geral');
    assert.match(email.html, /Uma leitura mensal dá mais contexto/);
    assert.match(email.html, /\/pt\/horoscope\/monthly\?utm_source=email&utm_medium=drip&utm_campaign=day_2_monthly/);
});
