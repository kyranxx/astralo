import { locales } from './i18n';
import type { SupportedLocale, Translations } from '../locales/types';
import type { BlogPostMeta, BlogPostTranslation } from './blog';
import { getProductCopy, getProductKeys, getProductName, getProductPriceInEuros, getProductPricingSummary, type ProductKey } from './products';
import type { ZodiacSignSlug } from './zodiac';

export const siteUrl = 'https://astralo.online';
export const brandName = 'Astralo';
export const legalName = 'Apollo Tech s.r.o.';
export const supportEmail = 'apollotechsro@gmail.com';
export const defaultOgImage = `${siteUrl}/og-image.png`;
const organizationDescription = 'Astralo provides personalized astrology readings and horoscope reports delivered digitally by email.';

export const supportedLocaleOrder: SupportedLocale[] = [
    'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro',
    'bg', 'hr', 'sl', 'sr', 'uk', 'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja',
    'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn',
];

export const ogLocaleMap: Record<string, string> = {
    en: 'en_US', sk: 'sk_SK', cs: 'cs_CZ', de: 'de_DE', fr: 'fr_FR',
    es: 'es_ES', it: 'it_IT', pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL',
    hu: 'hu_HU', ro: 'ro_RO', bg: 'bg_BG', hr: 'hr_HR', sl: 'sl_SI',
    sr: 'sr_RS', uk: 'uk_UA', ru: 'ru_RU', el: 'el_GR', tr: 'tr_TR',
    ar: 'ar_SA', he: 'he_IL', hi: 'hi_IN', ja: 'ja_JP', ko: 'ko_KR',
    zh: 'zh_CN', th: 'th_TH', vi: 'vi_VN', id: 'id_ID', sv: 'sv_SE',
    da: 'da_DK', fi: 'fi_FI', no: 'nb_NO', bn: 'bn_BD',
};

export interface HomeSeoOverride {
    title: string;
    heroTitle: string;
    description: string;
    keywords: string;
    supportingCopy: string;
}

