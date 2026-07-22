import type { SupportedLocale, Translations } from '../locales/types';
import { getProductCopy, type ProductKey } from './products';

const maxMetaDescriptionLength = 160;
const sentenceEnding = /[.!?。！？]$/u;

export interface ProductLandingSeoContent {
    eyebrow: string;
    title: string;
    intro: string;
    points: Array<{ title: string; body: string }>;
    faqs: Array<{ question: string; answer: string }>;
}

function asSentence(fragment: string): string {
    const trimmed = fragment.trim();
    return sentenceEnding.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function buildProductLandingDescription(
    translations: Pick<Translations, 'products' | 'promo'>,
    productKey: ProductKey,
    lang: SupportedLocale = 'en',
): string {
    const product = getProductCopy(productKey, lang, translations);
    const sentences = [
        product.name,
        product.description,
        translations.promo.delivery,
        translations.promo.secure,
    ].map(asSentence);

    return sentences.reduce((description, sentence) => {
        const candidate = description ? `${description} ${sentence}` : sentence;
        return [...candidate].length <= maxMetaDescriptionLength ? candidate : description;
    }, '');
}

export function getProductLandingSeoContent(
    lang: SupportedLocale,
    productKey: ProductKey,
): ProductLandingSeoContent | null {
    const searchConsoleContent: Partial<Record<`${SupportedLocale}:${ProductKey}`, ProductLandingSeoContent>> = {
        'en:weekly': {
            eyebrow: 'Personalized weekly horoscope',
            title: 'Weekly horoscope for the next seven days',
            intro: 'A personalized weekly horoscope brings the next seven days into one practical report, using your birth details to explore relationships, work, money, timing, and decisions.',
            points: [
                { title: 'Your next seven days', body: 'See the week’s main themes, useful dates, and areas that may need extra attention.' },
                { title: 'Built from birth details', body: 'Your birth date, time, and place provide more personal context than a generic weekly horoscope.' },
                { title: 'Love, work, and decisions', body: 'The report covers relationships, career, finances, and practical choices for the week.' },
            ],
            faqs: [
                { question: 'What does a weekly horoscope include?', answer: 'It covers the week’s main themes, important dates, relationships, work, money, and practical guidance.' },
                { question: 'Is the weekly horoscope personalized?', answer: 'Yes. The report uses the birth information submitted with your order.' },
            ],
        },
        'en:monthly': {
            eyebrow: 'Personalized monthly horoscope',
            title: 'Monthly horoscope with key dates and personal themes',
            intro: 'A personalized monthly horoscope organizes the month’s main opportunities, challenges, and timing for relationships, career, money, and personal decisions.',
            points: [
                { title: 'A clear monthly overview', body: 'Review the month’s most important periods and themes in one structured report.' },
                { title: 'Personal birth information', body: 'Birth date, time, and place add context beyond a general horoscope for every sign.' },
                { title: 'Practical areas of life', body: 'Explore relationships, career, finances, energy, and decisions throughout the month.' },
            ],
            faqs: [
                { question: 'What is included in a monthly horoscope?', answer: 'It includes the month’s main themes, key dates, opportunities, challenges, and personal guidance.' },
                { question: 'Is this a recurring monthly horoscope subscription?', answer: 'No. This purchase is for one personalized monthly report delivered digitally by email.' },
            ],
        },
        'es:weekly': {
            eyebrow: 'Horóscopo semanal',
            title: 'Horóscopo semanal personalizado para los próximos 7 días',
            intro: 'El horóscopo semanal personalizado reúne los temas de los próximos siete días para el amor, el trabajo, el dinero y las decisiones, utilizando tus datos de nacimiento.',
            points: [
                { title: 'Los próximos 7 días', body: 'Consulta la energía general, las fechas importantes y los temas que requieren más atención durante la semana.' },
                { title: 'Basado en tus datos', body: 'La fecha, hora y lugar de nacimiento aportan más contexto que un horóscopo semanal general.' },
                { title: 'Amor y trabajo', body: 'El informe trata relaciones, carrera, dinero y decisiones prácticas para la semana.' },
            ],
            faqs: [
                { question: '¿Qué incluye el horóscopo semanal?', answer: 'Incluye los temas principales de la semana, fechas importantes y orientación sobre amor, trabajo, dinero y decisiones.' },
                { question: '¿El horóscopo semanal es personalizado?', answer: 'Sí. El informe utiliza los datos de nacimiento que proporcionas al hacer el pedido.' },
            ],
        },
        'he:weekly': {
            eyebrow: 'הורוסקופ שבועי',
            title: 'הורוסקופ שבועי אישי לשבעת הימים הקרובים',
            intro: 'הורוסקופ שבועי אישי מרכז את הנושאים החשובים של שבעת הימים הקרובים באהבה, עבודה, כסף והחלטות, על בסיס פרטי הלידה שלך.',
            points: [
                { title: 'שבעת הימים הקרובים', body: 'סקירה ברורה של האנרגיה השבועית, ימים חשובים ונושאים שכדאי לשים אליהם לב.' },
                { title: 'מבוסס על פרטי לידה', body: 'תאריך, שעה ומקום לידה מספקים הקשר אישי יותר מהורוסקופ שבועי כללי.' },
                { title: 'אהבה ועבודה', body: 'הדוח עוסק ביחסים, קריירה, כסף והחלטות מעשיות במהלך השבוע.' },
            ],
            faqs: [
                { question: 'מה כולל הורוסקופ שבועי?', answer: 'הוא כולל את נושאי השבוע, ימים חשובים והכוונה בנושאי אהבה, עבודה, כסף והחלטות.' },
                { question: 'האם ההורוסקופ השבועי אישי?', answer: 'כן. הדוח נוצר בעזרת פרטי הלידה שמסרת בעת ההזמנה.' },
            ],
        },
        'fi:daily': {
            eyebrow: 'Päivittäinen horoskooppi',
            title: 'Päivähoroskooppi henkilökohtaisilla päivän teemoilla',
            intro: 'Päivittäinen horoskooppi auttaa tarkastelemaan seuraavan 24 tunnin teemoja syntymätietojesi pohjalta. Raportti kokoaa rakkauden, työn, päätökset ja päivän käytännön neuvot yhteen henkilökohtaiseen tulkintaan.',
            points: [
                { title: 'Seuraavat 24 tuntia', body: 'Saat selkeän yhteenvedon päivän energiasta, tärkeistä hetkistä ja asioista, joihin kannattaa kiinnittää huomiota.' },
                { title: 'Henkilökohtainen tulkinta', body: 'Syntymäpäivä, -aika ja -paikka tekevät tulkinnasta henkilökohtaisemman kuin yleinen päivähoroskooppi.' },
                { title: 'Rakkaus, työ ja päätökset', body: 'Raportti käsittelee ihmissuhteita, uraa ja päivän valintoja käytännöllisessä muodossa.' },
            ],
            faqs: [
                { question: 'Mitä päivittäinen horoskooppi sisältää?', answer: 'Se sisältää henkilökohtaisen katsauksen päivän energiaan, rakkauteen, työhön, päätöksiin ja käytännön neuvoihin.' },
                { question: 'Onko tämä sama kuin yleinen päivähoroskooppi?', answer: 'Ei. Raportti laaditaan antamiesi syntymätietojen pohjalta eikä ole sama teksti kaikille saman merkin lukijoille.' },
            ],
        },
        'fi:monthly': {
            eyebrow: 'Kuukausihoroskooppi',
            title: 'Kuukausihoroskooppi kuukauden tärkeisiin teemoihin',
            intro: 'Henkilökohtainen kuukausihoroskooppi kokoaa tulevan kuukauden tärkeät ajankohdat, mahdollisuudet ja haasteet yhteen raporttiin syntymätietojesi pohjalta.',
            points: [
                { title: 'Kuukauden kokonaiskuva', body: 'Näet kuukauden keskeiset teemat ja ajankohdat yhdessä selkeässä tulkinnassa.' },
                { title: 'Rakkaus ja ura', body: 'Raportti käsittelee ihmissuhteita, työtä, taloutta ja henkilökohtaista kasvua.' },
                { title: 'Omat syntymätietosi', body: 'Tulkinta käyttää antamiasi syntymätietoja yleisen horoskooppitekstin sijaan.' },
            ],
            faqs: [
                { question: 'Mitä kuukausihoroskooppi kertoo?', answer: 'Se kokoaa kuukauden tärkeät astrologiset teemat, ajankohdat ja henkilökohtaiset suositukset.' },
                { question: 'Milloin saan kuukausihoroskoopin?', answer: 'Raportti luodaan tilauksen jälkeen ja toimitetaan sähköpostiisi digitaalisesti.' },
            ],
        },
        'sv:weekly': {
            eyebrow: 'Veckohoroskop',
            title: 'Veckans horoskop med en personlig överblick',
            intro: 'Ett personligt veckohoroskop samlar de kommande sju dagarnas viktigaste teman för kärlek, arbete, ekonomi och beslut utifrån dina födelsedata.',
            points: [
                { title: 'De kommande sju dagarna', body: 'Få en tydlig överblick över veckans energi, viktiga dagar och praktiska fokus.' },
                { title: 'Personligt underlag', body: 'Födelsedatum, födelsetid och födelseort ger mer sammanhang än ett allmänt veckohoroskop.' },
                { title: 'Kärlek och arbete', body: 'Rapporten tar upp relationer, karriär, ekonomi och val under veckan.' },
            ],
            faqs: [
                { question: 'Vad innehåller ett veckohoroskop?', answer: 'Det sammanfattar veckans viktigaste teman, dagar, relationer, arbete och praktiska råd.' },
                { question: 'Är veckans horoskop personligt?', answer: 'Ja. Rapporten skapas med de födelsedata som du lämnar i beställningen.' },
            ],
        },
        'da:monthly': {
            eyebrow: 'Månedens horoskop',
            title: 'Månedshoroskop med personlige temaer og vigtige datoer',
            intro: 'Et personligt månedshoroskop samler månedens vigtigste temaer, muligheder og udfordringer for kærlighed, arbejde og beslutninger med udgangspunkt i dine fødselsdata.',
            points: [
                { title: 'Månedens overblik', body: 'Få de vigtigste perioder og temaer samlet i én overskuelig rapport.' },
                { title: 'Personlig astrologi', body: 'Fødselsdato, tidspunkt og sted giver mere sammenhæng end et generelt månedshoroskop.' },
                { title: 'Praktiske anbefalinger', body: 'Rapporten forbinder månedens astrologiske temaer med kærlighed, karriere og personlige valg.' },
            ],
            faqs: [
                { question: 'Hvad indeholder månedens horoskop?', answer: 'Det beskriver månedens vigtigste temaer, datoer og personlige anbefalinger for blandt andet kærlighed og arbejde.' },
                { question: 'Er månedshoroskopet personligt?', answer: 'Ja. Rapporten tager udgangspunkt i de fødselsoplysninger, du sender med bestillingen.' },
            ],
        },
        'nl:daily': {
            eyebrow: 'Persoonlijke daghoroscoop',
            title: 'Dagelijkse horoscoop met persoonlijke duiding',
            intro: 'Een persoonlijke daghoroscoop geeft context bij de komende 24 uur op basis van je geboortegegevens, met aandacht voor liefde, werk en belangrijke keuzes.',
            points: [
                { title: 'De komende 24 uur', body: 'Bekijk de belangrijkste thema’s, momenten en aandachtspunten van je dag.' },
                { title: 'Gebaseerd op geboortegegevens', body: 'Je geboortedatum, tijd en plaats geven meer context dan een algemene online horoscoop.' },
                { title: 'Liefde en werk', body: 'De lezing behandelt relaties, loopbaan en praktische beslissingen voor vandaag.' },
            ],
            faqs: [
                { question: 'Wat staat er in een persoonlijke daghoroscoop?', answer: 'Je krijgt een overzicht van de dagelijkse thema’s voor relaties, werk, energie en beslissingen.' },
                { question: 'Is dit een gratis algemene horoscoop?', answer: 'Nee. Dit is een uitgebreider persoonlijk rapport op basis van de geboortegegevens die je invult.' },
            ],
        },
        'tr:weekly': {
            eyebrow: 'Haftalık burç yorumları',
            title: 'Kişisel haftalık burç yorumu ve 7 günlük analiz',
            intro: 'Kişisel haftalık burç yorumu, doğum bilgilerinize göre önünüzdeki yedi günün aşk, kariyer, para ve karar temalarını tek bir raporda toplar.',
            points: [
                { title: 'Önümüzdeki 7 gün', body: 'Haftanın enerjisini, önemli günlerini ve dikkat edilmesi gereken konuları görün.' },
                { title: 'Doğum bilgilerinize göre', body: 'Doğum tarihi, saati ve yeri genel bir burç yorumundan daha kişisel bir çerçeve sağlar.' },
                { title: 'Aşk ve kariyer', body: 'Rapor ilişkiler, iş, para ve haftalık kararlar için pratik başlıklar sunar.' },
            ],
            faqs: [
                { question: 'Haftalık burç yorumu neleri içerir?', answer: 'Haftanın genel enerjisini, önemli günleri, aşk, kariyer, para ve kişisel önerileri içerir.' },
                { question: 'Bu haftalık yorum kişiye özel mi?', answer: 'Evet. Rapor, sipariş sırasında verdiğiniz doğum bilgileri kullanılarak hazırlanır.' },
            ],
        },
        'bg:monthly': {
            eyebrow: 'Месечен хороскоп',
            title: 'Месечен хороскоп според датата на раждане',
            intro: 'Личният месечен хороскоп събира най-важните теми, периоди и възможности за любов, работа и решения въз основа на данните ви за раждане.',
            points: [
                { title: 'Преглед на месеца', body: 'Получавате ясна картина на важните периоди, теми и възможности през месеца.' },
                { title: 'Лични данни за раждане', body: 'Дата, час и място на раждане дават повече контекст от общ хороскоп за всички знаци.' },
                { title: 'Любов и кариера', body: 'Докладът разглежда отношенията, работата, финансите и личните решения.' },
            ],
            faqs: [
                { question: 'Какво включва месечният хороскоп?', answer: 'Той включва основните теми на месеца, важни периоди и лични насоки за любов, работа и решения.' },
                { question: 'Хороскопът съобразен ли е с датата на раждане?', answer: 'Да. Анализът използва данните за раждане, които предоставяте при поръчката.' },
            ],
        },
    };

    const matchedSearchConsoleContent = searchConsoleContent[`${lang}:${productKey}`];
    if (matchedSearchConsoleContent) {
        return matchedSearchConsoleContent;
    }

    if (lang === 'pt' && productKey === 'weekly') {
        return {
            eyebrow: 'Horóscopo semanal em português',
            title: 'Horóscopo semanal personalizado para planear a semana',
            intro: 'Se procura um horóscopo semanal mais útil do que uma previsão genérica, a Astralo cria um relatório digital com base nos seus dados de nascimento e nas tendências dos próximos 7 dias.',
            points: [
                {
                    title: 'Foco nos próximos 7 dias',
                    body: 'A leitura organiza temas da semana, datas importantes, energia geral e recomendações práticas para amor, trabalho e decisões pessoais.',
                },
                {
                    title: 'Mais pessoal que um texto geral',
                    body: 'O relatório usa data, hora e local de nascimento quando disponíveis, para criar uma leitura mais ligada ao seu contexto do que um horóscopo igual para todos.',
                },
                {
                    title: 'Entrega digital em Portugal',
                    body: 'Pode encomendar online em euros e receber o PDF por email em Portugal ou noutro país de língua portuguesa.',
                },
            ],
            faqs: [
                {
                    question: 'O que inclui um horóscopo semanal?',
                    answer: 'Um horóscopo semanal resume os principais temas dos próximos 7 dias, incluindo energia geral, amor, carreira, dinheiro, datas úteis e recomendações práticas.',
                },
                {
                    question: 'O horóscopo semanal da Astralo é personalizado?',
                    answer: 'Sim. A leitura usa os dados de nascimento enviados no pedido para criar um relatório mais pessoal do que uma previsão semanal genérica por signo.',
                },
                {
                    question: 'Posso encomendar o horóscopo semanal em Portugal?',
                    answer: 'Sim. A encomenda é online, o pagamento é em euros e o relatório PDF é enviado por email, por isso funciona para Portugal e outros países.',
                },
            ],
        };
    }

    return null;
}
