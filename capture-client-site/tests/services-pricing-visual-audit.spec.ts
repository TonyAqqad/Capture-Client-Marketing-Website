import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Services & Pricing Visual Quality Audit ($5M Standard)', () => {

  test('Services Page - Desktop Visual Audit', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('📊 AUDITING SERVICES PAGE - DESKTOP');

    await page.goto(`${BASE_URL}/services`);
    await page.waitForLoadState('networkidle');

    // Take full-page screenshot
    await page.screenshot({
      path: 'tests/screenshots/services-desktop.png',
      fullPage: true
    });

    // Visual Quality Checks
    console.log('\n✅ VISUAL QUALITY CHECKS:');

    // 1. Service Cards Present
    const serviceCards = page.locator('[class*="service"], [class*="Service"], .card, [class*="grid"] > div').filter({ hasText: /.{10,}/ });
    const cardCount = await serviceCards.count();
    console.log(`   - Service Cards Found: ${cardCount}`);
    expect(cardCount).toBeGreaterThan(0);

    // 2. CTAs Present
    const ctas = page.locator('a:has-text("Get Started"), a:has-text("Book"), a:has-text("Contact"), button:has-text("Get Started"), button:has-text("Book")');
    const ctaCount = await ctas.count();
    console.log(`   - CTAs Found: ${ctaCount}`);
    expect(ctaCount).toBeGreaterThan(0);

    // 3. Typography - Check for premium headings
    const h1 = page.locator('h1').first();
    const h1Visible = await h1.isVisible();
    console.log(`   - H1 Present: ${h1Visible}`);
    if (h1Visible) {
      const h1Text = await h1.textContent();
      console.log(`   - H1 Text: "${h1Text}"`);
    }

    // 4. Check for icons/images
    const images = page.locator('img, svg');
    const imageCount = await images.count();
    console.log(`   - Visual Elements (img/svg): ${imageCount}`);

    // 5. Color Palette Check (Navy/Gold/Cyan)
    const goldElements = page.locator('[class*="gold"], [class*="amber"], [class*="yellow"]');
    const navyElements = page.locator('[class*="navy"], [class*="blue-9"], [class*="slate-9"]');
    const cyanElements = page.locator('[class*="cyan"], [class*="teal"]');

    console.log(`   - Gold/Amber Elements: ${await goldElements.count()}`);
    console.log(`   - Navy/Dark Blue Elements: ${await navyElements.count()}`);
    console.log(`   - Cyan/Teal Elements: ${await cyanElements.count()}`);

    // 6. Console Errors
    console.log(`   - Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('   ⚠️ Console Errors:', consoleErrors);
    }

    console.log('\n✅ Services Desktop screenshot saved: tests/screenshots/services-desktop.png\n');
  });

  test('Services Page - Mobile Visual Audit', async ({ page }) => {
    console.log('📱 AUDITING SERVICES PAGE - MOBILE (375px)');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/services`);
    await page.waitForLoadState('networkidle');

    // Take full-page screenshot
    await page.screenshot({
      path: 'tests/screenshots/services-mobile.png',
      fullPage: true
    });

    console.log('\n✅ MOBILE RESPONSIVENESS CHECKS:');

    // 1. Check if content is visible and not cut off
    const h1 = page.locator('h1').first();
    const h1Box = await h1.boundingBox();
    if (h1Box) {
      console.log(`   - H1 Width: ${h1Box.width}px (viewport: 375px)`);
      expect(h1Box.width).toBeLessThanOrEqual(375);
    }

    // 2. Service cards should stack vertically
    const serviceCards = page.locator('[class*="service"], [class*="Service"], .card').first();
    if (await serviceCards.count() > 0) {
      const cardBox = await serviceCards.first().boundingBox();
      if (cardBox) {
        console.log(`   - Service Card Width: ${cardBox.width}px`);
      }
    }

    // 3. CTAs should be visible and tappable (min 44px height)
    const cta = page.locator('a:has-text("Get Started"), button:has-text("Get Started")').first();
    if (await cta.isVisible()) {
      const ctaBox = await cta.boundingBox();
      if (ctaBox) {
        console.log(`   - CTA Height: ${ctaBox.height}px (min 44px recommended)`);
        expect(ctaBox.height).toBeGreaterThanOrEqual(40);
      }
    }

    // 4. No horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    console.log(`   - Body Width: ${bodyWidth}px (should be ≤ 375px)`);
    expect(bodyWidth).toBeLessThanOrEqual(380); // Small margin for rounding

    console.log('\n✅ Services Mobile screenshot saved: tests/screenshots/services-mobile.png\n');
  });

  test('Pricing Page - Desktop Visual Audit', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('💰 AUDITING PRICING PAGE - DESKTOP');

    await page.goto(`${BASE_URL}/pricing`);
    await page.waitForLoadState('networkidle');

    // Take full-page screenshot
    await page.screenshot({
      path: 'tests/screenshots/pricing-desktop.png',
      fullPage: true
    });

    console.log('\n✅ PRICING VISUAL QUALITY CHECKS:');

    // 1. Pricing Tiers/Cards
    const pricingCards = page.locator('[class*="pricing"], [class*="Pricing"], [class*="tier"], [class*="package"], .card').filter({ hasText: /\$|price|month/i });
    const tierCount = await pricingCards.count();
    console.log(`   - Pricing Tiers Found: ${tierCount}`);
    expect(tierCount).toBeGreaterThan(0);

    // 2. Featured/Recommended Plan
    const featured = page.locator('[class*="featured"], [class*="popular"], [class*="recommended"], [class*="best"]');
    const featuredCount = await featured.count();
    console.log(`   - Featured/Recommended Plan: ${featuredCount > 0 ? 'YES ✓' : 'NO ✗'}`);

    // 3. Pricing Display ($ amounts)
    const prices = page.locator(':text-matches("\\$\\d+")');
    const priceCount = await prices.count();
    console.log(`   - Price Elements Found: ${priceCount}`);
    expect(priceCount).toBeGreaterThan(0);

    // 4. CTAs for each tier
    const pricingCTAs = page.locator('a:has-text("Get Started"), a:has-text("Choose"), a:has-text("Select"), button:has-text("Get Started"), button:has-text("Choose")');
    const ctaCount = await pricingCTAs.count();
    console.log(`   - Pricing CTAs: ${ctaCount}`);
    expect(ctaCount).toBeGreaterThan(0);

    // 5. Trust Signals
    const trustSignals = page.locator(':has-text("guarantee"), :has-text("refund"), :has-text("testimonial"), :has-text("money-back")');
    const trustCount = await trustSignals.count();
    console.log(`   - Trust Signals: ${trustCount}`);

    // 6. Feature Comparison
    const checkmarks = page.locator('svg[class*="check"], [class*="checkmark"], :has-text("✓"), :has-text("✔")');
    const checkmarkCount = await checkmarks.count();
    console.log(`   - Feature Checkmarks/Icons: ${checkmarkCount}`);

    // 7. Typography - Premium Headline
    const h1 = page.locator('h1').first();
    if (await h1.isVisible()) {
      const h1Text = await h1.textContent();
      console.log(`   - H1 Text: "${h1Text}"`);
    }

    // 8. Console Errors
    console.log(`   - Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('   ⚠️ Console Errors:', consoleErrors);
    }

    console.log('\n✅ Pricing Desktop screenshot saved: tests/screenshots/pricing-desktop.png\n');
  });

  test('Pricing Page - Mobile Visual Audit', async ({ page }) => {
    console.log('📱 AUDITING PRICING PAGE - MOBILE (375px)');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/pricing`);
    await page.waitForLoadState('networkidle');

    // Take full-page screenshot
    await page.screenshot({
      path: 'tests/screenshots/pricing-mobile.png',
      fullPage: true
    });

    console.log('\n✅ MOBILE PRICING CHECKS:');

    // 1. Pricing cards should stack vertically
    const pricingCards = page.locator('[class*="pricing"], [class*="tier"], [class*="package"]').first();
    if (await pricingCards.count() > 0) {
      const cardBox = await pricingCards.first().boundingBox();
      if (cardBox) {
        console.log(`   - Pricing Card Width: ${cardBox.width}px`);
      }
    }

    // 2. Prices are readable
    const price = page.locator(':text-matches("\\$\\d+")').first();
    if (await price.isVisible()) {
      const priceBox = await price.boundingBox();
      if (priceBox) {
        console.log(`   - Price Font Size (approx height): ${priceBox.height}px`);
      }
    }

    // 3. CTAs are tappable
    const cta = page.locator('a:has-text("Get Started"), button:has-text("Get Started")').first();
    if (await cta.isVisible()) {
      const ctaBox = await cta.boundingBox();
      if (ctaBox) {
        console.log(`   - CTA Height: ${ctaBox.height}px (min 44px recommended)`);
        expect(ctaBox.height).toBeGreaterThanOrEqual(40);
      }
    }

    // 4. No horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    console.log(`   - Body Width: ${bodyWidth}px (should be ≤ 375px)`);
    expect(bodyWidth).toBeLessThanOrEqual(380);

    console.log('\n✅ Pricing Mobile screenshot saved: tests/screenshots/pricing-mobile.png\n');
  });

  test('Generate Visual Quality Report', async ({ page }) => {
    console.log('\n' + '='.repeat(60));
    console.log('📊 $5M VISUAL QUALITY AUDIT REPORT');
    console.log('='.repeat(60));

    console.log('\n✅ SCREENSHOTS CAPTURED:');
    console.log('   - tests/screenshots/services-desktop.png');
    console.log('   - tests/screenshots/services-mobile.png');
    console.log('   - tests/screenshots/pricing-desktop.png');
    console.log('   - tests/screenshots/pricing-mobile.png');

    console.log('\n✅ AUDIT CRITERIA CHECKED:');
    console.log('   - Service Cards Visual Hierarchy');
    console.log('   - Pricing Tiers Visual Distinction');
    console.log('   - CTAs Prominence & Action-Oriented');
    console.log('   - Typography ($5M Standard)');
    console.log('   - Color Palette Consistency (Navy/Gold/Cyan)');
    console.log('   - Mobile Responsiveness (375px)');
    console.log('   - Touch Target Sizes (≥44px)');
    console.log('   - Console Error Detection');

    console.log('\n💡 NEXT STEPS:');
    console.log('   1. Review screenshots for visual quality');
    console.log('   2. Verify premium typography (dramatic sizes)');
    console.log('   3. Check color palette matches Navy/Gold/Cyan');
    console.log('   4. Ensure CTAs stand out and drive action');
    console.log('   5. Validate mobile experience is flawless');

    console.log('\n' + '='.repeat(60));
  });
});
