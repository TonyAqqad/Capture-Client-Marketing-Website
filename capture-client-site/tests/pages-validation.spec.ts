import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';

// Pages to test
const INTEGRATION_PAGES = [
  '/integrations',
  '/integrations/hubspot',
  '/integrations/salesforce',
  '/integrations/zapier',
  '/integrations/servicetitan'
];

const WHO_WE_SERVE_PAGES = [
  '/who-we-serve',
  '/who-we-serve/legal-law-firms',
  '/who-we-serve/home-services',
  '/who-we-serve/real-estate'
];

const ALL_PAGES = [...INTEGRATION_PAGES, ...WHO_WE_SERVE_PAGES];

test.describe('Capture Client Website - Page Validation', () => {

  test.describe('Integration Pages', () => {

    INTEGRATION_PAGES.forEach((pagePath) => {
      test(`${pagePath} - Load Test`, async ({ page }) => {
        const consoleErrors: string[] = [];

        // Capture console errors
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        const startTime = Date.now();
        const response = await page.goto(`${BASE_URL}${pagePath}`, {
          waitUntil: 'networkidle',
          timeout: 10000
        });
        const loadTime = Date.now() - startTime;

        // Check response status
        expect(response?.status()).toBe(200);
        console.log(`✅ ${pagePath} - Status: 200`);

        // Check load time
        expect(loadTime).toBeLessThan(3000);
        console.log(`✅ ${pagePath} - Load time: ${loadTime}ms`);

        // Check for console errors
        if (consoleErrors.length > 0) {
          console.log(`⚠️ ${pagePath} - Console errors found:`, consoleErrors);
        }
        expect(consoleErrors.length).toBe(0);
        console.log(`✅ ${pagePath} - No console errors`);
      });

      test(`${pagePath} - SEO Validation`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pagePath}`);

        // Check title tag
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(10);
        console.log(`✅ ${pagePath} - Title: "${title}"`);

        // Check H1 tag
        const h1 = await page.locator('h1').first();
        await expect(h1).toBeVisible();
        const h1Text = await h1.textContent();
        console.log(`✅ ${pagePath} - H1: "${h1Text}"`);

        // Check meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (metaDesc) {
          expect(metaDesc.length).toBeGreaterThan(50);
          console.log(`✅ ${pagePath} - Meta description: ${metaDesc.substring(0, 100)}...`);
        }
      });

      test(`${pagePath} - Visual Test`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pagePath}`);
        await page.waitForLoadState('networkidle');

        // Take screenshot
        const screenshotPath = path.join(__dirname, '../test-results/screenshots', `${pagePath.replace(/\//g, '-')}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`✅ ${pagePath} - Screenshot saved: ${screenshotPath}`);

        // Verify hero section renders
        const hero = page.locator('section, div').filter({ hasText: /integrations?|connect/i }).first();
        if (await hero.count() > 0) {
          await expect(hero).toBeVisible();
          console.log(`✅ ${pagePath} - Hero section visible`);
        }
      });
    });
  });

  test.describe('Who We Serve Pages', () => {

    WHO_WE_SERVE_PAGES.forEach((pagePath) => {
      test(`${pagePath} - Load Test`, async ({ page }) => {
        const consoleErrors: string[] = [];

        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        const startTime = Date.now();
        const response = await page.goto(`${BASE_URL}${pagePath}`, {
          waitUntil: 'networkidle',
          timeout: 10000
        });
        const loadTime = Date.now() - startTime;

        expect(response?.status()).toBe(200);
        console.log(`✅ ${pagePath} - Status: 200`);

        expect(loadTime).toBeLessThan(3000);
        console.log(`✅ ${pagePath} - Load time: ${loadTime}ms`);

        if (consoleErrors.length > 0) {
          console.log(`⚠️ ${pagePath} - Console errors found:`, consoleErrors);
        }
        expect(consoleErrors.length).toBe(0);
        console.log(`✅ ${pagePath} - No console errors`);
      });

      test(`${pagePath} - SEO Validation`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pagePath}`);

        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(10);
        console.log(`✅ ${pagePath} - Title: "${title}"`);

        const h1 = await page.locator('h1').first();
        await expect(h1).toBeVisible();
        const h1Text = await h1.textContent();
        console.log(`✅ ${pagePath} - H1: "${h1Text}"`);

        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (metaDesc) {
          expect(metaDesc.length).toBeGreaterThan(50);
          console.log(`✅ ${pagePath} - Meta description: ${metaDesc.substring(0, 100)}...`);
        }
      });

      test(`${pagePath} - Visual Test`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pagePath}`);
        await page.waitForLoadState('networkidle');

        const screenshotPath = path.join(__dirname, '../test-results/screenshots', `${pagePath.replace(/\//g, '-')}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`✅ ${pagePath} - Screenshot saved: ${screenshotPath}`);

        const hero = page.locator('section, div').filter({ hasText: /serve|industry|business/i }).first();
        if (await hero.count() > 0) {
          await expect(hero).toBeVisible();
          console.log(`✅ ${pagePath} - Hero section visible`);
        }
      });
    });
  });

  test.describe('Navigation Tests', () => {

    test('Homepage navigation includes "Who We Serve"', async ({ page }) => {
      await page.goto(BASE_URL);

      // Look for "Who We Serve" in navigation
      const navLink = page.locator('nav a, header a').filter({ hasText: /who we serve/i });
      await expect(navLink).toBeVisible();
      console.log('✅ "Who We Serve" link found in navigation');
    });

    test('"Who We Serve" navigation link works', async ({ page }) => {
      await page.goto(BASE_URL);

      const navLink = page.locator('nav a, header a').filter({ hasText: /who we serve/i }).first();
      await navLink.click();

      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('who-we-serve');
      console.log('✅ "Who We Serve" navigation link works correctly');
    });

    test('Integrations navigation link exists', async ({ page }) => {
      await page.goto(BASE_URL);

      const navLink = page.locator('nav a, header a').filter({ hasText: /integrations?/i });
      const count = await navLink.count();
      expect(count).toBeGreaterThan(0);
      console.log('✅ "Integrations" link found in navigation');
    });
  });

  test.describe('Cross-Page Tests', () => {

    test('All pages load without 404 errors', async ({ page }) => {
      const results: { page: string; status: number; error?: string }[] = [];

      for (const pagePath of ALL_PAGES) {
        try {
          const response = await page.goto(`${BASE_URL}${pagePath}`, {
            waitUntil: 'networkidle',
            timeout: 10000
          });

          results.push({
            page: pagePath,
            status: response?.status() || 0
          });
        } catch (error) {
          results.push({
            page: pagePath,
            status: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      console.log('\n📊 Page Load Summary:');
      results.forEach(r => {
        if (r.status === 200) {
          console.log(`  ✅ ${r.page} - ${r.status}`);
        } else {
          console.log(`  ❌ ${r.page} - ${r.status || 'FAILED'} ${r.error || ''}`);
        }
      });

      const failedPages = results.filter(r => r.status !== 200);
      expect(failedPages.length).toBe(0);
    });
  });
});
