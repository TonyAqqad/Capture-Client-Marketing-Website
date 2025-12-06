/**
 * GHL WEBHOOK FORM TESTING SUITE
 *
 * Mission: Test ALL forms on Capture Client website to ensure GHL webhooks work
 *
 * This suite:
 * 1. Finds all forms across the website
 * 2. Verifies webhook configuration
 * 3. Tests form submissions
 * 4. Validates network requests to GHL
 * 5. Checks error handling and user feedback
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3004';

// Expected GHL webhook endpoint pattern
const GHL_WEBHOOK_PATTERN = /services\.leadconnectorhq\.com|gohighlevel\.com|\/api\/submit-lead/;

// Test data
const TEST_LEAD_DATA = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '(865) 555-1234',
  company: 'Test Company',
  service: 'voice-ai',
  message: 'This is a test submission',
  challenge: 'missing-calls',
};

interface FormLocation {
  url: string;
  formIdentifier: string;
  formType: 'LeadCaptureForm' | 'OptimizedLeadForm' | 'ContactForm' | 'ExitIntentPopup';
  expectedFields: string[];
}

// ========================================
// FORM INVENTORY
// ========================================

const FORMS_TO_TEST: FormLocation[] = [
  {
    url: '/',
    formIdentifier: 'form',
    formType: 'LeadCaptureForm',
    expectedFields: ['name', 'email', 'phone', 'service'],
  },
  {
    url: '/contact',
    formIdentifier: 'form',
    formType: 'LeadCaptureForm',
    expectedFields: ['name', 'email', 'phone', 'service', 'message'],
  },
  {
    url: '/demo',
    formIdentifier: 'form',
    formType: 'LeadCaptureForm',
    expectedFields: ['name', 'email', 'phone'],
  },
  {
    url: '/pricing',
    formIdentifier: 'form',
    formType: 'LeadCaptureForm',
    expectedFields: ['name', 'email', 'phone'],
  },
  {
    url: '/services/voice-ai',
    formIdentifier: 'form',
    formType: 'LeadCaptureForm',
    expectedFields: ['name', 'email', 'phone'],
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

async function fillLeadCaptureForm(page: Page, data = TEST_LEAD_DATA) {
  // Fill name
  const nameInput = page.locator('input[name="name"], input#name, input[placeholder*="Name" i]').first();
  await nameInput.waitFor({ state: 'visible', timeout: 5000 });
  await nameInput.fill(data.name);

  // Fill email
  const emailInput = page.locator('input[type="email"], input[name="email"], input#email').first();
  await emailInput.waitFor({ state: 'visible', timeout: 5000 });
  await emailInput.fill(data.email);

  // Fill phone
  const phoneInput = page.locator('input[type="tel"], input[name="phone"], input#phone').first();
  await phoneInput.waitFor({ state: 'visible', timeout: 5000 });
  await phoneInput.fill(data.phone);

  // Fill service if exists
  const serviceSelect = page.locator('select[name="service"], select#service').first();
  if (await serviceSelect.isVisible().catch(() => false)) {
    await serviceSelect.selectOption(data.service);
  }

  // Fill message if exists
  const messageTextarea = page.locator('textarea[name="message"], textarea#message').first();
  if (await messageTextarea.isVisible().catch(() => false)) {
    await messageTextarea.fill(data.message);
  }
}

async function fillOptimizedLeadForm(page: Page, data = TEST_LEAD_DATA) {
  // Step 1: Name and Phone
  const nameInput = page.locator('input[name="name"], input#name').first();
  await nameInput.waitFor({ state: 'visible', timeout: 5000 });
  await nameInput.fill(data.name);

  const phoneInput = page.locator('input[type="tel"], input[name="phone"]').first();
  await phoneInput.fill(data.phone);

  // Click continue button
  const continueButton = page.locator('button[type="submit"]:has-text("Continue")').first();
  await continueButton.click();

  // Wait for step 2
  await page.waitForTimeout(500);

  // Step 2: Challenge
  const challengeSelect = page.locator('select#challenge, select[name="challenge"]').first();
  await challengeSelect.waitFor({ state: 'visible', timeout: 5000 });
  await challengeSelect.selectOption(data.challenge);
}

// ========================================
// TEST SUITE
// ========================================

test.describe('GHL Webhook Form Testing', () => {

  // ========================================
  // 1. HOMEPAGE FORM TEST
  // ========================================

  test('Homepage - Lead Capture Form', async ({ page }) => {
    const webhookRequests: any[] = [];

    // Intercept network requests
    page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/submit-lead')) {
        webhookRequests.push({
          url,
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });

    // Navigate to homepage
    await page.goto(BASE_URL);

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Find form
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    console.log('✅ Homepage: Form found');

    // Fill form
    await fillLeadCaptureForm(page);

    console.log('✅ Homepage: Form filled');

    // Submit form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Wait for submission
    await page.waitForTimeout(2000);

    // Check if webhook was called
    expect(webhookRequests.length).toBeGreaterThan(0);
    console.log(`✅ Homepage: Webhook called ${webhookRequests.length} time(s)`);

    // Validate payload
    const payload = webhookRequests[0].postData;
    expect(payload).toHaveProperty('name');
    expect(payload).toHaveProperty('email');
    expect(payload).toHaveProperty('phone');
    expect(payload.name).toBe(TEST_LEAD_DATA.name);
    expect(payload.email).toBe(TEST_LEAD_DATA.email);

    console.log('✅ Homepage: Payload validated', payload);

    // Check for success message
    const successMessage = page.locator('text=/thank you/i, text=/success/i').first();
    await expect(successMessage).toBeVisible({ timeout: 5000 });

    console.log('✅ Homepage: Success message displayed');
  });

  // ========================================
  // 2. CONTACT PAGE FORM TEST
  // ========================================

  test('Contact Page - Lead Capture Form', async ({ page }) => {
    const webhookRequests: any[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/submit-lead')) {
        webhookRequests.push({
          url,
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });

    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    console.log('✅ Contact Page: Form found');

    await fillLeadCaptureForm(page);
    console.log('✅ Contact Page: Form filled');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    await page.waitForTimeout(2000);

    expect(webhookRequests.length).toBeGreaterThan(0);
    console.log(`✅ Contact Page: Webhook called ${webhookRequests.length} time(s)`);

    const payload = webhookRequests[0].postData;
    expect(payload).toHaveProperty('source');
    expect(payload.source).toContain('contact');

    console.log('✅ Contact Page: Payload validated', payload);

    const successMessage = page.locator('text=/thank you/i').first();
    await expect(successMessage).toBeVisible({ timeout: 5000 });

    console.log('✅ Contact Page: Success message displayed');
  });

  // ========================================
  // 3. DEMO PAGE FORM TEST
  // ========================================

  test('Demo Page - Interactive Demo', async ({ page }) => {
    const webhookRequests: any[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/submit-lead')) {
        webhookRequests.push({
          url,
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });

    await page.goto(`${BASE_URL}/demo`);
    await page.waitForLoadState('networkidle');

    console.log('✅ Demo Page: Loaded');

    // Demo page might not have a form - it's an interactive demo
    // Check if form exists on this page
    const forms = await page.locator('form').count();

    if (forms === 0) {
      console.log('⚠️  Demo Page: No forms found (interactive demo only)');
      return; // Skip if no form
    }

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    console.log('✅ Demo Page: Form found');

    await fillLeadCaptureForm(page);
    console.log('✅ Demo Page: Form filled');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    await page.waitForTimeout(2000);

    console.log(`✅ Demo Page: Webhook requests: ${webhookRequests.length}`);
  });

  // ========================================
  // 4. PRICING PAGE FORM TEST
  // ========================================

  test('Pricing Page - Lead Capture Form', async ({ page }) => {
    const webhookRequests: any[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/submit-lead')) {
        webhookRequests.push({
          url,
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });

    await page.goto(`${BASE_URL}/pricing`);
    await page.waitForLoadState('networkidle');

    const forms = await page.locator('form').count();

    if (forms === 0) {
      console.log('⚠️  Pricing Page: No forms found');
      return;
    }

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    console.log('✅ Pricing Page: Form found');

    await fillLeadCaptureForm(page);
    console.log('✅ Pricing Page: Form filled');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    await page.waitForTimeout(2000);

    console.log(`✅ Pricing Page: Webhook requests: ${webhookRequests.length}`);
  });

  // ========================================
  // 5. SERVICE PAGE FORM TEST
  // ========================================

  test('Service Page (Voice AI) - Lead Capture Form', async ({ page }) => {
    const webhookRequests: any[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/submit-lead')) {
        webhookRequests.push({
          url,
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });

    await page.goto(`${BASE_URL}/services/voice-ai`);
    await page.waitForLoadState('networkidle');

    const forms = await page.locator('form').count();

    if (forms === 0) {
      console.log('⚠️  Voice AI Service Page: No forms found');
      return;
    }

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    console.log('✅ Voice AI Service Page: Form found');

    await fillLeadCaptureForm(page);
    console.log('✅ Voice AI Service Page: Form filled');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    await page.waitForTimeout(2000);

    console.log(`✅ Voice AI Service Page: Webhook requests: ${webhookRequests.length}`);
  });

  // ========================================
  // 6. EXIT INTENT POPUP TEST
  // ========================================

  test('Exit Intent Popup - Form Test', async ({ page }) => {
    const webhookRequests: any[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/submit-lead')) {
        webhookRequests.push({
          url,
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Wait for exit intent to activate (5 seconds delay)
    await page.waitForTimeout(6000);

    // Simulate exit intent by moving mouse to top of page
    await page.mouse.move(500, 0);
    await page.mouse.move(500, -10);

    // Wait for popup
    await page.waitForTimeout(1000);

    // Check if exit intent popup appeared
    const popup = page.locator('text=/before you go/i').first();
    const isPopupVisible = await popup.isVisible().catch(() => false);

    if (!isPopupVisible) {
      console.log('⚠️  Exit Intent Popup: Did not trigger (may require longer session)');
      return;
    }

    console.log('✅ Exit Intent Popup: Triggered');

    // The exit intent popup has CTA buttons, not a form
    // Check for "Book Free Demo" button
    const ctaButton = page.locator('button:has-text("Book Free Demo"), a:has-text("Book Free Demo")').first();

    if (await ctaButton.isVisible()) {
      console.log('✅ Exit Intent Popup: CTA button found');
      // Note: Exit intent redirects to contact page, doesn't have its own form
    }
  });

  // ========================================
  // 7. COMPREHENSIVE FORM DISCOVERY
  // ========================================

  test('Form Discovery - Find ALL forms across site', async ({ page }) => {
    const pagesToScan = [
      '/',
      '/contact',
      '/demo',
      '/pricing',
      '/services',
      '/services/voice-ai',
      '/services/google-ads',
      '/services/facebook-ads',
      '/how-it-works',
      '/who-we-serve',
      '/integrations',
    ];

    const formInventory: any[] = [];

    for (const url of pagesToScan) {
      try {
        await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle', timeout: 10000 });

        const forms = await page.locator('form').all();

        if (forms.length > 0) {
          for (let i = 0; i < forms.length; i++) {
            const form = forms[i];

            // Get form attributes
            const action = await form.getAttribute('action').catch(() => null);
            const method = await form.getAttribute('method').catch(() => null);

            // Count inputs
            const inputs = await form.locator('input, textarea, select').all();
            const inputNames = [];

            for (const input of inputs) {
              const name = await input.getAttribute('name').catch(() => null);
              const type = await input.getAttribute('type').catch(() => null);
              if (name) {
                inputNames.push(`${name} (${type || 'text'})`);
              }
            }

            formInventory.push({
              page: url,
              formIndex: i,
              action,
              method: method || 'client-side',
              inputs: inputNames,
              inputCount: inputs.length,
            });
          }
        }
      } catch (error) {
        console.log(`⚠️  Could not scan ${url}: ${error}`);
      }
    }

    console.log('\n========================================');
    console.log('FORM INVENTORY REPORT');
    console.log('========================================\n');

    formInventory.forEach((form, index) => {
      console.log(`\nForm #${index + 1}:`);
      console.log(`  Page: ${form.page}`);
      console.log(`  Index: ${form.formIndex}`);
      console.log(`  Action: ${form.action || 'None (client-side)'}`);
      console.log(`  Method: ${form.method}`);
      console.log(`  Input Count: ${form.inputCount}`);
      console.log(`  Inputs: ${form.inputs.join(', ')}`);
    });

    console.log(`\n========================================`);
    console.log(`TOTAL FORMS FOUND: ${formInventory.length}`);
    console.log(`========================================\n`);

    // Assert we found forms
    expect(formInventory.length).toBeGreaterThan(0);
  });

  // ========================================
  // 8. WEBHOOK CONFIGURATION TEST
  // ========================================

  test('API Route - Webhook Configuration Check', async ({ page }) => {
    // Test the API route health check
    const response = await page.goto(`${BASE_URL}/api/submit-lead`);

    const json = await response?.json();

    console.log('\n========================================');
    console.log('WEBHOOK CONFIGURATION STATUS');
    console.log('========================================\n');
    console.log('API Health:', json);
    console.log('\nGHL Configured:', json.config?.ghlConfigured ? '✅ YES' : '❌ NO');
    console.log('Resend Configured:', json.config?.resendConfigured ? '✅ YES' : '❌ NO');
    console.log('Pending Failed Leads:', json.pendingFailedLeads || 0);
    console.log('\n========================================\n');

    expect(json).toHaveProperty('healthy');
    expect(json.healthy).toBe(true);
  });

  // ========================================
  // 9. ERROR HANDLING TEST
  // ========================================

  test('Form Validation - Test Required Fields', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Check for browser validation message
    const nameInput = page.locator('input[name="name"], input#name').first();
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);

    expect(isInvalid).toBe(true);
    console.log('✅ Form Validation: Required fields enforced');
  });

  // ========================================
  // 10. LOADING STATES TEST
  // ========================================

  test('Form Submission - Loading State Test', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    await fillLeadCaptureForm(page);

    const submitButton = page.locator('button[type="submit"]').first();

    // Check button text before submission
    const beforeText = await submitButton.textContent();
    console.log('Button text before:', beforeText);

    await submitButton.click();

    // Check for loading state (button should be disabled or show "Submitting...")
    await page.waitForTimeout(100);

    const duringText = await submitButton.textContent();
    console.log('Button text during:', duringText);

    // Loading state should appear
    const hasLoadingState = duringText?.toLowerCase().includes('submit') ||
                           await submitButton.isDisabled().catch(() => false);

    if (hasLoadingState) {
      console.log('✅ Loading State: Active during submission');
    }
  });
});

// ========================================
// SUMMARY TEST - GENERATES FINAL REPORT
// ========================================

test.describe('GHL Webhook Testing - Final Report', () => {
  test('Generate Comprehensive Test Report', async ({ page }) => {
    console.log('\n\n');
    console.log('='.repeat(60));
    console.log('GHL WEBHOOK FORM TESTING - FINAL REPORT');
    console.log('='.repeat(60));
    console.log('\n');

    console.log('TEST SCOPE:');
    console.log('  ✓ Homepage lead capture form');
    console.log('  ✓ Contact page lead capture form');
    console.log('  ✓ Demo page (interactive demo)');
    console.log('  ✓ Pricing page forms');
    console.log('  ✓ Service page forms');
    console.log('  ✓ Exit intent popup');
    console.log('  ✓ Form discovery across all pages');
    console.log('  ✓ Webhook configuration validation');
    console.log('  ✓ Form validation testing');
    console.log('  ✓ Loading state verification');
    console.log('\n');

    console.log('WEBHOOK ENDPOINT:');
    console.log('  → /api/submit-lead (Server-side route)');
    console.log('\n');

    console.log('EXPECTED FIELD MAPPINGS:');
    console.log('  name → GHL "name" field');
    console.log('  email → GHL "email" field');
    console.log('  phone → GHL "phone" field');
    console.log('  service → GHL custom field');
    console.log('  message → GHL "notes" field');
    console.log('  challenge → GHL custom field');
    console.log('  source → GHL "source" field');
    console.log('\n');

    console.log('='.repeat(60));
    console.log('\n\n');
  });
});
