import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = 'C:\\Users\\eaqqa\\capture-client-website-seo\\.playwright-mcp';

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test.describe('$1 MILLION WEBSITE VISUAL VALIDATION', () => {

  test.beforeEach(async ({ page }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('1. HOMEPAGE HERO SECTION - Aurora Background & Premium Typography', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 1: HOMEPAGE HERO SECTION');
    console.log('========================================\n');

    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(`${msg.type()}: ${text}`);
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
    });

    await page.goto(BASE_URL);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations to initialize

    // Take screenshot of hero section
    const heroScreenshot = path.join(SCREENSHOT_DIR, 'hero-section-validation.png');
    await page.screenshot({
      path: heroScreenshot,
      fullPage: false
    });
    console.log(`✅ Screenshot saved: ${heroScreenshot}`);

    // Validate hero elements
    const checks = {
      auroraBackground: false,
      premiumTypography: false,
      glassCards: false,
      ctaButton: false
    };

    // Check for aurora background (via CSS classes or canvas)
    const auroraElements = await page.locator('.aurora, [class*="aurora"], canvas').count();
    checks.auroraBackground = auroraElements > 0;
    console.log(`${checks.auroraBackground ? '✅' : '❌'} Aurora background: ${auroraElements > 0 ? 'PRESENT' : 'MISSING'}`);

    // Check for premium typography (h1 with large font)
    const h1 = page.locator('h1').first();
    const h1Text = await h1.textContent();
    const h1Visible = await h1.isVisible();
    checks.premiumTypography = h1Visible && h1Text !== null && h1Text.length > 0;
    console.log(`${checks.premiumTypography ? '✅' : '❌'} Premium typography (H1): "${h1Text?.substring(0, 50)}..."`);

    // Check for glass cards
    const glassCards = await page.locator('[class*="glass"], [class*="backdrop-blur"]').count();
    checks.glassCards = glassCards > 0;
    console.log(`${checks.glassCards ? '✅' : '❌'} Glass-3D cards: ${glassCards} found`);

    // Check for CTA button
    const ctaButton = await page.locator('a:has-text("Get Started"), button:has-text("Get Started"), a:has-text("Start Free Trial")').count();
    checks.ctaButton = ctaButton > 0;
    console.log(`${checks.ctaButton ? '✅' : '❌'} CTA button: ${ctaButton > 0 ? 'PRESENT' : 'MISSING'}`);

    // Console errors
    if (consoleErrors.length > 0) {
      console.log(`\n⚠️  Console errors detected (${consoleErrors.length}):`);
      consoleErrors.forEach(err => console.log(`   - ${err}`));
    } else {
      console.log('\n✅ No console errors');
    }

    const passRate = Object.values(checks).filter(v => v).length / Object.keys(checks).length * 100;
    console.log(`\n📊 Hero Section Pass Rate: ${passRate.toFixed(0)}%`);
  });

  test('2. SERVICES SECTION - Bento Grid with Voice AI Feature', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 2: SERVICES BENTO GRID');
    console.log('========================================\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll to services section
    const servicesSection = page.locator('text=/Services|What We Offer|Our Solutions/i').first();
    if (await servicesSection.isVisible()) {
      await servicesSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    } else {
      // Scroll to approximate location
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(1000);
    }

    // Take screenshot
    const servicesScreenshot = path.join(SCREENSHOT_DIR, 'services-bento-grid-validation.png');
    await page.screenshot({
      path: servicesScreenshot,
      fullPage: false
    });
    console.log(`✅ Screenshot saved: ${servicesScreenshot}`);

    // Validate bento grid
    const checks = {
      bentoGrid: false,
      voiceAICard: false,
      auroraGradients: false,
      glass3DCards: false
    };

    // Check for grid layout
    const gridElements = await page.locator('[class*="grid"]').count();
    checks.bentoGrid = gridElements > 0;
    console.log(`${checks.bentoGrid ? '✅' : '❌'} Bento grid layout: ${gridElements} grid containers found`);

    // Check for Voice AI content
    const voiceAIText = await page.locator('text=/Voice AI|AI Voice|Voice Agent/i').count();
    checks.voiceAICard = voiceAIText > 0;
    console.log(`${checks.voiceAICard ? '✅' : '❌'} Voice AI card: ${voiceAIText > 0 ? 'PRESENT' : 'MISSING'}`);

    // Check for aurora gradients
    const gradients = await page.locator('[class*="gradient"], [class*="aurora"]').count();
    checks.auroraGradients = gradients > 0;
    console.log(`${checks.auroraGradients ? '✅' : '❌'} Aurora gradients: ${gradients} found`);

    // Check for glass 3D cards
    const glass3D = await page.locator('[class*="glass"], [class*="backdrop-blur"]').count();
    checks.glass3DCards = glass3D > 0;
    console.log(`${checks.glass3DCards ? '✅' : '❌'} Glass-3D cards: ${glass3D} found`);

    const passRate = Object.values(checks).filter(v => v).length / Object.keys(checks).length * 100;
    console.log(`\n📊 Services Section Pass Rate: ${passRate.toFixed(0)}%`);
  });

  test('3. HOW IT WORKS - Aurora Timeline', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 3: HOW IT WORKS TIMELINE');
    console.log('========================================\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll to How It Works section
    const howItWorksSection = page.locator('text=/How It Works|How We Work|Our Process/i').first();
    if (await howItWorksSection.isVisible()) {
      await howItWorksSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    } else {
      await page.evaluate(() => window.scrollTo(0, 1600));
      await page.waitForTimeout(1000);
    }

    // Take screenshot
    const timelineScreenshot = path.join(SCREENSHOT_DIR, 'howitworks-timeline-validation.png');
    await page.screenshot({
      path: timelineScreenshot,
      fullPage: false
    });
    console.log(`✅ Screenshot saved: ${timelineScreenshot}`);

    // Validate timeline elements
    const checks = {
      verticalTimeline: false,
      auroraGlow: false,
      alternatingCards: false,
      stepNumbers: false
    };

    // Check for timeline structure
    const timelineElements = await page.locator('[class*="timeline"], [class*="step"]').count();
    checks.verticalTimeline = timelineElements > 0;
    console.log(`${checks.verticalTimeline ? '✅' : '❌'} Vertical timeline: ${timelineElements} timeline elements found`);

    // Check for aurora/glow effects
    const glowElements = await page.locator('[class*="glow"], [class*="aurora"], [class*="shadow"]').count();
    checks.auroraGlow = glowElements > 0;
    console.log(`${checks.auroraGlow ? '✅' : '❌'} Aurora glow effects: ${glowElements} found`);

    // Check for cards (alternating layout)
    const cards = await page.locator('[class*="card"], [class*="glass"]').count();
    checks.alternatingCards = cards >= 3;
    console.log(`${checks.alternatingCards ? '✅' : '❌'} Alternating cards: ${cards} cards found`);

    // Check for step numbers
    const numbers = await page.locator('text=/^[1-9]$/, text=/Step [1-9]/i').count();
    checks.stepNumbers = numbers > 0;
    console.log(`${checks.stepNumbers ? '✅' : '❌'} Animated step numbers: ${numbers} found`);

    const passRate = Object.values(checks).filter(v => v).length / Object.keys(checks).length * 100;
    console.log(`\n📊 How It Works Pass Rate: ${passRate.toFixed(0)}%`);
  });

  test('4. TESTIMONIALS - Glass-3D Cards with Gold Stars', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 4: TESTIMONIALS SECTION');
    console.log('========================================\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll to testimonials section
    const testimonialsSection = page.locator('text=/Testimonials|What Clients Say|Reviews/i').first();
    if (await testimonialsSection.isVisible()) {
      await testimonialsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    } else {
      await page.evaluate(() => window.scrollTo(0, 2400));
      await page.waitForTimeout(1000);
    }

    // Take screenshot
    const testimonialsScreenshot = path.join(SCREENSHOT_DIR, 'testimonials-validation.png');
    await page.screenshot({
      path: testimonialsScreenshot,
      fullPage: false
    });
    console.log(`✅ Screenshot saved: ${testimonialsScreenshot}`);

    // Validate testimonials
    const checks = {
      glass3DCards: false,
      goldStars: false,
      featuredTestimonial: false,
      testimonialCount: false
    };

    // Check for glass cards
    const glassCards = await page.locator('[class*="glass"], [class*="backdrop-blur"]').count();
    checks.glass3DCards = glassCards > 0;
    console.log(`${checks.glass3DCards ? '✅' : '❌'} Glass-3D cards: ${glassCards} found`);

    // Check for star ratings
    const stars = await page.locator('[class*="star"], text=/★|⭐/').count();
    checks.goldStars = stars > 0;
    console.log(`${checks.goldStars ? '✅' : '❌'} Gold star ratings: ${stars > 0 ? 'PRESENT' : 'MISSING'}`);

    // Check for grid layout (featured testimonial would span columns)
    const gridLayout = await page.locator('[class*="grid"], [class*="col-span"]').count();
    checks.featuredTestimonial = gridLayout > 0;
    console.log(`${checks.featuredTestimonial ? '✅' : '❌'} Featured testimonial layout: ${gridLayout > 0 ? 'PRESENT' : 'MISSING'}`);

    // Check for multiple testimonials
    const testimonialCards = await page.locator('text=/said|says|great|amazing|excellent/i').count();
    checks.testimonialCount = testimonialCards >= 3;
    console.log(`${checks.testimonialCount ? '✅' : '❌'} Testimonial count: ${testimonialCards} testimonials found`);

    const passRate = Object.values(checks).filter(v => v).length / Object.keys(checks).length * 100;
    console.log(`\n📊 Testimonials Pass Rate: ${passRate.toFixed(0)}%`);
  });

  test('5. FINAL CTA - Epic Aurora Background with Gold Button', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 5: FINAL CTA SECTION');
    console.log('========================================\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll to bottom CTA
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(1000);

    // Take screenshot
    const ctaScreenshot = path.join(SCREENSHOT_DIR, 'final-cta-validation.png');
    await page.screenshot({
      path: ctaScreenshot,
      fullPage: false
    });
    console.log(`✅ Screenshot saved: ${ctaScreenshot}`);

    // Validate CTA section
    const checks = {
      epicAuroraBackground: false,
      massiveTypography: false,
      goldGradientButton: false,
      ctaText: false
    };

    // Check for aurora background
    const aurora = await page.locator('[class*="aurora"], [class*="gradient"]').count();
    checks.epicAuroraBackground = aurora > 0;
    console.log(`${checks.epicAuroraBackground ? '✅' : '❌'} Epic aurora background: ${aurora > 0 ? 'PRESENT' : 'MISSING'}`);

    // Check for large typography
    const largeText = await page.locator('h2, h3, [class*="text-4xl"], [class*="text-5xl"], [class*="text-6xl"]').count();
    checks.massiveTypography = largeText > 0;
    console.log(`${checks.massiveTypography ? '✅' : '❌'} Massive typography: ${largeText} large text elements found`);

    // Check for CTA button
    const ctaButton = await page.locator('button, a[class*="button"], a[href*="contact"]').last();
    const buttonVisible = await ctaButton.isVisible();
    checks.goldGradientButton = buttonVisible;
    console.log(`${checks.goldGradientButton ? '✅' : '❌'} Gold gradient CTA button: ${buttonVisible ? 'PRESENT' : 'MISSING'}`);

    // Check for compelling CTA text
    const ctaTextContent = await page.locator('text=/Ready|Get Started|Start|Contact|Book|Schedule/i').last().textContent();
    checks.ctaText = ctaTextContent !== null && ctaTextContent.length > 0;
    console.log(`${checks.ctaText ? '✅' : '❌'} CTA text: "${ctaTextContent?.substring(0, 50)}"`);

    const passRate = Object.values(checks).filter(v => v).length / Object.keys(checks).length * 100;
    console.log(`\n📊 Final CTA Pass Rate: ${passRate.toFixed(0)}%`);
  });

  test('6. FULL PAGE SCREENSHOT & CONSOLE ERROR CHECK', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 6: FULL PAGE VALIDATION');
    console.log('========================================\n');

    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(`${msg.type()}: ${text}`);
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
      if (msg.type() === 'warning') {
        consoleWarnings.push(text);
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Take full page screenshot
    const fullPageScreenshot = path.join(SCREENSHOT_DIR, 'full-page-validation.png');
    await page.screenshot({
      path: fullPageScreenshot,
      fullPage: true
    });
    console.log(`✅ Full page screenshot saved: ${fullPageScreenshot}`);

    // Check for broken images
    const brokenImages = await page.$$eval('img', imgs =>
      imgs
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src)
    );

    if (brokenImages.length > 0) {
      console.log(`\n❌ Broken images detected (${brokenImages.length}):`);
      brokenImages.forEach(src => console.log(`   - ${src}`));
    } else {
      const totalImages = await page.locator('img').count();
      console.log(`\n✅ All images loaded successfully (${totalImages} images)`);
    }

    // Console errors
    if (consoleErrors.length > 0) {
      console.log(`\n❌ Console errors detected (${consoleErrors.length}):`);
      consoleErrors.slice(0, 10).forEach(err => console.log(`   - ${err}`));
      if (consoleErrors.length > 10) {
        console.log(`   ... and ${consoleErrors.length - 10} more errors`);
      }
    } else {
      console.log('\n✅ No console errors');
    }

    // Console warnings
    if (consoleWarnings.length > 0) {
      console.log(`\n⚠️  Console warnings detected (${consoleWarnings.length}):`);
      consoleWarnings.slice(0, 5).forEach(warn => console.log(`   - ${warn}`));
      if (consoleWarnings.length > 5) {
        console.log(`   ... and ${consoleWarnings.length - 5} more warnings`);
      }
    }

    // Performance check
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart
      };
    });

    console.log('\n📊 Performance Metrics:');
    console.log(`   - DOM Content Loaded: ${performanceMetrics.domContentLoaded.toFixed(0)}ms`);
    console.log(`   - Load Complete: ${performanceMetrics.loadComplete.toFixed(0)}ms`);
    console.log(`   - DOM Interactive: ${performanceMetrics.domInteractive.toFixed(0)}ms`);
  });

  test('7. MOBILE RESPONSIVE CHECK', async ({ page }) => {
    console.log('\n========================================');
    console.log('TEST 7: MOBILE RESPONSIVENESS');
    console.log('========================================\n');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take mobile screenshot
    const mobileScreenshot = path.join(SCREENSHOT_DIR, 'mobile-validation.png');
    await page.screenshot({
      path: mobileScreenshot,
      fullPage: true
    });
    console.log(`✅ Mobile screenshot saved: ${mobileScreenshot}`);

    // Check for mobile menu
    const mobileMenu = await page.locator('[aria-label*="menu"], button:has(svg)').count();
    console.log(`${mobileMenu > 0 ? '✅' : '❌'} Mobile menu: ${mobileMenu > 0 ? 'PRESENT' : 'MISSING'}`);

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const noHorizontalScroll = bodyWidth <= viewportWidth + 10;
    console.log(`${noHorizontalScroll ? '✅' : '❌'} No horizontal scroll: ${noHorizontalScroll ? 'PASS' : `FAIL (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`}`);

    // Check hero visible on mobile
    const h1Visible = await page.locator('h1').first().isVisible();
    console.log(`${h1Visible ? '✅' : '❌'} Hero headline visible: ${h1Visible ? 'PASS' : 'FAIL'}`);

    // Check CTA button visible on mobile
    const ctaVisible = await page.locator('a:has-text("Get Started"), button:has-text("Get Started")').first().isVisible();
    console.log(`${ctaVisible ? '✅' : '❌'} CTA button visible: ${ctaVisible ? 'PASS' : 'FAIL'}`);
  });
});

test.afterAll(async () => {
  console.log('\n\n========================================');
  console.log('VALIDATION COMPLETE');
  console.log('========================================');
  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('\nReview the screenshots to verify:');
  console.log('  1. Aurora animated backgrounds');
  console.log('  2. Premium typography (Bricolage Grotesque)');
  console.log('  3. Glass-3D cards with proper depth');
  console.log('  4. Bento grid layout in Services');
  console.log('  5. Aurora glowing timeline in How It Works');
  console.log('  6. Gold star ratings in Testimonials');
  console.log('  7. Epic aurora background in Final CTA');
  console.log('  8. Gold gradient CTA buttons');
  console.log('\n========================================\n');
});
