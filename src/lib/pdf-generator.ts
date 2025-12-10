import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { readFile } from 'fs/promises';
import { join } from 'path';

// ============================================================================
// MULTI-LANGUAGE FONT SUPPORT - LOCAL FONTS (BLAZING FAST!)
// All fonts are stored locally in src/fonts/ for instant loading
// ============================================================================

// Script detection: which script does each language use?
type ScriptType = 'latin' | 'cyrillic' | 'greek' | 'arabic' | 'hebrew' | 'devanagari' | 'bengali' | 'thai' | 'japanese' | 'korean' | 'chinese';

const languageToScript: Record<string, ScriptType> = {
    // Latin script languages (including extended Latin characters)
    en: 'latin', sk: 'latin', cs: 'latin', de: 'latin', fr: 'latin', es: 'latin',
    it: 'latin', pt: 'latin', nl: 'latin', pl: 'latin', hu: 'latin', ro: 'latin',
    hr: 'latin', sl: 'latin', sv: 'latin', da: 'latin', fi: 'latin', no: 'latin',
    vi: 'latin', id: 'latin', tr: 'latin', sr: 'latin', // Serbian Latin

    // Cyrillic script
    ru: 'cyrillic', uk: 'cyrillic', bg: 'cyrillic',

    // Greek script
    el: 'greek',

    // Arabic script (RTL)
    ar: 'arabic',

    // Hebrew script (RTL)
    he: 'hebrew',

    // Devanagari script (Hindi)
    hi: 'devanagari',

    // Bengali script
    bn: 'bengali',

    // Thai script
    th: 'thai',

    // East Asian scripts - now with local CJK fonts!
    ja: 'japanese',
    ko: 'korean',
    zh: 'chinese',
};

// Local font file names for each script
interface FontFiles {
    regular: string;
    bold: string;
}

const scriptFontFiles: Record<ScriptType, FontFiles> = {
    latin: { regular: 'NotoSans-Regular.ttf', bold: 'NotoSans-Bold.ttf' },
    cyrillic: { regular: 'NotoSans-Regular.ttf', bold: 'NotoSans-Bold.ttf' },
    greek: { regular: 'NotoSans-Regular.ttf', bold: 'NotoSans-Bold.ttf' },
    arabic: { regular: 'NotoSansArabic-Regular.ttf', bold: 'NotoSansArabic-Bold.ttf' },
    hebrew: { regular: 'NotoSansHebrew-Regular.ttf', bold: 'NotoSansHebrew-Bold.ttf' },
    devanagari: { regular: 'NotoSansDevanagari-Regular.ttf', bold: 'NotoSansDevanagari-Bold.ttf' },
    bengali: { regular: 'NotoSansBengali-Regular.ttf', bold: 'NotoSansBengali-Bold.ttf' },
    thai: { regular: 'NotoSansThai-Regular.ttf', bold: 'NotoSansThai-Bold.ttf' },
    japanese: { regular: 'NotoSansCJKjp-Regular.otf', bold: 'NotoSansCJKjp-Bold.otf' },
    korean: { regular: 'NotoSansCJKkr-Regular.otf', bold: 'NotoSansCJKkr-Bold.otf' },
    chinese: { regular: 'NotoSansCJKsc-Regular.otf', bold: 'NotoSansCJKsc-Bold.otf' },
};

// Font cache: store loaded fonts to avoid repeated disk reads
const fontCache: Record<string, ArrayBuffer> = {};

// Get the fonts directory path
function getFontsDir(): string {
    // In development, fonts are in src/fonts
    // In production (Vercel), they'll be in the same relative location
    return join(process.cwd(), 'src', 'fonts');
}