const homeSeoOverrides: Partial<Record<SupportedLocale, HomeSeoOverride>> = {
    sk: {
        title: 'Astralo | Horoskop online | Osobný horoskop',
        heroTitle: 'Horoskop online s Astralo',
        description: 'Astralo vytvorí osobný horoskop online z dát narodenia: denný, týždenný, mesačný alebo partnerský výklad doručený emailom.',
        keywords: 'horoskop online, osobný horoskop, denný horoskop, mesačný horoskop, partnerský horoskop',
        supportingCopy: 'Objednajte si horoskop online podľa dát narodenia, alebo začnite bezplatnou astrologickou emailovou ukážkou.',
    },
    cs: {
        title: 'Astralo | Horoskop online | Osobní horoskop',
        heroTitle: 'Horoskop online s Astralo',
        description: 'Astralo vytvoří osobní horoskop online z dat narození: denní, týdenní, měsíční nebo partnerský výklad doručený emailem.',
        keywords: 'horoskop online, osobní horoskop, denní horoskop, měsíční horoskop, partnerský horoskop',
        supportingCopy: 'Objednejte si horoskop online podle dat narození, nebo začněte bezplatnou astrologickou emailovou ukázkou.',
    },
    no: {
        title: 'Astralo | Gratis personlig horoskop | Personlig horoskop gratis',
        heroTitle: 'Gratis personlig horoskop med Astralo',
        description: 'Start med et gratis personlig horoskop og få en nøyaktig personlig horoskoprapport for kjærlighet, karriere og månedlig astrologi.',
        keywords: 'gratis personlig horoskop, personlig horoskop gratis, gratis horoskop, gratis norsk horoskop 2026, astrologi horoskop gratis',
        supportingCopy: 'Start med et gratis personlig horoskop, eller bestill en detaljert rapport basert på fødselsdato, fødselstid og sted.',
    },
    de: {
        title: 'Astral Horoskop online & persönlich | Astralo',
        heroTitle: 'Ihr persönliches Astral Horoskop',
        description: 'Entdecken Sie Ihr persönliches Astral Horoskop: Tages-, Monats- oder Partnerhoroskop auf Basis Ihrer Geburtsdaten, bequem per E-Mail.',
        keywords: 'astral horoskop, persönliches tageshoroskop, horoskop online, horoskop kostenlos, geburtshoroskop',
        supportingCopy: 'Ihr Astral Horoskop verbindet Geburtsdaten, Sternzeichen und aktuelle astrologische Themen zu einer persönlichen Deutung.',
    },
    hr: {
        title: 'Astralo | Astral horoskop online | Osobni horoskop',
        heroTitle: 'Astral horoskop online',
        description: 'Otkrijte svoj astral horoskop online uz osobnu astrološku interpretaciju za ljubav, karijeru, odnose i mjesečne teme.',
        keywords: 'astral horoskop, astralni horoskop, osobni horoskop, horoskop online, tjedni horoskop',
        supportingCopy: 'Astralo povezuje vaše podatke rođenja s astrološkim temama kako bi vaš astral horoskop bio osobniji i jasniji.',
    },
    sl: {
        title: 'Astralo | Astral horoskop online | Osebni horoskop',
        heroTitle: 'Astral horoskop online',
        description: 'Odkrijte svoj astral horoskop online z osebno astrološko razlago za ljubezen, kariero, odnose in mesečne teme.',
        keywords: 'astral horoskop, astralni horoskop, osebni horoskop, horoskop online, tedenski horoskop',
        supportingCopy: 'Astralo povezuje vaše rojstne podatke z astrološkimi temami, da je vaš astral horoskop bolj oseben in jasen.',
    },
    da: {
        title: 'Astralo | Professionelt horoskop online | Personligt horoskop',
        heroTitle: 'Professionelt horoskop online med Astralo',
        description: 'Få et professionelt horoskop online med personlig astrologisk læsning for kærlighed, karriere, månedlige temaer og forhold.',
        keywords: 'professionelt horoskop, få lagt horoskop online, horoskop online, personligt horoskop, horoskop personligt gratis',
        supportingCopy: 'Få et professionelt horoskop online, skrevet til dine fødselsdata og leveret som en klar personlig rapport.',
    },
    fi: {
        title: 'Päivittäinen horoskooppi ilmaiseksi | Astralo',
        heroTitle: 'Päivittäinen horoskooppi juuri sinulle',
        description: 'Lue ilmainen päivähoroskooppi ja tutustu henkilökohtaiseen tulkintaan rakkaudesta, työstä ja kuukauden tärkeistä teemoista.',
        keywords: 'astral horoskooppi, horoskooppi astral, ilmainen päivähoroskooppi, ilmainen horoskooppi, ilmainen viikkohoroskooppi',
        supportingCopy: 'Astral horoskooppi näyttää päivän, viikon ja kuukauden tärkeimmät teemat henkilökohtaisen syntymäkarttasi pohjalta.',
    },
    pl: {
        title: 'Astralo | Horoskop osobisty online',
        heroTitle: 'Twój osobisty horoskop online',
        description: 'Astralo tworzy osobisty horoskop na podstawie daty, godziny i miejsca urodzenia. Wybierz prognozę dzienną, miesięczną lub partnerską.',
        keywords: 'astralo, horoskop osobisty online, personalizowany horoskop, horoskop miesięczny, horoskop partnerski',
        supportingCopy: 'Astralo tworzy horoskop na podstawie Twojej daty, godziny i miejsca urodzenia, aby raport był bardziej osobisty.',
    },
    es: {
        title: 'Horóscopo semanal y personalizado | Astralo',
        heroTitle: 'Tu horóscopo semanal personalizado',
        description: 'Consulta tu horóscopo semanal y recibe una lectura personalizada sobre amor, trabajo y compatibilidad basada en tus datos de nacimiento.',
        keywords: 'horóscopo semanal, horóscopo personalizado, horóscopo de hoy, horóscopo de pareja, astrología online',
        supportingCopy: 'Empieza con el horóscopo gratuito o elige una lectura preparada a partir de tu fecha, hora y lugar de nacimiento.',
    },
    fr: {
        title: 'Horoscope personnalisé amour | Astralo',
        heroTitle: 'Votre horoscope personnalisé en amour',
        description: 'Découvrez un horoscope personnalisé pour l’amour, la compatibilité et les mois à venir, établi à partir de vos informations de naissance.',
        keywords: 'astralo, horoscope personnalisé en ligne, horoscope mensuel, horoscope de couple, astrologie personnalisée',
        supportingCopy: 'Astralo prépare une lecture claire de votre thème astral en ligne à partir de votre date, heure et lieu de naissance.',
    },
    it: {
        title: 'Astralo | Oroscopo personalizzato online | Amore e futuro',
        heroTitle: 'Oroscopo personalizzato online con Astralo',
        description: 'Ottieni un oroscopo personalizzato Astralo per amore, carriera, compatibilità e previsioni mensili, consegnato via email.',
        keywords: 'astralo, oroscopo personalizzato online, oroscopo mensile, oroscopo di coppia, astrologia personalizzata',
        supportingCopy: 'Astralo usa i tuoi dati di nascita per creare una lettura astrologica più personale e utile.',
    },
    ro: {
        title: 'Astralo | Horoscop personalizat gratuit | Horoscop online',
        heroTitle: 'Horoscop personalizat gratuit cu Astralo',
        description: 'Începe cu un horoscop personalizat gratuit de la Astralo, apoi alege o analiză online mai detaliată pentru dragoste, carieră sau luna curentă.',
        keywords: 'horoscop personalizat gratuit, horoscop online, astralo, horoscop gratuit, horoscop personalizat',
        supportingCopy: 'Astralo pornește de la datele tale de naștere pentru o interpretare mai personală decât un horoscop general.',
    },
    pt: {
        title: 'Horóscopo diário e personalizado | Astralo',
        heroTitle: 'O seu horóscopo diário personalizado',
        description: 'Consulte o horóscopo diário e receba uma leitura personalizada sobre amor, carreira e relações, criada a partir dos seus dados de nascimento.',
        keywords: 'horóscopo diário, horóscopo personalizado, horóscopo de hoje, horóscopo mensal, astrologia online',
        supportingCopy: 'Comece pelo horóscopo gratuito ou escolha uma leitura pessoal baseada na data, hora e local do seu nascimento.',
    },
    ru: {
        title: 'Гороскоп на сегодня бесплатно | Astralo',
        heroTitle: 'Ваш гороскоп на сегодня',
        description: 'Узнайте бесплатный гороскоп на сегодня или выберите персональный прогноз о любви, работе и отношениях по данным рождения.',
        keywords: 'гороскоп на сегодня, гороскоп бесплатно, персональный гороскоп, любовный гороскоп, совместимость знаков',
        supportingCopy: 'Начните с бесплатного прогноза или закажите подробный разбор по дате, времени и месту рождения.',
    },
    sv: {
        title: 'Astralo | Personligt horoskop online | Gratis start',
        heroTitle: 'Personligt horoskop online med Astralo',
        description: 'Börja med ett gratis horoskop eller beställ en personlig Astralo-läsning för kärlek, karriär, relationer och månadens teman.',
        keywords: 'astralo, personligt horoskop online, gratis horoskop, dagens horoskop, astrologi online',
        supportingCopy: 'Astralo gör astrologin mer personlig genom att använda dina födelsedata för en tydligare läsning.',
    },
    id: {
        title: 'Horoskop gratis hari ini & pribadi | Astralo',
        heroTitle: 'Horoskop gratis hari ini untukmu',
        description: 'Baca horoskop gratis hari ini, lalu pilih ramalan pribadi tentang cinta, karier, hubungan, atau bulan ini berdasarkan data kelahiranmu.',
        keywords: 'horoskop gratis, horoskop gratis online, horoskop pribadi, astralo, ramalan zodiak online',
        supportingCopy: 'Astralo membantu kamu memulai dengan bacaan gratis, lalu memberi pilihan laporan yang lebih pribadi jika kamu ingin detail lebih dalam.',
    },
    ar: {
        title: 'أبراج اليوم مجانًا وتوقعات شخصية | Astralo',
        heroTitle: 'برجك اليوم وتوقعاتك الشخصية',
        description: 'اقرأ توقعات برجك اليوم مجانًا، أو احصل على قراءة شخصية للحب والعمل والعلاقات بناءً على بيانات ميلادك.',
        keywords: 'برجك اليوم, أبراج اليوم, حظك اليوم, توقعات الأبراج, خريطة الميلاد',
        supportingCopy: 'ابدأ بتوقعات مجانية، ثم اختر قراءة مفصلة تعتمد على تاريخ ووقت ومكان الميلاد.',
    },
    ja: {
        title: '今日の運勢を無料で｜12星座・個人鑑定｜Astralo',
        heroTitle: '今日の運勢を無料でチェック',
        description: '12星座の今日の運勢を無料で確認。生年月日・出生時刻・出生地をもとに、恋愛や仕事、相性を個別に読み解きます。',
        keywords: '今日の運勢, 12星座占い, 星占い 無料, 恋愛運, 相性占い, 個人鑑定',
        supportingCopy: 'まずは無料の運勢から。もっと詳しく知りたい方には、出生情報に基づく個人向け鑑定をご用意しています。',
    },
    zh: {
        title: '今日星座运势免费查询｜个性化占星｜Astralo',
        heroTitle: '免费查看今日星座运势',
        description: '免费查看十二星座今日运势，也可根据出生日期、时间和地点获取爱情、事业与关系方面的个性化占星解读。',
        keywords: '今日星座运势, 十二星座运势, 星座运势免费, 爱情运势, 个性化占星',
        supportingCopy: '先查看免费运势；如需深入解读，可选择基于出生信息生成的个性化报告。',
    },
    ko: {
        title: '오늘의 별자리 운세 무료 보기 | Astralo',
        heroTitle: '오늘의 별자리 운세를 확인하세요',
        description: '열두 별자리의 오늘 운세를 무료로 확인하고, 생년월일과 출생 시간·장소를 바탕으로 한 연애·직장·궁합 풀이도 만나보세요.',
        keywords: '오늘의 별자리 운세, 오늘 운세 무료, 별자리 운세, 연애운, 별자리 궁합',
        supportingCopy: '무료 오늘 운세로 시작하고, 더 자세한 내용은 출생 정보를 바탕으로 한 개인 맞춤 풀이에서 확인하세요.',
    },
    hi: {
        title: 'आज का राशिफल मुफ्त और व्यक्तिगत | Astralo',
        heroTitle: 'आज का राशिफल आपके लिए',
        description: 'आज का मुफ्त राशिफल पढ़ें या जन्म तिथि, समय और स्थान के आधार पर प्रेम, करियर और रिश्तों की व्यक्तिगत ज्योतिष रिपोर्ट पाएं।',
        keywords: 'आज का राशिफल, मुफ्त राशिफल, दैनिक राशिफल, प्रेम राशिफल, व्यक्तिगत ज्योतिष',
        supportingCopy: 'मुफ्त राशिफल से शुरुआत करें या अपनी जन्म जानकारी पर आधारित विस्तृत व्यक्तिगत रिपोर्ट चुनें।',
    },
    tr: {
        title: 'Günlük burç yorumları ve kişisel analiz | Astralo',
        heroTitle: 'Bugünkü burç yorumunuz',
        description: 'Günlük burç yorumunuzu ücretsiz okuyun; aşk, kariyer ve ilişkiler için doğum bilgilerinize göre hazırlanan kişisel analizi keşfedin.',
        keywords: 'günlük burç yorumları, bugün burç yorumları, ücretsiz burç, aşk burçları, kişisel astroloji',
        supportingCopy: 'Ücretsiz günlük yorumla başlayın veya doğum tarihi, saati ve yerine göre hazırlanan ayrıntılı raporu seçin.',
    },
};

