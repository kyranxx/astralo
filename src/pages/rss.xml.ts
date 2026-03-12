import type { APIRoute } from 'astro';
import { getAllArticleSlugs, getArticleMeta, getArticleTranslation } from '../lib/blog';
import { siteUrl } from '../lib/seo';

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
    const items = getAllArticleSlugs()
        .map((slug) => {
            const meta = getArticleMeta(slug);
            const translation = getArticleTranslation(slug, 'en');

            if (!meta || !translation) {
                return null;
            }

            return {
                slug,
                meta,
                translation,
            };
        })
        .filter((item): item is { slug: string; meta: NonNullable<ReturnType<typeof getArticleMeta>>; translation: NonNullable<ReturnType<typeof getArticleTranslation>> } => item !== null)
        .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Astralo Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Daily horoscope guides, compatibility advice, and astrology insights from Astralo.</description>
    <language>en</language>
    ${items.map((item) => `    <item>
      <title>${escapeXml(item.translation.title)}</title>
      <link>${siteUrl}/blog/${item.slug}</link>
      <guid>${siteUrl}/blog/${item.slug}</guid>
      <pubDate>${new Date(item.meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.translation.metaDescription)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
};
