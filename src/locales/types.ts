/**
 * i18n Types - Shared types for internationalization
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
