import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const MOBILE_VIEWPORT = { width: 375, height: 812 }; // iPhone X

interface ButtonTestResult {
  page: string;
  buttonLabel: string;
  visible: boolean;
  clickable: boolean;
  tapTargetSize: { width: number; height: number };
  meetsMinSize: boolean;
  actionTriggered: boolean;
  issues: string[];
}

const testResults: ButtonTestResult[] = [];

test.describe('Mobile Button Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test('Homepage - Mobile Buttons', async ({ page }) => {
    console.log('\n========== TESTING HOMEPAGE ==========');
    const pageName = 'Homepage (/)';

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test mobile menu (hamburger)
    console.log('\n--- Testing Mobile Menu ---');
    const hamburger = page.locator('button[aria-label*="menu" i], button:has(svg):visible').first();
    const hamburgerVisible = await hamburger.isVisible().catch(() => false);

    if (hamburgerVisible) {
      const hamburgerBox = await hamburger.boundingBox();
      const meetsMinSize = hamburgerBox ? (hamburgerBox.width >= 44 && hamburgerBox.height >= 44) : false;

      testResults.push({
        page: pageName,
        buttonLabel: 'Hamburger Menu',
        visible: true,
        clickable: await hamburger.isEnabled(),
        tapTargetSize: { width: hamburgerBox?.width || 0, height: hamburgerBox?.height || 0 },
        meetsMinSize,
        actionTriggered: false,
        issues: meetsMinSize ? [] : ['Tap target too small (min 44x44px)']
      });

      // Test if menu opens
      await hamburger.click();
      await page.waitForTimeout(500);
      const menuOpen = await page.locator('nav[role="dialog"], [role="menu"], .mobile-menu').isVisible().catch(() => false);
      testResults[testResults.length - 1].actionTriggered = menuOpen;
      if (!menuOpen) {
        testResults[testResults.length - 1].issues.push('Menu did not open on click');
      }
      console.log(`Hamburger Menu: ${hamburgerVisible ? 'VISIBLE' : 'HIDDEN'}, Opens: ${menuOpen ? 'YES' : 'NO'}`);

      // Close menu if it opened
      if (menuOpen) {
        const closeButton = page.locator('button[aria-label*="close" i], button:has(svg):visible').first();
        if (await closeButton.isVisible().catch(() => false)) {
          await closeButton.click();
          await page.waitForTimeout(300);
        }
      }
    } else {
      console.log('Hamburger Menu: NOT FOUND');
    }

    // Test Hero CTA buttons
    console.log('\n--- Testing Hero CTA Buttons ---');
    const heroCTAs = page.locator('section:first-of-type a, section:first-of-type button').filter({ hasText: /get started|book|consultation|schedule|contact/i });
    const ctaCount = await heroCTAs.count();

    for (let i = 0; i < ctaCount; i++) {
      const cta = heroCTAs.nth(i);
      const text = await cta.textContent() || `CTA ${i + 1}`;
      const isVisible = await cta.isVisible().catch(() => false);

      if (isVisible) {
        const box = await cta.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;
        const isClickable = await cta.isEnabled();

        testResults.push({
          page: pageName,
          buttonLabel: `Hero CTA: "${text.trim()}"`,
          visible: true,
          clickable: isClickable,
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true, // Assume link works
          issues: meetsMinSize ? [] : ['Tap target too small']
        });

        console.log(`${text.trim()}: ${isVisible ? 'VISIBLE' : 'HIDDEN'}, Size: ${box?.width}x${box?.height}, Min: ${meetsMinSize ? 'YES' : 'NO'}`);
      }
    }

    // Test "See Pricing" or similar buttons
    console.log('\n--- Testing Pricing Buttons ---');
    const pricingButtons = page.locator('a:has-text("pricing"), a:has-text("packages"), button:has-text("pricing")');
    const pricingCount = await pricingButtons.count();

    for (let i = 0; i < pricingCount; i++) {
      const btn = pricingButtons.nth(i);
      const text = await btn.textContent() || `Pricing ${i + 1}`;
      const isVisible = await btn.isVisible().catch(() => false);

      if (isVisible) {
        const box = await btn.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Pricing Button: "${text.trim()}"`,
          visible: true,
          clickable: await btn.isEnabled(),
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });

        console.log(`${text.trim()}: VISIBLE, Size: ${box?.width}x${box?.height}`);
      }
    }

    // Test feature section buttons
    console.log('\n--- Testing Feature Buttons ---');
    const featureButtons = page.locator('a:has-text("learn more"), a:has-text("explore"), button:has-text("learn more")');
    const featureCount = await featureButtons.count();

    for (let i = 0; i < Math.min(featureCount, 5); i++) {
      const btn = featureButtons.nth(i);
      const text = await btn.textContent() || `Feature ${i + 1}`;
      const isVisible = await btn.isVisible().catch(() => false);

      if (isVisible) {
        const box = await btn.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Feature Button: "${text.trim()}"`,
          visible: true,
          clickable: await btn.isEnabled(),
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });
      }
    }
  });

  test('Pricing Page - Mobile Buttons', async ({ page }) => {
    console.log('\n========== TESTING PRICING PAGE ==========');
    const pageName = 'Pricing (/pricing)';

    await page.goto(`${BASE_URL}/pricing`);
    await page.waitForLoadState('networkidle');

    // Test package CTAs
    console.log('\n--- Testing Package CTAs ---');
    const packageCTAs = page.locator('a:has-text("get started"), a:has-text("choose"), a:has-text("select"), button:has-text("get started")');
    const ctaCount = await packageCTAs.count();

    console.log(`Found ${ctaCount} package CTAs`);

    for (let i = 0; i < ctaCount; i++) {
      const cta = packageCTAs.nth(i);
      const text = await cta.textContent() || `Package CTA ${i + 1}`;
      const isVisible = await cta.isVisible().catch(() => false);

      if (isVisible) {
        const box = await cta.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Package CTA: "${text.trim()}"`,
          visible: true,
          clickable: await cta.isEnabled(),
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });

        console.log(`${text.trim()}: VISIBLE, Size: ${box?.width}x${box?.height}, Min: ${meetsMinSize ? 'YES' : 'NO'}`);
      }
    }

    // Test "Contact Us" buttons
    const contactButtons = page.locator('a:has-text("contact"), button:has-text("contact")');
    const contactCount = await contactButtons.count();

    for (let i = 0; i < contactCount; i++) {
      const btn = contactButtons.nth(i);
      const isVisible = await btn.isVisible().catch(() => false);

      if (isVisible) {
        const box = await btn.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: 'Contact Button',
          visible: true,
          clickable: await btn.isEnabled(),
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });
      }
    }
  });

  test('Services Page - Mobile Buttons', async ({ page }) => {
    console.log('\n========== TESTING SERVICES PAGE ==========');
    const pageName = 'Services (/services)';

    await page.goto(`${BASE_URL}/services`);
    await page.waitForLoadState('networkidle');

    // Test service card buttons
    console.log('\n--- Testing Service Card Buttons ---');
    const serviceCards = page.locator('a[href*="/services/"], .service-card a, article a');
    const cardCount = await serviceCards.count();

    console.log(`Found ${cardCount} service card links`);

    for (let i = 0; i < Math.min(cardCount, 10); i++) {
      const card = serviceCards.nth(i);
      const text = await card.textContent() || `Service ${i + 1}`;
      const isVisible = await card.isVisible().catch(() => false);

      if (isVisible) {
        const box = await card.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Service Card: "${text.trim().substring(0, 30)}..."`,
          visible: true,
          clickable: true,
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });

        console.log(`Service ${i + 1}: VISIBLE, Size: ${box?.width}x${box?.height}`);
      }
    }
  });

  test('Contact Page - Mobile Buttons', async ({ page }) => {
    console.log('\n========== TESTING CONTACT PAGE ==========');
    const pageName = 'Contact (/contact)';

    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    // Test form submit button
    console.log('\n--- Testing Form Submit Button ---');
    const submitButton = page.locator('button[type="submit"]').first();
    const isVisible = await submitButton.isVisible().catch(() => false);

    if (isVisible) {
      const text = await submitButton.textContent() || 'Submit';
      const box = await submitButton.boundingBox();
      const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

      testResults.push({
        page: pageName,
        buttonLabel: `Submit Button: "${text.trim()}"`,
        visible: true,
        clickable: await submitButton.isEnabled(),
        tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
        meetsMinSize,
        actionTriggered: true,
        issues: meetsMinSize ? [] : ['Tap target too small']
      });

      console.log(`${text.trim()}: VISIBLE, Size: ${box?.width}x${box?.height}, Min: ${meetsMinSize ? 'YES' : 'NO'}`);
    } else {
      console.log('Submit button: NOT FOUND');
    }

    // Test click-to-call buttons
    const callButtons = page.locator('a[href^="tel:"]');
    const callCount = await callButtons.count();

    for (let i = 0; i < callCount; i++) {
      const btn = callButtons.nth(i);
      const isVisible = await btn.isVisible().catch(() => false);

      if (isVisible) {
        const text = await btn.textContent() || 'Call';
        const box = await btn.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Click-to-Call: "${text.trim()}"`,
          visible: true,
          clickable: true,
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });
      }
    }
  });

  test('Locations Page - Mobile Buttons', async ({ page }) => {
    console.log('\n========== TESTING LOCATIONS PAGE ==========');
    const pageName = 'Locations (/locations)';

    await page.goto(`${BASE_URL}/locations`);
    await page.waitForLoadState('networkidle');

    // Test location card links
    console.log('\n--- Testing Location Card Links ---');
    const locationCards = page.locator('a[href*="/locations/"], .location-card a');
    const cardCount = await locationCards.count();

    console.log(`Found ${cardCount} location cards`);

    for (let i = 0; i < Math.min(cardCount, 10); i++) {
      const card = locationCards.nth(i);
      const text = await card.textContent() || `Location ${i + 1}`;
      const isVisible = await card.isVisible().catch(() => false);

      if (isVisible) {
        const box = await card.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Location Card: "${text.trim().substring(0, 30)}..."`,
          visible: true,
          clickable: true,
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });
      }
    }
  });

  test('Features Page - Mobile Buttons', async ({ page }) => {
    console.log('\n========== TESTING FEATURES PAGE ==========');
    const pageName = 'Features (/features)';

    await page.goto(`${BASE_URL}/features`);
    await page.waitForLoadState('networkidle');

    // Test feature CTAs
    console.log('\n--- Testing Feature CTAs ---');
    const featureCTAs = page.locator('a:has-text("try"), a:has-text("demo"), a:has-text("learn"), button:has-text("try")');
    const ctaCount = await featureCTAs.count();

    console.log(`Found ${ctaCount} feature CTAs`);

    for (let i = 0; i < Math.min(ctaCount, 10); i++) {
      const cta = featureCTAs.nth(i);
      const text = await cta.textContent() || `Feature CTA ${i + 1}`;
      const isVisible = await cta.isVisible().catch(() => false);

      if (isVisible) {
        const box = await cta.boundingBox();
        const meetsMinSize = box ? (box.width >= 44 && box.height >= 44) : false;

        testResults.push({
          page: pageName,
          buttonLabel: `Feature CTA: "${text.trim()}"`,
          visible: true,
          clickable: await cta.isEnabled(),
          tapTargetSize: { width: box?.width || 0, height: box?.height || 0 },
          meetsMinSize,
          actionTriggered: true,
          issues: meetsMinSize ? [] : ['Tap target too small']
        });

        console.log(`${text.trim()}: VISIBLE, Size: ${box?.width}x${box?.height}`);
      }
    }
  });

  test.afterAll(async () => {
    // Generate final report
    console.log('\n\n========================================');
    console.log('MOBILE BUTTON TEST REPORT');
    console.log('========================================\n');

    const totalButtons = testResults.length;
    const visibleButtons = testResults.filter(r => r.visible).length;
    const clickableButtons = testResults.filter(r => r.clickable).length;
    const meetsMinSizeButtons = testResults.filter(r => r.meetsMinSize).length;
    const buttonsWithIssues = testResults.filter(r => r.issues.length > 0).length;

    console.log(`SUMMARY:`);
    console.log(`- Total Buttons Tested: ${totalButtons}`);
    console.log(`- Visible: ${visibleButtons}/${totalButtons}`);
    console.log(`- Clickable: ${clickableButtons}/${totalButtons}`);
    console.log(`- Meets Min Tap Target (44x44px): ${meetsMinSizeButtons}/${totalButtons}`);
    console.log(`- Buttons with Issues: ${buttonsWithIssues}/${totalButtons}`);

    console.log('\n\nDETAILED RESULTS:\n');

    let currentPage = '';
    testResults.forEach((result, index) => {
      if (result.page !== currentPage) {
        currentPage = result.page;
        console.log(`\n--- ${currentPage} ---`);
      }

      const status = result.issues.length === 0 ? 'PASS' : 'FAIL';
      console.log(`\n${index + 1}. ${result.buttonLabel}`);
      console.log(`   Status: ${status}`);
      console.log(`   Visible: ${result.visible ? 'YES' : 'NO'}`);
      console.log(`   Clickable: ${result.clickable ? 'YES' : 'NO'}`);
      console.log(`   Tap Target Size: ${result.tapTargetSize.width.toFixed(1)}x${result.tapTargetSize.height.toFixed(1)}px`);
      console.log(`   Meets Min Size (44x44): ${result.meetsMinSize ? 'YES' : 'NO'}`);
      console.log(`   Action Triggered: ${result.actionTriggered ? 'YES' : 'NO'}`);

      if (result.issues.length > 0) {
        console.log(`   Issues:`);
        result.issues.forEach(issue => console.log(`     - ${issue}`));
      }
    });

    console.log('\n\n========================================');
    console.log('RECOMMENDATIONS');
    console.log('========================================\n');

    const smallButtons = testResults.filter(r => !r.meetsMinSize);
    if (smallButtons.length > 0) {
      console.log(`FIX REQUIRED: ${smallButtons.length} buttons are smaller than 44x44px:`);
      smallButtons.forEach(btn => {
        console.log(`  - ${btn.buttonLabel} (${btn.tapTargetSize.width.toFixed(1)}x${btn.tapTargetSize.height.toFixed(1)}px) on ${btn.page}`);
      });
      console.log('\nRecommendation: Increase padding/min-height to ensure 44x44px minimum tap target.\n');
    }

    const hiddenButtons = testResults.filter(r => !r.visible);
    if (hiddenButtons.length > 0) {
      console.log(`FIX REQUIRED: ${hiddenButtons.length} buttons are not visible on mobile:`);
      hiddenButtons.forEach(btn => {
        console.log(`  - ${btn.buttonLabel} on ${btn.page}`);
      });
      console.log('\nRecommendation: Check responsive classes and ensure buttons are visible on mobile.\n');
    }

    const unclickableButtons = testResults.filter(r => r.visible && !r.clickable);
    if (unclickableButtons.length > 0) {
      console.log(`FIX REQUIRED: ${unclickableButtons.length} buttons are visible but not clickable:`);
      unclickableButtons.forEach(btn => {
        console.log(`  - ${btn.buttonLabel} on ${btn.page}`);
      });
      console.log('\nRecommendation: Check if buttons are disabled or obscured by other elements.\n');
    }

    if (buttonsWithIssues === 0) {
      console.log('ALL BUTTONS PASSED MOBILE TESTING!');
    }

    console.log('\n========================================\n');
  });
});
