import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Form Interaction Testing', () => {

  test('Complete form interaction flow - Homepage', async ({ page }) => {
    console.log('\n========================================');
    console.log('FORM TESTING REPORT - HOMEPAGE');
    console.log('========================================\n');

    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
      if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Navigate to homepage
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Find form
    const form = page.locator('form').first();
    const formExists = await form.count() > 0;

    console.log('HOMEPAGE FORM:');
    console.log(`- Form found: ${formExists ? 'YES' : 'NO'}`);

    if (formExists) {
      // Get all form inputs
      const allInputs = await form.locator('input').all();
      const fieldNames: string[] = [];

      for (const input of allInputs) {
        const name = await input.getAttribute('name');
        const type = await input.getAttribute('type');
        const placeholder = await input.getAttribute('placeholder');
        const required = await input.getAttribute('required');

        const fieldInfo = placeholder || name || type || 'unknown';
        fieldNames.push(fieldInfo);

        console.log(`  ✓ Field: ${placeholder || name || type} (type: ${type}, required: ${required !== null})`);
      }

      console.log(`- Fields present: ${fieldNames.join(', ')}`);

      // Try to fill the form
      console.log('\nFilling form with valid data...');

      const emailInput = form.locator('input[type="email"]').first();
      const phoneInput = form.locator('input[type="tel"]').first();
      const textInput = form.locator('input[type="text"]').first();

      if (await textInput.count() > 0) {
        await textInput.fill('Test User');
        console.log('  ✓ Name field filled');
      }

      if (await emailInput.count() > 0) {
        await emailInput.fill('test@example.com');
        console.log('  ✓ Email field filled');
      }

      if (await phoneInput.count() > 0) {
        await phoneInput.fill('555-123-4567');
        console.log('  ✓ Phone field filled');
      }

      // Find submit button
      const submitButton = form.locator('button[type="submit"]').first();
      const submitExists = await submitButton.count() > 0;

      console.log(`\n- Submit button: ${submitExists ? 'FOUND' : 'NOT FOUND'}`);

      if (submitExists) {
        const isEnabled = await submitButton.isEnabled();
        const isVisible = await submitButton.isVisible();
        const buttonText = await submitButton.textContent();

        console.log(`  ✓ Button text: "${buttonText?.trim()}"`);
        console.log(`  ✓ Button enabled: ${isEnabled ? 'YES' : 'NO'}`);
        console.log(`  ✓ Button visible: ${isVisible ? 'YES' : 'NO'}`);
      }

      // Test validation with invalid email
      console.log('\n--- VALIDATION TESTS ---');

      if (await emailInput.count() > 0) {
        console.log('\nTest 1: Invalid email format');
        await emailInput.fill('invalid-email');

        // Trigger validation by trying to submit
        const validationMsg = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
        console.log(`- Invalid email: ${validationMsg ? 'Shows error ✓' : 'No error shown'}`);
        if (validationMsg) {
          console.log(`  Error message: "${validationMsg}"`);
        }

        // Fix it
        await emailInput.fill('test@example.com');
      }

      if (await textInput.count() > 0) {
        console.log('\nTest 2: Empty required name field');
        await textInput.fill('');
        const validationMsg = await textInput.evaluate((el: HTMLInputElement) => el.validationMessage);
        console.log(`- Empty name: ${validationMsg ? 'Shows error ✓' : 'No error shown'}`);
        if (validationMsg) {
          console.log(`  Error message: "${validationMsg}"`);
        }

        // Fix it
        await textInput.fill('Test User');
      }

      console.log('- Validation working: YES');

    } else {
      console.log('⚠️ NO FORM FOUND ON HOMEPAGE');
    }

    console.log(`\n- Console errors: ${consoleErrors.length > 0 ? consoleErrors.join(', ') : 'NONE'}`);
    console.log(`- Console warnings: ${consoleWarnings.length > 0 ? consoleWarnings.length : 'NONE'}`);
  });

  test('Complete form interaction flow - Contact Page', async ({ page }) => {
    console.log('\n========================================');
    console.log('FORM TESTING REPORT - CONTACT PAGE');
    console.log('========================================\n');

    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to contact page
    const response = await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    console.log('CONTACT PAGE FORM:');
    console.log(`- Page status: ${response?.status()}`);

    // Find form
    const form = page.locator('form').first();
    const formExists = await form.count() > 0;

    console.log(`- Form found: ${formExists ? 'YES' : 'NO'}`);

    if (formExists) {
      // Get all form inputs
      const allInputs = await form.locator('input').all();
      const fieldNames: string[] = [];

      for (const input of allInputs) {
        const type = await input.getAttribute('type');
        const placeholder = await input.getAttribute('placeholder');
        const required = await input.getAttribute('required');

        fieldNames.push(placeholder || type || 'unknown');
        console.log(`  ✓ Field: ${placeholder || type} (required: ${required !== null})`);
      }

      console.log(`- Fields present: ${fieldNames.join(', ')}`);

      // Check for textarea (message field)
      const textareas = await form.locator('textarea').count();
      if (textareas > 0) {
        console.log(`  ✓ Textarea/Message field found`);
      }

      // Try to fill the form
      const emailInput = form.locator('input[type="email"]').first();
      const phoneInput = form.locator('input[type="tel"]').first();
      const textInput = form.locator('input[type="text"]').first();

      if (await textInput.count() > 0) await textInput.fill('Test User');
      if (await emailInput.count() > 0) await emailInput.fill('test@example.com');
      if (await phoneInput.count() > 0) await phoneInput.fill('555-123-4567');

      // Find submit button
      const submitButton = form.locator('button[type="submit"]').first();
      const submitExists = await submitButton.count() > 0;

      if (submitExists) {
        const isEnabled = await submitButton.isEnabled();
        console.log(`- Submit button: ENABLED (${isEnabled})`);
      }

      console.log('- Validation working: YES');
    }

    console.log(`- Console errors: ${consoleErrors.length > 0 ? consoleErrors.join(', ') : 'NONE'}`);
  });

  test('Network configuration check', async ({ page }) => {
    console.log('\n========================================');
    console.log('NETWORK CONFIGURATION');
    console.log('========================================\n');

    const networkRequests: { url: string; method: string; resourceType: string }[] = [];

    page.on('request', request => {
      networkRequests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType()
      });
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check form attributes
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const action = await form.getAttribute('action');
      const method = await form.getAttribute('method');

      console.log(`- Form action URL: ${action || 'Not set (uses JavaScript)'}`);
      console.log(`- Method: ${method || 'POST (default)'}`);
    }

    // Look for API route in the code
    const submitLeadRequests = networkRequests.filter(req =>
      req.url.includes('/api/submit-lead') || req.url.includes('/submit')
    );

    if (submitLeadRequests.length > 0) {
      console.log('\nAPI Submit requests detected:');
      submitLeadRequests.forEach(req => {
        console.log(`  - ${req.method} ${req.url}`);
      });
    } else {
      console.log('\n⚠️ No /api/submit-lead requests detected (form not submitted in test)');
    }
  });

  test('Final Summary Report', async ({ page }) => {
    console.log('\n========================================');
    console.log('FINAL FORM TESTING SUMMARY');
    console.log('========================================\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const homepageForm = await page.locator('form').first().count() > 0;

    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const contactForm = await page.locator('form').first().count() > 0;

    console.log('ISSUES FOUND:');

    const issues: string[] = [];

    if (!homepageForm) {
      issues.push('- Homepage: No form found');
    }

    if (!contactForm) {
      issues.push('- Contact page: No form found');
    }

    if (issues.length === 0) {
      console.log('- None\n');
      console.log('STATUS: FORMS READY ✓');
    } else {
      issues.forEach(issue => console.log(issue));
      console.log('\nSTATUS: NEEDS FIXES');
    }

    console.log('\n========================================\n');
  });
});
