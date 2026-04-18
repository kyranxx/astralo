import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { generateLegalPDFs } from '../../lib/pdf-generator';
import { generateHoroscopeImage } from '../../lib/png-generator';

// Set max duration for Vercel Serverless Functions to 60 seconds (requires Pro plan, will be 10s on Hobby)
export const maxDuration = 60;

export const POST: APIRoute = async ({ request }) => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = import.meta.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return new Response(JSON.stringify({ error: 'SMTP configuration missing' }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    try {
        const data = await request.json();
        const { email, horoscopeContent, productName, customerName, lang, birthDate, birthPlace, birthTime } = data;

        console.log('📧 Send Email API - Received data:', {
            hasEmail: !!email,
            hasHoroscopeContent: !!horoscopeContent,
            horoscopeLength: horoscopeContent?.length || 0,
            productName,
            customerName,
            lang
        });

        if (!email || !horoscopeContent) {
            console.error('📧 Send Email API - Missing required fields:', { email: !!email, horoscopeContent: !!horoscopeContent });
            return new Response(JSON.stringify({ error: 'Missing required fields', details: { hasEmail: !!email, hasHoroscopeContent: !!horoscopeContent } }), { status: 400 });
        }

        // Expanded translations for all languages
        const translations: Record<string, {
            subject: string;
            greeting: string;
            thank: string;
            horoscopeTitle: string;
            horoscopePdf: string;
            attachedAsPng?: string;
            attached: string;
            attachedDesc: string;
            footer: string;
            copyright: string;
            questions: string;
            legalDocs: string[];
            slogan?: string;
            yourReading?: string;
            preheader?: string;
        }> = {
            en: {
                subject: `Your ${productName} from Astralo ✨`,
                greeting: 'Hello',
                thank: 'Thank you for choosing Astralo. Your unique path among the stars is unfolding, and we have carefully crafted this celestial map to guide you.',
                horoscopeTitle: 'Your Celestial Map',
                horoscopePdf: 'Digital Reading PNG',
                attachedAsPng: 'Attached as high-quality image',
                attached: 'Companion Documents',
                attachedDesc: 'We\'ve also included our official legal documents for your complete peace of mind.',
                footer: 'May your journey be illuminated by the wisdom of the stars.',
                copyright: 'All rights reserved',
                questions: 'Seek guidance? Speak to us at',
                legalDocs: ['📄 Terms of Service', '🔒 Privacy Policy', '↩️ Refund Policy', '🍪 Cookie Policy'],
                slogan: 'Ancient Wisdom • Modern Guidance',
                yourReading: 'Your Celestial Insights',
                preheader: 'The stars have spoken. Your unique celestial guide is ready.',
            },
            sk: {
                subject: `Váš ${productName} od Astralo ✨`,
                greeting: 'Dobrý deň',
                thank: 'Ďakujeme, že ste si vybrali Astralo. Vaša jedinečná cesta medzi hviezdami sa odhaľuje a my sme pre vás starostlivo pripravili túto nebeskú mapu, ktorá vás bude viesť.',
                horoscopeTitle: 'Vaša Nebeská Mapa',
                horoscopePdf: 'Digitálne Čítanie PNG',
                attachedAsPng: 'Priložené ako vysokokvalitný obrázok',
                attached: 'Priložené Dokumenty',
                attachedDesc: 'Pripravili sme pre vás aj oficiálne právne dokumenty pre váš úplný pokoj.',
                footer: 'Nech je vaša cesta osvetlená múdrosťou hviezd.',
                copyright: 'Všetky práva vyhradené',
                questions: 'Hľadáte radu? Napíšte nám na',
                legalDocs: ['📄 Obchodné podmienky', '🔒 Ochrana osobných údajov', '↩️ Podmienky vrátenia', '🍪 Zásady cookies'],
                slogan: 'Staroveká Múdrosť • Moderné Vedenie',
                yourReading: 'Vaše Nebeské Vhľady',
                preheader: 'Hviezdy prehovorili. Váš jedinečný nebeský sprievodca je pripravený.',
            },
            cs: {
                subject: `Váš ${productName} od Astralo ✨`,
                greeting: 'Dobrý den',
                thank: 'Děkujeme, že jste si vybrali Astralo! Váš osobní horoskop byl vytvořen speciálně pro vás.',
                horoscopeTitle: 'Váš Osobní Horoskop',
                horoscopePdf: 'Váš Horoskop PNG',
                attached: 'Přiložené Dokumenty',
                attachedDesc: 'Přiložili jsme také naše právní dokumenty pro vaši informaci.',
                footer: 'Ať vás hvězdy vedou na vaší cestě',
                copyright: 'Všechna práva vyhrazena',
                questions: 'Otázky? Kontaktujte nás na',
                legalDocs: ['📄 Obchodní podmínky', '🔒 Ochrana osobních údajů', '↩️ Podmínky vrácení', '🍪 Cookies'],
                slogan: 'Vaše hvězdy • Váš osud',
                yourReading: 'Vaše čtení',
                preheader: 'Vaše osobní čtení je připraveno',
            },
            de: {
                subject: `Ihr ${productName} von Astralo ✨`,
                greeting: 'Hallo',
                thank: 'Vielen Dank, dass Sie Astralo gewählt haben! Ihr persönliches Horoskop wurde speziell für Sie erstellt.',
                horoscopeTitle: 'Ihr Persönliches Horoskop',
                horoscopePdf: 'Ihr Horoskop PNG',
                attached: 'Angehängte Dokumente',
                attachedDesc: 'Wir haben auch unsere rechtlichen Dokumente für Ihre Referenz beigefügt.',
                footer: 'Mögen die Sterne Sie auf Ihrem Weg leiten',
                copyright: 'Alle Rechte vorbehalten',
                questions: 'Fragen? Kontaktieren Sie uns unter',
                legalDocs: ['📄 Nutzungsbedingungen', '🔒 Datenschutz', '↩️ Rückerstattung', '🍪 Cookies'],
                slogan: 'Ihre Sterne • Ihr Schicksal',
                yourReading: 'Ihre Lesung',
                preheader: 'Ihre persönliche Lesung ist bereit',
            },
            fr: {
                subject: `Votre ${productName} d'Astralo ✨`,
                greeting: 'Bonjour',
                thank: 'Merci d\'avoir choisi Astralo ! Votre horoscope personnel a été créé spécialement pour vous.',
                horoscopeTitle: 'Votre Horoscope Personnel',
                horoscopePdf: 'Votre Horoscope PNG',
                attached: 'Documents Joints',
                attachedDesc: 'Nous avons également joint nos documents légaux pour votre référence.',
                footer: 'Que les étoiles vous guident sur votre chemin',
                copyright: 'Tous droits réservés',
                questions: 'Des questions ? Contactez-nous à',
                legalDocs: ['📄 Conditions générales', '🔒 Confidentialité', '↩️ Remboursement', '🍪 Cookies'],
                slogan: 'Vos Étoiles • Votre Destin',
                yourReading: 'Votre Lecture',
                preheader: 'Votre lecture personnelle est prête',
            },
            es: {
                subject: `Tu ${productName} de Astralo ✨`,
                greeting: 'Hola',
                thank: '¡Gracias por elegir Astralo! Tu horóscopo personal ha sido creado especialmente para ti.',
                horoscopeTitle: 'Tu Horóscopo Personal',
                horoscopePdf: 'Tu Horóscopo PNG',
                attached: 'Documentos Adjuntos',
                attachedDesc: 'También hemos adjuntado nuestros documentos legales para tu referencia.',
                footer: 'Que las estrellas guíen tu camino',
                copyright: 'Todos los derechos reservados',
                questions: '¿Preguntas? Contáctanos en',
                legalDocs: ['📄 Términos de servicio', '🔒 Privacidad', '↩️ Reembolso', '🍪 Cookies'],
                slogan: 'Tus Estrellas • Tu Destino',
                yourReading: 'Tu Lectura',
                preheader: 'Tu lectura personal está lista',
            },
            it: {
                subject: `Il tuo ${productName} da Astralo ✨`,
                greeting: 'Ciao',
                thank: 'Grazie per aver scelto Astralo! Il tuo oroscopo personale è stato creato appositamente per te.',
                horoscopeTitle: 'Il Tuo Oroscopo Personale',
                horoscopePdf: 'Il Tuo Oroscopo PNG',
                attached: 'Documenti Allegati',
                attachedDesc: 'Abbiamo anche allegato i nostri documenti legali per tuo riferimento.',
                footer: 'Che le stelle ti guidino nel tuo cammino',
                copyright: 'Tutti i diritti riservati',
                questions: 'Domande? Contattaci a',
                legalDocs: ['📄 Termini di servizio', '🔒 Privacy', '↩️ Rimborso', '🍪 Cookie'],
                slogan: 'Le Tue Stelle • Il Tuo Destino',
                yourReading: 'La Tua Lettura',
                preheader: 'La tua lettura personale è pronta',
            },
            pt: {
                subject: `Seu ${productName} da Astralo ✨`,
                greeting: 'Olá',
                thank: 'Obrigado por escolher a Astralo! Seu horóscopo pessoal foi criado especialmente para você.',
                horoscopeTitle: 'Seu Horóscopo Pessoal',
                horoscopePdf: 'Seu Horóscopo PNG',
                attached: 'Documentos Anexos',
                attachedDesc: 'Também anexamos nossos documentos legais para sua referência.',
                footer: 'Que as estrelas guiem seu caminho',
                copyright: 'Todos os direitos reservados',
                questions: 'Dúvidas? Entre em contato em',
                legalDocs: ['📄 Termos de serviço', '🔒 Privacidade', '↩️ Reembolso', '🍪 Cookies'],
                slogan: 'Suas Estrelas • Seu Destino',
                yourReading: 'Sua Leitura',
                preheader: 'Sua leitura pessoal está pronta',
            },
            nl: {
                subject: `Uw ${productName} van Astralo ✨`,
                greeting: 'Hallo',
                thank: 'Bedankt dat u voor Astralo heeft gekozen! Uw persoonlijke horoscoop is speciaal voor u gemaakt.',
                horoscopeTitle: 'Uw Persoonlijke Horoscoop',
                horoscopePdf: 'Uw Horoscoop PNG',
                attached: 'Bijgevoegde Documenten',
                attachedDesc: 'We hebben ook onze juridische documenten bijgevoegd voor uw referentie.',
                footer: 'Mogen de sterren u leiden op uw reis',
                copyright: 'Alle rechten voorbehouden',
                questions: 'Vragen? Neem contact op via',
                legalDocs: ['📄 Algemene voorwaarden', '🔒 Privacy', '↩️ Terugbetaling', '🍪 Cookies'],
                slogan: 'Uw Sterren • Uw Lot',
                yourReading: 'Uw Lezing',
                preheader: 'Uw persoonlijke lezing is klaar',
            },
            pl: {
                subject: `Twój ${productName} od Astralo ✨`,
                greeting: 'Cześć',
                thank: 'Dziękujemy za wybór Astralo! Twój osobisty horoskop został stworzony specjalnie dla Ciebie.',
                horoscopeTitle: 'Twój Osobisty Horoskop',
                horoscopePdf: 'Twój Horoskop PNG',
                attached: 'Załączone Dokumenty',
                attachedDesc: 'Załączyliśmy również nasze dokumenty prawne do Twojej wiadomości.',
                footer: 'Niech gwiazdy prowadzą Cię w Twojej podróży',
                copyright: 'Wszelkie prawa zastrzeżone',
                questions: 'Pytania? Skontaktuj się z nami',
                legalDocs: ['📄 Regulamin', '🔒 Prywatność', '↩️ Zwrot', '🍪 Cookies'],
                slogan: 'Twoje Gwiazdy • Twój Los',
                yourReading: 'Twoja Lektura',
                preheader: 'Twoja osobista lektura jest gotowa',
            },
            ru: {
                subject: `Ваш ${productName} от Astralo ✨`,
                greeting: 'Здравствуйте',
                thank: 'Спасибо, что выбрали Astralo! Ваш персональный гороскоп был создан специально для вас.',
                horoscopeTitle: 'Ваш Персональный Гороскоп',
                horoscopePdf: 'Ваш Гороскоп PNG',
                attached: 'Прикрепленные Документы',
                attachedDesc: 'Мы также прикрепили наши юридические документы для вашей информации.',
                footer: 'Пусть звезды ведут вас в вашем путешествии',
                copyright: 'Все права защищены',
                questions: 'Вопросы? Свяжитесь с нами',
                legalDocs: ['📄 Условия использования', '🔒 Конфиденциальность', '↩️ Возврат', '🍪 Cookies'],
                slogan: 'Ваши Звезды • Ваша Судьба',
                yourReading: 'Ваше Чтение',
                preheader: 'Ваше персональное чтение готово',
            },
            ja: {
                subject: `Astraloからの${productName} ✨`,
                greeting: 'こんにちは',
                thank: 'Astraloをお選びいただきありがとうございます！あなた専用のホロスコープを作成しました。',
                horoscopeTitle: 'あなたのパーソナルホロスコープ',
                horoscopePdf: 'ホロスコープ PNG',
                attached: '添付書類',
                attachedDesc: '参考として法的文書も添付しています。',
                footer: '星があなたの旅を導きますように',
                copyright: '全著作権所有',
                questions: 'ご質問は',
                legalDocs: ['📄 利用規約', '🔒 プライバシー', '↩️ 返金', '🍪 Cookie'],
                slogan: 'あなたの星 • あなたの運命',
                yourReading: 'あなたのリーディング',
                preheader: 'あなたの個人的なリーディングが準備できました',
            },
            zh: {
                subject: `来自Astralo的${productName} ✨`,
                greeting: '您好',
                thank: '感谢您选择Astralo！您的个人星座运势已专门为您创建。',
                horoscopeTitle: '您的个人星座运势',
                horoscopePdf: '星座运势 PNG',
                attached: '附件',
                attachedDesc: '我们还附上了我们的法律文件供您参考。',
                footer: '愿星星指引您的旅程',
                copyright: '版权所有',
                questions: '有问题请联系',
                legalDocs: ['📄 服务条款', '🔒 隐私政策', '↩️ 退款政策', '🍪 Cookie政策'],
                slogan: '您的星星 • 您的命运',
                yourReading: '您的解读',
                preheader: '您的个人解读已准备就绪',
            },
            ko: {
                subject: `Astralo의 ${productName} ✨`,
                greeting: '안녕하세요',
                thank: 'Astralo를 선택해 주셔서 감사합니다! 귀하만을 위한 맞춤 운세가 준비되었습니다.',
                horoscopeTitle: '나만의 운세',
                horoscopePdf: '운세 PNG',
                attached: '첨부 문서',
                attachedDesc: '참고용으로 법적 문서도 첨부했습니다.',
                footer: '별이 당신의 여정을 인도하길',
                copyright: '모든 권리 보유',
                questions: '문의',
                legalDocs: ['📄 이용약관', '🔒 개인정보보호', '↩️ 환불정책', '🍪 쿠키정책'],
                slogan: '당신의 별 • 당신의 운명',
                yourReading: '당신의 리딩',
                preheader: '개인 운세가 준비되었습니다',
            },
            sr: {
                subject: `Vaš ${productName} od Astralo ✨`,
                greeting: 'Zdravo',
                thank: 'Hvala što ste izabrali Astralo! Vaš lični horoskop je napravljen posebno za vas.',
                horoscopeTitle: 'Vaš Lični Horoskop',
                horoscopePdf: 'Vaš Horoskop PDF',
                attached: 'Priloženi Dokumenti',
                attachedDesc: 'Takođe smo priložili naše pravne dokumente za vašu referencu.',
                footer: 'Neka vas zvezde vode na vašem putu',
                copyright: 'Sva prava zadržana',
                questions: 'Pitanja? Kontaktirajte nas na',
                legalDocs: ['📄 Uslovi korišćenja', '🔒 Privatnost', '↩️ Povrat', '🍪 Kolačići'],
                slogan: 'Vaše zvezde • Vaša sudbina',
                yourReading: 'Vaše čitanje',
                preheader: 'Vaše lično čitanje je spremno',
            },
            hu: {
                subject: `${productName} az Astralótól ✨`,
                greeting: 'Üdvözöljük',
                thank: 'Köszönjük, hogy az Astralót választotta! Személyre szabott horoszkópja kifejezetten Önnek készült.',
                horoscopeTitle: 'Személyes Horoszkópja',
                horoscopePdf: 'Horoszkóp PDF',
                attached: 'Csatolt Dokumentumok',
                attachedDesc: 'Tájékoztatásul csatoltuk jogi dokumentumainkat is.',
                footer: 'Vezéreljenek a csillagok az útján',
                copyright: 'Minden jog fenntartva',
                questions: 'Kérdése van? Írjon nekünk',
                legalDocs: ['📄 Felhasználási feltételek', '🔒 Adatvédelem', '↩️ Visszatérítés', '🍪 Sütik'],
                slogan: 'Az Ön csillagai • Az Ön sorsa',
                yourReading: 'Az Ön olvasata',
                preheader: 'A személyes elemzése elkészült',
            },
            ro: {
                subject: `${productName} de la Astralo ✨`,
                greeting: 'Bună ziua',
                thank: 'Vă mulțumim că ați ales Astralo! Horoscopul dumneavoastră personal a fost creat special pentru dumneavoastră.',
                horoscopeTitle: 'Horoscopul Dumneavoastră Personal',
                horoscopePdf: 'Horoscop PDF',
                attached: 'Documente Atașate',
                attachedDesc: 'Am atașat și documentele noastre legale pentru referință.',
                footer: 'Fie ca stelele să vă ghideze pe drumul vostru',
                copyright: 'Toate drepturile rezervate',
                questions: 'Întrebări? Contactați-ne la',
                legalDocs: ['📄 Termeni și condiții', '🔒 Confidențialitate', '↩️ Rambursare', '🍪 Cookie-uri'],
                slogan: 'Stelele Tale • Destinul Tău',
                yourReading: 'Citirea Ta',
                preheader: 'Analiza ta personală este gata',
            },
            bg: {
                subject: `Вашият ${productName} от Astralo ✨`,
                greeting: 'Здравейте',
                thank: 'Благодарим ви, че избрахте Astralo! Вашият личен хороскоп беше създаден специално за вас.',
                horoscopeTitle: 'Вашият Личен Хороскоп',
                horoscopePdf: 'Хороскоп PDF',
                attached: 'Прикачени Документи',
                attachedDesc: 'Също така прикачихме нашите правни документи за ваша справка.',
                footer: 'Нека звездите ви водят по пътя',
                copyright: 'Всички права запазени',
                questions: 'Въпроси? Свържете се с нас на',
                legalDocs: ['📄 Условия за ползване', '🔒 Поверителност', '↩️ Възстановяване', '🍪 Бисквитки'],
                slogan: 'Вашите звезди • Вашата съдба',
                yourReading: 'Вашият хороскоп',
                preheader: 'Вашият личен хороскоп е готов',
            },
            uk: {
                subject: `Ваш ${productName} від Astralo ✨`,
                greeting: 'Вітаємо',
                thank: 'Дякуємо, що обрали Astralo! Ваш персональний гороскоп створено спеціально для вас.',
                horoscopeTitle: 'Ваш Персональний Гороскоп',
                horoscopePdf: 'Гороскоп PDF',
                attached: 'Прикріплені Документи',
                attachedDesc: 'Ми також прикріпили наші юридичні документи для вашої інформації.',
                footer: 'Нехай зірки ведуть вас у вашій подорожі',
                copyright: 'Усі права захищено',
                questions: 'Питання? Зв\'яжіться з нами',
                legalDocs: ['📄 Умови використання', '🔒 Конфіденційність', '↩️ Повернення', '🍪 Cookies'],
                slogan: 'Ваші зірки • Ваша доля',
                yourReading: 'Ваше читання',
                preheader: 'Ваше персональне читання готове',
            },
            tr: {
                subject: `Astralo'dan ${productName}'nuz ✨`,
                greeting: 'Merhaba',
                thank: 'Astralo\'yu tercih ettiğiniz için teşekkürler! Kişisel burcunuz özellikle sizin için hazırlandı.',
                horoscopeTitle: 'Kişisel Burcunuz',
                horoscopePdf: 'Burç PNG',
                attached: 'Ekli Belgeler',
                attachedDesc: 'Referansınız için yasal belgelerimizi de ekledik.',
                footer: 'Yıldızlar yolunuzu aydınlatsın',
                copyright: 'Tüm hakları saklıdır',
                questions: 'Sorularınız için',
                legalDocs: ['📄 Kullanım şartları', '🔒 Gizlilik', '↩️ İade', '🍪 Çerezler'],
                slogan: 'Yıldızlarınız • Kaderiniz',
                yourReading: 'Okumanız',
                preheader: 'Kişisel okumanız hazır',
            },
            el: {
                subject: `Το ${productName} σας από το Astralo ✨`,
                greeting: 'Γεια σας',
                thank: 'Ευχαριστούμε που επιλέξατε το Astralo! Το προσωπικό σας ωροσκόπιο δημιουργήθηκε ειδικά για εσάς.',
                horoscopeTitle: 'Το Προσωπικό σας Ωροσκόπιο',
                horoscopePdf: 'Ωροσκόπιο PNG',
                attached: 'Συνημμένα Έγγραφα',
                attachedDesc: 'Επίσης, επισυνάπτουμε τα νομικά μας έγγραφα για την ενημέρωσή σας.',
                footer: 'Είθε τα άστρα να σας οδηγούν στο ταξίδι σας',
                copyright: 'Με επιφύλαξη παντός δικαιώματος',
                questions: 'Ερωτήσεις; Επικοινωνήστε μαζί μας',
                legalDocs: ['📄 Όροι χρήσης', '🔒 Απόρρητο', '↩️ Επιστροφή', '🍪 Cookies'],
                slogan: 'Τα Άστρα σας • Η Μοίρα σας',
                yourReading: 'Η Ανάγνωσή σας',
                preheader: 'Η προσωπική σας ανάγνωση είναι έτοιμη',
            },
            th: {
                subject: `${productName} จาก Astralo ✨`,
                greeting: 'สวัสดี',
                thank: 'ขอบคุณที่เลือก Astralo! ดวงส่วนตัวของคุณถูกสร้างขึ้นเป็นพิเศษสำหรับคุณ',
                horoscopeTitle: 'ดวงส่วนตัวของคุณ',
                horoscopePdf: 'ดวง PDF',
                attached: 'เอกสารแนบ',
                attachedDesc: 'เราได้แนบเอกสารทางกฎหมายของเราเพื่อการอ้างอิงด้วย',
                footer: 'ขอให้ดวงดาวนำทางคุณ',
                copyright: 'สงวนลิขสิทธิ์',
                questions: 'มีคำถาม? ติดต่อเราที่',
                legalDocs: ['📄 ข้อกำหนดการใช้งาน', '🔒 ความเป็นส่วนตัว', '↩️ การคืนเงิน', '🍪 คุกกี้'],
                slogan: 'ดวงดาวของคุณ • โชคชะตาของคุณ',
                yourReading: 'คำทำนายของคุณ',
                preheader: 'คำทำนายส่วนตัวของคุณพร้อมแล้ว',
            },
            vi: {
                subject: `${productName} từ Astralo ✨`,
                greeting: 'Xin chào',
                thank: 'Cảm ơn bạn đã chọn Astralo! Tử vi cá nhân của bạn đã được tạo riêng cho bạn.',
                horoscopeTitle: 'Tử Vi Cá Nhân Của Bạn',
                horoscopePdf: 'Tử Vi PDF',
                attached: 'Tài Liệu Đính Kèm',
                attachedDesc: 'Chúng tôi cũng đã đính kèm các tài liệu pháp lý để bạn tham khảo.',
                footer: 'Mong các vì sao dẫn lối cho bạn',
                copyright: 'Đã đăng ký bản quyền',
                questions: 'Câu hỏi? Liên hệ chúng tôi tại',
                legalDocs: ['📄 Điều khoản dịch vụ', '🔒 Quyền riêng tư', '↩️ Hoàn tiền', '🍪 Cookie'],
                slogan: 'Ngôi sao của bạn • Định mệnh của bạn',
                yourReading: 'Bài luận của bạn',
                preheader: 'Bài luận cá nhân của bạn đã sẵn sàng',
            },
            bn: {
                subject: `Astralo থেকে আপনার ${productName} ✨`,
                greeting: 'হ্যালো',
                thank: 'Astralo বেছে নেওয়ার জন্য ধন্যবাদ! আপনার ব্যক্তিগত রাশিফল বিশেষভাবে আপনার জন্য তৈরি করা হয়েছে।',
                horoscopeTitle: 'আপনার ব্যক্তিগত রাশিফল',
                horoscopePdf: 'রাশিফল PNG',
                attached: 'সংযুক্ত নথিপত্র',
                attachedDesc: 'আমরা আপনার রেফারেন্সের জন্য আমাদের আইনি নথিও সংযুক্ত করেছি।',
                footer: 'তারারা আপনার যাত্রায় পথ দেখাক',
                copyright: 'সর্বস্বত্ব সংরক্ষিত',
                questions: 'প্রশ্ন? আমাদের সাথে যোগাযোগ করুন',
                legalDocs: ['📄 সেবার শর্তাবলী', '🔒 গোপনীয়তা নীতি', '↩️ ফেরত নীতি', '🍪 কুকি নীতি'],
                slogan: 'আপনার তারা • আপনার ভাগ্য',
                yourReading: 'আপনার পাঠ',
                preheader: 'আপনার ব্যক্তিগত পাঠ প্রস্তুত',
            },
            ar: {
                subject: `${productName} من Astralo ✨`,
                greeting: 'مرحباً',
                thank: 'شكراً لاختيارك Astralo! تم إعداد برجك الشخصي خصيصاً لك.',
                horoscopeTitle: 'برجك الشخصي',
                horoscopePdf: 'ملف PNG للبرج',
                attachedAsPng: 'مرفق كملف صورة',
                attached: 'المستندات المرفقة',
                attachedDesc: 'قمنا أيضاً بإرفاق مستنداتنا القانونية لمرجعك.',
                footer: 'لتهديك النجوم في رحلتك',
                copyright: 'جميع الحقوق محفوظة',
                questions: 'أسئلة؟ تواصل معنا على',
                legalDocs: ['📄 شروط الخدمة', '🔒 سياسة الخصوصية', '↩️ سياسة الاسترداد', '🍪 سياسة ملفات تعريف الارتباط'],
                slogan: 'نجومك • مصيرك',
                yourReading: 'قراءتك',
                preheader: 'قراءتك الشخصية جاهزة',
            },
            hi: {
                subject: `Astralo से आपका ${productName} ✨`,
                greeting: 'नमस्ते',
                thank: 'Astralo चुनने के लिए धन्यवाद! आपकी व्यक्तिगत राशिफल विशेष रूप से आपके लिए तैयार की गई है।',
                horoscopeTitle: 'आपकी व्यक्तिगत राशिफल',
                horoscopePdf: 'राशिफल PNG',
                attached: 'संलग्न दस्तावेज़',
                attachedDesc: 'हमने आपके संदर्भ के लिए हमारे कानूनी दस्तावेज़ भी संलग्न किए हैं।',
                footer: 'तारे आपकी यात्रा में मार्गदर्शन करें',
                copyright: 'सर्वाधिकार सुरक्षित',
                questions: 'प्रश्न? हमसे संपर्क करें',
                legalDocs: ['📄 सेवा की शर्तें', '🔒 गोपनीयता नीति', '↩️ धनवापसी नीति', '🍪 कुकी नीति'],
                slogan: 'आपके सितारे • आपकी किस्मत',
                yourReading: 'आपकी रीडिंग',
                preheader: 'आपकी व्यक्तिगत रीडिंग तैयार है',
            },
            he: {
                subject: `${productName} מ-Astralo ✨`,
                greeting: 'שלום',
                thank: 'תודה שבחרת ב-Astralo! ההורוסקופ האישי שלך הוכן במיוחד עבורך.',
                horoscopeTitle: 'ההורוסקופ האישי שלך',
                horoscopePdf: 'הורוסקופ PNG',
                attachedAsPng: 'מצורף כקובץ תמונה',
                attached: 'מסמכים מצורפים',
                attachedDesc: 'צירפנו גם את המסמכים המשפטיים שלנו לעיונך.',
                footer: 'שהכוכבים ינחו אותך במסע שלך',
                copyright: 'כל הזכויות שמורות',
                questions: 'שאלות? צור קשר',
                legalDocs: ['📄 תנאי שירות', '🔒 מדיניות פרטיות', '↩️ מדיניות החזרים', '🍪 מדיניות עוגיות'],
                slogan: 'הכוכבים שלך • הגורל שלך',
                yourReading: 'הקריאה שלך',
                preheader: 'הקריאה האישית שלך מוכנה',
            },
            sv: {
                subject: `Ditt ${productName} från Astralo ✨`,
                greeting: 'Hej',
                thank: 'Tack för att du valde Astralo! Ditt personliga horoskop har skapats speciellt för dig.',
                horoscopeTitle: 'Ditt Personliga Horoskop',
                horoscopePdf: 'Horoskop PNG',
                attachedAsPng: 'Bifogad som högkvalitativ bild',
                attached: 'Bifogade Dokument',
                attachedDesc: 'Vi har också bifogat våra juridiska dokument för din referens.',
                footer: 'Må stjärnorna leda dig på din resa',
                copyright: 'Alla rättigheter förbehållna',
                questions: 'Frågor? Kontakta oss på',
                legalDocs: ['📄 Användarvillkor', '🔒 Integritetspolicy', '↩️ Återbetalningspolicy', '🍪 Cookiepolicy'],
                slogan: 'Dina Stjärnor • Ditt Öde',
                yourReading: 'Din Läsning',
                preheader: 'Din personliga läsning är klar',
            },
            da: {
                subject: `Dit ${productName} fra Astralo ✨`,
                greeting: 'Hej',
                thank: 'Tak fordi du valgte Astralo! Dit personlige horoskop er blevet skabt specielt til dig.',
                horoscopeTitle: 'Dit Personlige Horoskop',
                horoscopePdf: 'Horoskop PNG',
                attachedAsPng: 'Vedhæftet som billede i høj kvalitet',
                attached: 'Vedhæftede Dokumenter',
                attachedDesc: 'Vi har også vedhæftet vores juridiske dokumenter til din reference.',
                footer: 'Må stjernerne guide dig på din rejse',
                copyright: 'Alle rettigheder forbeholdes',
                questions: 'Spørgsmål? Kontakt os på',
                legalDocs: ['📄 Servicevilkår', '🔒 Privatlivspolitik', '↩️ Refusionspolitik', '🍪 Cookiepolitik'],
                slogan: 'Dine Stjerner • Din Skæbne',
                yourReading: 'Din Læsning',
                preheader: 'Din personlige læsning er klar',
            },
            fi: {
                subject: `${productName} Astralosta ✨`,
                greeting: 'Hei',
                thank: 'Kiitos kun valitsit Astralon! Henkilökohtainen horoskooppisi on luotu erityisesti sinulle.',
                horoscopeTitle: 'Henkilökohtainen Horoskooppisi',
                horoscopePdf: 'Horoskooppi PNG',
                attachedAsPng: 'Liitteenä korkealaatuinen kuva',
                attached: 'Liitetyt Asiakirjat',
                attachedDesc: 'Olemme myös liittäneet oikeudelliset asiakirjamme viitteeksesi.',
                footer: 'Tähdet johdattakoot sinua matkallasi',
                copyright: 'Kaikki oikeudet pidätetään',
                questions: 'Kysymyksiä? Ota yhteyttä',
                legalDocs: ['📄 Käyttöehdot', '🔒 Tietosuojakäytäntö', '↩️ Palautuskäytäntö', '🍪 Evästekäytäntö'],
                slogan: 'Sinun Tähtesi • Sinun Kohtalosi',
                yourReading: 'Lukemisesi',
                preheader: 'Henkilökohtainen lukemisesi on valmis',
            },
            no: {
                subject: `Ditt ${productName} fra Astralo ✨`,
                greeting: 'Hei',
                thank: 'Takk for at du valgte Astralo! Ditt personlige horoskop er laget spesielt for deg.',
                horoscopeTitle: 'Ditt Personlige Horoskop',
                horoscopePdf: 'Horoskop PNG',
                attachedAsPng: 'Vedlagt som høykvalitetsbilde',
                attached: 'Vedlagte Dokumenter',
                attachedDesc: 'Vi har også vedlagt våre juridiske dokumenter for din referanse.',
                footer: 'Må stjernene lede deg på din reise',
                copyright: 'Alle rettigheter reservert',
                questions: 'Spørsmål? Kontakt oss på',
                legalDocs: ['📄 Tjenestevilkår', '🔒 Personvernpolicy', '↩️ Refusjonspolicy', '🍪 Informasjonskapselpolicy'],
                slogan: 'Dine Stjerner • Din Skjebne',
                yourReading: 'Din Lesning',
                preheader: 'Din personlige lesning er klar',
            },
        };

        const t = translations[lang] || translations.en;

        // Format horoscope content for HTML (preserve paragraphs and emojis, remove markdown)
        const formattedHoroscope = horoscopeContent
            .replace(/#{1,6}\s/g, '') // Remove markdown headers
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert bold markdown to HTML
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Convert italic markdown to HTML
            .split('\n\n')
            .filter((p: string) => p.trim())
            .map((p: string) => {
                // Check if this is a special section (lucky number, best time, etc)
                const isSpecialSection = p.match(/^(🍀|📅|💎|⭐|🌟|💰|❤️|💼|🎯)/);
                if (isSpecialSection) {
                    return `
                    <div style="margin: 30px 0; padding: 25px; background-color: #fffaf0; border-top: 2px solid #fbbf24; border-bottom: 2px solid #fbbf24; text-align: center;">
                        <div style="font-family: 'Times New Roman', Georgia, serif; font-size: 20px; line-height: 1.6; color: #92400e; font-style: italic;">
                            ${p.replace(/\n/g, '<br>')}
                        </div>
                    </div>`;
                }
                return `<p style="margin: 0 0 25px 0; font-family: 'Times New Roman', Georgia, serif; font-size: 18px; line-height: 1.8; color: #1f2937;">${p.replace(/\n/g, '<br>')}</p>`;
            })
            .join('\n');

        // Determine RTL direction for Arabic and Hebrew
        const isRTL = ['ar', 'he'].includes(lang);
        const dirAttr = isRTL ? 'dir="rtl"' : 'dir="ltr"';

        const html = `
<!DOCTYPE html>
<html lang="${lang}" ${dirAttr} xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${t.subject}</title>
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if mso]>
        <style>
            * { font-family: Arial, sans-serif !important; }
        </style>
    <![endif]-->
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; }
        * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        div[style*="margin: 16px 0"] { margin: 0 !important; }
        #MessageViewBody, #MessageWebViewDiv { width: 100% !important; }
        table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; }
        table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; }
        img { -ms-interpolation-mode: bicubic; border: 0; }
        a { text-decoration: none; color: #fbbf24; }
        a:hover { color: #f59e0b; }
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; padding: 10px !important; }
            .header-padding { padding: 30px 20px !important; }
            .content-padding { padding: 30px 20px !important; }
            .footer-padding { padding: 30px 20px !important; }
        }
    </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #0f0f23;">
    <center role="article" aria-roledescription="email" lang="${lang}" style="width: 100%; background-color: #0f0f23;">
        <!-- Preheader -->
        <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
            ✨ ${t.horoscopeTitle} - ${productName} | ${t.preheader || 'Your personal reading is ready'}
        </div>

        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!--[if mso]>
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
            <tr><td>
            <![endif]-->

            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                
                <!-- Logo & Header -->
                <tr>
                    <td class="header-padding" style="background-color: #1a1a2e; padding: 40px 30px; text-align: center;">
                        <span style="font-size: 20px; color: #fbbf24; display: block; margin-bottom: 10px;">★</span>
                        <img src="https://astralo.online/ma_symbol_opt_73_3x.png" width="180" height="auto" alt="Astralo" style="display: block; margin: 0 auto;">
                        <p style="margin: 15px 0 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 13px; color: #9ca3af; letter-spacing: 4px; text-transform: uppercase;">
                            ${t.slogan || 'Your Stars • Your Destiny'}
                        </p>
                    </td>
                </tr>

                <!-- Content Card Wrapper -->
                <tr>
                    <td style="background-color: #1a1a2e; padding: 0 15px 40px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                            <tr>
                                <td class="content-padding" style="padding: 45px 40px;" ${dirAttr}>
                                    
                                    <!-- Greeting -->
                                    <h2 style="margin: 0 0 15px 0; font-family: 'Times New Roman', Georgia, serif; font-size: 28px; color: #0f0f23; font-weight: normal; line-height: 1.2; text-align: ${isRTL ? 'right' : 'left'};">
                                        ${t.greeting}${customerName ? `, <span style="color: #7c3aed;">${customerName}</span>` : ''} ✨
                                    </h2>
                                    <p style="margin: 0 0 35px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4b5563; text-align: ${isRTL ? 'right' : 'left'};">
                                        ${t.thank}
                                    </p>

                                    <!-- Reading Box -->
                                    <div style="background: linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%); border-radius: 20px; border-${isRTL ? 'right' : 'left'}: 5px solid #fbbf24; overflow: hidden; margin-bottom: 40px;">
                                        <div style="padding: 30px;" ${dirAttr}>
                                            <div style="margin-bottom: 25px; text-align: ${isRTL ? 'right' : 'left'};">
                                                <span style="background-color: #fbbf24; color: #0f0f23; font-family: Arial, sans-serif; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1.5px;">
                                                    🔮 ${t.yourReading || 'Your Reading'}
                                                </span>
                                            </div>
                                            <div style="font-family: 'Times New Roman', Georgia, serif; font-size: 17px; line-height: 1.8; color: #1f2937; text-align: ${isRTL ? 'right' : 'left'};">
                                                ${formattedHoroscope}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Attachments Section -->
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 20px;">
                                        <tr>
                                            <td style="padding: 30px; text-align: center;">
                                                <div style="margin-bottom: 12px;">
                                                    <span style="font-size: 24px;">📎</span>
                                                </div>
                                                <h3 style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 14px; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 1px;">
                                                    ${t.attached}
                                                </h3>
                                                <p style="margin: 0 0 20px 0; font-family: Arial, sans-serif; font-size: 14px; color: #6b7280;">
                                                    ${t.attachedDesc}
                                                </p>
                                                <div style="margin: 0 -5px;">
                                                    ${t.legalDocs.map(name => `
                                                        <div style="display: inline-block; background-color: #ffffff; padding: 8px 16px; border-radius: 100px; border: 1px solid #d1d5db; font-family: Arial, sans-serif; font-size: 12px; color: #374151; margin: 4px; font-weight: 600;">
                                                            ${name}
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>

                            <!-- Quote / Sign-off -->
                            <tr>
                                <td style="padding: 0 40px 45px;">
                                    <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); border-radius: 20px; padding: 35px; text-align: center; color: #ffffff;">
                                        <p style="margin: 0 0 10px 0; font-size: 24px;">✨</p>
                                        <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 18px; line-height: 1.5; font-style: italic; opacity: 0.95;">
                                            "${t.footer}"
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Contact Info -->
                <tr>
                    <td class="footer-padding" style="padding: 0 30px 40px; text-align: center;">
                        <p style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 14px; color: #9ca3af;">
                            ${t.questions}
                        </p>
                        <a href="mailto:apollotechsro@gmail.com" style="font-family: Arial, sans-serif; font-size: 15px; color: #fbbf24; font-weight: bold;">
                            apollotechsro@gmail.com
                        </a>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background-color: #0a0a1a; padding: 40px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
                        <img src="https://astralo.online/ma_symbol_opt_73_3x.png" width="120" height="auto" alt="Astralo" style="opacity: 0.5; margin-bottom: 25px;">
                        <p style="margin: 0 0 8px 0; font-family: Arial, sans-serif; font-size: 11px; color: #6b7280; letter-spacing: 1px; text-transform: uppercase;">
                            Apollo Tech s.r.o. • Slovakia, European Union
                        </p>
                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 11px; color: #4b5563;">
                            © ${new Date().getFullYear()} Astralo. ${t.copyright}.
                        </p>
                        <div style="margin-top: 25px; font-size: 12px; color: #fbbf24; opacity: 0.5; letter-spacing: 8px;">
                            ★ ☆ ★
                        </div>
                    </td>
                </tr>
            </table>

            <!--[if mso]>
            </td></tr></table>
            <![endif]-->
        </div>
    </center>
</body>
</html>
    `;

        // Get legal PDFs - always in English (legal docs don't need translation, uses small Latin fonts)
        const legalDocs = await generateLegalPDFs('en');

        // Generate horoscope as PNG image(s) - supports multi-page for long content
        // Wrapped in try-catch to ensure email sends even if image generation fails
        let horoscopeImages: { filename: string; content: Buffer }[] = [];
        try {
            horoscopeImages = await generateHoroscopeImage({
                customerName: customerName || 'Customer',
                productName,
                horoscopeContent,
                birthDate: birthDate || '',
                birthPlace: birthPlace || '',
                birthTime: birthTime || '',
                lang,
            });
            console.log(`✅ Generated ${horoscopeImages.length} image(s). Sizes: ${horoscopeImages.map(i => i.content.length + ' bytes').join(', ')}`);
        } catch (imageError: any) {
            console.error('⚠️ Image generation failed, sending email without image:', imageError.message);
            // Continue without image - email will still be sent with the horoscope in HTML body
        }

        // Prepare attachments - horoscope image(s) first (if available), then legal documents
        const attachments = [
            // Horoscope image(s) - may be empty if generation failed
            ...horoscopeImages.map(img => ({
                filename: img.filename,
                content: img.content
            })),
            // Legal documents
            ...legalDocs.map(doc => ({
                filename: doc.filename,
                content: Buffer.from(doc.content)
            }))
        ];

        await transporter.sendMail({
            from: `"Astralo ✨" <${SMTP_USER}>`,
            to: email,
            subject: t.subject,
            html: html,
            attachments
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error: any) {
        console.error('Email sending error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
