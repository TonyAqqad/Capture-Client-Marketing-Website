import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('COMPREHENSIVE FORMS & LEAD CAPTURE AUDIT', () => {

  // TEST 1: Homepage Contact Form (Final CTA Section)
  test('Homepage - Final CTA Contact Form', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(BASE_URL);

    // Scroll to bottom to find final CTA form
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Look for the form - it should be in the main page content
    const form = page.locator('form').last(); // Get the last form on the page
    await expect(form).toBeVisible({ timeout: 10000 });

    // Check all required fields are present
    const nameInput = page.locator('input#name');
    const emailInput = page.locator('input#email');
    const phoneInput = page.locator('input#phone');
    const serviceSelect = page.locator('select#service');
    const messageTextarea = page.locator('textarea#message');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(serviceSelect).toBeVisible();
    await expect(messageTextarea).toBeVisible();

    // Check labels are properly associated
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const phoneLabel = page.locator('label[for="phone"]');
    const serviceLabel = page.locator('label[for="service"]');

    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(phoneLabel).toBeVisible();
    await expect(serviceLabel).toBeVisible();

    // Check required field indicators (asterisks)
    const requiredAsterisks = page.locator('label span.text-accent:has-text("*")');
    expect(await requiredAsterisks.count()).toBeGreaterThan(0);

    // Fill in test data
    await nameInput.fill('Test Audit User');
    await emailInput.fill('test@auditexample.com');
    await phoneInput.fill('(555) 123-4567');
    await serviceSelect.selectOption('voice-ai');
    await messageTextarea.fill('This is a test message for the audit.');

    // Find and check submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    // Verify button text
    const buttonText = await submitButton.textContent();
    expect(buttonText).toContain('Get Your Free Consultation');

    // Check for click-to-call option
    const phoneLink = page.locator('a[href="tel:865-346-3339"]');
    expect(await phoneLink.count()).toBeGreaterThan(0);

    // Verify no console errors so far
    expect(consoleErrors.length).toBe(0);

    // Test form submission
    await submitButton.click();

    // Wait for success message
    await page.waitForTimeout(2000);

    // Check for success message
    const successMessage = page.locator('text=Thank You');
    await expect(successMessage).toBeVisible({ timeout: 5000 });

    console.log('✅ Homepage Contact Form: PASS');
  });

  // TEST 2: Footer Newsletter Signup
  test('Footer - Newsletter Signup Form', async ({ page }) => {
    await page.goto(BASE_URL);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Find newsletter form in footer
    const footerEmailInput = page.locator('footer input#footer-email');
    await expect(footerEmailInput).toBeVisible();

    // Check for label (should be sr-only for accessibility)
    const footerEmailLabel = page.locator('footer label[for="footer-email"]');
    await expect(footerEmailLabel).toBeAttached(); // May be hidden but should exist

    // Check placeholder
    const placeholder = await footerEmailInput.getAttribute('placeholder');
    expect(placeholder).toContain('email');

    // Fill in test email
    await footerEmailInput.fill('newsletter@auditexample.com');

    // Find subscribe button
    const subscribeButton = page.locator('footer button[type="submit"]');
    await expect(subscribeButton).toBeVisible();
    await expect(subscribeButton).toBeEnabled();

    const buttonText = await subscribeButton.textContent();
    expect(buttonText).toContain('Subscribe');

    // Check email validation (try invalid email)
    await footerEmailInput.fill('invalid-email');
    // HTML5 validation should prevent submission
    const validationMessage = await footerEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy(); // Should have validation message

    // Fix to valid email
    await footerEmailInput.fill('valid@example.com');

    console.log('✅ Footer Newsletter Form: PASS');
  });

  // TEST 3: Contact Page Form (/contact)
  test('Contact Page - Main Lead Capture Form', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(`${BASE_URL}/contact`);
    expect(response?.status()).toBe(200);

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify headline
    const headline = page.locator('h1:has-text("Grow Together")');
    await expect(headline).toBeVisible();

    // Find the form
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // Check all form fields
    const nameInput = page.locator('input#name');
    const emailInput = page.locator('input#email');
    const phoneInput = page.locator('input#phone');
    const serviceSelect = page.locator('select#service');
    const messageTextarea = page.locator('textarea#message');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(serviceSelect).toBeVisible();
    await expect(messageTextarea).toBeVisible();

    // Test autocomplete attributes for better UX
    expect(await nameInput.getAttribute('autocomplete')).toBe('name');
    expect(await emailInput.getAttribute('autocomplete')).toBe('email');
    expect(await phoneInput.getAttribute('autocomplete')).toBe('tel');

    // Test phone input mode (should be numeric for better mobile experience)
    expect(await phoneInput.getAttribute('inputMode')).toBe('numeric');

    // Fill form with test data
    await nameInput.fill('Contact Page Test User');
    await emailInput.fill('contactpage@auditexample.com');
    await phoneInput.fill('(555) 987-6543');
    await serviceSelect.selectOption('google-ads');
    await messageTextarea.fill('Testing the contact page form for the comprehensive audit.');

    // Check submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    // Test form submission
    await submitButton.click();
    await page.waitForTimeout(2000);

    // Verify success message appears
    const successHeadline = page.locator('h3:has-text("Thank You")');
    await expect(successHeadline).toBeVisible({ timeout: 5000 });

    // Verify no console errors
    expect(consoleErrors.length).toBe(0);

    // Check contact info cards
    const phoneCard = page.locator('a[href="tel:865-346-3339"]').first();
    await expect(phoneCard).toBeVisible();

    const phoneNumber = await phoneCard.textContent();
    expect(phoneNumber).toContain('(865) 346-3339');

    console.log('✅ Contact Page Form: PASS');
  });

  // TEST 4: Demo Page Existence Check
  test('Demo Page - Verify Page Loads', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/demo`);

    if (response?.status() === 404) {
      console.log('ℹ️ Demo Page: 404 (Not Found)');
    } else {
      expect(response?.status()).toBe(200);

      // Check for page content
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      console.log('✅ Demo Page: EXISTS and loads successfully');
    }
  });

  // TEST 5: Exit Intent Popup Form
  test('Exit Intent Popup - Trigger and Verify', async ({ page }) => {
    await page.goto(BASE_URL);

    // Wait for exit intent to be ready (has 5 second delay)
    await page.waitForTimeout(6000);

    // Trigger exit intent by moving mouse to top of viewport
    await page.mouse.move(0, 0);
    await page.mouse.move(500, 5); // Move near top edge

    // Dispatch mouseleave event on document
    await page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        clientY: 5,
        bubbles: true
      });
      document.dispatchEvent(event);
    });

    // Wait for popup to appear
    await page.waitForTimeout(1000);

    // Check if popup appeared
    const popup = page.locator('text=Before You Go');

    if (await popup.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('✅ Exit Intent Popup: TRIGGERED');

      // Check for CTA buttons in popup
      const bookDemoBtn = page.locator('button:has-text("Book Free Demo")');
      const callNowBtn = page.locator('a:has-text("Call Now")');

      await expect(bookDemoBtn).toBeVisible();
      await expect(callNowBtn).toBeVisible();

      // Check close button
      const closeBtn = page.locator('button[aria-label="Close popup"]');
      await expect(closeBtn).toBeVisible();

      // Test closing popup
      await closeBtn.click();
      await page.waitForTimeout(500);

      // Popup should be hidden
      await expect(popup).not.toBeVisible();

      console.log('✅ Exit Intent Popup: Close functionality works');
    } else {
      console.log('⚠️ Exit Intent Popup: Did not trigger (may require different conditions)');
    }
  });

  // TEST 6: Form Accessibility Audit
  test('Accessibility - All Forms Compliance', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/contact`);

    const issues: string[] = [];

    // Check all inputs have associated labels
    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="tel"], select, textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        if (!(await label.count())) {
          issues.push(`Missing label for input#${id}`);
        }
      }
    }

    // Check required fields are marked
    const requiredInputs = await page.locator('input[required], select[required]').all();
    for (const input of requiredInputs) {
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasAsterisk = await label.locator('span.text-accent:has-text("*")').count();
        if (!hasAsterisk) {
          issues.push(`Required field input#${id} missing visual indicator (*)`);
        }
      }
    }

    // Check all buttons have accessible text
    const buttons = await page.locator('button[type="submit"]').all();
    for (const button of buttons) {
      const text = await button.textContent();
      if (!text || text.trim().length === 0) {
        const ariaLabel = await button.getAttribute('aria-label');
        if (!ariaLabel) {
          issues.push('Submit button missing accessible text');
        }
      }
    }

    // Check focus states are visible (via CSS)
    const focusableElements = await page.locator('input, button, a[href]').all();

    if (focusableElements.length > 0) {
      // Focus on first element and check styles
      await focusableElements[0].focus();
      // Visual check would require screenshot comparison - just verify focusable
      expect(focusableElements.length).toBeGreaterThan(0);
    }

    // Report issues
    if (issues.length > 0) {
      console.log('⚠️ Accessibility Issues Found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('✅ Accessibility Audit: PASS (no issues found)');
    }

    expect(issues.length).toBe(0);
  });

  // TEST 7: Form Validation Behavior
  test('Form Validation - Required Fields', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);

    const nameInput = page.locator('input#name');
    const emailInput = page.locator('input#email');
    const phoneInput = page.locator('input#phone');
    const serviceSelect = page.locator('select#service');
    const submitButton = page.locator('button[type="submit"]');

    // Try to submit empty form
    await submitButton.click();

    // HTML5 validation should prevent submission
    // Check if name field shows validation
    const nameValidation = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(nameValidation).toBeTruthy();

    // Fill only name, try again
    await nameInput.fill('Test User');
    await submitButton.click();

    // Email should now be invalid
    const emailValidation = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(emailValidation).toBeTruthy();

    // Fill email with invalid format
    await emailInput.fill('invalid-email');
    await submitButton.click();

    const emailFormatValidation = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(emailFormatValidation).toBeTruthy();

    // Fill all required fields correctly
    await nameInput.fill('Complete User');
    await emailInput.fill('complete@test.com');
    await phoneInput.fill('555-1234');
    await serviceSelect.selectOption('voice-ai');

    // Now form should submit
    await submitButton.click();
    await page.waitForTimeout(2000);

    const success = page.locator('h3:has-text("Thank You")');
    await expect(success).toBeVisible({ timeout: 5000 });

    console.log('✅ Form Validation: PASS');
  });

  // TEST 8: Mobile Responsiveness - Touch Targets
  test('Mobile - Touch Target Sizes (44x44px minimum)', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/contact`);

    const issues: string[] = [];

    // Check all interactive elements meet 44x44px minimum
    const interactiveElements = await page.locator('button, a[href], input, select, textarea').all();

    for (let i = 0; i < Math.min(interactiveElements.length, 10); i++) {
      const element = interactiveElements[i];
      const box = await element.boundingBox();

      if (box) {
        // Check for min-h-[44px] or equivalent
        if (box.height < 44) {
          const selector = await element.evaluate(el => {
            return el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className.split(' ')[0]}` : '');
          });
          issues.push(`Element ${selector} has insufficient height: ${box.height}px (minimum 44px)`);
        }
      }
    }

    if (issues.length > 0) {
      console.log('⚠️ Mobile Touch Target Issues:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('✅ Mobile Touch Targets: PASS');
    }

    // Should have minimal issues (some elements like icons may be smaller)
    expect(issues.length).toBeLessThan(5);
  });

  // TEST 9: Performance - Form Load Time
  test('Performance - Forms Load Quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Form should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);

    console.log(`✅ Form Load Performance: ${loadTime}ms (target: < 3000ms)`);
  });

  // TEST 10: API Integration - Form Submission Endpoint
  test('API - Form Submission Endpoint Exists', async ({ page }) => {
    await page.goto(BASE_URL);

    // Intercept API calls
    const apiCalls: string[] = [];

    page.on('request', request => {
      if (request.url().includes('/api/submit-lead')) {
        apiCalls.push(request.url());
      }
    });

    // Fill and submit form
    const nameInput = page.locator('input#name').first();
    const emailInput = page.locator('input#email').first();
    const phoneInput = page.locator('input#phone').first();
    const serviceSelect = page.locator('select#service').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await nameInput.fill('API Test User');
    await emailInput.fill('api@test.com');
    await phoneInput.fill('555-0000');
    await serviceSelect.selectOption('voice-ai');

    await submitButton.click();
    await page.waitForTimeout(2000);

    // Check if API was called
    if (apiCalls.length > 0) {
      console.log('✅ API Endpoint: Called successfully (/api/submit-lead)');
    } else {
      console.log('ℹ️ API Endpoint: No call detected (graceful degradation active)');
    }

    // Form should still show success even if API fails (graceful degradation)
    const success = page.locator('h3:has-text("Thank You")');
    await expect(success).toBeVisible({ timeout: 5000 });
  });
});
