import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname is now .../scripts
const rootDir = path.join(__dirname, '..');
const articlesDir = path.join(rootDir, 'src/lib/blog/articles');

// Languages from src/lib/i18n.ts
const languages = [
    'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk', 'ru', 'el', 'tr', 'ar', 'hi', 'ja', 'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn', 'he'
];

const englishTitles = [
    'The History of Astrology',
    'Birth Chart Reading',
    'Daily Horoscope Guide',
    'Zodiac Compatibility',
    'Love Horoscope',
    'Mercury Retrograde',
    'Saturn Return',
    'The 12 Houses',
    'Twin Flames',
    'Weekly Horoscope',
    'Monthly Horoscope'
];

function isUntranslated(content, lang, enData) {
    if (lang === 'en') return false;

    // Extract title
    const titleMatch = content.match(/title:\s*["'`](.*?)["'`]/);
    const title = titleMatch ? titleMatch[1].replace(/🔮|✨|🌟|🏛️|💕|☄️|❤️|🌙|🪐|🏠|🔥|📅|⭐/g, '').trim() : '';

    // Extract excerpt
    const excerptMatch = content.match(/excerpt:\s*["'`](.*?)["'`]/);
    const excerpt = excerptMatch ? excerptMatch[1].trim() : '';

    // If both title and excerpt are identical to English, it's untranslated
    if (enData && title === enData.title && excerpt === enData.excerpt) {
        return true;
    }

    // Check for "Blueprint of Your Soul" which is a strong indicator of English content
    if (content.includes('The Blueprint of Your Soul') && lang !== 'en') return true;

    return content.includes('Fallback to English') || content.includes('placeholder');
}


if (!fs.existsSync(articlesDir)) {
    console.error(`Articles directory not found: ${articlesDir}`);
    process.exit(1);
}

const articles = fs.readdirSync(articlesDir).filter(f => fs.statSync(path.join(articlesDir, f)).isDirectory());

const stats = {
    articles: {},
    languages: {}
};

languages.forEach(l => stats.languages[l] = 0);

let tableRows = [];

articles.forEach(article => {
    const articlePath = path.join(articlesDir, article);
    const enFilePath = path.join(articlePath, 'en.ts');
    let articleTitle = article;
    let enData = null;

    if (fs.existsSync(enFilePath)) {
        const enContent = fs.readFileSync(enFilePath, 'utf8');
        const titleMatch = enContent.match(/title:\s*["'`](.*?)["'`]/);
        const excerptMatch = enContent.match(/excerpt:\s*["'`](.*?)["'`]/);

        let rawTitle = titleMatch ? titleMatch[1] : '';
        let cleanTitle = rawTitle.replace(/🔮|✨|🌟|🏛️|💕|☄️|❤️|🌙|🪐|🏠|🔥|📅|⭐/g, '').trim();
        let excerpt = excerptMatch ? excerptMatch[1].trim() : '';

        articleTitle = cleanTitle || article;
        enData = { title: cleanTitle, excerpt: excerpt };
    }

    let row = { title: articleTitle, cells: [] };
    let translatedCount = 0;

    languages.forEach(lang => {
        const filePath = path.join(articlePath, `${lang}.ts`);
        let status = 'error';
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (!isUntranslated(content, lang, enData)) {
                status = 'success';
                translatedCount++;
                stats.languages[lang]++;
            } else {
                status = 'warning';
            }
        }
        row.cells.push({ lang: lang.toUpperCase(), status });
    });

    row.percentage = Math.round((translatedCount / languages.length) * 100);
    tableRows.push(row);
});

const totalArticles = articles.length;
const totalLangs = languages.length;

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Astralo Blog Translation Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #05070a;
            --glass: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.1);
            --text: #ffffff;
            --text-dim: #a0a0a0;
            --primary: #833ab4;
            --secondary: #fd1d1d;
            --success: #00f2fe;
            --warning: #f9d423;
            --error: #ff0844;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Outfit', sans-serif;
            background: var(--bg);
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(131, 58, 180, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(253, 29, 29, 0.1) 0%, transparent 40%);
            color: var(--text);
            min-height: 100vh;
            padding: 40px 20px;
            overflow-x: hidden;
        }

        .container {
            max-width: 98vw;
            margin: 0 auto;
        }

        header {
            margin-bottom: 40px;
            text-align: center;
        }

        h1 {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(45deg, var(--success), var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: var(--glass);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .stat-card:hover { transform: translateY(-5px); }
        .stat-card .value { font-size: 2rem; font-weight: 700; display: block; }
        .stat-card .label { color: var(--text-dim); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }

        .dashboard-card {
            background: var(--glass);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border);
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 40px;
        }

        .table-container {
            overflow-x: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--primary) transparent;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
        }

        th {
            background: rgba(255, 255, 255, 0.05);
            padding: 10px 5px;
            text-align: center;
            font-weight: 600;
            color: var(--text-dim);
            border-bottom: 1px solid var(--border);
            vertical-align: bottom;
        }

        th.lang-col {
            height: 140px;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            white-space: nowrap;
            letter-spacing: 1px;
        }

        th.sticky {
            position: sticky;
            left: 0;
            z-index: 20;
            background: #0d1117;
            text-align: left;
            padding-left: 25px;
            min-width: 300px;
        }

        td {
            padding: 8px 2px;
            border-bottom: 1px solid var(--border);
            text-align: center;
        }

        td.sticky {
            position: sticky;
            left: 0;
            background: rgba(13, 17, 23, 0.9);
            backdrop-filter: blur(5px);
            text-align: left;
            padding-left: 25px;
            font-weight: 600;
            max-width: 300px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
        }

        .status-success { background: var(--success); box-shadow: 0 0 10px var(--success); }
        .status-warning { background: var(--warning); box-shadow: 0 0 5px var(--warning); }
        .status-error { background: var(--border); }

        .progress-pill {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            background: rgba(0, 242, 254, 0.1);
            color: var(--success);
            border: 1px solid rgba(0, 242, 254, 0.2);
        }

        .lang-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 15px;
            padding: 25px;
        }

        .lang-stat {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 15px;
            text-align: center;
        }

        .lang-code { font-weight: 700; display: block; margin-bottom: 5px; color: var(--text-dim); }
        .lang-pct { font-size: 1.2rem; display: block; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Cosmic Dashboard</h1>
            <p style="color: var(--text-dim)">Astralo Blog Translation Engine Status</p>
        </header>

        <div class="stats-grid">
            <div class="stat-card">
                <span class="value">${totalArticles}</span>
                <span class="label">Total Articles</span>
            </div>
            <div class="stat-card">
                <span class="value">${totalLangs}</span>
                <span class="label">Target Locales</span>
            </div>
            <div class="stat-card">
                <span class="value">${Math.round(languages.reduce((acc, l) => acc + stats.languages[l], 0) / (totalArticles * totalLangs) * 100)}%</span>
                <span class="label">Global Translation Progress</span>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="sticky">Article Title</th>
                            <th>Progress</th>
                            ${languages.map(l => `<th class="lang-col">${l.toUpperCase()}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows.map(row => `
                            <tr>
                                <td class="sticky" title="${row.title}">${row.title}</td>
                                <td><span class="progress-pill">${row.percentage}%</span></td>
                                ${row.cells.map(cell => `
                                    <td><span class="status-dot status-${cell.status}" title="${cell.lang}"></span></td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <header style="margin-top: 60px">
            <h2>Global Market Ready</h2>
            <p style="color: var(--text-dim)">Language Specific Penetration</p>
        </header>

        <div class="dashboard-card">
            <div class="lang-grid">
                ${languages.map(lang => {
    const count = stats.languages[lang];
    const pct = Math.round((count / totalArticles) * 100);
    let color = pct === 100 ? 'var(--success)' : (pct > 0 ? 'var(--warning)' : 'var(--text-dim)');
    return `
                        <div class="lang-stat">
                            <span class="lang-code">${lang.toUpperCase()}</span>
                            <span class="lang-pct" style="color: ${color}">${pct}%</span>
                            <span style="font-size: 0.7rem; color: var(--text-dim)">${count} / ${totalArticles}</span>
                        </div>
                    `;
}).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;

const outputPath = path.join(rootDir, 'TRANSLATION_DASHBOARD.html');
fs.writeFileSync(outputPath, html);
console.log(`Generated ${outputPath}`);

// Output missing translations for automation
const missingTranslations = [];
articles.forEach(article => {
    const articlePath = path.join(articlesDir, article);
    const enFilePath = path.join(articlePath, 'en.ts');
    let enData = null;

    if (fs.existsSync(enFilePath)) {
        const enContent = fs.readFileSync(enFilePath, 'utf8');
        const titleMatch = enContent.match(/title:\s*["'`](.*?)["'`]/);
        const excerptMatch = enContent.match(/excerpt:\s*["'`](.*?)["'`]/);
        enData = {
            title: titleMatch ? titleMatch[1].replace(/🔮|✨|🌟|🏛️|💕|☄️|❤️|🌙|🪐|🏠|🔥|📅|⭐/g, '').trim() : '',
            excerpt: excerptMatch ? excerptMatch[1].trim() : ''
        };
    }

    languages.forEach(lang => {
        if (lang === 'en') return;
        const filePath = path.join(articlePath, `${lang}.ts`);
        let isMissing = true;

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (!isUntranslated(content, lang, enData)) {
                isMissing = false;
            }
        }

        if (isMissing) {
            missingTranslations.push({ article, lang });
        }
    });
});

console.log('MISSING_TRANSLATIONS_JSON:' + JSON.stringify(missingTranslations));

