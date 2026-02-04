import fs from 'fs';
import path from 'path';

const localesDir = 'c:/Users/User/Desktop/Projects/Astralo/src/locales';

const translations = {
    en: 'Get it for',
    sk: 'Získať za',
    cs: 'Získat za',
    de: 'Jetzt für',
    fr: 'Obtenir pour',
    es: 'Consíguelo por',
    it: 'Ottienilo per',
    pt: 'Obtenha por',
    nl: 'Krijg het voor',
    pl: 'Kup za',
    hu: 'Szerezd meg',
    ro: 'Obține-l pentru',
    bg: 'Вземете за',
    hr: 'Nabavite za',
    sl: 'Zagotovite si za',
    sr: 'Nabavite za',
    uk: 'Отримати за',
    ru: 'Получить за',
    el: 'Αποκτήστε το για',
    tr: 'Şunun için al',
    ar: 'احصل عليه مقابل',
    he: 'קבל את זה ב-',
    hi: 'इसे प्राप्त करें',
    ja: '今すぐ購入',
    ko: '지금 구매',
    zh: '立即获取',
    th: 'รับเลยในราคา',
    vi: 'Nhận ngay với',
    id: 'Dapatkan seharga',
    sv: 'Få det för',
    da: 'Få det for',
    fi: 'Hanki se hintaan',
    no: 'Få det for',
    bn: 'এটি পান',
};

const files = fs.readdirSync(localesDir);

for (const file of files) {
    if (!file.endsWith('.ts') || file === 'index.ts' || file === 'types.ts' || file === 'contact.ts') continue;

    const lang = file.replace('.ts', '');
    const filePath = path.join(localesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const getForText = translations[lang] || 'Get it for';

    // Check if ads section exists
    if (content.includes('join: ')) {
        const replacement = `join: \'$1\',\n        getFor: \'${getForText}\',`;
        content = content.replace(/join:\s*\'(.*)\',/g, replacement);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file} with ${getForText}`);
    } else {
        console.log(`Skipped ${file} - join: not found`);
    }
}
