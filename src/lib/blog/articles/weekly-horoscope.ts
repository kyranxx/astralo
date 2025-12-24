/**
 * Weekly Horoscope - Full Translations
 */

import type { BlogPostTranslation } from '../index';

export const weeklyHoroscope: Record<string, BlogPostTranslation> = {
    en: {
        title: '📅 Weekly Horoscope: What the Stars Predict for This Week',
        excerpt: 'Get your weekly horoscope forecast for all zodiac signs.',
        category: 'Horoscopes',
        metaDescription: 'Get your weekly horoscope predictions for all zodiac signs. Discover love, career, and life forecasts.',
        keywords: 'weekly horoscope, horoscope this week, weekly zodiac, weekly astrology',
        quickSummary: [
            'Weekly horoscopes provide a 7-day overview of cosmic influences',
            'Major planetary aspects affect all signs throughout the week',
            'Each day brings different energies based on Moon phases',
            'Plan your week strategically using astrological timing'
        ],
        keyTakeaways: [
            'Check your weekly horoscope on Sunday or Monday',
            'Pay attention to highlighted lucky days',
            'Weekly forecasts help with scheduling',
            'Combine with daily horoscopes for detailed guidance'
        ],
        tableOfContents: [
            { id: 'overview', title: 'Weekly Horoscope Overview' },
            { id: 'predictions', title: 'Weekly Zodiac Predictions' }
        ],
        content: `
            <h2 id="overview">Your Weekly Horoscope Overview</h2>
            <p>Welcome to your <strong>weekly horoscope</strong> forecast!</p>
            
            <h2 id="predictions">Weekly Zodiac Predictions</h2>
            <ul>
                <li>♈ <strong>Aries</strong>: New opportunities in career</li>
                <li>♉ <strong>Taurus</strong>: Financial decisions favored</li>
                <li>♊ <strong>Gemini</strong>: Communication breakthroughs</li>
            </ul>
        `
    }
};
