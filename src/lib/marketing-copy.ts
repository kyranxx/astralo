const socialProofPattern = /50[.,\s\u00a0\u202f]000\+?|৫০,০০০\+?|50,000名|50,000명|50,000 אנשים|50,000 คน/u;
const ratingPattern = /4[.,]9\/5/u;
const sentenceBoundaries = ['.', '!', '?', '。', '！', '？', '।'];

export function hasUnsupportedSocialProof(text?: string | null): boolean {
    if (!text) return false;
    return socialProofPattern.test(text);
}

export function stripUnsupportedSocialProof(text: string): string {
    const socialProofMatch = text.match(socialProofPattern);
    const ratingMatch = text.match(ratingPattern);

    if (
        socialProofMatch?.index !== undefined &&
        ratingMatch?.index !== undefined &&
        ratingMatch.index > socialProofMatch.index
    ) {
        const clauseStart = sentenceBoundaries.reduce((lastBoundary, boundary) => {
            const boundaryIndex = text.lastIndexOf(boundary, socialProofMatch.index);
            return Math.max(lastBoundary, boundaryIndex);
        }, -1);
        const commaAfterRating = text.indexOf(',', ratingMatch.index);

        if (commaAfterRating !== -1) {
            return `${text.slice(0, clauseStart + 1).trim()} ${text.slice(commaAfterRating + 1).trim()}`.replace(/\s+/g, ' ').trim();
        }
    }

    return text.replace(socialProofPattern, '').replace(/\s+/g, ' ').trim();
}

export function buildSafeLeadSubtitle(title: string, delivery: string): string {
    const cleanTitle = title.replace(/^✨\s*/, '').trim();
    return `${cleanTitle}. ${delivery}.`;
}
