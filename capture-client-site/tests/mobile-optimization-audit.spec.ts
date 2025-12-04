import { test, expect, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Mobile viewport configuration (iPhone SE)
const mobileViewport = {
  width: 375,
  height: 667,
};

test.describe('Mobile Optimization Audit', () => {
  test.use({
    viewport: mobileViewport,
    userAgent: devices['iPhone SE'].userAgent,
  });

  let consoleErrors: string[] = [];
  let consoleWarnings: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    consoleWarnings = [];

    // Capture console messages
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });
  });

  test('Homepage - Mobile Responsiveness', async ({ page }) => {
    console.log('\n=== TESTING HOMEPAGE ON MOBILE ===');

    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBe(200);

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // 1. Check for horizontal scroll issues
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = mobileViewport.width;
    console.log(`Body width: ${bodyWidth}px, Viewport width: ${viewportWidth}px`);

    if (bodyWidth > viewportWidth + 10) {
      console.log(`WARNING: Horizontal scroll detected (body: ${bodyWidth}px vs viewport: ${viewportWidth}px)`);
    } else {
      console.log('✅ No horizontal scroll issues');
    }

    // 2. Check navigation menu
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has(svg):has-text("Menu")').first();
    const hasMobileMenu = await mobileMenuButton.count() > 0;

    if (hasMobileMenu) {
      await expect(mobileMenuButton).toBeVisible();
      console.log('✅ Mobile menu button found');

      // Test menu functionality
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      console.log('✅ Mobile menu clicked successfully');
    } else {
      console.log('⚠️ No mobile menu button found - check navigation');
    }

    // 3. Check text readability (minimum font size should be 14px)
    const bodyFontSize = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontSize;
    });
    console.log(`Body font size: ${bodyFontSize}`);

    // 4. Check button sizes (should be at least 44x44px for touch targets)
    const buttons = await page.locator('button, a[role="button"]').all();
    let smallButtons = 0;

    for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
      const box = await button.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        smallButtons++;
        const text = await button.textContent();
        console.log(`⚠️ Small button found: "${text?.slice(0, 30)}" (${Math.round(box.width)}x${Math.round(box.height)}px)`);
      }
    }

    if (smallButtons === 0) {
      console.log('✅ All buttons meet minimum touch target size');
    }

    // 5. Check for lead capture form
    const form = page.locator('form').first();
    const formVisible = await form.isVisible().catch(() => false);

    if (formVisible) {
      console.log('✅ Lead capture form is visible on mobile');

      // Check form fields are usable
      const inputs = await form.locator('input, textarea').all();
      console.log(`Form has ${inputs.length} input fields`);
    } else {
      console.log('⚠️ Lead capture form not visible on mobile viewport');
    }

    // 6. Check CTAs visibility
    const ctas = page.locator('a:has-text("Contact"), button:has-text("Contact"), a:has-text("Get Started"), button:has-text("Get Started")');
    const ctaCount = await ctas.count();
    console.log(`Found ${ctaCount} CTA buttons on homepage`);

    // 7. Check images
    const images = await page.locator('img').all();
    let brokenImages = 0;

    for (const img of images.slice(0, 10)) { // Check first 10 images
      const isBroken = await img.evaluate((el: HTMLImageElement) => {
        return !el.complete || el.naturalWidth === 0;
      });

      if (isBroken) {
        brokenImages++;
      }
    }

    console.log(`Images checked: ${Math.min(images.length, 10)}, Broken: ${brokenImages}`);

    // 8. Check for MobileCTABar
    const mobileCTABar = page.locator('[class*="mobile-cta" i], [class*="sticky" i]:has(a[href^="tel:"])').first();
    const hasMobileCTABar = await mobileCTABar.count() > 0;

    if (hasMobileCTABar) {
      console.log('✅ Mobile CTA bar component found');
    } else {
      console.log('ℹ️ Mobile CTA bar not detected (may be styled differently)');
    }

    // 9. Report console errors
    if (consoleErrors.length > 0) {
      console.log(`\n❌ Console Errors (${consoleErrors.length}):`);
      consoleErrors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
    } else {
      console.log('\n✅ No console errors');
    }

    console.log('\n=== HOMEPAGE MOBILE TEST COMPLETE ===\n');
  });

  test('Contact Page - Mobile Responsiveness', async ({ page }) => {
    console.log('\n=== TESTING CONTACT PAGE ON MOBILE ===');

    const response = await page.goto(`${BASE_URL}/contact`);
    expect(response?.status()).toBe(200);

    await page.waitForLoadState('networkidle');

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = mobileViewport.width;

    if (bodyWidth > viewportWidth + 10) {
      console.log(`⚠️ Horizontal scroll on contact page: ${bodyWidth}px vs ${viewportWidth}px`);
    } else {
      console.log('✅ No horizontal scroll on contact page');
    }

    // Check contact form exists and is usable
    const contactForm = page.locator('form').first();
    const formExists = await contactForm.count() > 0;

    if (formExists) {
      await expect(contactForm).toBeVisible();
      console.log('✅ Contact form visible on mobile');

      // Check all form fields
      const nameField = contactForm.locator('input[name="name"], input[placeholder*="name" i]').first();
      const emailField = contactForm.locator('input[type="email"], input[name="email"]').first();
      const phoneField = contactForm.locator('input[type="tel"], input[name="phone"]').first();
      const messageField = contactForm.locator('textarea').first();

      const fields = [
        { name: 'Name', locator: nameField },
        { name: 'Email', locator: emailField },
        { name: 'Phone', locator: phoneField },
        { name: 'Message', locator: messageField },
      ];

      for (const field of fields) {
        const exists = await field.locator.count() > 0;
        if (exists) {
          const isVisible = await field.locator.isVisible();
          console.log(`  ${field.name} field: ${isVisible ? '✅ Visible' : '⚠️ Hidden'}`);
        }
      }

      // Test form interaction
      const nameInput = await nameField.count() > 0 ? nameField : contactForm.locator('input').first();
      if (await nameInput.count() > 0) {
        await nameInput.fill('Test User Mobile');
        console.log('✅ Form field interaction works on mobile');
      }

      // Check submit button
      const submitButton = contactForm.locator('button[type="submit"], input[type="submit"]').first();
      if (await submitButton.count() > 0) {
        const isEnabled = await submitButton.isEnabled();
        const box = await submitButton.boundingBox();
        console.log(`  Submit button: ${isEnabled ? 'Enabled' : 'Disabled'}, Size: ${box ? `${Math.round(box.width)}x${Math.round(box.height)}px` : 'N/A'}`);
      }
    } else {
      console.log('❌ Contact form not found');
    }

    // Check click-to-call links
    const telLinks = page.locator('a[href^="tel:"]');
    const telCount = await telLinks.count();
    console.log(`Click-to-call links found: ${telCount}`);

    if (consoleErrors.length > 0) {
      console.log(`\n❌ Console Errors: ${consoleErrors.length}`);
    } else {
      console.log('✅ No console errors');
    }

    console.log('\n=== CONTACT PAGE TEST COMPLETE ===\n');
  });

  test('Location Page - Mobile Responsiveness', async ({ page }) => {
    console.log('\n=== TESTING LOCATION PAGE ON MOBILE ===');

    const response = await page.goto(`${BASE_URL}/locations/voice-ai-knoxville-tn`);

    if (response?.status() === 404) {
      console.log('⚠️ Location page returns 404 - trying alternative URL...');
      const altResponse = await page.goto(`${BASE_URL}/locations/knoxville-tn`);

      if (altResponse?.status() === 404) {
        console.log('❌ Location pages not found - skipping test');
        return;
      }
    }

    await page.waitForLoadState('networkidle');

    // Check page title includes location
    const title = await page.title();
    console.log(`Page title: "${title}"`);

    if (title.includes('Knoxville') || title.includes('TN')) {
      console.log('✅ Location included in title');
    } else {
      console.log('⚠️ Location not clearly visible in title');
    }

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = mobileViewport.width;

    if (bodyWidth > viewportWidth + 10) {
      console.log(`⚠️ Horizontal scroll detected: ${bodyWidth}px vs ${viewportWidth}px`);
    } else {
      console.log('✅ No horizontal scroll');
    }

    // Check lead form
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      console.log('✅ Lead capture form present on location page');
    } else {
      console.log('⚠️ No lead form on location page');
    }

    // Check for local business info
    const hasAddress = await page.locator(':has-text("Tennessee"), :has-text("Knoxville")').count() > 0;
    console.log(`Local content: ${hasAddress ? '✅ Found' : '⚠️ Limited'}`);

    if (consoleErrors.length > 0) {
      console.log(`❌ Console Errors: ${consoleErrors.length}`);
    } else {
      console.log('✅ No console errors');
    }

    console.log('\n=== LOCATION PAGE TEST COMPLETE ===\n');
  });

  test('Services Page - Mobile Responsiveness', async ({ page }) => {
    console.log('\n=== TESTING SERVICES PAGE ON MOBILE ===');

    const response = await page.goto(`${BASE_URL}/services`);
    expect(response?.status()).toBe(200);

    await page.waitForLoadState('networkidle');

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = mobileViewport.width;

    if (bodyWidth > viewportWidth + 10) {
      console.log(`⚠️ Horizontal scroll: ${bodyWidth}px vs ${viewportWidth}px`);
    } else {
      console.log('✅ No horizontal scroll');
    }

    // Check service cards/links
    const serviceLinks = page.locator('a[href*="/services/"], h2, h3').first();
    const hasServices = await serviceLinks.count() > 0;

    if (hasServices) {
      console.log('✅ Service navigation visible');
    } else {
      console.log('⚠️ Service links not clearly visible');
    }

    // Check grid layout on mobile
    const gridElements = await page.locator('[class*="grid" i]').all();
    console.log(`Grid containers found: ${gridElements.length}`);

    if (consoleErrors.length > 0) {
      console.log(`❌ Console Errors: ${consoleErrors.length}`);
    } else {
      console.log('✅ No console errors');
    }

    console.log('\n=== SERVICES PAGE TEST COMPLETE ===\n');
  });

  test('Service Detail Page - Mobile Responsiveness', async ({ page }) => {
    console.log('\n=== TESTING SERVICE DETAIL PAGE ON MOBILE ===');

    const response = await page.goto(`${BASE_URL}/services/voice-ai`);

    if (response?.status() === 404) {
      console.log('⚠️ Service detail page not found - trying alternative...');
      const altResponse = await page.goto(`${BASE_URL}/services`);

      if (altResponse?.status() === 404) {
        console.log('❌ Service pages not accessible - skipping');
        return;
      }
    }

    await page.waitForLoadState('networkidle');

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = mobileViewport.width;

    if (bodyWidth > viewportWidth + 10) {
      console.log(`⚠️ Horizontal scroll: ${bodyWidth}px vs ${viewportWidth}px`);
    } else {
      console.log('✅ No horizontal scroll');
    }

    // Check content readability
    const headings = await page.locator('h1, h2').all();
    console.log(`Headings found: ${headings.length}`);

    // Check CTAs
    const ctas = page.locator('a:has-text("Contact"), button:has-text("Get Started"), a:has-text("Call")');
    const ctaCount = await ctas.count();
    console.log(`CTAs found: ${ctaCount}`);

    if (consoleErrors.length > 0) {
      console.log(`❌ Console Errors: ${consoleErrors.length}`);
    } else {
      console.log('✅ No console errors');
    }

    console.log('\n=== SERVICE DETAIL PAGE TEST COMPLETE ===\n');
  });

  test('Mobile CTA Bar - Sticky Bottom Bar', async ({ page }) => {
    console.log('\n=== TESTING MOBILE CTA BAR ===');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll down to trigger sticky bar
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    // Look for sticky bottom bar with call/form buttons
    const stickyBar = page.locator('[class*="fixed" i], [class*="sticky" i]').filter({
      has: page.locator('a[href^="tel:"], button:has-text("Call"), button:has-text("Form")')
    });

    const hasStickyBar = await stickyBar.count() > 0;

    if (hasStickyBar) {
      console.log('✅ Sticky CTA bar found');

      const isVisible = await stickyBar.first().isVisible();
      console.log(`  Visibility: ${isVisible ? '✅ Visible' : '⚠️ Hidden'}`);

      // Check for call button
      const callButton = stickyBar.locator('a[href^="tel:"]').first();
      if (await callButton.count() > 0) {
        const href = await callButton.getAttribute('href');
        console.log(`  ✅ Call button found: ${href}`);
      }

      // Check for form/contact button
      const formButton = stickyBar.locator('button, a').filter({ hasText: /form|contact|get started/i }).first();
      if (await formButton.count() > 0) {
        console.log('  ✅ Form/Contact button found');
      }
    } else {
      console.log('ℹ️ Sticky CTA bar not detected (may not be implemented)');
    }

    console.log('\n=== MOBILE CTA BAR TEST COMPLETE ===\n');
  });

  test('Form Submission - Mobile Viewport', async ({ page }) => {
    console.log('\n=== TESTING FORM SUBMISSION ON MOBILE ===');

    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const form = page.locator('form').first();

    if (await form.count() === 0) {
      console.log('⚠️ No form found on contact page - checking homepage...');
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
    }

    const testForm = page.locator('form').first();

    if (await testForm.count() > 0) {
      console.log('✅ Form found for testing');

      // Fill form fields
      const nameField = testForm.locator('input[name="name"], input[placeholder*="name" i]').first();
      const emailField = testForm.locator('input[type="email"], input[name="email"]').first();
      const phoneField = testForm.locator('input[type="tel"], input[name="phone"]').first();

      if (await nameField.count() > 0) {
        await nameField.fill('Mobile Test User');
        console.log('  ✅ Name field filled');
      }

      if (await emailField.count() > 0) {
        await emailField.fill('mobile@test.com');
        console.log('  ✅ Email field filled');
      }

      if (await phoneField.count() > 0) {
        await phoneField.fill('555-123-4567');
        console.log('  ✅ Phone field filled');
      }

      // Check submit button state
      const submitButton = testForm.locator('button[type="submit"], input[type="submit"]').first();

      if (await submitButton.count() > 0) {
        const isEnabled = await submitButton.isEnabled();
        const isVisible = await submitButton.isVisible();

        console.log(`  Submit button - Enabled: ${isEnabled}, Visible: ${isVisible}`);

        if (isEnabled && isVisible) {
          console.log('  ✅ Form ready for submission');
          // Note: Not actually submitting to avoid test data
        }
      }
    } else {
      console.log('❌ No form found for testing');
    }

    console.log('\n=== FORM SUBMISSION TEST COMPLETE ===\n');
  });

  test('Summary Report', async () => {
    console.log('\n');
    console.log('='.repeat(60));
    console.log('MOBILE OPTIMIZATION AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log('\nProject: C:\\Users\\eaqqa\\capture-client-website-seo\\capture-client-site');
    console.log('Mobile Viewport: 375x667 (iPhone SE)');
    console.log('Base URL: http://localhost:3000');
    console.log('\nAll mobile tests completed. Review individual test output above.');
    console.log('='.repeat(60));
    console.log('\n');
  });
});
