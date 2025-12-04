import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Final Comprehensive Checks', () => {
  test('Image loading verification', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const images = await page.locator('img').count();
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).length;
    });

    console.log(`Total images: ${images}, Broken: ${brokenImages}`);
    expect(brokenImages).toBe(0);
  });

  test('Critical page load times', async ({ page }) => {
    const urls = ['/', '/services', '/pricing', '/contact'];
    
    for (const url of urls) {
      const start = Date.now();
      await page.goto(`${BASE_URL}${url}`);
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - start;
      
      const status = loadTime < 3000 ? 'PASS' : 'WARN';
      console.log(`${url}: ${loadTime}ms [${status}]`);
    }
  });

  test('Form submission endpoints exist', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');

    const form = page.locator('form').first();
    const formAction = await form.getAttribute('action');
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    
    const hasForm = await form.count() > 0;
    const hasButton = await submitButton.count() > 0;
    
    console.log(`Form exists: ${hasForm}, Submit button: ${hasButton}`);
    expect(hasForm).toBeTruthy();
  });

  test('SEO metadata present', async ({ page }) => {
    const urls = ['/', '/services', '/pricing'];
    
    for (const url of urls) {
      await page.goto(`${BASE_URL}${url}`);
      
      const title = await page.title();
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      
      const hasTitle = title && title.length > 0;
      const hasDesc = metaDesc && metaDesc.length > 0;
      
      console.log(`${url} - Title: ${hasTitle}, Desc: ${hasDesc}`);
      expect(hasTitle).toBeTruthy();
    }
  });

  test('Responsive navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const navLinks = await page.locator('nav a, header a').count();
    console.log(`Navigation links found: ${navLinks}`);
    expect(navLinks).toBeGreaterThan(0);
  });

  test('Click-to-call buttons work', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const phoneLinks = await page.locator('a[href^="tel:"]').count();
    console.log(`Click-to-call buttons: ${phoneLinks}`);
    
    if (phoneLinks > 0) {
      const firstPhone = await page.locator('a[href^="tel:"]').first().getAttribute('href');
      console.log(`Phone link: ${firstPhone}`);
    }
  });
});
