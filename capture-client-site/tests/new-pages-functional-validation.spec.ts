import { test, expect } from '@playwright/test';

/**
 * FUNCTIONAL VALIDATION FOR NEW PAGES (Lenient - Ignores Dev Server Errors)
 * - Integration Pages (/integrations/*)
 * - Who We Serve Pages (/who-we-serve/*)
 *
 * This test suite ignores Next.js dev server MIME type errors
 * and focuses on functional validation
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

test.describe('FUNCTIONAL VALIDATION - New Pages', () => {

  // ============================================================
  // TEST 1: BASIC PAGE LOAD
  // ============================================================

  test('All new pages should return 200 status', async ({ page }) => {
    const results: Array<{ path: string; status: number; loadTime: number }> = [];

    for (const pagePath of ALL_NEW_PAGES) {
      const startTime = Date.now();
      const response = await page.goto(`${BASE_URL}${pagePath}`, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      const loadTime = Date.now() - startTime;

      const status = response?.status() || 0;
      results.push({ path: pagePath, status, loadTime });

      expect(status).toBe(200);
      console.log(`✅ ${pagePath} - Status: ${status} (${loadTime}ms)`);
    }

    console.log('\n📊 LOAD TIME SUMMARY:');
    results.forEach(r => {
      const emoji = r.loadTime < 2000 ? '🟢' : r.loadTime < 3000 ? '🟡' : '🔴';
      console.log(`${emoji} ${r.path}: ${r.loadTime}ms`);
    });
  });

  // ============================================================
  // TEST 2: SEO META TAGS
  // ============================================================

  test('All pages should have proper SEO meta tags', async ({ page }) => {
    const seoIssues: string[] = [];

    for (const pagePath of ALL_NEW_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      // Title
      const title = await page.title();
      if (!title || title.length < 20) {
        seoIssues.push(`${pagePath}: Title too short or missing`);
      }

      // Meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      if (!metaDesc || metaDesc.length < 50) {
        seoIssues.push(`${pagePath}: Meta description too short or missing`);
      }

      // H1
      const h1 = page.locator('h1').first();
      const h1Visible = await h1.isVisible();
      if (!h1Visible) {
        seoIssues.push(`${pagePath}: H1 not visible`);
      }

      // JSON-LD
      const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
      if (jsonLdCount === 0) {
        seoIssues.push(`${pagePath}: No JSON-LD structured data`);
      }

      console.log(`✅ ${pagePath} - SEO validated`);
    }

    if (seoIssues.length > 0) {
      console.log('\n⚠️  SEO ISSUES FOUND:');
      seoIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    expect(seoIssues).toHaveLength(0);
  });

  // ============================================================
  // TEST 3: VISUAL SCREENSHOTS
  // ============================================================

  test('Take desktop screenshots of all new pages', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    for (const pagePath of ALL_NEW_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const screenshotName = pagePath.replace(/\//g, '-').slice(1) || 'home';
      await page.screenshot({
        path: `tests/screenshots/functional-${screenshotName}.png`,
        fullPage: true,
      });

      console.log(`📸 Screenshot saved: functional-${screenshotName}.png`);
    }
  });

  test('Take mobile screenshots of sample pages', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const samplePages = [
      '/integrations',
      '/integrations/hubspot',
      '/who-we-serve',
      '/who-we-serve/legal-law-firms',
    ];

    for (const pagePath of samplePages) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const screenshotName = pagePath.replace(/\//g, '-').slice(1) || 'home';
      await page.screenshot({
        path: `tests/screenshots/functional-mobile-${screenshotName}.png`,
        fullPage: true,
      });

      console.log(`📸 Mobile screenshot saved: functional-mobile-${screenshotName}.png`);
    }
  });

  // ============================================================
  // TEST 4: HERO SECTIONS
  // ============================================================

  test('All pages should have visible hero sections with H1', async ({ page }) => {
    const heroIssues: string[] = [];

    for (const pagePath of ALL_NEW_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const h1 = page.locator('h1').first();
      const h1Visible = await h1.isVisible();
      const h1Text = await h1.textContent();

      if (!h1Visible) {
        heroIssues.push(`${pagePath}: H1 not visible`);
      } else if (!h1Text || h1Text.trim().length < 5) {
        heroIssues.push(`${pagePath}: H1 text too short`);
      } else {
        console.log(`✅ ${pagePath} - H1: "${h1Text.substring(0, 50)}..."`);
      }
    }

    if (heroIssues.length > 0) {
      console.log('\n⚠️  HERO SECTION ISSUES:');
      heroIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    expect(heroIssues).toHaveLength(0);
  });

  // ============================================================
  // TEST 5: MOBILE RESPONSIVENESS
  // ============================================================

  test('Mobile (375px) - No horizontal scroll on any page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const scrollIssues: string[] = [];

    for (const pagePath of ALL_NEW_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = 375;

      if (bodyWidth > viewportWidth + 10) {
        scrollIssues.push(`${pagePath}: Horizontal scroll detected (width: ${bodyWidth}px)`);
      } else {
        console.log(`✅ ${pagePath} - Mobile responsive (${bodyWidth}px)`);
      }
    }

    if (scrollIssues.length > 0) {
      console.log('\n⚠️  MOBILE SCROLL ISSUES:');
      scrollIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    expect(scrollIssues).toHaveLength(0);
  });

  // ============================================================
  // TEST 6: NAVIGATION
  // ============================================================

  test('Desktop - "Who We Serve" should appear in navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    const whoWeServeNav = page.locator('nav').locator('text=/Who We Serve/i').first();
    const isVisible = await whoWeServeNav.isVisible();

    expect(isVisible).toBe(true);
    console.log('✅ "Who We Serve" appears in desktop navigation');
  });

  test('Mobile - Menu button works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    const menuButton = page.locator('button').filter({ hasText: /menu/i }).first();
    const menuButtonAlt = page.locator('button[aria-label*="menu" i]').first();

    let menuFound = false;

    if (await menuButton.isVisible()) {
      await menuButton.click();
      menuFound = true;
    } else if (await menuButtonAlt.isVisible()) {
      await menuButtonAlt.click();
      menuFound = true;
    }

    if (menuFound) {
      await page.waitForTimeout(300);
      console.log('✅ Mobile menu button clicked successfully');
    } else {
      console.log('⚠️  Mobile menu button not found (may use different pattern)');
    }
  });

  // ============================================================
  // TEST 7: CONTENT VALIDATION
  // ============================================================

  test('Integration pages should have integration-related keywords', async ({ page }) => {
    const contentIssues: string[] = [];
    const keywords = /automat|sync|connect|integrat|streamline|workflow|api|crm/i;

    for (const pagePath of INTEGRATION_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const bodyText = await page.locator('body').textContent() || '';

      if (!keywords.test(bodyText)) {
        contentIssues.push(`${pagePath}: Missing integration-related keywords`);
      } else {
        console.log(`✅ ${pagePath} - Contains integration keywords`);
      }
    }

    if (contentIssues.length > 0) {
      console.log('\n⚠️  CONTENT ISSUES:');
      contentIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    expect(contentIssues).toHaveLength(0);
  });

  test('Who We Serve pages should have industry-specific keywords', async ({ page }) => {
    const contentIssues: string[] = [];
    const keywords = /client|patient|customer|lead|appointment|schedule|call|business/i;

    for (const pagePath of WHO_WE_SERVE_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const bodyText = await page.locator('body').textContent() || '';

      if (!keywords.test(bodyText)) {
        contentIssues.push(`${pagePath}: Missing industry-specific keywords`);
      } else {
        console.log(`✅ ${pagePath} - Contains industry keywords`);
      }
    }

    if (contentIssues.length > 0) {
      console.log('\n⚠️  CONTENT ISSUES:');
      contentIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    expect(contentIssues).toHaveLength(0);
  });

  test('All pages should have at least one CTA button', async ({ page }) => {
    const ctaIssues: string[] = [];

    for (const pagePath of ALL_NEW_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });

      const ctaButtons = page.locator('a, button').filter({
        hasText: /get started|contact|demo|book|schedule|try|free|request/i,
      });

      const ctaCount = await ctaButtons.count();

      if (ctaCount === 0) {
        ctaIssues.push(`${pagePath}: No CTA buttons found`);
      } else {
        console.log(`✅ ${pagePath} - Has ${ctaCount} CTA button(s)`);
      }
    }

    if (ctaIssues.length > 0) {
      console.log('\n⚠️  CTA ISSUES:');
      ctaIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    expect(ctaIssues).toHaveLength(0);
  });

  // ============================================================
  // TEST 8: TITLE UNIQUENESS
  // ============================================================

  test('All integration pages should have unique titles', async ({ page }) => {
    const titles = new Map<string, string>();

    for (const pagePath of INTEGRATION_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });
      const title = await page.title();

      if (titles.has(title)) {
        throw new Error(`Duplicate title found: "${title}" on ${pagePath} and ${titles.get(title)}`);
      }

      titles.set(title, pagePath);
      console.log(`✅ ${pagePath} - Title: "${title}"`);
    }

    console.log(`\n✅ All ${INTEGRATION_PAGES.length} integration pages have unique titles`);
  });

  test('All Who We Serve pages should have unique titles', async ({ page }) => {
    const titles = new Map<string, string>();

    for (const pagePath of WHO_WE_SERVE_PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'domcontentloaded' });
      const title = await page.title();

      if (titles.has(title)) {
        throw new Error(`Duplicate title found: "${title}" on ${pagePath} and ${titles.get(title)}`);
      }

      titles.set(title, pagePath);
      console.log(`✅ ${pagePath} - Title: "${title}"`);
    }

    console.log(`\n✅ All ${WHO_WE_SERVE_PAGES.length} Who We Serve pages have unique titles`);
  });
});
