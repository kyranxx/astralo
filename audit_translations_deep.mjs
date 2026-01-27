import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = 'src/lib/blog/articles';
const ENGLISH_MARKERS = [' the ', ' and ', ' with ', ' guide ', ' your ', ' that ', ' from '];

function auditTranslations() {
    const articles = fs.readdirSync(ARTICLES_DIR).filter(f => fs.statSync(path.join(ARTICLES_DIR, f)).isDirectory());
    const results = {};

    for (const article of articles) {
        const articlePath = path.join(ARTICLES_DIR, article);
        const files = fs.readdirSync(articlePath).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'en.ts');

        results[article] = {
            total: files.length,
            valid: 0,
            invalid: [],
            languages: {}
        };

        for (const file of files) {
            const lang = file.replace('.ts', '');
            const content = fs.readFileSync(path.join(articlePath, file), 'utf-8');

            // Basic heuristic: if it contains many common English words, it's likely untranslated
            let matchCount = 0;
            for (const marker of ENGLISH_MARKERS) {
                const regex = new RegExp(marker, 'gi');
                const matches = content.match(regex);
                if (matches) matchCount += matches.length;
            }

            // If more than 10 occurrences of common English words in a translated file, flag it
            const isEnglish = matchCount > 10;

            results[article].languages[lang] = isEnglish ? 'FAILED' : 'OK';
            if (isEnglish) {
                results[article].invalid.push(lang);
            } else {
                results[article].valid++;
            }
        }
    }

    return results;
}

const auditResult = auditTranslations();

// Generate HTML Report Snippet for the Dashboard
let htmlTable = `
<div class="audit-results" style="margin-top: 2rem; padding: 1rem; background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #d32f2f;">🚨 Deep Audit: Real Translation Check</h2>
    <p>This table shows which files exist but still contain mostly English content.</p>
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="background: #f5f5f5;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Article</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Real Progress</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Failed Languages</th>
            </tr>
        </thead>
        <tbody>
`;

for (const [article, data] of Object.entries(auditResult)) {
    const progress = Math.round((data.valid / data.total) * 100);
    const color = progress === 100 ? '#2e7d32' : (progress > 50 ? '#f57c00' : '#d32f2f');

    htmlTable += `
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${article}</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: ${color};">${progress}%</td>
            <td style="padding: 10px; border: 1px solid #ddd; color: #d32f2f; font-size: 0.8rem;">${data.invalid.join(', ') || 'None 🎉'}</td>
        </tr>
    `;
}

htmlTable += `
        </tbody>
    </table>
</div>
`;

fs.writeFileSync('audit_report.html', htmlTable);
console.log('Audit complete. Generated audit_report.html');
console.log(JSON.stringify(auditResult, null, 2));
