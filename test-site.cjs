/**
 * Puppeteer Site Test Script
 * Tests for console errors, network errors, and basic functionality
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:4321';

const PAGES_TO_TEST = [
    '/',
    '/form/daily',
    '/form/weekly',
    '/form/monthly',
    '/form/partner',
    '/legal/contact',
    '/legal/privacy',
    '/legal/terms',
    '/legal/refund',
    '/legal/cookies',
    '/sk/',
    '/de/',
    '/fr/',
];

async function runTests() {
    console.log('🚀 Starting Puppeteer Site Tests...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results = {
        passed: 0,
        failed: 0,
        errors: [],
        warnings: []
    };

    for (const path of PAGES_TO_TEST) {
        const url = BASE_URL + path;
        console.log(`📄 Testing: ${path}`);

        const page = await browser.newPage();
        const pageErrors = [];
        const networkErrors = [];

        // Listen for console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                pageErrors.push(`Console Error: ${msg.text()}`);
            }
        });

        // Listen for page errors
        page.on('pageerror', error => {
            pageErrors.push(`Page Error: ${error.message}`);
        });

        // Listen for failed requests
        page.on('requestfailed', request => {
            networkErrors.push(`Failed Request: ${request.url()} - ${request.failure()?.errorText}`);
        });

        try {
            const response = await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            const status = response?.status();

            if (status !== 200) {
                results.failed++;
                results.errors.push(`${path}: HTTP ${status}`);
                console.log(`   ❌ HTTP ${status}`);
            } else if (pageErrors.length > 0 || networkErrors.length > 0) {
                results.failed++;
                const allErrors = [...pageErrors, ...networkErrors];
                results.errors.push(`${path}: ${allErrors.join('; ')}`);
                console.log(`   ⚠️ Errors found: ${allErrors.length}`);
                allErrors.forEach(e => console.log(`      - ${e}`));
            } else {
                results.passed++;
                console.log(`   ✅ OK`);
            }

            // Check for basic content
            const title = await page.title();
            if (!title || title.length < 3) {
                results.warnings.push(`${path}: Missing or short title`);
            }

        } catch (error) {
            results.failed++;
            results.errors.push(`${path}: ${error.message}`);
            console.log(`   ❌ Error: ${error.message}`);
        }

        await page.close();
    }

    await browser.close();

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);

    if (results.errors.length > 0) {
        console.log('\n🔴 ERRORS:');
        results.errors.forEach(e => console.log(`   - ${e}`));
    }

    if (results.warnings.length > 0) {
        console.log('\n🟡 WARNINGS:');
        results.warnings.forEach(w => console.log(`   - ${w}`));
    }

    console.log('\n' + '='.repeat(50));

    // Exit with proper code
    process.exit(results.failed > 0 ? 1 : 0);
}

runTests().catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
});
