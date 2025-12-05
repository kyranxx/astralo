import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { generateLegalPDFs, generateHoroscopePDF } from '../../lib/pdf-generator';

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
    const { email, horoscopeContent, productName, customerName, lang, birthDate, birthPlace, birthTime, productKey } = data;

    if (!email || !horoscopeContent) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Expanded translations for all languages
    const translations: Record<string, {
      subject: string;
      greeting: string;
      thank: string;
      horoscopeTitle: string;
      horoscopePdf: string;
      attached: string;
      attachedDesc: string;
      footer: string;
      copyright: string;
      questions: string;
      legalDocs: string[];
    }> = {
      en: {
        subject: `Your ${productName} from Astralo ✨`,
        greeting: 'Hello',
        thank: 'Thank you for choosing Astralo! Your personal horoscope has been crafted specially for you.',
        horoscopeTitle: 'Your Personal Horoscope',
        horoscopePdf: 'Your Horoscope PDF',
        attached: 'Attached Documents',
        attachedDesc: 'We\'ve also attached our legal documents for your reference.',
        footer: 'May the stars guide you on your journey',
        copyright: 'All rights reserved',
        questions: 'Questions? Contact us at',
        legalDocs: ['📄 Terms of Service', '🔒 Privacy Policy', '↩️ Refund Policy', '🍪 Cookie Policy'],
      },
      sk: {
        subject: `Váš ${productName} od Astralo ✨`,
        greeting: 'Dobrý deň',
        thank: 'Ďakujeme, že ste si vybrali Astralo! Váš osobný horoskop bol vytvorený špeciálne pre vás.',
        horoscopeTitle: 'Váš Osobný Horoskop',
        horoscopePdf: 'Váš Horoskop PDF',
        attached: 'Priložené Dokumenty',
        attachedDesc: 'Priložili sme tiež naše právne dokumenty pre vašu informáciu.',
        footer: 'Nech vás hviezdy vedú na vašej ceste',
        copyright: 'Všetky práva vyhradené',
        questions: 'Otázky? Kontaktujte nás na',
        legalDocs: ['📄 Obchodné podmienky', '🔒 Ochrana osobných údajov', '↩️ Podmienky vrátenia', '🍪 Zásady cookies'],
      },
      cs: {
        subject: `Váš ${productName} od Astralo ✨`,
        greeting: 'Dobrý den',
        thank: 'Děkujeme, že jste si vybrali Astralo! Váš osobní horoskop byl vytvořen speciálně pro vás.',
        horoscopeTitle: 'Váš Osobní Horoskop',
        horoscopePdf: 'Váš Horoskop PDF',
        attached: 'Přiložené Dokumenty',
        attachedDesc: 'Přiložili jsme také naše právní dokumenty pro vaši informaci.',
        footer: 'Ať vás hvězdy vedou na vaší cestě',
        copyright: 'Všechna práva vyhrazena',
        questions: 'Otázky? Kontaktujte nás na',
        legalDocs: ['📄 Terms of Service', '🔒 Privacy Policy', '↩️ Refund Policy', '🍪 Cookie Policy'],
      },
      de: {
        subject: `Ihr ${productName} von Astralo ✨`,
        greeting: 'Hallo',
        thank: 'Vielen Dank, dass Sie Astralo gewählt haben! Ihr persönliches Horoskop wurde speziell für Sie erstellt.',
        horoscopeTitle: 'Ihr Persönliches Horoskop',
        horoscopePdf: 'Ihr Horoskop PDF',
        attached: 'Angehängte Dokumente',
        attachedDesc: 'Wir haben auch unsere rechtlichen Dokumente für Ihre Referenz beigefügt.',
        footer: 'Mögen die Sterne Sie auf Ihrem Weg leiten',
        copyright: 'Alle Rechte vorbehalten',
        questions: 'Fragen? Kontaktieren Sie uns unter',
        legalDocs: ['📄 Nutzungsbedingungen', '🔒 Datenschutz', '↩️ Rückerstattung', '🍪 Cookies'],
      },
      fr: {
        subject: `Votre ${productName} d'Astralo ✨`,
        greeting: 'Bonjour',
        thank: 'Merci d\'avoir choisi Astralo ! Votre horoscope personnel a été créé spécialement pour vous.',
        horoscopeTitle: 'Votre Horoscope Personnel',
        horoscopePdf: 'Votre Horoscope PDF',
        attached: 'Documents Joints',
        attachedDesc: 'Nous avons également joint nos documents légaux pour votre référence.',
        footer: 'Que les étoiles vous guident sur votre chemin',
        copyright: 'Tous droits réservés',
        questions: 'Des questions ? Contactez-nous à',
        legalDocs: ['📄 Conditions générales', '🔒 Confidentialité', '↩️ Remboursement', '🍪 Cookies'],
      },
      es: {
        subject: `Tu ${productName} de Astralo ✨`,
        greeting: 'Hola',
        thank: '¡Gracias por elegir Astralo! Tu horóscopo personal ha sido creado especialmente para ti.',
        horoscopeTitle: 'Tu Horóscopo Personal',
        horoscopePdf: 'Tu Horóscopo PDF',
        attached: 'Documentos Adjuntos',
        attachedDesc: 'También hemos adjuntado nuestros documentos legales para tu referencia.',
        footer: 'Que las estrellas guíen tu camino',
        copyright: 'Todos los derechos reservados',
        questions: '¿Preguntas? Contáctanos en',
        legalDocs: ['📄 Términos de servicio', '🔒 Privacidad', '↩️ Reembolso', '🍪 Cookies'],
      },
      it: {
        subject: `Il tuo ${productName} da Astralo ✨`,
        greeting: 'Ciao',
        thank: 'Grazie per aver scelto Astralo! Il tuo oroscopo personale è stato creato appositamente per te.',
        horoscopeTitle: 'Il Tuo Oroscopo Personale',
        horoscopePdf: 'Il Tuo Oroscopo PDF',
        attached: 'Documenti Allegati',
        attachedDesc: 'Abbiamo anche allegato i nostri documenti legali per tuo riferimento.',
        footer: 'Che le stelle ti guidino nel tuo cammino',
        copyright: 'Tutti i diritti riservati',
        questions: 'Domande? Contattaci a',
        legalDocs: ['📄 Termini di servizio', '🔒 Privacy', '↩️ Rimborso', '🍪 Cookie'],
      },
      pt: {
        subject: `Seu ${productName} da Astralo ✨`,
        greeting: 'Olá',
        thank: 'Obrigado por escolher a Astralo! Seu horóscopo pessoal foi criado especialmente para você.',
        horoscopeTitle: 'Seu Horóscopo Pessoal',
        horoscopePdf: 'Seu Horóscopo PDF',
        attached: 'Documentos Anexos',
        attachedDesc: 'Também anexamos nossos documentos legais para sua referência.',
        footer: 'Que as estrelas guiem seu caminho',
        copyright: 'Todos os direitos reservados',
        questions: 'Dúvidas? Entre em contato em',
        legalDocs: ['📄 Termos de serviço', '🔒 Privacidade', '↩️ Reembolso', '🍪 Cookies'],
      },
      nl: {
        subject: `Uw ${productName} van Astralo ✨`,
        greeting: 'Hallo',
        thank: 'Bedankt dat u voor Astralo heeft gekozen! Uw persoonlijke horoscoop is speciaal voor u gemaakt.',
        horoscopeTitle: 'Uw Persoonlijke Horoscoop',
        horoscopePdf: 'Uw Horoscoop PDF',
        attached: 'Bijgevoegde Documenten',
        attachedDesc: 'We hebben ook onze juridische documenten bijgevoegd voor uw referentie.',
        footer: 'Mogen de sterren u leiden op uw reis',
        copyright: 'Alle rechten voorbehouden',
        questions: 'Vragen? Neem contact op via',
        legalDocs: ['📄 Algemene voorwaarden', '🔒 Privacy', '↩️ Terugbetaling', '🍪 Cookies'],
      },
      pl: {
        subject: `Twój ${productName} od Astralo ✨`,
        greeting: 'Cześć',
        thank: 'Dziękujemy za wybór Astralo! Twój osobisty horoskop został stworzony specjalnie dla Ciebie.',
        horoscopeTitle: 'Twój Osobisty Horoskop',
        horoscopePdf: 'Twój Horoskop PDF',
        attached: 'Załączone Dokumenty',
        attachedDesc: 'Załączyliśmy również nasze dokumenty prawne do Twojej wiadomości.',
        footer: 'Niech gwiazdy prowadzą Cię w Twojej podróży',
        copyright: 'Wszelkie prawa zastrzeżone',
        questions: 'Pytania? Skontaktuj się z nami',
        legalDocs: ['📄 Regulamin', '🔒 Prywatność', '↩️ Zwrot', '🍪 Cookies'],
      },
      ru: {
        subject: `Ваш ${productName} от Astralo ✨`,
        greeting: 'Здравствуйте',
        thank: 'Спасибо, что выбрали Astralo! Ваш персональный гороскоп был создан специально для вас.',
        horoscopeTitle: 'Ваш Персональный Гороскоп',
        horoscopePdf: 'Ваш Гороскоп PDF',
        attached: 'Прикрепленные Документы',
        attachedDesc: 'Мы также прикрепили наши юридические документы для вашей информации.',
        footer: 'Пусть звезды ведут вас в вашем путешествии',
        copyright: 'Все права защищены',
        questions: 'Вопросы? Свяжитесь с нами',
        legalDocs: ['📄 Условия использования', '🔒 Конфиденциальность', '↩️ Возврат', '🍪 Cookies'],
      },
      ja: {
        subject: `Astraloからの${productName} ✨`,
        greeting: 'こんにちは',
        thank: 'Astraloをお選びいただきありがとうございます！あなた専用のホロスコープを作成しました。',
        horoscopeTitle: 'あなたのパーソナルホロスコープ',
        horoscopePdf: 'ホロスコープ PDF',
        attached: '添付書類',
        attachedDesc: '参考として法的文書も添付しています。',
        footer: '星があなたの旅を導きますように',
        copyright: '全著作権所有',
        questions: 'ご質問は',
        legalDocs: ['📄 利用規約', '🔒 プライバシー', '↩️ 返金', '🍪 Cookie'],
      },
      zh: {
        subject: `来自Astralo的${productName} ✨`,
        greeting: '您好',
        thank: '感谢您选择Astralo！您的个人星座运势已专门为您创建。',
        horoscopeTitle: '您的个人星座运势',
        horoscopePdf: '星座运势 PDF',
        attached: '附件',
        attachedDesc: '我们还附上了我们的法律文件供您参考。',
        footer: '愿星星指引您的旅程',
        copyright: '版权所有',
        questions: '有问题请联系',
        legalDocs: ['📄 服务条款', '🔒 隐私政策', '↩️ 退款政策', '🍪 Cookie政策'],
      },
      ko: {
        subject: `Astralo의 ${productName} ✨`,
        greeting: '안녕하세요',
        thank: 'Astralo를 선택해 주셔서 감사합니다! 귀하만을 위한 맞춤 운세가 준비되었습니다.',
        horoscopeTitle: '나만의 운세',
        horoscopePdf: '운세 PDF',
        attached: '첨부 문서',
        attachedDesc: '참고용으로 법적 문서도 첨부했습니다.',
        footer: '별이 당신의 여정을 인도하길',
        copyright: '모든 권리 보유',
        questions: '문의',
        legalDocs: ['📄 이용약관', '🔒 개인정보보호', '↩️ 환불정책', '🍪 쿠키정책'],
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
      },
      tr: {
        subject: `Astralo'dan ${productName}'nuz ✨`,
        greeting: 'Merhaba',
        thank: 'Astralo\'yu tercih ettiğiniz için teşekkürler! Kişisel burcunuz özellikle sizin için hazırlandı.',
        horoscopeTitle: 'Kişisel Burcunuz',
        horoscopePdf: 'Burç PDF',
        attached: 'Ekli Belgeler',
        attachedDesc: 'Referansınız için yasal belgelerimizi de ekledik.',
        footer: 'Yıldızlar yolunuzu aydınlatsın',
        copyright: 'Tüm hakları saklıdır',
        questions: 'Sorularınız için',
        legalDocs: ['📄 Kullanım şartları', '🔒 Gizlilik', '↩️ İade', '🍪 Çerezler'],
      },
      ar: {
        subject: `${productName} من Astralo ✨`,
        greeting: 'مرحباً',
        thank: 'شكراً لاختيارك Astralo! تم إنشاء برجك الشخصي خصيصاً لك.',
        horoscopeTitle: 'برجك الشخصي',
        horoscopePdf: 'البرج PDF',
        attached: 'المستندات المرفقة',
        attachedDesc: 'قمنا أيضاً بإرفاق وثائقنا القانونية للرجوع إليها.',
        footer: 'لتهديك النجوم في رحلتك',
        copyright: 'جميع الحقوق محفوظة',
        questions: 'أسئلة؟ تواصل معنا على',
        legalDocs: ['📄 شروط الخدمة', '🔒 الخصوصية', '↩️ الاسترداد', '🍪 ملفات تعريف الارتباط'],
      },
      hi: {
        subject: `Astralo से आपका ${productName} ✨`,
        greeting: 'नमस्ते',
        thank: 'Astralo को चुनने के लिए धन्यवाद! आपकी व्यक्तिगत राशिफल विशेष रूप से आपके लिए बनाई गई है।',
        horoscopeTitle: 'आपका व्यक्तिगत राशिफल',
        horoscopePdf: 'राशिफल PDF',
        attached: 'संलग्न दस्तावेज',
        attachedDesc: 'हमने आपके संदर्भ के लिए हमारे कानूनी दस्तावेज भी संलग्न किए हैं।',
        footer: 'सितारे आपके मार्ग में आपका मार्गदर्शन करें',
        copyright: 'सर्वाधिकार सुरक्षित',
        questions: 'प्रश्न? हमसे संपर्क करें',
        legalDocs: ['📄 सेवा की शर्तें', '🔒 गोपनीयता', '↩️ वापसी', '🍪 कुकीज़'],
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
          return `<div style="margin: 0 0 16px 0; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); border-radius: 12px; line-height: 1.8; color: #fbbf24; font-weight: 600; font-size: 16px; border: 1px solid rgba(251, 191, 36, 0.3);">${p.replace(/\n/g, '<br>')}</div>`;
        }
        return `<p style="margin: 0 0 16px 0; line-height: 1.9; color: #374151; font-size: 16px;">${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.subject}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); min-height: 100vh;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              
              <!-- Main Container -->
              <table role="presentation" style="width: 100%; max-width: 640px; border-collapse: collapse; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                
                <!-- Header with Logo and Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #1a1a2e 100%); padding: 48px 40px; text-align: center; position: relative;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2220%22 cy=%2230%22 r=%221%22 fill=%22rgba(251,191,36,0.1)%22/><circle cx=%2250%22 cy=%2215%22 r=%220.5%22 fill=%22rgba(251,191,36,0.15)%22/><circle cx=%2280%22 cy=%2240%22 r=%221%22 fill=%22rgba(251,191,36,0.1)%22/><circle cx=%2235%22 cy=%2270%22 r=%220.75%22 fill=%22rgba(251,191,36,0.12)%22/><circle cx=%2270%22 cy=%2285%22 r=%221%22 fill=%22rgba(251,191,36,0.08)%22/></svg>'); background-size: 150px 150px;"></div>
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 70px; margin-bottom: 20px; position: relative; z-index: 1;" />
                    <h1 style="margin: 0; color: #fbbf24; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1;">
                      ${productName}
                    </h1>
                    <div style="margin-top: 16px; color: #e5e7eb; font-size: 18px; position: relative; z-index: 1;">
                      ✨ ${t.horoscopeTitle} ✨
                    </div>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 24px;">
                    <h2 style="margin: 0 0 16px 0; color: #1a1a2e; font-size: 26px; font-weight: 700;">
                      ${t.greeting}${customerName ? `, ${customerName}` : ''} 🌟
                    </h2>
                    <p style="margin: 0; line-height: 1.7; color: #6b7280; font-size: 17px;">
                      ${t.thank}
                    </p>
                  </td>
                </tr>

                <!-- Horoscope Content -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); padding: 32px; border-radius: 16px; margin-bottom: 24px; border: 1px solid rgba(251, 191, 36, 0.3);">
                      <div style="font-size: 16px;">
                        ${formattedHoroscope}
                      </div>
                    </div>

                    <!-- Horoscope PDF Notice -->
                    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: center;">
                      <div style="color: #fbbf24; font-size: 24px; margin-bottom: 8px;">📄</div>
                      <h3 style="margin: 0 0 8px 0; color: #fbbf24; font-size: 18px; font-weight: 600;">
                        ${t.horoscopePdf}
                      </h3>
                      <p style="margin: 0; color: #e5e7eb; font-size: 14px;">
                        ${lang === 'sk' ? 'Váš kompletný horoskop je priložený ako PDF súbor' : 'Your complete horoscope is attached as a PDF file'}
                      </p>
                    </div>

                    <!-- Attached Documents Notice -->
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px;">
                      <h3 style="margin: 0 0 12px 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">
                        📎 ${t.attached}
                      </h3>
                      <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        ${t.attachedDesc}
                      </p>
                      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${t.legalDocs.map(name => `<span style="display: inline-block; background: #e5e7eb; padding: 6px 12px; border-radius: 20px; font-size: 13px; color: #4b5563;">${name}</span>`).join('')}
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- Footer Message -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <div style="text-align: center; padding: 28px; background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%); border-radius: 16px;">
                      <p style="margin: 0; color: #4c1d95; font-size: 18px; font-style: italic; font-weight: 500;">
                        ✨ ${t.footer} ✨
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Contact Info -->
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                      ${t.questions} <a href="mailto:info@astralo.online" style="color: #fbbf24; text-decoration: none; font-weight: 500;">info@astralo.online</a>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <img src="https://astralo.online/logo.png" alt="Astralo" style="height: 36px; margin-bottom: 16px; opacity: 0.7;" />
                    <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                      © ${new Date().getFullYear()} Astralo. ${t.copyright}.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Get legal PDFs
    const legalDocs = await generateLegalPDFs(lang);

    // Generate horoscope PDF
    const horoscopePdf = await generateHoroscopePDF({
      customerName: customerName || 'Customer',
      productName,
      productKey: productKey || 'daily',
      horoscopeContent,
      birthDate: birthDate || '',
      birthPlace: birthPlace || '',
      birthTime: birthTime || '',
      lang,
    });

    // Prepare attachments
    const attachments = [
      // Horoscope PDF first
      {
        filename: horoscopePdf.filename,
        content: Buffer.from(horoscopePdf.content)
      },
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
