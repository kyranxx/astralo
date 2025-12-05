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

// Czech translations
const csTranslations: Translations = {
    meta: {
        title: 'Astralo - Profesionální Horoskopy | Přesné Astrologické Předpovědi',
        description: 'Získejte personalizovaný horoskop vytvořený pokročilou AI technologií. Přesné předpovědi pro denní, týdenní, měsíční a partnerský horoskop.',
        keywords: 'horoskop, astrologie, znamení, předpovědi, personalizovaný horoskop, AI horoskop',
    },
    header: {
        badge: 'AI Horoskopy',
        online: 'Online',
    },
    promo: {
        offer: 'LIMITOVANÁ NABÍDKA: 50% SLEVA na všechny horoskopy!',
        delivery: 'Okamžité doručení na email',
        customers: '50 000+ spokojených zákazníků',
        secure: 'Bezpečná platba přes Stripe',
    },
    hero: {
        title: 'Váš Osobní Horoskop',
        subtitle: 'Konečně skutečně přesný horoskop • Vytvořený speciálně pro vás',
        features: '✨ Okamžité doručení • 🔒 Bezpečné platby • ⭐ 50 000+ spokojených zákazníků',
    },
    products: {
        daily: {
            name: 'Denní Horoskop',
            description: 'Váš osobní denní horoskop s detailními předpověďmi na příštích 24 hodin',
            wordCount: '~200 slov',
            benefits: ['🍀 Šťastné číslo', '📅 Nejlepší čas', '💎 Doporučená barva', '⭐ Denní rada'],
        },
        weekly: {
            name: 'Týdenní Horoskop',
            description: 'Komplexní přehled vašeho týdne s důležitými daty a doporučeními',
            wordCount: '~400 slov',
            benefits: ['🎯 Šťastný den', '💰 Finanční předpověď', '❤️ Láska a vztahy', '💼 Kariérní rada'],
        },
        monthly: {
            name: 'Měsíční Horoskop',
            description: 'Detailní měsíční analýza s klíčovými událostmi a příležitostmi',
            wordCount: '~1000 slov',
            benefits: ['🌟 Nejlepší den měsíce', '💎 Šťastné kameny', '🌈 Energetické vlny', '🎨 Barvy štěstí'],
        },
        partner: {
            name: 'Partnerský Horoskop',
            description: 'Hluboká analýza vašeho vztahu a kompatibility prostřednictvím synastrie',
            wordCount: '~1200 slov',
            benefits: ['💕 Skóre kompatibility', '🔮 Silné stránky vztahu', '⚠️ Oblasti růstu', '💫 Společná budoucnost'],
        },
    },
    cta: {
        orderNow: 'Objednat',
        popular: 'Nejpopulárnější',
    },
    trust: {
        customers: 'Spokojených zákazníků',
        rating: 'Průměrné hodnocení',
        delivery: 'Okamžité doručení',
    },
    testimonials: {
        title: 'Co říkají naši klienti',
    },
    whyUs: {
        title: 'Proč zvolit Astralo?',
        technology: { title: 'Pokročilá Technologie', description: 'Nejmodernější technologie pro přesné předpovědi' },
        instant: { title: 'Okamžité', description: 'Váš horoskop připravený během několika minut' },
        professional: { title: 'Profesionální', description: 'Vytvořené podle astrologických principů' },
        verified: { title: 'Ověřené', description: '50 000+ spokojených zákazníků' },
    },
    form: {
        title: 'Získejte svůj horoskop',
        name: 'Celé jméno',
        email: 'E-mailová adresa',
        birthDate: 'Datum narození',
        birthTime: 'Čas narození (volitelné)',
        birthPlace: 'Místo narození',
        partnerName: 'Jméno partnera/partnerky',
        partnerBirthDate: 'Datum narození partnera/partnerky',
        partnerBirthTime: 'Čas narození partnera/partnerky (volitelné)',
        partnerBirthPlace: 'Místo narození partnera/partnerky',
        submit: 'Pokračovat k platbě',
        processing: 'Zpracovávám...',
    },
    success: {
        title: 'Děkujeme!',
        message: 'Vaše platba byla úspěšná.',
        checkEmail: 'Váš personalizovaný horoskop bude brzy odeslán na váš email.',
    },
    footer: {
        rights: 'Všechna práva vyhrazena.',
        terms: 'Obchodní podmínky',
        privacy: 'Ochrana soukromí',
        refund: 'Podmínky vrácení',
        cookies: 'Cookies',
    },
};

// German translations
const deTranslations: Translations = {
    meta: {
        title: 'Astralo - Professionelle Horoskope | Genaue Astrologische Vorhersagen',
        description: 'Erhalten Sie Ihr personalisiertes Horoskop mit fortschrittlicher KI-Technologie. Genaue Vorhersagen für tägliche, wöchentliche, monatliche und Partner-Horoskope.',
        keywords: 'Horoskop, Astrologie, Sternzeichen, Vorhersagen, personalisiertes Horoskop, KI Horoskop',
    },
    header: {
        badge: 'KI-Horoskope',
        online: 'Online',
    },
    promo: {
        offer: 'LIMITIERTES ANGEBOT: 50% RABATT auf alle Horoskope!',
        delivery: 'Sofortige Lieferung per Email',
        customers: '50.000+ zufriedene Kunden',
        secure: 'Sichere Zahlung mit Stripe',
    },
    hero: {
        title: 'Ihr Persönliches Horoskop',
        subtitle: 'Endlich ein wirklich genaues Horoskop • Speziell für Sie erstellt',
        features: '✨ Sofortige Lieferung • 🔒 Sichere Zahlungen • ⭐ 50.000+ zufriedene Kunden',
    },
    products: {
        daily: {
            name: 'Tageshoroskop',
            description: 'Ihr persönliches Tageshoroskop mit detaillierten Vorhersagen für die nächsten 24 Stunden',
            wordCount: '~200 Wörter',
            benefits: ['🍀 Glückszahl', '📅 Beste Zeit', '💎 Empfohlene Farbe', '⭐ Täglicher Rat'],
        },
        weekly: {
            name: 'Wochenhoroskop',
            description: 'Umfassender Überblick über Ihre Woche mit wichtigen Terminen und Empfehlungen',
            wordCount: '~400 Wörter',
            benefits: ['🎯 Glückstag', '💰 Finanzvorhersage', '❤️ Liebe & Beziehungen', '💼 Karriere-Rat'],
        },
        monthly: {
            name: 'Monatshoroskop',
            description: 'Detaillierte Monatsanalyse mit wichtigen Ereignissen und Chancen',
            wordCount: '~1000 Wörter',
            benefits: ['🌟 Bester Tag des Monats', '💎 Glückssteine', '🌈 Energiewellen', '🎨 Glücksfarben'],
        },
        partner: {
            name: 'Partnerhoroskop',
            description: 'Tiefe Analyse Ihrer Beziehung und Kompatibilität durch Synastrie',
            wordCount: '~1200 Wörter',
            benefits: ['💕 Kompatibilitätswert', '🔮 Beziehungsstärken', '⚠️ Wachstumsbereiche', '💫 Gemeinsame Zukunft'],
        },
    },
    cta: {
        orderNow: 'Jetzt Bestellen',
        popular: 'Am Beliebtesten',
    },
    trust: {
        customers: 'Zufriedene Kunden',
        rating: 'Durchschnittliche Bewertung',
        delivery: 'Sofortige Lieferung',
    },
    testimonials: {
        title: 'Was unsere Kunden sagen',
    },
    whyUs: {
        title: 'Warum Astralo wählen?',
        technology: { title: 'Fortschrittliche Technologie', description: 'Modernste Technologie für präzise Vorhersagen' },
        instant: { title: 'Sofort', description: 'Ihr Horoskop in wenigen Minuten bereit' },
        professional: { title: 'Professionell', description: 'Nach astrologischen Prinzipien erstellt' },
        verified: { title: 'Verifiziert', description: '50.000+ zufriedene Kunden' },
    },
    form: {
        title: 'Holen Sie sich Ihr Horoskop',
        name: 'Vollständiger Name',
        email: 'E-Mail-Adresse',
        birthDate: 'Geburtsdatum',
        birthTime: 'Geburtszeit (optional)',
        birthPlace: 'Geburtsort',
        partnerName: 'Name des Partners',
        partnerBirthDate: 'Geburtsdatum des Partners',
        partnerBirthTime: 'Geburtszeit des Partners (optional)',
        partnerBirthPlace: 'Geburtsort des Partners',
        submit: 'Weiter zur Zahlung',
        processing: 'Verarbeitung...',
    },
    success: {
        title: 'Vielen Dank!',
        message: 'Ihre Zahlung war erfolgreich.',
        checkEmail: 'Ihr personalisiertes Horoskop wird in Kürze an Ihre E-Mail gesendet.',
    },
    footer: {
        rights: 'Alle Rechte vorbehalten.',
        terms: 'Nutzungsbedingungen',
        privacy: 'Datenschutz',
        refund: 'Rückerstattungsrichtlinie',
        cookies: 'Cookie-Richtlinie',
    },
};

// French translations
const frTranslations: Translations = {
    meta: {
        title: 'Astralo - Horoscopes Professionnels | Prédictions Astrologiques Précises',
        description: 'Obtenez votre horoscope personnalisé créé avec une technologie IA avancée. Prédictions précises pour horoscopes quotidiens, hebdomadaires, mensuels et de couple.',
        keywords: 'horoscope, astrologie, zodiaque, prédictions, horoscope personnalisé, horoscope IA',
    },
    header: {
        badge: 'Horoscopes IA',
        online: 'En ligne',
    },
    promo: {
        offer: 'OFFRE LIMITÉE: 50% de réduction sur tous les horoscopes!',
        delivery: 'Livraison instantanée par email',
        customers: '50 000+ clients satisfaits',
        secure: 'Paiement sécurisé via Stripe',
    },
    hero: {
        title: 'Votre Horoscope Personnel',
        subtitle: 'Enfin un horoscope vraiment précis • Créé spécialement pour vous',
        features: '✨ Livraison instantanée • 🔒 Paiements sécurisés • ⭐ 50 000+ clients satisfaits',
    },
    products: {
        daily: {
            name: 'Horoscope Quotidien',
            description: 'Votre horoscope quotidien personnel avec des prédictions détaillées pour les 24 prochaines heures',
            wordCount: '~200 mots',
            benefits: ['🍀 Numéro chanceux', '📅 Meilleur moment', '💎 Couleur recommandée', '⭐ Conseil du jour'],
        },
        weekly: {
            name: 'Horoscope Hebdomadaire',
            description: 'Aperçu complet de votre semaine avec dates importantes et recommandations',
            wordCount: '~400 mots',
            benefits: ['🎯 Jour de chance', '💰 Prévisions financières', '❤️ Amour & relations', '💼 Conseils carrière'],
        },
        monthly: {
            name: 'Horoscope Mensuel',
            description: 'Analyse mensuelle détaillée avec événements clés et opportunités',
            wordCount: '~1000 mots',
            benefits: ['🌟 Meilleur jour du mois', '💎 Pierres porte-bonheur', '🌈 Vagues d\'énergie', '🎨 Couleurs de chance'],
        },
        partner: {
            name: 'Horoscope de Couple',
            description: 'Analyse approfondie de votre relation et compatibilité par synastrie',
            wordCount: '~1200 mots',
            benefits: ['💕 Score de compatibilité', '🔮 Forces du couple', '⚠️ Axes d\'amélioration', '💫 Avenir commun'],
        },
    },
    cta: {
        orderNow: 'Commander',
        popular: 'Le Plus Populaire',
    },
    trust: {
        customers: 'Clients satisfaits',
        rating: 'Note moyenne',
        delivery: 'Livraison instantanée',
    },
    testimonials: {
        title: 'Ce que disent nos clients',
    },
    whyUs: {
        title: 'Pourquoi choisir Astralo?',
        technology: { title: 'Technologie Avancée', description: 'Technologie de pointe pour des prédictions précises' },
        instant: { title: 'Instantané', description: 'Votre horoscope prêt en quelques minutes' },
        professional: { title: 'Professionnel', description: 'Créé selon les principes astrologiques' },
        verified: { title: 'Vérifié', description: '50 000+ clients satisfaits' },
    },
    form: {
        title: 'Obtenez votre horoscope',
        name: 'Nom complet',
        email: 'Adresse email',
        birthDate: 'Date de naissance',
        birthTime: 'Heure de naissance (optionnel)',
        birthPlace: 'Lieu de naissance',
        partnerName: 'Nom du partenaire',
        partnerBirthDate: 'Date de naissance du partenaire',
        partnerBirthTime: 'Heure de naissance du partenaire (optionnel)',
        partnerBirthPlace: 'Lieu de naissance du partenaire',
        submit: 'Continuer vers le paiement',
        processing: 'Traitement...',
    },
    success: {
        title: 'Merci!',
        message: 'Votre paiement a été effectué avec succès.',
        checkEmail: 'Votre horoscope personnalisé sera envoyé à votre email sous peu.',
    },
    footer: {
        rights: 'Tous droits réservés.',
        terms: 'Conditions générales',
        privacy: 'Politique de confidentialité',
        refund: 'Politique de remboursement',
        cookies: 'Politique des cookies',
    },
};

