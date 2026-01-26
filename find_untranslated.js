import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, 'src/lib/blog/articles');
const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ar', 'bg', 'bn', 'cs', 'da', 'el', 'fi', 'he', 'hi', 'hr', 'hu', 'id', 'ja', 'ko', 'nl', 'no', 'pl', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tr', 'uk', 'vi', 'zh'];

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

function isUntranslated(content, lang) {
    if (lang === 'en') return false;

    // Extract title
    const titleMatch = content.match(/title:\s*["'`](.*?)["'`]/);
    if (titleMatch) {
        const title = titleMatch[1];
        // If title is in the englishTitles list (allowing for emojis at the start)
        const isEnglish = englishTitles.some(et => title.toLowerCase().includes(et.toLowerCase()));
        if (isEnglish) return true;
    }

    return content.includes('Fallback to English') || content.includes('placeholder');
}

const report = {};
const articles = fs.readdirSync(articlesDir).filter(f => fs.statSync(path.join(articlesDir, f)).isDirectory());

articles.forEach(article => {
    report[article] = [];
    const articlePath = path.join(articlesDir, article);

    languages.forEach(lang => {
        const filePath = path.join(articlePath, `${lang}.ts`);
        if (!fs.existsSync(filePath)) {
            report[article].push({ lang, status: 'MISSING_FILE' });
        } else {
            const content = fs.readFileSync(filePath, 'utf8');
            if (isUntranslated(content, lang)) {
                report[article].push({ lang, status: 'PLACEHOLDER' });
            }
        }
    });
});

console.log('--- MISSING TRANSLATIONS REPORT ---');
Object.keys(report).forEach(article => {
    const missing = report[article];
    if (missing.length > 0) {
        console.log(`\nArticle: ${article}`);
        const placeholders = missing.filter(m => m.status === 'PLACEHOLDER').map(m => m.lang);
        const filesMissing = missing.filter(m => m.status === 'MISSING_FILE').map(m => m.lang);

        if (placeholders.length > 0) console.log(`  Placeholders: ${placeholders.join(', ')}`);
        if (filesMissing.length > 0) console.log(`  Missing Files: ${filesMissing.join(', ')}`);
    } else {
        console.log(`\nArticle: ${article} - FULLY TRANSLATED`);
    }
});
