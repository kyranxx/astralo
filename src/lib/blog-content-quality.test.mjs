import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const articlesDir = path.resolve('src/lib/blog/articles');

async function getArticleFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...await getArticleFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            files.push(fullPath);
        }
    }

    return files;
}

test('blog article source does not leak placeholder HTML tokens', async () => {
    const files = await getArticleFiles(articlesDir);
    const offenders = [];

    for (const file of files) {
        const source = await readFile(file, 'utf8');
        if (/HTMLTAG_/.test(source)) {
            offenders.push(path.relative(process.cwd(), file));
        }
    }

    assert.deepEqual(offenders, []);
});

test('blog source does not leak common mojibake markers', async () => {
    const files = [
        path.resolve('src/lib/blog/index.ts'),
        ...await getArticleFiles(articlesDir),
    ];
    const offenders = [];

    for (const file of files) {
        const source = await readFile(file, 'utf8');
        if (/�|đź/.test(source)) {
            offenders.push(path.relative(process.cwd(), file));
        }
    }

    assert.deepEqual(offenders, []);
});

test('English compatibility guide keeps its table, sign summaries, honest copy, and contextual partner path', async () => {
    const source = await readFile(
        path.resolve('src/lib/blog/articles/zodiac-compatibility-complete-guide/en.ts'),
        'utf8'
    );

    assert.match(source, /seoTitle: 'Zodiac Compatibility 2026: Sign Match Table'/);
    assert.match(source, /id="zodiac-compatibility-table"/);
    assert.match(source, /<table/);
    assert.match(source, /ref_content=synastry_context_link/);
    assert.doesNotMatch(source, /advanced algorithms|expert astrologers/i);

    for (const sign of [
        'Aries',
        'Taurus',
        'Gemini',
        'Cancer',
        'Leo',
        'Virgo',
        'Libra',
        'Scorpio',
        'Sagittarius',
        'Capricorn',
        'Aquarius',
        'Pisces',
    ]) {
        assert.match(source, new RegExp(`<h3>${sign} compatibility</h3>`, 'i'));
    }
});

test('blog templates do not present the editorial team as an expert astrologer', async () => {
    const files = [
        path.resolve('src/pages/blog/[slug].astro'),
        path.resolve('src/pages/[lang]/blog/[slug].astro'),
    ];

    for (const file of files) {
        const source = await readFile(file, 'utf8');
        assert.doesNotMatch(source, /Expert Astrologer|ui\.expertAstrologer/i);
    }
});

test('article schema describes Astralo Team as an organization', async () => {
    const source = await readFile(path.resolve('src/lib/seo.ts'), 'utf8');

    assert.match(
        source,
        /author:\s*\{\s*'@type': 'Organization',\s*name: params\.meta\.author,/m
    );
});