// Spanish translations
const esTranslations: Translations = {
    meta: {
        title: 'Astralo - Horóscopos Profesionales | Predicciones Astrológicas Precisas',
        description: 'Obtén tu horóscopo personalizado creado con tecnología IA avanzada. Predicciones precisas para horóscopos diarios, semanales, mensuales y de pareja.',
        keywords: 'horóscopo, astrología, zodiaco, predicciones, horóscopo personalizado, horóscopo IA',
    },
    header: {
        badge: 'Horóscopos IA',
        online: 'En línea',
    },
    promo: {
        offer: '¡OFERTA LIMITADA: 50% de descuento en todos los horóscopos!',
        delivery: 'Entrega instantánea por email',
        customers: '50,000+ clientes satisfechos',
        secure: 'Pago seguro con Stripe',
    },
    hero: {
        title: 'Tu Horóscopo Personal',
        subtitle: 'Por fin un horóscopo realmente preciso • Creado especialmente para ti',
        features: '✨ Entrega instantánea • 🔒 Pagos seguros • ⭐ 50,000+ clientes satisfechos',
    },
    products: {
        daily: {
            name: 'Horóscopo Diario',
            description: 'Tu horóscopo diario personal con predicciones detalladas para las próximas 24 horas',
            wordCount: '~200 palabras',
            benefits: ['🍀 Número de la suerte', '📅 Mejor momento', '💎 Color recomendado', '⭐ Consejo del día'],
        },
        weekly: {
            name: 'Horóscopo Semanal',
            description: 'Visión completa de tu semana con fechas importantes y recomendaciones',
            wordCount: '~400 palabras',
            benefits: ['🎯 Día de suerte', '💰 Pronóstico financiero', '❤️ Amor y relaciones', '💼 Consejos de carrera'],
        },
        monthly: {
            name: 'Horóscopo Mensual',
            description: 'Análisis mensual detallado con eventos clave y oportunidades',
            wordCount: '~1000 palabras',
            benefits: ['🌟 Mejor día del mes', '💎 Piedras de la suerte', '🌈 Ondas de energía', '🎨 Colores de la suerte'],
        },
        partner: {
            name: 'Horóscopo de Pareja',
            description: 'Análisis profundo de tu relación y compatibilidad a través de sinastría',
            wordCount: '~1200 palabras',
            benefits: ['💕 Puntuación de compatibilidad', '🔮 Fortalezas de la relación', '⚠️ Áreas de crecimiento', '💫 Futuro compartido'],
        },
    },
    cta: {
        orderNow: 'Pedir Ahora',
        popular: 'Más Popular',
    },
    trust: {
        customers: 'Clientes satisfechos',
        rating: 'Calificación promedio',
        delivery: 'Entrega instantánea',
    },
    testimonials: {
        title: 'Lo que dicen nuestros clientes',
    },
    whyUs: {
        title: '¿Por qué elegir Astralo?',
        technology: { title: 'Tecnología Avanzada', description: 'Tecnología de vanguardia para predicciones precisas' },
        instant: { title: 'Instantáneo', description: 'Tu horóscopo listo en minutos' },
        professional: { title: 'Profesional', description: 'Creado según principios astrológicos' },
        verified: { title: 'Verificado', description: '50,000+ clientes satisfechos' },
    },
    form: {
        title: 'Obtén tu horóscopo',
        name: 'Nombre completo',
        email: 'Correo electrónico',
        birthDate: 'Fecha de nacimiento',
        birthTime: 'Hora de nacimiento (opcional)',
        birthPlace: 'Lugar de nacimiento',
        partnerName: 'Nombre de la pareja',
        partnerBirthDate: 'Fecha de nacimiento de la pareja',
        partnerBirthTime: 'Hora de nacimiento de la pareja (opcional)',
        partnerBirthPlace: 'Lugar de nacimiento de la pareja',
        submit: 'Continuar al pago',
        processing: 'Procesando...',
    },
    success: {
        title: '¡Gracias!',
        message: 'Tu pago fue exitoso.',
        checkEmail: 'Tu horóscopo personalizado será enviado a tu email pronto.',
    },
    footer: {
        rights: 'Todos los derechos reservados.',
        terms: 'Términos de servicio',
        privacy: 'Política de privacidad',
        refund: 'Política de reembolso',
        cookies: 'Política de cookies',
    },
};

// Italian translations
const itTranslations: Translations = {
    meta: {
        title: 'Astralo - Oroscopi Professionali | Previsioni Astrologiche Accurate',
        description: 'Ottieni il tuo oroscopo personalizzato creato con tecnologia IA avanzata. Previsioni accurate per oroscopi giornalieri, settimanali, mensili e di coppia.',
        keywords: 'oroscopo, astrologia, zodiaco, previsioni, oroscopo personalizzato, oroscopo IA',
    },
    header: {
        badge: 'Oroscopi IA',
        online: 'Online',
    },
    promo: {
        offer: 'OFFERTA LIMITATA: 50% di sconto su tutti gli oroscopi!',
        delivery: 'Consegna istantanea via email',
        customers: '50.000+ clienti soddisfatti',
        secure: 'Pagamento sicuro con Stripe',
    },
    hero: {
        title: 'Il Tuo Oroscopo Personale',
        subtitle: 'Finalmente un oroscopo davvero accurato • Creato appositamente per te',
        features: '✨ Consegna istantanea • 🔒 Pagamenti sicuri • ⭐ 50.000+ clienti soddisfatti',
    },
    products: {
        daily: {
            name: 'Oroscopo Giornaliero',
            description: 'Il tuo oroscopo giornaliero personale con previsioni dettagliate per le prossime 24 ore',
            wordCount: '~200 parole',
            benefits: ['🍀 Numero fortunato', '📅 Momento migliore', '💎 Colore consigliato', '⭐ Consiglio del giorno'],
        },
        weekly: {
            name: 'Oroscopo Settimanale',
            description: 'Panoramica completa della tua settimana con date importanti e raccomandazioni',
            wordCount: '~400 parole',
            benefits: ['🎯 Giorno fortunato', '💰 Previsioni finanziarie', '❤️ Amore e relazioni', '💼 Consigli di carriera'],
        },
        monthly: {
            name: 'Oroscopo Mensile',
            description: 'Analisi mensile dettagliata con eventi chiave e opportunità',
            wordCount: '~1000 parole',
            benefits: ['🌟 Miglior giorno del mese', '💎 Pietre fortunate', '🌈 Onde di energia', '🎨 Colori della fortuna'],
        },
        partner: {
            name: 'Oroscopo di Coppia',
            description: 'Analisi approfondita della tua relazione e compatibilità attraverso la sinastria',
            wordCount: '~1200 parole',
            benefits: ['💕 Punteggio compatibilità', '🔮 Punti di forza della relazione', '⚠️ Aree di crescita', '💫 Futuro condiviso'],
        },
    },
    cta: {
        orderNow: 'Ordina Ora',
        popular: 'Il Più Popolare',
    },
    trust: {
        customers: 'Clienti soddisfatti',
        rating: 'Valutazione media',
        delivery: 'Consegna istantanea',
    },
    testimonials: {
        title: 'Cosa dicono i nostri clienti',
    },
    whyUs: {
        title: 'Perché scegliere Astralo?',
        technology: { title: 'Tecnologia Avanzata', description: 'Tecnologia all\'avanguardia per previsioni accurate' },
        instant: { title: 'Istantaneo', description: 'Il tuo oroscopo pronto in pochi minuti' },
        professional: { title: 'Professionale', description: 'Creato secondo i principi astrologici' },
        verified: { title: 'Verificato', description: '50.000+ clienti soddisfatti' },
    },
    form: {
        title: 'Ottieni il tuo oroscopo',
        name: 'Nome completo',
        email: 'Indirizzo email',
        birthDate: 'Data di nascita',
        birthTime: 'Ora di nascita (opzionale)',
        birthPlace: 'Luogo di nascita',
        partnerName: 'Nome del partner',
        partnerBirthDate: 'Data di nascita del partner',
        partnerBirthTime: 'Ora di nascita del partner (opzionale)',
        partnerBirthPlace: 'Luogo di nascita del partner',
        submit: 'Continua al pagamento',
        processing: 'Elaborazione...',
    },
    success: {
        title: 'Grazie!',
        message: 'Il tuo pagamento è andato a buon fine.',
        checkEmail: 'Il tuo oroscopo personalizzato sarà inviato alla tua email a breve.',
    },
    footer: {
        rights: 'Tutti i diritti riservati.',
        terms: 'Termini di servizio',
        privacy: 'Privacy Policy',
        refund: 'Politica di rimborso',
        cookies: 'Politica sui cookie',
    },
};

// Portuguese translations
const ptTranslations: Translations = {
    meta: {
        title: 'Astralo - Horóscopos Profissionais | Previsões Astrológicas Precisas',
        description: 'Obtenha o seu horóscopo personalizado criado com tecnologia IA avançada. Previsões precisas para horóscopos diários, semanais, mensais e de casal.',
        keywords: 'horóscopo, astrologia, zodíaco, previsões, horóscopo personalizado, horóscopo IA',
    },
    header: {
        badge: 'Horóscopos IA',
        online: 'Online',
    },
    promo: {
        offer: 'OFERTA LIMITADA: 50% de desconto em todos os horóscopos!',
        delivery: 'Entrega instantânea por email',
        customers: '50.000+ clientes satisfeitos',
        secure: 'Pagamento seguro com Stripe',
    },
    hero: {
        title: 'O Seu Horóscopo Pessoal',
        subtitle: 'Finalmente um horóscopo verdadeiramente preciso • Criado especialmente para si',
        features: '✨ Entrega instantânea • 🔒 Pagamentos seguros • ⭐ 50.000+ clientes satisfeitos',
    },
    products: {
        daily: {
            name: 'Horóscopo Diário',
            description: 'O seu horóscopo diário pessoal com previsões detalhadas para as próximas 24 horas',
            wordCount: '~200 palavras',
            benefits: ['🍀 Número da sorte', '📅 Melhor momento', '💎 Cor recomendada', '⭐ Conselho do dia'],
        },
        weekly: {
            name: 'Horóscopo Semanal',
            description: 'Visão completa da sua semana com datas importantes e recomendações',
            wordCount: '~400 palavras',
            benefits: ['🎯 Dia de sorte', '💰 Previsão financeira', '❤️ Amor e relações', '💼 Conselhos de carreira'],
        },
        monthly: {
            name: 'Horóscopo Mensal',
            description: 'Análise mensal detalhada com eventos-chave e oportunidades',
            wordCount: '~1000 palavras',
            benefits: ['🌟 Melhor dia do mês', '💎 Pedras da sorte', '🌈 Ondas de energia', '🎨 Cores da sorte'],
        },
        partner: {
            name: 'Horóscopo de Casal',
            description: 'Análise profunda da sua relação e compatibilidade através de sinastria',
            wordCount: '~1200 palavras',
            benefits: ['💕 Pontuação de compatibilidade', '🔮 Forças da relação', '⚠️ Áreas de crescimento', '💫 Futuro compartilhado'],
        },
    },
    cta: {
        orderNow: 'Encomendar Agora',
        popular: 'Mais Popular',
    },
    trust: {
        customers: 'Clientes satisfeitos',
        rating: 'Classificação média',
        delivery: 'Entrega instantânea',
    },
    testimonials: {
        title: 'O que dizem os nossos clientes',
    },
    whyUs: {
        title: 'Porquê escolher Astralo?',
        technology: { title: 'Tecnologia Avançada', description: 'Tecnologia de ponta para previsões precisas' },
        instant: { title: 'Instantâneo', description: 'O seu horóscopo pronto em minutos' },
        professional: { title: 'Profissional', description: 'Criado segundo princípios astrológicos' },
        verified: { title: 'Verificado', description: '50.000+ clientes satisfeitos' },
    },
    form: {
        title: 'Obtenha o seu horóscopo',
        name: 'Nome completo',
        email: 'Endereço de email',
        birthDate: 'Data de nascimento',
        birthTime: 'Hora de nascimento (opcional)',
        birthPlace: 'Local de nascimento',
        partnerName: 'Nome do(a) parceiro(a)',
        partnerBirthDate: 'Data de nascimento do(a) parceiro(a)',
        partnerBirthTime: 'Hora de nascimento do(a) parceiro(a) (opcional)',
        partnerBirthPlace: 'Local de nascimento do(a) parceiro(a)',
        submit: 'Continuar para pagamento',
        processing: 'A processar...',
    },
    success: {
        title: 'Obrigado!',
        message: 'O seu pagamento foi efetuado com sucesso.',
        checkEmail: 'O seu horóscopo personalizado será enviado para o seu email em breve.',
    },
    footer: {
        rights: 'Todos os direitos reservados.',
        terms: 'Termos de serviço',
        privacy: 'Política de privacidade',
        refund: 'Política de reembolso',
        cookies: 'Política de cookies',
    },
};

// Dutch translations
const nlTranslations: Translations = {
    meta: {
        title: 'Astralo - Professionele Horoscopen | Nauwkeurige Astrologische Voorspellingen',
        description: 'Krijg je gepersonaliseerde horoscoop gemaakt met geavanceerde AI-technologie. Nauwkeurige voorspellingen voor dagelijkse, wekelijkse, maandelijkse en partner horoscopen.',
        keywords: 'horoscoop, astrologie, sterrenbeeld, voorspellingen, gepersonaliseerde horoscoop, AI horoscoop',
    },
    header: {
        badge: 'AI Horoscopen',
        online: 'Online',
    },
    promo: {
        offer: 'BEPERKTE AANBIEDING: 50% korting op alle horoscopen!',
        delivery: 'Directe levering per email',
        customers: '50.000+ tevreden klanten',
        secure: 'Veilige betaling met Stripe',
    },
    hero: {
        title: 'Jouw Persoonlijke Horoscoop',
        subtitle: 'Eindelijk een echt nauwkeurige horoscoop • Speciaal voor jou gemaakt',
        features: '✨ Directe levering • 🔒 Veilige betalingen • ⭐ 50.000+ tevreden klanten',
    },
    products: {
        daily: {
            name: 'Daghoroscoop',
            description: 'Je persoonlijke daghoroscoop met gedetailleerde voorspellingen voor de komende 24 uur',
            wordCount: '~200 woorden',
            benefits: ['🍀 Geluksgetal', '📅 Beste moment', '💎 Aanbevolen kleur', '⭐ Dagelijks advies'],
        },
        weekly: {
            name: 'Weekhoroscoop',
            description: 'Volledig overzicht van je week met belangrijke data en aanbevelingen',
            wordCount: '~400 woorden',
            benefits: ['🎯 Geluksdag', '💰 Financiële voorspelling', '❤️ Liefde & relaties', '💼 Carrière advies'],
        },
        monthly: {
            name: 'Maandhoroscoop',
            description: 'Gedetailleerde maandanalyse met belangrijke gebeurtenissen en kansen',
            wordCount: '~1000 woorden',
            benefits: ['🌟 Beste dag van de maand', '💎 Geluksstenen', '🌈 Energiegolven', '🎨 Gelukskleuren'],
        },
        partner: {
            name: 'Partner Horoscoop',
            description: 'Diepgaande analyse van jullie relatie en compatibiliteit door synastrie',
            wordCount: '~1200 woorden',
            benefits: ['💕 Compatibiliteitsscore', '🔮 Relatiesterren', '⚠️ Groeipunten', '💫 Gedeelde toekomst'],
        },
    },
    cta: {
        orderNow: 'Nu Bestellen',
        popular: 'Meest Populair',
    },
    trust: {
        customers: 'Tevreden klanten',
        rating: 'Gemiddelde beoordeling',
        delivery: 'Directe levering',
    },
    testimonials: {
        title: 'Wat onze klanten zeggen',
    },
    whyUs: {
        title: 'Waarom kiezen voor Astralo?',
        technology: { title: 'Geavanceerde Technologie', description: 'State-of-the-art technologie voor nauwkeurige voorspellingen' },
        instant: { title: 'Direct', description: 'Je horoscoop klaar binnen enkele minuten' },
        professional: { title: 'Professioneel', description: 'Gemaakt volgens astrologische principes' },
        verified: { title: 'Geverifieerd', description: '50.000+ tevreden klanten' },
    },
    form: {
        title: 'Ontvang je horoscoop',
        name: 'Volledige naam',
        email: 'E-mailadres',
        birthDate: 'Geboortedatum',
        birthTime: 'Geboortetijd (optioneel)',
        birthPlace: 'Geboorteplaats',
        partnerName: 'Naam van partner',
        partnerBirthDate: 'Geboortedatum van partner',
        partnerBirthTime: 'Geboortetijd van partner (optioneel)',
        partnerBirthPlace: 'Geboorteplaats van partner',
        submit: 'Doorgaan naar betaling',
        processing: 'Verwerken...',
    },
    success: {
        title: 'Bedankt!',
        message: 'Je betaling is geslaagd.',
        checkEmail: 'Je gepersonaliseerde horoscoop wordt binnenkort naar je email verzonden.',
    },
    footer: {
        rights: 'Alle rechten voorbehouden.',
        terms: 'Algemene voorwaarden',
        privacy: 'Privacybeleid',
        refund: 'Retourbeleid',
        cookies: 'Cookiebeleid',
    },
};

