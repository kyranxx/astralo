// Test script for Hebrew and Arabic PNG generation
// Run with: node tests/test-rtl-png.cjs

const fs = require('fs');
const path = require('path');

async function testRTLPNG() {
    console.log('🧪 Testing RTL PNG generation...\n');

    // We need to use dynamic import for ESM modules
    try {
        // Import the png-generator (TypeScript compiled)
        const { generateHoroscopeImage } = await import('../src/lib/png-generator.ts');

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

            const images = await generateHoroscopeImage(data);

            // Save the images
            for (const img of images) {
                const outputPath = path.join(__dirname, `output_${test.lang}_${img.filename}`);
                fs.writeFileSync(outputPath, img.content);
                console.log(`✅ Saved: ${outputPath} (${img.content.length} bytes)`);
            }
        }

        console.log('\n🎉 Test complete! Check the tests folder for output files.');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testRTLPNG();
