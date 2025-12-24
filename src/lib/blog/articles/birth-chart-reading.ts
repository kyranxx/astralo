/**
 * Birth Chart Reading - Full Translations
 */

import type { BlogPostTranslation } from '../index';

export const birthChartReading: Record<string, BlogPostTranslation> = {
    en: {
        title: '🔮 Birth Chart Reading: How to Understand Your Natal Chart',
        excerpt: 'Learn how to read and interpret your birth chart.',
        category: 'Astrology Basics',
        metaDescription: 'Learn how to read your birth chart. Complete natal chart guide explaining planets, houses, and aspects.',
        keywords: 'birth chart, natal chart, astrology chart, horoscope chart, birth chart reading',
        quickSummary: [
            'Your birth chart is a map of planetary positions at your exact birth moment',
            'The Sun, Moon, and Rising signs form your "Big Three"',
            '12 houses represent different life areas',
            'Aspects show how planets interact'
        ],
        keyTakeaways: [
            'Your birth chart is unique - like a cosmic fingerprint',
            'The Rising sign affects how others perceive you',
            'Venus placement reveals your love language',
            'Professional readings provide personalized interpretations'
        ],
        tableOfContents: [
            { id: 'what-is-birth-chart', title: 'What is a Birth Chart?' },
            { id: 'key-components', title: 'Key Components' },
            { id: 'the-planets', title: 'The Planets' }
        ],
        content: `
            <h2 id="what-is-birth-chart">What is a Birth Chart?</h2>
            <p>A <strong>birth chart</strong> is a map of planetary positions at your exact birth moment.</p>
            
            <h2 id="key-components">Key Components</h2>
            <p>Each planet represents different aspects of your personality.</p>
            
            <h2 id="the-planets">The Planets</h2>
            <ul>
                <li>☀️ <strong>Sun</strong>: Your core identity</li>
                <li>🌙 <strong>Moon</strong>: Your emotions</li>
                <li>💕 <strong>Venus</strong>: Love and values</li>
            </ul>
        `
    }
};