// Polish translations
const plTranslations: Translations = {
    meta: {
        title: 'Astralo - Profesjonalne Horoskopy | Dokładne Prognozy Astrologiczne',
        description: 'Otrzymaj spersonalizowany horoskop stworzony z wykorzystaniem zaawansowanej technologii AI. Dokładne prognozy dla horoskopów dziennych, tygodniowych, miesięcznych i partnerskich.',
        keywords: 'horoskop, astrologia, zodiak, prognozy, spersonalizowany horoskop, horoskop AI',
    },
    header: {
        badge: 'Horoskopy AI',
        online: 'Online',
    },
    promo: {
        offer: 'LIMITOWANA OFERTA: 50% zniżki na wszystkie horoskopy!',
        delivery: 'Natychmiastowa dostawa na email',
        customers: '50 000+ zadowolonych klientów',
        secure: 'Bezpieczna płatność przez Stripe',
    },
    hero: {
        title: 'Twój Osobisty Horoskop',
        subtitle: 'Wreszcie naprawdę dokładny horoskop • Stworzony specjalnie dla Ciebie',
        features: '✨ Natychmiastowa dostawa • 🔒 Bezpieczne płatności • ⭐ 50 000+ zadowolonych klientów',
    },
    products: {
        daily: {
            name: 'Horoskop Dzienny',
            description: 'Twój osobisty horoskop dzienny ze szczegółowymi prognozami na najbliższe 24 godziny',
            wordCount: '~200 słów',
            benefits: ['🍀 Szczęśliwa liczba', '📅 Najlepszy czas', '💎 Zalecany kolor', '⭐ Codzienna rada'],
        },
        weekly: {
            name: 'Horoskop Tygodniowy',
            description: 'Kompleksowy przegląd Twojego tygodnia z ważnymi datami i zaleceniami',
            wordCount: '~400 słów',
            benefits: ['🎯 Szczęśliwy dzień', '💰 Prognoza finansowa', '❤️ Miłość i związki', '💼 Porady kariery'],
        },
        monthly: {
            name: 'Horoskop Miesięczny',
            description: 'Szczegółowa analiza miesięczna z kluczowymi wydarzeniami i możliwościami',
            wordCount: '~1000 słów',
            benefits: ['🌟 Najlepszy dzień miesiąca', '💎 Szczęśliwe kamienie', '🌈 Fale energii', '🎨 Kolory szczęścia'],
        },
        partner: {
            name: 'Horoskop Partnerski',
            description: 'Głęboka analiza Twojego związku i kompatybilności poprzez synastrię',
            wordCount: '~1200 słów',
            benefits: ['💕 Wynik kompatybilności', '🔮 Mocne strony związku', '⚠️ Obszary rozwoju', '💫 Wspólna przyszłość'],
        },
    },
    cta: {
        orderNow: 'Zamów Teraz',
        popular: 'Najpopularniejszy',
    },
    trust: {
        customers: 'Zadowolonych klientów',
        rating: 'Średnia ocena',
        delivery: 'Natychmiastowa dostawa',
    },
    testimonials: {
        title: 'Co mówią nasi klienci',
    },
    whyUs: {
        title: 'Dlaczego wybrać Astralo?',
        technology: { title: 'Zaawansowana Technologia', description: 'Najnowocześniejsza technologia dla dokładnych prognoz' },
        instant: { title: 'Natychmiast', description: 'Twój horoskop gotowy w kilka minut' },
        professional: { title: 'Profesjonalnie', description: 'Stworzony zgodnie z zasadami astrologii' },
        verified: { title: 'Zweryfikowane', description: '50 000+ zadowolonych klientów' },
    },
    form: {
        title: 'Otrzymaj swój horoskop',
        name: 'Imię i nazwisko',
        email: 'Adres email',
        birthDate: 'Data urodzenia',
        birthTime: 'Godzina urodzenia (opcjonalnie)',
        birthPlace: 'Miejsce urodzenia',
        partnerName: 'Imię partnera/partnerki',
        partnerBirthDate: 'Data urodzenia partnera/partnerki',
        partnerBirthTime: 'Godzina urodzenia partnera/partnerki (opcjonalnie)',
        partnerBirthPlace: 'Miejsce urodzenia partnera/partnerki',
        submit: 'Przejdź do płatności',
        processing: 'Przetwarzanie...',
    },
    success: {
        title: 'Dziękujemy!',
        message: 'Twoja płatność została zrealizowana.',
        checkEmail: 'Twój spersonalizowany horoskop zostanie wkrótce wysłany na Twój email.',
    },
    footer: {
        rights: 'Wszelkie prawa zastrzeżone.',
        terms: 'Regulamin',
        privacy: 'Polityka prywatności',
        refund: 'Polityka zwrotów',
        cookies: 'Polityka cookies',
    },
};

// Hungarian translations
const huTranslations: Translations = {
    meta: {
        title: 'Astralo - Professzionális Horoszkópok | Pontos Asztrológiai Előrejelzések',
        description: 'Kapja meg személyre szabott horoszkópját fejlett AI technológiával. Pontos előrejelzések napi, heti, havi és partner horoszkópokhoz.',
        keywords: 'horoszkóp, asztrológia, csillagjegy, előrejelzések, személyre szabott horoszkóp, AI horoszkóp',
    },
    header: {
        badge: 'AI Horoszkópok',
        online: 'Online',
    },
    promo: {
        offer: 'LIMITÁLT AJÁNLAT: 50% kedvezmény minden horoszkópra!',
        delivery: 'Azonnali kézbesítés emailben',
        customers: '50 000+ elégedett ügyfél',
        secure: 'Biztonságos fizetés Stripe-pal',
    },
    hero: {
        title: 'Az Ön Személyes Horoszkópja',
        subtitle: 'Végre egy igazán pontos horoszkóp • Kifejezetten Önnek készítve',
        features: '✨ Azonnali kézbesítés • 🔒 Biztonságos fizetés • ⭐ 50 000+ elégedett ügyfél',
    },
    products: {
        daily: {
            name: 'Napi Horoszkóp',
            description: 'Személyes napi horoszkópja részletes előrejelzésekkel a következő 24 órára',
            wordCount: '~200 szó',
            benefits: ['🍀 Szerencseszám', '📅 Legjobb időpont', '💎 Ajánlott szín', '⭐ Napi tanács'],
        },
        weekly: {
            name: 'Heti Horoszkóp',
            description: 'Átfogó áttekintés hetéről fontos dátumokkal és ajánlásokkal',
            wordCount: '~400 szó',
            benefits: ['🎯 Szerencsenap', '💰 Pénzügyi előrejelzés', '❤️ Szerelem és kapcsolatok', '💼 Karrier tanácsok'],
        },
        monthly: {
            name: 'Havi Horoszkóp',
            description: 'Részletes havi elemzés kulcsfontosságú eseményekkel és lehetőségekkel',
            wordCount: '~1000 szó',
            benefits: ['🌟 A hónap legjobb napja', '💎 Szerencsekövek', '🌈 Energia hullámok', '🎨 Szerencseszínek'],
        },
        partner: {
            name: 'Partner Horoszkóp',
            description: 'Kapcsolatának és kompatibilitásának mélyreható elemzése szinasztria által',
            wordCount: '~1200 szó',
            benefits: ['💕 Kompatibilitási pontszám', '🔮 Kapcsolati erősségek', '⚠️ Fejlődési területek', '💫 Közös jövő'],
        },
    },
    cta: {
        orderNow: 'Rendelje Meg',
        popular: 'Legnépszerűbb',
    },
    trust: {
        customers: 'Elégedett ügyfél',
        rating: 'Átlagos értékelés',
        delivery: 'Azonnali kézbesítés',
    },
    testimonials: {
        title: 'Mit mondanak ügyfeleink',
    },
    whyUs: {
        title: 'Miért válassza az Astralót?',
        technology: { title: 'Fejlett Technológia', description: 'A legmodernebb technológia pontos előrejelzésekhez' },
        instant: { title: 'Azonnali', description: 'Horoszkópja percek alatt elkészül' },
        professional: { title: 'Professzionális', description: 'Asztrológiai elvek szerint készült' },
        verified: { title: 'Ellenőrzött', description: '50 000+ elégedett ügyfél' },
    },
    form: {
        title: 'Kapja meg horoszkópját',
        name: 'Teljes név',
        email: 'Email cím',
        birthDate: 'Születési dátum',
        birthTime: 'Születési idő (opcionális)',
        birthPlace: 'Születési hely',
        partnerName: 'Partner neve',
        partnerBirthDate: 'Partner születési dátuma',
        partnerBirthTime: 'Partner születési ideje (opcionális)',
        partnerBirthPlace: 'Partner születési helye',
        submit: 'Tovább a fizetéshez',
        processing: 'Feldolgozás...',
    },
    success: {
        title: 'Köszönjük!',
        message: 'Fizetése sikeres volt.',
        checkEmail: 'Személyre szabott horoszkópját hamarosan elküldjük emailben.',
    },
    footer: {
        rights: 'Minden jog fenntartva.',
        terms: 'Felhasználási feltételek',
        privacy: 'Adatvédelmi irányelvek',
        refund: 'Visszatérítési feltételek',
        cookies: 'Cookie szabályzat',
    },
};

// Romanian translations
const roTranslations: Translations = {
    meta: {
        title: 'Astralo - Horoscoape Profesionale | Predicții Astrologice Precise',
        description: 'Obțineți horoscopul personalizat creat cu tehnologie AI avansată. Predicții precise pentru horoscoape zilnice, săptămânale, lunare și de cuplu.',
        keywords: 'horoscop, astrologie, zodiac, predicții, horoscop personalizat, horoscop AI',
    },
    header: {
        badge: 'Horoscoape AI',
        online: 'Online',
    },
    promo: {
        offer: 'OFERTĂ LIMITATĂ: 50% reducere la toate horoscoapele!',
        delivery: 'Livrare instantanee pe email',
        customers: '50.000+ clienți mulțumiți',
        secure: 'Plată securizată cu Stripe',
    },
    hero: {
        title: 'Horoscopul Tău Personal',
        subtitle: 'În sfârșit un horoscop cu adevărat precis • Creat special pentru tine',
        features: '✨ Livrare instantanee • 🔒 Plăți securizate • ⭐ 50.000+ clienți mulțumiți',
    },
    products: {
        daily: {
            name: 'Horoscop Zilnic',
            description: 'Horoscopul tău zilnic personal cu predicții detaliate pentru următoarele 24 de ore',
            wordCount: '~200 cuvinte',
            benefits: ['🍀 Număr norocos', '📅 Cel mai bun moment', '💎 Culoare recomandată', '⭐ Sfat zilnic'],
        },
        weekly: {
            name: 'Horoscop Săptămânal',
            description: 'Prezentare completă a săptămânii cu date importante și recomandări',
            wordCount: '~400 cuvinte',
            benefits: ['🎯 Zi norocoasă', '💰 Prognoză financiară', '❤️ Dragoste și relații', '💼 Sfaturi de carieră'],
        },
        monthly: {
            name: 'Horoscop Lunar',
            description: 'Analiză lunară detaliată cu evenimente cheie și oportunități',
            wordCount: '~1000 cuvinte',
            benefits: ['🌟 Cea mai bună zi a lunii', '💎 Pietre norocoase', '🌈 Valuri de energie', '🎨 Culori norocoase'],
        },
        partner: {
            name: 'Horoscop de Cuplu',
            description: 'Analiză profundă a relației și compatibilității prin sinastrie',
            wordCount: '~1200 cuvinte',
            benefits: ['💕 Scor compatibilitate', '🔮 Puncte forte ale relației', '⚠️ Zone de dezvoltare', '💫 Viitor comun'],
        },
    },
    cta: {
        orderNow: 'Comandă Acum',
        popular: 'Cel Mai Popular',
    },
    trust: {
        customers: 'Clienți mulțumiți',
        rating: 'Evaluare medie',
        delivery: 'Livrare instantanee',
    },
    testimonials: {
        title: 'Ce spun clienții noștri',
    },
    whyUs: {
        title: 'De ce să alegi Astralo?',
        technology: { title: 'Tehnologie Avansată', description: 'Tehnologie de ultimă generație pentru predicții precise' },
        instant: { title: 'Instant', description: 'Horoscopul tău gata în câteva minute' },
        professional: { title: 'Profesional', description: 'Creat conform principiilor astrologice' },
        verified: { title: 'Verificat', description: '50.000+ clienți mulțumiți' },
    },
    form: {
        title: 'Obține horoscopul tău',
        name: 'Nume complet',
        email: 'Adresă email',
        birthDate: 'Data nașterii',
        birthTime: 'Ora nașterii (opțional)',
        birthPlace: 'Locul nașterii',
        partnerName: 'Numele partenerului',
        partnerBirthDate: 'Data nașterii partenerului',
        partnerBirthTime: 'Ora nașterii partenerului (opțional)',
        partnerBirthPlace: 'Locul nașterii partenerului',
        submit: 'Continuă la plată',
        processing: 'Se procesează...',
    },
    success: {
        title: 'Mulțumim!',
        message: 'Plata ta a fost efectuată cu succes.',
        checkEmail: 'Horoscopul tău personalizat va fi trimis pe email în curând.',
    },
    footer: {
        rights: 'Toate drepturile rezervate.',
        terms: 'Termeni și condiții',
        privacy: 'Politica de confidențialitate',
        refund: 'Politica de rambursare',
        cookies: 'Politica de cookies',
    },
};

