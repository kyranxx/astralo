import type { Translations } from '../locales/types';

/**
 * Product Configuration
 * Centralized product data including names, prices, and translations
 */

export interface ProductCopy {
    name: string;
    description: string;
    wordCount: string;
    benefits: string[];
}

export const coreProductKeys = ['daily', 'weekly', 'monthly', 'partner'] as const;
export const productKeys = [...coreProductKeys, 'lifetime'] as const;
export type ProductKey = typeof productKeys[number];
export const zodiacProductKeys = [...coreProductKeys] as const satisfies readonly ProductKey[];

// Product price configuration (in cents)
// Stripe minimum charge is €0.50 for EUR currency
export const productPrices: Record<ProductKey, number> = {
    daily: 99,    // €0.99
    weekly: 199,  // €1.99
    monthly: 499, // €4.99
    partner: 299, // €2.99
    lifetime: 2999, // €29.99
} as const;

const defaultProductCopy: Record<ProductKey, ProductCopy> = {
    daily: {
        name: 'Daily Horoscope',
        description: 'Your personal daily horoscope with detailed predictions for the next 24 hours',
        wordCount: '~200 words',
        benefits: ['🍀 Lucky number', '📅 Best time', '💎 Recommended color', '⭐ Daily advice'],
    },
    weekly: {
        name: 'Weekly Horoscope',
        description: 'Comprehensive overview of your week with important dates and recommendations',
        wordCount: '~400 words',
        benefits: ['✅ All from Daily', '🎯 Lucky day', '💰 Financial forecast', '❤️ Love & career'],
    },
    monthly: {
        name: 'Monthly Horoscope',
        description: 'Detailed monthly analysis with key events and opportunities',
        wordCount: '~1000 words',
        benefits: ['✅ All from Weekly', '🌟 Best day of month', '💎 Lucky stones', '🌈 Energy waves'],
    },
    partner: {
        name: 'Partner Horoscope',
        description: 'Deep analysis of your relationship and compatibility through synastry',
        wordCount: '~1200 words',
        benefits: ['💕 Compatibility score', '🔮 Relationship strengths', '⚠️ Growth areas', '💫 Shared future'],
    },
    lifetime: {
        name: 'Lifetime Horoscope',
        description: 'A deep life-path reading covering personality, love, career, timing, and long-term growth',
        wordCount: '~3000 words',
        benefits: ['🌌 Life path', '💼 Career cycles', '❤️ Love patterns', '🪐 Long-term timing'],
    },
};

