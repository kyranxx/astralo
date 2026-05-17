import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const SUPPORTED_LOCALES = [
  'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk',
  'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja', 'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn',
];

const ARTICLE_CONFIGS = [
  {
    dir: 'src/lib/blog/articles/monthly-horoscope-march-2026',
    exportName: 'monthlyHoroscopeMarch2026',
    lockedLocales: ['en', 'sk', 'pl', 'hu'],
  },
  {
    dir: 'src/lib/blog/articles/monthly-horoscope-april-2026',
    exportName: 'monthlyHoroscopeApril2026',
    lockedLocales: ['en', 'sk', 'pl', 'hu'],
  },
  {
    dir: 'src/lib/blog/articles/monthly-horoscope-june-2026',
    exportName: 'monthlyHoroscopeJune2026',
    lockedLocales: ['en'],
  },
];

const TRANSLATE_BASE_URL = 'https://translate.googleapis.com/translate_a/single';
const MAX_TRANSLATION_CHARS = 3500;

function splitIntoChunks(text, maxChars = MAX_TRANSLATION_CHARS) {
  if (text.length <= maxChars) {
    return [text];
  }

  const chunks = [];
  let cursor = 0;

  while (cursor < text.length) {
    const remaining = text.length - cursor;
    if (remaining <= maxChars) {
      chunks.push(text.slice(cursor));
      break;
    }

    const end = cursor + maxChars;
    const window = text.slice(cursor, end);
    const doubleBreak = window.lastIndexOf('\n\n');
    const singleBreak = window.lastIndexOf('\n');
    const sentenceBreak = window.lastIndexOf('. ');
    let cut = Math.max(doubleBreak, singleBreak, sentenceBreak);

    if (cut < Math.floor(maxChars * 0.4)) {
      cut = maxChars;
    }

    if (cut <= 0) {
      cut = maxChars;
    }

    chunks.push(text.slice(cursor, cursor + cut));
    cursor += cut;
  }

  return chunks;
}

async function translateChunk(text, locale, attempt = 1) {
  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: locale,
    dt: 't',
    q: text,
  });

  const response = await fetch(`${TRANSLATE_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      return translateChunk(text, locale, attempt + 1);
    }
    throw new Error(`Google Translate request failed (${response.status})`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    throw new Error('Unexpected Google Translate payload format');
  }

  return payload[0].map((segment) => segment[0] || '').join('');
}

async function translateText(text, locale) {
  if (locale === 'en') {
    return text;
  }

  if (!text || !text.trim()) {
    return text;
  }

  const chunks = splitIntoChunks(text);
  let translated = '';

  for (const chunk of chunks) {
    translated += await translateChunk(chunk, locale);
    await new Promise((resolve) => setTimeout(resolve, 80));
  }

  return translated;
}

async function translateHtmlContent(html, locale) {
  if (locale === 'en') {
    return html;
  }

  const tags = [];
  const maskedHtml = html.replace(/<[^>]+>/g, (tag) => {
    const token = `__HTMLTAG_${tags.length}__`;
    tags.push(tag);
    return token;
  });

  const translatedMaskedHtml = await translateText(maskedHtml, locale);
  let restoredHtml = translatedMaskedHtml;

  for (let index = 0; index < tags.length; index += 1) {
    const token = `__HTMLTAG_${index}__`;
    restoredHtml = restoredHtml.replaceAll(token, tags[index]);
  }

  return restoredHtml;
}

function parseEnglishArticle(filePath) {
  const source = requireLikeRead(filePath);
  const transformed = source
    .replace(/import type[^\n]*\n/g, '')
    .replace(/export const en:\s*BlogPostTranslation\s*=\s*/, 'module.exports = ');

  const sandbox = {
    module: { exports: {} },
    exports: {},
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: filePath,
    timeout: 1000,
  });

  return sandbox.module.exports;
}

function requireLikeRead(filePath) {
  return requireLikeRead.cache.get(filePath);
}

requireLikeRead.cache = new Map();

async function primeSourceCache(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  requireLikeRead.cache.set(filePath, raw);
}

function toTemplateLiteral(text) {
  return `\`${text
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')}\``;
}

