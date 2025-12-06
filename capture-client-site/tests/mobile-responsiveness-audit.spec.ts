import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const MOBILE_VIEWPORT = { width: 390, height: 844 }; // iPhone 14 Pro
const MIN_TOUCH_TARGET = 44; // 44x44px minimum for touch targets

test.describe('Mobile Responsiveness Audit - Capture Client', () => {
  test.use({ viewport: MOBILE_VIEWPORT });

  test('1. Mobile Homepage Audit', async ({ page }) => {
    console.log('\n=== MOBILE HOMEPAGE AUDIT ===');
    console.log(`Viewport: ${MOBILE_VIEWPORT.width}x${MOBILE_VIEWPORT.height}`);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Take screenshot of mobile hero
    await page.screenshot({
      path: '.playwright-mcp/mobile-homepage-hero.png',
      fullPage: false
    });
    console.log('✅ Screenshot saved: mobile-homepage-hero.png');

    // Check header/hamburger menu
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has(svg):visible').first();
    const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);
    console.log(`Mobile Menu Button: ${isMobileMenuVisible ? '✅ PRESENT' : '❌ NOT FOUND'}`);

    // Check hero text readability
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    const heroText = await heroHeading.textContent();
    console.log(`Hero Heading: "${heroText?.substring(0, 50)}..."`);

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = MOBILE_VIEWPORT.width;
    const hasHorizontalScroll = bodyWidth > viewportWidth + 5; // 5px tolerance
    console.log(`Body Width: ${bodyWidth}px | Viewport: ${viewportWidth}px`);
    console.log(`Horizontal Scroll: ${hasHorizontalScroll ? '❌ PRESENT' : '✅ NONE'}`);

    // Check primary CTA button size
    const primaryCTA = page.locator('a:has-text("Get Started"), button:has-text("Get Started"), a:has-text("Start Free"), button:has-text("Start Free")').first();
    if (await primaryCTA.isVisible().catch(() => false)) {
      const ctaBox = await primaryCTA.boundingBox();
      if (ctaBox) {
        const isTappable = ctaBox.width >= MIN_TOUCH_TARGET && ctaBox.height >= MIN_TOUCH_TARGET;
        console.log(`Primary CTA Size: ${Math.round(ctaBox.width)}x${Math.round(ctaBox.height)}px ${isTappable ? '✅ TAPPABLE' : '⚠️ TOO SMALL'}`);
      }
    }

    // Scroll down and capture sections
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '.playwright-mcp/mobile-homepage-scrolled.png',
      fullPage: false
    });
    console.log('✅ Screenshot saved: mobile-homepage-scrolled.png');

    // Full page screenshot
    await page.screenshot({
      path: '.playwright-mcp/mobile-homepage-full.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: mobile-homepage-full.png');
  });

  test('2. Mobile Navigation Menu Test', async ({ page }) => {
    console.log('\n=== MOBILE NAVIGATION MENU TEST ===');

    await page.goto(BASE_URL);

    // Find and click mobile menu button
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has(svg)').first();

    if (await mobileMenuButton.isVisible().catch(() => false)) {
      console.log('✅ Mobile menu button found');

      await mobileMenuButton.click();
      await page.waitForTimeout(500); // Wait for animation

      await page.screenshot({
        path: '.playwright-mcp/mobile-menu-open.png',
        fullPage: false
      });
      console.log('✅ Screenshot saved: mobile-menu-open.png');

      // Check if nav items are visible
      const navLinks = page.locator('nav a, [role="navigation"] a');
      const navCount = await navLinks.count();
      console.log(`Navigation Links Visible: ${navCount}`);

      // Check for close button
      const closeButton = page.locator('button[aria-label*="close" i], button:has-text("×")');
      const hasCloseButton = await closeButton.isVisible().catch(() => false);
      console.log(`Close Button Present: ${hasCloseButton ? '✅ YES' : '⚠️ NO'}`);

      // Try to close menu
      if (hasCloseButton) {
        await closeButton.click();
        await page.waitForTimeout(300);
        console.log('✅ Menu closed successfully');
      }
    } else {
      console.log('⚠️ Mobile menu button not found - may be desktop-only nav');
    }
  });

  test('3. Pricing Page Mobile Audit', async ({ page }) => {
    console.log('\n=== PRICING PAGE MOBILE AUDIT ===');

    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });

    // Screenshot hero
    await page.screenshot({
      path: '.playwright-mcp/mobile-pricing-hero.png',
      fullPage: false
    });
    console.log('✅ Screenshot saved: mobile-pricing-hero.png');

    // Check pricing cards stack vertically
    const pricingCards = page.locator('[class*="pricing"], [class*="package"], [class*="tier"]').filter({ hasText: '$' });
    const cardCount = await pricingCards.count();
    console.log(`Pricing Cards Found: ${cardCount}`);

    if (cardCount > 0) {
      // Check first card dimensions
      const firstCard = pricingCards.first();
      const cardBox = await firstCard.boundingBox();
      if (cardBox) {
        console.log(`First Card Width: ${Math.round(cardBox.width)}px (Viewport: ${MOBILE_VIEWPORT.width}px)`);
        const isFullWidth = cardBox.width > MOBILE_VIEWPORT.width * 0.8;
        console.log(`Cards Stack Vertically: ${isFullWidth ? '✅ YES' : '⚠️ SIDE-BY-SIDE'}`);
      }
    }

    // Check horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const hasHorizontalScroll = bodyWidth > MOBILE_VIEWPORT.width + 5;
    console.log(`Horizontal Scroll: ${hasHorizontalScroll ? '❌ PRESENT' : '✅ NONE'}`);

    // Full page screenshot
    await page.screenshot({
      path: '.playwright-mcp/mobile-pricing-full.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: mobile-pricing-full.png');
  });

  test('4. Contact Page Mobile Audit', async ({ page }) => {
    console.log('\n=== CONTACT PAGE MOBILE AUDIT ===');

    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });

    await page.screenshot({
      path: '.playwright-mcp/mobile-contact-hero.png',
      fullPage: false
    });
    console.log('✅ Screenshot saved: mobile-contact-hero.png');

    // Check form inputs
    const formInputs = page.locator('input[type="text"], input[type="email"], input[type="tel"], textarea');
    const inputCount = await formInputs.count();
    console.log(`Form Inputs Found: ${inputCount}`);

    if (inputCount > 0) {
      const firstInput = formInputs.first();
      const inputBox = await firstInput.boundingBox();
      if (inputBox) {
        console.log(`Input Height: ${Math.round(inputBox.height)}px ${inputBox.height >= MIN_TOUCH_TARGET ? '✅ TAPPABLE' : '⚠️ TOO SMALL'}`);
      }
    }

    // Check submit button
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await submitButton.isVisible().catch(() => false)) {
      const buttonBox = await submitButton.boundingBox();
      if (buttonBox) {
        const isTappable = buttonBox.height >= MIN_TOUCH_TARGET;
        console.log(`Submit Button: ${Math.round(buttonBox.width)}x${Math.round(buttonBox.height)}px ${isTappable ? '✅ TAPPABLE' : '⚠️ TOO SMALL'}`);
      }
    }

    await page.screenshot({
      path: '.playwright-mcp/mobile-contact-full.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: mobile-contact-full.png');
  });

  test('5. Services Page Mobile Audit', async ({ page }) => {
    console.log('\n=== SERVICES PAGE MOBILE AUDIT ===');

    await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });

    await page.screenshot({
      path: '.playwright-mcp/mobile-services-hero.png',
      fullPage: false
    });
    console.log('✅ Screenshot saved: mobile-services-hero.png');

    // Check service cards
    const serviceCards = page.locator('[class*="service"], [class*="card"]').filter({ hasText: /AI|Voice|Lead|SEO/i });
    const cardCount = await serviceCards.count();
    console.log(`Service Cards Found: ${cardCount}`);

    // Check horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const hasHorizontalScroll = bodyWidth > MOBILE_VIEWPORT.width + 5;
    console.log(`Horizontal Scroll: ${hasHorizontalScroll ? '❌ PRESENT' : '✅ NONE'}`);

    await page.screenshot({
      path: '.playwright-mcp/mobile-services-full.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: mobile-services-full.png');
  });

  test('6. Location Page Mobile Audit', async ({ page }) => {
    console.log('\n=== LOCATION PAGE MOBILE AUDIT ===');

    // Try to find a location page
    const locationUrl = `${BASE_URL}/locations/voice-ai-knoxville-tn`;
    const response = await page.goto(locationUrl, { waitUntil: 'networkidle' });

    if (response?.status() === 200) {
      await page.screenshot({
        path: '.playwright-mcp/mobile-location-hero.png',
        fullPage: false
      });
      console.log('✅ Screenshot saved: mobile-location-hero.png');

      // Check horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const hasHorizontalScroll = bodyWidth > MOBILE_VIEWPORT.width + 5;
      console.log(`Horizontal Scroll: ${hasHorizontalScroll ? '❌ PRESENT' : '✅ NONE'}`);

      await page.screenshot({
        path: '.playwright-mcp/mobile-location-full.png',
        fullPage: true
      });
      console.log('✅ Screenshot saved: mobile-location-full.png');
    } else {
      console.log(`⚠️ Location page not found (${response?.status()})`);
    }
  });

  test('7. Touch Target Audit', async ({ page }) => {
    console.log('\n=== TOUCH TARGET AUDIT ===');

    await page.goto(BASE_URL);

    // Check various interactive elements
    const elements = [
      { selector: 'a[href^="tel:"]', name: 'Phone Links' },
      { selector: 'button', name: 'Buttons' },
      { selector: 'a[href]:not([href^="#"])', name: 'Navigation Links' },
      { selector: 'input', name: 'Form Inputs' },
    ];

    for (const { selector, name } of elements) {
      const items = page.locator(selector).filter({ hasText: /.+/ });
      const count = await items.count();

      if (count > 0) {
        const firstItem = items.first();
        if (await firstItem.isVisible().catch(() => false)) {
          const box = await firstItem.boundingBox();
          if (box) {
            const isTappable = box.width >= MIN_TOUCH_TARGET && box.height >= MIN_TOUCH_TARGET;
            console.log(`${name}: ${Math.round(box.width)}x${Math.round(box.height)}px ${isTappable ? '✅' : '⚠️'} (found ${count})`);
          }
        }
      }
    }
  });

  test('8. Final Report Generation', async ({ page }) => {
    console.log('\n' + '='.repeat(50));
    console.log('MOBILE RESPONSIVENESS AUDIT COMPLETE');
    console.log('='.repeat(50));
    console.log('\nAll screenshots saved to: .playwright-mcp/');
    console.log('\nViewport Tested: 390x844 (iPhone 14 Pro)');
    console.log('\nReview screenshots for visual validation.');
  });
});
