import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, 'src/lib/blog/articles');
const langs = ['da', 'cs', 'es', 'de', 'it', 'fr'];
const articles = fs.readdirSync(articlesDir).filter(f => fs.statSync(path.join(articlesDir, f)).isDirectory());

const englishTitles = [
    'The History of Astrology',
    'Birth Chart Reading Explained',
    'Daily Horoscope Guide',
    'Zodiac Compatibility',
    'Love Horoscope 2026',
    'Mercury Retrograde Survival Guide',
    'Saturn Return Survival Guide',
    'The 12 Houses of Astrology',
    'Twin Flames, Soulmates',
    'Weekly Horoscope',
    'Monthly Horoscope January',
    'Monthly Horoscope February'
];

articles.forEach(article => {
    langs.forEach(lang => {
        const p = path.join(articlesDir, article, `${lang}.ts`);
        if (!fs.existsSync(p)) {
            console.log(`Missing: ${p}`);
        } else {
            const content = fs.readFileSync(p, 'utf8');
            if (lang === 'en') return;

            const hasEnglishTitle = englishTitles.some(title => content.includes(title));
            const hasPlaceholderComment = content.includes('placeholder') || content.includes('Fallback to English');

            if (hasEnglishTitle || hasPlaceholderComment) {
                console.log(`Placeholder detected: ${p} (${lang})`);
            }
        }
    });
});
console.log('Verification complete.');
