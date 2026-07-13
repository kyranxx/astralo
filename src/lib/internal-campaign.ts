export interface InternalCampaignOptions {
    source?: string;
    medium?: string;
    campaign: string;
    content: string;
}

export function buildInternalCampaignUrl(path: string, options: InternalCampaignOptions): string {
    const params = new URLSearchParams({
        utm_source: options.source || 'internal',
        utm_medium: options.medium || 'internal',
        utm_campaign: options.campaign,
        utm_content: options.content,
    });

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}${params.toString()}`;
}
