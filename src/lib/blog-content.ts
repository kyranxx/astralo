/**
 * Localized Blog Content
 * Translations for blog post titles and excerpts in all 33 languages
 */
import type { BlogPostTranslation } from './blog/types';
import { birthChartReadingExplained } from './blog/articles/birth-chart-reading-explained';
import { dailyHoroscopeGuide } from './blog/articles/daily-horoscope-guide';
import { historyOfAstrology } from './blog/articles/history-of-astrology';
import { loveHoroscopeRelationshipAdvice } from './blog/articles/love-horoscope-relationship-advice';
import { mercuryRetrogradeSurvivalGuide } from './blog/articles/mercury-retrograde-survival-guide';
import { monthlyHoroscope as monthlyHoroscopeFeb } from './blog/articles/monthly-horoscope-february-2026';
import { monthlyHoroscopeJanuary2026 } from './blog/articles/monthly-horoscope-january-2026';
import { saturnReturnGuide } from './blog/articles/saturn-return-guide';
import { the12HousesOfAstrology } from './blog/articles/the-12-houses-of-astrology';
import { twinFlamesAndSoulmatesAstrology } from './blog/articles/twin-flames-and-soulmates-astrology';
import { zodiacCompatibilityCompleteGuide } from './blog/articles/zodiac-compatibility-complete-guide';

export interface BlogTranslations {
    posts: Record<string, BlogPostTranslation>;
    ui: {
        blogTitle: string;
        blogSubtitle: string;
        readArticle: string;
        readMore: string;
        featured: string;
    };
}

const postsMap: Record<string, Record<string, BlogPostTranslation>> = {
    'birth-chart-reading-explained': birthChartReadingExplained,
    'daily-horoscope-guide': dailyHoroscopeGuide,
    'history-of-astrology': historyOfAstrology,
    'love-horoscope-relationship-advice': loveHoroscopeRelationshipAdvice,
    'mercury-retrograde-survival-guide': mercuryRetrogradeSurvivalGuide,
    'monthly-horoscope-february-2026': monthlyHoroscopeFeb,
    'monthly-horoscope-january-2026': monthlyHoroscopeJanuary2026,
    'saturn-return-guide': saturnReturnGuide,
    'the-12-houses-of-astrology': the12HousesOfAstrology,
    'twin-flames-and-soulmates-astrology': twinFlamesAndSoulmatesAstrology,
    'zodiac-compatibility-complete-guide': zodiacCompatibilityCompleteGuide,
};

