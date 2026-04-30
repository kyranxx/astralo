import nodemailer from 'nodemailer';
import { getTranslations, isValidLocale, type SupportedLocale } from './i18n';
import { getProductPriceInEuros } from './products';
import { getFreeHoroscopePath, getProductLandingPath, siteUrl } from './seo';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;

/**
 * Send the free-horoscope lead magnet email with clear paths into paid readings.
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

    const normalizedLang: SupportedLocale = isValidLocale(lang) ? lang : 'en';
    const siteTranslations = getTranslations(normalizedLang);
    const freePath = getFreeHoroscopePath(normalizedLang);
    const weeklyPath = getProductLandingPath(normalizedLang, 'weekly');
    const monthlyPath = getProductLandingPath(normalizedLang, 'monthly');
    const partnerPath = getProductLandingPath(normalizedLang, 'partner');
    const buildTrackedUrl = (path: string, campaign: string) =>
        `${siteUrl}${path}?utm_source=email&utm_medium=lead_magnet&utm_campaign=${campaign}`;

    const prices = {
        weekly: getProductPriceInEuros('weekly').toFixed(2),
        monthly: getProductPriceInEuros('monthly').toFixed(2),
        partner: getProductPriceInEuros('partner').toFixed(2),
    };

    const content = {
        en: {
            subject: 'Your Free 7-Day Horoscope Starter ✨',
            title: siteTranslations.emailCapture?.title || 'Your free 7-day horoscope starter',
            description: 'Here is your free 7-day horoscope starter. Use one insight per day, then continue with a deeper personalized reading when you want more accuracy.',
            introLabel: 'How to use it',
            introSteps: [
                'Open one day at a time and keep it simple.',
                'Notice which themes repeat across love, work, money, and energy.',
                'Use the paid readings below when you want deeper personal timing.'
            ],
            daysTitle: 'Your 7-day flow',
            days: [
                { title: 'Day 1', text: 'Reset your focus. Notice what feels heavy and what feels easy.' },
                { title: 'Day 2', text: 'Watch communication. Be direct, but leave space before reacting.' },
                { title: 'Day 3', text: 'Check money and priorities. Cut one thing that drains your energy.' },
                { title: 'Day 4', text: 'Pay attention to relationships. One honest message can change the tone.' },
                { title: 'Day 5', text: 'Use momentum. Finish one task you have been postponing.' },
                { title: 'Day 6', text: 'Slow down and reflect. Rest usually reveals the next correct move.' },
                { title: 'Day 7', text: 'Review the week. Keep what worked and release what did not.' },
            ],
            freePageTitle: 'Open the free horoscope page',
            freePageButton: siteTranslations.emailCapture?.button || 'Get My Free Horoscope',
            promoTitle: 'Want a more personal reading?',
            promoDesc: 'These paid reports use your birth data and go much deeper than a general horoscope.',
            productsTitle: 'Best next steps',
            weeklyLabel: siteTranslations.products.weekly.name,
            monthlyLabel: siteTranslations.products.monthly.name,
            partnerLabel: siteTranslations.products.partner.name,
            weeklyDescription: 'A faster paid reading for the next 7 days.',
            monthlyDescription: 'A deeper reading for timing, focus, and bigger decisions.',
            partnerDescription: 'A relationship reading for compatibility and dynamics.',
            footer: 'Sent by the Astralo team.',
        }
    };

    const t = content.en;
    const freePageUrl = buildTrackedUrl(freePath, 'free_7_day_horoscope_page');
    const weeklyUrl = buildTrackedUrl(weeklyPath, 'free_7_day_horoscope_weekly');
    const monthlyUrl = buildTrackedUrl(monthlyPath, 'free_7_day_horoscope_monthly');
    const partnerUrl = buildTrackedUrl(partnerPath, 'free_7_day_horoscope_partner');

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
            .subtle-box { border: 1px solid #e5e7eb; background-color: #f8fafc; padding: 22px; border-radius: 12px; margin: 24px 0; text-align: left; }
            .day-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 24px 0; text-align: left; }
            .day-card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; background: #ffffff; }
            .promo-box { border: 2px dashed #fbbf24; background-color: #fffbeb; padding: 25px; border-radius: 12px; margin: 25px 0; }
            .btn { display: inline-block; padding: 15px 35px; background-color: #fbbf24; color: #000; text-decoration: none; font-weight: bold; border-radius: 50px; margin-top: 20px; transition: transform 0.2s; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #999; }
            .price { color: #fbbf24; font-weight: bold; font-size: 18px; }
            .bullet-list { text-align: left; max-width: 420px; margin: 24px auto; padding-left: 20px; }
            .bullet-list li { margin-bottom: 10px; }
            .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px; }
            .product-card { border: 1px solid #eee; padding: 16px; border-radius: 10px; text-align: left; }
            .product-link { color: #111827; font-weight: bold; text-decoration: none; }
            .small { font-size: 13px; color: #6b7280; }
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

                <div class="subtle-box">
                    <h2 style="margin-top: 0; color: #1a0f2e;">${t.introLabel}</h2>
                    <ul class="bullet-list" style="margin-bottom: 0;">
                        ${t.introSteps.map((item) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <h2 style="margin-top: 32px; color: #1a0f2e;">${t.daysTitle}</h2>
                <div class="day-grid">
                    ${t.days.map((day) => `
                        <div class="day-card">
                            <strong style="display:block; margin-bottom: 6px; color: #1a0f2e;">${day.title}</strong>
                            <span>${day.text}</span>
                        </div>
                    `).join('')}
                </div>

                <a href="${freePageUrl}" class="btn">${t.freePageButton}</a>

                <h3 style="margin-top: 32px; color: #1a0f2e;">${t.freePageTitle}</h3>
                <ul class="bullet-list">
                    <li>Bookmark your free horoscope landing page for future campaigns and offers.</li>
                    <li>Use the paid readings below if you want a more personal result based on your birth data.</li>
                </ul>
                
                <div class="promo-box">
                    <h2 style="margin-top:0; color: #1a0f2e;">${t.promoTitle}</h2>
                    <p>${t.promoDesc}</p>
                </div>

                <h3 style="margin-top: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px;">${t.productsTitle}</h3>
                <div class="product-grid">
                    <div class="product-card">
                        <strong>${t.weeklyLabel}</strong><br>
                        <span class="small">${t.weeklyDescription}</span><br><br>
                        <span class="price">€${prices.weekly}</span><br>
                        <a href="${weeklyUrl}" class="product-link">Open</a>
                    </div>
                    <div class="product-card">
                        <strong>${t.monthlyLabel}</strong><br>
                        <span class="small">${t.monthlyDescription}</span><br><br>
                        <span class="price">€${prices.monthly}</span><br>
                        <a href="${monthlyUrl}" class="product-link">Open</a>
                    </div>
                    <div class="product-card">
                        <strong>${t.partnerLabel}</strong><br>
                        <span class="small">${t.partnerDescription}</span><br><br>
                        <span class="price">€${prices.partner}</span><br>
                        <a href="${partnerUrl}" class="product-link">Open</a>
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
        html,
    });
}
