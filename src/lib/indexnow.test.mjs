import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

async function loadModule() {
    const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
    try {
        return await server.ssrLoadModule('/src/lib/indexnow.ts');
    } finally {
        await server.close();
    }
}

test('reads page URLs from a sitemap index and rejects foreign URLs', async () => {
    const { readSitemapUrls } = await loadModule();
    const responses = new Map([
        ['https://astralo.online/sitemap-index.xml', '<sitemapindex><sitemap><loc>https://astralo.online/sitemap-0.xml</loc></sitemap></sitemapindex>'],
        ['https://astralo.online/sitemap-0.xml', '<urlset><url><loc>https://astralo.online/</loc></url><url><loc>https://evil.example/</loc></url><url><loc>https://astralo.online/sk</loc></url></urlset>'],
    ]);
    const fetcher = async (url) => new Response(responses.get(String(url)) ?? '', { status: responses.has(String(url)) ? 200 : 404 });

    assert.deepEqual(await readSitemapUrls(fetcher), ['https://astralo.online/', 'https://astralo.online/sk']);
});

test('submits only unique Astralo URLs to the shared IndexNow endpoint', async () => {
    const { submitIndexNowUrls } = await loadModule();
    let request;
    const fetcher = async (url, init) => {
        request = { url, body: JSON.parse(init.body) };
        return new Response('', { status: 202 });
    };

    const result = await submitIndexNowUrls([
        'https://astralo.online/sk',
        'https://astralo.online/sk',
        'https://evil.example/',
    ], 'test-key', fetcher);

    assert.equal(request.url, 'https://api.indexnow.org/indexnow');
    assert.deepEqual(request.body.urlList, ['https://astralo.online/sk']);
    assert.deepEqual(result, [{ count: 1, status: 202 }]);
});
