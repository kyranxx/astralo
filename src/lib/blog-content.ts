/**
 * Localized Blog Content
 * Translations for blog post titles and excerpts in all 33 languages
 */

export interface BlogPostTranslation {
    title: string;
    excerpt: string;
    category: string;
}

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

const blogContent: Record<string, BlogTranslations> = {
    en: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Daily Horoscope 2024: Complete Guide to Your Zodiac Predictions',
                excerpt: 'Discover what the stars have in store for you today.',
                category: 'Horoscopes'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Zodiac Sign Compatibility: The Ultimate Love Match Guide 2024',
                excerpt: 'Find out which zodiac signs are most compatible with yours.',
                category: 'Love & Relationships'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Birth Chart Reading: How to Understand Your Natal Chart',
                excerpt: 'Learn how to read and interpret your birth chart.',
                category: 'Astrology Basics'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Weekly Horoscope: What the Stars Predict for This Week',
                excerpt: 'Get your weekly horoscope forecast for all zodiac signs.',
                category: 'Horoscopes'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Monthly Horoscope January 2025: All Zodiac Sign Predictions',
                excerpt: 'Your complete monthly horoscope for January 2025.',
                category: 'Horoscopes'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Love Horoscope 2024: Relationship Predictions for Every Sign',
                excerpt: 'Is love written in your stars?',
                category: 'Love & Relationships'
            }
        },
        ui: {
            blogTitle: 'Daily Horoscope & Astrology Blog',
            blogSubtitle: 'Your trusted source for accurate horoscopes and astrological insights',
            readArticle: 'Read Article',
            readMore: 'Read more →',
            featured: 'Featured'
        }
    },
    bn: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ দৈনিক রাশিফল ২০২৪: আপনার রাশি ভবিষ্যদ্বাণীর সম্পূর্ণ গাইড',
                excerpt: 'আজ আপনার জন্য তারারা কী নিয়ে এসেছে তা আবিষ্কার করুন।',
                category: 'রাশিফল'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ রাশি সামঞ্জস্য: চূড়ান্ত প্রেম ম্যাচ গাইড ২০২৪',
                excerpt: 'কোন রাশি আপনার সাথে সবচেয়ে বেশি মিলে যায় তা জানুন।',
                category: 'প্রেম ও সম্পর্ক'
            },
            'birth-chart-reading-explained': {
                title: '🔮 জন্ম তালিকা পাঠ: আপনার জন্ম তালিকা কীভাবে বুঝবেন',
                excerpt: 'আপনার জন্ম তালিকা পড়তে এবং ব্যাখ্যা করতে শিখুন।',
                category: 'জ্যোতিষ মূলকথা'
            },
            'weekly-horoscope-predictions': {
                title: '📅 সাপ্তাহিক রাশিফল: এই সপ্তাহে তারারা কী ভবিষ্যদ্বাণী করছে',
                excerpt: 'সমস্ত রাশির জন্য আপনার সাপ্তাহিক রাশিফল পান।',
                category: 'রাশিফল'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 মাসিক রাশিফল জানুয়ারি ২০২৫: সমস্ত রাশির ভবিষ্যদ্বাণী',
                excerpt: 'জানুয়ারি ২০২৫-এর জন্য আপনার সম্পূর্ণ মাসিক রাশিফল।',
                category: 'রাশিফল'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 প্রেম রাশিফল ২০২৪: প্রতিটি রাশির জন্য সম্পর্কের ভবিষ্যদ্বাণী',
                excerpt: 'প্রেম কি আপনার তারায় লেখা আছে?',
                category: 'প্রেম ও সম্পর্ক'
            }
        },
        ui: {
            blogTitle: 'দৈনিক রাশিফল ও জ্যোতিষ ব্লগ',
            blogSubtitle: 'সঠিক রাশিফল এবং জ্যোতিষ অন্তর্দৃষ্টির জন্য আপনার বিশ্বস্ত উৎস',
            readArticle: 'নিবন্ধ পড়ুন',
            readMore: 'আরও পড়ুন →',
            featured: 'বৈশিষ্ট্যযুক্ত'
        }
    },
    hi: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ दैनिक राशिफल 2024: आपकी राशि भविष्यवाणी का संपूर्ण गाइड',
                excerpt: 'आज सितारों ने आपके लिए क्या रखा है जानें।',
                category: 'राशिफल'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ राशि अनुकूलता: परम प्रेम मिलान गाइड 2024',
                excerpt: 'जानें कौन सी राशि आपके साथ सबसे अधिक मेल खाती है।',
                category: 'प्रेम और रिश्ते'
            },
            'birth-chart-reading-explained': {
                title: '🔮 जन्म कुंडली पढ़ना: अपनी जन्म कुंडली को कैसे समझें',
                excerpt: 'अपनी जन्म कुंडली पढ़ना और समझना सीखें।',
                category: 'ज्योतिष मूल बातें'
            },
            'weekly-horoscope-predictions': {
                title: '📅 साप्ताहिक राशिफल: इस सप्ताह सितारे क्या भविष्यवाणी करते हैं',
                excerpt: 'सभी राशियों के लिए अपना साप्ताहिक राशिफल प्राप्त करें।',
                category: 'राशिफल'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 मासिक राशिफल जनवरी 2025: सभी राशियों की भविष्यवाणी',
                excerpt: 'जनवरी 2025 के लिए आपका पूर्ण मासिक राशिफल।',
                category: 'राशिफल'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 प्रेम राशिफल 2024: हर राशि के लिए रिश्ते की भविष्यवाणी',
                excerpt: 'क्या प्रेम आपके सितारों में लिखा है?',
                category: 'प्रेम और रिश्ते'
            }
        },
        ui: {
            blogTitle: 'दैनिक राशिफल और ज्योतिष ब्लॉग',
            blogSubtitle: 'सटीक राशिफल और ज्योतिषीय अंतर्दृष्टि के लिए आपका विश्वसनीय स्रोत',
            readArticle: 'लेख पढ़ें',
            readMore: 'और पढ़ें →',
            featured: 'विशेष'
        }
    },
    de: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Tageshoroskop 2024: Kompletter Leitfaden zu Ihren Sternzeichen-Vorhersagen',
                excerpt: 'Entdecken Sie, was die Sterne heute für Sie bereithalten.',
                category: 'Horoskope'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Sternzeichen-Kompatibilität: Der ultimative Liebes-Match-Leitfaden 2024',
                excerpt: 'Finden Sie heraus, welche Sternzeichen am besten zu Ihnen passen.',
                category: 'Liebe & Beziehungen'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Geburtshoroskop lesen: So verstehen Sie Ihr Natal-Chart',
                excerpt: 'Lernen Sie, Ihr Geburtshoroskop zu lesen und zu interpretieren.',
                category: 'Astrologie Grundlagen'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Wochenhoroskop: Was die Sterne diese Woche vorhersagen',
                excerpt: 'Holen Sie sich Ihr Wochenhoroskop für alle Sternzeichen.',
                category: 'Horoskope'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Monatshoroskop Januar 2025: Alle Sternzeichen-Vorhersagen',
                excerpt: 'Ihr vollständiges Monatshoroskop für Januar 2025.',
                category: 'Horoskope'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Liebeshoroskop 2024: Beziehungsvorhersagen für jedes Zeichen',
                excerpt: 'Steht die Liebe in Ihren Sternen geschrieben?',
                category: 'Liebe & Beziehungen'
            }
        },
        ui: {
            blogTitle: 'Tageshoroskop & Astrologie Blog',
            blogSubtitle: 'Ihre vertrauenswürdige Quelle für genaue Horoskope und astrologische Einblicke',
            readArticle: 'Artikel lesen',
            readMore: 'Mehr lesen →',
            featured: 'Empfohlen'
        }
    },
    fr: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Horoscope du jour 2024: Guide complet de vos prédictions zodiacales',
                excerpt: 'Découvrez ce que les étoiles vous réservent aujourd\'hui.',
                category: 'Horoscopes'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilité des signes: Le guide ultime des correspondances amoureuses 2024',
                excerpt: 'Découvrez quels signes sont les plus compatibles avec le vôtre.',
                category: 'Amour & Relations'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Lecture du thème natal: Comment comprendre votre carte du ciel',
                excerpt: 'Apprenez à lire et interpréter votre thème natal.',
                category: 'Bases de l\'astrologie'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Horoscope de la semaine: Ce que les étoiles prédisent cette semaine',
                excerpt: 'Obtenez votre horoscope hebdomadaire pour tous les signes.',
                category: 'Horoscopes'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Horoscope mensuel janvier 2025: Prédictions pour tous les signes',
                excerpt: 'Votre horoscope mensuel complet pour janvier 2025.',
                category: 'Horoscopes'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horoscope amour 2024: Prédictions relationnelles pour chaque signe',
                excerpt: 'L\'amour est-il écrit dans vos étoiles?',
                category: 'Amour & Relations'
            }
        },
        ui: {
            blogTitle: 'Horoscope du jour & Blog Astrologie',
            blogSubtitle: 'Votre source fiable pour des horoscopes précis et des conseils astrologiques',
            readArticle: 'Lire l\'article',
            readMore: 'Lire plus →',
            featured: 'À la une'
        }
    },
    es: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Horóscopo diario 2024: Guía completa de tus predicciones zodiacales',
                excerpt: 'Descubre lo que las estrellas te deparan hoy.',
                category: 'Horóscopos'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilidad de signos: La guía definitiva de parejas 2024',
                excerpt: 'Descubre qué signos son más compatibles contigo.',
                category: 'Amor y Relaciones'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Lectura de carta natal: Cómo entender tu carta astral',
                excerpt: 'Aprende a leer e interpretar tu carta natal.',
                category: 'Astrología Básica'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Horóscopo semanal: Lo que predicen las estrellas esta semana',
                excerpt: 'Obtén tu horóscopo semanal para todos los signos.',
                category: 'Horóscopos'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Horóscopo mensual enero 2025: Predicciones para todos los signos',
                excerpt: 'Tu horóscopo mensual completo para enero 2025.',
                category: 'Horóscopos'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horóscopo del amor 2024: Predicciones de relaciones para cada signo',
                excerpt: '¿Está el amor escrito en tus estrellas?',
                category: 'Amor y Relaciones'
            }
        },
        ui: {
            blogTitle: 'Horóscopo Diario y Blog de Astrología',
            blogSubtitle: 'Tu fuente confiable para horóscopos precisos y consejos astrológicos',
            readArticle: 'Leer artículo',
            readMore: 'Leer más →',
            featured: 'Destacado'
        }
    }
};

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
