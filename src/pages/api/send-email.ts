import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { generateLegalPDFs } from '../../lib/pdf-generator';

export const POST: APIRoute = async ({ request }) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return new Response(JSON.stringify({ error: 'SMTP configuration missing' }), { status: 500 });
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

  try {
    const data = await request.json();
    const { email, horoscopeContent, productName, customerName, lang } = data;

    if (!email || !horoscopeContent) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Translations
    const translations = {
      en: {
        subject: `Your ${productName} from Astralo ✨`,
        greeting: 'Hello',
        thank: 'Thank you for choosing Astralo! Your personal horoscope has been crafted just for you by our AI astrologer.',
        horoscopeTitle: 'Your Personal Horoscope',
        attached: 'Attached Documents',
        attachedDesc: 'We\'ve also attached our legal documents for your reference.',
        footer: 'May the stars guide you on your journey',
        copyright: 'All rights reserved',
        questions: 'Questions? Contact us at',
      },
      sk: {
        subject: `Váš ${productName} od Astralo ✨`,
        greeting: 'Dobrý deň',
        thank: 'Ďakujeme, že ste si vybrali Astralo! Váš osobný horoskop bol vytvorený špeciálne pre vás naším AI astrológom.',
        horoscopeTitle: 'Váš Osobný Horoskop',
        attached: 'Priložené Dokumenty',
        attachedDesc: 'Priložili sme tiež naše právne dokumenty pre vašu informáciu.',
        footer: 'Nech vás hviezdy vedú na vašej ceste',
        copyright: 'Všetky práva vyhradené',
        questions: 'Otázky? Kontaktujte nás na',
      },
      fr: {
        subject: `Votre ${productName} d'Astralo ✨`,
        greeting: 'Bonjour',
        thank: 'Merci d\'avoir choisi Astralo ! Votre horoscope personnel a été créé spécialement pour vous par notre astrologue IA.',
        horoscopeTitle: 'Votre Horoscope Personnel',
        attached: 'Documents Joints',
        attachedDesc: 'Nous avons également joint nos documents légaux pour votre référence.',
        footer: 'Que les étoiles vous guident sur votre chemin',
        copyright: 'Tous droits réservés',
        questions: 'Des questions ? Contactez-nous à',
      }
    };

    const t = translations[lang as keyof typeof translations] || translations.en;

    // Legal doc names for display
    const legalDocNames = lang === 'sk'
      ? ['📄 Obchodné podmienky', '🔒 Ochrana osobných údajov', '↩️ Podmienky vrátenia peňazí', '🍪 Zásady cookies']
      : ['📄 Terms of Service', '🔒 Privacy Policy', '↩️ Refund Policy', '🍪 Cookie Policy'];

    // Format horoscope content for HTML (preserve paragraphs and emojis, remove markdown)
    const formattedHoroscope = horoscopeContent
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .split('\n\n')
      .filter((p: string) => p.trim())
      .map((p: string) => {
        // Check if this is a special section (lucky number, best time, etc)
        const isSpecialSection = p.match(/^(🍀|📅|💎|⭐)/);
        if (isSpecialSection) {
          return `<p style="margin: 0 0 20px 0; padding: 16px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%); border-left: 4px solid #f59e0b; border-radius: 8px; line-height: 1.8; color: #1a1a2e; font-weight: 600; font-size: 17px;">${p.replace(/\n/g, '<br>')}</p>`;
        }
        return `<p style="margin: 0 0 16px 0; line-height: 1.8; color: #2d2d2d; font-size: 16px;">${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              
              <!-- Main Container -->
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header with Logo and Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); padding: 40px 30px; text-align: center;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 60px; margin-bottom: 16px;" />
                    <h1 style="margin: 0; color: #fbbf24; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;">
                      ${productName}
                    </h1>
                    <div style="margin-top: 12px; color: #e5e7eb; font-size: 16px;">
                      ✨ ${t.horoscopeTitle} ✨
                    </div>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding: 32px 30px 20px;">
                    <h2 style="margin: 0 0 16px 0; color: #1a1a2e; font-size: 22px; font-weight: 600;">
                      ${t.greeting}${customerName ? ' ' + customerName : ''} 🌟
                    </h2>
                    <p style="margin: 0; line-height: 1.6; color: #666; font-size: 16px;">
                      ${t.thank}
                    </p>
                  </td>
                </tr>

                <!-- Horoscope Content -->
                <tr>
                  <td style="padding: 0 30px 32px;">
                    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #fbbf24; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
                      <div style="font-size: 16px;">
                        ${formattedHoroscope}
                      </div>
                    </div>

                    <!-- Attached Documents Notice -->
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 24px;">
                      <h3 style="margin: 0 0 8px 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">
                        📄 ${t.attached}
                      </h3>
                      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
                        ${t.attachedDesc}
                      </p>
                      <ul style="margin: 12px 0 0 0; padding-left: 20px; color: #666; line-height: 2;">
                        ${legalDocNames.map(name => `<li>${name}</li>`).join('')}
                      </ul>
                    </div>
                  </td>
                </tr>

                <!-- Footer Message -->
                <tr>
                  <td style="padding: 0 30px 32px;">
                    <div style="text-align: center; padding: 24px; background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%); border-radius: 8px;">
                      <p style="margin: 0; color: #4c1d95; font-size: 16px; font-style: italic; font-weight: 500;">
                        ✨ ${t.footer} ✨
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Contact Info -->
                <tr>
                  <td style="padding: 0 30px 24px; text-align: center;">
                    <p style="margin: 0; color: #999; font-size: 13px;">
                      ${t.questions} <a href="mailto:info@astralo.online" style="color: #fbbf24; text-decoration: none;">info@astralo.online</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 32px; margin-bottom: 12px; opacity: 0.6;" />
                    <p style="margin: 0; color: #999; font-size: 12px;">
                      © ${new Date().getFullYear()} Astralo. ${t.copyright}.
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

    // Get legal PDFs
    const legalDocs = await generateLegalPDFs(lang);

    await transporter.sendMail({
      from: `"Astralo ✨" <${SMTP_USER}>`,
      to: email,
      subject: t.subject,
      html: html,
      attachments: legalDocs.map(doc => ({
        filename: doc.filename,
        content: Buffer.from(doc.content)
      }))
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error: any) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
