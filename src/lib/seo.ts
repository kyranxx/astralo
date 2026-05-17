import { locales } from './i18n';
import type { SupportedLocale, Translations } from '../locales/types';
import type { BlogPostMeta, BlogPostTranslation } from './blog';
import { getProductName, getProductPriceInEuros, type ProductKey } from './products';
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
    description: string;
    keywords: string;
    supportingCopy: string;
}

const homeSeoOverrides: Partial<Record<SupportedLocale, HomeSeoOverride>> = {
    no: {
        title: 'Gratis personlig horoskop | Personlig horoskop gratis | Astralo',
        description: 'Start med et gratis personlig horoskop og få en nøyaktig personlig horoskoprapport for kjærlighet, karriere og månedlig astrologi.',
        keywords: 'gratis personlig horoskop, personlig horoskop gratis, gratis horoskop, gratis norsk horoskop 2026, astrologi horoskop gratis',
        supportingCopy: 'Start med et gratis personlig horoskop, eller bestill en detaljert rapport basert på fødselsdato, fødselstid og sted.',
    },
    de: {
        title: 'Astral Horoskop online | Persönliches Horoskop | Astralo',
        description: 'Erstellen Sie Ihr persönliches Astral Horoskop online: Tageshoroskop, Monatshoroskop, Partnerhoroskop und genaue astrologische PDF-Deutung.',
        keywords: 'astral horoskop, persönliches tageshoroskop, horoskop online, horoskop kostenlos, geburtshoroskop',
        supportingCopy: 'Ihr Astral Horoskop verbindet Geburtsdaten, Sternzeichen und aktuelle astrologische Themen zu einer persönlichen Deutung.',
    },
    da: {
        title: 'Professionelt horoskop online | Personligt horoskop | Astralo',
        description: 'Få et professionelt horoskop online med personlig astrologisk læsning for kærlighed, karriere, månedlige temaer og forhold.',
        keywords: 'professionelt horoskop, få lagt horoskop online, horoskop online, personligt horoskop, horoskop personligt gratis',
        supportingCopy: 'Få et professionelt horoskop online, skrevet til dine fødselsdata og leveret som en klar personlig rapport.',
    },
    fi: {
        title: 'Astral horoskooppi | Ilmainen päivähoroskooppi | Astralo',
        description: 'Lue Astral horoskooppi ja aloita ilmaisella päivähoroskoopilla. Saat henkilökohtaisen horoskoopin rakkauteen, uraan ja kuukauden teemoihin.',
        keywords: 'astral horoskooppi, horoskooppi astral, ilmainen päivähoroskooppi, ilmainen horoskooppi, ilmainen viikkohoroskooppi',
        supportingCopy: 'Astral horoskooppi näyttää päivän, viikon ja kuukauden tärkeimmät teemat henkilökohtaisen syntymäkarttasi pohjalta.',
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

export function stripLanguagePrefix(pathname: string): string {
    const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const stripped = normalized.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    return stripped || '/';
}

export function getHomePath(lang: SupportedLocale): string {
    return lang === 'en' ? '/' : `/${lang}/`;
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
            /href="\/(?:[a-z]{2}\/)?horoscope\/(?:daily|weekly|monthly|partner)"/gi,
            `href="${targetPath}"`,
        )
        .replace(
            /href="\/(?:[a-z]{2}\/)?form\/(?:daily|weekly|monthly|partner)"/gi,
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

export function getGeneralFaqEntries(t: Translations): SeoFaqItem[] {
    if (!t.faq) {
        return [];
    }

    return [
        { question: t.faq.q1, answer: t.faq.a1 },
        { question: t.faq.q2, answer: t.faq.a2 },
        { question: t.faq.q3, answer: t.faq.a3 },
        { question: t.faq.q4, answer: t.faq.a4 },
        { question: t.faq.q5, answer: t.faq.a5 },
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
    const productKeys: ProductKey[] = ['daily', 'weekly', 'monthly', 'partner'];

    return {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        '@id': `${buildLocaleUrl('/', lang)}#offer-catalog`,
        name: `${brandName} Horoscope Readings`,
        itemListElement: productKeys.map((productKey) => ({
            '@type': 'Offer',
            url: `${siteUrl}${getProductLandingPath(lang, productKey)}`,
            price: getProductPriceInEuros(productKey).toFixed(2),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            itemOffered: {
                '@type': 'Service',
                name: getProductName(productKey, lang),
                description: t.products[productKey].description,
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
            '@type': 'Person',
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
