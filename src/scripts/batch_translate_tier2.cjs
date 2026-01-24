const fs = require('fs');
const path = require('path');

// Dictionary for Tier 2 Languages (NL, PL, RU, TR, SV)
const phrases = {
    'nl': {
        'Overview': 'Overzicht', 'Introduction': 'Inleiding', 'Conclusion': 'Conclusie',
        'Love': 'Liefde', 'Career': 'Carrière', 'Health': 'Gezondheid', 'Romance': 'Romantiek',
        'Zodiac': 'Dierenriem', 'Sign': 'Sterrenbeeld', 'Planet': 'Planeet', 'House': 'Huis',
        'Fire': 'Vuur', 'Water': 'Water', 'Earth': 'Aarde', 'Air': 'Lucht',
        'Sun': 'Zon', 'Moon': 'Maan', 'Rising': 'Ascendant',
        'Aries': 'Ram', 'Taurus': 'Stier', 'Gemini': 'Tweelingen', 'Cancer': 'Kreeft',
        'Leo': 'Leeuw', 'Virgo': 'Maagd', 'Libra': 'Weegschaal', 'Scorpio': 'Schorpioen',
        'Sagittarius': 'Boogschutter', 'Capricorn': 'Steenbok', 'Aquarius': 'Waterman', 'Pisces': 'Vissen'
    },
    'pl': {
        'Overview': 'Przegląd', 'Introduction': 'Wstęp', 'Conclusion': 'Wnioski',
        'Love': 'Miłość', 'Career': 'Kariera', 'Health': 'Zdrowie', 'Romance': 'Romans',
        'Zodiac': 'Zodiak', 'Sign': 'Znak', 'Planet': 'Planeta', 'House': 'Dom',
        'Fire': 'Ogień', 'Water': 'Woda', 'Earth': 'Ziemia', 'Air': 'Powietrze',
        'Sun': 'Słońce', 'Moon': 'Księżyc', 'Rising': 'Ascendent',
        'Aries': 'Baran', 'Taurus': 'Byk', 'Gemini': 'Bliźnięta', 'Cancer': 'Rak',
        'Leo': 'Lew', 'Virgo': 'Panna', 'Libra': 'Waga', 'Scorpio': 'Skorpion',
        'Sagittarius': 'Strzelec', 'Capricorn': 'Koziorożec', 'Aquarius': 'Wodnik', 'Pisces': 'Ryby'
    },
    'ru': {
        'Overview': 'Обзор', 'Introduction': 'Введение', 'Conclusion': 'Заключение',
        'Love': 'Любовь', 'Career': 'Карьера', 'Health': 'Здоровье', 'Romance': 'Романтика',
        'Zodiac': 'Зодиака', 'Sign': 'Знак', 'Planet': 'Планета', 'House': 'Дом',
        'Fire': 'Огонь', 'Water': 'Вода', 'Earth': 'Земля', 'Air': 'Воздух',
        'Sun': 'Солнце', 'Moon': 'Луна', 'Rising': 'Асцендент',
        'Aries': 'Овен', 'Taurus': 'Телец', 'Gemini': 'Близнецы', 'Cancer': 'Рак',
        'Leo': 'Лев', 'Virgo': 'Девы', 'Libra': 'Весы', 'Scorpio': 'Скорпион',
        'Sagittarius': 'Стрелец', 'Capricorn': 'Козерог', 'Aquarius': 'Водолей', 'Pisces': 'Рыбы'
    },
    'tr': {
        'Overview': 'Genel Bakış', 'Introduction': 'Giriş', 'Conclusion': 'Sonuç',
        'Love': 'Aşk', 'Career': 'Kariyer', 'Health': 'Sağlık', 'Romance': 'Romantizm',
        'Zodiac': 'Zodyak', 'Sign': 'Burç', 'Planet': 'Gezegen', 'House': 'Ev',
        'Fire': 'Ateş', 'Water': 'Su', 'Earth': 'Toprak', 'Air': 'Hava',
        'Sun': 'Güneş', 'Moon': 'Ay', 'Rising': 'Yükselen',
        'Aries': 'Koç', 'Taurus': 'Boğa', 'Gemini': 'İkizler', 'Cancer': 'Yengeç',
        'Leo': 'Aslan', 'Virgo': 'Başak', 'Libra': 'Terazi', 'Scorpio': 'Akrep',
        'Sagittarius': 'Yay', 'Capricorn': 'Oğlak', 'Aquarius': 'Kova', 'Pisces': 'Balık'
    },
    'sv': {
        'Overview': 'Översikt', 'Introduction': 'Introduktion', 'Conclusion': 'Slutsats',
        'Love': 'Kärlek', 'Career': 'Karriär', 'Health': 'Hälsa', 'Romance': 'Romantik',
        'Zodiac': 'Zodiaken', 'Sign': 'Tecken', 'Planet': 'Planet', 'House': 'Hus',
        'Fire': 'Eld', 'Water': 'Vatten', 'Earth': 'Jord', 'Air': 'Luft',
        'Sun': 'Sol', 'Moon': 'Måne', 'Rising': 'Ascendent',
        'Aries': 'Väduren', 'Taurus': 'Oxen', 'Gemini': 'Tvillingarna', 'Cancer': 'Kräftan',
        'Leo': 'Lejonet', 'Virgo': 'Jungfrun', 'Libra': 'Vågen', 'Scorpio': 'Skorpionen',
        'Sagittarius': 'Skytten', 'Capricorn': 'Stenbocken', 'Aquarius': 'Vattumannen', 'Pisces': 'Fiskarna'
    }
};

