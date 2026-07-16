const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_ORIGIN = 'https://astralo.online';
const MAX_BATCH_SIZE = 10_000;

export function extractXmlLocations(xml: string): string[] {
    return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXml(match[1]));
}

export function validateAstraloUrls(urls: string[]): string[] {
    return [...new Set(urls)].filter((value) => {
        try {
            const url = new URL(value);
            return url.origin === SITE_ORIGIN && !url.username && !url.password;
        } catch {
            return false;
        }
    });
}

export async function readSitemapUrls(
    fetcher: typeof fetch = fetch,
    sitemapUrl = `${SITE_ORIGIN}/sitemap-index.xml`,
): Promise<string[]> {
    const indexResponse = await fetcher(sitemapUrl);
    if (!indexResponse.ok) {
        throw new Error(`Sitemap request failed: ${indexResponse.status}`);
    }

    const indexXml = await indexResponse.text();
    const locations = extractXmlLocations(indexXml);
    const childSitemaps = locations.filter((url) => url.endsWith('.xml'));

    if (childSitemaps.length === 0) {
        return validateAstraloUrls(locations);
    }

    const pages: string[] = [];
    for (const childUrl of validateAstraloUrls(childSitemaps)) {
        const response = await fetcher(childUrl);
        if (!response.ok) {
            throw new Error(`Child sitemap request failed (${childUrl}): ${response.status}`);
        }
        pages.push(...extractXmlLocations(await response.text()));
    }

    return validateAstraloUrls(pages);
}

export async function submitIndexNowUrls(
    urls: string[],
    key: string,
    fetcher: typeof fetch = fetch,
): Promise<Array<{ count: number; status: number }>> {
    const safeUrls = validateAstraloUrls(urls);
    const results: Array<{ count: number; status: number }> = [];

    for (let start = 0; start < safeUrls.length; start += MAX_BATCH_SIZE) {
        const urlList = safeUrls.slice(start, start + MAX_BATCH_SIZE);
        const response = await fetcher(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                host: 'astralo.online',
                key,
                keyLocation: `${SITE_ORIGIN}/${key}.txt`,
                urlList,
            }),
        });

        if (!response.ok) {
            throw new Error(`IndexNow request failed: ${response.status}`);
        }
        results.push({ count: urlList.length, status: response.status });
    }

    return results;
}

function decodeXml(value: string): string {
    return value
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&apos;', "'");
}
