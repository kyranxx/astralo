/**
 * Blog Post Translation Type
 */

export interface BlogPostTranslation {
    title: string;
    seoTitle?: string;
    excerpt: string;
    category: string;
    metaDescription: string;
    keywords: string;
    quickSummary: string[];
    keyTakeaways: string[];
    tableOfContents: Array<{ id: string; title: string }>;
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    emoji: string;
    date: string;
    readTime: string;
    author: string;
}
