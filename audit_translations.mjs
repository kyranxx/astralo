import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = 'src/lib/blog/articles';
const LANGUAGES = ['en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk', 'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja', 'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn'];

const ENGLISH_INDICATORS = [
    'the ', ' and ', ' with ', ' for ', ' you ', ' are ', ' this ', ' from '
];

function isLikelyEnglish(content, lang) {
    if (lang === 'en') return true;

    // Count occurrences of common English words
    let englishWordCount = 0;
    const lowerContent = content.toLowerCase();

    for (const indicator of ENGLISH_INDICATORS) {
        const regex = new RegExp(indicator, 'g');
        const matches = lowerContent.match(regex);
        if (matches) {
            englishWordCount += matches.length;
        }
    }

    // If it's a non-Latin script language and has many English words, it's definitely not translated
    const nonLatinScripts = ['ar', 'he', 'hi', 'bn', 'th', 'ja', 'ko', 'zh', 'el', 'ru', 'uk', 'bg', 'sr'];
    if (nonLatinScripts.includes(lang) && englishWordCount > 10) {
        return true;
    }

    // For Latin script languages, we check if it's identical to English in some key parts
    // But a simple word count check is usually enough if it's more than a few words
    if (englishWordCount > 50) {
        return true;
    }

    return false;
}

async function checkTranslations() {
    const articles = fs.readdirSync(ARTICLES_DIR).filter(f => fs.statSync(path.join(ARTICLES_DIR, f)).isDirectory());
    const report = {};

    for (const article of articles) {
        report[article] = {};
        for (const lang of LANGUAGES) {
            const filePath = path.join(ARTICLES_DIR, article, `${lang}.ts`);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                if (isLikelyEnglish(content, lang) && lang !== 'en') {
                    report[article][lang] = 'ENGLISH_PLACEHOLDER';
                } else {
                    report[article][lang] = 'OK';
                }
            } else {
                report[article][lang] = 'MISSING_FILE';
            }
        }
    }

    fs.writeFileSync('translation_audit.json', JSON.stringify(report, null, 2));
    console.log('Audit completed. See translation_audit.json');
}

checkTranslations();
