/**
 * Monthly Horoscope - Full Translations
 */

import type { BlogPostTranslation } from '../index';

export const monthlyHoroscope: Record<string, BlogPostTranslation> = {
    en: {
        title: '🌙 Monthly Horoscope January 2025: All Zodiac Sign Predictions',
        excerpt: 'Your complete monthly horoscope for January 2025.',
        category: 'Horoscopes',
        metaDescription: 'January 2025 monthly horoscope for all zodiac signs. Complete astrological forecast for love, career, health.',
        keywords: 'monthly horoscope, horoscope january 2025, monthly zodiac, horoscope 2025',
        quickSummary: [
            'January 2025 begins with powerful New Moon energy in Capricorn',
            'Mercury enters Aquarius bringing innovative thinking',
            'The Full Moon in Cancer highlights emotional matters',
            'Major planetary shifts make this excellent for goal-setting'
        ],
        keyTakeaways: [
            'Set your 2025 intentions during the New Moon in Capricorn',
            'Career moves are especially favored mid-month',
            'Balance work with family needs around the Full Moon',
            'Financial planning receives cosmic support this January'
        ],
        tableOfContents: [
            { id: 'monthly-overview', title: 'January 2025 Overview' },
            { id: 'key-events', title: 'Key Astrological Events' }
        ],
        content: `
            <h2 id="monthly-overview">January 2025 Monthly Horoscope</h2>
            <p>Welcome to your <strong>monthly horoscope for January 2025</strong>!</p>
            
            <h2 id="key-events">Key Astrological Events</h2>
            <ul>
                <li>🌑 <strong>New Moon in Capricorn</strong>: New beginnings</li>
                <li>🌕 <strong>Full Moon in Cancer</strong>: Emotional revelations</li>
            </ul>
        `
    }
};
