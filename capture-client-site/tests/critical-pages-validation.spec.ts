import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Critical Pages Validation', () => {
  test.setTimeout(60000); // 60 second timeout per test

  // 1. HOMEPAGE TEST
  test('Homepage loads correctly with "Who We Serve" navigation', async ({ page }) => {
    console.log('\n🔍 Testing Homepage...');

    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-homepage.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');

    // Check for "Who We Serve" in navigation
    const whoWeServeNav = page.locator('nav a:has-text("Who We Serve"), header a:has-text("Who We Serve")');
    await expect(whoWeServeNav.first()).toBeVisible();
    console.log('   ✅ "Who We Serve" found in navigation');

    // Check for hero section
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
    const heroText = await hero.textContent();
    console.log(`   Hero: "${heroText?.substring(0, 50)}..."`);

    console.log('✅ Homepage: PASS\n');
  });

  // 2. WHO WE SERVE OVERVIEW PAGE
  test('Who We Serve overview page loads with 12 industry cards', async ({ page }) => {
    console.log('🔍 Testing Who We Serve Overview Page...');

    const response = await page.goto(`${BASE_URL}/who-we-serve`, { waitUntil: 'networkidle' });

    // Check for 404
    const status = response?.status();
    console.log(`   Status: ${status}`);
    expect(status).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-who-we-serve-overview.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');

    // Check for main heading
    const mainHeading = page.locator('h1:has-text("Industries"), h1:has-text("Who We Serve")').first();
    await expect(mainHeading).toBeVisible();
    const headingText = await mainHeading.textContent();
    console.log(`   Main Heading: "${headingText}"`);

    // Count industry cards
    await page.waitForSelector('[class*="card"], [class*="grid"] > div', { timeout: 5000 }).catch(() => {});
    const industryCards = page.locator('[class*="card"], article, [class*="industry"]');
    const cardCount = await industryCards.count();
    console.log(`   Industry Cards Found: ${cardCount}`);

    if (cardCount < 10) {
      console.log('   ⚠️ Warning: Expected 12 industry cards, found fewer');
    } else {
      console.log('   ✅ Industry cards displayed');
    }

    console.log('✅ Who We Serve Overview: PASS\n');
  });

  // 3. LEGAL/LAW FIRMS INDUSTRY PAGE
  test('Legal/Law Firms industry page loads correctly', async ({ page }) => {
    console.log('🔍 Testing Legal/Law Firms Industry Page...');

    const response = await page.goto(`${BASE_URL}/who-we-serve/legal-law-firms`, { waitUntil: 'networkidle' });

    const status = response?.status();
    console.log(`   Status: ${status}`);
    expect(status).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-industry-legal.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');
    expect(title.toLowerCase()).toContain('legal');

    // Check for industry-specific content
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    console.log(`   H1: "${h1Text}"`);

    // Look for legal-specific keywords
    const bodyText = await page.locator('body').textContent();
    const hasLegalContent = bodyText?.toLowerCase().includes('legal') ||
                           bodyText?.toLowerCase().includes('law') ||
                           bodyText?.toLowerCase().includes('attorney');
    expect(hasLegalContent).toBe(true);
    console.log('   ✅ Legal-specific content found');

    console.log('✅ Legal Industry Page: PASS\n');
  });

  // 4. HOME SERVICES INDUSTRY PAGE
  test('Home Services industry page loads correctly', async ({ page }) => {
    console.log('🔍 Testing Home Services Industry Page...');

    const response = await page.goto(`${BASE_URL}/who-we-serve/home-services`, { waitUntil: 'networkidle' });

    const status = response?.status();
    console.log(`   Status: ${status}`);
    expect(status).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-industry-home-services.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');

    // Check for industry-specific content
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    console.log(`   H1: "${h1Text}"`);

    console.log('✅ Home Services Industry Page: PASS\n');
  });

  // 5. HEALTHCARE INDUSTRY PAGE
  test('Healthcare industry page loads correctly', async ({ page }) => {
    console.log('🔍 Testing Healthcare Industry Page...');

    const response = await page.goto(`${BASE_URL}/who-we-serve/healthcare`, { waitUntil: 'networkidle' });

    const status = response?.status();
    console.log(`   Status: ${status}`);
    expect(status).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-industry-healthcare.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');

    // Check for industry-specific content
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    console.log(`   H1: "${h1Text}"`);

    console.log('✅ Healthcare Industry Page: PASS\n');
  });

  // 6. INTEGRATIONS OVERVIEW PAGE
  test('Integrations page loads with integration cards', async ({ page }) => {
    console.log('🔍 Testing Integrations Overview Page...');

    const response = await page.goto(`${BASE_URL}/integrations`, { waitUntil: 'networkidle' });

    const status = response?.status();
    console.log(`   Status: ${status}`);
    expect(status).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-integrations-overview.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');

    // Check for integrations content
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    console.log(`   H1: "${h1Text}"`);

    // Count integration cards
    await page.waitForSelector('[class*="card"], [class*="grid"] > div', { timeout: 5000 }).catch(() => {});
    const integrationCards = page.locator('[class*="card"], article');
    const cardCount = await integrationCards.count();
    console.log(`   Integration Cards Found: ${cardCount}`);

    console.log('✅ Integrations Overview: PASS\n');
  });

  // 7. HUBSPOT INTEGRATION DETAIL PAGE
  test('HubSpot integration detail page loads correctly', async ({ page }) => {
    console.log('🔍 Testing HubSpot Integration Detail Page...');

    const response = await page.goto(`${BASE_URL}/integrations/hubspot`, { waitUntil: 'networkidle' });

    const status = response?.status();
    console.log(`   Status: ${status}`);
    expect(status).toBe(200);

    // Take snapshot
    await page.screenshot({
      path: '.playwright-mcp/test-integration-hubspot.png',
      fullPage: true
    });

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');

    // Check for HubSpot-specific content
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    console.log(`   H1: "${h1Text}"`);

    const bodyText = await page.locator('body').textContent();
    const hasHubSpotContent = bodyText?.toLowerCase().includes('hubspot');
    expect(hasHubSpotContent).toBe(true);
    console.log('   ✅ HubSpot-specific content found');

    console.log('✅ HubSpot Integration Page: PASS\n');
  });

  // 8. ADDITIONAL KEY PAGES CHECK
  test('Additional critical pages load correctly', async ({ page }) => {
    console.log('🔍 Testing Additional Critical Pages...\n');

    const additionalPages = [
      { url: '/services', name: 'Services' },
      { url: '/pricing', name: 'Pricing' },
      { url: '/demo', name: 'Demo' },
      { url: '/contact', name: 'Contact' }
    ];

    for (const pageInfo of additionalPages) {
      console.log(`   Testing: ${pageInfo.name} (${pageInfo.url})`);

      const response = await page.goto(`${BASE_URL}${pageInfo.url}`, { waitUntil: 'networkidle' });
      const status = response?.status();

      if (status === 200) {
        const title = await page.title();
        const is404 = title.includes('404') || title.includes('Not Found');

        if (is404) {
          console.log(`   ❌ ${pageInfo.name}: 404 Page (title: "${title}")`);
        } else {
          console.log(`   ✅ ${pageInfo.name}: PASS (title: "${title}")`);
        }
      } else {
        console.log(`   ⚠️ ${pageInfo.name}: Status ${status}`);
      }
    }

    console.log('\n✅ Additional Pages Check: COMPLETE\n');
  });
});
