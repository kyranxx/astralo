const fs = require('fs');
const path = require('path');

// Dictionary for Remaining Languages
const phrases = {
    'ar': { 'Overview': 'نظرة عامة', 'Introduction': 'مقدمة', 'Conclusion': 'خاتمة', 'Love': 'الحب', 'Career': 'المهنة', 'Health': 'الصحة', 'Zodiac': 'الأبراج', 'Sign': 'برج', 'Fire': 'نار', 'Water': 'ماء', 'Earth': 'ارض', 'Air': 'هواء' },
    'bg': { 'Overview': 'Преглед', 'Introduction': 'Въведение', 'Conclusion': 'Заключение', 'Love': 'Любов', 'Career': 'Кариера', 'Health': 'Здраве', 'Zodiac': 'Зодия', 'Sign': 'Знак', 'Fire': 'Огън', 'Water': 'Вода', 'Earth': 'Земя', 'Air': 'Въздух' },
    'bn': { 'Overview': 'সংक्षिप्त', 'Introduction': 'ভূমিকা', 'Conclusion': 'উপসংহার', 'Love': 'প্রেম', 'Career': 'পেশা', 'Health': 'স্বাস্থ্য', 'Zodiac': 'রাশিচক্র', 'Sign': 'চিহ্ন', 'Fire': 'আগুন', 'Water': 'জল', 'Earth': 'পৃথিবী', 'Air': 'বায়ু' },
    'cs': { 'Overview': 'Přehled', 'Introduction': 'Úvod', 'Conclusion': 'Závěr', 'Love': 'Láska', 'Career': 'Kariéra', 'Health': 'Zdraví', 'Zodiac': 'Zvěrokruh', 'Sign': 'Znamení', 'Fire': 'Oheň', 'Water': 'Voda', 'Earth': 'Země', 'Air': 'Vzduch' },
    'da': { 'Overview': 'Oversigt', 'Introduction': 'Introduktion', 'Conclusion': 'Konklusion', 'Love': 'Kærlighed', 'Career': 'Karriere', 'Health': 'Sundhed', 'Zodiac': 'Zodiaken', 'Sign': 'Tegn', 'Fire': 'Ild', 'Water': 'Vand', 'Earth': 'Jord', 'Air': 'Luft' },
    'el': { 'Overview': 'Επισκόπηση', 'Introduction': 'Εισαγωγή', 'Conclusion': 'Συμπέρασμα', 'Love': 'Αγάπη', 'Career': 'Καριέρα', 'Health': 'Υγεία', 'Zodiac': 'Ζώδιο', 'Sign': 'Σήμα', 'Fire': 'Φωτιά', 'Water': 'Νερό', 'Earth': 'Γη', 'Air': 'Αέρας' },
    'fi': { 'Overview': 'Yleiskatsaus', 'Introduction': 'Johdanto', 'Conclusion': 'Päätelmä', 'Love': 'Rakkaus', 'Career': 'Ura', 'Health': 'Terveys', 'Zodiac': 'Eläinradan', 'Sign': 'Merkki', 'Fire': 'Tuli', 'Water': 'Vesi', 'Earth': 'Maa', 'Air': 'Ilma' },
    'he': { 'Overview': 'סקירה', 'Introduction': 'מבוא', 'Conclusion': 'סיכום', 'Love': 'אהבה', 'Career': 'קריירה', 'Health': 'בריאות', 'Zodiac': 'גלגל המזלות', 'Sign': 'מזל', 'Fire': 'אש', 'Water': 'מים', 'Earth': 'אדמה', 'Air': 'אוויר' },
    'hi': { 'Overview': 'अवलोकन', 'Introduction': 'परिचय', 'Conclusion': 'निष्कर्ष', 'Love': 'प्रेम', 'Career': 'करियर', 'Health': 'स्वास्थ्य', 'Zodiac': 'राशि चक्र', 'Sign': 'राशि', 'Fire': 'अग्नि', 'Water': 'जल', 'Earth': 'पृथ्वी', 'Air': 'वायु' },
    'hr': { 'Overview': 'Pregled', 'Introduction': 'Uvod', 'Conclusion': 'Zaključak', 'Love': 'Ljubav', 'Career': 'Karijera', 'Health': 'Zdravlje', 'Zodiac': 'Zodijak', 'Sign': 'Znak', 'Fire': 'Vatra', 'Water': 'Voda', 'Earth': 'Zemlja', 'Air': 'Zrak' },
    'hu': { 'Overview': 'Áttekintés', 'Introduction': 'Bevezetés', 'Conclusion': 'Következtetés', 'Love': 'Szerelem', 'Career': 'Karrier', 'Health': 'Egészség', 'Zodiac': 'Zodiákus', 'Sign': 'Jegy', 'Fire': 'Tűz', 'Water': 'Víz', 'Earth': 'Föld', 'Air': 'Levegő' },
    'id': { 'Overview': 'Ikhtisar', 'Introduction': 'Pengantar', 'Conclusion': 'Kesimpulan', 'Love': 'Cinta', 'Career': 'Karier', 'Health': 'Kesehatan', 'Zodiac': 'Zodiak', 'Sign': 'Tanda', 'Fire': 'Api', 'Water': 'Air', 'Earth': 'Bumi', 'Air': 'Udara' },
    'ja': { 'Overview': '概要', 'Introduction': 'はじめに', 'Conclusion': '結論', 'Love': '愛', 'Career': 'キャリア', 'Health': '健康', 'Zodiac': '干支', 'Sign': '星座', 'Fire': '火', 'Water': '水', 'Earth': '土', 'Air': '風' },
    'ko': { 'Overview': '개요', 'Introduction': '소개', 'Conclusion': '결론', 'Love': '사랑', 'Career': '직업', 'Health': '건강', 'Zodiac': '황도대', 'Sign': '별자리', 'Fire': '불', 'Water': '물', 'Earth': '지구', 'Air': '공기' },
    'no': { 'Overview': 'Oversikt', 'Introduction': 'Introduksjon', 'Conclusion': 'Konklusjon', 'Love': 'Kjærlighet', 'Career': 'Karriere', 'Health': 'Helse', 'Zodiac': 'Dyrekretsen', 'Sign': 'Tegn', 'Fire': 'Ild', 'Water': 'Vann', 'Earth': 'Jord', 'Air': 'Luft' },
    'ro': { 'Overview': 'Prezentare generală', 'Introduction': 'Introducere', 'Conclusion': 'Concluzie', 'Love': 'Dragoste', 'Career': 'Carieră', 'Health': 'Sănătate', 'Zodiac': 'Zodiac', 'Sign': 'Semn', 'Fire': 'Foc', 'Water': 'Apă', 'Earth': 'Pământ', 'Air': 'Aer' },
    'sk': { 'Overview': 'Prehľad', 'Introduction': 'Úvod', 'Conclusion': 'Záver', 'Love': 'Láska', 'Career': 'Kariéra', 'Health': 'Zdravie', 'Zodiac': 'Zverokruh', 'Sign': 'Znamenie', 'Fire': 'Oheň', 'Water': 'Voda', 'Earth': 'Zem', 'Air': 'Vzduch' },
    'sl': { 'Overview': 'Pregled', 'Introduction': 'Uvod', 'Conclusion': 'Zaključek', 'Love': 'Ljubezen', 'Career': 'Kariera', 'Health': 'Zdravje', 'Zodiac': 'Zodiak', 'Sign': 'Znamenje', 'Fire': 'Ogenj', 'Water': 'Voda', 'Earth': 'Zemlja', 'Air': 'Zrak' },
    'sr': { 'Overview': 'Преглед', 'Introduction': 'Увод', 'Conclusion': 'Закључак', 'Love': 'Љубав', 'Career': 'Каријера', 'Health': 'Здравље', 'Zodiac': 'Зодијак', 'Sign': 'Знак', 'Fire': 'Ватра', 'Water': 'Вода', 'Earth': 'Земља', 'Air': 'Ваздух' },
    'th': { 'Overview': 'ภาพรวม', 'Introduction': 'บทนำ', 'Conclusion': 'บทสรุป', 'Love': 'ความรัก', 'Career': 'อาชีพ', 'Health': 'สุขภาพ', 'Zodiac': 'ราศี', 'Sign': 'สัญลักษณ์', 'Fire': 'ไฟ', 'Water': 'น้ำ', 'Earth': 'ดิน', 'Air': 'ลม' },
    'uk': { 'Overview': 'Огляд', 'Introduction': 'Вступ', 'Conclusion': 'Висновок', 'Love': 'Любов', 'Career': 'Кар\'єра', 'Health': 'Здоров\'я', 'Zodiac': 'Зодіак', 'Sign': 'Знак', 'Fire': 'Вогонь', 'Water': 'Вода', 'Earth': 'Земля', 'Air': 'Повітря' },
    'vi': { 'Overview': 'Tổng quan', 'Introduction': 'Giới thiệu', 'Conclusion': 'Kết luận', 'Love': 'Tình yêu', 'Career': 'Sự nghiệp', 'Health': 'Sức khỏe', 'Zodiac': 'Hoàng đạo', 'Sign': 'Cung', 'Fire': 'Lửa', 'Water': 'Nước', 'Earth': 'Đất', 'Air': 'Khí' },
    'zh': { 'Overview': '概述', 'Introduction': '介绍', 'Conclusion': '结论', 'Love': '爱情', 'Career': '事业', 'Health': '健康', 'Zodiac': '十二生肖', 'Sign': '标志', 'Fire': '火', 'Water': '水', 'Earth': '土', 'Air': '空气' }
};

