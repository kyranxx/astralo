const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'lib', 'blog-content.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all 2025 in titles/excerpts/slugs with 2026
content = content.replace(/january-2025/g, 'january-2026');
content = content.replace(/January 2025/g, 'January 2026');
content = content.replace(/Januar 2025/g, 'Januar 2026');
content = content.replace(/Janvier 2025/g, 'Janvier 2026');
content = content.replace(/Enero 2025/g, 'Enero 2026');
content = content.replace(/Gennaio 2025/g, 'Gennaio 2026');
content = content.replace(/Janeiro 2025/g, 'Janeiro 2026');
content = content.replace(/Január 2025/g, 'Január 2026');
content = content.replace(/Ianuarie 2025/g, 'Ianuarie 2026');
content = content.replace(/Styczeń 2025/g, 'Styczeń 2026'); // Polish
content = content.replace(/Leden 2025/g, 'Leden 2026'); // Czech
content = content.replace(/2025年1月/g, '2026年1月'); // Asian languages
content = content.replace(/2025년 1월/g, '2026년 1월'); // Korean

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated blog-content.ts');
