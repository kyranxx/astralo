/**
 * Blog Content Module - Main Export
 * Aggregates all article translations and provides helper functions
 */

import { dailyHoroscopeGuide } from './articles/daily-horoscope-guide/index';
import { zodiacCompatibilityCompleteGuide } from './articles/zodiac-compatibility-complete-guide/index';
import { birthChartReadingExplained } from './articles/birth-chart-reading-explained/index';
import { monthlyHoroscopeJuly2026 } from './articles/monthly-horoscope-july-2026/index';
import { loveHoroscopeRelationshipAdvice } from './articles/love-horoscope-relationship-advice/index';
import { mercuryRetrogradeSurvivalGuide } from './articles/mercury-retrograde-survival-guide/index';
import { the12HousesOfAstrology } from './articles/the-12-houses-of-astrology/index';
import { saturnReturnGuide } from './articles/saturn-return-guide/index';
import { twinFlamesAndSoulmatesAstrology } from './articles/twin-flames-and-soulmates-astrology/index';
import { weeklyHoroscopePredictions } from './articles/weekly-horoscope-predictions/index';

import type { BlogPostTranslation, BlogPostMeta } from './types';
export type { BlogPostTranslation, BlogPostMeta } from './types';
import type { SupportedLocale } from '../i18n';
import { blogUiTranslations, type BlogUiTranslations } from './ui-translations';
import { isStaleMonthlyHoroscopeSlug } from '../indexing';

// All article translations indexed by slug
const articleTranslations: Record<string, Record<string, BlogPostTranslation>> = {
    'daily-horoscope-guide': dailyHoroscopeGuide,
    'zodiac-compatibility-complete-guide': zodiacCompatibilityCompleteGuide,
    'birth-chart-reading-explained': birthChartReadingExplained,
    'monthly-horoscope-july-2026': monthlyHoroscopeJuly2026,
    'love-horoscope-relationship-advice': loveHoroscopeRelationshipAdvice,
    'mercury-retrograde-survival-guide': mercuryRetrogradeSurvivalGuide,
    'the-12-houses-of-astrology': the12HousesOfAstrology,
    'saturn-return-guide': saturnReturnGuide,
    'twin-flames-and-soulmates-astrology': twinFlamesAndSoulmatesAstrology,
    'weekly-horoscope-predictions': weeklyHoroscopePredictions,
};

// Article metadata (language-independent)
export const articleMeta: Record<string, BlogPostMeta> = {
    'daily-horoscope-guide': {
        slug: 'daily-horoscope-guide',
        emoji: '⭐',
        date: '2026-03-10',
        readTime: '8',
        author: 'Astralo Team',
    },
    'zodiac-compatibility-complete-guide': {
        slug: 'zodiac-compatibility-complete-guide',
        emoji: '❤️',
        date: '2026-03-08',
        readTime: '12',
        author: 'Astralo Team',
    },
    'birth-chart-reading-explained': {
        slug: 'birth-chart-reading-explained',
        emoji: '🔮',
        date: '2026-03-07',
        readTime: '10',
        author: 'Astralo Team',
    },
    'monthly-horoscope-july-2026': {
        slug: 'monthly-horoscope-july-2026',
        emoji: '♋',
        date: '2026-05-28',
        readTime: '10',
        author: 'Astralo Team',
    },
    'love-horoscope-relationship-advice': {
        slug: 'love-horoscope-relationship-advice',
        emoji: '💕',
        date: '2026-03-05',
        readTime: '9',
        author: 'Astralo Team',
    },
    'weekly-horoscope-predictions': {
        slug: 'weekly-horoscope-predictions',
        emoji: '📅',
        date: '2026-03-06',
        readTime: '10',
        author: 'Astralo Team',
    },
    'mercury-retrograde-survival-guide': {
        slug: 'mercury-retrograde-survival-guide',
        emoji: '☄️',
        date: '2026-02-24',
        readTime: '18',
        author: 'Astralo Team',
    },
    'the-12-houses-of-astrology': {
        slug: 'the-12-houses-of-astrology',
        emoji: '🏠',
        date: '2026-03-01',
        readTime: '35',
        author: 'Astralo Team',
    },
    'saturn-return-guide': {
        slug: 'saturn-return-guide',
        emoji: '🪐',
        date: '2026-02-27',
        readTime: '40',
        author: 'Astralo Team',
    },
    'twin-flames-and-soulmates-astrology': {
        slug: 'twin-flames-and-soulmates-astrology',
        emoji: '🔥',
        date: '2026-03-03',
        readTime: '45',
        author: 'Astralo Team',
    },
};

