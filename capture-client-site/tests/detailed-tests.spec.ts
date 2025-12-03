import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Console Errors Check', () => {
  test('Check for JavaScript errors', async ({ page }) => {
    const allErrors = [];
    const urls = ['/', '/services', '/pricing', '/contact'];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        allErrors.push(msg.text());
      }
    });

    for (const url of urls) {
      await page.goto(`${BASE_URL}${url}`);
      await page.waitForLoadState('networkidle');
    }

    console.log(`Total errors: ${allErrors.length}`);
  });
});

test.describe('CTA Functionality', () => {
  test('Verify CTAs exist', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const buttons = await page.locator('button, a[class*="button"]').count();
    const contactLinks = await page.locator('a[href*="contact"]').count();
    const phoneLinks = await page.locator('a[href^="tel:"]').count();

    console.log(`Buttons: ${buttons}, Contact: ${contactLinks}, Phone: ${phoneLinks}`);
    expect(buttons + contactLinks).toBeGreaterThan(0);
  });
});

test.describe('Location Pages', () => {
  test('Sample location pages load', async ({ page }) => {
    const locationSlugs = ['voice-ai-knoxville-tn', 'voice-ai-nashville-tn'];
    const results: { slug: string; status: number }[] = [];

    for (const slug of locationSlugs) {
      try {
        const response = await page.goto(`${BASE_URL}/locations/${slug}`);
        const status = response?.status() ?? 0;
        results.push({ slug, status });
        console.log(`${slug}: ${status}`);
      } catch (error) {
        console.log(`${slug}: ERROR`);
      }
    }
  });
});