const lifetimeProductCopy: Record<string, ProductCopy> = {
    en: defaultProductCopy.lifetime,
    sk: {
        name: 'Celoživotný horoskop',
        description: 'Hlboký výklad životnej cesty pre osobnosť, lásku, kariéru, načasovanie a dlhodobý rast',
        wordCount: '~3000 slov',
        benefits: ['🌌 Životná cesta', '💼 Kariérne cykly', '❤️ Vzorce lásky', '🪐 Dlhodobé načasovanie'],
    },
    cs: {
        name: 'Celoživotní horoskop',
        description: 'Hluboký výklad životní cesty pro osobnost, lásku, kariéru, načasování a dlouhodobý růst',
        wordCount: '~3000 slov',
        benefits: ['🌌 Životní cesta', '💼 Kariérní cykly', '❤️ Vzorce lásky', '🪐 Dlouhodobé načasování'],
    },
    de: {
        name: 'Lebenshoroskop',
        description: 'Eine tiefe Lebensweg-Deutung zu Persönlichkeit, Liebe, Karriere, Timing und langfristigem Wachstum',
        wordCount: '~3000 Wörter',
        benefits: ['🌌 Lebensweg', '💼 Karrierezyklen', '❤️ Liebesmuster', '🪐 Langfristiges Timing'],
    },
    fr: {
        name: 'Horoscope de vie',
        description: 'Une lecture approfondie du chemin de vie pour la personnalité, l’amour, la carrière, le timing et l’évolution',
        wordCount: '~3000 mots',
        benefits: ['🌌 Chemin de vie', '💼 Cycles de carrière', '❤️ Schémas amoureux', '🪐 Timing à long terme'],
    },
    es: {
        name: 'Horóscopo de vida',
        description: 'Una lectura profunda del camino de vida sobre personalidad, amor, carrera, tiempos y crecimiento a largo plazo',
        wordCount: '~3000 palabras',
        benefits: ['🌌 Camino de vida', '💼 Ciclos profesionales', '❤️ Patrones de amor', '🪐 Timing a largo plazo'],
    },
    it: {
        name: 'Oroscopo della vita',
        description: 'Una lettura profonda del percorso di vita su personalità, amore, carriera, tempi e crescita a lungo termine',
        wordCount: '~3000 parole',
        benefits: ['🌌 Percorso di vita', '💼 Cicli di carriera', '❤️ Schemi d’amore', '🪐 Tempi a lungo termine'],
    },
    pt: {
        name: 'Horóscopo de vida',
        description: 'Uma leitura profunda do caminho de vida sobre personalidade, amor, carreira, timing e crescimento a longo prazo',
        wordCount: '~3000 palavras',
        benefits: ['🌌 Caminho de vida', '💼 Ciclos de carreira', '❤️ Padrões de amor', '🪐 Timing a longo prazo'],
    },
    nl: {
        name: 'Levenshoroscoop',
        description: 'Een diepgaande levenspadlezing over persoonlijkheid, liefde, carrière, timing en langetermijngroei',
        wordCount: '~3000 woorden',
        benefits: ['🌌 Levenspad', '💼 Carrièrecycli', '❤️ Liefdespatronen', '🪐 Langetermijntiming'],
    },
    pl: {
        name: 'Horoskop życia',
        description: 'Głęboka analiza drogi życiowej obejmująca osobowość, miłość, karierę, timing i długoterminowy rozwój',
        wordCount: '~3000 słów',
        benefits: ['🌌 Droga życia', '💼 Cykle kariery', '❤️ Wzorce miłości', '🪐 Długoterminowy timing'],
    },
    hu: {
        name: 'Életút horoszkóp',
        description: 'Mély életút-elemzés személyiségről, szerelemről, karrierről, időzítésről és hosszú távú fejlődésről',
        wordCount: '~3000 szó',
        benefits: ['🌌 Életút', '💼 Karrierciklusok', '❤️ Szerelmi minták', '🪐 Hosszú távú időzítés'],
    },
    ro: {
        name: 'Horoscop de viață',
        description: 'O lectură profundă a drumului de viață despre personalitate, iubire, carieră, timing și creștere pe termen lung',
        wordCount: '~3000 de cuvinte',
        benefits: ['🌌 Drum de viață', '💼 Cicluri de carieră', '❤️ Tipare în iubire', '🪐 Timing pe termen lung'],
    },
    bg: {
        name: 'Житейски хороскоп',
        description: 'Задълбочен прочит на житейския път за личност, любов, кариера, timing и дългосрочно развитие',
        wordCount: '~3000 думи',
        benefits: ['🌌 Житейски път', '💼 Кариерни цикли', '❤️ Любовни модели', '🪐 Дългосрочно timing'],
    },
    hr: {
        name: 'Životni horoskop',
        description: 'Dubinsko čitanje životnog puta za osobnost, ljubav, karijeru, vrijeme i dugoročni rast',
        wordCount: '~3000 riječi',
        benefits: ['🌌 Životni put', '💼 Karijerni ciklusi', '❤️ Ljubavni obrasci', '🪐 Dugoročno vrijeme'],
    },
    sl: {
        name: 'Življenjski horoskop',
        description: 'Poglobljeno branje življenjske poti za osebnost, ljubezen, kariero, čas in dolgoročno rast',
        wordCount: '~3000 besed',
        benefits: ['🌌 Življenjska pot', '💼 Karierni cikli', '❤️ Vzorci ljubezni', '🪐 Dolgoročni čas'],
    },
    sr: {
        name: 'Životni horoskop',
        description: 'Dubinsko tumačenje životnog puta za ličnost, ljubav, karijeru, tajming i dugoročni rast',
        wordCount: '~3000 reči',
        benefits: ['🌌 Životni put', '💼 Karijerni ciklusi', '❤️ Obrasci ljubavi', '🪐 Dugoročni tajming'],
    },
    uk: {
        name: 'Гороскоп життя',
        description: 'Глибоке читання життєвого шляху про особистість, любов, кар’єру, час і довгострокове зростання',
        wordCount: '~3000 слів',
        benefits: ['🌌 Життєвий шлях', '💼 Кар’єрні цикли', '❤️ Моделі кохання', '🪐 Довгостроковий час'],
    },
    ru: {
        name: 'Гороскоп жизни',
        description: 'Глубокий разбор жизненного пути о личности, любви, карьере, времени и долгосрочном росте',
        wordCount: '~3000 слов',
        benefits: ['🌌 Жизненный путь', '💼 Карьерные циклы', '❤️ Любовные паттерны', '🪐 Долгосрочное время'],
    },
    el: {
        name: 'Ωροσκόπιο ζωής',
        description: 'Μια βαθιά ανάγνωση πορείας ζωής για προσωπικότητα, αγάπη, καριέρα, χρονισμό και μακροπρόθεσμη ανάπτυξη',
        wordCount: '~3000 λέξεις',
        benefits: ['🌌 Πορεία ζωής', '💼 Κύκλοι καριέρας', '❤️ Μοτίβα αγάπης', '🪐 Μακροπρόθεσμος χρονισμός'],
    },
    tr: {
        name: 'Yaşam horoskopu',
        description: 'Kişilik, aşk, kariyer, zamanlama ve uzun vadeli gelişimi kapsayan derin bir yaşam yolu yorumu',
        wordCount: '~3000 kelime',
        benefits: ['🌌 Yaşam yolu', '💼 Kariyer döngüleri', '❤️ Aşk kalıpları', '🪐 Uzun vadeli zamanlama'],
    },
    ar: {
        name: 'توقعات العمر',
        description: 'قراءة عميقة لمسار الحياة تشمل الشخصية والحب والعمل والتوقيت والنمو على المدى الطويل',
        wordCount: '~3000 كلمة',
        benefits: ['🌌 مسار الحياة', '💼 دورات العمل', '❤️ أنماط الحب', '🪐 توقيت طويل المدى'],
    },
    he: {
        name: 'הורוסקופ חיים',
        description: 'קריאה עמוקה של מסלול החיים בנושאי אישיות, אהבה, קריירה, תזמון וצמיחה לטווח ארוך',
        wordCount: '~3000 מילים',
        benefits: ['🌌 מסלול חיים', '💼 מחזורי קריירה', '❤️ דפוסי אהבה', '🪐 תזמון ארוך טווח'],
    },
    hi: {
        name: 'आजीवन राशिफल',
        description: 'व्यक्तित्व, प्रेम, करियर, समय और दीर्घकालिक विकास को कवर करने वाला गहरा जीवन-पथ पाठ',
        wordCount: '~3000 शब्द',
        benefits: ['🌌 जीवन पथ', '💼 करियर चक्र', '❤️ प्रेम पैटर्न', '🪐 दीर्घकालिक समय'],
    },
    ja: {
        name: '人生ホロスコープ',
        description: '性格、恋愛、仕事、タイミング、長期的な成長を読む深い人生の道しるべ',
        wordCount: '約3000語',
        benefits: ['🌌 人生の道', '💼 仕事の周期', '❤️ 恋愛パターン', '🪐 長期タイミング'],
    },
    ko: {
        name: '인생 운세',
        description: '성격, 사랑, 커리어, 타이밍, 장기 성장을 다루는 깊이 있는 인생 경로 리딩',
        wordCount: '약 3000단어',
        benefits: ['🌌 인생 경로', '💼 커리어 주기', '❤️ 사랑 패턴', '🪐 장기 타이밍'],
    },
    zh: {
        name: '人生星盘解读',
        description: '深入解读人生路径，涵盖性格、爱情、事业、时机与长期成长',
        wordCount: '约3000字',
        benefits: ['🌌 人生路径', '💼 事业周期', '❤️ 爱情模式', '🪐 长期时机'],
    },
    th: {
        name: 'ดวงชะตาชีวิต',
        description: 'การอ่านเส้นทางชีวิตเชิงลึก ครอบคลุมบุคลิก ความรัก งาน จังหวะเวลา และการเติบโตระยะยาว',
        wordCount: '~3000 คำ',
        benefits: ['🌌 เส้นทางชีวิต', '💼 วัฏจักรงาน', '❤️ รูปแบบความรัก', '🪐 จังหวะระยะยาว'],
    },
    vi: {
        name: 'Tử vi trọn đời',
        description: 'Bài đọc sâu về đường đời, tính cách, tình yêu, sự nghiệp, thời điểm và phát triển dài hạn',
        wordCount: '~3000 từ',
        benefits: ['🌌 Đường đời', '💼 Chu kỳ sự nghiệp', '❤️ Mẫu hình tình yêu', '🪐 Thời điểm dài hạn'],
    },
    id: {
        name: 'Horoskop seumur hidup',
        description: 'Bacaan mendalam tentang jalan hidup, kepribadian, cinta, karier, waktu, dan pertumbuhan jangka panjang',
        wordCount: '~3000 kata',
        benefits: ['🌌 Jalan hidup', '💼 Siklus karier', '❤️ Pola cinta', '🪐 Waktu jangka panjang'],
    },
    sv: {
        name: 'Livshoroskop',
        description: 'En djup livsvägsläsning om personlighet, kärlek, karriär, timing och långsiktig utveckling',
        wordCount: '~3000 ord',
        benefits: ['🌌 Livsväg', '💼 Karriärcykler', '❤️ Kärleksmönster', '🪐 Långsiktig timing'],
    },
    da: {
        name: 'Livshoroskop',
        description: 'En dyb livsvejslæsning om personlighed, kærlighed, karriere, timing og langsigtet udvikling',
        wordCount: '~3000 ord',
        benefits: ['🌌 Livsvej', '💼 Karrierecyklusser', '❤️ Kærlighedsmønstre', '🪐 Langsigtet timing'],
    },
    fi: {
        name: 'Elämän horoskooppi',
        description: 'Syvä elämänpolun tulkinta persoonasta, rakkaudesta, urasta, ajoituksesta ja pitkäaikaisesta kasvusta',
        wordCount: '~3000 sanaa',
        benefits: ['🌌 Elämänpolku', '💼 Uran syklit', '❤️ Rakkauden mallit', '🪐 Pitkän aikavälin ajoitus'],
    },
    no: {
        name: 'Livshoroskop',
        description: 'En dyp lesning av livsveien om personlighet, kjærlighet, karriere, timing og langsiktig vekst',
        wordCount: '~3000 ord',
        benefits: ['🌌 Livsvei', '💼 Karrieresykluser', '❤️ Kjærlighetsmønstre', '🪐 Langsiktig timing'],
    },
    bn: {
        name: 'আজীবন রাশিফল',
        description: 'ব্যক্তিত্ব, প্রেম, কর্মজীবন, সময় এবং দীর্ঘমেয়াদি বিকাশ নিয়ে গভীর জীবনপথ পাঠ',
        wordCount: '~৩০০০ শব্দ',
        benefits: ['🌌 জীবনপথ', '💼 কর্মজীবনের চক্র', '❤️ প্রেমের ধরণ', '🪐 দীর্ঘমেয়াদি সময়'],
    },
};