// Load a font from local file with caching
async function loadFont(filename: string): Promise<ArrayBuffer | null> {
    if (fontCache[filename]) {
        return fontCache[filename];
    }

    try {
        const fontPath = join(getFontsDir(), filename);
        const buffer = await readFile(fontPath);
        const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        fontCache[filename] = arrayBuffer;
        console.log(`✅ Loaded font: ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
        return arrayBuffer;
    } catch (e) {
        console.warn(`❌ Failed to load font ${filename}:`, e);
        return null;
    }
}

// Get fonts for a specific language - BLAZING FAST from local files!
async function getFontsForLanguage(lang: string): Promise<{ regular: ArrayBuffer | null; bold: ArrayBuffer | null }> {
    const script = languageToScript[lang] || 'latin';
    const files = scriptFontFiles[script];

    console.log(`Loading ${script} fonts for language: ${lang}`);

    const [regular, bold] = await Promise.all([
        loadFont(files.regular),
        loadFont(files.bold),
    ]);

    return { regular, bold };
}

// Track current font type for the PDF being generated
let currentScriptType: ScriptType = 'latin';

// Sanitize text for PDF - now just removes emojis since we have proper multi-language font support
function sanitizeForPDF(text: string): string {
    // Remove emojis and special Unicode symbols that aren't supported by any font
    return text
        .replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}]/gu, '')
        .replace(/[\u2600-\u27BF]/g, ''); // Misc symbols including ☆, ✦, ✧
}

export async function generateLegalPDFs(language: string = 'en'): Promise<{ filename: string; content: Uint8Array }[]> {
    // Get fonts for the specific language
    const fonts = await getFontsForLanguage(language);
    const fontBytes = fonts.regular;
    const boldFontBytes = fonts.bold;

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
        const fontSize = 10;
        const lineHeight = 15;
        const maxWidth = width - (margin * 2);

        // Colors matching website
        const gold = rgb(0.984, 0.749, 0.141); // #fbbf24
        const darkBlue = rgb(0.102, 0.102, 0.180); // #1a1a2e
        const gray = rgb(0.4, 0.4, 0.4);
        const black = rgb(0, 0, 0);

        // Draw header on first page
        const drawHeader = (page: any) => {
            // Header background
            page.drawRectangle({
                x: 0,
                y: height - 80,
                width: width,
                height: 80,
                color: darkBlue,
            });

            // Gold accent line
            page.drawRectangle({
                x: 0,
                y: height - 84,
                width: width,
                height: 4,
                color: gold,
            });

            // Astralo text
            const astraloText = 'ASTRALO';
            const astraloWidth = boldFont.widthOfTextAtSize(astraloText, 22);
            page.drawText(astraloText, {
                x: (width - astraloWidth) / 2,
                y: height - 50,
                size: 22,
                font: boldFont,
                color: gold,
            });

            // Document type
            const typeWidth = font.widthOfTextAtSize('Legal Document', 10);
            page.drawText('Legal Document', {
                x: (width - typeWidth) / 2,
                y: height - 68,
                size: 10,
                font: font,
                color: rgb(0.8, 0.8, 0.8),
            });
        };

        // Draw footer on each page
        const drawFooter = (page: any) => {
            // Footer line
            page.drawLine({
                start: { x: margin, y: 40 },
                end: { x: width - margin, y: 40 },
                thickness: 1,
                color: gold,
            });

            // Footer text
            const footerText = `© ${new Date().getFullYear()} Astralo | astralo.online | Apollo Tech s.r.o.`;
            const footerWidth = font.widthOfTextAtSize(footerText, 8);
            page.drawText(footerText, {
                x: (width - footerWidth) / 2,
                y: 25,
                size: 8,
                font: font,
                color: gray,
            });
        };

        // Draw header on first page
        drawHeader(currentPage);

        let y = height - 110; // Start below header

        // Document title
        const titleWidth = boldFont.widthOfTextAtSize(title, 18);
        currentPage.drawText(title, {
            x: (width - titleWidth) / 2,
            y,
            size: 18,
            font: boldFont,
            color: darkBlue,
        });
        y -= 15;

        // Date line
        const dateText = `Last updated: December 5, 2024`;
        const dateWidth = font.widthOfTextAtSize(dateText, 9);
        currentPage.drawText(dateText, {
            x: (width - dateWidth) / 2,
            y,
            size: 9,
            font: font,
            color: gray,
        });
        y -= 35;

        const paragraphs = content.split('\n');

        for (const paragraph of paragraphs) {
            if (paragraph.trim() === '') {
                y -= lineHeight / 2;
                continue;
            }

            const words = paragraph.split(' ');
            let line = '';

            // Check if this is a section header (starts with number and period)
            const isSectionHeader = /^\d+\./.test(paragraph.trim());

            for (const word of words) {
                const testLine = line + (line ? ' ' : '') + word;
                const textWidth = (isSectionHeader ? boldFont : font).widthOfTextAtSize(testLine, isSectionHeader ? 12 : fontSize);

                if (textWidth > maxWidth) {
                    // Draw current line
                    currentPage.drawText(line, {
                        x: margin,
                        y,
                        size: isSectionHeader ? 12 : fontSize,
                        font: isSectionHeader ? boldFont : font,
                        color: isSectionHeader ? darkBlue : black,
                    });
                    y -= lineHeight;
                    line = word;

                    // Create new page if needed
                    if (y < 60) {
                        drawFooter(currentPage);
                        currentPage = doc.addPage([595, 842]);
                        y = height - margin;
                    }
                } else {
                    line = testLine;
                }
            }

            // Draw remaining line
            if (line.trim()) {
                currentPage.drawText(line, {
                    x: margin,
                    y,
                    size: isSectionHeader ? 12 : fontSize,
                    font: isSectionHeader ? boldFont : font,
                    color: isSectionHeader ? darkBlue : black,
                });
                y -= isSectionHeader ? lineHeight * 1.8 : lineHeight * 1.3;
            }

            // Create new page if needed
            if (y < 60) {
                drawFooter(currentPage);
                currentPage = doc.addPage([595, 842]);
                y = height - margin;
            }
        }

        // Draw footer on last page
        drawFooter(currentPage);

        return await doc.save();
    };

    // Content for legal docs
    const isSlovak = language === 'sk';

    // SLOVAK LEGAL DOCUMENTS
    const termsContentSk = `
1. Akceptácia podmienok
Prístupom a používaním služieb Astralo (astralo.online) akceptujete a súhlasíte s podmienkami tejto zmluvy.

2. Popis služby
Astralo poskytuje personalizované horoskopy vrátane denných, týždenných, mesačných a partnerských analýz kompatibility.
Všetky horoskopy sú generované pomocou pokročilých algoritmov založených na astrologických princípoch a údajoch o narodení, ktoré poskytnete.

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
Astralo provides personalized horoscope services including daily, weekly, monthly, and partner compatibility readings.
All horoscope readings are generated using advanced algorithms based on astrological principles and the birth data you provide.

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

// Horoscope PDF Generator with beautiful design
interface HoroscopeData {
    customerName: string;
    productName: string;
    productKey: string;
    horoscopeContent: string;
    birthDate: string;
    birthPlace: string;
    birthTime: string;
    lang: string;
}

export async function generateHoroscopePDF(data: HoroscopeData): Promise<{ filename: string; content: Uint8Array }> {
    const { customerName, productName, horoscopeContent, birthDate, birthPlace, birthTime, lang } = data;

    const doc = await PDFDocument.create();
    doc.registerFontkit(fontkit);

    // Get fonts for the specific language (Bengali, Thai, Arabic, etc.)
    let font, boldFont;
    let useCustomFonts = false;
    try {
        const fonts = await getFontsForLanguage(lang);
        if (fonts.regular && fonts.bold) {
            font = await doc.embedFont(fonts.regular);
            boldFont = await doc.embedFont(fonts.bold);
            useCustomFonts = true;
            // Update the current script type for reference
            currentScriptType = languageToScript[lang] || 'latin';
            console.log(`PDF using ${currentScriptType} fonts for language: ${lang}`);
        } else {
            throw new Error('Custom fonts not available');
        }
    } catch (e) {
        console.warn('Failed to load custom fonts, using standard Helvetica:', e);
        font = await doc.embedFont(StandardFonts.Helvetica);
        boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
        useCustomFonts = false;
    }

    const pageWidth = 595;
    const pageHeight = 842;
    let page = doc.addPage([pageWidth, pageHeight]);
    const margin = 45;
    let y = pageHeight - margin;

    // ========== PREMIUM DARK COLOR PALETTE ==========
    const deepSpace = rgb(0.059, 0.059, 0.118);      // #0f0f1e - Main dark background
    const cosmicPurple = rgb(0.098, 0.067, 0.157);   // #191129 - Subtle purple tint
    const gold = rgb(0.984, 0.749, 0.141);           // #fbbf24 - Primary gold
    const darkGold = rgb(0.776, 0.549, 0.082);       // #c68c15 - Darker gold
    const starWhite = rgb(0.95, 0.95, 0.97);         // Off-white for text
    const softGold = rgb(0.984, 0.749, 0.141);       // Same as gold but for opacity use
    const mutedText = rgb(0.7, 0.7, 0.75);           // Muted for secondary text
    const cardBg = rgb(0.078, 0.078, 0.141);         // #141424 - Card backgrounds

    // Helper to draw dark background on a page
    const drawPageBackground = (p: any) => {
        // Main dark background
        p.drawRectangle({
            x: 0, y: 0,
            width: pageWidth, height: pageHeight,
            color: deepSpace,
        });
        // Subtle gradient overlay at top
        p.drawRectangle({
            x: 0, y: pageHeight - 200,
            width: pageWidth, height: 200,
            color: cosmicPurple,
            opacity: 0.4,
        });
        // Decorative stars
        const stars = [
            { x: 35, y: pageHeight - 25, s: 2 },
            { x: 85, y: pageHeight - 45, s: 1.5 },
            { x: 140, y: pageHeight - 20, s: 1 },
            { x: pageWidth - 40, y: pageHeight - 30, s: 2 },
            { x: pageWidth - 100, y: pageHeight - 55, s: 1.5 },
            { x: pageWidth - 150, y: pageHeight - 25, s: 1 },
            { x: 50, y: 60, s: 1.2 },
            { x: pageWidth - 60, y: 50, s: 1.3 },
        ];
        for (const star of stars) {
            p.drawCircle({ x: star.x, y: star.y, size: star.s, color: gold, opacity: 0.3 });
        }
    };

    // Draw background on first page
    drawPageBackground(page);

    // ========== HEADER SECTION ==========
    // Gold decorative line at top
    page.drawRectangle({
        x: margin, y: pageHeight - 30,
        width: pageWidth - (margin * 2), height: 2,
        color: gold, opacity: 0.6,
    });

    // ASTRALO Logo
    const logoText = 'ASTRALO';
    const logoWidth = boldFont.widthOfTextAtSize(logoText, 36);
    page.drawText(logoText, {
        x: (pageWidth - logoWidth) / 2,
        y: pageHeight - 70,
        size: 36,
        font: boldFont,
        color: gold,
    });

    // Decorative lines around logo
    const logoLineY = pageHeight - 82;
    page.drawLine({
        start: { x: margin, y: logoLineY },
        end: { x: (pageWidth - logoWidth) / 2 - 20, y: logoLineY },
        thickness: 1, color: gold, opacity: 0.4,
    });
    page.drawLine({
        start: { x: (pageWidth + logoWidth) / 2 + 20, y: logoLineY },
        end: { x: pageWidth - margin, y: logoLineY },
        thickness: 1, color: gold, opacity: 0.4,
    });

    // Tagline
    const tagline = lang === 'sk' ? 'Vas Osobny Horoskop' : 'Your Personal Horoscope';
    const taglineWidth = font.widthOfTextAtSize(tagline, 12);
    page.drawText(tagline, {
        x: (pageWidth - taglineWidth) / 2,
        y: pageHeight - 98,
        size: 12, font: font, color: mutedText,
    });

    // Product badge
    const badgeWidth = boldFont.widthOfTextAtSize(productName, 18) + 40;
    page.drawRectangle({
        x: (pageWidth - badgeWidth) / 2,
        y: pageHeight - 140,
        width: badgeWidth, height: 32,
        color: gold, opacity: 0.15,
        borderColor: gold, borderWidth: 1.5,
    });
    const productWidth = boldFont.widthOfTextAtSize(productName, 18);
    page.drawText(productName, {
        x: (pageWidth - productWidth) / 2,
        y: pageHeight - 130,
        size: 18, font: boldFont, color: gold,
    });

    y = pageHeight - 175;

    // ========== CUSTOMER INFO CARD ==========
    const cardHeight = 75;
    page.drawRectangle({
        x: margin - 5, y: y - cardHeight,
        width: pageWidth - (margin * 2) + 10, height: cardHeight,
        color: cardBg,
        borderColor: gold, borderWidth: 1, opacity: 0.9,
    });

    const infoLabels = lang === 'sk'
        ? { name: 'Meno:', birth: 'Datum:', place: 'Miesto:', time: 'Cas:' }
        : { name: 'Name:', birth: 'Date:', place: 'Place:', time: 'Time:' };

    // Star icon (circle) before name
    page.drawCircle({ x: margin + 8, y: y - 20, size: 3, color: gold });
    page.drawText(infoLabels.name, { x: margin + 18, y: y - 24, size: 9, font, color: mutedText });
    page.drawText(sanitizeForPDF(customerName), { x: margin + 58, y: y - 24, size: 12, font: boldFont, color: starWhite });

    // Birth details
    let infoX = margin + 18;
    if (birthDate) {
        page.drawText(infoLabels.birth, { x: infoX, y: y - 46, size: 9, font, color: mutedText });
        page.drawText(sanitizeForPDF(birthDate), { x: infoX + 40, y: y - 46, size: 10, font, color: starWhite });
        infoX += 130;
    }
    if (birthTime) {
        page.drawText(infoLabels.time, { x: infoX, y: y - 46, size: 9, font, color: mutedText });
        page.drawText(sanitizeForPDF(birthTime), { x: infoX + 30, y: y - 46, size: 10, font, color: starWhite });
        infoX += 80;
    }
    if (birthPlace) {
        page.drawText(infoLabels.place, { x: margin + 18, y: y - 64, size: 9, font, color: mutedText });
        page.drawText(sanitizeForPDF(birthPlace), { x: margin + 58, y: y - 64, size: 10, font, color: starWhite });
    }

    y -= cardHeight + 25;

    // ========== READING HEADER ==========
    const readingTitle = lang === 'sk' ? 'Vase Citanie' : 'Your Reading';
    page.drawRectangle({
        x: margin - 5, y: y - 5,
        width: 110, height: 24,
        color: gold,
    });
    page.drawText(readingTitle, {
        x: margin + 5, y: y + 2,
        size: 11, font: boldFont, color: deepSpace,
    });
    // Decorative line
    page.drawLine({
        start: { x: margin + 115, y: y + 7 },
        end: { x: pageWidth - margin, y: y + 7 },
        thickness: 1, color: gold, opacity: 0.3,
    });

    y -= 35;

    // ========== HOROSCOPE CONTENT ==========
    const cleanContent = horoscopeContent
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1');

    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim());
    const maxWidth = pageWidth - (margin * 2);
    const fontSize = 10;
    const lineHeight = 15;

    for (const paragraph of paragraphs) {
        const words = paragraph.replace(/\n/g, ' ').split(' ').filter(w => w);
        let line = '';

        // Check for section headers
        const isSection = paragraph.match(/^(Lucky|Best|Tip|Love|Career|Money|Health|Energy|Week|Day|Month)/i) ||
            paragraph.match(/^[A-Z][a-z]+:/);

        if (isSection) {
            // Gold accent section header
            page.drawRectangle({
                x: margin - 5, y: y - 18,
                width: maxWidth + 10, height: 22,
                color: cardBg,
                borderColor: gold, borderWidth: 0.5,
            });
            // Small star indicator
            page.drawCircle({ x: margin + 5, y: y - 7, size: 2.5, color: gold });
        }

        for (const word of words) {
            const testLine = line + (line ? ' ' : '') + word;
            const cleanedLine = sanitizeForPDF(testLine);
            const testWidth = font.widthOfTextAtSize(cleanedLine, fontSize);

            if (testWidth > maxWidth) {
                page.drawText(sanitizeForPDF(line), {
                    x: isSection ? margin + 15 : margin,
                    y,
                    size: fontSize,
                    font: isSection ? boldFont : font,
                    color: isSection ? gold : starWhite,
                });
                y -= lineHeight;
                line = word;

                // New page if needed
                if (y < margin + 80) {
                    // Footer line before new page
                    page.drawLine({
                        start: { x: margin, y: margin + 40 },
                        end: { x: pageWidth - margin, y: margin + 40 },
                        thickness: 0.5, color: gold, opacity: 0.3,
                    });

                    page = doc.addPage([pageWidth, pageHeight]);
                    drawPageBackground(page);
                    y = pageHeight - margin - 20;
                }
            } else {
                line = testLine;
            }
        }

        if (line.trim()) {
            page.drawText(sanitizeForPDF(line), {
                x: isSection ? margin + 15 : margin,
                y,
                size: fontSize,
                font: isSection ? boldFont : font,
                color: isSection ? gold : starWhite,
            });
            y -= lineHeight * 1.5;
        }

        // New page check
        if (y < margin + 80) {
            page = doc.addPage([pageWidth, pageHeight]);
            drawPageBackground(page);
            y = pageHeight - margin - 20;
        }
    }

    // ========== FOOTER ==========
    // Quote box
    const quoteText = lang === 'sk' ? 'Nech vas hviezdy vedu na vasej ceste' : 'May the stars guide you on your journey';
    page.drawRectangle({
        x: margin, y: margin + 45,
        width: pageWidth - (margin * 2), height: 36,
        color: cosmicPurple, opacity: 0.8,
        borderColor: gold, borderWidth: 0.5,
    });
    // Star decorations in quote
    page.drawCircle({ x: margin + 15, y: margin + 63, size: 2, color: gold, opacity: 0.6 });
    page.drawCircle({ x: pageWidth - margin - 15, y: margin + 63, size: 2, color: gold, opacity: 0.6 });

    const quoteWidth = font.widthOfTextAtSize(quoteText, 11);
    page.drawText(quoteText, {
        x: (pageWidth - quoteWidth) / 2,
        y: margin + 58,
        size: 11, font, color: starWhite, opacity: 0.9,
    });

    // Copyright
    const copyrightText = `${new Date().getFullYear()} Astralo | astralo.online | Apollo Tech s.r.o.`;
    const copyrightWidth = font.widthOfTextAtSize(copyrightText, 8);
    page.drawText(copyrightText, {
        x: (pageWidth - copyrightWidth) / 2,
        y: margin + 20,
        size: 8, font, color: mutedText, opacity: 0.7,
    });

    // Bottom gold line
    page.drawRectangle({
        x: margin, y: margin + 10,
        width: pageWidth - (margin * 2), height: 2,
        color: gold, opacity: 0.6,
    });

    const pdfBytes = await doc.save();

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = lang === 'sk'
        ? `Horoskop_${productName.replace(/\s+/g, '_')}_${dateStr}.pdf`
        : `Horoscope_${productName.replace(/\s+/g, '_')}_${dateStr}.pdf`;

    return { filename, content: pdfBytes };
}

