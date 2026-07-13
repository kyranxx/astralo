import type { ProductKey } from './products.ts';

const DEFAULT_GA4_MEASUREMENT_ID = 'G-M4VCEJ31XV';

export interface PurchaseAnalyticsInput {
    transactionId: string;
    gaClientId?: string;
    productKey: ProductKey;
    productName: string;
    amountCents: number;
    currency: string;
    lang: string;
}

export interface Ga4MeasurementConfig {
    measurementId?: string;
    apiSecret?: string;
    debug?: boolean;
}

export function normalizeGaClientId(value?: string | null): string {
    const trimmed = value?.trim();
    if (!trimmed) return '';

    const gaCookieMatch = trimmed.match(/^GA\d+\.\d+\.(.+)$/);
    return gaCookieMatch?.[1] || trimmed;
}

export function buildGa4PurchasePayload(input: PurchaseAnalyticsInput) {
    const clientId = normalizeGaClientId(input.gaClientId) || input.transactionId;
    const value = Number((Math.max(input.amountCents || 0, 0) / 100).toFixed(2));
    const currency = (input.currency || 'EUR').toUpperCase();

    return {
        client_id: clientId,
        events: [
            {
                name: 'purchase',
                params: {
                    transaction_id: input.transactionId,
                    currency,
                    value,
                    language: input.lang || 'en',
                    engagement_time_msec: 1,
                    items: [
                        {
                            item_id: input.productKey,
                            item_name: input.productName,
                            item_category: 'horoscope',
                            item_variant: input.lang || 'en',
                            price: value,
                            quantity: 1,
                        },
                    ],
                },
            },
        ],
    };
}

export async function sendGa4PurchaseEvent(
    input: PurchaseAnalyticsInput,
    config: Ga4MeasurementConfig = {}
): Promise<{ sent: boolean; status?: number; reason?: string }> {
    const measurementId = config.measurementId
        || import.meta.env?.GA4_MEASUREMENT_ID
        || process.env.GA4_MEASUREMENT_ID
        || DEFAULT_GA4_MEASUREMENT_ID;
    const apiSecret = config.apiSecret
        || import.meta.env?.GA4_API_SECRET
        || process.env.GA4_API_SECRET
        || import.meta.env?.GOOGLE_ANALYTICS_API_SECRET
        || process.env.GOOGLE_ANALYTICS_API_SECRET;

    if (!measurementId || !apiSecret) {
        return { sent: false, reason: 'missing_ga4_measurement_protocol_config' };
    }

    const endpoint = config.debug
        ? 'https://www.google-analytics.com/debug/mp/collect'
        : 'https://www.google-analytics.com/mp/collect';
    const url = `${endpoint}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildGa4PurchasePayload(input)),
    });

    if (!response.ok) {
        throw new Error(`GA4 purchase event failed with status ${response.status}`);
    }

    return { sent: true, status: response.status };
}
