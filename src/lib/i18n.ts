/**
 * i18n - Internationalization System
 * Supports 31 languages for global reach
 * 
 * Translations are stored in src/locales/translations.ts
 * Types are defined in src/locales/types.ts
 */

// Re-export types
export type { SupportedLocale, LocaleConfig, Translations } from '../locales/types';
import type { SupportedLocale, LocaleConfig, Translations } from '../locales/types';

// Import translations from individual locale files
import { translations } from '../locales/index';
export { translations };

// Locale configurations
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
    he: { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl' },
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

// Get translations for a specific locale
export function getTranslations(locale: SupportedLocale): Translations {
    return translations[locale] || translations.en;
}