import type { BlogPostTranslation } from '../../types';

export interface ConciseJulyCopy {
    title: string;
    excerpt: string;
    category: string;
    metaDescription: string;
    keywords: string;
    overviewTitle: string;
    overview: string;
    themesTitle: string;
    early: string;
    late: string;
    signsTitle: string;
    fire: string;
    earth: string;
    air: string;
    water: string;
    personalTitle: string;
    personal: string;
}

export function createConciseJulyArticle(copy: ConciseJulyCopy): BlogPostTranslation {
    return {
        title: copy.title,
        excerpt: copy.excerpt,
        category: copy.category,
        metaDescription: copy.metaDescription,
        keywords: copy.keywords,
        quickSummary: [copy.early, copy.late],
        keyTakeaways: [copy.early, copy.late],
        tableOfContents: [
            { id: 'monthly-overview', title: copy.overviewTitle },
            { id: 'key-themes', title: copy.themesTitle },
            { id: 'zodiac-signs', title: copy.signsTitle },
            { id: 'get-personal', title: copy.personalTitle },
        ],
        content: `
          <h2 id="monthly-overview">${copy.overviewTitle}</h2>
          <p>${copy.overview}</p>
          <h2 id="key-themes">${copy.themesTitle}</h2>
          <ul><li>${copy.early}</li><li>${copy.late}</li></ul>
          <h2 id="zodiac-signs">${copy.signsTitle}</h2>
          <p>${copy.fire}</p><p>${copy.earth}</p><p>${copy.air}</p><p>${copy.water}</p>
          <h2 id="get-personal">${copy.personalTitle}</h2>
          <p>${copy.personal}</p>
        `,
    };
}
