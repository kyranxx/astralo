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

    const [regular, bold] = await Promise.all([
        loadFont(files.regular),
        loadFont(files.bold),
    ]);

    return { regular, bold };
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

        // Draw header on first page - matching website glassmorphism style
        const drawHeader = (page: any) => {
            // Header background - dark with subtle gradient effect
            page.drawRectangle({
                x: 0,
                y: height - 90,
                width: width,
                height: 90,
                color: darkBlue,
            });

            // Gold accent line at bottom of header
            page.drawRectangle({
                x: 0,
                y: height - 94,
                width: width,
                height: 4,
                color: gold,
            });

            // Small gold decorative lines at top
            page.drawRectangle({
                x: width / 2 - 60,
                y: height - 12,
                width: 120,
                height: 2,
                color: rgb(0.984, 0.749, 0.141),
            });

            // Stars decoration - draw 5-pointed star
            const drawStar = (cx: number, cy: number, size: number, filled: boolean) => {
                // SVG Path for a standard star (centered approx at 12,12 in 24x24 viewbox)
                // We'll scale it to match the requested size
                const starPath = 'M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 Z';

                // Scale factor: size is approx diameter. Path is 24x24.
                const scale = size / 24;

                if (filled) {
                    page.drawSvgPath(starPath, {
                        x: cx - (12 * scale),
                        y: cy - (12 * scale),
                        scale: scale,
                        color: gold,
                        borderWidth: 0,
                    });
                } else {
                    page.drawSvgPath(starPath, {
                        x: cx - (12 * scale),
                        y: cy - (12 * scale),
                        scale: scale,
                        borderColor: gold,
                        borderWidth: 1,
                    });
                }
            };

            // Draw 5 stars pattern: ★ ☆ ★ ☆ ★ (filled, outline, filled, outline, filled)
            const starY = height - 22;
            const centerX = width / 2;
            const spacing = 22; // Slightly wider for stars
            const starSize = 10; // Slightly larger

            drawStar(centerX - spacing * 2, starY, starSize, true);
            drawStar(centerX - spacing, starY, starSize, false);
            drawStar(centerX, starY, starSize + 2, true); // Center star slightly bigger
            drawStar(centerX + spacing, starY, starSize, false);
            drawStar(centerX + spacing * 2, starY, starSize, true);

            // Astralo text - larger and more prominent
            const astraloText = 'ASTRALO';
            const astraloWidth = boldFont.widthOfTextAtSize(astraloText, 26);
            page.drawText(astraloText, {
                x: (width - astraloWidth) / 2,
                y: height - 55,
                size: 26,
                font: boldFont,
                color: gold,
            });

            // Document type subtitle
            const typeWidth = font.widthOfTextAtSize('Legal Document', 10);
            page.drawText('Legal Document', {
                x: (width - typeWidth) / 2,
                y: height - 75,
                size: 10,
                font: font,
                color: rgb(0.7, 0.7, 0.7),
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

        let y = height - 120; // Start below header

        // Icon paths for different document types - matching website's lucide icons
        // Terms (Scale/Justice): Scales of justice icon
        const iconPathTerms = 'M12 3C12.55 3 13 3.45 13 4V5H19C19.55 5 20 5.45 20 6C20 6.55 19.55 7 19 7H18.18L17 15H19C19.55 15 20 15.45 20 16C20 16.55 19.55 17 19 17H5C4.45 17 4 16.55 4 16C4 15.45 4.45 15 5 15H7L5.82 7H5C4.45 7 4 6.55 4 6C4 5.45 4.45 5 5 5H11V4C11 3.45 11.45 3 12 3ZM9.18 7L10 13H14L14.82 7H9.18ZM12 19C10.34 19 9 20.34 9 22H15C15 20.34 13.66 19 12 19Z';
        // Privacy (Shield): Shield icon
        const iconPathPrivacy = 'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z';
        // Refund (RotateCcw): Counter-clockwise rotate arrow
        const iconPathRefund = 'M1 4V10H7M3.51 15C4.15 16.74 5.34 18.2 6.88 19.18C8.42 20.16 10.23 20.62 12.06 20.49C13.88 20.35 15.61 19.63 17 18.43C18.38 17.24 19.33 15.63 19.73 13.85C20.12 12.08 19.93 10.22 19.19 8.55C18.45 6.88 17.19 5.5 15.6 4.6C14.01 3.7 12.17 3.34 10.37 3.57C8.56 3.81 6.87 4.63 5.55 5.9L1 10';
        // Cookies (Cookie): Cookie icon with chips
        const iconPathCookie = 'M12 2C13.22 2 14.4 2.21 15.5 2.6C15.97 1.69 16.92 1 18 1C18.17 1 18.34 1.02 18.5 1.05C14.23 0.15 9.77 0.15 5.5 1.05C5.66 1.02 5.83 1 6 1C7.08 1 8.03 1.69 8.5 2.6C9.6 2.21 10.78 2 12 2ZM22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C13.05 2 14.07 2.14 15.04 2.4C14.4 3.2 14 4.23 14 5.36C14 5.78 14.06 6.19 14.16 6.57C12.58 7.13 11.5 8.62 11.5 10.36C11.5 12.63 13.37 14.5 15.64 14.5C16.69 14.5 17.64 14.11 18.36 13.46C18.67 13.73 19.02 13.96 19.4 14.15C19.78 15.24 20 16.4 20 17.64C20 19 19.5 20 18.5 21C19.91 19.69 21 17.92 21.58 15.93C21.85 14.72 22 13.39 22 12ZM8.5 8C9.61 8 10.5 8.9 10.5 10C10.5 11.1 9.61 12 8.5 12C7.4 12 6.5 11.1 6.5 10C6.5 8.9 7.4 8 8.5 8ZM7.5 14C8.05 14 8.5 14.45 8.5 15C8.5 15.55 8.05 16 7.5 16C6.95 16 6.5 15.55 6.5 15C6.5 14.45 6.95 14 7.5 14ZM11 16.5C11.83 16.5 12.5 17.17 12.5 18C12.5 18.83 11.83 19.5 11 19.5C10.17 19.5 9.5 18.83 9.5 18C9.5 17.17 10.17 16.5 11 16.5Z';

        let selectedIconPath = iconPathTerms; // Default
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes('privacy') || lowerTitle.includes('osobn') || lowerTitle.includes('súkromia')) {
            selectedIconPath = iconPathPrivacy;
        } else if (lowerTitle.includes('refund') || lowerTitle.includes('vrát') || lowerTitle.includes('reklam')) {
            selectedIconPath = iconPathRefund;
        } else if (lowerTitle.includes('cookie')) {
            selectedIconPath = iconPathCookie;
        }

        // Draw Icon (centered)
        const iconSize = 48; // Slightly smaller
        const iconScale = iconSize / 24;
        const iconX = (width) / 2 - (12 * iconScale);

        // Draw outlined icon for more elegance
        currentPage.drawSvgPath(selectedIconPath, {
            x: iconX,
            y: y - 5,
            scale: iconScale,
            borderColor: gold,
            borderWidth: 1.5,
            color: undefined, // No fill, just outline
        });

        y -= 75; // Increased spacing (was 60)

        // Document title - larger and bolder
        const titleWidth = boldFont.widthOfTextAtSize(title, 22);
        currentPage.drawText(title, {
            x: (width - titleWidth) / 2,
            y,
            size: 22,
            font: boldFont,
            color: darkBlue,
        });
        y -= 18;

        // Version and date line
        const dateText = `Version 1.0 • Last updated: December 5, 2024`;
        const dateWidth = font.widthOfTextAtSize(dateText, 9);
        currentPage.drawText(dateText, {
            x: (width - dateWidth) / 2,
            y,
            size: 9,
            font: font,
            color: gray,
        });
        y -= 40;

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
Email: apollotechsro@gmail.com
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
Máte právo na prístup, opravu alebo vymazanie svojich osobných údajov. Kontaktujte nás na apollotechsro@gmail.com pre akékoľvek požiadavky týkajúce sa ochrany osobných údajov.
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
Kontaktujte nás na apollotechsro@gmail.com s podrobnosťami objednávky a dôvodom žiadosti o vrátenie peňazí. Vašu požiadavku preskúmame do 48 hodín.
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
Email: apollotechsro@gmail.com
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
You have the right to access, correct, or delete your personal data. Contact us at apollotechsro@gmail.com for any privacy-related requests.
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
Please contact us at apollotechsro@gmail.com with your order details and the reason for your refund request. We will review your request within 48 hours.
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