// Bulgarian translations
const bgTranslations: Translations = {
    meta: { title: 'Astralo - Професионални Хороскопи', description: 'Получете персонализиран хороскоп с AI технология.', keywords: 'хороскоп, астрология, зодия' },
    header: { badge: 'AI Хороскопи', online: 'Онлайн' },
    promo: { offer: 'ОГРАНИЧЕНА ОФЕРТА: 50% отстъпка!', delivery: 'Мигновена доставка', customers: '50 000+ доволни клиенти', secure: 'Сигурно плащане' },
    hero: { title: 'Вашият Личен Хороскоп', subtitle: 'Най-накрая точен хороскоп • Създаден специално за вас', features: '✨ Мигновена доставка • 🔒 Сигурни плащания • ⭐ 50 000+ клиенти' },
    products: { daily: { name: 'Дневен Хороскоп', description: 'Детайлни прогнози за следващите 24 часа', wordCount: '~200 думи', benefits: ['🍀 Щастливо число', '📅 Най-добро време', '💎 Препоръчан цвят', '⭐ Дневен съвет'] }, weekly: { name: 'Седмичен Хороскоп', description: 'Преглед на седмицата с важни дати', wordCount: '~400 думи', benefits: ['🎯 Щастлив ден', '💰 Финансова прогноза', '❤️ Любов', '💼 Кариера'] }, monthly: { name: 'Месечен Хороскоп', description: 'Месечен анализ с ключови събития', wordCount: '~1000 думи', benefits: ['🌟 Най-добър ден', '💎 Щастливи камъни', '🌈 Енергийни вълни', '🎨 Цветове'] }, partner: { name: 'Партньорски Хороскоп', description: 'Анализ на съвместимостта', wordCount: '~1200 думи', benefits: ['💕 Съвместимост', '🔮 Силни страни', '⚠️ Области за растеж', '💫 Общо бъдеще'] } },
    cta: { orderNow: 'Поръчай Сега', popular: 'Най-популярен' },
    trust: { customers: 'Доволни клиенти', rating: 'Средна оценка', delivery: 'Мигновена доставка' },
    testimonials: { title: 'Какво казват клиентите' },
    whyUs: { title: 'Защо да изберете Astralo?', technology: { title: 'Технология', description: 'Модерна технология' }, instant: { title: 'Мигновено', description: 'Готов за минути' }, professional: { title: 'Професионално', description: 'Астрологични принципи' }, verified: { title: 'Проверено', description: '50 000+ клиенти' } },
    form: { title: 'Получете хороскоп', name: 'Пълно име', email: 'Имейл', birthDate: 'Дата на раждане', birthTime: 'Час (незадължително)', birthPlace: 'Място на раждане', partnerName: 'Име на партньор', partnerBirthDate: 'Дата на партньор', partnerBirthTime: 'Час на партньор', partnerBirthPlace: 'Място на партньор', submit: 'Към плащане', processing: 'Обработка...' },
    success: { title: 'Благодарим!', message: 'Плащането е успешно.', checkEmail: 'Хороскопът ще бъде изпратен на вашия имейл.' },
    footer: { rights: 'Всички права запазени.', terms: 'Условия', privacy: 'Поверителност', refund: 'Възстановяване', cookies: 'Бисквитки' },
};

// Croatian translations
const hrTranslations: Translations = {
    meta: { title: 'Astralo - Profesionalni Horoskopi', description: 'Dobijte personalizirani horoskop s AI tehnologijom.', keywords: 'horoskop, astrologija, zodijak' },
    header: { badge: 'AI Horoskopi', online: 'Online' },
    promo: { offer: 'OGRANIČENA PONUDA: 50% popusta!', delivery: 'Trenutna dostava', customers: '50.000+ zadovoljnih kupaca', secure: 'Sigurno plaćanje' },
    hero: { title: 'Vaš Osobni Horoskop', subtitle: 'Konačno točan horoskop • Kreiran posebno za vas', features: '✨ Trenutna dostava • 🔒 Sigurna plaćanja • ⭐ 50.000+ kupaca' },
    products: { daily: { name: 'Dnevni Horoskop', description: 'Detaljna predviđanja za sljedećih 24 sata', wordCount: '~200 riječi', benefits: ['🍀 Sretni broj', '📅 Najbolje vrijeme', '💎 Preporučena boja', '⭐ Dnevni savjet'] }, weekly: { name: 'Tjedni Horoskop', description: 'Pregled tjedna s važnim datumima', wordCount: '~400 riječi', benefits: ['🎯 Sretni dan', '💰 Financijska prognoza', '❤️ Ljubav', '💼 Karijera'] }, monthly: { name: 'Mjesečni Horoskop', description: 'Mjesečna analiza s ključnim događajima', wordCount: '~1000 riječi', benefits: ['🌟 Najbolji dan', '💎 Sretno kamenje', '🌈 Energetski valovi', '🎨 Boje'] }, partner: { name: 'Partnerski Horoskop', description: 'Analiza kompatibilnosti', wordCount: '~1200 riječi', benefits: ['💕 Kompatibilnost', '🔮 Snage', '⚠️ Područja rasta', '💫 Zajednička budućnost'] } },
    cta: { orderNow: 'Naruči Sada', popular: 'Najpopularniji' },
    trust: { customers: 'Zadovoljnih kupaca', rating: 'Prosječna ocjena', delivery: 'Trenutna dostava' },
    testimonials: { title: 'Što kažu naši klijenti' },
    whyUs: { title: 'Zašto odabrati Astralo?', technology: { title: 'Tehnologija', description: 'Moderna tehnologija' }, instant: { title: 'Trenutno', description: 'Gotovo za minute' }, professional: { title: 'Profesionalno', description: 'Astrološki principi' }, verified: { title: 'Provjereno', description: '50.000+ kupaca' } },
    form: { title: 'Dobijte horoskop', name: 'Puno ime', email: 'Email', birthDate: 'Datum rođenja', birthTime: 'Vrijeme (opcionalno)', birthPlace: 'Mjesto rođenja', partnerName: 'Ime partnera', partnerBirthDate: 'Datum partnera', partnerBirthTime: 'Vrijeme partnera', partnerBirthPlace: 'Mjesto partnera', submit: 'Nastavi na plaćanje', processing: 'Obrada...' },
    success: { title: 'Hvala!', message: 'Plaćanje je uspješno.', checkEmail: 'Horoskop će biti poslan na vaš email.' },
    footer: { rights: 'Sva prava pridržana.', terms: 'Uvjeti', privacy: 'Privatnost', refund: 'Povrat', cookies: 'Kolačići' },
};

// Slovenian translations
const slTranslations: Translations = {
    meta: { title: 'Astralo - Profesionalni Horoskopi', description: 'Pridobite personaliziran horoskop z AI tehnologijo.', keywords: 'horoskop, astrologija, zodiak' },
    header: { badge: 'AI Horoskopi', online: 'Na spletu' },
    promo: { offer: 'OMEJENA PONUDBA: 50% popust!', delivery: 'Takojšnja dostava', customers: '50.000+ zadovoljnih strank', secure: 'Varno plačilo' },
    hero: { title: 'Vaš Osebni Horoskop', subtitle: 'Končno natančen horoskop • Ustvarjen posebej za vas', features: '✨ Takojšnja dostava • 🔒 Varna plačila • ⭐ 50.000+ strank' },
    products: { daily: { name: 'Dnevni Horoskop', description: 'Podrobne napovedi za naslednjih 24 ur', wordCount: '~200 besed', benefits: ['🍀 Srečna številka', '📅 Najboljši čas', '💎 Priporočena barva', '⭐ Dnevni nasvet'] }, weekly: { name: 'Tedenski Horoskop', description: 'Pregled tedna z pomembnimi datumi', wordCount: '~400 besed', benefits: ['🎯 Srečen dan', '💰 Finančna napoved', '❤️ Ljubezen', '💼 Kariera'] }, monthly: { name: 'Mesečni Horoskop', description: 'Mesečna analiza s ključnimi dogodki', wordCount: '~1000 besed', benefits: ['🌟 Najboljši dan', '💎 Srečni kamni', '🌈 Energijski valovi', '🎨 Barve'] }, partner: { name: 'Partnerski Horoskop', description: 'Analiza združljivosti', wordCount: '~1200 besed', benefits: ['💕 Združljivost', '🔮 Prednosti', '⚠️ Področja rasti', '💫 Skupna prihodnost'] } },
    cta: { orderNow: 'Naroči Zdaj', popular: 'Najbolj priljubljen' },
    trust: { customers: 'Zadovoljnih strank', rating: 'Povprečna ocena', delivery: 'Takojšnja dostava' },
    testimonials: { title: 'Kaj pravijo naše stranke' },
    whyUs: { title: 'Zakaj izbrati Astralo?', technology: { title: 'Tehnologija', description: 'Moderna tehnologija' }, instant: { title: 'Takoj', description: 'Pripravljeno v minutah' }, professional: { title: 'Profesionalno', description: 'Astrološka načela' }, verified: { title: 'Preverjeno', description: '50.000+ strank' } },
    form: { title: 'Pridobite horoskop', name: 'Polno ime', email: 'E-pošta', birthDate: 'Datum rojstva', birthTime: 'Čas (neobvezno)', birthPlace: 'Kraj rojstva', partnerName: 'Ime partnerja', partnerBirthDate: 'Datum partnerja', partnerBirthTime: 'Čas partnerja', partnerBirthPlace: 'Kraj partnerja', submit: 'Nadaljuj na plačilo', processing: 'Obdelava...' },
    success: { title: 'Hvala!', message: 'Plačilo je uspešno.', checkEmail: 'Horoskop bo poslan na vaš e-poštni naslov.' },
    footer: { rights: 'Vse pravice pridržane.', terms: 'Pogoji', privacy: 'Zasebnost', refund: 'Vračilo', cookies: 'Piškotki' },
};

// Serbian translations
const srTranslations: Translations = {
    meta: { title: 'Astralo - Професионални Хороскопи', description: 'Добијте персонализовани хороскоп са AI технологијом.', keywords: 'хороскоп, астрологија, зодијак' },
    header: { badge: 'AI Хороскопи', online: 'Онлајн' },
    promo: { offer: 'ОГРАНИЧЕНА ПОНУДА: 50% попуста!', delivery: 'Тренутна достава', customers: '50.000+ задовољних купаца', secure: 'Сигурно плаћање' },
    hero: { title: 'Ваш Лични Хороскоп', subtitle: 'Коначно тачан хороскоп • Креиран посебно за вас', features: '✨ Тренутна достава • 🔒 Сигурна плаћања • ⭐ 50.000+ купаца' },
    products: { daily: { name: 'Дневни Хороскоп', description: 'Детаљна предвиђања за наредних 24 сата', wordCount: '~200 речи', benefits: ['🍀 Срећан број', '📅 Најбоље време', '💎 Препоручена боја', '⭐ Дневни савет'] }, weekly: { name: 'Недељни Хороскоп', description: 'Преглед недеље са важним датумима', wordCount: '~400 речи', benefits: ['🎯 Срећан дан', '💰 Финансијска прогноза', '❤️ Љубав', '💼 Каријера'] }, monthly: { name: 'Месечни Хороскоп', description: 'Месечна анализа са кључним догађајима', wordCount: '~1000 речи', benefits: ['🌟 Најбољи дан', '💎 Срећно камење', '🌈 Енергетски таласи', '🎨 Боје'] }, partner: { name: 'Партнерски Хороскоп', description: 'Анализа компатибилности', wordCount: '~1200 речи', benefits: ['💕 Компатибилност', '🔮 Снаге', '⚠️ Области раста', '💫 Заједничка будућност'] } },
    cta: { orderNow: 'Наручи Сада', popular: 'Најпопуларнији' },
    trust: { customers: 'Задовољних купаца', rating: 'Просечна оцена', delivery: 'Тренутна достава' },
    testimonials: { title: 'Шта кажу наши клијенти' },
    whyUs: { title: 'Зашто изабрати Astralo?', technology: { title: 'Технологија', description: 'Модерна технологија' }, instant: { title: 'Тренутно', description: 'Готово за минуте' }, professional: { title: 'Професионално', description: 'Астролошки принципи' }, verified: { title: 'Проверено', description: '50.000+ купаца' } },
    form: { title: 'Добијте хороскоп', name: 'Пуно име', email: 'Имејл', birthDate: 'Датум рођења', birthTime: 'Време (опционо)', birthPlace: 'Место рођења', partnerName: 'Име партнера', partnerBirthDate: 'Датум партнера', partnerBirthTime: 'Време партнера', partnerBirthPlace: 'Место партнера', submit: 'Настави на плаћање', processing: 'Обрада...' },
    success: { title: 'Хвала!', message: 'Плаћање је успешно.', checkEmail: 'Хороскоп ће бити послат на ваш имејл.' },
    footer: { rights: 'Сва права задржана.', terms: 'Услови', privacy: 'Приватност', refund: 'Поврат', cookies: 'Колачићи' },
};