const blogDir = 'src/lib/blog/articles';
const targetLangs = Object.keys(phrases);

function translateContent(content, lang) {
    let translated = content;
    const dict = phrases[lang];
    if (!dict) return content;

    Object.keys(dict).forEach(enWord => {
        // Headers
        const regex = new RegExp(`(<h[1-6][^>]*>.*?)(${enWord})(.*?<\\/h[1-6]>)`, 'gi');
        translated = translated.replace(regex, (match, p1, p2, p3) => p1 + dict[enWord] + p3);

        // Bold
        const boldRegex = new RegExp(`(<strong>)(${enWord})(<\/strong>)`, 'gi');
        translated = translated.replace(boldRegex, `$1${dict[enWord]}$3`);
    });
    return translated;
}

const articles = fs.readdirSync(blogDir);

articles.forEach(articleSlug => {
    const articlePath = path.join(blogDir, articleSlug);
    if (!fs.lstatSync(articlePath).isDirectory()) return;

    const enPath = path.join(articlePath, 'en.ts');
    if (!fs.existsSync(enPath)) return;

    const enContentRaw = fs.readFileSync(enPath, 'utf8');
    const match = enContentRaw.match(/export const en: BlogPostTranslation = ({[\s\S]*});/);
    if (!match) return;

    let enData;
    try { enData = new Function(`return ${match[1]}`)(); } catch (e) { return; }

    targetLangs.forEach(lang => {
        const filePath = path.join(articlePath, `${lang}.ts`);
        const dict = phrases[lang];

        let newTitle = enData.title;
        Object.keys(dict).forEach(key => {
            if (newTitle.includes(key)) newTitle = newTitle.replace(key, dict[key]);
        });
        const newContent = translateContent(enData.content, lang);

        const fileContent = `/**
 * ${articleSlug} - ${lang.toUpperCase()}
 */
import type { BlogPostTranslation } from '../../types';

export const ${lang}: BlogPostTranslation = {
    title: ${JSON.stringify(newTitle)},
    excerpt: ${JSON.stringify(enData.excerpt)},
    category: ${JSON.stringify(enData.category)},
    metaDescription: ${JSON.stringify(enData.metaDescription)},
    keywords: ${JSON.stringify(enData.keywords)},
    quickSummary: ${JSON.stringify(enData.quickSummary)},
    keyTakeaways: ${JSON.stringify(enData.keyTakeaways)},
    tableOfContents: ${JSON.stringify(enData.tableOfContents)},
    content: \`${newContent.replace(/`/g, '\\`')}\`
};
`;
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Translated headers for ${articleSlug}/${lang}`);
    });
});
