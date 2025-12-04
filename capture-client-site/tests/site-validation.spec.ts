import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Capture Client Website Validation', () => {
  const testResults: {
    page: string;
    status: string;
    errors: string[];
  }[] = [];

  test('Homepage loads correctly', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page error: ${error.message}`);
    });

    try {
      const response = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

      expect(response?.status()).toBe(200);
      console.log('✅ Homepage loaded with status 200');

      // Check title
      const title = await page.title();
      console.log(`   Page title: "${title}"`);

      // Check for lead capture form
      const forms = await page.locator('form').count();
      console.log(`   Forms found: ${forms}`);

      // Check for navigation
      const nav = await page.locator('nav').count();
      console.log(`   Navigation elements: ${nav}`);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });

      if (consoleErrors.length > 0) {
        console.log(`   ⚠️ Console errors: ${consoleErrors.length}`);
        consoleErrors.forEach(err => console.log(`      - ${err}`));
      } else {
        console.log('   ✅ No console errors');
      }

      testResults.push({
        page: 'Homepage',
        status: 'LOADS',
        errors: consoleErrors
      });

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
      testResults.push({
        page: 'Homepage',
        status: 'FAILS',
        errors: [String(error)]
      });
      throw error;
    }
  });

  test('Services page loads correctly', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page error: ${error.message}`);
    });

    try {
      const response = await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle', timeout: 30000 });

      expect(response?.status()).toBe(200);
      console.log('✅ Services page loaded with status 200');

      const title = await page.title();
      console.log(`   Page title: "${title}"`);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/services.png', fullPage: true });

      if (consoleErrors.length > 0) {
        console.log(`   ⚠️ Console errors: ${consoleErrors.length}`);
      } else {
        console.log('   ✅ No console errors');
      }

      testResults.push({
        page: 'Services',
        status: 'LOADS',
        errors: consoleErrors
      });

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
      testResults.push({
        page: 'Services',
        status: 'FAILS',
        errors: [String(error)]
      });
      throw error;
    }
  });

  test('Location page (voice-ai-knoxville-tn) loads correctly', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page error: ${error.message}`);
    });

    try {
      const response = await page.goto(`${BASE_URL}/locations/voice-ai-knoxville-tn`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      expect(response?.status()).toBe(200);
      console.log('✅ Location page loaded with status 200');

      const title = await page.title();
      console.log(`   Page title: "${title}"`);

      // Check if location is mentioned in title
      if (title.toLowerCase().includes('knoxville')) {
        console.log('   ✅ Location included in title');
      } else {
        console.log('   ⚠️ Location NOT in title');
      }

      // Check for lead form
      const forms = await page.locator('form').count();
      console.log(`   Forms found: ${forms}`);

      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      if (metaDesc && metaDesc.length > 50) {
        console.log(`   ✅ Meta description present (${metaDesc.length} chars)`);
      } else {
        console.log(`   ⚠️ Meta description missing or too short`);
      }

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/location-page.png', fullPage: true });

      if (consoleErrors.length > 0) {
        console.log(`   ⚠️ Console errors: ${consoleErrors.length}`);
      } else {
        console.log('   ✅ No console errors');
      }

      testResults.push({
        page: 'Location Page',
        status: 'LOADS',
        errors: consoleErrors
      });

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
      testResults.push({
        page: 'Location Page',
        status: 'FAILS',
        errors: [String(error)]
      });
      throw error;
    }
  });

  test('Pricing page loads correctly', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page error: ${error.message}`);
    });

    try {
      const response = await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle', timeout: 30000 });

      expect(response?.status()).toBe(200);
      console.log('✅ Pricing page loaded with status 200');

      const title = await page.title();
      console.log(`   Page title: "${title}"`);

      // Check for pricing elements
      const priceElements = await page.locator(':has-text("$")').count();
      console.log(`   Price elements found: ${priceElements}`);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/pricing.png', fullPage: true });

      if (consoleErrors.length > 0) {
        console.log(`   ⚠️ Console errors: ${consoleErrors.length}`);
      } else {
        console.log('   ✅ No console errors');
      }

      testResults.push({
        page: 'Pricing',
        status: 'LOADS',
        errors: consoleErrors
      });

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
      testResults.push({
        page: 'Pricing',
        status: 'FAILS',
        errors: [String(error)]
      });
      throw error;
    }
  });

  test('Contact page loads correctly', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page error: ${error.message}`);
    });

    try {
      const response = await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 30000 });

      expect(response?.status()).toBe(200);
      console.log('✅ Contact page loaded with status 200');

      const title = await page.title();
      console.log(`   Page title: "${title}"`);

      // Check for contact form
      const forms = await page.locator('form').count();
      console.log(`   Forms found: ${forms}`);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/contact.png', fullPage: true });

      if (consoleErrors.length > 0) {
        console.log(`   ⚠️ Console errors: ${consoleErrors.length}`);
      } else {
        console.log('   ✅ No console errors');
      }

      testResults.push({
        page: 'Contact',
        status: 'LOADS',
        errors: consoleErrors
      });

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
      testResults.push({
        page: 'Contact',
        status: 'FAILS',
        errors: [String(error)]
      });
      throw error;
    }
  });

  test.afterAll(() => {
    console.log('\n\n===========================================');
    console.log('PLAYWRIGHT PAGE TESTING');
    console.log('===========================================\n');

    testResults.forEach(result => {
      console.log(`${result.page}: ${result.status}`);
      if (result.errors.length > 0) {
        result.errors.forEach(err => console.log(`  - ${err}`));
      }
    });

    const totalErrors = testResults.reduce((sum, r) => sum + r.errors.length, 0);
    console.log(`\nConsole Errors: ${totalErrors === 0 ? 'NONE' : totalErrors}`);

    const allPass = testResults.every(r => r.status === 'LOADS' && r.errors.length === 0);
    console.log(`\nOVERALL: ${allPass ? 'ALL PASS ✅' : 'ISSUES FOUND ⚠️'}`);
    console.log('===========================================\n');
  });
});