// Ukrainian translations
const ukTranslations: Translations = {
    meta: { title: 'Astralo - Професійні Гороскопи', description: 'Отримайте персоналізований гороскоп з AI технологією.', keywords: 'гороскоп, астрологія, зодіак' },
    header: { badge: 'AI Гороскопи', online: 'Онлайн' },
    promo: { offer: 'ОБМЕЖЕНА ПРОПОЗИЦІЯ: 50% знижка!', delivery: 'Миттєва доставка', customers: '50 000+ задоволених клієнтів', secure: 'Безпечна оплата' },
    hero: { title: 'Ваш Особистий Гороскоп', subtitle: 'Нарешті точний гороскоп • Створений спеціально для вас', features: '✨ Миттєва доставка • 🔒 Безпечні платежі • ⭐ 50 000+ клієнтів' },
    products: { daily: { name: 'Денний Гороскоп', description: 'Детальні прогнози на наступні 24 години', wordCount: '~200 слів', benefits: ['🍀 Щасливе число', '📅 Найкращий час', '💎 Рекомендований колір', '⭐ Денна порада'] }, weekly: { name: 'Тижневий Гороскоп', description: 'Огляд тижня з важливими датами', wordCount: '~400 слів', benefits: ['🎯 Щасливий день', '💰 Фінансовий прогноз', '❤️ Кохання', '💼 Кар\'єра'] }, monthly: { name: 'Місячний Гороскоп', description: 'Місячний аналіз з ключовими подіями', wordCount: '~1000 слів', benefits: ['🌟 Найкращий день', '💎 Щасливі камені', '🌈 Енергетичні хвилі', '🎨 Кольори'] }, partner: { name: 'Партнерський Гороскоп', description: 'Аналіз сумісності', wordCount: '~1200 слів', benefits: ['💕 Сумісність', '🔮 Сильні сторони', '⚠️ Області росту', '💫 Спільне майбутнє'] } },
    cta: { orderNow: 'Замовити Зараз', popular: 'Найпопулярніший' },
    trust: { customers: 'Задоволених клієнтів', rating: 'Середня оцінка', delivery: 'Миттєва доставка' },
    testimonials: { title: 'Що кажуть наші клієнти' },
    whyUs: { title: 'Чому обрати Astralo?', technology: { title: 'Технологія', description: 'Сучасна технологія' }, instant: { title: 'Миттєво', description: 'Готово за хвилини' }, professional: { title: 'Професійно', description: 'Астрологічні принципи' }, verified: { title: 'Перевірено', description: '50 000+ клієнтів' } },
    form: { title: 'Отримайте гороскоп', name: 'Повне ім\'я', email: 'Email', birthDate: 'Дата народження', birthTime: 'Час (необов\'язково)', birthPlace: 'Місце народження', partnerName: 'Ім\'я партнера', partnerBirthDate: 'Дата партнера', partnerBirthTime: 'Час партнера', partnerBirthPlace: 'Місце партнера', submit: 'Перейти до оплати', processing: 'Обробка...' },
    success: { title: 'Дякуємо!', message: 'Оплата успішна.', checkEmail: 'Гороскоп буде надіслано на ваш email.' },
    footer: { rights: 'Всі права захищені.', terms: 'Умови', privacy: 'Конфіденційність', refund: 'Повернення', cookies: 'Cookies' },
};

// Russian translations
const ruTranslations: Translations = {
    meta: { title: 'Astralo - Профессиональные Гороскопы', description: 'Получите персонализированный гороскоп с AI технологией.', keywords: 'гороскоп, астрология, зодиак' },
    header: { badge: 'AI Гороскопы', online: 'Онлайн' },
    promo: { offer: 'ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ: скидка 50%!', delivery: 'Мгновенная доставка', customers: '50 000+ довольных клиентов', secure: 'Безопасная оплата' },
    hero: { title: 'Ваш Личный Гороскоп', subtitle: 'Наконец точный гороскоп • Создан специально для вас', features: '✨ Мгновенная доставка • 🔒 Безопасные платежи • ⭐ 50 000+ клиентов' },
    products: { daily: { name: 'Дневной Гороскоп', description: 'Детальные прогнозы на следующие 24 часа', wordCount: '~200 слов', benefits: ['🍀 Счастливое число', '📅 Лучшее время', '💎 Рекомендуемый цвет', '⭐ Дневной совет'] }, weekly: { name: 'Недельный Гороскоп', description: 'Обзор недели с важными датами', wordCount: '~400 слов', benefits: ['🎯 Счастливый день', '💰 Финансовый прогноз', '❤️ Любовь', '💼 Карьера'] }, monthly: { name: 'Месячный Гороскоп', description: 'Месячный анализ с ключевыми событиями', wordCount: '~1000 слов', benefits: ['🌟 Лучший день', '💎 Счастливые камни', '🌈 Энергетические волны', '🎨 Цвета'] }, partner: { name: 'Партнерский Гороскоп', description: 'Анализ совместимости', wordCount: '~1200 слов', benefits: ['💕 Совместимость', '🔮 Сильные стороны', '⚠️ Области роста', '💫 Общее будущее'] } },
    cta: { orderNow: 'Заказать Сейчас', popular: 'Самый популярный' },
    trust: { customers: 'Довольных клиентов', rating: 'Средняя оценка', delivery: 'Мгновенная доставка' },
    testimonials: { title: 'Что говорят наши клиенты' },
    whyUs: { title: 'Почему выбрать Astralo?', technology: { title: 'Технология', description: 'Современная технология' }, instant: { title: 'Мгновенно', description: 'Готово за минуты' }, professional: { title: 'Профессионально', description: 'Астрологические принципы' }, verified: { title: 'Проверено', description: '50 000+ клиентов' } },
    form: { title: 'Получите гороскоп', name: 'Полное имя', email: 'Email', birthDate: 'Дата рождения', birthTime: 'Время (необязательно)', birthPlace: 'Место рождения', partnerName: 'Имя партнера', partnerBirthDate: 'Дата партнера', partnerBirthTime: 'Время партнера', partnerBirthPlace: 'Место партнера', submit: 'Перейти к оплате', processing: 'Обработка...' },
    success: { title: 'Спасибо!', message: 'Оплата успешна.', checkEmail: 'Гороскоп будет отправлен на ваш email.' },
    footer: { rights: 'Все права защищены.', terms: 'Условия', privacy: 'Конфиденциальность', refund: 'Возврат', cookies: 'Cookies' },
};

// Greek translations
const elTranslations: Translations = {
    meta: { title: 'Astralo - Επαγγελματικά Ωροσκόπια', description: 'Αποκτήστε εξατομικευμένο ωροσκόπιο με τεχνολογία AI.', keywords: 'ωροσκόπιο, αστρολογία, ζώδιο' },
    header: { badge: 'AI Ωροσκόπια', online: 'Online' },
    promo: { offer: 'ΠΕΡΙΟΡΙΣΜΕΝΗ ΠΡΟΣΦΟΡΑ: 50% έκπτωση!', delivery: 'Άμεση παράδοση', customers: '50.000+ ικανοποιημένοι πελάτες', secure: 'Ασφαλής πληρωμή' },
    hero: { title: 'Το Προσωπικό σας Ωροσκόπιο', subtitle: 'Επιτέλους ακριβές ωροσκόπιο • Δημιουργήθηκε ειδικά για εσάς', features: '✨ Άμεση παράδοση • 🔒 Ασφαλείς πληρωμές • ⭐ 50.000+ πελάτες' },
    products: { daily: { name: 'Ημερήσιο Ωροσκόπιο', description: 'Λεπτομερείς προβλέψεις για τις επόμενες 24 ώρες', wordCount: '~200 λέξεις', benefits: ['🍀 Τυχερός αριθμός', '📅 Καλύτερη ώρα', '💎 Προτεινόμενο χρώμα', '⭐ Ημερήσια συμβουλή'] }, weekly: { name: 'Εβδομαδιαίο Ωροσκόπιο', description: 'Επισκόπηση εβδομάδας με σημαντικές ημερομηνίες', wordCount: '~400 λέξεις', benefits: ['🎯 Τυχερή μέρα', '💰 Οικονομική πρόβλεψη', '❤️ Αγάπη', '💼 Καριέρα'] }, monthly: { name: 'Μηνιαίο Ωροσκόπιο', description: 'Μηνιαία ανάλυση με βασικά γεγονότα', wordCount: '~1000 λέξεις', benefits: ['🌟 Καλύτερη μέρα', '💎 Τυχερές πέτρες', '🌈 Ενεργειακά κύματα', '🎨 Χρώματα'] }, partner: { name: 'Ωροσκόπιο Ζευγαριού', description: 'Ανάλυση συμβατότητας', wordCount: '~1200 λέξεις', benefits: ['💕 Συμβατότητα', '🔮 Δυνατά σημεία', '⚠️ Τομείς ανάπτυξης', '💫 Κοινό μέλλον'] } },
    cta: { orderNow: 'Παραγγείλτε Τώρα', popular: 'Πιο Δημοφιλές' },
    trust: { customers: 'Ικανοποιημένοι πελάτες', rating: 'Μέση βαθμολογία', delivery: 'Άμεση παράδοση' },
    testimonials: { title: 'Τι λένε οι πελάτες μας' },
    whyUs: { title: 'Γιατί να επιλέξετε Astralo;', technology: { title: 'Τεχνολογία', description: 'Σύγχρονη τεχνολογία' }, instant: { title: 'Άμεσα', description: 'Έτοιμο σε λεπτά' }, professional: { title: 'Επαγγελματικό', description: 'Αστρολογικές αρχές' }, verified: { title: 'Επαληθευμένο', description: '50.000+ πελάτες' } },
    form: { title: 'Αποκτήστε ωροσκόπιο', name: 'Πλήρες όνομα', email: 'Email', birthDate: 'Ημερομηνία γέννησης', birthTime: 'Ώρα (προαιρετικό)', birthPlace: 'Τόπος γέννησης', partnerName: 'Όνομα συντρόφου', partnerBirthDate: 'Ημερομηνία συντρόφου', partnerBirthTime: 'Ώρα συντρόφου', partnerBirthPlace: 'Τόπος συντρόφου', submit: 'Συνέχεια στην πληρωμή', processing: 'Επεξεργασία...' },
    success: { title: 'Ευχαριστούμε!', message: 'Η πληρωμή ήταν επιτυχής.', checkEmail: 'Το ωροσκόπιό σας θα σταλεί στο email σας.' },
    footer: { rights: 'Με επιφύλαξη παντός δικαιώματος.', terms: 'Όροι', privacy: 'Απόρρητο', refund: 'Επιστροφή', cookies: 'Cookies' },
};

// Turkish translations
const trTranslations: Translations = {
    meta: { title: 'Astralo - Profesyonel Burç Yorumları', description: 'AI teknolojisi ile kişiselleştirilmiş burç yorumunuzu alın.', keywords: 'burç, astroloji, zodyak' },
    header: { badge: 'AI Burç Yorumları', online: 'Çevrimiçi' },
    promo: { offer: 'SINIRLI TEKLİF: %50 indirim!', delivery: 'Anında teslimat', customers: '50.000+ mutlu müşteri', secure: 'Güvenli ödeme' },
    hero: { title: 'Kişisel Burç Yorumunuz', subtitle: 'Sonunda doğru burç yorumu • Özellikle sizin için oluşturuldu', features: '✨ Anında teslimat • 🔒 Güvenli ödemeler • ⭐ 50.000+ müşteri' },
    products: { daily: { name: 'Günlük Burç', description: 'Önümüzdeki 24 saat için detaylı tahminler', wordCount: '~200 kelime', benefits: ['🍀 Şanslı sayı', '📅 En iyi zaman', '💎 Önerilen renk', '⭐ Günlük tavsiye'] }, weekly: { name: 'Haftalık Burç', description: 'Önemli tarihlerle hafta özeti', wordCount: '~400 kelime', benefits: ['🎯 Şanslı gün', '💰 Finansal tahmin', '❤️ Aşk', '💼 Kariyer'] }, monthly: { name: 'Aylık Burç', description: 'Önemli olaylarla aylık analiz', wordCount: '~1000 kelime', benefits: ['🌟 En iyi gün', '💎 Şanslı taşlar', '🌈 Enerji dalgaları', '🎨 Renkler'] }, partner: { name: 'Partner Burç', description: 'Uyumluluk analizi', wordCount: '~1200 kelime', benefits: ['💕 Uyumluluk', '🔮 Güçlü yanlar', '⚠️ Gelişim alanları', '💫 Ortak gelecek'] } },
    cta: { orderNow: 'Şimdi Sipariş Ver', popular: 'En Popüler' },
    trust: { customers: 'Mutlu müşteri', rating: 'Ortalama puan', delivery: 'Anında teslimat' },
    testimonials: { title: 'Müşterilerimiz ne diyor' },
    whyUs: { title: 'Neden Astralo?', technology: { title: 'Teknoloji', description: 'Modern teknoloji' }, instant: { title: 'Anında', description: 'Dakikalar içinde hazır' }, professional: { title: 'Profesyonel', description: 'Astrolojik prensipler' }, verified: { title: 'Doğrulanmış', description: '50.000+ müşteri' } },
    form: { title: 'Burç yorumunuzu alın', name: 'Tam ad', email: 'E-posta', birthDate: 'Doğum tarihi', birthTime: 'Saat (isteğe bağlı)', birthPlace: 'Doğum yeri', partnerName: 'Partner adı', partnerBirthDate: 'Partner doğum tarihi', partnerBirthTime: 'Partner saati', partnerBirthPlace: 'Partner doğum yeri', submit: 'Ödemeye devam et', processing: 'İşleniyor...' },
    success: { title: 'Teşekkürler!', message: 'Ödemeniz başarılı.', checkEmail: 'Burç yorumunuz e-postanıza gönderilecek.' },
    footer: { rights: 'Tüm hakları saklıdır.', terms: 'Şartlar', privacy: 'Gizlilik', refund: 'İade', cookies: 'Çerezler' },
};