// UI Translations for 33 languages
const uiTranslations: Record<string, BlogTranslations['ui']> = {
    en: { blogTitle: 'Daily Horoscope & Astrology Blog', blogSubtitle: 'Your trusted source for accurate horoscopes and astrological insights', readArticle: 'Read Article', readMore: 'Read more →', featured: 'Featured' },
    bn: { blogTitle: 'দৈনিক রাশিফল ও জ্যোতিষ ব্লগ', blogSubtitle: 'सঠিক রাশিফল এবং জ্যোতিষ অন্তর্দৃষ্টির জন্য আপনার বিশ্বস্ত উৎস', readArticle: 'নিবন্ধ পড়ুন', readMore: 'আরও পড়ুন →', featured: 'বৈশিষ্ট্যযুক্ত' },
    hi: { blogTitle: 'दैनिक राशिफल और ज्योतिष ब्लॉग', blogSubtitle: 'सटीक राशिफल और ज्योतिषीय अंतर्दृष्टि के लिए आपका विश्वसनीय स्रोत', readArticle: 'लेख पढ़ें', readMore: 'और पढ़ें →', featured: 'विशेष' },
    de: { blogTitle: 'Tageshoroskop & Astrologie Blog', blogSubtitle: 'Ihre vertrauenswürdige Quelle für genaue Horoskope und astrologische Einblicke', readArticle: 'Artikel lesen', readMore: 'Mehr lesen →', featured: 'Empfohlen' },
    fr: { blogTitle: 'Horoscope du jour & Blog Astrologie', blogSubtitle: 'Votre source fiable pour des horoscopes précis et des conseils astrologiques', readArticle: 'Lire l\'article', readMore: 'Lire plus →', featured: 'À la une' },
    es: { blogTitle: 'Horóscopo Diario y Blog de Astrología', blogSubtitle: 'Tu fuente confiable para horóscopos precisos y consejos astrológicos', readArticle: 'Leer artículo', readMore: 'Leer más →', featured: 'Destacado' },
    it: { blogTitle: 'Oroscopo del Giorno & Blog Astrologia', blogSubtitle: 'La tua fonte affidabile per oroscopi precisi e consigli astrologici', readArticle: 'Leggi articolo', readMore: 'Leggi di più →', featured: 'In evidenza' },
    pt: { blogTitle: 'Horóscopo Diário & Blog de Astrologia', blogSubtitle: 'Sua fonte confiável para horóscopos precisos e insights astrológicos', readArticle: 'Ler artigo', readMore: 'Ler mais →', featured: 'Destaque' },
    sk: { blogTitle: 'Denný horoskop a astrologický blog', blogSubtitle: 'Váš dôveryhodný zdroj presných horoskopov a astrologických poznatkov', readArticle: 'Čítať článok', readMore: 'Čítať viac →', featured: 'Odporúčané' },
    cs: { blogTitle: 'Denní horoskop a astrologický blog', blogSubtitle: 'Váš důvěryhodný zdroj přesných horoskopů a astrologických poznatků', readArticle: 'Číst článek', readMore: 'Číst více →', featured: 'Doporučené' },
    ja: { blogTitle: '毎日の星占いと占星術ブログ', blogSubtitle: '正確な星占いと占星術の洞察のための信頼できる情報源', readArticle: '記事を読む', readMore: '続きを読む →', featured: '注目' },
    ko: { blogTitle: '오늘의 운세 & 점성술 블로그', blogSubtitle: '정확한 운세와 점성술 통찰력을 위한 신뢰할 수 있는 소스', readArticle: '기사 읽기', readMore: '더 읽기 →', featured: '추천' },
    zh: { blogTitle: '每日星座运势与占星博客', blogSubtitle: '准确星座运势和占星洞察的可靠来源', readArticle: '阅读文章', readMore: '阅读更多 →', featured: '精选' },
    ru: { blogTitle: 'Ежедневный гороскоп и блог астрологии', blogSubtitle: 'Ваш надёжный источник точных гороскопов и астрологических прогнозов', readArticle: 'Читать статью', readMore: 'Читать далее →', featured: 'Рекомендуемое' },
    nl: { blogTitle: 'Dagelijkse Horoscoop & Astrologie Blog', blogSubtitle: 'Uw betrouwbare bron voor nauwkeurige horoscopen', readArticle: 'Lees Artikel', readMore: 'Lees meer →', featured: 'Uitgelicht' },
    pl: { blogTitle: 'Horoskop Dzienny i Blog Astrologiczny', blogSubtitle: 'Twoje zaufane źródło dokładnych horoskopów', readArticle: 'Czytaj Artykuł', readMore: 'Czytaj więcej →', featured: 'Polecane' },
    hu: { blogTitle: 'Napi Horoszkóp & Asztrológia Blog', blogSubtitle: 'Megbízható forrása a pontos horoszkópoknak', readArticle: 'Cikk Olvasása', readMore: 'Tovább →', featured: 'Kiemelt' },
    ro: { blogTitle: 'Horoscop Zilnic & Blog Astrologie', blogSubtitle: 'Sursa ta de încredere pentru horoscoape precise', readArticle: 'Citește Articolul', readMore: 'Citește mai mult →', featured: 'Recomandat' },
    bg: { blogTitle: 'Дневен Хороскоп & Блог по Астрология', blogSubtitle: 'Вашият надежден източник за точни хороскопи', readArticle: 'Прочети Статията', readMore: 'Прочети повече →', featured: 'Препоръчано' },
    hr: { blogTitle: 'Dnevni Horoskop & Blog o Astrologiji', blogSubtitle: 'Vaš pouzdani izvor za točne horoskope', readArticle: 'Pročitaj Članak', readMore: 'Pročitaj više →', featured: 'Istaknuto' },
    sl: { blogTitle: 'Dnevni Horoskop & Blog o Astrologiji', blogSubtitle: 'Vaš zaupanja vreden vir za natančne horoskope', readArticle: 'Preberi Članek', readMore: 'Preberi več →', featured: 'Izpostavljeno' },
    sr: { blogTitle: 'Dnevni Horoskop & Blog o Astrologiji', blogSubtitle: 'Vaš pouzdan izvor za tačne horoskope', readArticle: 'Pročitaj Članak', readMore: 'Pročitaj više →', featured: 'Istaknuto' },
    uk: { blogTitle: 'Щоденний Гороскоп & Блог Астрології', blogSubtitle: 'Ваше надійне джерело точних гороскопів', readArticle: 'Читати Статтю', readMore: 'Читати далі →', featured: 'Рекомендоване' },
    el: { blogTitle: 'Ημερήσιο Ωροσκόπιο & Αστρολογικό Blog', blogSubtitle: 'Η αξιόπιστη πηγή σας για ακριβή ωροσκόπια', readArticle: 'Διαβάστε το Άρθρο', readMore: 'Διαβάστε περισσότερα →', featured: 'Προτεινόμενο' },
    tr: { blogTitle: 'Günlük Burç & Astroloji Blogu', blogSubtitle: 'Doğru burç yorumları için güvenilir kaynağınız', readArticle: 'Makaleyi Oku', readMore: 'Devamını oku →', featured: 'Öne Çıkan' },
    ar: { blogTitle: 'الأبراج اليومية ومدونة الفلك', blogSubtitle: 'مصدرك الموثوق للأبراج الدقيقة', readArticle: 'اقرأ المقال', readMore: 'اقرأ المزيد →', featured: 'مميز' },
    th: { blogTitle: 'ดวงรายวันและบล็อกโหราศาสตร์', blogSubtitle: 'แหล่งข้อมูลที่คุณไว้วางใจสำหรับดวงที่แม่นยำ', readArticle: 'อ่านบทความ', readMore: 'อ่านเพิ่มเติม →', featured: 'แนะนำ' },
    vi: { blogTitle: 'Tử Vi Hàng Ngày & Blog Chiêm Tinh', blogSubtitle: 'Nguồn đáng tin cậy cho tử vi chính xác', readArticle: 'Đọc Bài Viết', readMore: 'Đọc thêm →', featured: 'Nổi Bật' },
    id: { blogTitle: 'Ramalan Harian & Blog Astrologi', blogSubtitle: 'Sumber terpercaya untuk ramalan akurat', readArticle: 'Baca Artikel', readMore: 'Baca selengkapnya →', featured: 'Unggulan' },
    sv: { blogTitle: 'Dagligt Horoskop & Astrologiblogg', blogSubtitle: 'Din pålitliga källa för exakta horoskop', readArticle: 'Läs Artikeln', readMore: 'Läs mer →', featured: 'Utvalt' },
    da: { blogTitle: 'Dagligt Horoskop & Astrologiblog', blogSubtitle: 'Din pålidelige kilde til præcise horoskoper', readArticle: 'Læs Artikel', readMore: 'Læs mere →', featured: 'Udvalgt' },
    no: { blogTitle: 'Daglig Horoskop & Astrologiblogg', blogSubtitle: 'Din pålitelige kilde for nøyaktige horoskoper', readArticle: 'Les Artikkel', readMore: 'Les mer →', featured: 'Utvalt' },
    fi: { blogTitle: 'Päivittäinen Horoskooppi & Astrologiablogi', blogSubtitle: 'Luotettava lähteesi tarkoille horoskoopille', readArticle: 'Lue Artikkeli', readMore: 'Lue lisää →', featured: 'Suositeltu' },
    he: { blogTitle: 'הורוסקופ יומי ובלוג אסטרולוגיה', blogSubtitle: 'המקור האמין שלך להורוסקופים מדויקים', readArticle: 'קרא מאמר', readMore: 'קרא עוד →', featured: 'מומלץ' }
};

const blogContent: Record<string, BlogTranslations> = {};
const languages = Object.keys(uiTranslations);

languages.forEach(lang => {
    blogContent[lang] = {
        ui: uiTranslations[lang],
        posts: {}
    };

    Object.keys(postsMap).forEach(slug => {
        const post = postsMap[slug];
        // Ensure we have a translation for this language, or fallback to En
        if (post[lang]) {
            blogContent[lang].posts[slug] = post[lang];
        } else if (post['en']) {
            // Fallback
            blogContent[lang].posts[slug] = post['en'];
        }
    });
});

// Get blog content for a specific language, fallback to English
export function getBlogContent(lang: string): BlogTranslations {
    return blogContent[lang] || blogContent.en;
}

// Get a specific post translation
export function getPostTranslation(lang: string, slug: string): BlogPostTranslation {
    const content = getBlogContent(lang);
    return content.posts[slug] || getBlogContent('en').posts[slug];
}

export default blogContent;
