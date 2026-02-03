
import nodemailer from 'nodemailer';
import { getProductPriceInEuros } from './products';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;

/**
 * Send a welcome email to new subscribers with "Ads" for horoscopes
 */
export async function sendWelcomeEmail(email: string, lang: string = 'en') {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.error('SMTP configuration missing for welcome email');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Prices for the "Ads" in the email
    const prices = {
        daily: getProductPriceInEuros('daily').toFixed(2),
        weekly: getProductPriceInEuros('weekly').toFixed(2),
        monthly: getProductPriceInEuros('monthly').toFixed(2)
    };

    const content = {
        en: {
            subject: "Welcome to your celestial journey! ✨",
            title: "You're now part of Astralo",
            description: "We're thrilled to have you! You'll now receive our premium astrological insights and weekly horoscopes for free.",
            promoTitle: "Discover your true potential",
            promoDesc: "Get 50% OFF your first personalized reading. Our reports are 100% unique to your birth data.",
            ctaButton: "Get My Horoscope",
            products: "Our Popular Readings",
            daily: "Daily Guide",
            monthly: "Monthly Deep-Dive",
            unlocked: "PROMO CODE UNLOCKED: COSMIC50",
            footer: "Sent with ❤️ from the Astralo team."
        }
    };

    const t = content[lang as keyof typeof content] || content.en;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #1a0f2e 0%, #0f1729 100%); padding: 40px 20px; text-align: center; color: white; }
            .logo { max-width: 150px; margin-bottom: 20px; }
            .content { padding: 30px 20px; text-align: center; }
            .promo-box { border: 2px dashed #fbbf24; background-color: #fffbeb; padding: 25px; border-radius: 12px; margin: 25px 0; }
            .btn { display: inline-block; padding: 15px 35px; background-color: #fbbf24; color: #000; text-decoration: none; font-weight: bold; border-radius: 50px; margin-top: 20px; transition: transform 0.2s; }
            .products { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px; }
            .product-card { border: 1px solid #eee; padding: 15px; border-radius: 8px; text-align: center; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #999; }
            .price { color: #fbbf24; font-weight: bold; font-size: 18px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://astralo.online/logo.webp" alt="Astralo" class="logo">
                <h1 style="margin:0;">${t.title}</h1>
            </div>
            <div class="content">
                <p style="font-size: 18px;">${t.description}</p>
                
                <div class="promo-box">
                    <h2 style="margin-top:0; color: #1a0f2e;">${t.promoTitle}</h2>
                    <p>${t.promoDesc}</p>
                    <div style="font-size: 24px; font-weight: bold; color: #fbbf24; margin: 15px 0;">${t.unlocked}</div>
                    <a href="https://astralo.online" class="btn">${t.ctaButton}</a>
                </div>

                <h3 style="margin-top: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px;">${t.products}</h3>
                <div style="display: table; width: 100%; border-spacing: 10px;">
                    <div style="display: table-cell; border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                        <strong>${t.daily}</strong><br>
                        <span class="price">€${prices.daily}</span>
                    </div>
                    <div style="display: table-cell; border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                        <strong>${t.monthly}</strong><br>
                        <span class="price">€${prices.monthly}</span>
                    </div>
                </div>
            </div>
            <div class="footer">
                ${t.footer}
            </div>
        </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: `"Astralo ✨" <${SMTP_USER}>`,
        to: email,
        subject: t.subject,
        html
    });
}
