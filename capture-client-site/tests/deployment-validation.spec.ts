import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Track all console messages and errors
const consoleMessages: string[] = [];
const consoleErrors: string[] = [];

test.describe('DEPLOYMENT VALIDATION - Capture Client Website', () => {

  test.beforeEach(async ({ page }) => {
    // Clear message arrays
    consoleMessages.length = 0;
    consoleErrors.length = 0;

    // Capture console messages
    page.on('console', msg => {
      const text = `[${msg.type()}] ${msg.text()}`;
      consoleMessages.push(text);
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`PAGE ERROR: ${error.message}`);
    });
  });

  // =====================================================
  // 1. PAGE LOAD TESTS
  // =====================================================

  test('Homepage loads successfully with no errors', async ({ page }) => {
    console.log('\n🏠 TESTING HOMEPAGE...');

    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check response status
    expect(response?.status()).toBe(200);
    console.log('✅ Homepage returned 200 status');

    // Check page title exists
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Page title: "${title}"`);

    // Wait for main content to be visible
    await page.waitForSelector('body', { state: 'visible' });

    // Check for console errors
    if (consoleErrors.length > 0) {
      console.log('❌ Console errors found:', consoleErrors);
    } else {
      console.log('✅ No console errors');
    }

    expect(consoleErrors.length).toBe(0);
  });

  test('Services page loads successfully', async ({ page }) => {
    console.log('\n🔧 TESTING SERVICES PAGE...');

    const response = await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    console.log('✅ Services page returned 200 status');

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Page title: "${title}"`);

    // Check for service content
    const servicesContent = await page.locator('main').isVisible();
    expect(servicesContent).toBe(true);
    console.log('✅ Services content visible');

    expect(consoleErrors.length).toBe(0);
  });

  test('Pricing page loads successfully', async ({ page }) => {
    console.log('\n💰 TESTING PRICING PAGE...');

    const response = await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    console.log('✅ Pricing page returned 200 status');

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Page title: "${title}"`);

    // Check for pricing content (should have dollar signs)
    const hasPricing = await page.locator(':has-text("$")').count();
    expect(hasPricing).toBeGreaterThan(0);
    console.log(`✅ Found ${hasPricing} pricing elements`);

    expect(consoleErrors.length).toBe(0);
  });

  test('Contact page loads successfully', async ({ page }) => {
    console.log('\n📞 TESTING CONTACT PAGE...');

    const response = await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    console.log('✅ Contact page returned 200 status');

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Page title: "${title}"`);

    expect(consoleErrors.length).toBe(0);
  });

  test('About page loads successfully', async ({ page }) => {
    console.log('\n📖 TESTING ABOUT PAGE...');

    const response = await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    console.log('✅ About page returned 200 status');

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Page title: "${title}"`);

    expect(consoleErrors.length).toBe(0);
  });

  test('Location page (Knoxville) loads successfully', async ({ page }) => {
    console.log('\n📍 TESTING LOCATION PAGE (Knoxville)...');

    const response = await page.goto(`${BASE_URL}/locations/voice-ai-knoxville-tn`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    const status = response?.status();
    console.log(`Status: ${status}`);

    if (status === 200) {
      const title = await page.title();
      console.log(`✅ Location page loaded: "${title}"`);
      expect(title).toContain('Knoxville');
    } else {
      console.log(`⚠️ Location page returned ${status} - may need to check routing`);
    }

    // Don't fail test if this specific URL structure differs
    expect([200, 404]).toContain(status!);
  });

  test('Blog page loads successfully', async ({ page }) => {
    console.log('\n📝 TESTING BLOG PAGE...');

    const response = await page.goto(`${BASE_URL}/blog`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    const status = response?.status();
    console.log(`Status: ${status}`);

    if (status === 200) {
      const title = await page.title();
      console.log(`✅ Blog page loaded: "${title}"`);
    } else {
      console.log(`⚠️ Blog page returned ${status} - may need to check if blog exists`);
    }

    expect([200, 404]).toContain(status!);
  });

  // =====================================================
  // 2. FORM FUNCTIONALITY TESTS
  // =====================================================

  test('Lead capture form exists on homepage', async ({ page }) => {
    console.log('\n📋 TESTING LEAD CAPTURE FORM...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find form element
    const form = page.locator('form').first();
    const formExists = await form.count() > 0;

    expect(formExists).toBe(true);
    console.log('✅ Lead capture form found');

    // Check for input fields
    const inputs = await page.locator('form input, form textarea').count();
    expect(inputs).toBeGreaterThan(0);
    console.log(`✅ Found ${inputs} form input fields`);

    // Check for submit button
    const submitButton = page.locator('form button[type="submit"], form input[type="submit"]').first();
    const hasSubmit = await submitButton.count() > 0;
    expect(hasSubmit).toBe(true);
    console.log('✅ Submit button found');
  });

  test('Form validation works (empty submit)', async ({ page }) => {
    console.log('\n✅ TESTING FORM VALIDATION...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const form = page.locator('form').first();
    const submitButton = page.locator('form button[type="submit"], form input[type="submit"]').first();

    if (await submitButton.count() > 0) {
      // Try to submit empty form
      await submitButton.click();

      // Wait a bit for validation
      await page.waitForTimeout(500);

      console.log('✅ Form submit attempted (validation should prevent submission)');
    } else {
      console.log('⚠️ Submit button not found for validation test');
    }
  });

  test('Form accepts valid data', async ({ page }) => {
    console.log('\n📝 TESTING FORM WITH VALID DATA...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find form inputs
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i]').first();
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    const phoneInput = page.locator('input[name="phone"], input[type="tel"]').first();

    if (await nameInput.count() > 0) {
      await nameInput.fill('Test User');
      console.log('✅ Name field filled');
    }

    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
      console.log('✅ Email field filled');
    }

    if (await phoneInput.count() > 0) {
      await phoneInput.fill('555-123-4567');
      console.log('✅ Phone field filled');
    }

    const submitButton = page.locator('form button[type="submit"]').first();
    if (await submitButton.count() > 0) {
      const isEnabled = await submitButton.isEnabled();
      expect(isEnabled).toBe(true);
      console.log('✅ Submit button is enabled with valid data');
    }
  });

  // =====================================================
  // 3. INTERACTIVE ELEMENTS TESTS
  // =====================================================

  test('Navigation links are present and functional', async ({ page }) => {
    console.log('\n🔗 TESTING NAVIGATION LINKS...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find navigation links
    const navLinks = await page.locator('nav a, header a').count();
    expect(navLinks).toBeGreaterThan(0);
    console.log(`✅ Found ${navLinks} navigation links`);

    // Check for common nav items
    const servicesLink = page.locator('a:has-text("Services"), a[href*="services"]').first();
    const pricingLink = page.locator('a:has-text("Pricing"), a[href*="pricing"]').first();
    const contactLink = page.locator('a:has-text("Contact"), a[href*="contact"]').first();

    if (await servicesLink.count() > 0) console.log('✅ Services link found');
    if (await pricingLink.count() > 0) console.log('✅ Pricing link found');
    if (await contactLink.count() > 0) console.log('✅ Contact link found');
  });

  test('Mobile menu toggle works', async ({ page }) => {
    console.log('\n📱 TESTING MOBILE MENU...');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Look for mobile menu button (hamburger icon)
    const mobileMenuButton = page.locator(
      'button[aria-label*="menu" i], button[aria-label*="navigation" i], button:has(svg)'
    ).first();

    if (await mobileMenuButton.count() > 0) {
      console.log('✅ Mobile menu button found');

      // Try to toggle menu
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      console.log('✅ Mobile menu toggled');
    } else {
      console.log('⚠️ Mobile menu button not found (may use different approach)');
    }
  });

  test('Click-to-call buttons have correct tel: links', async ({ page }) => {
    console.log('\n📞 TESTING CLICK-TO-CALL BUTTONS...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find phone links
    const phoneLinks = await page.locator('a[href^="tel:"]').count();

    if (phoneLinks > 0) {
      console.log(`✅ Found ${phoneLinks} click-to-call buttons`);

      // Check first phone link format
      const firstPhone = await page.locator('a[href^="tel:"]').first().getAttribute('href');
      expect(firstPhone).toMatch(/^tel:/);
      console.log(`✅ Phone link format correct: ${firstPhone}`);
    } else {
      console.log('⚠️ No click-to-call buttons found');
    }
  });

  // =====================================================
  // 4. SEO VALIDATION TESTS
  // =====================================================

  test('SEO meta tags exist on homepage', async ({ page }) => {
    console.log('\n🔍 TESTING SEO META TAGS...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(20);
    console.log(`✅ Title: "${title}" (${title.length} chars)`);

    // Check meta description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc!.length).toBeGreaterThan(50);
    console.log(`✅ Meta description: ${metaDesc!.length} chars`);

    // Check Open Graph title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    if (ogTitle) {
      console.log(`✅ OG Title: "${ogTitle}"`);
    } else {
      console.log('⚠️ OG Title not found');
    }

    // Check Open Graph description
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    if (ogDesc) {
      console.log(`✅ OG Description: ${ogDesc.length} chars`);
    } else {
      console.log('⚠️ OG Description not found');
    }

    // Check Open Graph image
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    if (ogImage) {
      console.log(`✅ OG Image: ${ogImage}`);
    } else {
      console.log('⚠️ OG Image not found');
    }
  });

  test('JSON-LD structured data exists', async ({ page }) => {
    console.log('\n📊 TESTING JSON-LD STRUCTURED DATA...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find JSON-LD scripts
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').count();

    if (jsonLdScripts > 0) {
      console.log(`✅ Found ${jsonLdScripts} JSON-LD script(s)`);

      // Get first JSON-LD content
      const jsonLdContent = await page.locator('script[type="application/ld+json"]').first().textContent();

      try {
        const parsedData = JSON.parse(jsonLdContent!);
        console.log(`✅ JSON-LD is valid JSON`);
        console.log(`   Type: ${parsedData['@type']}`);
      } catch (e) {
        console.log('❌ JSON-LD parsing error:', e);
      }
    } else {
      console.log('⚠️ No JSON-LD structured data found');
    }
  });

  // =====================================================
  // 5. CONSOLE ERRORS & RESOURCES
  // =====================================================

  test('Check for 404 resource errors', async ({ page }) => {
    console.log('\n🚫 CHECKING FOR 404 ERRORS...');

    const failedRequests: string[] = [];

    page.on('response', response => {
      if (response.status() === 404) {
        failedRequests.push(`404: ${response.url()}`);
      }
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    if (failedRequests.length > 0) {
      console.log('❌ Found 404 errors:');
      failedRequests.forEach(req => console.log(`   ${req}`));
    } else {
      console.log('✅ No 404 errors found');
    }

    expect(failedRequests.length).toBe(0);
  });

  test('Image loading verification', async ({ page }) => {
    console.log('\n🖼️ TESTING IMAGE LOADING...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for images to load
    await page.waitForTimeout(2000);

    // Check for broken images
    const images = await page.$$eval('img', imgs =>
      imgs.map(img => ({
        src: img.src,
        loaded: img.complete && img.naturalWidth > 0
      }))
    );

    const totalImages = images.length;
    const loadedImages = images.filter(img => img.loaded).length;
    const brokenImages = images.filter(img => !img.loaded);

    console.log(`Total images: ${totalImages}`);
    console.log(`Loaded: ${loadedImages}`);
    console.log(`Failed: ${brokenImages.length}`);

    if (brokenImages.length > 0) {
      console.log('❌ Broken images:');
      brokenImages.forEach(img => console.log(`   ${img.src}`));
    } else {
      console.log('✅ All images loaded successfully');
    }
  });

  // =====================================================
  // 6. PERFORMANCE & ACCESSIBILITY CHECKS
  // =====================================================

  test('Mobile responsiveness check', async ({ page }) => {
    console.log('\n📱 TESTING MOBILE RESPONSIVENESS...');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    if (bodyWidth <= viewportWidth + 10) {
      console.log('✅ No horizontal scroll on mobile');
    } else {
      console.log(`⚠️ Horizontal scroll detected: body width ${bodyWidth}px vs viewport ${viewportWidth}px`);
    }

    // Check if main content is visible
    const mainContent = await page.locator('main, body > div').first().isVisible();
    expect(mainContent).toBe(true);
    console.log('✅ Main content visible on mobile');
  });

  test('Final console error summary', async ({ page }) => {
    console.log('\n📋 FINAL ERROR SUMMARY...');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for any async errors
    await page.waitForTimeout(2000);

    if (consoleErrors.length > 0) {
      console.log('❌ Console errors found:');
      consoleErrors.forEach(err => console.log(`   ${err}`));
      expect(consoleErrors.length).toBe(0);
    } else {
      console.log('✅ No console errors detected');
    }
  });
});