function toTsFileContent(locale, translatedArticle) {
  const quickSummary = translatedArticle.quickSummary
    .map((item) => `    ${JSON.stringify(item)}`)
    .join(',\n');
  const keyTakeaways = translatedArticle.keyTakeaways
    .map((item) => `    ${JSON.stringify(item)}`)
    .join(',\n');
  const tableOfContents = translatedArticle.tableOfContents
    .map((item) => `    { id: ${JSON.stringify(item.id)}, title: ${JSON.stringify(item.title)} }`)
    .join(',\n');

  return [
    'import type { BlogPostTranslation } from \'../../types\';',
    '',
    `export const ${locale}: BlogPostTranslation = {`,
    `  title: ${JSON.stringify(translatedArticle.title)},`,
    `  excerpt: ${JSON.stringify(translatedArticle.excerpt)},`,
    `  category: ${JSON.stringify(translatedArticle.category)},`,
    `  metaDescription: ${JSON.stringify(translatedArticle.metaDescription)},`,
    `  keywords: ${JSON.stringify(translatedArticle.keywords)},`,
    '  quickSummary: [',
    quickSummary,
    '  ],',
    '  keyTakeaways: [',
    keyTakeaways,
    '  ],',
    '  tableOfContents: [',
    tableOfContents,
    '  ],',
    `  content: ${toTemplateLiteral(translatedArticle.content)}`,
    '};',
    '',
  ].join('\n');
}

async function translateArticleObject(englishArticle, locale) {
  return {
    title: await translateText(englishArticle.title, locale),
    excerpt: await translateText(englishArticle.excerpt, locale),
    category: await translateText(englishArticle.category, locale),
    metaDescription: await translateText(englishArticle.metaDescription, locale),
    keywords: await translateText(englishArticle.keywords, locale),
    quickSummary: await Promise.all(
      englishArticle.quickSummary.map((item) => translateText(item, locale)),
    ),
    keyTakeaways: await Promise.all(
      englishArticle.keyTakeaways.map((item) => translateText(item, locale)),
    ),
    tableOfContents: await Promise.all(
      englishArticle.tableOfContents.map(async (item) => ({
        id: item.id,
        title: await translateText(item.title, locale),
      })),
    ),
    content: await translateHtmlContent(englishArticle.content, locale),
  };
}

async function updateIndexFile(articleDir, exportName) {
  const files = await fs.readdir(articleDir);
  const localeCodes = files
    .filter((fileName) => fileName.endsWith('.ts') && fileName !== 'index.ts')
    .map((fileName) => fileName.replace(/\.ts$/, ''))
    .sort((left, right) => left.localeCompare(right));

  const imports = localeCodes
    .map((localeCode) => `import { ${localeCode} } from './${localeCode}';`)
    .join('\n');

  const indexSource = [
    imports,
    '',
    `export const ${exportName} = {`,
    `    ${localeCodes.join(', ')}`,
    '};',
    '',
  ].join('\n');

  await fs.writeFile(path.join(articleDir, 'index.ts'), indexSource, 'utf8');
}

async function generateMissingLocales(config) {
  const articleDir = path.resolve(process.cwd(), config.dir);
  const englishFile = path.join(articleDir, 'en.ts');
  const lockedLocales = new Set(config.lockedLocales ?? ['en']);

  await primeSourceCache(englishFile);
  const englishArticle = parseEnglishArticle(englishFile);

  for (const locale of SUPPORTED_LOCALES) {
    if (locale === 'en') {
      continue;
    }

    const outputFile = path.join(articleDir, `${locale}.ts`);
    let alreadyExists = false;
    try {
      await fs.access(outputFile);
      alreadyExists = true;
    } catch {
      alreadyExists = false;
    }

    if (alreadyExists) {
      console.log(`[skip] ${config.dir}/${locale}.ts already exists`);
      continue;
    }

    console.log(`[gen]  ${config.dir}/${locale}.ts`);
    let translated = englishArticle;
    try {
      translated = await translateArticleObject(englishArticle, locale);
    } catch (error) {
      console.warn(`[warn] translation failed for ${locale}, falling back to English`, error);
    }

    const tsSource = toTsFileContent(locale, translated);
    await fs.writeFile(outputFile, tsSource, 'utf8');
  }

  await updateIndexFile(articleDir, config.exportName);
}

async function main() {
  for (const config of ARTICLE_CONFIGS) {
    console.log(`\n[article] ${config.dir}`);
    await generateMissingLocales(config);
  }

  console.log('\nDone.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
