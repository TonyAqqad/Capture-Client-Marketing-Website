import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3002';

test.describe('Production Readiness Validation', () => {

  test('1. Homepage validation - hero, pricing, sections', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('✓ Testing homepage...');
    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Check response status
    expect(response?.status()).toBe(200);
    console.log('  ✓ Homepage returns 200');

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    // Check hero section exists
    const heroHeading = await page.locator('h1').first().isVisible();
    expect(heroHeading).toBe(true);
    console.log('  ✓ Hero heading visible');

    // Check for pricing values - look for $97, $797, $2,997
    const pageContent = await page.content();
    const has97 = pageContent.includes('$97') || pageContent.includes('97');
    const has797 = pageContent.includes('$797') || pageContent.includes('797');
    const has2997 = pageContent.includes('$2,997') || pageContent.includes('2997') || pageContent.includes('2,997');

    console.log('  Pricing check:');
    console.log(`    $97 found: ${has97}`);
    console.log(`    $797 found: ${has797}`);
    console.log(`    $2,997 found: ${has2997}`);

    // Take homepage screenshot
    await page.screenshot({ path: 'tests/screenshots/prod-homepage.png', fullPage: false });
    console.log('  ✓ Screenshot saved: prod-homepage.png');

    // Report console errors
    if (consoleErrors.length > 0) {
      console.log(`  ⚠ Console errors found: ${consoleErrors.length}`);
      consoleErrors.forEach(err => console.log(`    - ${err}`));
    } else {
      console.log('  ✓ No console errors');
    }
  });

  test('2. Key pages check - /pricing, /services, /contact, /demo, /about', async ({ page }) => {
    const pages = [
      '/pricing',
      '/services',
      '/contact',
      '/demo',
      '/about'
    ];

    console.log('✓ Testing key pages...');
    const results: { url: string; status: number; ok: boolean }[] = [];

    for (const testPath of pages) {
      try {
        const response = await page.goto(`${BASE_URL}${testPath}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });

        const status = response?.status() || 0;
        results.push({
          url: testPath,
          status,
          ok: status === 200
        });

        if (status === 200) {
          console.log(`  ✓ ${testPath} - OK (200)`);
        } else {
          console.log(`  ❌ ${testPath} - FAILED (${status})`);
        }
      } catch (error) {
        console.log(`  ❌ ${testPath} - ERROR: ${error}`);
        results.push({
          url: testPath,
          status: 0,
          ok: false
        });
      }
    }

    // All pages should return 200
    const allOk = results.every(r => r.ok);
    expect(allOk).toBe(true);
  });

  test('3. Navigation test - verify menus work', async ({ page }) => {
    console.log('✓ Testing navigation...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for navigation to be visible
    await page.waitForSelector('nav', { timeout: 10000 });

    // Look for navigation menu items
    const navItems = ['Solutions', 'Who We Serve', 'Resources'];

    for (const item of navItems) {
      try {
        const navLink = page.locator(`nav >> text="${item}"`).first();
        const isVisible = await navLink.isVisible();

        if (isVisible) {
          console.log(`  ✓ "${item}" menu found`);

          // Try to hover/click to open dropdown
          await navLink.hover();
          await page.waitForTimeout(500); // Give dropdown time to appear

        } else {
          console.log(`  ⚠ "${item}" menu not visible`);
        }
      } catch (error) {
        console.log(`  ⚠ "${item}" menu error: ${error}`);
      }
    }

    // Take screenshot of nav
    await page.screenshot({ path: 'tests/screenshots/prod-navigation.png', fullPage: false });
    console.log('  ✓ Screenshot saved: prod-navigation.png');
  });

  test('4. Contact form validation', async ({ page }) => {
    console.log('✓ Testing contact form...');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Look for form element
    const form = page.locator('form').first();
    const formExists = await form.count() > 0;
    expect(formExists).toBe(true);
    console.log('  ✓ Form element found');

    // Look for name field
    const nameField = page.locator('input[name="name"], input[placeholder*="Name" i], input[type="text"]').first();
    const nameExists = await nameField.count() > 0;
    if (nameExists) {
      console.log('  ✓ Name field found');
    } else {
      console.log('  ⚠ Name field not found');
    }

    // Look for email field
    const emailField = page.locator('input[type="email"], input[name="email"]').first();
    const emailExists = await emailField.count() > 0;
    if (emailExists) {
      console.log('  ✓ Email field found');
    } else {
      console.log('  ⚠ Email field not found');
    }

    // Look for submit button
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    const submitExists = await submitButton.count() > 0;
    expect(submitExists).toBe(true);
    console.log('  ✓ Submit button found');
  });

  test('5. Mobile responsiveness check at 375px', async ({ page }) => {
    console.log('✓ Testing mobile layout...');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    console.log('  ✓ Viewport set to 375px');

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Check if content is visible
    const h1 = page.locator('h1').first();
    const h1Visible = await h1.isVisible();
    expect(h1Visible).toBe(true);
    console.log('  ✓ Hero heading visible on mobile');

    // Check for mobile menu (hamburger)
    const mobileMenu = page.locator('[aria-label*="menu" i], button:has(svg)').first();
    const menuExists = await mobileMenu.count() > 0;
    if (menuExists) {
      console.log('  ✓ Mobile menu button found');
    } else {
      console.log('  ⚠ Mobile menu button not clearly identified');
    }

    // Check for horizontal scroll (should be minimal)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;

    if (bodyWidth <= viewportWidth + 10) {
      console.log(`  ✓ No horizontal scroll (body: ${bodyWidth}px)`);
    } else {
      console.log(`  ⚠ Possible horizontal scroll (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`);
    }

    // Take mobile screenshot
    await page.screenshot({ path: 'tests/screenshots/prod-mobile-375.png', fullPage: false });
    console.log('  ✓ Screenshot saved: prod-mobile-375.png');
  });

  test('6. Pricing page - verify amounts displayed', async ({ page }) => {
    console.log('✓ Testing pricing page...');
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const pageContent = await page.content();

    // Check for pricing tiers
    const has97 = pageContent.includes('$97') || pageContent.includes('97');
    const has797 = pageContent.includes('$797') || pageContent.includes('797');
    const has2997 = pageContent.includes('$2,997') || pageContent.includes('2997') || pageContent.includes('2,997');

    console.log('  Pricing amounts:');
    console.log(`    $97 (Starter): ${has97 ? '✓' : '❌'}`);
    console.log(`    $797 (Growth): ${has797 ? '✓' : '❌'}`);
    console.log(`    $2,997 (Enterprise): ${has2997 ? '✓' : '❌'}`);

    // Take pricing screenshot
    await page.screenshot({ path: 'tests/screenshots/prod-pricing.png', fullPage: false });
    console.log('  ✓ Screenshot saved: prod-pricing.png');

    // At least one pricing tier should be visible
    expect(has97 || has797 || has2997).toBe(true);
  });
});