/**
 * Get full article translation for a specific language
 * Falls back to English if translation doesn't exist
 */
export function getArticleTranslation(slug: string, lang: string): BlogPostTranslation | null {
    const article = articleTranslations[slug];
    if (!article) return null;

    return article[lang] || article.en || null;
}

export function getExactArticleTranslation(slug: string, lang: string): BlogPostTranslation | null {
    return articleTranslations[slug]?.[lang] || null;
}

export function hasArticleTranslation(slug: string, lang: string): boolean {
    return Boolean(articleTranslations[slug]?.[lang]);
}

export function getArticleLanguageCodes(slug: string): SupportedLocale[] {
    return Object.keys(articleTranslations[slug] || {}) as SupportedLocale[];
}

export function getBlogSeoTitle(title: string, seoTitle?: string): string {
    if (seoTitle?.trim()) return seoTitle.trim();

    const cleanTitle = getBlogDisplayTitle(title);
    const conciseTitle = cleanTitle.split(':')[0]?.trim();

    return conciseTitle && conciseTitle.length >= 12 ? conciseTitle : cleanTitle;
}

export function getBlogDisplayTitle(title: string): string {
    return stripEmojis(title).trim() || title;
}

function stripEmojis(value: string): string {
    return value
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1F02F}]|[\u{200D}]|[\u{2B00}-\u{2BFF}]/gu, '')
        .trim();
}

/**
 * Get UI translations for blog pages
 */
export function getBlogUiTranslations(lang: string): BlogUiTranslations {
    const translations = blogUiTranslations[lang] || blogUiTranslations.en;

    return {
        ...translations,
        orderNow: translations.orderNow.split(' - ')[0],
    };
}

/**
 * Get all article slugs
 */
export function getAllArticleSlugs(): string[] {
    return Object.keys(articleMeta);
}

/**
 * Get latest article slugs sorted by publish date descending
 */
export function getLatestArticleSlugs(limit = Object.keys(articleMeta).length): string[] {
    return Object.values(articleMeta)
        .slice()
        .filter((article) => !isStaleMonthlyHoroscopeSlug(article.slug))
        .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
        .slice(0, limit)
        .map((article) => article.slug);
}

export function getIndexableArticleSlugs(): string[] {
    return Object.keys(articleMeta).filter((slug) => !isStaleMonthlyHoroscopeSlug(slug));
}

export function getArticleSlugsForLang(lang: string): string[] {
    return Object.keys(articleMeta).filter((slug) => hasArticleTranslation(slug, lang));
}

export function getLatestArticleSlugsForLang(lang: string, limit = Object.keys(articleMeta).length): string[] {
    return Object.values(articleMeta)
        .slice()
        .filter((article) => hasArticleTranslation(article.slug, lang))
        .filter((article) => !isStaleMonthlyHoroscopeSlug(article.slug))
        .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
        .slice(0, limit)
        .map((article) => article.slug);
}

/**
 * Get article metadata
 */
export function getArticleMeta(slug: string): BlogPostMeta | null {
    return articleMeta[slug] || null;
}

// Re-export for compatibility
export { blogUiTranslations };
export type { BlogUiTranslations };
