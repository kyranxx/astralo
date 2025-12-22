import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, request }) => {
    const password = url.searchParams.get('password');
    if (password !== import.meta.env.ADMIN_PASSWORD) {
        return new Response('Unauthorized', { status: 401 });
    }

    const lang = url.searchParams.get('lang') || 'en';
    const email = url.searchParams.get('email') || 'blanarikdaniel@gmail.com';

    // Sample horoscope content with emojis and longer text
    const horoscopeContent: Record<string, string> = {
        en: `✨ **Monthly Cosmic Overview** ✨

The celestial energies this month are particularly powerful for you. As Jupiter aligns with your natal sun, you'll find opportunities appearing in unexpected places. Your intuition is heightened, and the universe is sending clear signs your way.

🌟 **Career & Finances**
The first half of the month brings exceptional momentum in your professional life. A project you've been nurturing will finally bear fruit around the 15th. Financial opportunities arise from partnerships - don't hesitate to collaborate with others who share your vision.

❤️ **Love & Relationships**
Venus enters your house of romance, making this an ideal time for deepening connections. Single? Someone from your past may resurface with new intentions. Coupled? Plan a spontaneous adventure together - it will reignite the spark.

🍀 **Lucky Numbers**: 7, 14, 23, 38, 42
📅 **Best Days**: 8th, 15th, 22nd
💎 **Power Crystal**: Amethyst

Remember: The stars illuminate the path, but you choose the journey. Trust in your inner wisdom and embrace the magic that surrounds you. 🌙`,

        sk: `✨ **Mesačný Kozmický Prehľad** ✨

Nebeské energie tento mesiac sú pre vás obzvlášť silné. Keď sa Jupiter vyrovnáva s vaším natálnym slnkom, príležitosti sa objavia na neočakávaných miestach. Vaša intuícia je zvýšená a vesmír vám posiela jasné znamenia.

🌟 **Kariéra a Financie**
Prvá polovica mesiaca prináša výnimočnú dynamiku vo vašom profesionálnom živote. Projekt, ktorý ste pestovali, konečne prinesie ovocie okolo 15. dňa. Finančné príležitosti vznikajú z partnerstiev - neváhajte spolupracovať s tými, ktorí zdieľajú vašu víziu.

❤️ **Láska a Vzťahy**
Venuša vstupuje do vášho domu romantiky, čo z neho robí ideálny čas na prehlbovanie spojení. Slobodní? Niekto z vašej minulosti sa môže vynoriť s novými zámermi. V páre? Naplánujte spontánne dobrodružstvo - znovu zapáli iskru.

🍀 **Šťastné Čísla**: 7, 14, 23, 38, 42
📅 **Najlepšie Dni**: 8., 15., 22.
💎 **Silový Kryštál**: Ametyst

Pamätajte: Hviezdy osvetľujú cestu, ale vy si vyberáte púť. Dôverujte svojej vnútornej múdrosti a prijmite mágiu, ktorá vás obklopuje. 🌙`,

        ar: `✨ **نظرة شهرية كونية** ✨

الطاقات السماوية هذا الشهر قوية بشكل خاص بالنسبة لك. مع اصطفاف المشتري مع شمسك الولادية، ستجد الفرص تظهر في أماكن غير متوقعة. حدسك مرتفع، والكون يرسل لك إشارات واضحة.

🌟 **المهنة والمال**
النصف الأول من الشهر يجلب زخماً استثنائياً في حياتك المهنية. مشروع كنت ترعاه سيثمر أخيراً حوالي الخامس عشر. تنشأ الفرص المالية من الشراكات - لا تتردد في التعاون مع الآخرين الذين يشاركونك رؤيتك.

❤️ **الحب والعلاقات**
الزهرة تدخل بيت الرومانسية الخاص بك، مما يجعل هذا الوقت المثالي لتعميق الروابط. أعزب؟ شخص من ماضيك قد يعود بنوايا جديدة. في علاقة؟ خطط لمغامرة عفوية معاً - ستعيد إشعال الشرارة.

🍀 **الأرقام المحظوظة**: 7، 14، 23، 38، 42
📅 **أفضل الأيام**: 8، 15، 22
💎 **بلورة القوة**: الجمشت

تذكر: النجوم تضيء الطريق، لكنك تختار الرحلة. ثق بحكمتك الداخلية واحتضن السحر الذي يحيط بك. 🌙`,

        he: `✨ **סקירה קוסמית חודשית** ✨

האנרגיות השמימיות החודש חזקות במיוחד עבורך. כאשר צדק מתיישר עם השמש הנולדת שלך, תמצא הזדמנויות מופיעות במקומות בלתי צפויים. האינטואיציה שלך מוגברת, והיקום שולח לך אותות ברורים.

🌟 **קריירה וכספים**
המחצית הראשונה של החודש מביאה מומנטום יוצא דופן בחיים המקצועיים שלך. פרויקט שטיפחת סוף סוף יניב פירות סביב ה-15. הזדמנויות פיננסיות נובעות משותפויות - אל תהסס לשתף פעולה עם אחרים שחולקים את החזון שלך.

❤️ **אהבה ויחסים**
ונוס נכנסת לבית הרומנטיקה שלך, מה שהופך את זה לזמן אידיאלי להעמקת קשרים. רווק? מישהו מהעבר שלך עשוי לצוץ מחדש עם כוונות חדשות. בזוגיות? תכנן הרפתקה ספונטנית יחד - זה יצית מחדש את הניצוץ.

🍀 **מספרי מזל**: 7, 14, 23, 38, 42
📅 **הימים הטובים ביותר**: 8, 15, 22
💎 **קריסטל כוח**: אמטיסט

זכור: הכוכבים מאירים את הדרך, אבל אתה בוחר את המסע. סמוך על החוכמה הפנימית שלך ואמץ את הקסם שמקיף אותך. 🌙`,

        tr: `✨ **Aylık Kozmik Bakış** ✨

Bu aydaki göksel enerjiler sizin için özellikle güçlü. Jüpiter doğum güneşinizle hizalandıkça, fırsatların beklenmedik yerlerde ortaya çıktığını göreceksiniz. Sezgileriniz yükselmiş durumda ve evren size net işaretler gönderiyor.

🌟 **Kariyer ve Finans**
Ayın ilk yarısı profesyonel yaşamınızda olağanüstü bir ivme getiriyor. Beslediğiniz bir proje nihayetinde 15'inde meyve verecek. Finansal fırsatlar ortaklıklardan doğuyor - vizyonunuzu paylaşan diğerleriyle işbirliği yapmaktan çekinmeyin.

❤️ **Aşk ve İlişkiler**
Venüs romantizm evinize giriyor, bu da bağları derinleştirmek için ideal bir zaman. Bekar mısınız? Geçmişinizden biri yeni niyetlerle yeniden ortaya çıkabilir. Çift misiniz? Birlikte spontane bir macera planlayın - kıvılcımı yeniden ateşleyecektir.

🍀 **Şanslı Sayılar**: 7, 14, 23, 38, 42
📅 **En İyi Günler**: 8, 15, 22
💎 **Güç Kristali**: Ametist

Unutmayın: Yıldızlar yolu aydınlatır, ama yolculuğu siz seçersiniz. İç bilgeliğinize güvenin ve sizi çevreleyen büyüyü kucaklayın. 🌙`
    };

    const content = horoscopeContent[lang] || horoscopeContent.en;

    try {
        const response = await fetch(new URL('/api/send-email', url.origin), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                customerName: 'Test User',
                horoscopeContent: content,
                productName: 'Monthly Horoscope',
                lang,
                birthDate: '1990-05-15',
                birthPlace: 'New York',
                birthTime: '14:30'
            })
        });

        if (!response.ok) {
            const err = await response.text();
            return new Response(JSON.stringify({ error: err }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: `Test email sent to ${email} in ${lang}`
        }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
