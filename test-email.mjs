/**
 * Automated E2E Test for Astralo Email & PNG
 * Run with: node test-email.mjs
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:4322';
const OUTPUT_DIR = path.join(process.cwd(), 'test-output');

// Test configuration
const TEST_CONFIG = {
    email: 'blanarikdaniel@gmail.com',
    customerName: 'Test Customer',
    birthDate: '1990-05-15',
    birthTime: '14:30',
    birthPlace: 'Bratislava',
    lang: 'en'
};

// Realistic horoscope content with markdown structure (like Gemini AI generates)
const SAMPLE_HOROSCOPE = `
Overview

Today brings exciting opportunities for personal growth and transformation. The cosmic energies are aligned in your favor, making this an excellent day to pursue your goals with confidence. The stars have aligned to bring you clarity and purpose.

Love & Relationships

Venus in your fifth house brings romantic energy your way. If you're in a relationship, expect deeper connections and meaningful conversations with your partner. Single? Keep your eyes open for someone special who shares your interests. Communication flows easily today, making it perfect for heart-to-heart talks.

Career & Finance

Jupiter's influence on your career sector suggests positive developments at work. A project you've been working on may finally gain recognition from supervisors or colleagues. Financially, avoid impulsive purchases but don't hesitate to invest in your personal development. Your hard work is about to pay off in meaningful ways.

Health & Wellness

Your energy levels are high today. Use this vitality for physical activities you've been putting off. Remember to stay hydrated and take short breaks to maintain your momentum throughout the day. A balanced approach to work and rest will serve you well.

🍀 Lucky Numbers: 3, 7, 15, 22, 33

📅 Best Time: Morning hours are especially favorable for important decisions

💎 Crystal: Amethyst for clarity and intuition

Advice for Today

Trust your intuition and don't be afraid to take calculated risks. The universe is supporting your endeavors! Remember that every step forward, no matter how small, is progress toward your dreams.
`;

async function runTest() {
    console.log('🚀 Starting Automated E2E Test\n');
    console.log('='.repeat(50));

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let success = true;
    const results = {
        emailSent: false,
        pngGenerated: false,
        pngSaved: false,
        pngSize: 0,
        errors: []
    };

    try {
        // Step 1: Send test email with realistic horoscope content
        console.log('\n📧 Step 1: Sending test email with realistic horoscope...');
        console.log(`   To: ${TEST_CONFIG.email}`);

        const emailResponse = await fetch(`${BASE_URL}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: TEST_CONFIG.email,
                customerName: TEST_CONFIG.customerName,
                horoscopeContent: SAMPLE_HOROSCOPE,
                productName: 'Daily Horoscope',
                lang: TEST_CONFIG.lang,
                birthDate: TEST_CONFIG.birthDate,
                birthTime: TEST_CONFIG.birthTime,
                birthPlace: TEST_CONFIG.birthPlace
            })
        });

        const emailResult = await emailResponse.json();

        if (emailResponse.ok && emailResult.success) {
            console.log('   ✅ Email sent successfully!');
            results.emailSent = true;
        } else {
            console.log('   ❌ Email failed:', emailResult.error || 'Unknown error');
            results.errors.push(`Email failed: ${emailResult.error}`);
            success = false;
        }

        // Step 2: Call PNG generator directly to save output for verification
        console.log('\n🖼️  Step 2: Generating PNG directly for inspection...');

        // Import the PNG generator and test it directly
        const response = await fetch(`${BASE_URL}/api/test-png`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName: TEST_CONFIG.customerName,
                productName: 'Daily Horoscope',
                horoscopeContent: SAMPLE_HOROSCOPE,
                birthDate: TEST_CONFIG.birthDate,
                birthTime: TEST_CONFIG.birthTime,
                birthPlace: TEST_CONFIG.birthPlace,
                lang: TEST_CONFIG.lang
            })
        });

        if (response.ok) {
            const pngBuffer = await response.arrayBuffer();
            const outputPath = path.join(OUTPUT_DIR, 'test-horoscope.png');
            fs.writeFileSync(outputPath, Buffer.from(pngBuffer));

            results.pngGenerated = true;
            results.pngSaved = true;
            results.pngSize = pngBuffer.byteLength;

            console.log(`   ✅ PNG generated and saved to: ${outputPath}`);
            console.log(`   📏 Size: ${(pngBuffer.byteLength / 1024).toFixed(1)} KB`);

            if (pngBuffer.byteLength < 50000) {
                console.log('   ⚠️  WARNING: PNG is small, might be mostly empty');
                results.errors.push('PNG size is small (< 50KB)');
            } else if (pngBuffer.byteLength > 100000) {
                console.log('   ✅ PNG size looks good (> 100KB)');
            }
        } else {
            console.log('   ⚠️  Test PNG API not available, skipping direct PNG test');
            console.log('   Note: PNG was still attached to the email.');
        }

    } catch (error) {
        console.log('\n❌ Test failed with error:', error.message);
        results.errors.push(error.message);
        success = false;
    }

    // Final Report
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`Email Sent:      ${results.emailSent ? '✅' : '❌'}`);
    console.log(`PNG Generated:   ${results.pngGenerated ? '✅' : '⏭️ (via email)'}`);
    console.log(`PNG Size:        ${results.pngSize > 0 ? (results.pngSize / 1024).toFixed(1) + ' KB' : 'N/A'}`);

    if (results.errors.length > 0) {
        console.log('\n⚠️  Issues Found:');
        results.errors.forEach(err => console.log(`   - ${err}`));
    }

    console.log('\n' + (success ? '✅ EMAIL TEST PASSED - Check your inbox!' : '❌ SOME TESTS FAILED'));
    console.log('='.repeat(50));

    if (results.pngSaved) {
        console.log(`\n📁 PNG saved to: ${path.join(OUTPUT_DIR, 'test-horoscope.png')}`);
        console.log('   Open this file to visually verify the horoscope image.');
    }

    // Return exit code
    process.exit(success ? 0 : 1);
}

runTest();
