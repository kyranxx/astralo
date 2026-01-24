const fs = require('fs');
const path = require('path');

// Dictionary for 5 major languages across common astrology terms
const phrases = {
    'es': {
        'Overview': 'Visión General', 'Introduction': 'Introducción', 'Conclusion': 'Conclusión',
        'Love': 'Amor', 'Career': 'Carrera', 'Health': 'Salud', 'Romance': 'Romance',
        'Zodiac': 'Zodíaco', 'Sign': 'Signo', 'Planet': 'Planeta', 'House': 'Casa',
        'Fire': 'Fuego', 'Water': 'Agua', 'Earth': 'Tierra', 'Air': 'Aire',
        'Sun': 'Sol', 'Moon': 'Luna', 'Rising': 'Ascendente',
        'Aries': 'Aries', 'Taurus': 'Tauro', 'Gemini': 'Géminis', 'Cancer': 'Cáncer',
        'Leo': 'Leo', 'Virgo': 'Virgo', 'Libra': 'Libra', 'Scorpio': 'Escorpio',
        'Sagittarius': 'Sagitario', 'Capricorn': 'Capricornio', 'Aquarius': 'Acuario', 'Pisces': 'Piscis'
    },
    'fr': {
        'Overview': 'Vue d\'ensemble', 'Introduction': 'Introduction', 'Conclusion': 'Conclusion',
        'Love': 'Amour', 'Career': 'Carrière', 'Health': 'Santé', 'Romance': 'Romance',
        'Zodiac': 'Zodiaque', 'Sign': 'Signe', 'Planet': 'Planète', 'House': 'Maison',
        'Fire': 'Feu', 'Water': 'Eau', 'Earth': 'Terre', 'Air': 'Air',
        'Sun': 'Soleil', 'Moon': 'Lune', 'Rising': 'Ascendant',
        'Aries': 'Bélier', 'Taurus': 'Taureau', 'Gemini': 'Gémeaux', 'Cancer': 'Cancer',
        'Leo': 'Lion', 'Virgo': 'Vierge', 'Libra': 'Balance', 'Scorpio': 'Scorpion',
        'Sagittarius': 'Sagittaire', 'Capricorn': 'Capricorne', 'Aquarius': 'Verseau', 'Pisces': 'Poissons'
    },
    'de': {
        'Overview': 'Überblick', 'Introduction': 'Einführung', 'Conclusion': 'Fazit',
        'Love': 'Liebe', 'Career': 'Karriere', 'Health': 'Gesundheit', 'Romance': 'Romantik',
        'Zodiac': 'Tierkreis', 'Sign': 'Zeichen', 'Planet': 'Planet', 'House': 'Haus',
        'Fire': 'Feuer', 'Water': 'Wasser', 'Earth': 'Erde', 'Air': 'Luft',
        'Sun': 'Sonne', 'Moon': 'Mond', 'Rising': 'Aszendent',
        'Aries': 'Widder', 'Taurus': 'Stier', 'Gemini': 'Zwillinge', 'Cancer': 'Krebs',
        'Leo': 'Löwe', 'Virgo': 'Jungfrau', 'Libra': 'Waage', 'Scorpio': 'Skorpion',
        'Sagittarius': 'Schütze', 'Capricorn': 'Steinbock', 'Aquarius': 'Wassermann', 'Pisces': 'Fische'
    },
    'it': {
        'Overview': 'Panoramica', 'Introduction': 'Introduzione', 'Conclusion': 'Conclusione',
        'Love': 'Amore', 'Career': 'Carriera', 'Health': 'Salute', 'Romance': 'Romanticismo',
        'Zodiac': 'Zodiaco', 'Sign': 'Segno', 'Planet': 'Pianeta', 'House': 'Casa',
        'Fire': 'Fuoco', 'Water': 'Acqua', 'Earth': 'Terra', 'Air': 'Aria',
        'Sun': 'Sole', 'Moon': 'Luna', 'Rising': 'Ascendente',
        'Aries': 'Ariete', 'Taurus': 'Toro', 'Gemini': 'Gemelli', 'Cancer': 'Cancro',
        'Leo': 'Leone', 'Virgo': 'Vergine', 'Libra': 'Bilancia', 'Scorpio': 'Scorpione',
        'Sagittarius': 'Sagittario', 'Capricorn': 'Capricorno', 'Aquarius': 'Acquario', 'Pisces': 'Pesci'
    },
    'pt': {
        'Overview': 'Visão Geral', 'Introduction': 'Introdução', 'Conclusion': 'Conclusão',
        'Love': 'Amor', 'Career': 'Carreira', 'Health': 'Saúde', 'Romance': 'Romance',
        'Zodiac': 'Zodíaco', 'Sign': 'Signo', 'Planet': 'Planeta', 'House': 'Casa',
        'Fire': 'Fogo', 'Water': 'Água', 'Earth': 'Terra', 'Air': 'Ar',
        'Sun': 'Sol', 'Moon': 'Lua', 'Rising': 'Ascendente',
        'Aries': 'Áries', 'Taurus': 'Touro', 'Gemini': 'Gêmeos', 'Cancer': 'Câncer',
        'Leo': 'Leão', 'Virgo': 'Virgem', 'Libra': 'Libra', 'Scorpio': 'Escorpião',
        'Sagittarius': 'Sagitário', 'Capricorn': 'Capricórnio', 'Aquarius': 'Aquário', 'Pisces': 'Peixes'
    }
};

const blogDir = 'src/lib/blog/articles';
const targetLangs = ['es', 'fr', 'de', 'it', 'pt'];

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
        const fileContent = `/**
 * ${articleSlug} - ${lang.toUpperCase()}
 */
import type { BlogPostTranslation } from '../../types';

export const ${lang}: BlogPostTranslation = {
    title: ${JSON.stringify(newTitle)},
    excerpt: ${JSON.stringify(enData.excerpt)}, // Excerpt remains EN mostly
    category: ${JSON.stringify(enData.category)},
    metaDescription: ${JSON.stringify(enData.metaDescription)},
    keywords: ${JSON.stringify(enData.keywords)},
    quickSummary: ${JSON.stringify(enData.quickSummary)},
    keyTakeaways: ${JSON.stringify(enData.keyTakeaways)},
    tableOfContents: ${JSON.stringify(enData.tableOfContents)}, // TO-DO: Translate TOC
    content: \`${newContent.replace(/`/g, '\\`')}\`
};
`;
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Translated headers for ${articleSlug}/${lang}`);
    });
});
