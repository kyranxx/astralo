const monthlySlugPattern = /^monthly-horoscope-([a-z]+)-(\d{4})$/;

const monthNameToIndex: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

export function isMonthlyHoroscopeSlug(slug: string): boolean {
    return monthlySlugPattern.test(slug);
}

export function isStaleMonthlyHoroscopeSlug(slug: string, referenceDate = new Date()): boolean {
    const match = slug.match(monthlySlugPattern);
    if (!match) return false;

    const [, monthName, yearValue] = match;
    const monthIndex = monthNameToIndex[monthName];
    const year = Number(yearValue);

    if (!Number.isInteger(monthIndex) || !Number.isInteger(year)) {
        return false;
    }

    const periodEnd = new Date(year, monthIndex + 1, 1);
    return referenceDate >= periodEnd;
}
