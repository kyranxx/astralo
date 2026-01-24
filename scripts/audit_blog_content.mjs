import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function auditBlogs() {
    const files = await glob('src/lib/blog/articles/**/*.ts');
    let issuesFound = 0;

    console.log('--- Starting Blog Content Audit ---');
    console.log(`Scanning ${files.length} files...`);

    for (const file of files) {
        // Skip index.ts files
        if (file.endsWith('index.ts')) continue;

        const content = fs.readFileSync(file, 'utf-8');

        // Naive extraction of content property:
        // Looks for content: `...` or content: "..." or content: '...'
        // This regex captures the content string.
        const contentMatch = content.match(/content:\s*(?:`([^`]+)`|'([^']+)'|"([^"]+)")/s);

        if (contentMatch) {
            // Group 1 is backtick, 2 is single quote, 3 is double quote
            const articleText = contentMatch[1] || contentMatch[2] || contentMatch[3] || '';

            // Threshold for "stub" content. Real articles are usually > 3000 chars.
            // Let's set a safe limit of 2000 chars to catch obviously short ones.
            if (articleText.length < 2000) {
                console.log(`[STUB DETECTED] ${file} (Length: ${articleText.length} chars)`);
                issuesFound++;
            }
        } else {
            // If regex fails, it might be a structure issue or empty file
            // We'll log it just in case, skipping known small files if they are just re-exports (though we filtered index.ts)
            // Some files might be purely metadata?
            // console.log(`[NO CONTENT MATCH] ${file}`);
        }
    }

    console.log('--- Audit Complete ---');
    console.log(`Found ${issuesFound} potential stub articles.`);
}

auditBlogs();
