import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { generateLegalPDFs } from '../../lib/pdf-generator';
import {
  addOrder,
  updateOrder,
  findOrderBySessionId,
  generateOrderId,
  saveHoroscopePDF,
  type Order
} from '../../lib/orders';

const products: Record<string, { name: string; price: number }> = {
  daily: { name: 'Daily Horoscope', price: 199 },
  weekly: { name: 'Weekly Horoscope', price: 399 },
  monthly: { name: 'Monthly Horoscope', price: 999 },
  partner: { name: 'Partner Horoscope', price: 1499 },
};

export const POST: APIRoute = async ({ request }) => {
  const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'Stripe configuration missing' }), { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-11-20.acacia' as any,
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
      const customerEmail = session.customer_details?.email || '';
      const metadata = session.metadata || {};

      // Extract customer location from Stripe
      const customerAddress = session.customer_details?.address;
      const country = customerAddress?.country || '';
      const countryName = getCountryName(country);

      // Get product info
      const productKey = metadata.productKey as keyof typeof products || 'daily';
      const product = products[productKey] || products.daily;

      // Create order in our database
      const orderId = generateOrderId();
      const order: Order = {
        id: orderId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string || undefined,
        createdAt: new Date().toISOString(),

        // Customer info
        customerEmail,
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
        productName: product.name,
        amount: session.amount_total || product.price,
        currency: session.currency || 'eur',

        // Location
        country: countryName,
        countryCode: country,

        // Status
        status: 'completed',

        // Language
        lang: metadata.lang || 'en'
      };

      // Save order to database
      addOrder(order);
      console.log(`✅ Order ${orderId} saved to database`);

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

      // Send confirmation email
      if (customerEmail) {
        await sendConfirmationEmail(
          customerEmail,
          order,
          invoicePdfBuffer,
          invoiceFilename,
          downloadUrl
        );
      }
    }

    // Handle refunds from Stripe dashboard
    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      // Find order by payment intent and mark as refunded
      // This handles refunds made directly in Stripe dashboard
      console.log('Charge refunded:', charge.id);
    }

  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Error processing webhook' }), { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};

// Country code to name mapping
function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    'SK': 'Slovakia',
    'CZ': 'Czech Republic',
    'DE': 'Germany',
    'AT': 'Austria',
    'PL': 'Poland',
    'HU': 'Hungary',
    'US': 'United States',
    'GB': 'United Kingdom',
    'FR': 'France',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'IE': 'Ireland',
    'PT': 'Portugal',
    'RO': 'Romania',
    'BG': 'Bulgaria',
    'HR': 'Croatia',
    'SI': 'Slovenia',
    'RS': 'Serbia',
    'UA': 'Ukraine',
    'RU': 'Russia',
    'CA': 'Canada',
    'AU': 'Australia',
    'NZ': 'New Zealand',
    'JP': 'Japan',
    'KR': 'South Korea',
    'CN': 'China',
    'IN': 'India',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'AR': 'Argentina',
  };
  return countries[code] || code || 'Unknown';
}

async function sendConfirmationEmail(
  to: string,
  order: Order,
  invoicePdf: Buffer | null,
  invoiceFilename: string,
  link: string | null
) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('SMTP configuration missing');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const legalDocs = await generateLegalPDFs(order.lang);

  const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - Astralo</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); padding: 40px 30px; text-align: center;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 60px; margin-bottom: 16px;" />
                    <h1 style="margin: 0; color: #fbbf24; font-size: 28px; font-weight: bold;">
                      Payment Confirmed
                    </h1>
                    <div style="margin-top: 12px; color: #e5e7eb; font-size: 16px;">
                      ✨ Thank you for your purchase ✨
                    </div>
                  </td>
                </tr>

                <!-- Order Details -->
                <tr>
                  <td style="padding: 32px 30px;">
                    <h2 style="margin: 0 0 16px 0; color: #1a1a2e; font-size: 22px; font-weight: 600;">
                      Order #${order.id}
                    </h2>
                    
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #666;">Product:</td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600; text-align: right;">${order.productName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666;">Amount:</td>
                          <td style="padding: 8px 0; color: #fbbf24; font-weight: 600; text-align: right;">€${(order.amount / 100).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666;">Date:</td>
                          <td style="padding: 8px 0; color: #1a1a2e; text-align: right;">${new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                      <h3 style="margin: 0 0 12px 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">
                        📎 Attached Documents
                      </h3>
                      <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 2;">
                        ${invoicePdf ? '<li>💳 Your Invoice</li>' : ''}
                        <li>📄 Terms of Service</li>
                        <li>🔒 Privacy Policy</li>
                        <li>↩️ Refund Policy</li>
                        <li>🍪 Cookie Policy</li>
                      </ul>
                    </div>

                    ${link ? `
                    <div style="margin-top: 20px; text-align: center;">
                      <a href="${link}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #1a1a2e; text-decoration: none; border-radius: 8px; font-weight: 600;">
                        View ${invoicePdf ? 'Invoice' : 'Receipt'} Online
                      </a>
                    </div>
                    ` : ''}
                  </td>
                </tr>

                <!-- Footer Message -->
                <tr>
                  <td style="padding: 0 30px 32px;">
                    <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%); border-radius: 8px;">
                      <p style="margin: 0; color: #4c1d95; font-size: 14px;">
                        Questions? Contact us at <a href="mailto:info@astralo.online" style="color: #4c1d95; font-weight: 600;">info@astralo.online</a>
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 32px; margin-bottom: 12px; opacity: 0.6;" />
                    <p style="margin: 0; color: #999; font-size: 12px;">
                      © ${new Date().getFullYear()} Astralo. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

  const attachments = invoicePdf ? [
    {
      filename: invoiceFilename,
      content: invoicePdf,
    },
    ...legalDocs.map(doc => ({
      filename: doc.filename,
      content: Buffer.from(doc.content)
    }))
  ] : legalDocs.map(doc => ({
    filename: doc.filename,
    content: Buffer.from(doc.content)
  }));

  await transporter.sendMail({
    from: `"Astralo ✨" <${SMTP_USER}>`,
    to: to,
    subject: `Order Confirmed #${order.id} - Astralo ✨`,
    html: html,
    attachments: attachments,
  });

  console.log(`✅ Confirmation email sent to ${to} for order ${order.id}`);
}
