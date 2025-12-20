/**
 * Test Arabic email sending
 * Run with: node test-arabic.mjs
 */

const BASE_URL = 'http://localhost:4323';

// Arabic horoscope content
const arabicContent = `نظرة عامة

يجلب اليوم فرصاً مثيرة للنمو الشخصي والتحول. الطاقات الكونية متوافقة لصالحك، مما يجعل هذا يوماً ممتازاً لمتابعة أهدافك بثقة.

الحب والعلاقات

كوكب الزهرة في بيتك الخامس يجلب طاقة رومانسية في طريقك. إذا كنت في علاقة، توقع اتصالات أعمق ومحادثات ذات معنى مع شريكك.

العمل والمال

تأثير المشتري على قطاع حياتك المهنية يشير إلى تطورات إيجابية في العمل. قد يحظى مشروع كنت تعمل عليه أخيراً بالتقدير.

الصحة والعافية

مستويات طاقتك عالية اليوم. استخدم هذه الحيوية للأنشطة البدنية التي كنت تؤجلها.

🍀 الأرقام المحظوظة: 3، 7، 15، 22، 33

نصيحة اليوم

ثق بحدسك ولا تخف من المخاطر المحسوبة. الكون يدعم مساعيك!`;

async function sendArabicEmail() {
    console.log('🚀 Sending Arabic test email...\n');
    console.log('Content preview:', arabicContent.substring(0, 100) + '...\n');

    try {
        const response = await fetch(`${BASE_URL}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                email: 'blanarikdaniel@gmail.com',
                customerName: 'مستخدم اختبار',
                horoscopeContent: arabicContent,
                productName: 'البرج اليومي',
                lang: 'ar',
                birthDate: '1990-05-15',
                birthTime: '14:30',
                birthPlace: 'الرياض'
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            console.log('✅ Arabic email sent successfully!');
        } else {
            console.log('❌ Failed:', result.error || 'Unknown error');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

sendArabicEmail();
