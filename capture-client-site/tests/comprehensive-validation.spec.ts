import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Desktop Tests', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('Homepage loads successfully', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 5000 });
    console.log(`Homepage console errors: ${consoleErrors.length}`);
  });

  test('Services page renders', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/services`);
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Pricing page displays', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/pricing`);
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Contact page has form', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/contact`);
    expect(response?.status()).toBe(200);
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Mobile Tests', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('Homepage renders on mobile', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    console.log(`Mobile - Body: ${bodyWidth}, Viewport: ${viewportWidth}`);
  });

  test('Services page on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/services`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('Navigation Tests', () => {
  test('No 404 errors on main pages', async ({ page }) => {
    const urls = ['/', '/services', '/pricing', '/contact', '/about'];
    for (const url of urls) {
      const response = await page.goto(`${BASE_URL}${url}`);
      const status = response?.status() ?? 0;
      console.log(`${url}: ${status}`);
      expect(status).toBe(200);
    }
  });
});
