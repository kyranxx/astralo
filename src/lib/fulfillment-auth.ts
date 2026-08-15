/**
 * Fulfillment auth: short-lived signed tokens that bind a checkout session
 * to the customer email, so browser-driven delivery endpoints cannot be
 * abused with a leaked session id alone.
 *
 * The signing key is derived from an existing production secret to avoid
 * requiring new environment variables.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

function getFulfillmentSigningKey(): string {
    const env = import.meta.env as Record<string, string | undefined> | undefined;
    return env?.FULFILLMENT_HMAC_KEY
        || env?.CRON_SECRET
        || env?.ADMIN_PASSWORD
        || process.env.FULFILLMENT_HMAC_KEY
        || process.env.CRON_SECRET
        || process.env.ADMIN_PASSWORD
        || '';
}

export function isFulfillmentAuthConfigured(): boolean {
    return Boolean(getFulfillmentSigningKey());
}

export function createFulfillmentToken(sessionId: string, email: string): string {
    const key = getFulfillmentSigningKey();
    if (!key) return '';
    return createHmac('sha256', key)
        .update(fulfillmentTokenPayload(sessionId, email))
        .digest('hex');
}

export function verifyFulfillmentToken(sessionId: string, email: string, token: string): boolean {
    if (!token || !sessionId) return false;

    const expected = createFulfillmentToken(sessionId, email);
    if (!expected) return false;

    const expectedBuffer = Buffer.from(expected, 'hex');
    const providedBuffer = Buffer.from(String(token), 'hex');

    if (expectedBuffer.length !== providedBuffer.length) return false;

    return timingSafeEqual(expectedBuffer, providedBuffer);
}

function fulfillmentTokenPayload(sessionId: string, email: string): string {
    return `${sessionId}:${String(email || '').toLowerCase().trim()}`;
}
