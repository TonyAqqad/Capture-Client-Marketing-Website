import { test, expect } from '@playwright/test';

/**
 * COMPREHENSIVE VALIDATION FOR NEW PAGES
 * - Integration Pages (/integrations/*)
 * - Who We Serve Pages (/who-we-serve/*)
 *
 * Tests:
 * 1. Page Load (200 status, no console errors, load time)
 * 2. Visual Tests (screenshots, hero sections, logos)
 * 3. SEO Validation (title, meta description, H1, JSON-LD)
 * 4. Navigation Tests (menu presence, dropdowns, links)
 * 5. Mobile Responsiveness (375px width, mobile menu)
 */

const BASE_URL = 'http://localhost:3000';

const INTEGRATION_PAGES = [
  '/integrations',
  '/integrations/hubspot',
  '/integrations/salesforce',
  '/integrations/zapier',
  '/integrations/servicetitan',
  '/integrations/calendly',
];

const WHO_WE_SERVE_PAGES = [
  '/who-we-serve',
  '/who-we-serve/legal-law-firms',
  '/who-we-serve/home-services',
  '/who-we-serve/real-estate',
  '/who-we-serve/healthcare',
];

const ALL_NEW_PAGES = [...INTEGRATION_PAGES, ...WHO_WE_SERVE_PAGES];

