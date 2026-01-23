/**
 * Product Configuration
 * Centralized product data including names, prices, and translations
 */

// Product price configuration (in cents)
export const productPrices = {
    daily: 19,    // €0.19
    weekly: 59,   // €0.59
    monthly: 159, // €1.59
    partner: 159, // €1.59
} as const;

export type ProductKey = keyof typeof productPrices;

// Get price in euros (for display)
export function getProductPriceInEuros(productKey: ProductKey): number {
    return productPrices[productKey] / 100;
}

// Localized product names for all supported languages
export const productNames: Record<string, Record<ProductKey, string>> = {
    en: { daily: 'Daily Horoscope', weekly: 'Weekly Horoscope', monthly: 'Monthly Horoscope', partner: 'Partner Horoscope' },
    sk: { daily: 'Denný horoskop', weekly: 'Týždenný horoskop', monthly: 'Mesačný horoskop', partner: 'Partnerský horoskop' },
    cs: { daily: 'Denní horoskop', weekly: 'Týdenní horoskop', monthly: 'Měsíční horoskop', partner: 'Partnerský horoskop' },
    de: { daily: 'Tageshoroskop', weekly: 'Wochenhoroskop', monthly: 'Monatshoroskop', partner: 'Partnerhoroskop' },
    fr: { daily: 'Horoscope du jour', weekly: 'Horoscope de la semaine', monthly: 'Horoscope du mois', partner: 'Horoscope de couple' },
    es: { daily: 'Horóscopo diario', weekly: 'Horóscopo semanal', monthly: 'Horóscopo mensual', partner: 'Horóscopo de pareja' },
    it: { daily: 'Oroscopo giornaliero', weekly: 'Oroscopo settimanale', monthly: 'Oroscopo mensile', partner: 'Oroscopo di coppia' },
    pt: { daily: 'Horóscopo diário', weekly: 'Horóscopo semanal', monthly: 'Horóscopo mensal', partner: 'Horóscopo de casal' },
    nl: { daily: 'Daghoroscoop', weekly: 'Weekhoroscoop', monthly: 'Maandhoroscoop', partner: 'Partnerhoroscoop' },
    pl: { daily: 'Horoskop dzienny', weekly: 'Horoskop tygodniowy', monthly: 'Horoskop miesięczny', partner: 'Horoskop partnerski' },
    hu: { daily: 'Napi horoszkóp', weekly: 'Heti horoszkóp', monthly: 'Havi horoszkóp', partner: 'Partner horoszkóp' },
    ro: { daily: 'Horoscop zilnic', weekly: 'Horoscop săptămânal', monthly: 'Horoscop lunar', partner: 'Horoscop de cuplu' },
    bg: { daily: 'Дневен хороскоп', weekly: 'Седмичен хороскоп', monthly: 'Месечен хороскоп', partner: 'Партньорски хороскоп' },
    hr: { daily: 'Dnevni horoskop', weekly: 'Tjedni horoskop', monthly: 'Mjesečni horoskop', partner: 'Partnerski horoskop' },
    sl: { daily: 'Dnevni horoskop', weekly: 'Tedenski horoskop', monthly: 'Mesečni horoskop', partner: 'Partnerski horoskop' },
    sr: { daily: 'Дневни хороскоп', weekly: 'Недељни хороскоп', monthly: 'Месечни хороскоп', partner: 'Партнерски хороскоп' },
    uk: { daily: 'Денний гороскоп', weekly: 'Тижневий гороскоп', monthly: 'Місячний гороскоп', partner: 'Партнерський гороскоп' },
    ru: { daily: 'Дневной гороскоп', weekly: 'Недельный гороскоп', monthly: 'Месячный гороскоп', partner: 'Партнёрский гороскоп' },
    el: { daily: 'Ημερήσιο ωροσκόπιο', weekly: 'Εβδομαδιαίο ωροσκόπιο', monthly: 'Μηνιαίο ωροσκόπιο', partner: 'Ωροσκόπιο ζευγαριού' },
    tr: { daily: 'Günlük burç', weekly: 'Haftalık burç', monthly: 'Aylık burç', partner: 'Partner burcu' },
    ar: { daily: 'البرج اليومي', weekly: 'البرج الأسبوعي', monthly: 'البرج الشهري', partner: 'برج الشريك' },
    he: { daily: 'הורוסקופ יומי', weekly: 'הורוסקופ שבועי', monthly: 'הורוסקופ חודשי', partner: 'הורוסקופ לזוג' },
    hi: { daily: 'दैनिक राशिफल', weekly: 'साप्ताहिक राशिफल', monthly: 'मासिक राशिफल', partner: 'पार्टनर राशिफल' },
    ja: { daily: '今日の運勢', weekly: '週間運勢', monthly: '月間運勢', partner: 'パートナー運勢' },
    ko: { daily: '오늘의 운세', weekly: '주간 운세', monthly: '월간 운세', partner: '커플 운세' },
    zh: { daily: '每日运势', weekly: '每周运势', monthly: '每月运势', partner: '伴侣运势' },
    th: { daily: 'ดวงวันนี้', weekly: 'ดวงรายสัปดาห์', monthly: 'ดวงรายเดือน', partner: 'ดวงคู่รัก' },
    vi: { daily: 'Tử vi hàng ngày', weekly: 'Tử vi hàng tuần', monthly: 'Tử vi hàng tháng', partner: 'Tử vi cặp đôi' },
    id: { daily: 'Horoskop Harian', weekly: 'Horoskop Mingguan', monthly: 'Horoskop Bulanan', partner: 'Horoskop Pasangan' },
    sv: { daily: 'Dagens horoskop', weekly: 'Veckans horoskop', monthly: 'Månadens horoskop', partner: 'Parhoroskop' },
    da: { daily: 'Dagligt horoskop', weekly: 'Ugens horoskop', monthly: 'Månedens horoskop', partner: 'Parhoroskop' },
    fi: { daily: 'Päivän horoskooppi', weekly: 'Viikon horoskooppi', monthly: 'Kuukauden horoskooppi', partner: 'Parihoroskooppi' },
    no: { daily: 'Dagens horoskop', weekly: 'Ukens horoskop', monthly: 'Månedens horoskop', partner: 'Parhoroskop' },
    bn: { daily: 'দৈনিক রাশিফল', weekly: 'সাপ্তাহিক রাশিফল', monthly: 'মাসিক রাশিফল', partner: 'পার্টনার রাশিফল' },
};

/**
 * Get localized product name with fallback to English
 */
export function getProductName(productKey: string, lang: string): string {
    const names = productNames[lang] || productNames.en;
    return names[productKey as ProductKey] || productNames.en[productKey as ProductKey] || productKey;
}

/**
 * Get all product keys
 */
export function getProductKeys(): ProductKey[] {
    return Object.keys(productPrices) as ProductKey[];
}

/**
 * Check if a product key is valid
 */
export function isValidProductKey(key: string): key is ProductKey {
    return key in productPrices;
}
