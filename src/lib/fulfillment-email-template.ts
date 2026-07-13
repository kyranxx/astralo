import type { Order } from './orders';

export interface FulfillmentEmailOptions {
    serviceMessage?: string;
    subject?: string;
}

const copy = {
    en: {
        subject: (product: string) => `${product} is ready | Astralo`,
        eyebrow: 'PERSONALIZED ASTROLOGY READING',
        title: 'Your personal reading is ready',
        greeting: (name: string) => `Hello ${name},`,
        intro: 'Thank you for choosing Astralo. Your personalized reading has been prepared and the illustrated version is attached to this email.',
        messageTitle: 'A message from Astralo',
        readingTitle: 'Your reading',
        filesTitle: 'Your attached files',
        filesText: 'The illustrated version of your reading and the relevant customer documents are attached to this email.',
        receipt: 'View payment receipt',
        support: 'If you have any questions, simply reply to this email or contact',
        closing: 'With warm wishes,',
        team: 'The Astralo Team',
        disclaimer: 'For personal reflection and entertainment.',
    },
    ro: {
        subject: (_product: string) => 'Lectura ta personalizată este gata | Astralo',
        eyebrow: 'LECTURĂ ASTROLOGICĂ PERSONALIZATĂ',
        title: 'Lectura ta personalizată este gata',
        greeting: (name: string) => `Bună, ${name},`,
        intro: 'Îți mulțumim că ai ales Astralo. Lectura ta personalizată a fost pregătită, iar versiunea ilustrată este atașată acestui e-mail.',
        messageTitle: 'Un mesaj din partea Astralo',
        readingTitle: 'Lectura ta',
        filesTitle: 'Fișierele tale atașate',
        filesText: 'Versiunea ilustrată a lecturii și documentele relevante pentru clienți sunt atașate acestui e-mail.',
        receipt: 'Vezi dovada plății',
        support: 'Dacă ai întrebări, răspunde direct la acest e-mail sau scrie-ne la',
        closing: 'Cu cele mai bune gânduri,',
        team: 'Echipa Astralo',
        disclaimer: 'Pentru reflecție personală și divertisment.',
    },
} as const;

function escapeHtml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function formatParagraphs(content: string): string {
    return content
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*/g, '')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => `<p style="margin:0 0 18px;color:#322b45;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.75;">${escapeHtml(paragraph).replaceAll('\n', '<br>')}</p>`)
        .join('');
}

export function buildFulfillmentEmail(
    order: Pick<Order, 'customerName' | 'productName' | 'lang'>,
    content: string,
    receiptUrl = '',
    options: FulfillmentEmailOptions = {},
): { subject: string; html: string } {
    const t = order.lang === 'ro' ? copy.ro : copy.en;
    const customerName = escapeHtml(order.customerName || '');
    const productName = escapeHtml(order.productName || 'Astralo reading');
    const serviceMessage = options.serviceMessage?.trim();
    const safeReceiptUrl = /^https:\/\//i.test(receiptUrl) ? escapeHtml(receiptUrl) : '';

    const messageBlock = serviceMessage
        ? `<tr><td style="padding:0 32px 24px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff8e6;border:1px solid #ead39a;border-radius:14px;">
                <tr><td style="padding:20px 22px;">
                    <div style="color:#8a6713;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;">${t.messageTitle}</div>
                    <div style="color:#4b3b1d;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">${escapeHtml(serviceMessage).replaceAll('\n', '<br>')}</div>
                </td></tr>
            </table>
        </td></tr>`
        : '';

    const receiptBlock = safeReceiptUrl
        ? `<div style="margin-top:18px;"><a href="${safeReceiptUrl}" style="display:inline-block;background:#251541;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:12px 18px;border-radius:10px;">${t.receipt}</a></div>`
        : '';

    return {
        subject: options.subject?.trim() || t.subject(order.productName),
        html: `<!doctype html>
<html lang="${order.lang === 'ro' ? 'ro' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${productName}</title></head>
<body style="margin:0;padding:0;background:#f3f0f7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(t.title)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f3f0f7;">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(37,21,65,.10);">
    <tr><td style="background:#211338;border-bottom:4px solid #d8b45b;padding:30px 32px;text-align:center;">
        <img src="https://astralo.online/logo.png" width="126" alt="Astralo" style="display:block;width:126px;max-width:100%;height:auto;margin:0 auto 20px;">
        <div style="color:#d8b45b;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;margin-bottom:10px;">${t.eyebrow}</div>
        <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.25;font-weight:500;">${t.title}</h1>
    </td></tr>
    <tr><td style="padding:30px 32px 18px;">
        <p style="margin:0 0 12px;color:#251541;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;">${t.greeting(customerName)}</p>
        <p style="margin:0;color:#61586f;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;">${t.intro}</p>
    </td></tr>
    ${messageBlock}
    <tr><td style="padding:0 32px 12px;">
        <div style="color:#9b7521;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">${t.readingTitle}</div>
        <div style="height:1px;background:#e8e2ed;margin-bottom:24px;"></div>
        ${formatParagraphs(content)}
    </td></tr>
    <tr><td style="padding:6px 32px 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f4fa;border-radius:14px;">
            <tr><td style="padding:20px 22px;">
                <div style="color:#251541;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;margin-bottom:7px;">${t.filesTitle}</div>
                <div style="color:#6b6275;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;">${t.filesText}</div>
                ${receiptBlock}
            </td></tr>
        </table>
    </td></tr>
    <tr><td style="background:#211338;padding:25px 32px;text-align:center;">
        <p style="margin:0 0 10px;color:#d7cfdf;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;">${t.support} <a href="mailto:hello@astralo.online" style="color:#e3c674;text-decoration:none;">hello@astralo.online</a>.</p>
        <p style="margin:0 0 12px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;">${t.closing}<br>${t.team}</p>
        <p style="margin:0;color:#9f95aa;font-family:Arial,Helvetica,sans-serif;font-size:11px;">${t.disclaimer}</p>
    </td></tr>
</table>
</td></tr></table>
</body></html>`,
    };
}