// Get price in euros (for display)
export function getProductPriceInEuros(productKey: ProductKey): number {
    return productPrices[productKey] / 100;
}

// Localized product names for all supported languages
export const productNames: Record<string, Partial<Record<ProductKey, string>>> = {
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
    fi: { daily: 'Päivittäinen horoskooppi', weekly: 'Viikon horoskooppi', monthly: 'Kuukauden horoskooppi', partner: 'Parihoroskooppi' },
    no: { daily: 'Dagens horoskop', weekly: 'Ukens horoskop', monthly: 'Månedens horoskop', partner: 'Parhoroskop' },
    bn: { daily: 'দৈনিক রাশিফল', weekly: 'সাপ্তাহিক রাশিফল', monthly: 'মাসিক রাশিফল', partner: 'পার্টনার রাশিফল' },
};

/**
 * Get localized product copy with fallback to English product defaults.
 */
export function getProductCopy(productKey: ProductKey, lang: string, translations?: Pick<Translations, 'products'>): ProductCopy {
    const localizedProduct = translations?.products?.[productKey as keyof typeof translations.products] as ProductCopy | undefined;

    if (localizedProduct) {
        return localizedProduct;
    }

    if (productKey === 'lifetime') {
        return lifetimeProductCopy[lang] || lifetimeProductCopy.en;
    }

    return defaultProductCopy[productKey];
}