export function getHomeSeoOverride(lang: SupportedLocale): HomeSeoOverride | null {
    return homeSeoOverrides[lang] || null;
}

const rtlLocales = new Set<SupportedLocale>(['ar', 'he']);

export interface SeoFaqItem {
    question: string;
    answer: string;
}

export function isRtlLocale(lang: SupportedLocale): boolean {
    return rtlLocales.has(lang);
}

export function stripTrailingSlash(pathname: string): string {
    if (!pathname || pathname === '/') {
        return '/';
    }

    return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function normalizeCanonicalUrl(value: string): string {
    const url = new URL(value, siteUrl);

    if (url.pathname !== '/') {
        url.pathname = url.pathname.replace(/\/+$/, '');
    }

    url.search = '';
    url.hash = '';

    return url.toString().replace(/\/$/, url.pathname === '/' ? '/' : '');
}

export function stripLanguagePrefix(pathname: string): string {
    const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const stripped = normalized.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    return stripped || '/';
}

export function getHomePath(lang: SupportedLocale): string {
    return lang === 'en' ? '/' : `/${lang}`;
}

export function getBlogIndexPath(lang: SupportedLocale): string {
    return lang === 'en' ? '/blog' : `/${lang}/blog`;
}

export function getFreeHoroscopePath(lang: SupportedLocale): string {
    return lang === 'en' ? '/free-horoscope' : `/${lang}/free-horoscope`;
}

export function getFormPath(lang: SupportedLocale, productKey: ProductKey): string {
    return lang === 'en' ? `/form/${productKey}` : `/${lang}/form/${productKey}`;
}

export function getProductLandingPath(lang: SupportedLocale, productKey: ProductKey): string {
    return lang === 'en' ? `/horoscope/${productKey}` : `/${lang}/horoscope/${productKey}`;
}

export function getZodiacProductPath(lang: SupportedLocale, productKey: ProductKey, sign: ZodiacSignSlug): string {
    return lang === 'en'
        ? `/horoscope/${productKey}/${sign}`
        : `/${lang}/horoscope/${productKey}/${sign}`;
}

export function getSuggestedProductForArticle(slug: string): ProductKey {
    const normalizedSlug = slug.toLowerCase();

    if (normalizedSlug.includes('monthly')) return 'monthly';
    if (normalizedSlug.includes('weekly')) return 'weekly';
    if (normalizedSlug.includes('daily')) return 'daily';
    if (
        normalizedSlug.includes('partner')
        || normalizedSlug.includes('compatibility')
        || normalizedSlug.includes('love')
        || normalizedSlug.includes('flame')
        || normalizedSlug.includes('soulmate')
    ) {
        return 'partner';
    }

    return 'monthly';
}

export function rewriteBlogOfferLinks(content: string, lang: SupportedLocale, slug: string): string {
    const targetPath = getProductLandingPath(lang, getSuggestedProductForArticle(slug));

    return content
        .replace(
            /href="\/(?:[a-z]{2}\/)?horoscope\/(?:daily|weekly|monthly|partner|lifetime)"/gi,
            `href="${targetPath}"`,
        )
        .replace(
            /href="\/(?:[a-z]{2}\/)?form\/(?:daily|weekly|monthly|partner|lifetime)"/gi,
            `href="${targetPath}"`,
        )
        .replace(
            /href="\/(?:[a-z]{2}(?:\/)?)?"/gi,
            `href="${targetPath}"`,
        );
}

export function buildLocaleUrl(pathname: string, lang: SupportedLocale): string {
    const normalized = stripTrailingSlash(stripLanguagePrefix(pathname));

    if (lang === 'en') {
        return normalized === '/' ? siteUrl : `${siteUrl}${normalized}`;
    }

    return normalized === '/'
        ? `${siteUrl}/${lang}`
        : `${siteUrl}/${lang}${normalized}`;
}

export function buildAlternateLanguageUrls(pathname: string) {
    return supportedLocaleOrder.map((code) => ({
        code,
        hreflang: code,
        href: buildLocaleUrl(pathname, code),
    }));
}

export function getGeneralFaqEntries(t: Translations, lang: SupportedLocale = 'en'): SeoFaqItem[] {
    if (!t.faq) {
        return [];
    }

    return [
        { question: t.faq.q1, answer: t.faq.a1 },
        { question: t.faq.q2, answer: t.faq.a2 },
        { question: t.faq.q3, answer: t.faq.a3 },
        { question: t.faq.q4, answer: t.faq.a4 },
        { question: t.faq.q5, answer: getProductPricingSummary(lang) },
        { question: t.faq.q6, answer: t.faq.a6 },
    ].filter((item) => item.question && item.answer);
}

export function buildWebSiteSchema(description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: brandName,
        url: siteUrl,
        description,
        publisher: {
            '@id': `${siteUrl}/#organization`,
        },
    };
}