// Arabic translations
const arTranslations: Translations = {
    meta: { title: 'Astralo - أبراج احترافية', description: 'احصل على برجك المخصص بتقنية الذكاء الاصطناعي.', keywords: 'برج، فلك، أبراج' },
    header: { badge: 'أبراج AI', online: 'متصل' },
    promo: { offer: 'عرض محدود: خصم 50%!', delivery: 'توصيل فوري', customers: '+50,000 عميل راضٍ', secure: 'دفع آمن' },
    hero: { title: 'برجك الشخصي', subtitle: 'أخيراً برج دقيق • مصمم خصيصاً لك', features: '✨ توصيل فوري • 🔒 دفع آمن • ⭐ +50,000 عميل' },
    products: { daily: { name: 'البرج اليومي', description: 'توقعات مفصلة للـ 24 ساعة القادمة', wordCount: '~200 كلمة', benefits: ['🍀 رقم الحظ', '📅 أفضل وقت', '💎 اللون الموصى به', '⭐ نصيحة اليوم'] }, weekly: { name: 'البرج الأسبوعي', description: 'نظرة على الأسبوع مع التواريخ المهمة', wordCount: '~400 كلمة', benefits: ['🎯 يوم الحظ', '💰 توقعات مالية', '❤️ الحب', '💼 المهنة'] }, monthly: { name: 'البرج الشهري', description: 'تحليل شهري مع الأحداث الرئيسية', wordCount: '~1000 كلمة', benefits: ['🌟 أفضل يوم', '💎 أحجار الحظ', '🌈 موجات الطاقة', '🎨 الألوان'] }, partner: { name: 'برج الشريك', description: 'تحليل التوافق', wordCount: '~1200 كلمة', benefits: ['💕 التوافق', '🔮 نقاط القوة', '⚠️ مجالات النمو', '💫 مستقبل مشترك'] } },
    cta: { orderNow: 'اطلب الآن', popular: 'الأكثر شعبية' },
    trust: { customers: 'عملاء راضون', rating: 'متوسط التقييم', delivery: 'توصيل فوري' },
    testimonials: { title: 'ماذا يقول عملاؤنا' },
    whyUs: { title: 'لماذا تختار Astralo؟', technology: { title: 'التكنولوجيا', description: 'تكنولوجيا حديثة' }, instant: { title: 'فوري', description: 'جاهز في دقائق' }, professional: { title: 'احترافي', description: 'مبادئ فلكية' }, verified: { title: 'موثق', description: '+50,000 عميل' } },
    form: { title: 'احصل على برجك', name: 'الاسم الكامل', email: 'البريد الإلكتروني', birthDate: 'تاريخ الميلاد', birthTime: 'الوقت (اختياري)', birthPlace: 'مكان الميلاد', partnerName: 'اسم الشريك', partnerBirthDate: 'تاريخ الشريك', partnerBirthTime: 'وقت الشريك', partnerBirthPlace: 'مكان الشريك', submit: 'متابعة الدفع', processing: 'جاري المعالجة...' },
    success: { title: 'شكراً!', message: 'تم الدفع بنجاح.', checkEmail: 'سيتم إرسال برجك إلى بريدك الإلكتروني.' },
    footer: { rights: 'جميع الحقوق محفوظة.', terms: 'الشروط', privacy: 'الخصوصية', refund: 'الاسترداد', cookies: 'ملفات تعريف الارتباط' },
};

// Hindi translations
const hiTranslations: Translations = {
    meta: { title: 'Astralo - पेशेवर राशिफल', description: 'AI तकनीक के साथ अपना व्यक्तिगत राशिफल प्राप्त करें।', keywords: 'राशिफल, ज्योतिष, राशि' },
    header: { badge: 'AI राशिफल', online: 'ऑनलाइन' },
    promo: { offer: 'सीमित ऑफर: 50% छूट!', delivery: 'तुरंत डिलीवरी', customers: '50,000+ संतुष्ट ग्राहक', secure: 'सुरक्षित भुगतान' },
    hero: { title: 'आपका व्यक्तिगत राशिफल', subtitle: 'अंत में सटीक राशिफल • विशेष रूप से आपके लिए बनाया गया', features: '✨ तुरंत डिलीवरी • 🔒 सुरक्षित भुगतान • ⭐ 50,000+ ग्राहक' },
    products: { daily: { name: 'दैनिक राशिफल', description: 'अगले 24 घंटों के लिए विस्तृत भविष्यवाणी', wordCount: '~200 शब्द', benefits: ['🍀 भाग्यशाली अंक', '📅 सर्वश्रेष्ठ समय', '💎 अनुशंसित रंग', '⭐ दैनिक सलाह'] }, weekly: { name: 'साप्ताहिक राशिफल', description: 'महत्वपूर्ण तिथियों के साथ सप्ताह का अवलोकन', wordCount: '~400 शब्द', benefits: ['🎯 भाग्यशाली दिन', '💰 वित्तीय भविष्यवाणी', '❤️ प्रेम', '💼 करियर'] }, monthly: { name: 'मासिक राशिफल', description: 'प्रमुख घटनाओं के साथ मासिक विश्लेषण', wordCount: '~1000 शब्द', benefits: ['🌟 सर्वश्रेष्ठ दिन', '💎 भाग्यशाली रत्न', '🌈 ऊर्जा तरंगें', '🎨 रंग'] }, partner: { name: 'साथी राशिफल', description: 'संगतता विश्लेषण', wordCount: '~1200 शब्द', benefits: ['💕 संगतता', '🔮 शक्तियां', '⚠️ विकास क्षेत्र', '💫 साझा भविष्य'] } },
    cta: { orderNow: 'अभी ऑर्डर करें', popular: 'सबसे लोकप्रिय' },
    trust: { customers: 'संतुष्ट ग्राहक', rating: 'औसत रेटिंग', delivery: 'तुरंत डिलीवरी' },
    testimonials: { title: 'हमारे ग्राहक क्या कहते हैं' },
    whyUs: { title: 'Astralo क्यों चुनें?', technology: { title: 'तकनीक', description: 'आधुनिक तकनीक' }, instant: { title: 'तुरंत', description: 'मिनटों में तैयार' }, professional: { title: 'पेशेवर', description: 'ज्योतिषीय सिद्धांत' }, verified: { title: 'सत्यापित', description: '50,000+ ग्राहक' } },
    form: { title: 'अपना राशिफल प्राप्त करें', name: 'पूरा नाम', email: 'ईमेल', birthDate: 'जन्म तिथि', birthTime: 'समय (वैकल्पिक)', birthPlace: 'जन्म स्थान', partnerName: 'साथी का नाम', partnerBirthDate: 'साथी की जन्म तिथि', partnerBirthTime: 'साथी का समय', partnerBirthPlace: 'साथी का जन्म स्थान', submit: 'भुगतान जारी रखें', processing: 'प्रोसेसिंग...' },
    success: { title: 'धन्यवाद!', message: 'भुगतान सफल।', checkEmail: 'आपका राशिफल आपके ईमेल पर भेजा जाएगा।' },
    footer: { rights: 'सर्वाधिकार सुरक्षित।', terms: 'शर्तें', privacy: 'गोपनीयता', refund: 'रिफंड', cookies: 'कुकीज़' },
};

// Japanese translations
const jaTranslations: Translations = {
    meta: { title: 'Astralo - プロフェッショナル星占い', description: 'AI技術でパーソナライズされた星占いを手に入れましょう。', keywords: '星占い、占星術、星座' },
    header: { badge: 'AI星占い', online: 'オンライン' },
    promo: { offer: '期間限定: 50%オフ!', delivery: '即時配信', customers: '50,000人以上の満足顧客', secure: '安全な支払い' },
    hero: { title: 'あなたの個人星占い', subtitle: 'ついに正確な星占い • あなた専用に作成', features: '✨ 即時配信 • 🔒 安全な支払い • ⭐ 50,000人以上の顧客' },
    products: { daily: { name: '今日の運勢', description: '次の24時間の詳細な予測', wordCount: '約200語', benefits: ['🍀 ラッキーナンバー', '📅 最適な時間', '💎 おすすめの色', '⭐ 今日のアドバイス'] }, weekly: { name: '週間運勢', description: '重要な日付を含む週の概要', wordCount: '約400語', benefits: ['🎯 ラッキーデー', '💰 金運予報', '❤️ 恋愛', '💼 仕事運'] }, monthly: { name: '月間運勢', description: '主要イベントを含む月間分析', wordCount: '約1000語', benefits: ['🌟 最良の日', '💎 ラッキーストーン', '🌈 エネルギー波', '🎨 ラッキーカラー'] }, partner: { name: '相性占い', description: '相性分析', wordCount: '約1200語', benefits: ['💕 相性度', '🔮 強み', '⚠️ 成長分野', '💫 共有の未来'] } },
    cta: { orderNow: '今すぐ注文', popular: '最も人気' },
    trust: { customers: '満足顧客', rating: '平均評価', delivery: '即時配信' },
    testimonials: { title: 'お客様の声' },
    whyUs: { title: 'なぜAstralo?', technology: { title: '技術', description: '最新技術' }, instant: { title: '即時', description: '数分で完了' }, professional: { title: 'プロフェッショナル', description: '占星術の原則' }, verified: { title: '検証済み', description: '50,000人以上の顧客' } },
    form: { title: '星占いを入手', name: '氏名', email: 'メール', birthDate: '生年月日', birthTime: '時間（任意）', birthPlace: '出生地', partnerName: 'パートナー名', partnerBirthDate: 'パートナー生年月日', partnerBirthTime: 'パートナー時間', partnerBirthPlace: 'パートナー出生地', submit: '支払いに進む', processing: '処理中...' },
    success: { title: 'ありがとうございます!', message: '支払い成功。', checkEmail: '星占いがメールで送信されます。' },
    footer: { rights: '全著作権所有。', terms: '利用規約', privacy: 'プライバシー', refund: '返金', cookies: 'クッキー' },
};

// Korean translations
const koTranslations: Translations = {
    meta: { title: 'Astralo - 전문 운세', description: 'AI 기술로 개인 맞춤 운세를 받아보세요.', keywords: '운세, 점성술, 별자리' },
    header: { badge: 'AI 운세', online: '온라인' },
    promo: { offer: '한정 할인: 50% 할인!', delivery: '즉시 배송', customers: '50,000+ 만족 고객', secure: '안전한 결제' },
    hero: { title: '당신의 개인 운세', subtitle: '드디어 정확한 운세 • 당신만을 위해 제작', features: '✨ 즉시 배송 • 🔒 안전한 결제 • ⭐ 50,000+ 고객' },
    products: { daily: { name: '오늘의 운세', description: '다음 24시간 상세 예측', wordCount: '약 200단어', benefits: ['🍀 행운의 숫자', '📅 최적의 시간', '💎 추천 색상', '⭐ 오늘의 조언'] }, weekly: { name: '주간 운세', description: '중요한 날짜가 포함된 주간 개요', wordCount: '약 400단어', benefits: ['🎯 행운의 날', '💰 재정 예측', '❤️ 연애', '💼 직장'] }, monthly: { name: '월간 운세', description: '주요 이벤트가 포함된 월간 분석', wordCount: '약 1000단어', benefits: ['🌟 최고의 날', '💎 행운의 돌', '🌈 에너지 파동', '🎨 색상'] }, partner: { name: '궁합 운세', description: '궁합 분석', wordCount: '약 1200단어', benefits: ['💕 궁합도', '🔮 강점', '⚠️ 성장 영역', '💫 공유 미래'] } },
    cta: { orderNow: '지금 주문', popular: '가장 인기' },
    trust: { customers: '만족 고객', rating: '평균 평점', delivery: '즉시 배송' },
    testimonials: { title: '고객 후기' },
    whyUs: { title: '왜 Astralo인가?', technology: { title: '기술', description: '최신 기술' }, instant: { title: '즉시', description: '몇 분 안에 완료' }, professional: { title: '전문적', description: '점성술 원칙' }, verified: { title: '검증됨', description: '50,000+ 고객' } },
    form: { title: '운세 받기', name: '성명', email: '이메일', birthDate: '생년월일', birthTime: '시간 (선택)', birthPlace: '출생지', partnerName: '파트너 이름', partnerBirthDate: '파트너 생년월일', partnerBirthTime: '파트너 시간', partnerBirthPlace: '파트너 출생지', submit: '결제 진행', processing: '처리 중...' },
    success: { title: '감사합니다!', message: '결제 성공.', checkEmail: '운세가 이메일로 발송됩니다.' },
    footer: { rights: '모든 권리 보유.', terms: '이용약관', privacy: '개인정보', refund: '환불', cookies: '쿠키' },
};

// Chinese translations
const zhTranslations: Translations = {
    meta: { title: 'Astralo - 专业星座运势', description: '使用AI技术获取个性化星座运势。', keywords: '星座, 占星术, 运势' },
    header: { badge: 'AI星座运势', online: '在线' },
    promo: { offer: '限时优惠: 5折!', delivery: '即时配送', customers: '50,000+满意客户', secure: '安全支付' },
    hero: { title: '您的个人星座运势', subtitle: '终于准确的星座运势 • 专为您打造', features: '✨ 即时配送 • 🔒 安全支付 • ⭐ 50,000+客户' },
    products: { daily: { name: '每日运势', description: '未来24小时详细预测', wordCount: '约200字', benefits: ['🍀 幸运数字', '📅 最佳时间', '💎 推荐颜色', '⭐ 每日建议'] }, weekly: { name: '每周运势', description: '包含重要日期的周概览', wordCount: '约400字', benefits: ['🎯 幸运日', '💰 财运预测', '❤️ 爱情', '💼 事业'] }, monthly: { name: '每月运势', description: '包含关键事件的月度分析', wordCount: '约1000字', benefits: ['🌟 最佳日', '💎 幸运石', '🌈 能量波', '🎨 颜色'] }, partner: { name: '配对运势', description: '兼容性分析', wordCount: '约1200字', benefits: ['💕 兼容度', '🔮 优势', '⚠️ 成长领域', '💫 共同未来'] } },
    cta: { orderNow: '立即订购', popular: '最受欢迎' },
    trust: { customers: '满意客户', rating: '平均评分', delivery: '即时配送' },
    testimonials: { title: '客户评价' },
    whyUs: { title: '为什么选择Astralo?', technology: { title: '技术', description: '最新技术' }, instant: { title: '即时', description: '几分钟完成' }, professional: { title: '专业', description: '占星原则' }, verified: { title: '已验证', description: '50,000+客户' } },
    form: { title: '获取运势', name: '姓名', email: '邮箱', birthDate: '出生日期', birthTime: '时间（可选）', birthPlace: '出生地', partnerName: '伴侣姓名', partnerBirthDate: '伴侣出生日期', partnerBirthTime: '伴侣时间', partnerBirthPlace: '伴侣出生地', submit: '继续支付', processing: '处理中...' },
    success: { title: '谢谢!', message: '支付成功。', checkEmail: '运势将发送到您的邮箱。' },
    footer: { rights: '版权所有。', terms: '条款', privacy: '隐私', refund: '退款', cookies: 'Cookies' },
};

