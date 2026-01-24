import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'src/lib/blog/articles');
// Get all directories (blogs)
const blogs = fs.readdirSync(articlesDir).filter(f => fs.statSync(path.join(articlesDir, f)).isDirectory());

// Target languages (based on previous context, usually 34-35 languages)
// We will just scan whatever files exist.

let report = `# Blog Content Audit Report

| Blog | Language | Status | Size (KB) | Notes |
|------|----------|--------|-----------|-------|
`;

blogs.forEach(blog => {
    const blogPath = path.join(articlesDir, blog);
    const files = fs.readdirSync(blogPath).filter(f => f.endsWith('.ts') && f !== 'index.ts');

    // Get English content for comparison
    let enContent = '';
    const enFile = path.join(blogPath, 'en.ts');
    if (fs.existsSync(enFile)) {
        enContent = fs.readFileSync(enFile, 'utf8');
    }

    // Extract a unique English string to check against (e.g. from the content body)
    // We look for the h2 or p tags to be sure we aren't just matching variable names
    const enSignatureMatch = enContent.match(/<h2[^>]*>(.*?)<\/h2>/);
    const enSignature = enSignatureMatch ? enSignatureMatch[1] : '';

    files.forEach(file => {
        const lang = file.replace('.ts', '');
        const filePath = path.join(blogPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const sizeKB = (fs.statSync(filePath).size / 1024).toFixed(2);

        let status = 'Unknown';
        let notes = '';

        // 1. Check Length
        const isShort = fs.statSync(filePath).size < 2500; // 2.5KB threshold for "Short"

        // 2. Check Translation
        // If it's English, it's valid.
        if (lang === 'en') {
            status = '✅ Valid (Source)';
        } else {
            if (isShort) {
                status = '❌ Short/Stub';
            } else {
                // It is extended (long enough), but is it English?
                // Check if it contains the unique English header
                if (enSignature && content.includes(enSignature)) {
                    status = '⚠️ Extended but English';
                    notes = 'Needs Translation';
                } else {
                    // Primitive check: does it contain English common words?
                    // Or we assume if it's long and DOESN'T match English signature, it might be translated.
                    // But wait, if I just copied en.ts to th.ts, it WILL match the signature.

                    // Let's refine:
                    // If content is identical to english content (minus variable name change), it's English.
                    status = '✅ Extended & Translated'; // Tentative, assumed if signature doesn't match
                }
            }
        }

        // Override logic: explicit check for English fallback
        if (lang !== 'en' && !isShort && enSignature && content.includes(enSignature)) {
            status = '⚠️ Extended (English)';
        }

        report += `| ${blog} | ${lang} | ${status} | ${sizeKB} | ${notes} |\n`;
    });
});

fs.writeFileSync('audit_report.md', report);
console.log('Audit report generated: audit_report.md');
