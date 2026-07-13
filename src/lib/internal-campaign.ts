export interface InternalCampaignOptions {
    source?: string;
    medium?: string;
    campaign: string;
    content: string;
}

export function buildInternalCampaignUrl(path: string, options: InternalCampaignOptions): string {
    const params = new URLSearchParams({
        ref_source: options.source || 'internal',
        ref_medium: options.medium || 'internal',
        ref_campaign: options.campaign,
        ref_content: options.content,
    });

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}${params.toString()}`;
}