export function buildOrganizationSchema(description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: brandName,
        legalName,
        url: siteUrl,
        logo: `${siteUrl}/logo.webp`,
        image: defaultOgImage,
        description: organizationDescription || description,
        email: supportEmail,
        areaServed: 'Worldwide',
        foundingLocation: {
            '@type': 'Country',
            name: 'Slovakia',
        },
        knowsAbout: [
            'Astrology',
            'Horoscopes',
            'Birth charts',
            'Zodiac compatibility',
            'Digital astrology reports',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: supportEmail,
            contactType: 'customer support',
            availableLanguage: supportedLocaleOrder.map((code) => locales[code].name),
        },
    };
}

export function buildWebPageSchema(params: {
    url: string;
    title: string;
    description: string;
    lang: SupportedLocale;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${params.url}#webpage`,
        url: params.url,
        name: params.title,
        description: params.description,
        inLanguage: params.lang,
        isPartOf: {
            '@id': `${siteUrl}/#website`,
        },
        about: {
            '@id': `${siteUrl}/#organization`,
        },
    };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function buildFaqSchema(items: SeoFaqItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

export function buildOfferCatalogSchema(lang: SupportedLocale, t: Translations) {
    return {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        '@id': `${buildLocaleUrl('/', lang)}#offer-catalog`,
        name: `${brandName} Horoscope Readings`,
        itemListElement: getProductKeys().map((productKey) => ({
            '@type': 'Offer',
            url: `${siteUrl}${getProductLandingPath(lang, productKey)}`,
            price: getProductPriceInEuros(productKey).toFixed(2),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            itemOffered: {
                '@type': 'Service',
                name: getProductName(productKey, lang),
                description: getProductCopy(productKey, lang, t).description,
            },
        })),
    };
}

export function buildProductServiceSchema(params: {
    lang: SupportedLocale;
    productKey: ProductKey;
    description: string;
    pageUrl: string;
}) {
    const { lang, productKey, description, pageUrl } = params;

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: getProductName(productKey, lang),
        serviceType: getProductName(productKey, lang),
        description,
        provider: {
            '@id': `${siteUrl}/#organization`,
        },
        areaServed: 'Worldwide',
        availableLanguage: supportedLocaleOrder.map((code) => locales[code].name),
        audience: {
            '@type': 'Audience',
            audienceType: 'Adults interested in astrology',
        },
        offers: {
            '@type': 'Offer',
            url: `${siteUrl}${getFormPath(lang, productKey)}`,
            price: getProductPriceInEuros(productKey).toFixed(2),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
        },
    };
}

export function buildProductOfferSchema(params: {
    lang: SupportedLocale;
    productKey: ProductKey;
    description: string;
    pageUrl: string;
    image?: string;
}) {
    const { lang, productKey, description, pageUrl, image = defaultOgImage } = params;
    const productName = getProductName(productKey, lang);

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: productName,
        description,
        image,
        brand: {
            '@type': 'Brand',
            name: brandName,
        },
        category: 'Digital astrology report',
        url: pageUrl,
        offers: {
            '@type': 'Offer',
            url: `${siteUrl}${getFormPath(lang, productKey)}`,
            price: getProductPriceInEuros(productKey).toFixed(2),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };
}

export function buildCollectionPageSchema(params: {
    url: string;
    title: string;
    description: string;
    lang: SupportedLocale;
    items: Array<{ url: string; name: string }>;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${params.url}#collection`,
        url: params.url,
        name: params.title,
        description: params.description,
        inLanguage: params.lang,
        isPartOf: {
            '@id': `${siteUrl}/#website`,
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: params.items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: item.url,
                name: item.name,
            })),
        },
    };
}

export function buildArticleSchema(params: {
    lang: SupportedLocale;
    url: string;
    translation: BlogPostTranslation;
    meta: BlogPostMeta;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${params.url}#article`,
        headline: params.translation.title,
        description: params.translation.metaDescription,
        datePublished: params.meta.date,
        dateModified: params.meta.date,
        author: {
            '@type': 'Organization',
            name: params.meta.author,
        },
        publisher: {
            '@id': `${siteUrl}/#organization`,
        },
        mainEntityOfPage: params.url,
        url: params.url,
        image: defaultOgImage,
        inLanguage: params.lang,
        articleSection: params.translation.category,
        keywords: params.translation.keywords,
    };
}
