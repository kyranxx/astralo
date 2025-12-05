import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

async function getFont() {
    try {
        // Use a more reliable CDN for fonts
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff');
        if (!response.ok) throw new Error('Font fetch failed');
        return await response.arrayBuffer();
    } catch (e) {
        console.error('Failed to fetch font, using standard font', e);
        return null;
    }
}

async function getBoldFont() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-700-normal.woff');
        if (!response.ok) throw new Error('Font fetch failed');
        return await response.arrayBuffer();
    } catch (e) {
        return null;
    }
}

export async function generateLegalPDFs(language: string = 'en'): Promise<{ filename: string; content: Uint8Array }[]> {
    const fontBytes = await getFont();
    const boldFontBytes = await getBoldFont();

    const createLegalDoc = async (title: string, content: string) => {
        const doc = await PDFDocument.create();
        doc.registerFontkit(fontkit);

        let f, bf;
        if (fontBytes && boldFontBytes) {
            f = await doc.embedFont(fontBytes);
            bf = await doc.embedFont(boldFontBytes);
        } else {
            f = await doc.embedFont(StandardFonts.Helvetica);
            bf = await doc.embedFont(StandardFonts.HelveticaBold);
        }
        return drawTextToDoc(doc, title, content, f, bf);
    };

    const drawTextToDoc = async (doc: PDFDocument, title: string, content: string, font: any, boldFont: any) => {
        let currentPage = doc.addPage([595, 842]); // A4
        const { width, height } = currentPage.getSize();
        const margin = 50;
        const fontSize = 11;
        const lineHeight = 16;
        const maxWidth = width - (margin * 2);
        let y = height - margin;

        // Title
        currentPage.drawText(title, { x: margin, y, size: 18, font: boldFont, color: rgb(0, 0, 0) });
        y -= 40;

        const paragraphs = content.split('\n');

        for (const paragraph of paragraphs) {
            if (paragraph.trim() === '') {
                y -= lineHeight;
                continue;
            }

            const words = paragraph.split(' ');
            let line = '';

            for (const word of words) {
                const testLine = line + (line ? ' ' : '') + word;
                const textWidth = font.widthOfTextAtSize(testLine, fontSize);

                if (textWidth > maxWidth) {
                    // Draw current line
                    currentPage.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
                    y -= lineHeight;
                    line = word;

                    // Create new page if needed
                    if (y < margin + lineHeight) {
                        currentPage = doc.addPage([595, 842]);
                        y = height - margin;
                    }
                } else {
                    line = testLine;
                }
            }

            // Draw remaining line
            if (line.trim()) {
                currentPage.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
                y -= lineHeight * 1.5; // Extra space after paragraph
            }

            // Create new page if needed
            if (y < margin + lineHeight * 2) {
                currentPage = doc.addPage([595, 842]);
                y = height - margin;
            }
        }

        return await doc.save();
    };

    // Content for legal docs
    const isSlovak = language === 'sk';

    // SLOVAK LEGAL DOCUMENTS
    const termsContentSk = `
1. Akceptácia podmienok
Prístupom a používaním služieb Astralo (astralo.online) akceptujete a súhlasíte s podmienkami tejto zmluvy.

2. Popis služby
Astralo poskytuje personalizované horoskopy generované umelou inteligenciou vrátane denných, týždenných, mesačných a partnerských analýz kompatibility.
Všetky horoskopy sú generované pomocou pokročilých algoritmov umelej inteligencie založených na astrologických princípoch a údajoch o narodení, ktoré poskytnete.

3. Povinnosti používateľa
- Musíte poskytnúť presné informácie o narodení pre generovanie horoskopu
- Ste zodpovedný za zachovanie dôvernosti vášho účtu
- Súhlasíte s tým, že nebudete zneužívať naše služby ani porušovať príslušné zákony

4. Platobné podmienky
Všetky platby sú spracované bezpečne prostredníctvom Stripe. Ceny sú uvedené v eurách (€) a zahŕňajú príslušné dane.
Platba je vyžadovaná pred doručením horoskopu. Všetky predaje sú konečné, pokiaľ nie je v našich podmienkach vrátenia peňazí uvedené inak.

5. Účel zábavy
Naše služby horoskopu sú poskytované len na zábavné účely. Aj keď sa snažíme o presnosť, horoskopy by sa nemali používať ako jediný základ pre dôležité životné rozhodnutia.

6. Duševné vlastníctvo
Všetok obsah, vrátane horoskopov, dizajnov a softvéru, je vlastníctvom Apollo Tech s.r.o. a je chránený autorskými právami.

7. Obmedzenie zodpovednosti
Astralo a Apollo Tech s.r.o. nenesú zodpovednosť za žiadne nepriame, náhodné, špeciálne alebo následné škody vyplývajúce z používania našich služieb.

8. Kontaktné informácie
Apollo Tech s.r.o.
Slovensko
Email: info@astralo.online
`;

    const privacyContentSk = `
Zásady ochrany osobných údajov

1. Informácie, ktoré zhromažďujeme
Zhromažďujeme informácie, ktoré nám poskytnete priamo, vrátane dátumu, času a miesta narodenia pre generovanie horoskopu a emailovej adresy pre doručenie.

2. Ako používame vaše informácie
Používame vaše informácie na:
- Generovanie personalizovaných horoskopov
- Spracovanie platieb
- Zasielanie zakúpených produktov
- Komunikáciu s vami o našich službách

3. Bezpečnosť údajov
Implementujeme vhodné technické a organizačné opatrenia na ochranu vašich osobných údajov pred neoprávneným prístupom, zmenou, zverejnením alebo zničením.

4. Služby tretích strán
Pre spracovanie platieb používame Stripe. Vaše platobné informácie spracováva bezpečne Stripe a nie sú uložené na našich serveroch.

5. Vaše práva
Máte právo na prístup, opravu alebo vymazanie svojich osobných údajov. Kontaktujte nás na info@astralo.online pre akékoľvek požiadavky týkajúce sa ochrany osobných údajov.
`;

    const refundContentSk = `
Podmienky vrátenia peňazí

1. Digitálne produkty
Vzhľadom na povahu našich personalizovaných digitálnych produktov (horoskopu) všeobecne neponúkame vrátenie peňazí po vygenerovaní a doručení horoskopu.

2. Výnimky
Môžeme ponúknuť vrátenie peňazí, ak:
- Nastala technická chyba zabraňujúca doručeniu vášho horoskopu
- Horoskop bol vygenerovaný na základe nesprávnych údajov kvôli systémovej chybe

3. Ako požiadať o vrátenie peňazí
Kontaktujte nás na info@astralo.online s podrobnosťami objednávky a dôvodom žiadosti o vrátenie peňazí. Vašu požiadavku preskúmame do 48 hodín.
`;

    const cookiesContentSk = `
Zásady používania cookies

1. Čo sú cookies?
Cookies sú malé textové súbory, ktoré sa ukladajú do vášho zariadenia pri návšteve našej webovej stránky.

2. Ako používame cookies
Používame cookies na:
- Zapamätanie vašich preferencií (ako napr. jazyk)
- Analýzu návštevnosti webovej stránky
- Zabezpečenie našich služieb

3. Správa cookies
Môžete kontrolovať a spravovať cookies v nastaveniach vášho prehliadača. Upozorňujeme, že deaktivácia cookies môže ovplyvniť funkcionalitu našej webovej stránky.
`;

    // ENGLISH LEGAL DOCUMENTS
    const termsContentEn = `
1. Acceptance of Terms
By accessing and using Astralo services (astralo.online), you accept and agree to be bound by the terms and provision of this agreement.

2. Service Description
Astralo provides AI-generated personalized horoscope services including daily, weekly, monthly, and partner compatibility readings.
All horoscope readings are generated using advanced artificial intelligence algorithms based on astrological principles and the birth data you provide.

3. User Responsibilities
- You must provide accurate birth information for horoscope generation
- You are responsible for maintaining the confidentiality of your account
- You agree not to misuse our services or violate any applicable laws

4. Payment Terms
All payments are processed securely through Stripe. Prices are listed in Euros (€) and include applicable taxes.
Payment is required before horoscope delivery. All sales are final unless otherwise stated in our Refund Policy.

5. Entertainment Purpose
Our horoscope services are provided for entertainment purposes only. While we strive for accuracy, horoscopes should not be used as the sole basis for important life decisions.

6. Intellectual Property
All content, including horoscope readings, designs, and software, is owned by Apollo Tech s.r.o. and protected by copyright laws.

7. Limitation of Liability
Astralo and Apollo Tech s.r.o. shall not be liable for any indirect, incidental, special, or consequential damages arising from use of our services.

8. Contact Information
Apollo Tech s.r.o.
Slovakia
Email: info@astralo.online
`;

    const privacyContentEn = `
Privacy Policy

1. Information We Collect
We collect information you provide directly to us, including birth date, time, and place for horoscope generation, and email address for delivery.

2. How We Use Your Information
We use your information to:
- Generate personalized horoscopes
- Process payments
- Send you your purchased products
- Communicate with you about our services

3. Data Security
We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.

4. Third-Party Services
We use Stripe for payment processing. Your payment information is processed securely by Stripe and is not stored on our servers.

5. Your Rights
You have the right to access, correct, or delete your personal data. Contact us at info@astralo.online for any privacy-related requests.
`;

    const refundContentEn = `
Refund Policy

1. Digital Products
Due to the nature of our personalized digital products (horoscopes), we generally do not offer refunds once the horoscope has been generated and delivered.

2. Exceptions
We may offer a refund if:
- There was a technical error preventing the delivery of your horoscope
- The horoscope generated was clearly based on incorrect data due to a system error

3. How to Request a Refund
Please contact us at info@astralo.online with your order details and the reason for your refund request. We will review your request within 48 hours.
`;

    const cookiesContentEn = `
Cookie Policy

1. What are Cookies?
Cookies are small text files that are stored on your device when you visit our website.

2. How We Use Cookies
We use cookies to:
- Remember your preferences (like language)
- Analyze website traffic and usage
- Ensure the security of our services

3. Managing Cookies
You can control and manage cookies in your browser settings. Please note that disabling cookies may affect the functionality of our website.
`;

    // Return appropriate language version
    if (isSlovak) {
        return [
            { filename: 'Obchodne_podmienky.pdf', content: await createLegalDoc('Obchodné podmienky', termsContentSk) },
            { filename: 'Ochrana_osobnych_udajov.pdf', content: await createLegalDoc('Ochrana osobných údajov', privacyContentSk) },
            { filename: 'Podmienky_vratenia_penazi.pdf', content: await createLegalDoc('Podmienky vrátenia peňazí', refundContentSk) },
            { filename: 'Zasady_cookies.pdf', content: await createLegalDoc('Zásady cookies', cookiesContentSk) },
        ];
    } else {
        return [
            { filename: 'Terms_of_Service.pdf', content: await createLegalDoc('Terms of Service', termsContentEn) },
            { filename: 'Privacy_Policy.pdf', content: await createLegalDoc('Privacy Policy', privacyContentEn) },
            { filename: 'Refund_Policy.pdf', content: await createLegalDoc('Refund Policy', refundContentEn) },
            { filename: 'Cookie_Policy.pdf', content: await createLegalDoc('Cookie Policy', cookiesContentEn) },
        ];
    }
}
