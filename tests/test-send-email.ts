// Test script to send Hebrew email via API
// Run with: npx tsx tests/test-send-email.ts

async function sendTestEmail() {
    console.log('📧 Sending test Hebrew email...\n');

    const testData = {
        email: 'apollotechsro@gmail.com', // Your email
        horoscopeContent: `ברכות! היום הוא יום מצוין עבורך.

🌟 מספר המזל שלך: 7
🎨 צבע המזל: כחול
⏰ זמן הטוב ביותר: 14:00

💕 אהבה וזוגיות:
תקשורת פתוחה תחזק את הקשרים שלך. היום הוא זמן טוב לשיחות עמוקות עם אנשים אהובים.

💼 קריירה:
הזדמנויות חדשות עשויות להופיע. היה פתוח לשינויים ואל תפחד לקחת סיכונים מחושבים.

🏥 בריאות:
שמור על איזון ושקט נפשי. התאמן בבוקר ותרגיש אנרגיה מחודשת לכל היום.

✨ עצה יומית:
האמן בעצמך והכל יסתדר. הכוכבים מאירים את דרכך היום.`,
        productName: 'הורוסקופ חודשי',
        customerName: 'בדיקת מערכת',
        lang: 'he',
        birthDate: '1990-05-15',
        birthPlace: 'תל אביב',
        birthTime: '14:30'
    };

    try {
        const response = await fetch('http://localhost:4321/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ Email sent successfully!');
            console.log('Response:', result);
        } else {
            console.log('❌ Email failed:', result);
        }
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

sendTestEmail();
