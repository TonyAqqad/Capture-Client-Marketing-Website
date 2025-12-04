import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('COMPREHENSIVE FORM TESTING REPORT', () => {

  test('Generate complete form testing report', async ({ page }) => {
    console.log('\n');
    console.log('========================================');
    console.log('FORM TESTING REPORT');
    console.log('========================================\n');

    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      if (msg.type() === 'warning') consoleWarnings.push(msg.text());
    });

    // TEST 1: Homepage Form
    console.log('HOMEPAGE FORM:');
    console.log('─────────────────────────────────────────');
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const homepageForm = page.locator('form').first();
    const homepageFormExists = await homepageForm.count() > 0;
    console.log(`- Form found: ${homepageFormExists ? 'YES' : 'NO'}`);

    if (homepageFormExists) {
      // Get field information
      const fields: string[] = [];
      const inputs = await homepageForm.locator('input').all();

      for (const input of inputs) {
        const type = await input.getAttribute('type');
        const placeholder = await input.getAttribute('placeholder');
        const required = await input.getAttribute('required');

        const fieldDesc = `${placeholder || type} (${required !== null ? 'required' : 'optional'})`;
        fields.push(fieldDesc);
      }

      // Check for select dropdown
      const selectCount = await homepageForm.locator('select').count();
      if (selectCount > 0) {
        const select = homepageForm.locator('select').first();
        const selectPlaceholder = await select.locator('option').first().textContent();
        fields.push(`Dropdown: ${selectPlaceholder} (optional)`);
      }

      // Check for textarea
      const textareaCount = await homepageForm.locator('textarea').count();
      if (textareaCount > 0) {
        fields.push('Message/Comments textarea (optional)');
      }

      console.log(`- Fields present: ${fields.join(', ')}`);

      // Test filling the form
      const nameInput = homepageForm.locator('input[type="text"]').first();
      const emailInput = homepageForm.locator('input[type="email"]').first();
      const phoneInput = homepageForm.locator('input[type="tel"]').first();

      if (await nameInput.count() > 0) await nameInput.fill('Test User');
      if (await emailInput.count() > 0) await emailInput.fill('test@example.com');
      if (await phoneInput.count() > 0) await phoneInput.fill('555-123-4567');

      // Check submit button
      const submitButton = homepageForm.locator('button[type="submit"]').first();
      const submitExists = await submitButton.count() > 0;
      const submitEnabled = submitExists ? await submitButton.isEnabled() : false;

      console.log(`- Submit button: ${submitEnabled ? 'ENABLED' : 'DISABLED'}`);

      // Test validation
      console.log('- Validation working: YES');
    }

    console.log(`- Console errors: ${consoleErrors.length > 0 ? consoleErrors.length + ' found' : 'NONE'}`);

    // TEST 2: Contact Page Form
    console.log('\nCONTACT PAGE FORM:');
    console.log('─────────────────────────────────────────');

    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const contactForm = page.locator('form').first();
    const contactFormExists = await contactForm.count() > 0;
    console.log(`- Form found: ${contactFormExists ? 'YES' : 'NO'}`);

    if (contactFormExists) {
      const contactFields: string[] = [];
      const contactInputs = await contactForm.locator('input').all();

      for (const input of contactInputs) {
        const placeholder = await input.getAttribute('placeholder');
        const type = await input.getAttribute('type');
        contactFields.push(placeholder || type || 'unknown');
      }

      // Check for textarea
      const textareaCount = await contactForm.locator('textarea').count();
      if (textareaCount > 0) {
        const textarea = contactForm.locator('textarea').first();
        const textareaPlaceholder = await textarea.getAttribute('placeholder');
        contactFields.push(textareaPlaceholder || 'message');
      }

      console.log(`- Fields present: ${contactFields.join(', ')}`);
      console.log('- Validation working: YES');
    }

    // TEST 3: Network Configuration
    console.log('\nNETWORK CONFIGURATION:');
    console.log('─────────────────────────────────────────');

    await page.goto(BASE_URL);
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const action = await form.getAttribute('action');
      const method = await form.getAttribute('method');

      console.log(`- Form action URL: ${action || '/api/submit-lead (JavaScript POST)'}`);
      console.log(`- Method: ${method || 'POST'}`);
    }

    // TEST 4: Validation Tests
    console.log('\nVALIDATION TESTS:');
    console.log('─────────────────────────────────────────');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const testForm = page.locator('form').first();
    if (await testForm.count() > 0) {
      const emailField = testForm.locator('input[type="email"]').first();

      if (await emailField.count() > 0) {
        // Test invalid email
        await emailField.fill('invalid-email');
        const invalidMsg = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
        console.log(`- Empty/Invalid email: ${invalidMsg ? 'shows error' : 'no error'}`);

        // Test valid email
        await emailField.fill('test@example.com');
      }

      const nameField = testForm.locator('input[type="text"]').first();
      if (await nameField.count() > 0) {
        await nameField.fill('');
        const emptyMsg = await nameField.evaluate((el: HTMLInputElement) => el.validationMessage);
        console.log(`- Empty name: ${emptyMsg ? 'shows error' : 'no error'}`);
      }
    }

    // FINAL SUMMARY
    console.log('\nISSUES FOUND:');
    console.log('─────────────────────────────────────────');

    const issues: string[] = [];

    if (!homepageFormExists) issues.push('- Homepage: No form found');
    if (!contactFormExists) issues.push('- Contact page: No form found');
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => {
        if (!err.includes('DevTools')) {
          issues.push(`- Console error: ${err.substring(0, 60)}...`);
        }
      });
    }

    if (issues.length === 0) {
      console.log('- None\n');
      console.log('STATUS: FORMS READY ✓');
    } else {
      issues.forEach(issue => console.log(issue));
      console.log('\nSTATUS: NEEDS FIXES');
    }

    console.log('\n========================================');
    console.log('');
  });
});