// Thai translations
const thTranslations: Translations = {
    meta: { title: 'Astralo - ดูดวงมืออาชีพ', description: 'รับดวงส่วนตัวด้วยเทคโนโลยี AI', keywords: 'ดูดวง, โหราศาสตร์, ราศี' },
    header: { badge: 'AI ดูดวง', online: 'ออนไลน์' },
    promo: { offer: 'ข้อเสนอจำกัด: ลด 50%!', delivery: 'จัดส่งทันที', customers: '50,000+ ลูกค้าพอใจ', secure: 'ชำระเงินปลอดภัย' },
    hero: { title: 'ดวงส่วนตัวของคุณ', subtitle: 'ในที่สุดดวงที่แม่นยำ • สร้างเฉพาะสำหรับคุณ', features: '✨ จัดส่งทันที • 🔒 ชำระเงินปลอดภัย • ⭐ 50,000+ ลูกค้า' },
    products: { daily: { name: 'ดวงรายวัน', description: 'การทำนายละเอียดสำหรับ 24 ชั่วโมงข้างหน้า', wordCount: '~200 คำ', benefits: ['🍀 เลขนำโชค', '📅 เวลาที่ดีที่สุด', '💎 สีแนะนำ', '⭐ คำแนะนำวันนี้'] }, weekly: { name: 'ดวงรายสัปดาห์', description: 'ภาพรวมสัปดาห์พร้อมวันสำคัญ', wordCount: '~400 คำ', benefits: ['🎯 วันโชคดี', '💰 การเงิน', '❤️ ความรัก', '💼 การงาน'] }, monthly: { name: 'ดวงรายเดือน', description: 'วิเคราะห์รายเดือนพร้อมเหตุการณ์สำคัญ', wordCount: '~1000 คำ', benefits: ['🌟 วันที่ดีที่สุด', '💎 หินนำโชค', '🌈 คลื่นพลังงาน', '🎨 สี'] }, partner: { name: 'ดวงคู่รัก', description: 'วิเคราะห์ความเข้ากัน', wordCount: '~1200 คำ', benefits: ['💕 ความเข้ากัน', '🔮 จุดแข็ง', '⚠️ พื้นที่เติบโต', '💫 อนาคตร่วม'] } },
    cta: { orderNow: 'สั่งซื้อเลย', popular: 'ยอดนิยม' },
    trust: { customers: 'ลูกค้าพอใจ', rating: 'คะแนนเฉลี่ย', delivery: 'จัดส่งทันที' },
    testimonials: { title: 'ลูกค้าพูดถึงเรา' },
    whyUs: { title: 'ทำไมเลือก Astralo?', technology: { title: 'เทคโนโลยี', description: 'เทคโนโลยีทันสมัย' }, instant: { title: 'ทันที', description: 'พร้อมในไม่กี่นาที' }, professional: { title: 'มืออาชีพ', description: 'หลักโหราศาสตร์' }, verified: { title: 'ยืนยันแล้ว', description: '50,000+ ลูกค้า' } },
    form: { title: 'รับดวงของคุณ', name: 'ชื่อ-นามสกุล', email: 'อีเมล', birthDate: 'วันเกิด', birthTime: 'เวลา (ไม่บังคับ)', birthPlace: 'สถานที่เกิด', partnerName: 'ชื่อคู่รัก', partnerBirthDate: 'วันเกิดคู่รัก', partnerBirthTime: 'เวลาคู่รัก', partnerBirthPlace: 'สถานที่เกิดคู่รัก', submit: 'ดำเนินการชำระเงิน', processing: 'กำลังดำเนินการ...' },
    success: { title: 'ขอบคุณ!', message: 'ชำระเงินสำเร็จ', checkEmail: 'ดวงจะส่งไปยังอีเมลของคุณ' },
    footer: { rights: 'สงวนลิขสิทธิ์', terms: 'เงื่อนไข', privacy: 'ความเป็นส่วนตัว', refund: 'คืนเงิน', cookies: 'คุกกี้' },
};

// Vietnamese translations
const viTranslations: Translations = {
    meta: { title: 'Astralo - Tử Vi Chuyên Nghiệp', description: 'Nhận tử vi cá nhân với công nghệ AI.', keywords: 'tử vi, chiêm tinh, cung hoàng đạo' },
    header: { badge: 'AI Tử Vi', online: 'Trực tuyến' },
    promo: { offer: 'ƯU ĐÃI HẠN CHẾ: Giảm 50%!', delivery: 'Giao hàng ngay', customers: '50.000+ khách hài lòng', secure: 'Thanh toán an toàn' },
    hero: { title: 'Tử Vi Cá Nhân Của Bạn', subtitle: 'Cuối cùng cũng có tử vi chính xác • Được tạo riêng cho bạn', features: '✨ Giao hàng ngay • 🔒 Thanh toán an toàn • ⭐ 50.000+ khách hàng' },
    products: { daily: { name: 'Tử Vi Hàng Ngày', description: 'Dự đoán chi tiết cho 24 giờ tới', wordCount: '~200 từ', benefits: ['🍀 Số may mắn', '📅 Thời gian tốt nhất', '💎 Màu gợi ý', '⭐ Lời khuyên hôm nay'] }, weekly: { name: 'Tử Vi Hàng Tuần', description: 'Tổng quan tuần với ngày quan trọng', wordCount: '~400 từ', benefits: ['🎯 Ngày may mắn', '💰 Dự báo tài chính', '❤️ Tình yêu', '💼 Sự nghiệp'] }, monthly: { name: 'Tử Vi Hàng Tháng', description: 'Phân tích tháng với sự kiện chính', wordCount: '~1000 từ', benefits: ['🌟 Ngày tốt nhất', '💎 Đá may mắn', '🌈 Sóng năng lượng', '🎨 Màu sắc'] }, partner: { name: 'Tử Vi Cặp Đôi', description: 'Phân tích tương hợp', wordCount: '~1200 từ', benefits: ['💕 Độ tương hợp', '🔮 Điểm mạnh', '⚠️ Lĩnh vực phát triển', '💫 Tương lai chung'] } },
    cta: { orderNow: 'Đặt Ngay', popular: 'Phổ biến nhất' },
    trust: { customers: 'Khách hài lòng', rating: 'Đánh giá trung bình', delivery: 'Giao hàng ngay' },
    testimonials: { title: 'Khách hàng nói gì' },
    whyUs: { title: 'Tại sao chọn Astralo?', technology: { title: 'Công nghệ', description: 'Công nghệ hiện đại' }, instant: { title: 'Ngay lập tức', description: 'Sẵn sàng trong vài phút' }, professional: { title: 'Chuyên nghiệp', description: 'Nguyên tắc chiêm tinh' }, verified: { title: 'Đã xác minh', description: '50.000+ khách hàng' } },
    form: { title: 'Nhận tử vi', name: 'Họ tên', email: 'Email', birthDate: 'Ngày sinh', birthTime: 'Giờ (tùy chọn)', birthPlace: 'Nơi sinh', partnerName: 'Tên đối tác', partnerBirthDate: 'Ngày sinh đối tác', partnerBirthTime: 'Giờ đối tác', partnerBirthPlace: 'Nơi sinh đối tác', submit: 'Tiếp tục thanh toán', processing: 'Đang xử lý...' },
    success: { title: 'Cảm ơn!', message: 'Thanh toán thành công.', checkEmail: 'Tử vi sẽ được gửi đến email của bạn.' },
    footer: { rights: 'Bảo lưu mọi quyền.', terms: 'Điều khoản', privacy: 'Riêng tư', refund: 'Hoàn tiền', cookies: 'Cookies' },
};

// Indonesian translations
const idTranslations: Translations = {
    meta: { title: 'Astralo - Horoskop Profesional', description: 'Dapatkan horoskop pribadi dengan teknologi AI.', keywords: 'horoskop, astrologi, zodiak' },
    header: { badge: 'AI Horoskop', online: 'Online' },
    promo: { offer: 'PENAWARAN TERBATAS: Diskon 50%!', delivery: 'Pengiriman instan', customers: '50.000+ pelanggan puas', secure: 'Pembayaran aman' },
    hero: { title: 'Horoskop Pribadi Anda', subtitle: 'Akhirnya horoskop yang akurat • Dibuat khusus untuk Anda', features: '✨ Pengiriman instan • 🔒 Pembayaran aman • ⭐ 50.000+ pelanggan' },
    products: { daily: { name: 'Horoskop Harian', description: 'Prediksi detail untuk 24 jam ke depan', wordCount: '~200 kata', benefits: ['🍀 Angka keberuntungan', '📅 Waktu terbaik', '💎 Warna disarankan', '⭐ Saran hari ini'] }, weekly: { name: 'Horoskop Mingguan', description: 'Tinjauan minggu dengan tanggal penting', wordCount: '~400 kata', benefits: ['🎯 Hari keberuntungan', '💰 Ramalan keuangan', '❤️ Cinta', '💼 Karir'] }, monthly: { name: 'Horoskop Bulanan', description: 'Analisis bulanan dengan acara utama', wordCount: '~1000 kata', benefits: ['🌟 Hari terbaik', '💎 Batu keberuntungan', '🌈 Gelombang energi', '🎨 Warna'] }, partner: { name: 'Horoskop Pasangan', description: 'Analisis kompatibilitas', wordCount: '~1200 kata', benefits: ['💕 Kompatibilitas', '🔮 Kekuatan', '⚠️ Area pertumbuhan', '💫 Masa depan bersama'] } },
    cta: { orderNow: 'Pesan Sekarang', popular: 'Paling Populer' },
    trust: { customers: 'Pelanggan puas', rating: 'Rating rata-rata', delivery: 'Pengiriman instan' },
    testimonials: { title: 'Kata pelanggan kami' },
    whyUs: { title: 'Mengapa Astralo?', technology: { title: 'Teknologi', description: 'Teknologi modern' }, instant: { title: 'Instan', description: 'Siap dalam menit' }, professional: { title: 'Profesional', description: 'Prinsip astrologi' }, verified: { title: 'Terverifikasi', description: '50.000+ pelanggan' } },
    form: { title: 'Dapatkan horoskop', name: 'Nama lengkap', email: 'Email', birthDate: 'Tanggal lahir', birthTime: 'Waktu (opsional)', birthPlace: 'Tempat lahir', partnerName: 'Nama pasangan', partnerBirthDate: 'Tanggal lahir pasangan', partnerBirthTime: 'Waktu pasangan', partnerBirthPlace: 'Tempat lahir pasangan', submit: 'Lanjut ke pembayaran', processing: 'Memproses...' },
    success: { title: 'Terima kasih!', message: 'Pembayaran berhasil.', checkEmail: 'Horoskop akan dikirim ke email Anda.' },
    footer: { rights: 'Hak cipta dilindungi.', terms: 'Ketentuan', privacy: 'Privasi', refund: 'Pengembalian', cookies: 'Cookies' },
};

// Swedish translations
const svTranslations: Translations = {
    meta: { title: 'Astralo - Professionella Horoskop', description: 'Få ditt personliga horoskop med AI-teknik.', keywords: 'horoskop, astrologi, stjärntecken' },
    header: { badge: 'AI Horoskop', online: 'Online' },
    promo: { offer: 'BEGRÄNSAT ERBJUDANDE: 50% rabatt!', delivery: 'Omedelbar leverans', customers: '50 000+ nöjda kunder', secure: 'Säker betalning' },
    hero: { title: 'Ditt Personliga Horoskop', subtitle: 'Äntligen ett korrekt horoskop • Skapat speciellt för dig', features: '✨ Omedelbar leverans • 🔒 Säkra betalningar • ⭐ 50 000+ kunder' },
    products: { daily: { name: 'Dagligt Horoskop', description: 'Detaljerade förutsägelser för de närmaste 24 timmarna', wordCount: '~200 ord', benefits: ['🍀 Lyckotal', '📅 Bästa tiden', '💎 Rekommenderad färg', '⭐ Dagens råd'] }, weekly: { name: 'Veckohoroskop', description: 'Veckoöversikt med viktiga datum', wordCount: '~400 ord', benefits: ['🎯 Lyckodag', '💰 Ekonomisk prognos', '❤️ Kärlek', '💼 Karriär'] }, monthly: { name: 'Månadshoroskop', description: 'Månadsanalys med viktiga händelser', wordCount: '~1000 ord', benefits: ['🌟 Bästa dagen', '💎 Lyckostenar', '🌈 Energivågor', '🎨 Färger'] }, partner: { name: 'Partnerhoroskop', description: 'Kompatibilitetsanalys', wordCount: '~1200 ord', benefits: ['💕 Kompatibilitet', '🔮 Styrkor', '⚠️ Tillväxtområden', '💫 Gemensam framtid'] } },
    cta: { orderNow: 'Beställ Nu', popular: 'Mest Populär' },
    trust: { customers: 'Nöjda kunder', rating: 'Genomsnittsbetyg', delivery: 'Omedelbar leverans' },
    testimonials: { title: 'Vad våra kunder säger' },
    whyUs: { title: 'Varför välja Astralo?', technology: { title: 'Teknik', description: 'Modern teknik' }, instant: { title: 'Omedelbart', description: 'Klart på minuter' }, professional: { title: 'Professionellt', description: 'Astrologiska principer' }, verified: { title: 'Verifierat', description: '50 000+ kunder' } },
    form: { title: 'Få ditt horoskop', name: 'Fullständigt namn', email: 'E-post', birthDate: 'Födelsedatum', birthTime: 'Tid (valfritt)', birthPlace: 'Födelseort', partnerName: 'Partners namn', partnerBirthDate: 'Partners födelsedatum', partnerBirthTime: 'Partners tid', partnerBirthPlace: 'Partners födelseort', submit: 'Fortsätt till betalning', processing: 'Bearbetar...' },
    success: { title: 'Tack!', message: 'Betalningen lyckades.', checkEmail: 'Ditt horoskop skickas till din e-post.' },
    footer: { rights: 'Alla rättigheter förbehållna.', terms: 'Villkor', privacy: 'Integritet', refund: 'Återbetalning', cookies: 'Cookies' },
};

