import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const MOBILE_VIEWPORT = { width: 375, height: 812 }; // iPhone X

test.describe('Mobile Visual Button Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    // Increase timeout for slow compilation
    page.setDefaultTimeout(60000);
  });

  test('Screenshot Homepage Mobile', async ({ page }) => {
    try {
      console.log('Attempting to load homepage...');
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // Wait a bit for interactive elements
      await page.waitForTimeout(2000);

      // Take full page screenshot
      await page.screenshot({
        path: 'mobile-homepage-full.png',
        fullPage: true
      });

      console.log(' Screenshot saved: mobile-homepage-full.png');

      // Test if hamburger menu exists
      const hamburger = page.locator('button[aria-label*="menu" i], nav button:has(svg)').first();
      if (await hamburger.isVisible().catch(() => false)) {
        console.log(' Hamburger menu found');
        const box = await hamburger.boundingBox();
        if (box) {
          console.log(`   Size: ${box.width}x${box.height}px`);
          console.log(`   Min size (44x44): ${box.width >= 44 && box.height >= 44 ? 'PASS' : 'FAIL'}`);
        }
      } else {
        console.log(' Hamburger menu NOT found');
      }

      // Test hero CTAs
      const heroCTAs = page.locator('a:has-text("Get"), a:has-text("Book"), a:has-text("Start"), button:has-text("Get")');
      const ctaCount = await heroCTAs.count();
      console.log(` Found ${ctaCount} potential CTA buttons`);

      for (let i = 0; i < Math.min(ctaCount, 3); i++) {
        const cta = heroCTAs.nth(i);
        if (await cta.isVisible().catch(() => false)) {
          const text = await cta.textContent();
          const box = await cta.boundingBox();
          if (box) {
            console.log(`   CTA "${text?.trim()}": ${box.width}x${box.height}px - ${box.width >= 44 && box.height >= 44 ? 'PASS' : 'FAIL'}`);
          }
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('ERROR:', error.message);
      } else {
        console.error('ERROR:', String(error));
      }
      throw error;
    }
  });

  test('Screenshot Pricing Page Mobile', async ({ page }) => {
    try {
      console.log('\nTesting Pricing Page...');
      await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'mobile-pricing-full.png',
        fullPage: true
      });

      console.log(' Screenshot saved: mobile-pricing-full.png');

      // Find package CTAs
      const packageCTAs = page.locator('a:has-text("Get Started"), a:has-text("Choose"), button:has-text("Get Started")');
      const count = await packageCTAs.count();
      console.log(` Found ${count} package CTAs`);

      for (let i = 0; i < Math.min(count, 5); i++) {
        const cta = packageCTAs.nth(i);
        if (await cta.isVisible().catch(() => false)) {
          const text = await cta.textContent();
          const box = await cta.boundingBox();
          if (box) {
            console.log(`   Package CTA "${text?.trim()}": ${box.width}x${box.height}px - ${box.width >= 44 && box.height >= 44 ? 'PASS' : 'FAIL'}`);
          }
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('ERROR:', error.message);
      } else {
        console.error('ERROR:', String(error));
      }
      throw error;
    }
  });

  test('Screenshot Services Page Mobile', async ({ page }) => {
    try {
      console.log('\nTesting Services Page...');
      await page.goto(`${BASE_URL}/services`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'mobile-services-full.png',
        fullPage: true
      });

      console.log(' Screenshot saved: mobile-services-full.png');

    } catch (error) {
      if (error instanceof Error) {
        console.error('ERROR:', error.message);
      } else {
        console.error('ERROR:', String(error));
      }
      throw error;
    }
  });

  test('Screenshot Contact Page Mobile', async ({ page }) => {
    try {
      console.log('\nTesting Contact Page...');
      await page.goto(`${BASE_URL}/contact`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'mobile-contact-full.png',
        fullPage: true
      });

      console.log(' Screenshot saved: mobile-contact-full.png');

      // Test submit button
      const submitBtn = page.locator('button[type="submit"]').first();
      if (await submitBtn.isVisible().catch(() => false)) {
        const text = await submitBtn.textContent();
        const box = await submitBtn.boundingBox();
        if (box) {
          console.log(`   Submit button "${text?.trim()}": ${box.width}x${box.height}px - ${box.width >= 44 && box.height >= 44 ? 'PASS' : 'FAIL'}`);
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('ERROR:', error.message);
      } else {
        console.error('ERROR:', String(error));
      }
      throw error;
    }
  });

  test('Screenshot Locations Page Mobile', async ({ page }) => {
    try {
      console.log('\nTesting Locations Page...');
      await page.goto(`${BASE_URL}/locations`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'mobile-locations-full.png',
        fullPage: true
      });

      console.log(' Screenshot saved: mobile-locations-full.png');

    } catch (error) {
      if (error instanceof Error) {
        console.error('ERROR:', error.message);
      } else {
        console.error('ERROR:', String(error));
      }
      throw error;
    }
  });

  test('Screenshot Features Page Mobile', async ({ page }) => {
    try {
      console.log('\nTesting Features Page...');
      await page.goto(`${BASE_URL}/features`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'mobile-features-full.png',
        fullPage: true
      });

      console.log(' Screenshot saved: mobile-features-full.png');

    } catch (error) {
      if (error instanceof Error) {
        console.error('ERROR:', error.message);
      } else {
        console.error('ERROR:', String(error));
      }
      throw error;
    }
  });
});
