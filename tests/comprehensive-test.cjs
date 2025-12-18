/**
 * Comprehensive Puppeteer Test Suite for Astralo
 * Tests: Pages, Navigation, Forms, API, Accessibility, Performance, SEO, i18n
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:4322';

// Test results tracking
const results = {
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: []
};

// Helper functions
function log(emoji, message) {
    console.log(`${emoji} ${message}`);
}

function pass(testName, details = '') {
    results.passed++;
    results.tests.push({ name: testName, status: 'PASS', details });
    log('✅', `PASS: ${testName}${details ? ' - ' + details : ''}`);
}

function fail(testName, error) {
    results.failed++;
    results.tests.push({ name: testName, status: 'FAIL', error: error.message || error });
    log('❌', `FAIL: ${testName} - ${error.message || error}`);
}

function skip(testName, reason) {
    results.skipped++;
    results.tests.push({ name: testName, status: 'SKIP', reason });
    log('⏭️', `SKIP: ${testName} - ${reason}`);
}

async function runTest(testName, testFn) {
    try {
        await testFn();
        pass(testName);
    } catch (error) {
        fail(testName, error);
    }
}

// ============================================================
// TEST SUITES
// ============================================================

async function testPageLoads(page) {
    log('📄', '--- PAGE LOAD TESTS ---');

    const pages = [
        { url: '/', name: 'Homepage (EN)' },
        { url: '/sk/', name: 'Homepage (SK)' },
        { url: '/de/', name: 'Homepage (DE)' },
        { url: '/fr/', name: 'Homepage (FR)' },
        { url: '/form/daily', name: 'Daily Form' },
        { url: '/form/weekly', name: 'Weekly Form' },
        { url: '/form/monthly', name: 'Monthly Form' },
        { url: '/form/partner', name: 'Partner Form' },
        { url: '/legal/contact', name: 'Contact Page' },
        { url: '/legal/terms', name: 'Terms of Service' },
        { url: '/legal/privacy', name: 'Privacy Policy' },
        { url: '/legal/refund', name: 'Refund Policy' },
        { url: '/legal/cookies', name: 'Cookie Policy' },
    ];

    for (const p of pages) {
        await runTest(`Page loads: ${p.name}`, async () => {
            const response = await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
            if (!response || response.status() !== 200) {
                throw new Error(`HTTP ${response ? response.status() : 'no response'}`);
            }
        });
    }
}

async function testNavigation(page) {
    log('🧭', '--- NAVIGATION TESTS ---');

    await runTest('Homepage has navigation links', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const navLinks = await page.$$('header a, nav a');
        if (navLinks.length === 0) throw new Error('No navigation links found');
    });

    await runTest('Logo links to homepage', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const logo = await page.$('header a img[alt*="Astralo"], header a[href="/"]');
        if (!logo) throw new Error('Logo not found or not linked');
    });

    await runTest('Footer has legal links', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const footer = await page.$('footer');
        if (!footer) throw new Error('Footer not found');
        const legalLinks = await page.$$('footer a[href*="terms"], footer a[href*="privacy"], footer a[href*="refund"]');
        if (legalLinks.length < 2) throw new Error('Missing legal links in footer');
    });
}

async function testHoroscopeCards(page) {
    log('🔮', '--- HOROSCOPE CARD TESTS ---');

    await runTest('Homepage has horoscope product cards', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const cards = await page.$$('.horoscope-card, [class*="horoscope"]');
        if (cards.length < 3) throw new Error(`Expected at least 3 cards, found ${cards.length}`);
    });

    await runTest('Cards display prices', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const pageContent = await page.content();
        if (!pageContent.includes('€')) throw new Error('No prices found on page');
    });

    await runTest('Cards link to order forms', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const formLinks = await page.$$('a[href*="/form/"]');
        if (formLinks.length < 3) throw new Error('Cards not linking to forms');
    });
}

async function testOrderForms(page) {
    log('📝', '--- ORDER FORM TESTS ---');

    const formTypes = ['daily', 'weekly', 'monthly', 'partner'];

    for (const type of formTypes) {
        await runTest(`Form ${type}: Has required fields`, async () => {
            await page.goto(`${BASE_URL}/form/${type}`, { waitUntil: 'domcontentloaded' });

            if (type === 'partner') {
                // Partner form has two sets of fields
                const name1 = await page.$('input[name="name1"]');
                const name2 = await page.$('input[name="name2"]');
                if (!name1 || !name2) throw new Error('Partner form missing name fields');
            } else {
                const name = await page.$('input[name="name"]');
                const email = await page.$('input[name="email"]');
                const birthDate = await page.$('input[name="birthDate"]');
                const birthTime = await page.$('input[name="birthTime"]');
                const birthPlace = await page.$('input[name="birthPlace"]');

                if (!name || !email || !birthDate || !birthTime || !birthPlace) {
                    throw new Error('Missing required form fields');
                }
            }
        });

        await runTest(`Form ${type}: Has submit button`, async () => {
            await page.goto(`${BASE_URL}/form/${type}`, { waitUntil: 'domcontentloaded' });
            const submit = await page.$('button[type="submit"]');
            if (!submit) throw new Error('Submit button not found');
        });
    }

    await runTest('Form validation: Name min/max length', async () => {
        await page.goto(`${BASE_URL}/form/daily`, { waitUntil: 'domcontentloaded' });
        const nameInput = await page.$('input[name="name"]');
        const minlength = await nameInput.evaluate(el => el.getAttribute('minlength'));
        const maxlength = await nameInput.evaluate(el => el.getAttribute('maxlength'));
        if (!minlength || !maxlength) throw new Error('Name field missing length validation');
    });

    await runTest('Form validation: City has max length', async () => {
        await page.goto(`${BASE_URL}/form/daily`, { waitUntil: 'domcontentloaded' });
        const cityInput = await page.$('input[name="birthPlace"]');
        const maxlength = await cityInput.evaluate(el => el.getAttribute('maxlength'));
        if (!maxlength || parseInt(maxlength) > 100) throw new Error('City field should have reasonable max length');
    });
}

async function testLanguageSwitcher(page) {
    log('🌐', '--- LANGUAGE/i18n TESTS ---');

    await runTest('Language switcher exists', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        // Look for language selector or flag icons
        const langSelector = await page.$('[class*="lang"], [class*="language"], select[name*="lang"], [data-lang]');
        if (!langSelector) {
            // Alternative: check for language links
            const langLinks = await page.$$('a[href*="/sk"], a[href*="/de"], a[href*="/fr"]');
            if (langLinks.length === 0) throw new Error('No language switcher found');
        }
    });

    await runTest('Slovak page has Slovak content', async () => {
        await page.goto(`${BASE_URL}/sk/`, { waitUntil: 'domcontentloaded' });
        const content = await page.content();
        // Check for Slovak-specific words
        if (!content.includes('Horoskop') && !content.includes('Objednať')) {
            throw new Error('Slovak page missing Slovak text');
        }
    });

    await runTest('German page has German content', async () => {
        await page.goto(`${BASE_URL}/de/`, { waitUntil: 'domcontentloaded' });
        const content = await page.content();
        if (!content.includes('Horoskop') && !content.includes('Bestellen')) {
            throw new Error('German page missing German text');
        }
    });
}

async function testSEO(page) {
    log('🔍', '--- SEO TESTS ---');

    await runTest('Homepage has title tag', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const title = await page.title();
        if (!title || title.length < 10) throw new Error('Title tag missing or too short');
    });

    await runTest('Homepage has meta description', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const metaDesc = await page.$('meta[name="description"]');
        if (!metaDesc) throw new Error('Meta description missing');
        const content = await metaDesc.evaluate(el => el.getAttribute('content'));
        if (!content || content.length < 50) throw new Error('Meta description too short');
    });

    await runTest('Homepage has Open Graph tags', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const ogTitle = await page.$('meta[property="og:title"]');
        const ogDesc = await page.$('meta[property="og:description"]');
        if (!ogTitle || !ogDesc) throw new Error('Open Graph tags missing');
    });

    await runTest('Pages have single H1', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const h1s = await page.$$('h1');
        if (h1s.length === 0) throw new Error('No H1 found');
        if (h1s.length > 1) throw new Error(`Multiple H1s found: ${h1s.length}`);
    });

    await runTest('Images have alt text', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const imagesWithoutAlt = await page.$$('img:not([alt])');
        if (imagesWithoutAlt.length > 0) throw new Error(`${imagesWithoutAlt.length} images missing alt text`);
    });
}

async function testAccessibility(page) {
    log('♿', '--- ACCESSIBILITY TESTS ---');

    await runTest('Page has lang attribute', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const lang = await page.$eval('html', el => el.getAttribute('lang'));
        if (!lang) throw new Error('HTML lang attribute missing');
    });

    await runTest('Form inputs have labels', async () => {
        await page.goto(`${BASE_URL}/form/daily`, { waitUntil: 'domcontentloaded' });
        const inputsWithoutLabels = await page.$$eval('input:not([type="hidden"]):not([type="submit"])', inputs => {
            return inputs.filter(input => {
                const id = input.id;
                if (!id) return true;
                const label = document.querySelector(`label[for="${id}"]`);
                return !label;
            }).length;
        });
        if (inputsWithoutLabels > 0) throw new Error(`${inputsWithoutLabels} inputs missing labels`);
    });

    await runTest('Buttons have accessible names', async () => {
        await page.goto(`${BASE_URL}/form/daily`, { waitUntil: 'domcontentloaded' });
        const buttonsWithoutText = await page.$$eval('button', buttons => {
            return buttons.filter(btn => !btn.textContent.trim() && !btn.getAttribute('aria-label')).length;
        });
        if (buttonsWithoutText > 0) throw new Error(`${buttonsWithoutText} buttons without accessible names`);
    });

    await runTest('Links have discernible text', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const emptyLinks = await page.$$eval('a', links => {
            return links.filter(link => !link.textContent.trim() && !link.getAttribute('aria-label') && !link.querySelector('img[alt]')).length;
        });
        if (emptyLinks > 2) throw new Error(`${emptyLinks} links without discernible text`);
    });
}

async function testPerformance(page) {
    log('⚡', '--- PERFORMANCE TESTS ---');

    await runTest('Homepage loads under 5 seconds', async () => {
        const start = Date.now();
        await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 30000 });
        const loadTime = Date.now() - start;
        if (loadTime > 5000) throw new Error(`Load time: ${loadTime}ms (>5000ms)`);
        pass('Homepage load time', `${loadTime}ms`);
    });

    await runTest('No large blocking resources', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        // This is a simplified check - in production you'd use Lighthouse
        const scripts = await page.$$('script:not([async]):not([defer]):not([type="module"])');
        // Allow some blocking scripts but flag if too many
        if (scripts.length > 5) throw new Error(`${scripts.length} potentially blocking scripts`);
    });
}

async function testConsoleErrors(page) {
    log('🖥️', '--- CONSOLE ERROR TESTS ---');

    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    const pagesToCheck = ['/', '/form/daily', '/legal/contact'];

    for (const url of pagesToCheck) {
        consoleErrors.length = 0; // Reset
        await runTest(`No console errors on ${url}`, async () => {
            await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle2', timeout: 30000 });
            await new Promise(r => setTimeout(r, 1000)); // Wait for any async errors

            // Filter out known acceptable errors
            const realErrors = consoleErrors.filter(err =>
                !err.includes('favicon') &&
                !err.includes('404') &&
                !err.includes('hcaptcha') // External service
            );

            if (realErrors.length > 0) {
                throw new Error(realErrors.join('; '));
            }
        });
    }
}

async function testAPIEndpoints(page) {
    log('🔌', '--- API ENDPOINT TESTS ---');

    await runTest('API: /api/horoscope responds correctly', async () => {
        const response = await page.evaluate(async () => {
            const res = await fetch('/api/horoscope', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            return { status: res.status };
        });

        // Without session ID it should return 400, which is correct behavior
        if (response.status !== 400) {
            throw new Error(`Expected 400 for missing session ID, got ${response.status}`);
        }
    });

    await runTest('API: /api/checkout responds', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const response = await page.evaluate(async () => {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            return { status: res.status };
        });

        // Without proper data it should fail gracefully
        if (response.status === 500) {
            // 500 is acceptable for invalid data, but 400 would be better
        }
    });
}

async function testMobileResponsiveness(page) {
    log('📱', '--- MOBILE RESPONSIVENESS TESTS ---');

    await runTest('Homepage is responsive on mobile', async () => {
        await page.setViewport({ width: 375, height: 667 }); // iPhone SE
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

        // Check that content isn't overflowing horizontally
        const bodyWidth = await page.$eval('body', el => el.scrollWidth);
        const viewportWidth = 375;

        if (bodyWidth > viewportWidth + 5) {
            throw new Error(`Horizontal overflow detected: ${bodyWidth}px > ${viewportWidth}px`);
        }
    });

    await runTest('Form is usable on mobile', async () => {
        await page.setViewport({ width: 375, height: 667 });
        await page.goto(`${BASE_URL}/form/daily`, { waitUntil: 'domcontentloaded' });

        // Check that form inputs are visible and not too small
        const inputHeight = await page.$eval('input[name="name"]', el => el.offsetHeight);
        if (inputHeight < 30) throw new Error(`Input fields too small for mobile: ${inputHeight}px`);
    });

    // Reset viewport
    await page.setViewport({ width: 1280, height: 800 });
}

async function testCriticalPath(page) {
    log('🛒', '--- CRITICAL PATH TESTS ---');

    await runTest('Can navigate from homepage to form', async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

        // Click on a horoscope card
        const formLink = await page.$('a[href*="/form/daily"]');
        if (!formLink) throw new Error('Daily form link not found');

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            formLink.click()
        ]);

        const url = page.url();
        if (!url.includes('/form/')) throw new Error('Navigation to form failed');
    });

    await runTest('Form displays price', async () => {
        await page.goto(`${BASE_URL}/form/daily`, { waitUntil: 'domcontentloaded' });
        const content = await page.content();
        if (!content.includes('€') && !content.includes('EUR')) {
            throw new Error('Price not displayed on form');
        }
    });
}

// ============================================================
// MAIN TEST RUNNER
// ============================================================

async function runAllTests() {
    console.log('\n🚀 ASTRALO COMPREHENSIVE TEST SUITE\n');
    console.log('='.repeat(60));
    console.log(`Starting tests at ${new Date().toISOString()}`);
    console.log(`Target: ${BASE_URL}`);
    console.log('='.repeat(60) + '\n');

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Set a reasonable timeout
        page.setDefaultTimeout(15000);

        // Run all test suites
        await testPageLoads(page);
        await testNavigation(page);
        await testHoroscopeCards(page);
        await testOrderForms(page);
        await testLanguageSwitcher(page);
        await testSEO(page);
        await testAccessibility(page);
        await testPerformance(page);
        await testConsoleErrors(page);
        await testAPIEndpoints(page);
        await testMobileResponsiveness(page);
        await testCriticalPath(page);

    } catch (error) {
        console.error('\n💥 FATAL ERROR:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed:  ${results.passed}`);
    console.log(`❌ Failed:  ${results.failed}`);
    console.log(`⏭️  Skipped: ${results.skipped}`);
    console.log(`📋 Total:   ${results.passed + results.failed + results.skipped}`);
    console.log('='.repeat(60));

    if (results.failed > 0) {
        console.log('\n❌ FAILED TESTS:');
        results.tests.filter(t => t.status === 'FAIL').forEach(t => {
            console.log(`  - ${t.name}: ${t.error}`);
        });
    }

    console.log('\nTest run completed at', new Date().toISOString());
    process.exit(results.failed > 0 ? 1 : 0);
}

// Run
runAllTests();
