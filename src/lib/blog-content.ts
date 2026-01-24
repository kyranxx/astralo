/**
 * Localized Blog Content
 * Translations for blog post titles and excerpts in all 33 languages
 */

export interface BlogPostTranslation {
    title: string;
    excerpt: string;
    category: string;
    // Optional full article content fields
    metaDescription?: string;
    quickSummary?: string[];
    keyTakeaways?: string[];
    tableOfContents?: Array<{ id: string; title: string }>;
    content?: string;
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
                title: '⭐ Daily Horoscope 2026: Complete Guide to Your Zodiac Predictions',
                excerpt: 'Discover what the stars have in store for you today.',
                category: 'Horoscopes'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Zodiac Sign Compatibility: The Ultimate Love Match Guide 2026',
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
                title: '💕 Love Horoscope 2026: Relationship Predictions for Every Sign',
                excerpt: 'Is love written in your stars?',
                category: 'Love & Relationships'
            },
            'mercury-retrograde-survival-guide': {
                title: '☄️ Mercury Retrograde Survival Guide 2026: From Chaos to Calm',
                excerpt: 'Don\'t fear the retrograde! Learn why Mercury Retrograde is actually a vital cosmic reset.',
                category: 'Astrology 101'
            },
            'history-of-astrology': {
                title: '🏛️ The History of Astrology: From Ancient Babylon to Modern AI',
                excerpt: 'Explore the fascinating 5,000-year journey of astrology.',
                category: 'Astrology Basics'
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
                title: '⭐ दैनिक राशिफल 2026: आपकी राशि भविष्यवाणी का संपूर्ण गाइड',
                excerpt: 'आज सितारों ने आपके लिए क्या रखा है जानें।',
                category: 'राशिफल'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ राशि अनुकूलता: परम प्रेम मिलान गाइड 2026',
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
                title: '💕 प्रेम राशिफल 2026: हर राशि के लिए रिश्ते की भविष्यवाणी',
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
                title: '⭐ Tageshoroskop 2026: Kompletter Leitfaden zu Ihren Sternzeichen-Vorhersagen',
                excerpt: 'Entdecken Sie, was die Sterne heute für Sie bereithalten.',
                category: 'Horoskope'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Sternzeichen-Kompatibilität: Der ultimative Liebes-Match-Leitfaden 2026',
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
                title: '💕 Liebeshoroskop 2026: Beziehungsvorhersagen für jedes Zeichen',
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
                title: '⭐ Horoscope du jour 2026: Guide complet de vos prédictions zodiacales',
                excerpt: 'Découvrez ce que les étoiles vous réservent aujourd\'hui.',
                category: 'Horoscopes'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilité des signes: Le guide ultime des correspondances amoureuses 2026',
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
                title: '💕 Horoscope amour 2026: Prédictions relationnelles pour chaque signe',
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
                title: '⭐ Horóscopo diario 2026: Guía completa de tus predicciones zodiacales',
                excerpt: 'Descubre lo que las estrellas te deparan hoy.',
                category: 'Horóscopos'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilidad de signos: La guía definitiva de parejas 2026',
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
                title: '💕 Horóscopo del amor 2026: Predicciones de relaciones para cada signo',
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
    },
    it: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Oroscopo del giorno 2026: Guida completa alle previsioni zodiacali',
                excerpt: 'Scopri cosa ti riservano le stelle oggi.',
                category: 'Oroscopi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilità segni zodiacali: La guida definitiva 2026',
                excerpt: 'Scopri quali segni sono più compatibili con il tuo.',
                category: 'Amore e Relazioni'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Lettura tema natale: Come capire la tua carta astrale',
                excerpt: 'Impara a leggere e interpretare il tuo tema natale.',
                category: 'Basi di Astrologia'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Oroscopo settimanale: Cosa predicono le stelle questa settimana',
                excerpt: 'Ottieni il tuo oroscopo settimanale per tutti i segni.',
                category: 'Oroscopi'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Oroscopo mensile gennaio 2025: Previsioni per tutti i segni',
                excerpt: 'Il tuo oroscopo mensile completo per gennaio 2025.',
                category: 'Oroscopi'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Oroscopo dell\'amore 2026: Previsioni per ogni segno',
                excerpt: 'L\'amore è scritto nelle tue stelle?',
                category: 'Amore e Relazioni'
            }
        },
        ui: {
            blogTitle: 'Oroscopo del Giorno & Blog Astrologia',
            blogSubtitle: 'La tua fonte affidabile per oroscopi precisi e consigli astrologici',
            readArticle: 'Leggi articolo',
            readMore: 'Leggi di più →',
            featured: 'In evidenza'
        }
    },
    pt: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Horóscopo do dia 2026: Guia completo das suas previsões',
                excerpt: 'Descubra o que as estrelas reservam para você hoje.',
                category: 'Horóscopos'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilidade de signos: O guia definitivo 2026',
                excerpt: 'Descubra quais signos são mais compatíveis com o seu.',
                category: 'Amor e Relacionamentos'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Leitura do mapa astral: Como entender sua carta natal',
                excerpt: 'Aprenda a ler e interpretar seu mapa astral.',
                category: 'Astrologia Básica'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Horóscopo semanal: O que as estrelas preveem esta semana',
                excerpt: 'Obtenha seu horóscopo semanal para todos os signos.',
                category: 'Horóscopos'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Horóscopo mensal janeiro 2025: Previsões para todos os signos',
                excerpt: 'Seu horóscopo mensal completo para janeiro 2025.',
                category: 'Horóscopos'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horóscopo do amor 2026: Previsões para cada signo',
                excerpt: 'O amor está escrito nas suas estrelas?',
                category: 'Amor e Relacionamentos'
            }
        },
        ui: {
            blogTitle: 'Horóscopo Diário & Blog de Astrologia',
            blogSubtitle: 'Sua fonte confiável para horóscopos precisos e insights astrológicos',
            readArticle: 'Ler artigo',
            readMore: 'Ler mais →',
            featured: 'Destaque'
        }
    },
    sk: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Denný horoskop 2026: Kompletný sprievodca vašimi predpoveďami',
                excerpt: 'Zistite, čo pre vás hviezdy dnes pripravili.',
                category: 'Horoskopy'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatibilita znamení: Ultimátny sprievodca láskou 2026',
                excerpt: 'Zistite, ktoré znamenia sú s vami najkompatibilnejšie.',
                category: 'Láska a vzťahy'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Čítanie pôrodného horoskopu: Ako porozumieť vašej natálnej mape',
                excerpt: 'Naučte sa čítať a interpretovať váš pôrodný horoskop.',
                category: 'Základy astrológie'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Týždenný horoskop: Čo hviezdy predpovedajú tento týždeň',
                excerpt: 'Získajte svoj týždenný horoskop pre všetky znamenia.',
                category: 'Horoskopy'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Mesačný horoskop január 2025: Predpovede pre všetky znamenia',
                excerpt: 'Váš kompletný mesačný horoskop na január 2025.',
                category: 'Horoskopy'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horoskop lásky 2026: Vzťahové predpovede pre každé znamenie',
                excerpt: 'Je láska napísaná vo vašich hviezdach?',
                category: 'Láska a vzťahy'
            }
        },
        ui: {
            blogTitle: 'Denný horoskop a astrologický blog',
            blogSubtitle: 'Váš dôveryhodný zdroj presných horoskopov a astrologických poznatkov',
            readArticle: 'Čítať článok',
            readMore: 'Čítať viac →',
            featured: 'Odporúčané'
        }
    },
    cs: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Denní horoskop 2026: Kompletní průvodce vašimi předpovědmi',
                excerpt: 'Zjistěte, co pro vás hvězdy dnes připravily.',
                category: 'Horoskopy'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatibilita znamení: Ultimátní průvodce láskou 2026',
                excerpt: 'Zjistěte, která znamení jsou s vámi nejkompatibilnější.',
                category: 'Láska a vztahy'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Čtení natálního horoskopu: Jak porozumět vaší natální mapě',
                excerpt: 'Naučte se číst a interpretovat váš natální horoskop.',
                category: 'Základy astrologie'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Týdenní horoskop: Co hvězdy předpovídají tento týden',
                excerpt: 'Získejte svůj týdenní horoskop pro všechna znamení.',
                category: 'Horoskopy'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Měsíční horoskop leden 2025: Předpovědi pro všechna znamení',
                excerpt: 'Váš kompletní měsíční horoskop na leden 2025.',
                category: 'Horoskopy'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horoskop lásky 2026: Vztahové předpovědi pro každé znamení',
                excerpt: 'Je láska napsána ve vašich hvězdách?',
                category: 'Láska a vztahy'
            }
        },
        ui: {
            blogTitle: 'Denní horoskop a astrologický blog',
            blogSubtitle: 'Váš důvěryhodný zdroj přesných horoskopů a astrologických poznatků',
            readArticle: 'Číst článek',
            readMore: 'Číst více →',
            featured: 'Doporučené'
        }
    },
    ja: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ 毎日の星占い2026：星座予測の完全ガイド',
                excerpt: '今日、星があなたに何を用意しているか発見しましょう。',
                category: '星占い'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ 星座相性：究極の恋愛マッチングガイド2026',
                excerpt: 'あなたと最も相性の良い星座を見つけましょう。',
                category: '恋愛と人間関係'
            },
            'birth-chart-reading-explained': {
                title: '🔮 出生図の読み方：ホロスコープの理解方法',
                excerpt: 'あなたの出生図を読み解く方法を学びましょう。',
                category: '占星術の基礎'
            },
            'weekly-horoscope-predictions': {
                title: '📅 週間星占い：今週の星の予測',
                excerpt: 'すべての星座の週間星占いを取得しましょう。',
                category: '星占い'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 月間星占い2025年1月：全星座の予測',
                excerpt: '2025年1月の完全な月間星占い。',
                category: '星占い'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 恋愛星占い2026：各星座の恋愛予測',
                excerpt: '愛はあなたの星に書かれていますか？',
                category: '恋愛と人間関係'
            }
        },
        ui: {
            blogTitle: '毎日の星占いと占星術ブログ',
            blogSubtitle: '正確な星占いと占星術の洞察のための信頼できる情報源',
            readArticle: '記事を読む',
            readMore: '続きを読む →',
            featured: '注目'
        }
    },
    ko: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ 오늘의 운세 2026: 별자리 예측 완벽 가이드',
                excerpt: '오늘 별들이 당신에게 무엇을 준비했는지 알아보세요.',
                category: '운세'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ 별자리 궁합: 최고의 연애 매칭 가이드 2026',
                excerpt: '어떤 별자리가 당신과 가장 잘 맞는지 알아보세요.',
                category: '사랑과 관계'
            },
            'birth-chart-reading-explained': {
                title: '🔮 출생 차트 읽기: 네이탈 차트 이해하기',
                excerpt: '출생 차트를 읽고 해석하는 방법을 배우세요.',
                category: '점성술 기초'
            },
            'weekly-horoscope-predictions': {
                title: '📅 주간 운세: 이번 주 별들의 예측',
                excerpt: '모든 별자리의 주간 운세를 확인하세요.',
                category: '운세'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 월간 운세 2025년 1월: 모든 별자리 예측',
                excerpt: '2025년 1월의 완전한 월간 운세.',
                category: '운세'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 연애 운세 2026: 각 별자리의 관계 예측',
                excerpt: '사랑이 당신의 별에 쓰여 있나요?',
                category: '사랑과 관계'
            }
        },
        ui: {
            blogTitle: '오늘의 운세 & 점성술 블로그',
            blogSubtitle: '정확한 운세와 점성술 통찰력을 위한 신뢰할 수 있는 소스',
            readArticle: '기사 읽기',
            readMore: '더 읽기 →',
            featured: '추천'
        }
    },
    zh: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ 每日星座运势2026：星座预测完全指南',
                excerpt: '探索今天星星为您准备了什么。',
                category: '星座运势'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ 星座配对：终极爱情匹配指南2026',
                excerpt: '了解哪些星座与您最匹配。',
                category: '爱情与关系'
            },
            'birth-chart-reading-explained': {
                title: '🔮 出生星图解读：如何理解您的本命盘',
                excerpt: '学习如何阅读和解释您的出生星图。',
                category: '占星基础'
            },
            'weekly-horoscope-predictions': {
                title: '📅 每周星座运势：本周星星的预测',
                excerpt: '获取所有星座的每周运势。',
                category: '星座运势'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 2025年1月星座运势：所有星座预测',
                excerpt: '2025年1月的完整月度运势。',
                category: '星座运势'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 爱情星座运势2026：每个星座的感情预测',
                excerpt: '爱情写在您的星星里吗？',
                category: '爱情与关系'
            }
        },
        ui: {
            blogTitle: '每日星座运势与占星博客',
            blogSubtitle: '准确星座运势和占星洞察的可靠来源',
            readArticle: '阅读文章',
            readMore: '阅读更多 →',
            featured: '精选'
        }
    },
    ru: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Ежедневный гороскоп 2026: Полное руководство по прогнозам',
                excerpt: 'Узнайте, что звёзды приготовили для вас сегодня.',
                category: 'Гороскопы'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Совместимость знаков: Полный гид по любовной совместимости 2026',
                excerpt: 'Узнайте, какие знаки наиболее совместимы с вашим.',
                category: 'Любовь и отношения'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Чтение натальной карты: Как понять свой гороскоп рождения',
                excerpt: 'Научитесь читать и интерпретировать свою натальную карту.',
                category: 'Основы астрологии'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Еженедельный гороскоп: Что предсказывают звёзды на эту неделю',
                excerpt: 'Получите еженедельный гороскоп для всех знаков.',
                category: 'Гороскопы'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Месячный гороскоп январь 2025: Прогнозы для всех знаков',
                excerpt: 'Ваш полный месячный гороскоп на январь 2025.',
                category: 'Гороскопы'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Любовный гороскоп 2026: Прогнозы отношений для каждого знака',
                excerpt: 'Написана ли любовь в ваших звёздах?',
                category: 'Любовь и отношения'
            }
        },
        ui: {
            blogTitle: 'Ежедневный гороскоп и блог астрологии',
            blogSubtitle: 'Ваш надёжный источник точных гороскопов и астрологических прогнозов',
            readArticle: 'Читать статью',
            readMore: 'Читать далее →',
            featured: 'Рекомендуемое'
        }
    },
    nl: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Dagelijkse Horoscoop 2026: Complete Gids voor Uw Sterrenbeeld',
                excerpt: 'Ontdek wat de sterren vandaag voor u in petto hebben.',
                category: 'Horoscopen'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Sterrenbeeld Compatibiliteit: De Ultieme Liefdesgids 2026',
                excerpt: 'Ontdek welke sterrenbeelden het beste bij u passen.',
                category: 'Liefde & Relaties'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Geboortehoroscoop: Hoe U Uw Natal Chart Begrijpt',
                excerpt: 'Leer hoe u uw geboortehoroscoop leest en interpreteert.',
                category: 'Astrologie Basis'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Weekhoroscoop: Wat de Sterren Deze Week Voorspellen',
                excerpt: 'Ontvang uw weekhoroscoop voor alle sterrenbeelden.',
                category: 'Horoscopen'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Maandhoroscoop Januari 2025: Voorspellingen voor Alle Tekens',
                excerpt: 'Uw complete maandhoroscoop voor januari 2025.',
                category: 'Horoscopen'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Liefdeshoroscoop 2026: Relatievoorspellingen voor Elk Teken',
                excerpt: 'Staat liefde in uw sterren geschreven?',
                category: 'Liefde & Relaties'
            }
        },
        ui: {
            blogTitle: 'Dagelijkse Horoscoop & Astrologie Blog',
            blogSubtitle: 'Uw betrouwbare bron voor nauwkeurige horoscopen',
            readArticle: 'Lees Artikel',
            readMore: 'Lees meer →',
            featured: 'Uitgelicht'
        }
    },
    pl: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Horoskop Dzienny 2026: Kompletny Przewodnik po Przepowiedniach',
                excerpt: 'Odkryj, co gwiazdy mają dla Ciebie dzisiaj.',
                category: 'Horoskopy'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatybilność Znaków Zodiaku: Przewodnik Miłosny 2026',
                excerpt: 'Dowiedz się, które znaki zodiaku najbardziej do Ciebie pasują.',
                category: 'Miłość i Związki'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Czytanie Horoskopu Urodzeniowego: Jak Zrozumieć Swój Horoskop',
                excerpt: 'Naucz się czytać i interpretować swój horoskop urodzeniowy.',
                category: 'Podstawy Astrologii'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Horoskop Tygodniowy: Co Gwiazdy Przewidują Na Ten Tydzień',
                excerpt: 'Otrzymaj swój tygodniowy horoskop dla wszystkich znaków.',
                category: 'Horoskopy'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Horoskop Miesięczny Styczeń 2025: Przepowiednie dla Wszystkich',
                excerpt: 'Twój kompletny horoskop miesięczny na styczeń 2025.',
                category: 'Horoskopy'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horoskop Miłosny 2026: Przepowiednie Związkowe dla Każdego',
                excerpt: 'Czy miłość jest zapisana w Twoich gwiazdach?',
                category: 'Miłość i Związki'
            }
        },
        ui: {
            blogTitle: 'Horoskop Dzienny i Blog Astrologiczny',
            blogSubtitle: 'Twoje zaufane źródło dokładnych horoskopów',
            readArticle: 'Czytaj Artykuł',
            readMore: 'Czytaj więcej →',
            featured: 'Polecane'
        }
    },
    hu: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Napi Horoszkóp 2026: Teljes Útmutató a Csillagjegy Jóslatokhoz',
                excerpt: 'Fedezze fel, mit tartogatnak ma a csillagok.',
                category: 'Horoszkópok'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Csillagjegy Kompatibilitás: A Végső Szerelmi Útmutató 2026',
                excerpt: 'Tudja meg, mely csillagjegyek illenek leginkább Önhöz.',
                category: 'Szerelem & Kapcsolatok'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Születési Horoszkóp: Hogyan Értse Meg Natális Térképét',
                excerpt: 'Tanulja meg olvasni és értelmezni születési horoszkópját.',
                category: 'Asztrológia Alapok'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Heti Horoszkóp: Mit Jósolnak a Csillagok Erre a Hétre',
                excerpt: 'Kapja meg heti horoszkópját minden csillagjegyhez.',
                category: 'Horoszkópok'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Havi Horoszkóp 2025 Január: Minden Csillagjegy Jóslata',
                excerpt: 'Teljes havi horoszkópja 2025 januárra.',
                category: 'Horoszkópok'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Szerelmi Horoszkóp 2026: Kapcsolati Jóslatok Minden Jegyhez',
                excerpt: 'A szerelem a csillagaiba van írva?',
                category: 'Szerelem & Kapcsolatok'
            }
        },
        ui: {
            blogTitle: 'Napi Horoszkóp & Asztrológia Blog',
            blogSubtitle: 'Megbízható forrása a pontos horoszkópoknak',
            readArticle: 'Cikk Olvasása',
            readMore: 'Tovább →',
            featured: 'Kiemelt'
        }
    },
    ro: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Horoscop Zilnic 2026: Ghid Complet pentru Predicțiile Tale',
                excerpt: 'Descoperă ce îți rezervă astrele astăzi.',
                category: 'Horoscoape'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilitate Zodiacală: Ghidul Suprem al Iubirii 2026',
                excerpt: 'Află care zodii sunt cele mai compatibile cu a ta.',
                category: 'Dragoste & Relații'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Citirea Hărții Natale: Cum să Înțelegi Horoscopul Natal',
                excerpt: 'Învață să citești și să interpretezi harta ta natală.',
                category: 'Bazele Astrologiei'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Horoscop Săptămânal: Ce Prezic Stelele Săptămâna Aceasta',
                excerpt: 'Primește horoscopul săptămânal pentru toate zodiile.',
                category: 'Horoscoape'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Horoscop Lunar Ianuarie 2025: Predicții pentru Toate Zodiile',
                excerpt: 'Horoscopul tău lunar complet pentru ianuarie 2025.',
                category: 'Horoscoape'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Horoscop Dragoste 2026: Predicții Relaționale pentru Fiecare',
                excerpt: 'Este iubirea scrisă în stelele tale?',
                category: 'Dragoste & Relații'
            }
        },
        ui: {
            blogTitle: 'Horoscop Zilnic & Blog Astrologie',
            blogSubtitle: 'Sursa ta de încredere pentru horoscoape precise',
            readArticle: 'Citește Articolul',
            readMore: 'Citește mai mult →',
            featured: 'Recomandat'
        }
    },
    bg: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Дневен Хороскоп 2026: Пълно Ръководство за Прогнозите',
                excerpt: 'Открийте какво ви предричат звездите днес.',
                category: 'Хороскопи'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Съвместимост на Зодии: Пълното Любовно Ръководство 2026',
                excerpt: 'Разберете кои зодии са най-съвместими с вашата.',
                category: 'Любов & Отношения'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Четене на Рождена Карта: Как да Разберете Натала Си',
                excerpt: 'Научете се да четете и тълкувате рождената си карта.',
                category: 'Основи на Астрология'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Седмичен Хороскоп: Какво Предсказват Звездите Тази Седмица',
                excerpt: 'Вземете седмичния си хороскоп за всички зодии.',
                category: 'Хороскопи'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Месечен Хороскоп Януари 2025: Прогнози за Всички Зодии',
                excerpt: 'Вашият пълен месечен хороскоп за януари 2025.',
                category: 'Хороскопи'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Любовен Хороскоп 2026: Прогнози за Връзки за Всяка Зодия',
                excerpt: 'Написана ли е любовта в звездите ви?',
                category: 'Любов & Отношения'
            }
        },
        ui: {
            blogTitle: 'Дневен Хороскоп & Блог по Астрология',
            blogSubtitle: 'Вашият надежден източник за точни хороскопи',
            readArticle: 'Прочети Статията',
            readMore: 'Прочети повече →',
            featured: 'Препоръчано'
        }
    },
    hr: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Dnevni Horoskop 2026: Potpuni Vodič za Vaša Predviđanja',
                excerpt: 'Otkrijte što vam zvijezde danas donose.',
                category: 'Horoskopi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatibilnost Horoskopskih Znakova: Vodič za Ljubav 2026',
                excerpt: 'Saznajte koji su znakovi najkompatibilniji s vašim.',
                category: 'Ljubav & Veze'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Čitanje Natalne Karte: Kako Razumjeti Svoj Horoskop',
                excerpt: 'Naučite čitati i tumačiti svoju natalnu kartu.',
                category: 'Osnove Astrologije'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Tjedni Horoskop: Što Zvijezde Predviđaju Ovaj Tjedan',
                excerpt: 'Dobijte svoj tjedni horoskop za sve znakove.',
                category: 'Horoskopi'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Mjesečni Horoskop Siječanj 2025: Predviđanja za Sve Znakove',
                excerpt: 'Vaš potpuni mjesečni horoskop za siječanj 2025.',
                category: 'Horoskopi'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Ljubavni Horoskop 2026: Predviđanja Veza za Svaki Znak',
                excerpt: 'Je li ljubav zapisana u vašim zvijezdama?',
                category: 'Ljubav & Veze'
            }
        },
        ui: {
            blogTitle: 'Dnevni Horoskop & Blog o Astrologiji',
            blogSubtitle: 'Vaš pouzdani izvor za točne horoskope',
            readArticle: 'Pročitaj Članak',
            readMore: 'Pročitaj više →',
            featured: 'Istaknuto'
        }
    },
    sl: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Dnevni Horoskop 2026: Popoln Vodnik za Vaša Napovedovanja',
                excerpt: 'Odkrijte, kaj vam danes prinašajo zvezde.',
                category: 'Horoskopi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Združljivost Zodiaka: Ultimativni Ljubezenski Vodnik 2026',
                excerpt: 'Ugotovite, katera znamenja so z vami najbolj združljiva.',
                category: 'Ljubezen & Odnosi'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Branje Natalne Karte: Kako Razumeti Svoj Rojstni Horoskop',
                excerpt: 'Naučite se brati in interpretirati svojo natalno karto.',
                category: 'Osnove Astrologije'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Tedenski Horoskop: Kaj Zvezde Napovedujejo Ta Teden',
                excerpt: 'Pridobite svoj tedenski horoskop za vsa znamenja.',
                category: 'Horoskopi'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Mesečni Horoskop Januar 2025: Napovedi za Vsa Znamenja',
                excerpt: 'Vaš popoln mesečni horoskop za januar 2025.',
                category: 'Horoskopi'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Ljubezenski Horoskop 2026: Napovedi Odnosov za Vsako Znamenje',
                excerpt: 'Je ljubezen zapisana v vaših zvezdah?',
                category: 'Ljubezen & Odnosi'
            }
        },
        ui: {
            blogTitle: 'Dnevni Horoskop & Blog o Astrologiji',
            blogSubtitle: 'Vaš zaupanja vreden vir za natančne horoskope',
            readArticle: 'Preberi Članek',
            readMore: 'Preberi več →',
            featured: 'Izpostavljeno'
        }
    },
    sr: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Dnevni Horoskop 2026: Potpuni Vodič za Vaša Predviđanja',
                excerpt: 'Otkrijte šta vam zvezde danas donose.',
                category: 'Horoskopi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatibilnost Znakova: Ultimativni Ljubavni Vodič 2026',
                excerpt: 'Saznajte koji su znakovi najkompatibilniji s vašim.',
                category: 'Ljubav & Veze'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Čitanje Natalne Karte: Kako da Razumete Svoj Horoskop',
                excerpt: 'Naučite da čitate i tumačite svoju natalnu kartu.',
                category: 'Osnove Astrologije'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Nedeljni Horoskop: Šta Zvezde Predviđaju Ove Nedelje',
                excerpt: 'Dobijte svoj nedeljni horoskop za sve znakove.',
                category: 'Horoskopi'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Mesečni Horoskop Januar 2025: Predviđanja za Sve Znakove',
                excerpt: 'Vaš potpuni mesečni horoskop za januar 2025.',
                category: 'Horoskopi'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Ljubavni Horoskop 2026: Predviđanja Veza za Svaki Znak',
                excerpt: 'Da li je ljubav zapisana u vašim zvezdama?',
                category: 'Ljubav & Veze'
            }
        },
        ui: {
            blogTitle: 'Dnevni Horoskop & Blog o Astrologiji',
            blogSubtitle: 'Vaš pouzdan izvor za tačne horoskope',
            readArticle: 'Pročitaj Članak',
            readMore: 'Pročitaj više →',
            featured: 'Istaknuto'
        }
    },
    uk: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Щоденний Гороскоп 2026: Повний Посібник з Передбачень',
                excerpt: 'Дізнайтесь, що зірки приготували для вас сьогодні.',
                category: 'Гороскопи'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Сумісність Знаків Зодіаку: Повний Любовний Посібник 2026',
                excerpt: 'Дізнайтесь, які знаки найбільш сумісні з вашим.',
                category: 'Кохання та Стосунки'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Читання Натальної Карти: Як Зрозуміти Свій Гороскоп',
                excerpt: 'Навчіться читати та інтерпретувати свою натальну карту.',
                category: 'Основи Астрології'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Тижневий Гороскоп: Що Зірки Передбачають На Цей Тиждень',
                excerpt: 'Отримайте свій тижневий гороскоп для всіх знаків.',
                category: 'Гороскопи'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Місячний Гороскоп Січень 2025: Передбачення для Всіх Знаків',
                excerpt: 'Ваш повний місячний гороскоп на січень 2025.',
                category: 'Гороскопи'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Любовний Гороскоп 2026: Передбачення Стосунків для Кожного',
                excerpt: 'Чи написане кохання у ваших зірках?',
                category: 'Кохання та Стосунки'
            }
        },
        ui: {
            blogTitle: 'Щоденний Гороскоп & Блог Астрології',
            blogSubtitle: 'Ваше надійне джерело точних гороскопів',
            readArticle: 'Читати Статтю',
            readMore: 'Читати далі →',
            featured: 'Рекомендоване'
        }
    },
    el: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Ημερήσιο Ωροσκόπιο 2026: Πλήρης Οδηγός Προβλέψεων',
                excerpt: 'Ανακαλύψτε τι σας επιφυλάσσουν τα άστρα σήμερα.',
                category: 'Ωροσκόπια'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Συμβατότητα Ζωδίων: Ο Απόλυτος Οδηγός Έρωτα 2026',
                excerpt: 'Μάθετε ποια ζώδια ταιριάζουν καλύτερα με το δικό σας.',
                category: 'Έρωτας & Σχέσεις'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Ανάγνωση Γενέθλιου Χάρτη: Πώς να Κατανοήσετε τον Χάρτη Σας',
                excerpt: 'Μάθετε να διαβάζετε τον γενέθλιο χάρτη σας.',
                category: 'Βασική Αστρολογία'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Εβδομαδιαίο Ωροσκόπιο: Τι Προβλέπουν τα Άστρα Αυτή την Εβδομάδα',
                excerpt: 'Λάβετε το εβδομαδιαίο ωροσκόπιό σας για όλα τα ζώδια.',
                category: 'Ωροσκόπια'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Μηνιαίο Ωροσκόπιο Ιανουάριος 2025: Προβλέψεις για Όλα τα Ζώδια',
                excerpt: 'Το πλήρες μηνιαίο ωροσκόπιό σας για τον Ιανουάριο 2025.',
                category: 'Ωροσκόπια'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Ερωτικό Ωροσκόπιο 2026: Προβλέψεις Σχέσεων για Κάθε Ζώδιο',
                excerpt: 'Είναι ο έρωτας γραμμένος στα άστρα σας;',
                category: 'Έρωτας & Σχέσεις'
            }
        },
        ui: {
            blogTitle: 'Ημερήσιο Ωροσκόπιο & Αστρολογικό Blog',
            blogSubtitle: 'Η αξιόπιστη πηγή σας για ακριβή ωροσκόπια',
            readArticle: 'Διαβάστε το Άρθρο',
            readMore: 'Διαβάστε περισσότερα →',
            featured: 'Προτεινόμενο'
        }
    },
    tr: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Günlük Burç Yorumu 2026: Tahminleriniz için Tam Rehber',
                excerpt: 'Yıldızların bugün sizin için neler hazırladığını keşfedin.',
                category: 'Burç Yorumları'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Burç Uyumu: 2026 Aşk Rehberi',
                excerpt: 'Hangi burçların sizinle en uyumlu olduğunu öğrenin.',
                category: 'Aşk & İlişkiler'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Doğum Haritası Okuma: Natal Haritanızı Nasıl Anlarsınız',
                excerpt: 'Doğum haritanızı okumayı ve yorumlamayı öğrenin.',
                category: 'Astroloji Temelleri'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Haftalık Burç Yorumu: Bu Hafta Yıldızlar Ne Diyor',
                excerpt: 'Tüm burçlar için haftalık yorumunuzu alın.',
                category: 'Burç Yorumları'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Aylık Burç Yorumu Ocak 2025: Tüm Burçlar için Tahminler',
                excerpt: 'Ocak 2025 için tam aylık burç yorumunuz.',
                category: 'Burç Yorumları'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Aşk Burcu 2026: Her Burç için İlişki Tahminleri',
                excerpt: 'Aşk yıldızlarınızda yazılı mı?',
                category: 'Aşk & İlişkiler'
            }
        },
        ui: {
            blogTitle: 'Günlük Burç & Astroloji Blogu',
            blogSubtitle: 'Doğru burç yorumları için güvenilir kaynağınız',
            readArticle: 'Makaleyi Oku',
            readMore: 'Devamını oku →',
            featured: 'Öne Çıkan'
        }
    },
    ar: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ الأبراج اليومية 2026: دليلك الشامل للتنبؤات',
                excerpt: 'اكتشف ما تخبئه لك النجوم اليوم.',
                category: 'الأبراج'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ توافق الأبراج: الدليل النهائي للحب 2026',
                excerpt: 'اكتشف الأبراج الأكثر توافقاً معك.',
                category: 'الحب والعلاقات'
            },
            'birth-chart-reading-explained': {
                title: '🔮 قراءة خريطة الميلاد: كيف تفهم خريطتك الفلكية',
                excerpt: 'تعلم كيف تقرأ وتفسر خريطة ميلادك.',
                category: 'أساسيات الفلك'
            },
            'weekly-horoscope-predictions': {
                title: '📅 الأبراج الأسبوعية: ماذا تتنبأ النجوم هذا الأسبوع',
                excerpt: 'احصل على توقعاتك الأسبوعية لجميع الأبراج.',
                category: 'الأبراج'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 الأبراج الشهرية يناير 2025: تنبؤات لجميع الأبراج',
                excerpt: 'توقعاتك الشهرية الكاملة لشهر يناير 2025.',
                category: 'الأبراج'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 أبراج الحب 2026: تنبؤات العلاقات لكل برج',
                excerpt: 'هل الحب مكتوب في نجومك؟',
                category: 'الحب والعلاقات'
            }
        },
        ui: {
            blogTitle: 'الأبراج اليومية ومدونة الفلك',
            blogSubtitle: 'مصدرك الموثوق للأبراج الدقيقة',
            readArticle: 'اقرأ المقال',
            readMore: 'اقرأ المزيد →',
            featured: 'مميز'
        }
    },
    th: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ ดวงรายวัน 2026: คู่มือฉบับสมบูรณ์สำหรับคำทำนาย',
                excerpt: 'ค้นพบสิ่งที่ดวงดาวเตรียมไว้ให้คุณวันนี้',
                category: 'ดูดวง'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ ความเข้ากันของราศี: คู่มือความรักขั้นสูงสุด 2026',
                excerpt: 'ค้นหาว่าราศีใดเข้ากับคุณมากที่สุด',
                category: 'ความรักและความสัมพันธ์'
            },
            'birth-chart-reading-explained': {
                title: '🔮 อ่านแผนที่เกิด: วิธีเข้าใจดวงเกิดของคุณ',
                excerpt: 'เรียนรู้วิธีอ่านและตีความแผนที่ดวงเกิดของคุณ',
                category: 'พื้นฐานโหราศาสตร์'
            },
            'weekly-horoscope-predictions': {
                title: '📅 ดวงรายสัปดาห์: ดาวทำนายอะไรในสัปดาห์นี้',
                excerpt: 'รับดวงรายสัปดาห์สำหรับทุกราศี',
                category: 'ดูดวง'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 ดวงรายเดือน มกราคม 2025: คำทำนายสำหรับทุกราศี',
                excerpt: 'ดวงรายเดือนฉบับสมบูรณ์สำหรับมกราคม 2025',
                category: 'ดูดวง'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 ดวงความรัก 2026: คำทำนายความสัมพันธ์สำหรับทุกราศี',
                excerpt: 'ความรักถูกเขียนไว้ในดวงดาวของคุณหรือไม่?',
                category: 'ความรักและความสัมพันธ์'
            }
        },
        ui: {
            blogTitle: 'ดวงรายวันและบล็อกโหราศาสตร์',
            blogSubtitle: 'แหล่งข้อมูลที่คุณไว้วางใจสำหรับดวงที่แม่นยำ',
            readArticle: 'อ่านบทความ',
            readMore: 'อ่านเพิ่มเติม →',
            featured: 'แนะนำ'
        }
    },
    vi: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Tử Vi Hàng Ngày 2026: Hướng Dẫn Đầy Đủ Về Dự Đoán',
                excerpt: 'Khám phá những gì các vì sao dành cho bạn hôm nay.',
                category: 'Tử Vi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Tương Hợp Cung Hoàng Đạo: Hướng Dẫn Tình Yêu 2026',
                excerpt: 'Tìm hiểu cung hoàng đạo nào hợp với bạn nhất.',
                category: 'Tình Yêu & Quan Hệ'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Đọc Bản Đồ Sao: Cách Hiểu Lá Số Của Bạn',
                excerpt: 'Học cách đọc và diễn giải bản đồ sao của bạn.',
                category: 'Cơ Bản Chiêm Tinh'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Tử Vi Tuần: Các Vì Sao Dự Đoán Gì Tuần Này',
                excerpt: 'Nhận tử vi tuần của bạn cho tất cả các cung.',
                category: 'Tử Vi'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Tử Vi Tháng 1/2025: Dự Đoán Cho Tất Cả Các Cung',
                excerpt: 'Tử vi tháng đầy đủ của bạn cho tháng 1/2025.',
                category: 'Tử Vi'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Tử Vi Tình Yêu 2026: Dự Đoán Quan Hệ Cho Mọi Cung',
                excerpt: 'Tình yêu có được viết trong các vì sao của bạn?',
                category: 'Tình Yêu & Quan Hệ'
            }
        },
        ui: {
            blogTitle: 'Tử Vi Hàng Ngày & Blog Chiêm Tinh',
            blogSubtitle: 'Nguồn đáng tin cậy cho tử vi chính xác',
            readArticle: 'Đọc Bài Viết',
            readMore: 'Đọc thêm →',
            featured: 'Nổi Bật'
        }
    },
    id: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Ramalan Zodiak Harian 2026: Panduan Lengkap Prediksi Anda',
                excerpt: 'Temukan apa yang bintang-bintang siapkan untuk Anda hari ini.',
                category: 'Ramalan'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kecocokan Zodiak: Panduan Cinta Terbaik 2026',
                excerpt: 'Cari tahu zodiak mana yang paling cocok dengan Anda.',
                category: 'Cinta & Hubungan'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Membaca Bagan Kelahiran: Cara Memahami Natal Chart Anda',
                excerpt: 'Pelajari cara membaca dan menafsirkan bagan kelahiran Anda.',
                category: 'Dasar Astrologi'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Ramalan Mingguan: Apa yang Diprediksi Bintang Minggu Ini',
                excerpt: 'Dapatkan ramalan mingguan Anda untuk semua zodiak.',
                category: 'Ramalan'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Ramalan Bulanan Januari 2025: Prediksi untuk Semua Zodiak',
                excerpt: 'Ramalan bulanan lengkap Anda untuk Januari 2025.',
                category: 'Ramalan'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Ramalan Cinta 2026: Prediksi Hubungan untuk Setiap Zodiak',
                excerpt: 'Apakah cinta tertulis di bintang-bintang Anda?',
                category: 'Cinta & Hubungan'
            }
        },
        ui: {
            blogTitle: 'Ramalan Harian & Blog Astrologi',
            blogSubtitle: 'Sumber terpercaya untuk ramalan akurat',
            readArticle: 'Baca Artikel',
            readMore: 'Baca selengkapnya →',
            featured: 'Unggulan'
        }
    },
    sv: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Dagligt Horoskop 2026: Komplett Guide till Dina Förutsägelser',
                excerpt: 'Upptäck vad stjärnorna har i beredskap för dig idag.',
                category: 'Horoskop'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Stjärnteckens Kompatibilitet: Den Ultimata Kärleksguiden 2026',
                excerpt: 'Ta reda på vilka stjärntecken som passar bäst med ditt.',
                category: 'Kärlek & Relationer'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Födelsehoroskop: Hur du Förstår din Natalkarta',
                excerpt: 'Lär dig läsa och tolka ditt födelsehoroskop.',
                category: 'Astrologi Grunder'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Veckohoroskop: Vad Stjärnorna Förutspår Denna Vecka',
                excerpt: 'Få ditt veckohoroskop för alla stjärntecken.',
                category: 'Horoskop'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Månadshoroskop Januari 2025: Förutsägelser för Alla Tecken',
                excerpt: 'Ditt kompletta månadshoroskop för januari 2025.',
                category: 'Horoskop'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Kärlekshoroskop 2026: Relationsprognoser för Varje Tecken',
                excerpt: 'Är kärleken skriven i dina stjärnor?',
                category: 'Kärlek & Relationer'
            }
        },
        ui: {
            blogTitle: 'Dagligt Horoskop & Astrologiblogg',
            blogSubtitle: 'Din pålitliga källa för exakta horoskop',
            readArticle: 'Läs Artikeln',
            readMore: 'Läs mer →',
            featured: 'Utvalt'
        }
    },
    da: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Dagligt Horoskop 2026: Komplet Guide til Dine Forudsigelser',
                excerpt: 'Opdag hvad stjernerne har i vente for dig i dag.',
                category: 'Horoskoper'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Stjernetegns Kompatibilitet: Den Ultimative Kærlighedsguide 2026',
                excerpt: 'Find ud af hvilke stjernetegn der passer bedst til dit.',
                category: 'Kærlighed & Forhold'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Fødselshoroskop: Sådan Forstår du dit Natal Chart',
                excerpt: 'Lær at læse og fortolke dit fødselshoroskop.',
                category: 'Astrologi Grundlæggende'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Ugehoroskop: Hvad Stjernerne Forudsiger Denne Uge',
                excerpt: 'Få dit ugehoroskop for alle stjernetegn.',
                category: 'Horoskoper'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Månedshoroskop Januar 2025: Forudsigelser for Alle Tegn',
                excerpt: 'Dit komplette månedshoroskop for januar 2025.',
                category: 'Horoskoper'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Kærlighedshoroskop 2026: Forholdsprognoser for Hvert Tegn',
                excerpt: 'Er kærlighed skrevet i dine stjerner?',
                category: 'Kærlighed & Forhold'
            }
        },
        ui: {
            blogTitle: 'Dagligt Horoskop & Astrologiblog',
            blogSubtitle: 'Din pålidelige kilde til præcise horoskoper',
            readArticle: 'Læs Artikel',
            readMore: 'Læs mere →',
            featured: 'Udvalgt'
        }
    },
    no: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Daglig Horoskop 2026: Komplett Guide til Dine Spådommer',
                excerpt: 'Oppdag hva stjernene har i vente for deg i dag.',
                category: 'Horoskoper'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Stjernetegnenes Kompatibilitet: Den Ultimate Kjærlighetsguide 2026',
                excerpt: 'Finn ut hvilke stjernetegn som passer best med ditt.',
                category: 'Kjærlighet & Forhold'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Fødselshoroskop: Hvordan Forstå din Natalkart',
                excerpt: 'Lær å lese og tolke ditt fødselshoroskop.',
                category: 'Astrologi Grunnleggende'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Ukehoroskop: Hva Stjernene Spår Denne Uken',
                excerpt: 'Få ditt ukehoroskop for alle stjernetegn.',
                category: 'Horoskoper'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Månedshoroskop Januar 2025: Spådommer for Alle Tegn',
                excerpt: 'Ditt komplette månedshoroskop for januar 2025.',
                category: 'Horoskoper'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Kjærlighetshoroskop 2026: Forholdsprognoser for Hvert Tegn',
                excerpt: 'Er kjærlighet skrevet i stjernene dine?',
                category: 'Kjærlighet & Forhold'
            }
        },
        ui: {
            blogTitle: 'Daglig Horoskop & Astrologiblogg',
            blogSubtitle: 'Din pålitelige kilde for nøyaktige horoskoper',
            readArticle: 'Les Artikkel',
            readMore: 'Les mer →',
            featured: 'Utvalgt'
        }
    },
    fi: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Päivittäinen Horoskooppi 2026: Täydellinen Opas Ennusteisiin',
                excerpt: 'Löydä mitä tähdet ovat varanneet sinulle tänään.',
                category: 'Horoskooppi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Horoskooppien Yhteensopivuus: Lopullinen Rakkausopas 2026',
                excerpt: 'Selvitä mitkä horoskooppimerkit sopivat parhaiten sinun kanssasi.',
                category: 'Rakkaus & Suhteet'
            },
            'birth-chart-reading-explained': {
                title: '🔮 Syntymäkartan Lukeminen: Miten Ymmärrät Syntymäkarttasi',
                excerpt: 'Opi lukemaan ja tulkitsemaan syntymäkarttaasi.',
                category: 'Astrologian Perusteet'
            },
            'weekly-horoscope-predictions': {
                title: '📅 Viikkohoroskooppi: Mitä Tähdet Ennustavat Tälle Viikolle',
                excerpt: 'Saa viikkohoroskooppisi kaikille horoskooppimerkeille.',
                category: 'Horoskooppi'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 Kuukausihoroskooppi Tammikuu 2025: Ennusteet Kaikille Merkeille',
                excerpt: 'Täydellinen kuukausihoroskooppisi tammikuulle 2025.',
                category: 'Horoskooppi'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 Rakkaushoroskooppi 2026: Suhde-ennusteet Jokaiselle Merkille',
                excerpt: 'Onko rakkaus kirjoitettu tähtesi?',
                category: 'Rakkaus & Suhteet'
            }
        },
        ui: {
            blogTitle: 'Päivittäinen Horoskooppi & Astrologiablogi',
            blogSubtitle: 'Luotettava lähteesi tarkoille horoskoopille',
            readArticle: 'Lue Artikkeli',
            readMore: 'Lue lisää →',
            featured: 'Suositeltu'
        }
    },
    he: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ הורוסקופ יומי 2026: מדריך מלא לתחזיות שלך',
                excerpt: 'גלה מה הכוכבים מכינים לך היום.',
                category: 'הורוסקופים'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ התאמת מזלות: המדריך האולטימטיבי לאהבה 2026',
                excerpt: 'גלה אילו מזלות הכי מתאימים אליך.',
                category: 'אהבה ויחסים'
            },
            'birth-chart-reading-explained': {
                title: '🔮 קריאת מפת לידה: איך להבין את המפה שלך',
                excerpt: 'למד לקרוא ולפרש את מפת הלידה שלך.',
                category: 'יסודות האסטרולוגיה'
            },
            'weekly-horoscope-predictions': {
                title: '📅 הורוסקופ שבועי: מה הכוכבים מנבאים השבוע',
                excerpt: 'קבל את ההורוסקופ השבועי שלך לכל המזלות.',
                category: 'הורוסקופים'
            },
            'monthly-horoscope-january-2025': {
                title: '🌙 הורוסקופ חודשי ינואר 2025: תחזיות לכל המזלות',
                excerpt: 'ההורוסקופ החודשי המלא שלך לינואר 2025.',
                category: 'הורוסקופים'
            },
            'love-horoscope-relationship-advice': {
                title: '💕 הורוסקופ אהבה 2026: תחזיות זוגיות לכל מזל',
                excerpt: 'האם האהבה כתובה בכוכבים שלך?',
                category: 'אהבה ויחסים'
            }
        },
        ui: {
            blogTitle: 'הורוסקופ יומי ובלוג אסטרולוגיה',
            blogSubtitle: 'המקור האמין שלך להורוסקופים מדויקים',
            readArticle: 'קרא מאמר',
            readMore: 'קרא עוד →',
            featured: 'מומלץ'
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