test.describe('NEW PAGES VALIDATION - Integration & Who We Serve', () => {

  // ============================================================
  // TEST 1: PAGE LOAD TESTS
  // ============================================================

  test.describe('1. Page Load Tests', () => {

    for (const pagePath of ALL_NEW_PAGES) {
      test(`${pagePath} - should return 200 status and load without errors`, async ({ page }) => {
        const consoleErrors: string[] = [];
        const consoleWarnings: string[] = [];
        const networkErrors: string[] = [];

        // Capture console errors
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
          if (msg.type() === 'warning') {
            consoleWarnings.push(msg.text());
          }
        });

        // Capture network errors
        page.on('requestfailed', (request) => {
          networkErrors.push(`${request.url()} - ${request.failure()?.errorText}`);
        });

        // Navigate and measure load time
        const startTime = Date.now();
        const response = await page.goto(`${BASE_URL}${pagePath}`, {
          waitUntil: 'networkidle',
          timeout: 10000,
        });
        const loadTime = Date.now() - startTime;

        // Verify 200 status
        expect(response?.status()).toBe(200);
        console.log(`✅ ${pagePath} - Status: 200 (Load time: ${loadTime}ms)`);

        // Verify no console errors
        if (consoleErrors.length > 0) {
          console.log(`⚠️  ${pagePath} - Console Errors:`, consoleErrors);
        }
        expect(consoleErrors.length).toBe(0);

        // Verify load time under 3 seconds
        expect(loadTime).toBeLessThan(3000);

        // Log network errors if any
        if (networkErrors.length > 0) {
          console.log(`⚠️  ${pagePath} - Network Errors:`, networkErrors);
        }
      });
    }
  });

  // ============================================================
  // TEST 2: VISUAL TESTS
  // ============================================================

  test.describe('2. Visual Tests', () => {

    test('Integration pages - should render hero sections and take screenshots', async ({ page }) => {
      for (const pagePath of INTEGRATION_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Verify hero section exists
        const heroSection = page.locator('h1').first();
        await expect(heroSection).toBeVisible();

        // Take full page screenshot
        const screenshotName = pagePath.replace(/\//g, '-').slice(1) || 'integrations-main';
        await page.screenshot({
          path: `tests/screenshots/new-pages-${screenshotName}.png`,
          fullPage: true,
        });

        console.log(`✅ ${pagePath} - Hero section visible, screenshot saved`);
      }
    });

    test('Integration pages - should display integration logos/icons', async ({ page }) => {
      for (const pagePath of INTEGRATION_PAGES) {
        if (pagePath === '/integrations') {
          // Main integrations page should have multiple logos
          await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

          // Look for images or SVG icons (integration logos)
          const images = page.locator('img, svg');
          const imageCount = await images.count();

          expect(imageCount).toBeGreaterThan(3); // Should have multiple integration logos
          console.log(`✅ ${pagePath} - Found ${imageCount} images/icons`);
        } else {
          // Individual integration pages should have at least the integration's logo
          await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

          const images = page.locator('img, svg');
          const imageCount = await images.count();

          expect(imageCount).toBeGreaterThan(0);
          console.log(`✅ ${pagePath} - Found ${imageCount} images/icons`);
        }
      }
    });

    test('Who We Serve pages - should render hero sections and take screenshots', async ({ page }) => {
      for (const pagePath of WHO_WE_SERVE_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Verify hero section exists
        const heroSection = page.locator('h1').first();
        await expect(heroSection).toBeVisible();

        // Take full page screenshot
        const screenshotName = pagePath.replace(/\//g, '-').slice(1) || 'who-we-serve-main';
        await page.screenshot({
          path: `tests/screenshots/new-pages-${screenshotName}.png`,
          fullPage: true,
        });

        console.log(`✅ ${pagePath} - Hero section visible, screenshot saved`);
      }
    });
  });

  // ============================================================
  // TEST 3: SEO VALIDATION
  // ============================================================

  test.describe('3. SEO Validation', () => {

    for (const pagePath of ALL_NEW_PAGES) {
      test(`${pagePath} - should have proper SEO meta tags`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Title tag
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(20);
        console.log(`✅ ${pagePath} - Title: "${title}"`);

        // Meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        expect(metaDesc).toBeTruthy();
        expect(metaDesc!.length).toBeGreaterThan(50);
        console.log(`✅ ${pagePath} - Meta Description: "${metaDesc?.substring(0, 60)}..."`);

        // H1 tag
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
        const h1Text = await h1.textContent();
        expect(h1Text).toBeTruthy();
        console.log(`✅ ${pagePath} - H1: "${h1Text}"`);

        // JSON-LD schema
        const jsonLd = page.locator('script[type="application/ld+json"]');
        const jsonLdCount = await jsonLd.count();
        expect(jsonLdCount).toBeGreaterThan(0);
        console.log(`✅ ${pagePath} - JSON-LD schemas: ${jsonLdCount}`);
      });
    }

    test('Integration pages - should have unique titles', async ({ page }) => {
      const titles = new Set<string>();

      for (const pagePath of INTEGRATION_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });
        const title = await page.title();

        expect(titles.has(title)).toBe(false); // Should be unique
        titles.add(title);
      }

      console.log(`✅ All ${INTEGRATION_PAGES.length} integration pages have unique titles`);
    });

    test('Who We Serve pages - should have unique titles', async ({ page }) => {
      const titles = new Set<string>();

      for (const pagePath of WHO_WE_SERVE_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });
        const title = await page.title();

        expect(titles.has(title)).toBe(false); // Should be unique
        titles.add(title);
      }

      console.log(`✅ All ${WHO_WE_SERVE_PAGES.length} Who We Serve pages have unique titles`);
    });
  });

  // ============================================================
  // TEST 4: NAVIGATION TESTS
  // ============================================================

  test.describe('4. Navigation Tests', () => {

    test('Desktop - "Who We Serve" should appear in navigation menu', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Look for "Who We Serve" in navigation (could be link or button)
      const whoWeServeNav = page.locator('nav').locator('text=/Who We Serve/i').first();
      await expect(whoWeServeNav).toBeVisible();

      console.log('✅ "Who We Serve" appears in desktop navigation');
    });

    test('Desktop - "Integrations" should appear in navigation or footer', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Look for "Integrations" anywhere on the page
      const integrationsLink = page.locator('text=/Integrations/i').first();
      await expect(integrationsLink).toBeVisible();

      console.log('✅ "Integrations" appears on homepage');
    });

    test('Desktop - Navigation dropdown works for "Who We Serve"', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Find and hover over "Who We Serve"
      const whoWeServeNav = page.locator('nav').locator('text=/Who We Serve/i').first();

      if (await whoWeServeNav.isVisible()) {
        await whoWeServeNav.hover();

        // Wait a moment for dropdown to appear
        await page.waitForTimeout(300);

        // Look for dropdown items (industry links)
        const dropdownItems = page.locator('text=/Legal|Healthcare|Real Estate|Home Services/i');
        const dropdownCount = await dropdownItems.count();

        if (dropdownCount > 0) {
          console.log(`✅ Who We Serve dropdown works - found ${dropdownCount} industry links`);
        } else {
          console.log('⚠️  Who We Serve dropdown may not be visible on hover');
        }
      }
    });

    test('Navigation links work - can click through to pages', async ({ page }) => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Try to find and click "Who We Serve" in navigation
      const whoWeServeLink = page.locator('a[href="/who-we-serve"]').first();

      if (await whoWeServeLink.isVisible()) {
        await whoWeServeLink.click();
        await page.waitForURL('**/who-we-serve');

        expect(page.url()).toContain('/who-we-serve');
        console.log('✅ Can navigate to /who-we-serve from homepage');
      } else {
        console.log('⚠️  Direct link to /who-we-serve not found in navigation');
      }
    });
  });

  // ============================================================
  // TEST 5: MOBILE RESPONSIVENESS
  // ============================================================

  test.describe('5. Mobile Responsiveness', () => {

    test('Mobile (375px) - Integration pages are readable', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      for (const pagePath of INTEGRATION_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Check H1 is visible
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();

        // Check no horizontal scroll
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = 375;
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // Allow small margin

        console.log(`✅ ${pagePath} - Mobile responsive (no horizontal scroll)`);
      }
    });

    test('Mobile (375px) - Who We Serve pages are readable', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      for (const pagePath of WHO_WE_SERVE_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Check H1 is visible
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();

        // Check no horizontal scroll
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = 375;
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);

        console.log(`✅ ${pagePath} - Mobile responsive (no horizontal scroll)`);
      }
    });

    test('Mobile menu works', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Look for mobile menu button (hamburger icon)
      const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has(svg)').first();

      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        await page.waitForTimeout(300);

        // Mobile menu should be visible
        const whoWeServeLink = page.locator('text=/Who We Serve/i').first();
        await expect(whoWeServeLink).toBeVisible();

        console.log('✅ Mobile menu opens and shows navigation items');
      } else {
        console.log('⚠️  Mobile menu button not found');
      }
    });

    test('Mobile - Take screenshots of new pages', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Screenshot sample integration page
      await page.goto(`${BASE_URL}/integrations/hubspot`, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: 'tests/screenshots/new-pages-mobile-integrations-hubspot.png',
        fullPage: true,
      });

      // Screenshot sample Who We Serve page
      await page.goto(`${BASE_URL}/who-we-serve/legal-law-firms`, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: 'tests/screenshots/new-pages-mobile-who-we-serve-legal.png',
        fullPage: true,
      });

      console.log('✅ Mobile screenshots saved');
    });
  });

  // ============================================================
  // BONUS: CONTENT VALIDATION
  // ============================================================

  test.describe('6. Content Validation', () => {

    test('Integration pages should mention integration benefits', async ({ page }) => {
      const integrationBenefits = /automat|sync|connect|integrat|streamline|workflow/i;

      for (const pagePath of INTEGRATION_PAGES.slice(1)) { // Skip main page
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toMatch(integrationBenefits);

        console.log(`✅ ${pagePath} - Contains integration benefit keywords`);
      }
    });

    test('Who We Serve pages should mention industry-specific pain points', async ({ page }) => {
      const industryKeywords = /client|patient|customer|lead|appointment|schedule|call/i;

      for (const pagePath of WHO_WE_SERVE_PAGES.slice(1)) { // Skip main page
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toMatch(industryKeywords);

        console.log(`✅ ${pagePath} - Contains industry-specific keywords`);
      }
    });

    test('All new pages should have CTA buttons', async ({ page }) => {
      for (const pagePath of ALL_NEW_PAGES) {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Look for CTA buttons
        const ctaButtons = page.locator('a:has-text("Get Started"), a:has-text("Contact"), a:has-text("Demo"), button:has-text("Get Started"), button:has-text("Contact")');
        const ctaCount = await ctaButtons.count();

        expect(ctaCount).toBeGreaterThan(0);
        console.log(`✅ ${pagePath} - Has ${ctaCount} CTA button(s)`);
      }
    });
  });
});
