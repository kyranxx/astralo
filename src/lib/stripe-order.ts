import type Stripe from 'stripe';
import { generateOrderId } from './formatters.ts';
import type { Order } from './orders.ts';
import { getProductName, isValidProductKey, productPrices, type ProductKey } from './products.ts';

export type CheckoutSessionLike = Pick<
    Stripe.Checkout.Session,
    | 'id'
    | 'payment_intent'
    | 'status'
    | 'payment_status'
    | 'amount_total'
    | 'currency'
    | 'customer_email'
    | 'customer_details'
    | 'metadata'
>;

export function isPaidCheckoutSession(session: Pick<Stripe.Checkout.Session, 'status' | 'payment_status'>): boolean {
    return session.status === 'complete' && session.payment_status === 'paid';
}

export function buildOrderFromCheckoutSession(session: CheckoutSessionLike): Order {
    const metadata = session.metadata || {};
    const lang = metadata.lang || 'en';
    const productKey: ProductKey = isValidProductKey(metadata.productKey || '')
        ? metadata.productKey as ProductKey
        : 'daily';
    const customerAddress = session.customer_details?.address;
    const countryCode = customerAddress?.country || '';

    return {
        id: generateOrderId(),
        stripeSessionId: session.id,
        stripePaymentIntentId: getStripeId(session.payment_intent),
        createdAt: new Date().toISOString(),

        customerEmail: session.customer_details?.email || session.customer_email || metadata.customerEmail || '',
        customerName: metadata.name || metadata.name1 || session.customer_details?.name || 'Unknown',
        birthDate: metadata.birthDate || metadata.birthDate1 || '',
        birthTime: metadata.birthTime || metadata.birthTime1 || undefined,
        birthPlace: metadata.birthPlace || metadata.birthPlace1 || undefined,

        partnerName: metadata.partnerName || metadata.name2 || undefined,
        partnerBirthDate: metadata.partnerBirthDate || metadata.birthDate2 || undefined,
        partnerBirthTime: metadata.partnerBirthTime || metadata.birthTime2 || undefined,
        partnerBirthPlace: metadata.partnerBirthPlace || metadata.birthPlace2 || undefined,

        productKey,
        productName: getProductName(productKey, lang),
        amount: session.amount_total || productPrices[productKey],
        currency: session.currency || 'eur',

        country: getCountryName(countryCode),
        countryCode,

        status: 'completed',
        lang,
    };
}

function getStripeId(value: string | { id?: string } | null): string | undefined {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    return value.id;
}

function getCountryName(code: string): string {
    if (!code) return 'Unknown';
    try {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(code.toUpperCase()) || code;
    } catch {
        return code;
    }
}