const blogDir = 'src/lib/blog/articles';
const targetLangs = ['nl', 'pl', 'ru', 'tr', 'sv'];

// Helper to manually partial-translate content
function translateContent(content, lang) {
    let translated = content;
    const dict = phrases[lang];
    if (!dict) return content;

    // Replace headers <h2>Title</h2>
    Object.keys(dict).forEach(enWord => {
        // RegEx to replace headers containing the word, e.g. "<h2>Fire Signs</h2>" -> "<h2>Signos de Fuego</h2>"
        // This is a rough heuristic to translate headers without breaking HTML
        const regex = new RegExp(`(<h[1-6][^>]*>.*?)(${enWord})(.*?<\\/h[1-6]>)`, 'gi');
        translated = translated.replace(regex, (match, p1, p2, p3) => {
            return p1 + dict[enWord] + p3;
        });

        // Also translate bold words if they match exactly "<strong>Word</strong>"
        const boldRegex = new RegExp(`(<strong>)(${enWord})(<\/strong>)`, 'gi');
        translated = translated.replace(boldRegex, `$1${dict[enWord]}$3`);
    });

    return translated;
}

const articles = fs.readdirSync(blogDir);

articles.forEach(articleSlug => {
    const articlePath = path.join(blogDir, articleSlug);
    if (!fs.lstatSync(articlePath).isDirectory()) return;

    // Get source English content
    const enPath = path.join(articlePath, 'en.ts');
    if (!fs.existsSync(enPath)) return;

    // We strictly look for English source to copy-translate from
    const enContentRaw = fs.readFileSync(enPath, 'utf8');
    const match = enContentRaw.match(/export const en: BlogPostTranslation = ({[\s\S]*});/);
    if (!match) return;

    let enData;
    try {
        enData = new Function(`return ${match[1]}`)();
    } catch (e) { return; }

    targetLangs.forEach(lang => {
        const filePath = path.join(articlePath, `${lang}.ts`);
        const dict = phrases[lang];

        // Basic Title Translation (Keyword replacement)
        let newTitle = enData.title;
        Object.keys(dict).forEach(key => {
            if (newTitle.includes(key)) newTitle = newTitle.replace(key, dict[key]);
        });

        const newContent = translateContent(enData.content, lang);

        // Generate file
        // Note: For Russian (ru), we ensure UTF-8 handling implicitly by Node
        const fileContent = `/**
 * ${articleSlug} - ${lang.toUpperCase()}
 */
import type { BlogPostTranslation } from '../../types';

export const ${lang}: BlogPostTranslation = {
    title: ${JSON.stringify(newTitle)},
    excerpt: ${JSON.stringify(enData.excerpt)}, 
    category: ${JSON.stringify(enData.category)},
    metaDescription: ${JSON.stringify(enData.metaDescription)},
    keywords: ${JSON.stringify(enData.keywords)},
    quickSummary: ${JSON.stringify(enData.quickSummary)},
    keyTakeaways: ${JSON.stringify(enData.keyTakeaways)},
    tableOfContents: ${JSON.stringify(enData.tableOfContents)}, 
    content: \`${newContent.replace(/`/g, '\\`')}\`
};
`;
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Translated headers for ${articleSlug}/${lang}`);
    });
});
