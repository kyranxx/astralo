import type { Order } from './orders.ts';
import { needsProductEmailFulfillment } from './order-fulfillment-state.ts';
import {
    buildOrderFromCheckoutSession,
    isPaidCheckoutSession,
    type CheckoutSessionLike,
} from './stripe-order.ts';

export interface FulfillmentArtifacts {
    invoicePdfBuffer: Buffer | null;
    invoiceFilename: string;
    downloadUrl: string;
}

export interface CompletedCheckoutSessionHandlerDeps {
    findOrderBySessionId(sessionId: string): Promise<Order | null>;
    addOrder(order: Order): Promise<void>;
    loadFulfillmentArtifacts(session: CheckoutSessionLike): Promise<FulfillmentArtifacts>;
    fulfillOrder(
        order: Order,
        invoicePdfBuffer: Buffer | null,
        invoiceFilename: string,
        downloadUrl: string
    ): Promise<void>;
    trackServerPurchase(order: Order, gaClientId?: string): Promise<void>;
}

export async function handleCompletedCheckoutSession(
    session: CheckoutSessionLike,
    deps: CompletedCheckoutSessionHandlerDeps
) {
    if (!isPaidCheckoutSession(session)) {
        return {
            received: true,
            skipped: 'checkout_session_not_paid',
            payment_status: session.payment_status,
            status: session.status,
        };
    }

    let order = await deps.findOrderBySessionId(session.id);
    const duplicate = Boolean(order);

    if (!order) {
        order = buildOrderFromCheckoutSession(session);
        await deps.addOrder(order);
    }

    if (!needsProductEmailFulfillment(order)) {
        return {
            received: true,
            duplicate,
            fulfilled: Boolean(order.emailSentAt),
            skipped: order.customerEmail?.trim() ? undefined : 'missing_customer_email',
        };
    }

    try {
        const artifacts = await deps.loadFulfillmentArtifacts(session);
        await deps.fulfillOrder(
            order,
            artifacts.invoicePdfBuffer,
            artifacts.invoiceFilename,
            artifacts.downloadUrl
        );
    } catch (error) {
        // The paid order is already persisted. Acknowledge Stripe so it does not
        // keep retrying the same event; order-recovery will retry fulfillment.
        console.error('[checkout-fulfillment] queued for recovery', {
            orderId: order.id,
            stripeSessionId: order.stripeSessionId,
            error: error instanceof Error ? error.message : String(error),
        });
        return {
            received: true,
            duplicate,
            fulfilled: false,
            queuedForRecovery: true,
        };
    }
    await deps.trackServerPurchase(order, session.metadata?.gaClientId);

    return { received: true, duplicate, fulfilled: true };
}