/**
 * Get localized product name with fallback to English
 */
export function getProductName(productKey: string, lang: string): string {
    if (isValidProductKey(productKey)) {
        const localizedLifetime = productKey === 'lifetime'
            ? lifetimeProductCopy[lang]?.name
            : undefined;
        const names = productNames[lang] || productNames.en;

        return names[productKey] || localizedLifetime || defaultProductCopy[productKey].name;
    }

    const names = productNames[lang] || productNames.en;
    return names[productKey as ProductKey] || productNames.en[productKey as ProductKey] || productKey;
}

export function getProductPricingSummary(lang: string): string {
    return getProductKeys()
        .map((productKey) => `${getProductName(productKey, lang)}: €${getProductPriceInEuros(productKey).toFixed(2)}`)
        .join('; ');
}

function getRuntimeEnv(): Record<string, string | undefined> {
    const runtime = globalThis as typeof globalThis & {
        process?: { env?: Record<string, string | undefined> };
    };

    return runtime.process?.env || {};
}

export function isLifetimeProductEnabled(env: Record<string, string | undefined> = getRuntimeEnv()): boolean {
    return env.ENABLE_LIFETIME_PRODUCT === 'true';
}

export function getAllProductKeys(): ProductKey[] {
    return [...productKeys];
}

/**
 * Get product keys that are currently safe to expose and sell.
 */
export function getProductKeys(env?: Record<string, string | undefined>): ProductKey[] {
    if (isLifetimeProductEnabled(env)) {
        return [...productKeys];
    }

    return [...coreProductKeys];
}

export function getZodiacProductKeys(): ProductKey[] {
    return [...zodiacProductKeys];
}

/**
 * Check if a product key is valid
 */
export function isValidProductKey(key: string): key is ProductKey {
    return key in productPrices;
}
