/**
 * Blog Content Module - Main Export
 * Aggregates all article translations and provides helper functions
 */

import { dailyHoroscopeGuide } from './articles/daily-horoscope-guide/index';
import { zodiacCompatibility } from './articles/zodiac-compatibility-complete-guide/index';
import { birthChartReading } from './articles/birth-chart-reading-explained/index';
import { weeklyHoroscope } from './articles/weekly-horoscope-predictions/index';
import { monthlyHoroscope } from './articles/monthly-horoscope-january-2025/index';
import { loveHoroscope } from './articles/love-horoscope-relationship-advice/index';
import type { BlogPostTranslation, BlogPostMeta } from './types';
export type { BlogPostTranslation, BlogPostMeta } from './types';
import { blogUiTranslations, type BlogUiTranslations } from './ui-translations';

// All article translations indexed by slug
const articleTranslations: Record<string, Record<string, BlogPostTranslation>> = {
    'daily-horoscope-guide': dailyHoroscopeGuide,
    'zodiac-compatibility-complete-guide': zodiacCompatibility,
    'birth-chart-reading-explained': birthChartReading,
    'weekly-horoscope-predictions': weeklyHoroscope,
    'monthly-horoscope-january-2025': monthlyHoroscope,
    'love-horoscope-relationship-advice': loveHoroscope,
};

// Article metadata (language-independent)
export const articleMeta: Record<string, BlogPostMeta> = {
    'daily-horoscope-guide': {
        slug: 'daily-horoscope-guide',
        emoji: '⭐',
        date: '2025-12-20',
        readTime: '8',
        author: 'Astralo Team',
    },
    'zodiac-compatibility-complete-guide': {
        slug: 'zodiac-compatibility-complete-guide',
        emoji: '❤️',
        date: '2025-12-18',
        readTime: '12',
        author: 'Astralo Team',
    },
    'birth-chart-reading-explained': {
        slug: 'birth-chart-reading-explained',
        emoji: '🔮',
        date: '2025-12-15',
        readTime: '10',
        author: 'Astralo Team',
    },
    'weekly-horoscope-predictions': {
        slug: 'weekly-horoscope-predictions',
        emoji: '📅',
        date: '2025-12-22',
        readTime: '6',
        author: 'Astralo Team',
    },
    'monthly-horoscope-january-2025': {
        slug: 'monthly-horoscope-january-2025',
        emoji: '🌙',
        date: '2025-12-24',
        readTime: '15',
        author: 'Astralo Team',
    },
    'love-horoscope-relationship-advice': {
        slug: 'love-horoscope-relationship-advice',
        emoji: '💕',
        date: '2025-12-10',
        readTime: '9',
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
