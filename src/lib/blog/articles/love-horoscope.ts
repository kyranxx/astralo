/**
 * Love Horoscope - Full Translations
 */

import type { BlogPostTranslation } from '../index';

export const loveHoroscope: Record<string, BlogPostTranslation> = {
    en: {
        title: '💕 Love Horoscope 2026: Relationship Predictions for Every Sign',
        excerpt: 'Is love written in your stars?',
        category: 'Love & Relationships',
        metaDescription: 'Get your love horoscope predictions. Discover romantic compatibility and relationship timing for all zodiac signs.',
        keywords: 'love horoscope, relationship horoscope, love astrology, romantic horoscope, love predictions',
        quickSummary: [
            'Venus placement determines your love language',
            'Mars aspects influence passion and attraction',
            'The 7th house reveals your ideal partner qualities',
            'Timing transits show the best periods for romance'
        ],
        keyTakeaways: [
            'Know your Venus sign to understand what you need in love',
            'Check compatibility with your partner\'s Venus and Mars',
            'Use favorable Venus transits for relationship moments',
            'Partner horoscopes reveal hidden dynamics'
        ],
        tableOfContents: [
            { id: 'love-guide', title: 'Your Love Horoscope Guide' },
            { id: 'venus', title: 'Venus and Your Love Life' }
        ],
        content: `
            <h2 id="love-guide">Your Love Horoscope Guide</h2>
            <p>Looking for love in the stars? Your <strong>love horoscope</strong> reveals important insights.</p>
            
            <h2 id="venus">Venus and Your Love Life</h2>
            <p>In <strong>love astrology</strong>, Venus is the planet of love, beauty, and attraction.</p>
            <ul>
                <li>♈ <strong>Aries in Love</strong>: Passionate and spontaneous</li>
                <li>♉ <strong>Taurus in Love</strong>: Loyal and sensual</li>
                <li>♊ <strong>Gemini in Love</strong>: Playful and communicative</li>
            </ul>
        `
    }
};
