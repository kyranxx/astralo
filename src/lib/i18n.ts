/**
 * i18n - Internationalization System
 * Supports 31 languages for global reach
 */

export type SupportedLocale =
    | 'en' | 'sk' | 'cs' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'nl'
    | 'pl' | 'hu' | 'ro' | 'bg' | 'hr' | 'sl' | 'sr' | 'uk' | 'ru'
    | 'el' | 'tr' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'th'
    | 'vi' | 'id' | 'sv' | 'da' | 'fi' | 'no' | 'bn';

export interface LocaleConfig {
    code: SupportedLocale;
    name: string;
    nativeName: string;
    flag: string;
    dir: 'ltr' | 'rtl';
}

export const locales: Record<SupportedLocale, LocaleConfig> = {
    en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
    sk: { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', dir: 'ltr' },
    cs: { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr' },
    de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
    es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
    it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr' },
    nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
    pl: { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr' },
    hu: { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', dir: 'ltr' },
    ro: { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', dir: 'ltr' },
    bg: { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', dir: 'ltr' },
    hr: { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', dir: 'ltr' },
    sl: { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', dir: 'ltr' },
    sr: { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', dir: 'ltr' },
    uk: { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', dir: 'ltr' },
    ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    el: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
    tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
    ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
    zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
    th: { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', dir: 'ltr' },
    vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
    id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
    sv: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
    da: { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', dir: 'ltr' },
    fi: { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
    no: { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', dir: 'ltr' },
    bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
};

export const defaultLocale: SupportedLocale = 'en';

// Get all supported locale codes
export function getSupportedLocales(): SupportedLocale[] {
    return Object.keys(locales) as SupportedLocale[];
}

// Check if a locale is supported
export function isValidLocale(locale: string): locale is SupportedLocale {
    return locale in locales;
}

// Get locale configuration
export function getLocaleConfig(locale: SupportedLocale): LocaleConfig {
    return locales[locale] || locales[defaultLocale];
}

// Get translations for a specific locale (to be implemented with actual translations)
export function getTranslations(locale: SupportedLocale): Record<string, any> {
    // Dynamic import would be used here in production
    // For now, return English as default
    return translations[locale] || translations.en;
}

// Translation structure
export interface Translations {
    meta: {
        title: string;
        description: string;
        keywords: string;
    };
    header: {
        badge: string;
        online: string;
    };
    promo: {
        offer: string;
        delivery: string;
        customers: string;
        secure: string;
    };
    hero: {
        title: string;
        subtitle: string;
        features: string;
    };
    products: {
        daily: {
            name: string;
            description: string;
            wordCount: string;
            benefits: string[];
        };
        weekly: {
            name: string;
            description: string;
            wordCount: string;
            benefits: string[];
        };
        monthly: {
            name: string;
            description: string;
            wordCount: string;
            benefits: string[];
        };
        partner: {
            name: string;
            description: string;
            wordCount: string;
            benefits: string[];
        };
    };
    cta: {
        orderNow: string;
        popular: string;
    };
    trust: {
        customers: string;
        rating: string;
        delivery: string;
    };
    testimonials: {
        title: string;
    };
    whyUs: {
        title: string;
        technology: { title: string; description: string };
        instant: { title: string; description: string };
        professional: { title: string; description: string };
        verified: { title: string; description: string };
    };
    form: {
        title: string;
        name: string;
        email: string;
        birthDate: string;
        birthTime: string;
        birthPlace: string;
        partnerName: string;
        partnerBirthDate: string;
        partnerBirthTime: string;
        partnerBirthPlace: string;
        submit: string;
        processing: string;
    };
    success: {
        title: string;
        message: string;
        checkEmail: string;
    };
    footer: {
        rights: string;
        terms: string;
        privacy: string;
        refund: string;
        cookies: string;
    };
}

// English translations (base)
const enTranslations: Translations = {
    meta: {
        title: 'Astralo - Professional Horoscopes | Accurate Astrological Predictions',
        description: 'Get your personalized horoscope created with advanced AI technology. Accurate predictions for daily, weekly, monthly, and partner compatibility.',
        keywords: 'horoscope, astrology, zodiac, predictions, personalized horoscope, AI horoscope',
    },
    header: {
        badge: 'AI-Powered Horoscopes',
        online: 'Online Now',
    },
    promo: {
        offer: 'LIMITED OFFER: 50% OFF all horoscopes!',
        delivery: 'Instant delivery to your email',
        customers: '50,000+ happy customers',
        secure: 'Secure payment with Stripe',
    },
    hero: {
        title: 'Your Personal Horoscope',
        subtitle: 'Finally, truly accurate horoscope • Created specially for you',
        features: '✨ Instant delivery • 🔒 Secure payments • ⭐ 50,000+ satisfied customers',
    },
    products: {
        daily: {
            name: 'Daily Horoscope',
            description: 'Your personal daily horoscope with detailed predictions for the next 24 hours',
            wordCount: '~200 words',
            benefits: ['🍀 Lucky number', '📅 Best time', '💎 Recommended color', '⭐ Daily advice'],
        },
        weekly: {
            name: 'Weekly Horoscope',
            description: 'Comprehensive overview of your week with important dates and recommendations',
            wordCount: '~400 words',
            benefits: ['🎯 Lucky day', '💰 Financial forecast', '❤️ Love & relationships', '💼 Career advice'],
        },
        monthly: {
            name: 'Monthly Horoscope',
            description: 'Detailed monthly analysis with key events and opportunities',
            wordCount: '~1000 words',
            benefits: ['🌟 Best day of month', '💎 Lucky stones', '🌈 Energy waves', '🎨 Colors of luck'],
        },
        partner: {
            name: 'Partner Horoscope',
            description: 'Deep analysis of your relationship and compatibility through synastry',
            wordCount: '~1200 words',
            benefits: ['💕 Compatibility score', '🔮 Relationship strengths', '⚠️ Growth areas', '💫 Shared future'],
        },
    },
    cta: {
        orderNow: 'Order Now',
        popular: 'Most Popular',
    },
    trust: {
        customers: 'Satisfied customers',
        rating: 'Average rating',
        delivery: 'Instant delivery',
    },
    testimonials: {
        title: 'What Our Clients Say',
    },
    whyUs: {
        title: 'Why Choose Astralo?',
        technology: { title: 'Advanced Technology', description: 'State-of-the-art technology for accurate predictions' },
        instant: { title: 'Instant', description: 'Your horoscope ready within minutes' },
        professional: { title: 'Professional', description: 'Created according to astrological principles' },
        verified: { title: 'Verified', description: '50,000+ satisfied customers' },
    },
    form: {
        title: 'Get Your Horoscope',
        name: 'Full Name',
        email: 'Email Address',
        birthDate: 'Date of Birth',
        birthTime: 'Time of Birth (optional)',
        birthPlace: 'Place of Birth',
        partnerName: "Partner's Name",
        partnerBirthDate: "Partner's Date of Birth",
        partnerBirthTime: "Partner's Time of Birth (optional)",
        partnerBirthPlace: "Partner's Place of Birth",
        submit: 'Continue to Payment',
        processing: 'Processing...',
    },
    success: {
        title: 'Thank You!',
        message: 'Your payment was successful.',
        checkEmail: 'Your personalized horoscope will be sent to your email shortly.',
    },
    footer: {
        rights: 'All rights reserved.',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        refund: 'Refund Policy',
        cookies: 'Cookie Policy',
    },
};

// Slovak translations (placeholder - to be filled)
const skTranslations: Translations = {
    meta: {
        title: 'Astralo - Profesionálne Horoskopy | Presné Astrologické Predpovede',
        description: 'Získajte personalizovaný horoskop vytvorený pokročilou AI technológiou. Presné predpovede pre denný, týždenný, mesačný a partnerský horoskop.',
        keywords: 'horoskop, astrológia, znamenie, predpovede, personalizovaný horoskop, AI horoskop',
    },
    header: {
        badge: 'AI Horoskopy',
        online: 'Online',
    },
    promo: {
        offer: 'LIMITOVANÁ PONUKA: 50% ZĽAVA na všetky horoskopy!',
        delivery: 'Okamžité doručenie na email',
        customers: '50 000+ spokojných zákazníkov',
        secure: 'Bezpečná platba cez Stripe',
    },
    hero: {
        title: 'Váš Osobný Horoskop',
        subtitle: 'Konečne skutočne presný horoskop • Vytvorený špeciálne pre vás',
        features: '✨ Okamžité doručenie • 🔒 Bezpečné platby • ⭐ 50 000+ spokojných zákazníkov',
    },
    products: {
        daily: {
            name: 'Denný Horoskop',
            description: 'Váš osobný denný horoskop s detailnými predpoveďami na najbližších 24 hodín',
            wordCount: '~200 slov',
            benefits: ['🍀 Šťastné číslo', '📅 Najlepší čas', '💎 Odporúčaná farba', '⭐ Denná rada'],
        },
        weekly: {
            name: 'Týždenný Horoskop',
            description: 'Komplexný prehľad vášho týždňa s dôležitými dátumami a odporúčaniami',
            wordCount: '~400 slov',
            benefits: ['🎯 Šťastný deň', '💰 Finančná predpoveď', '❤️ Láska a vzťahy', '💼 Kariérna rada'],
        },
        monthly: {
            name: 'Mesačný Horoskop',
            description: 'Detailná mesačná analýza s kľúčovými udalosťami a príležitosťami',
            wordCount: '~1000 slov',
            benefits: ['🌟 Najlepší deň mesiaca', '💎 Šťastné kamene', '🌈 Energetické vlny', '🎨 Farby šťastia'],
        },
        partner: {
            name: 'Partnerský Horoskop',
            description: 'Hlboká analýza vášho vzťahu a kompatibility prostredníctvom synastrie',
            wordCount: '~1200 slov',
            benefits: ['💕 Skóre kompatibility', '🔮 Silné stránky vzťahu', '⚠️ Oblasti rastu', '💫 Spoločná budúcnosť'],
        },
    },
    cta: {
        orderNow: 'Objednať',
        popular: 'Najpopulárnejší',
    },
    trust: {
        customers: 'Spokojných zákazníkov',
        rating: 'Priemerné hodnotenie',
        delivery: 'Okamžité doručenie',
    },
    testimonials: {
        title: 'Čo hovoria naši klienti',
    },
    whyUs: {
        title: 'Prečo si vybrať Astralo?',
        technology: { title: 'Pokročilá Technológia', description: 'Najmodernejšia technológia pre presné predpovede' },
        instant: { title: 'Okamžité', description: 'Váš horoskop pripravený do niekoľkých minút' },
        professional: { title: 'Profesionálne', description: 'Vytvorené podľa astrologických princípov' },
        verified: { title: 'Overené', description: '50 000+ spokojných zákazníkov' },
    },
    form: {
        title: 'Získajte svoj horoskop',
        name: 'Celé meno',
        email: 'E-mailová adresa',
        birthDate: 'Dátum narodenia',
        birthTime: 'Čas narodenia (voliteľné)',
        birthPlace: 'Miesto narodenia',
        partnerName: 'Meno partnera/partnerky',
        partnerBirthDate: 'Dátum narodenia partnera/partnerky',
        partnerBirthTime: 'Čas narodenia partnera/partnerky (voliteľné)',
        partnerBirthPlace: 'Miesto narodenia partnera/partnerky',
        submit: 'Pokračovať k platbe',
        processing: 'Spracovávam...',
    },
    success: {
        title: 'Ďakujeme!',
        message: 'Vaša platba bola úspešná.',
        checkEmail: 'Váš personalizovaný horoskop bude čoskoro odoslaný na váš email.',
    },
    footer: {
        rights: 'Všetky práva vyhradené.',
        terms: 'Obchodné podmienky',
        privacy: 'Ochrana súkromia',
        refund: 'Podmienky vrátenia',
        cookies: 'Cookies',
    },
};

// All translations map (other languages to be added)
const translations: Record<SupportedLocale, Translations> = {
    en: enTranslations,
    sk: skTranslations,
    // Other languages will use English as fallback until translated
    cs: enTranslations,
    de: enTranslations,
    fr: enTranslations,
    es: enTranslations,
    it: enTranslations,
    pt: enTranslations,
    nl: enTranslations,
    pl: enTranslations,
    hu: enTranslations,
    ro: enTranslations,
    bg: enTranslations,
    hr: enTranslations,
    sl: enTranslations,
    sr: enTranslations,
    uk: enTranslations,
    ru: enTranslations,
    el: enTranslations,
    tr: enTranslations,
    ar: enTranslations,
    hi: enTranslations,
    ja: enTranslations,
    ko: enTranslations,
    zh: enTranslations,
    th: enTranslations,
    vi: enTranslations,
    id: enTranslations,
    sv: enTranslations,
    da: enTranslations,
    fi: enTranslations,
    no: enTranslations,
    bn: enTranslations,
};

export { translations };
