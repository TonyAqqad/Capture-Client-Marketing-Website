import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Mobile Production Verification - MagneticButton Fix', () => {
  test.use({
    viewport: { width: 375, height: 812 }, // iPhone X
  });

  let consoleErrors: string[] = [];
  let consoleWarnings: string[] = [];
  let allConsoleMessages: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    consoleWarnings = [];
    allConsoleMessages = [];

    // Capture all console messages
    page.on('console', msg => {
      const text = `${msg.type()}: ${msg.text()}`;
      allConsoleMessages.push(text);

      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
      if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`PAGE ERROR: ${error.message}`);
    });
  });

  test('1. Homepage loads without crashes on mobile', async ({ page }) => {
    console.log('=== TEST 1: Homepage Load ===');

    const response = await page.goto(BASE_URL, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Check response status
    expect(response?.status()).toBe(200);

    // Take screenshot of hero section
    await page.screenshot({
      path: 'test-results/mobile-prod-homepage-hero.png',
      fullPage: false
    });

    // Check for error boundary
    const errorBoundary = page.locator('text=Something went wrong');
    expect(await errorBoundary.count()).toBe(0);

    // Verify page loaded
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });

    // Check for MagneticButton errors
    const hasMagneticError = consoleErrors.some(err =>
      err.includes('MagneticButton') || err.includes('Magnetic')
    );
    expect(hasMagneticError).toBe(false);

    // Check for hydration errors
    const hasHydrationError = consoleErrors.some(err =>
      err.includes('Hydration') || err.includes('hydration')
    );
    expect(hasHydrationError).toBe(false);

    console.log(`✅ Homepage loaded successfully`);
    console.log(`Console errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Errors found:', consoleErrors);
    }
  });

  test('2. Scroll down entire homepage on mobile', async ({ page }) => {
    console.log('=== TEST 2: Full Page Scroll ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for initial load
    await page.waitForTimeout(2000);

    // Scroll down in increments
    const scrollSteps = 5;
    const scrollDelay = 500;

    for (let i = 1; i <= scrollSteps; i++) {
      await page.evaluate((step) => {
        window.scrollTo(0, (document.body.scrollHeight / 5) * step);
      }, i);
      await page.waitForTimeout(scrollDelay);
    }

    // Take screenshot after full scroll
    await page.screenshot({
      path: 'test-results/mobile-prod-homepage-scrolled.png',
      fullPage: true
    });

    // Check no errors during scroll
    expect(consoleErrors.length).toBe(0);

    console.log(`✅ Full page scroll completed without errors`);
  });

  test('3. Mobile menu opens and works', async ({ page }) => {
    console.log('=== TEST 3: Mobile Menu ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for page to be ready
    await page.waitForTimeout(2000);

    // Find hamburger menu button
    const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)').first();

    // Wait for menu button to be visible
    await expect(menuButton).toBeVisible({ timeout: 10000 });

    // Click to open menu
    await menuButton.click();
    await page.waitForTimeout(1000);

    // Take screenshot with menu open
    await page.screenshot({
      path: 'test-results/mobile-prod-menu-open.png',
      fullPage: true
    });

    // Verify no errors after opening menu
    expect(consoleErrors.length).toBe(0);

    console.log(`✅ Mobile menu opened without errors`);
  });

  test('4. Navigate to /services on mobile', async ({ page }) => {
    console.log('=== TEST 4: Services Page ===');

    const response = await page.goto(`${BASE_URL}/services`, {
      waitUntil: 'networkidle'
    });

    expect(response?.status()).toBe(200);

    // Wait for content
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'test-results/mobile-prod-services.png',
      fullPage: false
    });

    // Check for errors
    const errorBoundary = page.locator('text=Something went wrong');
    expect(await errorBoundary.count()).toBe(0);

    expect(consoleErrors.length).toBe(0);

    console.log(`✅ Services page loaded successfully`);
  });

  test('5. Navigate to /pricing on mobile', async ({ page }) => {
    console.log('=== TEST 5: Pricing Page ===');

    const response = await page.goto(`${BASE_URL}/pricing`, {
      waitUntil: 'networkidle'
    });

    expect(response?.status()).toBe(200);

    // Wait for content
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'test-results/mobile-prod-pricing.png',
      fullPage: false
    });

    // Check for errors
    const errorBoundary = page.locator('text=Something went wrong');
    expect(await errorBoundary.count()).toBe(0);

    expect(consoleErrors.length).toBe(0);

    console.log(`✅ Pricing page loaded successfully`);
  });

  test('6. Navigate to /contact on mobile', async ({ page }) => {
    console.log('=== TEST 6: Contact Page ===');

    const response = await page.goto(`${BASE_URL}/contact`, {
      waitUntil: 'networkidle'
    });

    expect(response?.status()).toBe(200);

    // Wait for content
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'test-results/mobile-prod-contact.png',
      fullPage: false
    });

    // Check for errors
    const errorBoundary = page.locator('text=Something went wrong');
    expect(await errorBoundary.count()).toBe(0);

    expect(consoleErrors.length).toBe(0);

    console.log(`✅ Contact page loaded successfully`);
  });

  test('7. Test navigation flow: Home → Services → Pricing', async ({ page }) => {
    console.log('=== TEST 7: Navigation Flow ===');

    // Start at homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Open mobile menu
    const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Click Services link
    const servicesLink = page.locator('a[href="/services"], a:has-text("Services")').first();
    await servicesLink.click();
    await page.waitForTimeout(2000);

    expect(consoleErrors.length).toBe(0);

    // Open menu again
    await menuButton.click();
    await page.waitForTimeout(500);

    // Click Pricing link
    const pricingLink = page.locator('a[href="/pricing"], a:has-text("Pricing")').first();
    await pricingLink.click();
    await page.waitForTimeout(2000);

    // Take final screenshot
    await page.screenshot({
      path: 'test-results/mobile-prod-navigation-flow.png',
      fullPage: false
    });

    expect(consoleErrors.length).toBe(0);

    console.log(`✅ Navigation flow completed without errors`);
  });

  test.afterEach(async () => {
    // Print console summary
    if (consoleErrors.length > 0) {
      console.log('\n❌ CONSOLE ERRORS DETECTED:');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    }

    if (consoleWarnings.length > 0) {
      console.log('\n⚠️ CONSOLE WARNINGS:');
      consoleWarnings.forEach(warn => console.log(`  - ${warn}`));
    }

    if (consoleErrors.length === 0 && consoleWarnings.length === 0) {
      console.log('\n✅ No console errors or warnings');
    }
  });
});

test.describe('Critical Error Checks', () => {
  test.use({
    viewport: { width: 375, height: 812 },
  });

  test('8. Check for specific critical errors', async ({ page }) => {
    console.log('=== TEST 8: Critical Error Detection ===');

    const criticalErrors: string[] = [];

    page.on('console', msg => {
      const text = msg.text().toLowerCase();

      // Check for critical keywords
      if (
        text.includes('magneticbutton') ||
        text.includes('hydration') ||
        text.includes('cannot read properties of undefined') ||
        text.includes('typeerror') ||
        text.includes('referenceerror')
      ) {
        criticalErrors.push(`${msg.type()}: ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      criticalErrors.push(`PAGE ERROR: ${error.message}`);
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Test multiple pages
    const pagesToTest = ['/services', '/pricing', '/contact', '/how-it-works'];

    for (const path of pagesToTest) {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
    }

    if (criticalErrors.length > 0) {
      console.log('\n❌ CRITICAL ERRORS FOUND:');
      criticalErrors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No critical errors detected across all pages');
    }

    expect(criticalErrors.length).toBe(0);
  });
});