// Danish translations
const daTranslations: Translations = {
    meta: { title: 'Astralo - Professionelle Horoskoper', description: 'Få dit personlige horoskop med AI-teknologi.', keywords: 'horoskop, astrologi, stjernetegn' },
    header: { badge: 'AI Horoskoper', online: 'Online' },
    promo: { offer: 'BEGRÆNSET TILBUD: 50% rabat!', delivery: 'Øjeblikkelig levering', customers: '50.000+ tilfredse kunder', secure: 'Sikker betaling' },
    hero: { title: 'Dit Personlige Horoskop', subtitle: 'Endelig et præcist horoskop • Skabt specielt til dig', features: '✨ Øjeblikkelig levering • 🔒 Sikre betalinger • ⭐ 50.000+ kunder' },
    products: { daily: { name: 'Dagligt Horoskop', description: 'Detaljerede forudsigelser for de næste 24 timer', wordCount: '~200 ord', benefits: ['🍀 Lykketal', '📅 Bedste tidspunkt', '💎 Anbefalet farve', '⭐ Dagens råd'] }, weekly: { name: 'Ugehoroskop', description: 'Ugeoverblik med vigtige datoer', wordCount: '~400 ord', benefits: ['🎯 Heldig dag', '💰 Økonomisk prognose', '❤️ Kærlighed', '💼 Karriere'] }, monthly: { name: 'Månedshoroskop', description: 'Månedsanalyse med vigtige begivenheder', wordCount: '~1000 ord', benefits: ['🌟 Bedste dag', '💎 Lykkesten', '🌈 Energibølger', '🎨 Farver'] }, partner: { name: 'Partnerhoroskop', description: 'Kompatibilitetsanalyse', wordCount: '~1200 ord', benefits: ['💕 Kompatibilitet', '🔮 Styrker', '⚠️ Vækstområder', '💫 Fælles fremtid'] } },
    cta: { orderNow: 'Bestil Nu', popular: 'Mest Populær' },
    trust: { customers: 'Tilfredse kunder', rating: 'Gennemsnitlig vurdering', delivery: 'Øjeblikkelig levering' },
    testimonials: { title: 'Hvad vores kunder siger' },
    whyUs: { title: 'Hvorfor vælge Astralo?', technology: { title: 'Teknologi', description: 'Moderne teknologi' }, instant: { title: 'Øjeblikkeligt', description: 'Klar på minutter' }, professional: { title: 'Professionelt', description: 'Astrologiske principper' }, verified: { title: 'Verificeret', description: '50.000+ kunder' } },
    form: { title: 'Få dit horoskop', name: 'Fulde navn', email: 'E-mail', birthDate: 'Fødselsdato', birthTime: 'Tid (valgfrit)', birthPlace: 'Fødested', partnerName: 'Partners navn', partnerBirthDate: 'Partners fødselsdato', partnerBirthTime: 'Partners tid', partnerBirthPlace: 'Partners fødested', submit: 'Fortsæt til betaling', processing: 'Behandler...' },
    success: { title: 'Tak!', message: 'Betalingen lykkedes.', checkEmail: 'Dit horoskop sendes til din e-mail.' },
    footer: { rights: 'Alle rettigheder forbeholdes.', terms: 'Vilkår', privacy: 'Privatliv', refund: 'Refusion', cookies: 'Cookies' },
};

// Finnish translations
const fiTranslations: Translations = {
    meta: { title: 'Astralo - Ammattimaiset Horoskooppit', description: 'Hanki henkilökohtainen horoskooppisi AI-teknologialla.', keywords: 'horoskooppi, astrologia, horoskooppimerkki' },
    header: { badge: 'AI Horoskooppi', online: 'Online' },
    promo: { offer: 'RAJOITETTU TARJOUS: 50% alennus!', delivery: 'Välitön toimitus', customers: '50 000+ tyytyväistä asiakasta', secure: 'Turvallinen maksu' },
    hero: { title: 'Henkilökohtainen Horoskooppisi', subtitle: 'Vihdoin tarkka horoskooppi • Luotu erityisesti sinulle', features: '✨ Välitön toimitus • 🔒 Turvalliset maksut • ⭐ 50 000+ asiakasta' },
    products: { daily: { name: 'Päivähoroskooppi', description: 'Yksityiskohtaiset ennusteet seuraavalle 24 tunnille', wordCount: '~200 sanaa', benefits: ['🍀 Onnennumero', '📅 Paras aika', '💎 Suositeltu väri', '⭐ Päivän neuvo'] }, weekly: { name: 'Viikkohoroskooppi', description: 'Viikon yleiskatsaus tärkeillä päivämäärillä', wordCount: '~400 sanaa', benefits: ['🎯 Onnenpäivä', '💰 Talousennuste', '❤️ Rakkaus', '💼 Ura'] }, monthly: { name: 'Kuukausihoroskooppi', description: 'Kuukausianalyysi tärkeillä tapahtumilla', wordCount: '~1000 sanaa', benefits: ['🌟 Paras päivä', '💎 Onnenkivet', '🌈 Energia-aallot', '🎨 Värit'] }, partner: { name: 'Kumppanihoroskooppi', description: 'Yhteensopivuusanalyysi', wordCount: '~1200 sanaa', benefits: ['💕 Yhteensopivuus', '🔮 Vahvuudet', '⚠️ Kasvualueet', '💫 Yhteinen tulevaisuus'] } },
    cta: { orderNow: 'Tilaa Nyt', popular: 'Suosituin' },
    trust: { customers: 'Tyytyväisiä asiakkaita', rating: 'Keskiarviointi', delivery: 'Välitön toimitus' },
    testimonials: { title: 'Mitä asiakkaamme sanovat' },
    whyUs: { title: 'Miksi valita Astralo?', technology: { title: 'Teknologia', description: 'Moderni teknologia' }, instant: { title: 'Välitön', description: 'Valmis minuuteissa' }, professional: { title: 'Ammattimainen', description: 'Astrologiset periaatteet' }, verified: { title: 'Vahvistettu', description: '50 000+ asiakasta' } },
    form: { title: 'Hanki horoskooppisi', name: 'Koko nimi', email: 'Sähköposti', birthDate: 'Syntymäaika', birthTime: 'Aika (valinnainen)', birthPlace: 'Syntymäpaikka', partnerName: 'Kumppanin nimi', partnerBirthDate: 'Kumppanin syntymäaika', partnerBirthTime: 'Kumppanin aika', partnerBirthPlace: 'Kumppanin syntymäpaikka', submit: 'Jatka maksuun', processing: 'Käsitellään...' },
    success: { title: 'Kiitos!', message: 'Maksu onnistui.', checkEmail: 'Horoskooppisi lähetetään sähköpostiisi.' },
    footer: { rights: 'Kaikki oikeudet pidätetään.', terms: 'Ehdot', privacy: 'Tietosuoja', refund: 'Palautus', cookies: 'Evästeet' },
};

// Norwegian translations
const noTranslations: Translations = {
    meta: { title: 'Astralo - Profesjonelle Horoskoper', description: 'Få ditt personlige horoskop med AI-teknologi.', keywords: 'horoskop, astrologi, stjernetegn' },
    header: { badge: 'AI Horoskop', online: 'Online' },
    promo: { offer: 'BEGRENSET TILBUD: 50% rabatt!', delivery: 'Umiddelbar levering', customers: '50 000+ fornøyde kunder', secure: 'Sikker betaling' },
    hero: { title: 'Ditt Personlige Horoskop', subtitle: 'Endelig et nøyaktig horoskop • Laget spesielt for deg', features: '✨ Umiddelbar levering • 🔒 Sikre betalinger • ⭐ 50 000+ kunder' },
    products: { daily: { name: 'Daglig Horoskop', description: 'Detaljerte spådommer for de neste 24 timene', wordCount: '~200 ord', benefits: ['🍀 Lykketall', '📅 Beste tid', '💎 Anbefalt farge', '⭐ Dagens råd'] }, weekly: { name: 'Ukehoroskop', description: 'Ukeoversikt med viktige datoer', wordCount: '~400 ord', benefits: ['🎯 Lykkedag', '💰 Økonomisk prognose', '❤️ Kjærlighet', '💼 Karriere'] }, monthly: { name: 'Månedshoroskop', description: 'Månedsanalyse med viktige hendelser', wordCount: '~1000 ord', benefits: ['🌟 Beste dag', '💎 Lykkesteiner', '🌈 Energibølger', '🎨 Farger'] }, partner: { name: 'Partnerhoroskop', description: 'Kompatibilitetsanalyse', wordCount: '~1200 ord', benefits: ['💕 Kompatibilitet', '🔮 Styrker', '⚠️ Vekstområder', '💫 Felles fremtid'] } },
    cta: { orderNow: 'Bestill Nå', popular: 'Mest Populær' },
    trust: { customers: 'Fornøyde kunder', rating: 'Gjennomsnittlig vurdering', delivery: 'Umiddelbar levering' },
    testimonials: { title: 'Hva kundene våre sier' },
    whyUs: { title: 'Hvorfor velge Astralo?', technology: { title: 'Teknologi', description: 'Moderne teknologi' }, instant: { title: 'Umiddelbart', description: 'Klar på minutter' }, professional: { title: 'Profesjonelt', description: 'Astrologiske prinsipper' }, verified: { title: 'Verifisert', description: '50 000+ kunder' } },
    form: { title: 'Få horoskopet ditt', name: 'Fullt navn', email: 'E-post', birthDate: 'Fødselsdato', birthTime: 'Tid (valgfritt)', birthPlace: 'Fødested', partnerName: 'Partners navn', partnerBirthDate: 'Partners fødselsdato', partnerBirthTime: 'Partners tid', partnerBirthPlace: 'Partners fødested', submit: 'Fortsett til betaling', processing: 'Behandler...' },
    success: { title: 'Takk!', message: 'Betalingen var vellykket.', checkEmail: 'Horoskopet ditt sendes til e-posten din.' },
    footer: { rights: 'Alle rettigheter reservert.', terms: 'Vilkår', privacy: 'Personvern', refund: 'Refusjon', cookies: 'Informasjonskapsler' },
};

// Bengali translations
const bnTranslations: Translations = {
    meta: { title: 'Astralo - পেশাদার রাশিফল', description: 'AI প্রযুক্তি দিয়ে আপনার ব্যক্তিগত রাশিফল পান।', keywords: 'রাশিফল, জ্যোতিষ, রাশি' },
    header: { badge: 'AI রাশিফল', online: 'অনলাইন' },
    promo: { offer: 'সীমিত অফার: ৫০% ছাড়!', delivery: 'তাৎক্ষণিক ডেলিভারি', customers: '৫০,০০০+ সন্তুষ্ট গ্রাহক', secure: 'নিরাপদ পেমেন্ট' },
    hero: { title: 'আপনার ব্যক্তিগত রাশিফল', subtitle: 'অবশেষে সঠিক রাশিফল • বিশেষভাবে আপনার জন্য তৈরি', features: '✨ তাৎক্ষণিক ডেলিভারি • 🔒 নিরাপদ পেমেন্ট • ⭐ ৫০,০০০+ গ্রাহক' },
    products: { daily: { name: 'দৈনিক রাশিফল', description: 'পরবর্তী ২৪ ঘণ্টার বিস্তারিত ভবিষ্যদ্বাণী', wordCount: '~২০০ শব্দ', benefits: ['🍀 ভাগ্যবান সংখ্যা', '📅 সেরা সময়', '💎 প্রস্তাবিত রঙ', '⭐ দৈনিক পরামর্শ'] }, weekly: { name: 'সাপ্তাহিক রাশিফল', description: 'গুরুত্বপূর্ণ তারিখ সহ সপ্তাহের সারসংক্ষেপ', wordCount: '~৪০০ শব্দ', benefits: ['🎯 ভাগ্যবান দিন', '💰 আর্থিক পূর্বাভাস', '❤️ প্রেম', '💼 ক্যারিয়ার'] }, monthly: { name: 'মাসিক রাশিফল', description: 'প্রধান ঘটনা সহ মাসিক বিশ্লেষণ', wordCount: '~১০০০ শব্দ', benefits: ['🌟 সেরা দিন', '💎 ভাগ্যবান পাথর', '🌈 শক্তি তরঙ্গ', '🎨 রং'] }, partner: { name: 'সঙ্গী রাশিফল', description: 'সামঞ্জস্য বিশ্লেষণ', wordCount: '~১২০০ শব্দ', benefits: ['💕 সামঞ্জস্য', '🔮 শক্তি', '⚠️ বৃদ্ধির ক্ষেত্র', '💫 ভাগ করা ভবিষ্যত'] } },
    cta: { orderNow: 'এখনই অর্ডার করুন', popular: 'সবচেয়ে জনপ্রিয়' },
    trust: { customers: 'সন্তুষ্ট গ্রাহক', rating: 'গড় রেটিং', delivery: 'তাৎক্ষণিক ডেলিভারি' },
    testimonials: { title: 'গ্রাহকরা কী বলেন' },
    whyUs: { title: 'কেন Astralo বেছে নেবেন?', technology: { title: 'প্রযুক্তি', description: 'আধুনিক প্রযুক্তি' }, instant: { title: 'তাৎক্ষণিক', description: 'মিনিটে প্রস্তুত' }, professional: { title: 'পেশাদার', description: 'জ্যোতিষ নীতি' }, verified: { title: 'যাচাইকৃত', description: '৫০,০০০+ গ্রাহক' } },
    form: { title: 'রাশিফল পান', name: 'পুরো নাম', email: 'ইমেইল', birthDate: 'জন্ম তারিখ', birthTime: 'সময় (ঐচ্ছিক)', birthPlace: 'জন্মস্থান', partnerName: 'সঙ্গীর নাম', partnerBirthDate: 'সঙ্গীর জন্ম তারিখ', partnerBirthTime: 'সঙ্গীর সময়', partnerBirthPlace: 'সঙ্গীর জন্মস্থান', submit: 'পেমেন্টে যান', processing: 'প্রক্রিয়াকরণ...' },
    success: { title: 'ধন্যবাদ!', message: 'পেমেন্ট সফল।', checkEmail: 'আপনার রাশিফল ইমেইলে পাঠানো হবে।' },
    footer: { rights: 'সর্বস্বত্ব সংরক্ষিত।', terms: 'শর্তাবলী', privacy: 'গোপনীয়তা', refund: 'ফেরত', cookies: 'কুকিজ' },
};

// All translations map - all 31 languages now translated
const translations: Record<SupportedLocale, Translations> = {
    en: enTranslations,
    sk: skTranslations,
    cs: csTranslations,
    de: deTranslations,
    fr: frTranslations,
    es: esTranslations,
    it: itTranslations,
    pt: ptTranslations,
    nl: nlTranslations,
    pl: plTranslations,
    hu: huTranslations,
    ro: roTranslations,
    bg: bgTranslations,
    hr: hrTranslations,
    sl: slTranslations,
    sr: srTranslations,
    uk: ukTranslations,
    ru: ruTranslations,
    el: elTranslations,
    tr: trTranslations,
    ar: arTranslations,
    hi: hiTranslations,
    ja: jaTranslations,
    ko: koTranslations,
    zh: zhTranslations,
    th: thTranslations,
    vi: viTranslations,
    id: idTranslations,
    sv: svTranslations,
    da: daTranslations,
    fi: fiTranslations,
    no: noTranslations,
    bn: bnTranslations,
};

export { translations };
