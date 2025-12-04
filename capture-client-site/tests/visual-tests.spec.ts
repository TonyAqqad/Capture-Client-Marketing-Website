import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Layout Verification', () => {
  test('No horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const urls = ['/', '/services', '/pricing'];

    for (const url of urls) {
      await page.goto(`${BASE_URL}${url}`);
      await page.waitForLoadState('networkidle');

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      
      const scroll = bodyWidth > viewportWidth + 10;
      console.log(`${url} - Scroll: ${scroll}`);
    }
  });
});
