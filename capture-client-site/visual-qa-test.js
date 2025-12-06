const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🧪 VISUAL QA TEST - PORT 3005\n');
  console.log('━'.repeat(60));

  // Collect console messages
  const consoleMessages = [];
  const consoleErrors = [];

  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(`Page Error: ${error.message}`);
  });

  try {
    // STEP 1 & 2: Navigate to homepage and wait
    console.log('\n📍 STEP 1-2: Navigating to http://localhost:3005...');
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    console.log('✅ Homepage loaded successfully');

    // STEP 3: Take desktop homepage screenshot
    console.log('\n📸 STEP 3: Taking desktop homepage screenshot...');
    const screenshotDir = path.join(__dirname, '..', '.playwright-mcp');
    await page.screenshot({
      path: path.join(screenshotDir, 'final-homepage-desktop.png'),
      fullPage: true
    });
    console.log('✅ Screenshot saved: final-homepage-desktop.png');

    // STEP 4: Check console errors (will report at end)
    console.log('\n🔍 STEP 4: Monitoring console errors...');

    // STEP 5: Test mobile view
    console.log('\n📱 STEP 5: Testing mobile view (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(screenshotDir, 'final-homepage-mobile.png'),
      fullPage: true
    });
    console.log('✅ Screenshot saved: final-homepage-mobile.png');

    // STEP 6: Test pricing page
    console.log('\n💰 STEP 6: Testing pricing page...');
    await page.setViewportSize({ width: 1920, height: 1080 }); // Back to desktop
    await page.goto('http://localhost:3005/pricing', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(screenshotDir, 'final-pricing.png'),
      fullPage: true
    });
    console.log('✅ Screenshot saved: final-pricing.png');

    // STEP 7: Generate report
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 VISUAL QA TEST REPORT\n');
    console.log('━'.repeat(60));

    console.log('\n📸 SCREENSHOTS TAKEN:');
    console.log('  1. final-homepage-desktop.png (Desktop view - Full page)');
    console.log('  2. final-homepage-mobile.png (Mobile 375x812 - Full page)');
    console.log('  3. final-pricing.png (Pricing page - Full page)');

    console.log('\n🐛 CONSOLE ERRORS:');
    if (consoleErrors.length === 0) {
      console.log('  ✅ NO ERRORS - Clean console output!');
    } else {
      console.log(`  ❌ Found ${consoleErrors.length} error(s):`);
      consoleErrors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    console.log('\n📝 CONSOLE SUMMARY:');
    const errorCount = consoleMessages.filter(m => m.type === 'error').length;
    const warningCount = consoleMessages.filter(m => m.type === 'warning').length;
    const infoCount = consoleMessages.filter(m => m.type === 'log' || m.type === 'info').length;
    console.log(`  - Errors: ${errorCount}`);
    console.log(`  - Warnings: ${warningCount}`);
    console.log(`  - Info/Logs: ${infoCount}`);

    console.log('\n🏁 FINAL VERDICT:');
    if (consoleErrors.length === 0) {
      console.log('  ✅ PASS - All tests completed successfully with no errors!');
    } else {
      console.log('  ⚠️  PASS WITH WARNINGS - Tests completed but console errors detected');
    }

    console.log('\n' + '━'.repeat(60));

  } catch (error) {
    console.log('\n❌ TEST FAILED:', error.message);
    console.log('\n🏁 FINAL VERDICT: ❌ FAIL');
  } finally {
    await browser.close();
  }
})();
