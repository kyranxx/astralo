/**
 * Blog Content Module - Main Export
 * Aggregates all article translations and provides helper functions
 */

import { dailyHoroscopeGuide } from './articles/daily-horoscope-guide/index';
import { zodiacCompatibilityCompleteGuide } from './articles/zodiac-compatibility-complete-guide/index';
import { birthChartReadingExplained } from './articles/birth-chart-reading-explained/index';
import { monthlyHoroscopeJanuary2026 } from './articles/monthly-horoscope-january-2026/index';
import { monthlyHoroscope as monthlyHoroscopeFeb } from './articles/monthly-horoscope-february-2026/index';
import { loveHoroscopeRelationshipAdvice } from './articles/love-horoscope-relationship-advice/index';
import { mercuryRetrogradeSurvivalGuide } from './articles/mercury-retrograde-survival-guide/index';
import { historyOfAstrology } from './articles/history-of-astrology/index';
import { the12HousesOfAstrology } from './articles/the-12-houses-of-astrology/index';
import { saturnReturnGuide } from './articles/saturn-return-guide/index';
import { twinFlamesAndSoulmatesAstrology } from './articles/twin-flames-and-soulmates-astrology/index';

import type { BlogPostTranslation, BlogPostMeta } from './types';
export type { BlogPostTranslation, BlogPostMeta } from './types';
import { blogUiTranslations, type BlogUiTranslations } from './ui-translations';

// All article translations indexed by slug
const articleTranslations: Record<string, Record<string, BlogPostTranslation>> = {
    'daily-horoscope-guide': dailyHoroscopeGuide,
    'zodiac-compatibility-complete-guide': zodiacCompatibilityCompleteGuide,
    'birth-chart-reading-explained': birthChartReadingExplained,
    'monthly-horoscope-january-2026': monthlyHoroscopeJanuary2026,
    'monthly-horoscope-february-2026': monthlyHoroscopeFeb,
    'love-horoscope-relationship-advice': loveHoroscopeRelationshipAdvice,
    'mercury-retrograde-survival-guide': mercuryRetrogradeSurvivalGuide,
    'history-of-astrology': historyOfAstrology,
    'the-12-houses-of-astrology': the12HousesOfAstrology,
    'saturn-return-guide': saturnReturnGuide,
    'twin-flames-and-soulmates-astrology': twinFlamesAndSoulmatesAstrology,
};

// Article metadata (language-independent)
export const articleMeta: Record<string, BlogPostMeta> = {
    'daily-horoscope-guide': {
        slug: 'daily-horoscope-guide',
        emoji: '⭐',
        date: '2026-12-20',
        readTime: '8',
        author: 'Astralo Team',
    },
    'zodiac-compatibility-complete-guide': {
        slug: 'zodiac-compatibility-complete-guide',
        emoji: '❤️',
        date: '2026-12-18',
        readTime: '12',
        author: 'Astralo Team',
    },
    'birth-chart-reading-explained': {
        slug: 'birth-chart-reading-explained',
        emoji: '🔮',
        date: '2026-12-15',
        readTime: '10',
        author: 'Astralo Team',
    },
    'monthly-horoscope-january-2026': {
        slug: 'monthly-horoscope-january-2026',
        emoji: '🌙',
        date: '2026-01-01',
        readTime: '15',
        author: 'Astralo Team',
    },
    'monthly-horoscope-february-2026': {
        slug: 'monthly-horoscope-february-2026',
        emoji: '❤️',
        date: '2026-02-01',
        readTime: '15',
        author: 'Astralo Team',
    },
    'love-horoscope-relationship-advice': {
        slug: 'love-horoscope-relationship-advice',
        emoji: '💕',
        date: '2026-12-10',
        readTime: '9',
        author: 'Astralo Team',
    },
    'mercury-retrograde-survival-guide': {
        slug: 'mercury-retrograde-survival-guide',
        emoji: '☄️',
        date: '2026-01-15',
        readTime: '18',
        author: 'Astralo Team',
    },
    'history-of-astrology': {
        slug: 'history-of-astrology',
        emoji: '🏛️',
        date: '2026-01-10',
        readTime: '22',
        author: 'Astralo Team',
    },
    'the-12-houses-of-astrology': {
        slug: 'the-12-houses-of-astrology',
        emoji: '🏠',
        date: '2026-01-24',
        readTime: '35',
        author: 'Astralo Team',
    },
    'saturn-return-guide': {
        slug: 'saturn-return-guide',
        emoji: '🪐',
        date: '2026-01-24',
        readTime: '40',
        author: 'Astralo Team',
    },
    'twin-flames-and-soulmates-astrology': {
        slug: 'twin-flames-and-soulmates-astrology',
        emoji: '🔥',
        date: '2026-01-24',
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

/**
 * Get UI translations for blog pages
 */
export function getBlogUiTranslations(lang: string): BlogUiTranslations {
    return blogUiTranslations[lang] || blogUiTranslations.en;
}

/**
 * Get all article slugs
 */
export function getAllArticleSlugs(): string[] {
    return Object.keys(articleMeta);
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
