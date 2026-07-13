import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import {
  handleCompletedCheckoutSession,
  type FulfillmentArtifacts,
} from '../../lib/checkout-session-handler';
import { fulfillOrder } from '../../lib/fulfillment';
import {
  addOrder,
  findOrderBySessionId,
  type Order
} from '../../lib/orders';
import { sendGa4PurchaseEvent } from '../../lib/server-analytics';

// Set max duration for Webhook to 60 seconds (requires Pro plan, will be 10s on Hobby)
export const maxDuration = 60;

async function trackServerPurchase(order: Order, gaClientId?: string) {
  try {
    const result = await sendGa4PurchaseEvent({
      transactionId: order.stripeSessionId,
      gaClientId,
      productKey: order.productKey,
      productName: order.productName,
      amountCents: order.amount,
      currency: order.currency,
      lang: order.lang,
    });

    if (!result.sent && result.reason) {
      console.warn(`GA4 purchase tracking skipped for order ${order.id}: ${result.reason}`);
    }
  } catch (error) {
    console.error(`GA4 purchase tracking failed for order ${order.id}:`, error);
  }
}

async function loadFulfillmentArtifacts(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<FulfillmentArtifacts> {
  let invoicePdfBuffer: Buffer | null = null;
  let invoiceFilename = 'Invoice.pdf';
  let downloadUrl = '';

  if (session.invoice) {
    try {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      if (invoice.invoice_pdf) {
        const response = await fetch(invoice.invoice_pdf);
        const arrayBuffer = await response.arrayBuffer();
        invoicePdfBuffer = Buffer.from(arrayBuffer);
        invoiceFilename = 'Stripe_Invoice.pdf';
        downloadUrl = invoice.hosted_invoice_url || '';
      }
    } catch (e) {
      console.error('Failed to retrieve Stripe invoice:', e);
    }
  }

  if (!invoicePdfBuffer && session.payment_intent) {
    try {
      const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);
      // @ts-ignore Stripe charge expansion shape depends on account/API settings.
      downloadUrl = pi.charges?.data[0]?.receipt_url || '';
    } catch (e) {
      console.error('Failed to retrieve payment intent:', e);
    }
  }

  return { invoicePdfBuffer, invoiceFilename, downloadUrl };
}

export const POST: APIRoute = async ({ request }) => {
  const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'Stripe configuration missing' }), { status: 500 });
  }

  const stripe = new Stripe(stripeKey);

  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const result = await handleCompletedCheckoutSession(session, {
        findOrderBySessionId,
        addOrder,
        loadFulfillmentArtifacts: (checkoutSession) => loadFulfillmentArtifacts(
          stripe,
          checkoutSession as Stripe.Checkout.Session
        ),
        fulfillOrder,
        trackServerPurchase,
      });

      return new Response(JSON.stringify(result), { status: 200 });
    }

    // Handle refunds from Stripe dashboard
    if (event.type === 'charge.refunded') {
      // Find order by payment intent and mark as refunded
      // This handles refunds made directly in Stripe dashboard
    }

  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Error processing webhook' }), { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
