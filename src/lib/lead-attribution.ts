export interface LeadAttribution {
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
}

export function getCapturePageType(path: string): string {
    const cleanPath = path.replace(/\/$/, '') || '/';
    if (cleanPath === '/' || /^\/[a-z]{2}$/.test(cleanPath)) return 'home';
    if (/^\/(?:[a-z]{2}\/)?blog\//.test(cleanPath)) return 'blog';
    if (cleanPath.endsWith('/free-horoscope')) return 'free_horoscope';
    if (cleanPath.includes('/horoscope/')) return 'product';
    return 'site';
}

export function getBlogArticleSlug(path: string): string {
    const match = path.match(/^\/(?:[a-z]{2}\/)?blog\/([^/?#]+)/);
    return match ? match[1] : '';
}

export function getLeadAttributionFromSearch(search: string): LeadAttribution {
    const params = new URLSearchParams(search || '');

    return {
        utmSource: cleanAttributionValue(params.get('utm_source')),
        utmMedium: cleanAttributionValue(params.get('utm_medium')),
        utmCampaign: cleanAttributionValue(params.get('utm_campaign')),
        utmContent: cleanAttributionValue(params.get('utm_content')),
    };
}

export function buildSubscriberSource({
    captureSource,
    pageType,
    attribution,
}: {
    captureSource: string;
    pageType: string;
    attribution?: LeadAttribution;
}): string {
    const baseSource = `${cleanSourcePart(captureSource)}_${cleanSourcePart(pageType)}`;

    if (pageType === 'free_horoscope' && attribution?.utmSource === 'blog') {
        return `${baseSource}_from_blog`;
    }

    return baseSource;
}

export function getSignupArticleSlug(path: string, attribution?: LeadAttribution): string {
    const articleSlug = getBlogArticleSlug(path);
    if (articleSlug) return articleSlug;

    if (attribution?.utmSource === 'blog') {
        return attribution.utmCampaign;
    }

    return '';
}

export function buildLeadAttributionEventParams(attribution: LeadAttribution): Record<string, string> {
    const params: Record<string, string> = {};

    if (attribution.utmSource) params.lead_utm_source = attribution.utmSource;
    if (attribution.utmMedium) params.lead_utm_medium = attribution.utmMedium;
    if (attribution.utmCampaign) params.lead_utm_campaign = attribution.utmCampaign;
    if (attribution.utmContent) params.lead_utm_content = attribution.utmContent;

    return params;
}

export function getSubscriberCaptureSurface(source: string): 'inline' | 'popup' | 'other' {
    const normalized = cleanSourcePart(source);

    if (normalized === 'inline' || normalized.startsWith('inline_')) return 'inline';
    if (normalized === 'popup' || normalized.startsWith('popup_')) return 'popup';
    return 'other';
}

function cleanAttributionValue(value: string | null): string {
    return String(value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .slice(0, 80);
}

function cleanSourcePart(value: string): string {
    return cleanAttributionValue(value) || 'unknown';
}
