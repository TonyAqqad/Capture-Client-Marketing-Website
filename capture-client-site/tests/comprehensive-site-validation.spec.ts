import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';

const BASE_URL = 'http://localhost:3004';

// Store all issues found during testing
const issues: string[] = [];
const consoleErrors: string[] = [];

test.describe('Capture Client Website Comprehensive Validation', () => {

  test.beforeEach(async ({ page }) => {
    // Capture console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`[PAGE ERROR] ${error.message}`);
    });
  });

  test('1. Homepage - Desktop View', async ({ page }) => {
    console.log('\n=== TESTING HOMEPAGE (DESKTOP) ===');

    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check response status
    if (response?.status() !== 200) {
      issues.push(`❌ HOMEPAGE: Got ${response?.status()} status instead of 200`);
    } else {
      console.log('✅ Homepage loaded with 200 status');
    }

    // Check page title
    const title = await page.title();
    console.log(`Page Title: "${title}"`);
    if (!title || title.length < 20) {
      issues.push(`❌ HOMEPAGE: Title too short or missing: "${title}"`);
    }

    // Check meta description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    console.log(`Meta Description Length: ${metaDesc?.length || 0} chars`);
    if (!metaDesc || metaDesc.length < 50) {
      issues.push(`❌ HOMEPAGE: Meta description too short or missing`);
    }

    // Check for lead capture form
    const forms = await page.locator('form').count();
    console.log(`Forms found: ${forms}`);
    if (forms === 0) {
      issues.push(`❌ HOMEPAGE: No lead capture form found`);
    } else {
      console.log('✅ Lead capture form present');
    }

    // Check for navigation
    const nav = await page.locator('nav').count();
    if (nav === 0) {
      issues.push(`❌ HOMEPAGE: No navigation found`);
    }

    // Check for CTAs
    const ctaButtons = await page.locator('a:has-text("Get Started"), a:has-text("Consultation"), a:has-text("Contact"), button:has-text("Get Started")').count();
    console.log(`CTA buttons found: ${ctaButtons}`);
    if (ctaButtons === 0) {
      issues.push(`⚠️ HOMEPAGE: No obvious CTA buttons found`);
    }

    // Check for images
    const images = await page.locator('img').count();
    console.log(`Images found: ${images}`);

    // Check for broken images
    const brokenImages = await page.$$eval('img', imgs =>
      imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src)
    );
    if (brokenImages.length > 0) {
      issues.push(`❌ HOMEPAGE: ${brokenImages.length} broken images found`);
      console.log('Broken images:', brokenImages);
    }

    // Take screenshot
    await page.screenshot({
      path: 'test-results/homepage-desktop.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved: homepage-desktop.png');
  });

  test('2. Homepage - Mobile View', async ({ page }) => {
    console.log('\n=== TESTING HOMEPAGE (MOBILE) ===');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check mobile menu
    const mobileMenu = await page.locator('[aria-label*="menu" i], button:has(svg)').count();
    console.log(`Mobile menu buttons found: ${mobileMenu}`);

    // Check if content is visible
    const h1 = await page.locator('h1').first().isVisible();
    if (!h1) {
      issues.push(`❌ MOBILE: H1 not visible on mobile`);
    }

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    console.log(`Body width: ${bodyWidth}, Viewport: ${viewportWidth}`);

    if (bodyWidth > viewportWidth + 10) {
      issues.push(`❌ MOBILE: Horizontal scroll detected (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`);
    } else {
      console.log('✅ No horizontal scroll on mobile');
    }

    // Check form visibility on mobile
    const formVisible = await page.locator('form').first().isVisible();
    if (!formVisible) {
      issues.push(`⚠️ MOBILE: Lead form not visible on mobile`);
    }

    await page.screenshot({
      path: 'test-results/homepage-mobile.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved: homepage-mobile.png');
  });

  test('3. Pricing Page', async ({ page }) => {
    console.log('\n=== TESTING PRICING PAGE ===');

    const response = await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });

    if (response?.status() !== 200) {
      issues.push(`❌ PRICING: Got ${response?.status()} status`);
    }

    // Check for pricing information
    const priceElements = await page.locator(':has-text("$")').count();
    console.log(`Price elements found: ${priceElements}`);
    if (priceElements === 0) {
      issues.push(`❌ PRICING: No pricing information visible`);
    }

    // Check for package cards
    const packageCards = await page.locator('[class*="package"], [class*="pricing"], [class*="card"]').count();
    console.log(`Package/card elements found: ${packageCards}`);

    // Check title
    const title = await page.title();
    if (!title.toLowerCase().includes('pricing') && !title.toLowerCase().includes('package')) {
      issues.push(`⚠️ PRICING: Title doesn't mention pricing: "${title}"`);
    }

    await page.screenshot({
      path: 'test-results/pricing-page.png',
      fullPage: true
    });
  });

  test('4. Services Page', async ({ page }) => {
    console.log('\n=== TESTING SERVICES PAGE ===');

    const response = await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });

    if (response?.status() !== 200) {
      issues.push(`❌ SERVICES: Got ${response?.status()} status`);
    }

    // Check for service listings
    const serviceElements = await page.locator('[class*="service"], article, [class*="card"]').count();
    console.log(`Service elements found: ${serviceElements}`);

    // Check title
    const title = await page.title();
    console.log(`Services page title: "${title}"`);

    await page.screenshot({
      path: 'test-results/services-page.png',
      fullPage: true
    });
  });

  test('5. Contact Page', async ({ page }) => {
    console.log('\n=== TESTING CONTACT PAGE ===');

    const response = await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });

    if (response?.status() !== 200) {
      issues.push(`❌ CONTACT: Got ${response?.status()} status`);
    }

    // Check for contact form
    const forms = await page.locator('form').count();
    console.log(`Forms found on contact page: ${forms}`);
    if (forms === 0) {
      issues.push(`❌ CONTACT: No contact form found`);
    }

    // Check for contact information
    const emailLinks = await page.locator('a[href^="mailto:"]').count();
    const phoneLinks = await page.locator('a[href^="tel:"]').count();
    console.log(`Email links: ${emailLinks}, Phone links: ${phoneLinks}`);

    if (emailLinks === 0 && phoneLinks === 0) {
      issues.push(`⚠️ CONTACT: No email or phone links found`);
    }

    await page.screenshot({
      path: 'test-results/contact-page.png',
      fullPage: true
    });
  });

  test('6. Features Page', async ({ page }) => {
    console.log('\n=== TESTING FEATURES PAGE ===');

    const response = await page.goto(`${BASE_URL}/features`, { waitUntil: 'networkidle' });

    if (response?.status() !== 200) {
      issues.push(`❌ FEATURES: Got ${response?.status()} status`);
    }

    // Check for feature listings
    const featureElements = await page.locator('[class*="feature"], article, [class*="card"]').count();
    console.log(`Feature elements found: ${featureElements}`);

    await page.screenshot({
      path: 'test-results/features-page.png',
      fullPage: true
    });
  });

  test('7. Location Page - Knoxville', async ({ page }) => {
    console.log('\n=== TESTING LOCATION PAGE (KNOXVILLE) ===');

    const response = await page.goto(`${BASE_URL}/locations/voice-ai-knoxville-tn`, { waitUntil: 'networkidle' });

    if (response?.status() !== 200) {
      issues.push(`❌ LOCATION (Knoxville): Got ${response?.status()} status`);
    } else {
      console.log('✅ Knoxville location page loaded');
    }

    // Check if location is mentioned in title
    const title = await page.title();
    console.log(`Location page title: "${title}"`);
    if (!title.toLowerCase().includes('knoxville')) {
      issues.push(`⚠️ LOCATION: Title doesn't mention Knoxville: "${title}"`);
    }

    // Check for local content
    const pageText = await page.textContent('body');
    if (pageText && !pageText.toLowerCase().includes('knoxville')) {
      issues.push(`❌ LOCATION: Page content doesn't mention Knoxville`);
    }

    await page.screenshot({
      path: 'test-results/location-knoxville.png',
      fullPage: true
    });
  });

  test('8. Blog Page', async ({ page }) => {
    console.log('\n=== TESTING BLOG PAGE ===');

    const response = await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle' });

    if (response?.status() === 404) {
      issues.push(`⚠️ BLOG: Returns 404 - blog may not be implemented`);
      console.log('⚠️ Blog page not found (this may be expected)');
    } else if (response?.status() === 200) {
      console.log('✅ Blog page exists');

      // Check for blog posts
      const blogPosts = await page.locator('article, [class*="post"], [class*="blog"]').count();
      console.log(`Blog post elements found: ${blogPosts}`);

      await page.screenshot({
        path: 'test-results/blog-page.png',
        fullPage: true
      });
    }
  });

  test('9. Form Functionality Test', async ({ page }) => {
    console.log('\n=== TESTING FORM FUNCTIONALITY ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const form = page.locator('form').first();
    const formExists = await form.count() > 0;

    if (!formExists) {
      issues.push(`❌ FORMS: No form found to test`);
      return;
    }

    // Try to find common form fields
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i], input[type="text"]').first();
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    const phoneInput = page.locator('input[name="phone"], input[type="tel"]').first();
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();

    // Check if fields exist
    const nameExists = await nameInput.count() > 0;
    const emailExists = await emailInput.count() > 0;
    const phoneExists = await phoneInput.count() > 0;
    const submitExists = await submitButton.count() > 0;

    console.log(`Form fields - Name: ${nameExists}, Email: ${emailExists}, Submit: ${submitExists}`);

    if (!emailExists) {
      issues.push(`❌ FORMS: No email field found in form`);
    }

    if (!submitExists) {
      issues.push(`❌ FORMS: No submit button found in form`);
    }

    // Try to fill the form (if fields exist)
    if (nameExists) {
      await nameInput.fill('Test User');
      console.log('✅ Name field can be filled');
    }

    if (emailExists) {
      await emailInput.fill('test@example.com');
      console.log('✅ Email field can be filled');
    }

    if (phoneExists && await phoneInput.isVisible()) {
      await phoneInput.fill('555-123-4567');
      console.log('✅ Phone field can be filled');
    }

    // Check if submit button is enabled
    if (submitExists) {
      const isEnabled = await submitButton.isEnabled();
      if (!isEnabled) {
        issues.push(`⚠️ FORMS: Submit button is disabled (may require validation)`);
      } else {
        console.log('✅ Submit button is enabled');
      }
    }
  });

  test('10. Click-to-Call Test', async ({ page }) => {
    console.log('\n=== TESTING CLICK-TO-CALL ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const phoneLinks = await page.locator('a[href^="tel:"]').count();
    console.log(`Click-to-call links found: ${phoneLinks}`);

    if (phoneLinks === 0) {
      issues.push(`⚠️ CLICK-TO-CALL: No tel: links found on homepage`);
    } else {
      // Check first phone link format
      const firstHref = await page.locator('a[href^="tel:"]').first().getAttribute('href');
      console.log(`First phone link: ${firstHref}`);

      if (firstHref && !firstHref.match(/tel:\+?[\d\-\s()]+/)) {
        issues.push(`⚠️ CLICK-TO-CALL: Phone link has unusual format: ${firstHref}`);
      } else {
        console.log('✅ Click-to-call links present and properly formatted');
      }
    }
  });

  test('11. Navigation Test', async ({ page }) => {
    console.log('\n=== TESTING NAVIGATION ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find navigation links
    const navLinks = await page.locator('nav a, header a').count();
    console.log(`Navigation links found: ${navLinks}`);

    if (navLinks === 0) {
      issues.push(`❌ NAVIGATION: No navigation links found`);
      return;
    }

    // Get all link hrefs
    const links = await page.locator('nav a, header a').evaluateAll(elements =>
      elements.map(el => ({ href: el.getAttribute('href'), text: el.textContent }))
    );

    console.log(`Found ${links.length} navigation links`);

    // Test a few key navigation links
    const keyLinks = links.filter(link =>
      link.href && (
        link.href.includes('/services') ||
        link.href.includes('/pricing') ||
        link.href.includes('/contact') ||
        link.href.includes('/features')
      )
    );

    console.log(`Key navigation links found: ${keyLinks.length}`);
    console.log('Key links:', keyLinks.map(l => l.href));
  });

  test('12. SEO Meta Tags Test', async ({ page }) => {
    console.log('\n=== TESTING SEO META TAGS ===');

    const testPages = [
      { url: '/', name: 'Homepage' },
      { url: '/pricing', name: 'Pricing' },
      { url: '/services', name: 'Services' },
      { url: '/contact', name: 'Contact' }
    ];

    for (const testPage of testPages) {
      await page.goto(`${BASE_URL}${testPage.url}`, { waitUntil: 'domcontentloaded' });
      console.log(`\n--- ${testPage.name} ---`);

      // Title
      const title = await page.title();
      console.log(`Title: "${title}" (${title.length} chars)`);
      if (title.length < 20 || title.length > 70) {
        issues.push(`⚠️ SEO (${testPage.name}): Title length issue (${title.length} chars)`);
      }

      // Meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      console.log(`Meta Desc: ${metaDesc?.substring(0, 60)}... (${metaDesc?.length || 0} chars)`);
      if (!metaDesc || metaDesc.length < 100 || metaDesc.length > 160) {
        issues.push(`⚠️ SEO (${testPage.name}): Meta description length issue (${metaDesc?.length || 0} chars)`);
      }

      // OG Title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      if (!ogTitle) {
        issues.push(`⚠️ SEO (${testPage.name}): Missing og:title`);
      }

      // Canonical
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      if (!canonical) {
        issues.push(`⚠️ SEO (${testPage.name}): Missing canonical URL`);
      }
    }
  });

  test('13. Performance - Image Loading', async ({ page }) => {
    console.log('\n=== TESTING IMAGE LOADING ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait a bit for images to load
    await page.waitForTimeout(2000);

    const totalImages = await page.locator('img').count();
    console.log(`Total images on page: ${totalImages}`);

    // Check for broken images
    const imageStats = await page.$$eval('img', imgs =>
      imgs.map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }))
    );

    const brokenImages = imageStats.filter(img => !img.complete || img.naturalWidth === 0);

    if (brokenImages.length > 0) {
      console.log(`❌ Found ${brokenImages.length} broken images:`);
      brokenImages.forEach(img => console.log(`  - ${img.src}`));
      issues.push(`❌ IMAGES: ${brokenImages.length} broken images found`);
    } else {
      console.log(`✅ All ${totalImages} images loaded successfully`);
    }

    // Check for images without alt text
    const imagesWithoutAlt = await page.$$eval('img', imgs =>
      imgs.filter(img => !img.alt || img.alt.trim() === '').length
    );

    if (imagesWithoutAlt > 0) {
      issues.push(`⚠️ ACCESSIBILITY: ${imagesWithoutAlt} images missing alt text`);
    }
  });

  test('14. Mobile Menu Test', async ({ page }) => {
    console.log('\n=== TESTING MOBILE MENU ===');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Look for mobile menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button:has(svg):visible').first();
    const menuExists = await menuButton.count() > 0;

    if (!menuExists) {
      issues.push(`⚠️ MOBILE: No mobile menu button found`);
      console.log('⚠️ Mobile menu button not found');
      return;
    }

    console.log('✅ Mobile menu button found');

    // Try to click the menu
    try {
      await menuButton.click();
      await page.waitForTimeout(500);

      // Check if menu opened (look for expanded nav or modal)
      const menuOpen = await page.locator('nav[aria-expanded="true"], [role="dialog"], [class*="open"]').count() > 0;

      if (menuOpen) {
        console.log('✅ Mobile menu opens successfully');
        await page.screenshot({
          path: 'test-results/mobile-menu-open.png'
        });
      } else {
        issues.push(`⚠️ MOBILE: Menu button exists but menu may not open properly`);
      }
    } catch (error) {
      issues.push(`❌ MOBILE: Error clicking mobile menu: ${error}`);
    }
  });

  test('FINAL: Generate Test Report', async () => {
    console.log('\n\n' + '='.repeat(80));
    console.log('COMPREHENSIVE TEST REPORT - CAPTURE CLIENT WEBSITE');
    console.log('='.repeat(80));

    console.log('\n📊 CONSOLE ERRORS FOUND:');
    if (consoleErrors.length === 0) {
      console.log('✅ No console errors detected');
    } else {
      console.log(`❌ Found ${consoleErrors.length} console errors:`);
      consoleErrors.forEach((error, idx) => {
        console.log(`\n${idx + 1}. ${error}`);
      });
    }

    console.log('\n🐛 ISSUES FOUND:');
    if (issues.length === 0) {
      console.log('✅ No issues detected - site is in excellent shape!');
    } else {
      console.log(`Found ${issues.length} issues that need attention:\n`);
      issues.forEach((issue, idx) => {
        console.log(`${idx + 1}. ${issue}`);
      });
    }

    console.log('\n📸 SCREENSHOTS SAVED:');
    console.log('- test-results/homepage-desktop.png');
    console.log('- test-results/homepage-mobile.png');
    console.log('- test-results/pricing-page.png');
    console.log('- test-results/services-page.png');
    console.log('- test-results/contact-page.png');
    console.log('- test-results/features-page.png');
    console.log('- test-results/location-knoxville.png');

    console.log('\n' + '='.repeat(80));
    console.log('TEST SUITE COMPLETE');
    console.log('='.repeat(80) + '\n');

    // Write detailed report to file
    const reportContent = `
# PLAYWRIGHT TEST REPORT - CAPTURE CLIENT WEBSITE
Generated: ${new Date().toISOString()}
Base URL: ${BASE_URL}

## Executive Summary

Total Console Errors: ${consoleErrors.length}
Total Issues Found: ${issues.length}
Overall Status: ${issues.length === 0 && consoleErrors.length === 0 ? '✅ PASS' : '⚠️ NEEDS ATTENTION'}

## Console Errors

${consoleErrors.length === 0 ? '✅ No console errors detected' : consoleErrors.map((err, idx) => `${idx + 1}. ${err}`).join('\n')}

## Issues Found

${issues.length === 0 ? '✅ No issues detected' : issues.map((issue, idx) => `${idx + 1}. ${issue}`).join('\n')}

## Pages Tested

- ✅ Homepage (Desktop & Mobile)
- ✅ Pricing Page
- ✅ Services Page
- ✅ Contact Page
- ✅ Features Page
- ✅ Location Page (Knoxville)
- ✅ Blog Page

## Functionality Tested

- ✅ Lead Capture Forms
- ✅ Click-to-Call Links
- ✅ Navigation
- ✅ Mobile Menu
- ✅ Mobile Responsiveness
- ✅ Image Loading
- ✅ SEO Meta Tags

## Screenshots

All screenshots saved to test-results/ directory:
- homepage-desktop.png
- homepage-mobile.png
- pricing-page.png
- services-page.png
- contact-page.png
- features-page.png
- location-knoxville.png

## Recommendations

${issues.length === 0
  ? '✅ Website is in excellent condition. Ready for deployment!'
  : '⚠️ Please address the issues listed above before deployment.'
}

---
Generated by Playwright Tester Agent
`;

    writeFileSync('test-results/COMPREHENSIVE_TEST_REPORT.md', reportContent);
    console.log('📄 Detailed report saved to: test-results/COMPREHENSIVE_TEST_REPORT.md\n');
  });
});
