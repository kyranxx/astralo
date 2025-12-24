/**
 * Localized Testimonials for SEO & GEO Optimization
 * Different testimonials for different language markets
 * This helps with local SEO and builds trust with local audiences
 */

export interface Testimonial {
    name: string;
    location: string;
    text: string;
    rating: number;
}

// Default English testimonials
const defaultTestimonials: Testimonial[] = [
    {
        name: "Sarah Mitchell",
        location: "London, UK",
        text: "The most accurate horoscope I've ever received! Everything came true exactly as predicted.",
        rating: 5,
    },
    {
        name: "James Wilson",
        location: "Manchester, UK",
        text: "The monthly horoscope helped me make the right career decision. Highly recommended!",
        rating: 5,
    },
    {
        name: "Emma Thompson",
        location: "Dublin, Ireland",
        text: "Amazing accuracy and detail in the partner analysis. Finally understood our relationship dynamics!",
        rating: 5,
    },
];

// Localized testimonials by language code
export const testimonialsByLocale: Record<string, Testimonial[]> = {
    en: defaultTestimonials,

    // German-speaking markets
    de: [
        {
            name: "Anna Müller",
            location: "Berlin, Deutschland",
            text: "Das genaueste Horoskop, das ich je erhalten habe! Alles ist genau so eingetroffen wie vorhergesagt.",
            rating: 5,
        },
        {
            name: "Thomas Weber",
            location: "München, Deutschland",
            text: "Das Monatshoroskop hat mir geholfen, die richtige Karriereentscheidung zu treffen. Sehr empfehlenswert!",
            rating: 5,
        },
        {
            name: "Lisa Schmidt",
            location: "Wien, Österreich",
            text: "Erstaunliche Genauigkeit und Details in der Partneranalyse. Endlich verstehe ich unsere Beziehungsdynamik!",
            rating: 5,
        },
    ],

    // French-speaking markets
    fr: [
        {
            name: "Marie Dubois",
            location: "Paris, France",
            text: "L'horoscope le plus précis que j'aie jamais reçu ! Tout s'est réalisé exactement comme prédit.",
            rating: 5,
        },
        {
            name: "Pierre Martin",
            location: "Lyon, France",
            text: "L'horoscope mensuel m'a aidé à prendre la bonne décision de carrière. Je recommande vivement !",
            rating: 5,
        },
        {
            name: "Sophie Bernard",
            location: "Bruxelles, Belgique",
            text: "Une précision et des détails incroyables dans l'analyse de couple. J'ai enfin compris notre dynamique !",
            rating: 5,
        },
    ],

    // Spanish-speaking markets
    es: [
        {
            name: "María García",
            location: "Madrid, España",
            text: "¡El horóscopo más preciso que he recibido! Todo se cumplió exactamente como se predijo.",
            rating: 5,
        },
        {
            name: "Carlos López",
            location: "Barcelona, España",
            text: "El horóscopo mensual me ayudó a tomar la decisión correcta en mi carrera. ¡Muy recomendable!",
            rating: 5,
        },
        {
            name: "Ana Martínez",
            location: "Buenos Aires, Argentina",
            text: "¡Increíble precisión y detalle en el análisis de pareja! Por fin entendí nuestra dinámica.",
            rating: 5,
        },
    ],

    // Italian market
    it: [
        {
            name: "Giulia Rossi",
            location: "Roma, Italia",
            text: "L'oroscopo più accurato che abbia mai ricevuto! Tutto si è avverato esattamente come previsto.",
            rating: 5,
        },
        {
            name: "Marco Bianchi",
            location: "Milano, Italia",
            text: "L'oroscopo mensile mi ha aiutato a prendere la decisione giusta nella carriera. Consigliatissimo!",
            rating: 5,
        },
        {
            name: "Francesca Romano",
            location: "Firenze, Italia",
            text: "Precisione e dettagli incredibili nell'analisi di coppia. Ho finalmente capito le nostre dinamiche!",
            rating: 5,
        },
    ],

    // Portuguese market
    pt: [
        {
            name: "Ana Silva",
            location: "Lisboa, Portugal",
            text: "O horóscopo mais preciso que já recebi! Tudo aconteceu exatamente como previsto.",
            rating: 5,
        },
        {
            name: "João Santos",
            location: "Porto, Portugal",
            text: "O horóscopo mensal ajudou-me a tomar a decisão certa na carreira. Muito recomendado!",
            rating: 5,
        },
        {
            name: "Maria Costa",
            location: "São Paulo, Brasil",
            text: "Precisão e detalhes incríveis na análise de casal. Finalmente entendi a nossa dinâmica!",
            rating: 5,
        },
    ],

    // Dutch market
    nl: [
        {
            name: "Emma de Vries",
            location: "Amsterdam, Nederland",
            text: "De meest nauwkeurige horoscoop die ik ooit heb ontvangen! Alles kwam precies uit zoals voorspeld.",
            rating: 5,
        },
        {
            name: "Jan Bakker",
            location: "Rotterdam, Nederland",
            text: "De maandhoroscoop hielp me de juiste carrièrebeslissing te nemen. Sterk aanbevolen!",
            rating: 5,
        },
        {
            name: "Sophie Jansen",
            location: "Antwerpen, België",
            text: "Ongelooflijke nauwkeurigheid en detail in de partneranalyse. Eindelijk begrijp ik onze dynamiek!",
            rating: 5,
        },
    ],

    // Polish market
    pl: [
        {
            name: "Anna Kowalska",
            location: "Warszawa, Polska",
            text: "Najdokładniejszy horoskop, jaki kiedykolwiek otrzymałam! Wszystko spełniło się dokładnie tak, jak przewidziano.",
            rating: 5,
        },
        {
            name: "Piotr Nowak",
            location: "Kraków, Polska",
            text: "Horoskop miesięczny pomógł mi podjąć właściwą decyzję zawodową. Gorąco polecam!",
            rating: 5,
        },
        {
            name: "Katarzyna Wiśniewska",
            location: "Wrocław, Polska",
            text: "Niesamowita dokładność i szczegółowość analizy partnerskiej. Wreszcie zrozumiałam naszą dynamikę!",
            rating: 5,
        },
    ],

    // Czech market
    cs: [
        {
            name: "Jana Nováková",
            location: "Praha, Česko",
            text: "Nejpřesnější horoskop, jaký jsem kdy dostala! Všechno se splnilo přesně tak, jak bylo předpovězeno.",
            rating: 5,
        },
        {
            name: "Petr Svoboda",
            location: "Brno, Česko",
            text: "Měsíční horoskop mi pomohl udělat správné kariérní rozhodnutí. Vřele doporučuji!",
            rating: 5,
        },
        {
            name: "Eva Dvořáková",
            location: "Ostrava, Česko",
            text: "Úžasná přesnost a detaily v partnerské analýze. Konečně rozumím naší dynamice!",
            rating: 5,
        },
    ],

    // Slovak market
    sk: [
        {
            name: "Jana Kováčová",
            location: "Bratislava, Slovensko",
            text: "Najpresnejší horoskop, aký som kedy dostala! Všetko sa splnilo presne tak, ako bolo predpovedané.",
            rating: 5,
        },
        {
            name: "Peter Horváth",
            location: "Košice, Slovensko",
            text: "Mesačný horoskop mi pomohol urobiť správne kariérne rozhodnutie. Vrelo odporúčam!",
            rating: 5,
        },
        {
            name: "Eva Szabóová",
            location: "Žilina, Slovensko",
            text: "Úžasná presnosť a detaily v partnerskej analýze. Konečne rozumiem našej dynamike!",
            rating: 5,
        },
    ],

    // Nordic markets
    sv: [
        {
            name: "Emma Lindqvist",
            location: "Stockholm, Sverige",
            text: "Det mest exakta horoskopet jag någonsin fått! Allt blev precis som förutspått.",
            rating: 5,
        },
        {
            name: "Erik Johansson",
            location: "Göteborg, Sverige",
            text: "Månadshoroskopet hjälpte mig att fatta rätt karriärbeslut. Rekommenderas varmt!",
            rating: 5,
        },
        {
            name: "Anna Karlsson",
            location: "Malmö, Sverige",
            text: "Fantastisk precision och detaljer i partneranalysen. Äntligen förstår jag vår dynamik!",
            rating: 5,
        },
    ],

    da: [
        {
            name: "Emma Nielsen",
            location: "København, Danmark",
            text: "Det mest præcise horoskop, jeg nogensinde har modtaget! Alt gik i opfyldelse præcis som forudsagt.",
            rating: 5,
        },
        {
            name: "Lars Jensen",
            location: "Aarhus, Danmark",
            text: "Månedshoroskopet hjalp mig med at træffe den rigtige karrierebeslutning. Stærkt anbefalet!",
            rating: 5,
        },
        {
            name: "Sofie Andersen",
            location: "Odense, Danmark",
            text: "Utrolig præcision og detaljer i partneranalysen. Endelig forstår jeg vores dynamik!",
            rating: 5,
        },
    ],

    no: [
        {
            name: "Emma Hansen",
            location: "Oslo, Norge",
            text: "Det mest nøyaktige horoskopet jeg noensinne har mottatt! Alt gikk i oppfyllelse nøyaktig som forutsagt.",
            rating: 5,
        },
        {
            name: "Lars Olsen",
            location: "Bergen, Norge",
            text: "Månedshoroskopet hjalp meg å ta riktig karrierevalg. Anbefales på det sterkeste!",
            rating: 5,
        },
        {
            name: "Sofia Larsen",
            location: "Trondheim, Norge",
            text: "Utrolig presisjon og detaljer i partneranalysen. Endelig forstår jeg vår dynamikk!",
            rating: 5,
        },
    ],

    fi: [
        {
            name: "Emma Virtanen",
            location: "Helsinki, Suomi",
            text: "Tarkin horoskooppi, jonka olen koskaan saanut! Kaikki toteutui täsmälleen ennustetulla tavalla.",
            rating: 5,
        },
        {
            name: "Mikko Korhonen",
            location: "Tampere, Suomi",
            text: "Kuukausihoroskooppi auttoi minua tekemään oikean urapäätöksen. Suosittelen lämpimästi!",
            rating: 5,
        },
        {
            name: "Anna Mäkinen",
            location: "Turku, Suomi",
            text: "Uskomaton tarkkuus ja yksityiskohdat kumppanianalyysissä. Vihdoin ymmärrän dynamiikkamme!",
            rating: 5,
        },
    ],

    // Hungarian market
    hu: [
        {
            name: "Anna Tóth",
            location: "Budapest, Magyarország",
            text: "A legpontosabb horoszkóp, amit valaha kaptam! Minden pontosan úgy történt, ahogy megjósolták.",
            rating: 5,
        },
        {
            name: "Péter Nagy",
            location: "Debrecen, Magyarország",
            text: "A havi horoszkóp segített meghozni a helyes karrierdöntést. Nagyon ajánlom!",
            rating: 5,
        },
        {
            name: "Éva Szabó",
            location: "Szeged, Magyarország",
            text: "Hihetetlen pontosság és részletesség a párkapcsolat-elemzésben. Végre megértem a dinamikánkat!",
            rating: 5,
        },
    ],

    // Romanian market
    ro: [
        {
            name: "Ana Popescu",
            location: "București, România",
            text: "Cel mai precis horoscop pe care l-am primit vreodată! Totul s-a întâmplat exact așa cum a fost prezis.",
            rating: 5,
        },
        {
            name: "Andrei Ionescu",
            location: "Cluj-Napoca, România",
            text: "Horoscopul lunar m-a ajutat să iau decizia corectă în carieră. Recomand cu căldură!",
            rating: 5,
        },
        {
            name: "Maria Dumitrescu",
            location: "Timișoara, România",
            text: "Precizie și detalii incredibile în analiza de cuplu. În sfârșit înțeleg dinamica noastră!",
            rating: 5,
        },
    ],

    // Turkish market
    tr: [
        {
            name: "Ayşe Yılmaz",
            location: "İstanbul, Türkiye",
            text: "Aldığım en doğru burç yorumu! Her şey tam tahmin edildiği gibi gerçekleşti.",
            rating: 5,
        },
        {
            name: "Mehmet Kaya",
            location: "Ankara, Türkiye",
            text: "Aylık burç yorumu, doğru kariyer kararını vermeme yardımcı oldu. Kesinlikle tavsiye ederim!",
            rating: 5,
        },
        {
            name: "Zeynep Demir",
            location: "İzmir, Türkiye",
            text: "Partner analizinde inanılmaz doğruluk ve detay. Sonunda ilişkimizin dinamiklerini anladım!",
            rating: 5,
        },
    ],

    // Russian market
    ru: [
        {
            name: "Анна Иванова",
            location: "Москва, Россия",
            text: "Самый точный гороскоп, который я когда-либо получала! Всё сбылось именно так, как было предсказано.",
            rating: 5,
        },
        {
            name: "Дмитрий Петров",
            location: "Санкт-Петербург, Россия",
            text: "Месячный гороскоп помог мне принять правильное решение в карьере. Горячо рекомендую!",
            rating: 5,
        },
        {
            name: "Елена Смирнова",
            location: "Казань, Россия",
            text: "Невероятная точность и детализация в анализе партнёрских отношений. Наконец-то я поняла нашу динамику!",
            rating: 5,
        },
    ],

    // Japanese market
    ja: [
        {
            name: "田中美咲",
            location: "東京, 日本",
            text: "今まで受け取った中で最も正確な星占いです！すべてが予測通りに実現しました。",
            rating: 5,
        },
        {
            name: "鈴木健太",
            location: "大阪, 日本",
            text: "月間星占いのおかげで正しいキャリア決断ができました。強くお勧めします！",
            rating: 5,
        },
        {
            name: "佐藤愛",
            location: "名古屋, 日本",
            text: "パートナー分析の正確さと詳細さに驚きました。ついに私たちの関係性が理解できました！",
            rating: 5,
        },
    ],

    // Korean market
    ko: [
        {
            name: "김지은",
            location: "서울, 대한민국",
            text: "지금까지 받아본 운세 중 가장 정확했어요! 모든 것이 예측한 대로 이루어졌습니다.",
            rating: 5,
        },
        {
            name: "이준혁",
            location: "부산, 대한민국",
            text: "월간 운세가 올바른 커리어 결정을 내리는 데 도움이 되었습니다. 강력 추천합니다!",
            rating: 5,
        },
        {
            name: "박소연",
            location: "인천, 대한민국",
            text: "궁합 분석의 정확성과 상세함에 놀랐습니다. 드디어 우리의 관계 역학을 이해하게 되었어요!",
            rating: 5,
        },
    ],

    // Chinese market
    zh: [
        {
            name: "李美玲",
            location: "北京, 中国",
            text: "这是我收到过的最准确的星座运势！一切都完全按照预测发生了。",
            rating: 5,
        },
        {
            name: "王建国",
            location: "上海, 中国",
            text: "月运势帮助我做出了正确的职业决定。强烈推荐！",
            rating: 5,
        },
        {
            name: "张晓红",
            location: "广州, 中国",
            text: "伴侣分析的准确性和详细程度令人惊叹。我终于理解了我们的关系动态！",
            rating: 5,
        },
    ],
};

/**
 * Get testimonials for a specific locale
 * Falls back to English if locale not found
 */
export function getTestimonials(locale: string): Testimonial[] {
    return testimonialsByLocale[locale] || testimonialsByLocale.en;
}

/**
 * Get all available locale codes with testimonials
 */
export function getAvailableTestimonialLocales(): string[] {
    return Object.keys(testimonialsByLocale);
}
