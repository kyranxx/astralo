import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { fulfillOrder } from '../../lib/fulfillment';
import {
  addOrder,
  findOrderBySessionId,
  generateOrderId,
  type Order
} from '../../lib/orders';
import { getProductName, isValidProductKey, productPrices } from '../../lib/products';

// Set max duration for Webhook to 60 seconds (requires Pro plan, will be 10s on Hobby)
export const maxDuration = 60;

export const POST: APIRoute = async ({ request }) => {
  const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'Stripe configuration missing' }), { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2026-11-20.acacia' as any,
  });

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
      const customerEmail = session.customer_details?.email || session.customer_email || '';
      const metadata = session.metadata || {};

      // Extract customer location from Stripe
      const customerAddress = session.customer_details?.address;
      const country = customerAddress?.country || '';
      const countryName = getCountryName(country);

      // Get product info
      const lang = metadata.lang || 'en';
      const productKey = isValidProductKey(metadata.productKey || '')
        ? metadata.productKey as keyof typeof productPrices
        : 'daily';
      const productName = getProductName(productKey, lang);
      const productPrice = productPrices[productKey];

      const existingOrder = await findOrderBySessionId(session.id);
      if (existingOrder) {
        return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200 });
      }

      // Create order in our database
      const orderId = generateOrderId();
      const order: Order = {
        id: orderId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string || undefined,
        createdAt: new Date().toISOString(),

        // Customer info
        customerEmail: customerEmail || metadata.customerEmail || '',
        customerName: metadata.name || session.customer_details?.name || 'Unknown',
        birthDate: metadata.birthDate || '',
        birthTime: metadata.birthTime,
        birthPlace: metadata.birthPlace,

        // Partner info
        partnerName: metadata.partnerName,
        partnerBirthDate: metadata.partnerBirthDate,
        partnerBirthTime: metadata.partnerBirthTime,
        partnerBirthPlace: metadata.partnerBirthPlace,

        // Product info
        productKey: productKey as Order['productKey'],
        productName,
        amount: session.amount_total || productPrice,
        currency: session.currency || 'eur',

        // Location
        country: countryName,
        countryCode: country,

        // Status
        status: 'completed',

        // Language
        lang
      };

      // Save order to database
      await addOrder(order);

      // Prepare invoice/receipt info
      let invoicePdfBuffer: Buffer | null = null;
      let invoiceFilename = 'Invoice.pdf';
      let downloadUrl = '';

      // Try to get Stripe Invoice if it exists
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

      // For one-time payments, get receipt URL
      if (!invoicePdfBuffer && session.payment_intent) {
        try {
          const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);
          // @ts-ignore
          downloadUrl = pi.charges?.data[0]?.receipt_url || '';
        } catch (e) {
          console.error('Failed to retrieve payment intent:', e);
        }
      }

      // TRIGGER FULL FULFILLMENT (Server-side)
      if (customerEmail) {
        // Run fulfillment in background or await it? 
        // We await it to ensure it works, but catch errors to not fail the webhook response 
        // (unless we want Stripe to retry).
        // Since we have DB deduping in fulfillment, it's safer to attempt.
        try {
          await fulfillOrder(order, invoicePdfBuffer, invoiceFilename, downloadUrl);
        } catch (fulfillmentError) {
          console.error(`CRITICAL: Fulfillment failed for order ${orderId}`, fulfillmentError);
          // We return 200 to Stripe so they don't retry partially successful order logic 
          // (e.g. adding order to DB twice).
          // Ideally we should have a queue, but this is serverless.
        }
      }
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

// Country code to name mapping using native Intl API
function getCountryName(code: string): string {
  if (!code) return 'Unknown';
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code.toUpperCase()) || code;
  } catch {
    return code;
  }
}
