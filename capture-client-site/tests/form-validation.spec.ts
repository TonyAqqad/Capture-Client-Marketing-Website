import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Lead Capture Form Validation', () => {

  test('Homepage form - fields present and fillable', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(BASE_URL);

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Find form fields - try multiple selectors
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i], input[placeholder*="name" i]').first();
    const emailInput = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i]').first();
    const phoneInput = page.locator('input[name="phone"], input[type="tel"], input[placeholder*="phone" i]').first();

    // Check if fields exist
    const nameExists = await nameInput.count() > 0;
    const emailExists = await emailInput.count() > 0;
    const phoneExists = await phoneInput.count() > 0;

    console.log('\n=== HOMEPAGE FORM FIELDS ===');
    console.log(`Name field found: ${nameExists}`);
    console.log(`Email field found: ${emailExists}`);
    console.log(`Phone field found: ${phoneExists}`);

    if (nameExists && emailExists) {
      // Fill the form
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      if (phoneExists) {
        await phoneInput.fill('555-123-4567');
      }

      console.log('✅ Form fields filled successfully');

      // Find submit button
      const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Submit"), button:has-text("Send"), button:has-text("Get Started")').first();
      const submitExists = await submitButton.count() > 0;

      console.log(`Submit button found: ${submitExists}`);

      if (submitExists) {
        const isEnabled = await submitButton.isEnabled();
        console.log(`Submit button enabled: ${isEnabled}`);
      }
    }

    console.log(`\nConsole errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }
  });

  test('Homepage form - email validation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i]').first();
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i]').first();

    if (await emailInput.count() > 0 && await nameInput.count() > 0) {
      console.log('\n=== EMAIL VALIDATION TEST ===');

      // Fill with invalid email
      await nameInput.fill('Test User');
      await emailInput.fill('invalid-email');

      // Try to submit or trigger validation
      await emailInput.press('Tab');

      // Wait a moment for validation
      await page.waitForTimeout(1000);

      // Check for validation message
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      console.log(`Validation message for invalid email: "${validationMessage}"`);

      // Now fill with valid email
      await emailInput.fill('test@example.com');
      await emailInput.press('Tab');
      await page.waitForTimeout(500);

      const validationMessage2 = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      console.log(`Validation message for valid email: "${validationMessage2}"`);
    } else {
      console.log('⚠️ Could not find email field for validation test');
    }
  });

  test('Contact page form', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(`${BASE_URL}/contact`);

    console.log('\n=== CONTACT PAGE FORM ===');
    console.log(`Status: ${response?.status()}`);

    if (response?.status() === 200) {
      await page.waitForLoadState('networkidle');

      // Find form
      const form = page.locator('form').first();
      const formExists = await form.count() > 0;
      console.log(`Form found: ${formExists}`);

      if (formExists) {
        // Find all input fields
        const inputs = await form.locator('input').all();
        console.log(`Input fields found: ${inputs.length}`);

        for (const input of inputs) {
          const type = await input.getAttribute('type');
          const name = await input.getAttribute('name');
          const placeholder = await input.getAttribute('placeholder');
          console.log(`  - Input: type="${type}", name="${name}", placeholder="${placeholder}"`);
        }
      }

      console.log(`Console errors: ${consoleErrors.length}`);
      if (consoleErrors.length > 0) {
        console.log('Errors:', consoleErrors);
      }
    } else {
      console.log('⚠️ Contact page returned non-200 status');
    }
  });

  test('Form network configuration', async ({ page }) => {
    console.log('\n=== NETWORK CONFIGURATION ===');

    // Track network requests
    const requests: { url: string; method: string }[] = [];
    page.on('request', request => {
      if (request.url().includes('submit') || request.url().includes('lead') || request.url().includes('contact')) {
        requests.push({
          url: request.url(),
          method: request.method()
        });
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Find form and check action attribute
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const action = await form.getAttribute('action');
      const method = await form.getAttribute('method');
      console.log(`Form action: ${action || 'not set'}`);
      console.log(`Form method: ${method || 'not set'}`);
    }

    if (requests.length > 0) {
      console.log('\nRelevant network requests:');
      requests.forEach(req => {
        console.log(`  - ${req.method} ${req.url}`);
      });
    } else {
      console.log('No submit/lead-related requests captured (form not submitted)');
    }
  });

  test('Form accessibility and structure', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    console.log('\n=== FORM ACCESSIBILITY ===');

    const form = page.locator('form').first();
    if (await form.count() > 0) {
      // Check for labels
      const labels = await form.locator('label').count();
      console.log(`Labels found: ${labels}`);

      // Check for required fields
      const requiredInputs = await form.locator('input[required]').count();
      console.log(`Required fields: ${requiredInputs}`);

      // Check for aria-labels
      const ariaLabels = await form.locator('[aria-label]').count();
      console.log(`Elements with aria-label: ${ariaLabels}`);

      // Check for error containers
      const errorContainers = await page.locator('[role="alert"], .error, .error-message, [class*="error"]').count();
      console.log(`Error message containers: ${errorContainers}`);
    }
  });
});
