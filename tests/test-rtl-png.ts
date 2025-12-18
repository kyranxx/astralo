// Test script for Hebrew and Arabic PNG generation
// Run with: npx tsx tests/test-rtl-png.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateHoroscopeImage } from '../src/lib/png-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testRTLPNG() {
    console.log('🧪 Testing RTL PNG generation...\n');

    const testCases = [
        {
            lang: 'he',
            name: 'Hebrew Test',
            content: `ברכות! היום הוא יום מצוין עבורך.
            
מספר המזל שלך: 7
צבע המזל: כחול
זמן הטוב ביותר: 14:00

אהבה וזוגיות: תקשורת פתוחה תחזק את הקשרים שלך.
קריירה: הזדמנויות חדשות עשויות להופיע.
בריאות: שמור על איזון ושקט נפשי.`
        },
        {
            lang: 'ar',
            name: 'Arabic Test',
            content: `تهانينا! اليوم يوم رائع بالنسبة لك.

رقم الحظ: 7
لون الحظ: أزرق
أفضل وقت: 14:00

الحب والعلاقات: التواصل المفتوح سيعزز روابطك.
الوظيفة: قد تظهر فرص جديدة.
الصحة: حافظ على التوازن والسلام الداخلي.`
        },
        {
            lang: 'en',
            name: 'English Control',
            content: `Congratulations! Today is an excellent day for you.

Lucky Number: 7
Lucky Color: Blue
Best Time: 14:00

Love & Relationships: Open communication will strengthen your bonds.
Career: New opportunities may arise.
Health: Maintain balance and inner peace.`
        }
    ];

    for (const test of testCases) {
        console.log(`📝 Testing ${test.name} (${test.lang})...`);

        const data = {
            customerName: test.name,
            productName: 'Daily Horoscope',
            birthDate: '1990-01-15',
            birthPlace: 'Test City',
            birthTime: '12:00',
            horoscopeContent: test.content,
            lang: test.lang
        };

        try {
            const images = await generateHoroscopeImage(data);

            // Save the images
            for (const img of images) {
                const outputPath = path.join(__dirname, `rtl_output_${test.lang}_${img.filename}`);
                fs.writeFileSync(outputPath, img.content);
                console.log(`✅ Saved: ${outputPath} (${img.content.length} bytes)`);
            }
        } catch (error) {
            console.error(`❌ Error for ${test.lang}:`, error);
        }
    }

    console.log('\n🎉 Test complete! Check the tests folder for output files.');
    process.exit(0);
}

testRTLPNG();
