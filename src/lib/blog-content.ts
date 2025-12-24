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
    },
    it: {
        posts: {
            'daily-horoscope-guide': {
                title: '⭐ Oroscopo del giorno 2024: Guida completa alle previsioni zodiacali',
                excerpt: 'Scopri cosa ti riservano le stelle oggi.',
                category: 'Oroscopi'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilità segni zodiacali: La guida definitiva 2024',
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
                title: '💕 Oroscopo dell\'amore 2024: Previsioni per ogni segno',
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
                title: '⭐ Horóscopo do dia 2024: Guia completo das suas previsões',
                excerpt: 'Descubra o que as estrelas reservam para você hoje.',
                category: 'Horóscopos'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Compatibilidade de signos: O guia definitivo 2024',
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
                title: '💕 Horóscopo do amor 2024: Previsões para cada signo',
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
                title: '⭐ Denný horoskop 2024: Kompletný sprievodca vašimi predpoveďami',
                excerpt: 'Zistite, čo pre vás hviezdy dnes pripravili.',
                category: 'Horoskopy'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatibilita znamení: Ultimátny sprievodca láskou 2024',
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
                title: '💕 Horoskop lásky 2024: Vzťahové predpovede pre každé znamenie',
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
                title: '⭐ Denní horoskop 2024: Kompletní průvodce vašimi předpovědmi',
                excerpt: 'Zjistěte, co pro vás hvězdy dnes připravily.',
                category: 'Horoskopy'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Kompatibilita znamení: Ultimátní průvodce láskou 2024',
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
                title: '💕 Horoskop lásky 2024: Vztahové předpovědi pro každé znamení',
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
                title: '⭐ 毎日の星占い2024：星座予測の完全ガイド',
                excerpt: '今日、星があなたに何を用意しているか発見しましょう。',
                category: '星占い'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ 星座相性：究極の恋愛マッチングガイド2024',
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
                title: '💕 恋愛星占い2024：各星座の恋愛予測',
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
                title: '⭐ 오늘의 운세 2024: 별자리 예측 완벽 가이드',
                excerpt: '오늘 별들이 당신에게 무엇을 준비했는지 알아보세요.',
                category: '운세'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ 별자리 궁합: 최고의 연애 매칭 가이드 2024',
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
                title: '💕 연애 운세 2024: 각 별자리의 관계 예측',
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
                title: '⭐ 每日星座运势2024：星座预测完全指南',
                excerpt: '探索今天星星为您准备了什么。',
                category: '星座运势'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ 星座配对：终极爱情匹配指南2024',
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
                title: '💕 爱情星座运势2024：每个星座的感情预测',
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
                title: '⭐ Ежедневный гороскоп 2024: Полное руководство по прогнозам',
                excerpt: 'Узнайте, что звёзды приготовили для вас сегодня.',
                category: 'Гороскопы'
            },
            'zodiac-compatibility-complete-guide': {
                title: '❤️ Совместимость знаков: Полный гид по любовной совместимости 2024',
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
                title: '💕 Любовный гороскоп 2024: Прогнозы отношений для каждого знака',
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

