import { test, expect } from '@playwright/test';

test.describe('NAVIGATION & LINKS AUDIT', () => {

  test('Header Navigation - Logo', async ({ page }) => {
    await page.goto('/services/voice-ai');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
    await logo.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/');
    console.log('✅ Logo → / WORKS');
  });

  test('Header Navigation - Solutions Dropdown', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Define proper type for results
    type ServiceResult = {
      expected: string;
      status: string;
    };

    const results: Record<string, ServiceResult> = {
      'Voice AI': { expected: '/services/voice-ai', status: '' },
      'Google Ads': { expected: '/services/google-ads', status: '' },
      'Facebook Ads': { expected: '/services/facebook-ads', status: '' },
      'Lead Generation': { expected: '/services/lead-generation', status: '' },
    };

    // Hover over Solutions to open dropdown
    const solutionsButton = page.locator('nav button:has-text("Solutions"), nav a:has-text("Solutions")').first();
    await solutionsButton.hover();
    await page.waitForTimeout(500);

    for (const [serviceName, data] of Object.entries(results)) {
      try {
        const link = page.locator(`nav a:has-text("${serviceName}")`).first();
        await expect(link).toBeVisible({ timeout: 2000 });

        const href = await link.getAttribute('href');
        if (href === data.expected) {
          // Navigate to check it works
          await link.click();
          await page.waitForLoadState('networkidle');

          const response = await page.goto(data.expected);
          if (response?.status() === 200 || response?.status() === 304) {
            results[serviceName].status = 'WORKS';
            console.log(`✅ ${serviceName} → ${data.expected} WORKS`);
          } else {
            results[serviceName].status = `BROKEN (${response?.status()})`;
            console.log(`❌ ${serviceName} → ${data.expected} BROKEN (${response?.status()})`);
          }

          await page.goto('/');
          await solutionsButton.hover();
          await page.waitForTimeout(500);
        } else {
          results[serviceName].status = `WRONG HREF (${href})`;
          console.log(`❌ ${serviceName} has wrong href: ${href}`);
        }
      } catch (error) {
        results[serviceName].status = 'NOT FOUND';
        console.log(`❌ ${serviceName} link NOT FOUND`);
      }
    }

    console.log('\nSolutions Dropdown Results:', results);
  });

  test('Header Navigation - Industries Dropdown', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results: Record<string, string> = {
      'Healthcare': '/industries/healthcare',
      'Home Services': '/industries/home-services',
      'Automotive': '/industries/automotive',
      'Legal': '/industries/legal',
      'Real Estate': '/industries/real-estate',
      'Restaurants': '/industries/restaurants',
    };

    const industriesButton = page.locator('nav button:has-text("Industries"), nav a:has-text("Industries")').first();
    await industriesButton.hover();
    await page.waitForTimeout(500);

    for (const [industry, expectedPath] of Object.entries(results)) {
      try {
        const link = page.locator(`nav a:has-text("${industry}")`).first();
        await expect(link).toBeVisible({ timeout: 2000 });

        const href = await link.getAttribute('href');
        console.log(`${industry}: ${href === expectedPath ? '✅' : '❌'} (${href})`);
      } catch (error) {
        console.log(`${industry}: ❌ NOT FOUND`);
      }
    }
  });

  test('Header Navigation - Resources Dropdown', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results: Record<string, string> = {
      'Case Studies': '/case-studies',
      'Blog': '/blog',
      'FAQ': '/faq',
      'How It Works': '/how-it-works',
    };

    const resourcesButton = page.locator('nav button:has-text("Resources"), nav a:has-text("Resources")').first();
    await resourcesButton.hover();
    await page.waitForTimeout(500);

    for (const [resource, expectedPath] of Object.entries(results)) {
      try {
        const link = page.locator(`a[href="${expectedPath}"]`).first();
        await expect(link).toBeVisible({ timeout: 2000 });
        console.log(`✅ ${resource} → ${expectedPath} FOUND`);
      } catch (error) {
        console.log(`❌ ${resource} → ${expectedPath} NOT FOUND`);
      }
    }
  });

  test('Header Navigation - Direct Links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check phone link
    const phoneLink = page.locator('a[href^="tel:"]').first();
    if (await phoneLink.count() > 0) {
      const href = await phoneLink.getAttribute('href');
      console.log(`✅ Phone link found: ${href}`);
    } else {
      console.log('❌ Phone link NOT FOUND');
    }

    // Check Book Demo link
    const bookDemoLink = page.locator('a:has-text("Book"), a:has-text("Demo")').first();
    if (await bookDemoLink.count() > 0) {
      const href = await bookDemoLink.getAttribute('href');
      console.log(`✅ Book Demo link found: ${href}`);
    } else {
      console.log('❌ Book Demo link NOT FOUND');
    }
  });

  test('Footer Navigation - All Sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    console.log('\n=== FOOTER NAVIGATION ===\n');

    // Check Services column
    console.log('Services Column:');
    const serviceLinks = [
      '/services/voice-ai',
      '/services/google-ads',
      '/services/facebook-ads',
      '/services/lead-generation',
    ];

    for (const link of serviceLinks) {
      const footerLink = footer.locator(`a[href="${link}"]`).first();
      if (await footerLink.count() > 0) {
        console.log(`  ✅ ${link}`);
      } else {
        console.log(`  ❌ ${link} NOT FOUND`);
      }
    }

    // Check Company column
    console.log('\nCompany Column:');
    const companyLinks = ['/about', '/pricing', '/contact', '/blog'];

    for (const link of companyLinks) {
      const footerLink = footer.locator(`a[href="${link}"]`).first();
      if (await footerLink.count() > 0) {
        console.log(`  ✅ ${link}`);
      } else {
        console.log(`  ❌ ${link} NOT FOUND`);
      }
    }

    // Check Resources column
    console.log('\nResources Column:');
    const resourceLinks = ['/privacy', '/terms', '/faq'];

    for (const link of resourceLinks) {
      const footerLink = footer.locator(`a[href="${link}"]`).first();
      if (await footerLink.count() > 0) {
        console.log(`  ✅ ${link}`);
      } else {
        console.log(`  ❌ ${link} NOT FOUND`);
      }
    }

    // Check social links
    console.log('\nSocial Links:');
    const socialLinks = await footer.locator('a[target="_blank"]').all();
    console.log(`  Found ${socialLinks.length} external links with target="_blank"`);
  });

  test('Internal Page Links - Homepage CTAs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('\n=== HOMEPAGE CTAs ===\n');

    // Find all CTA buttons/links
    const ctaButtons = await page.locator('a:has-text("Book"), button:has-text("Book"), a:has-text("Get Started"), a:has-text("Demo")').all();
    console.log(`Found ${ctaButtons.length} CTA elements`);

    // Check "View All Case Studies" link
    const caseStudiesLink = page.locator('a:has-text("Case Studies")').first();
    if (await caseStudiesLink.count() > 0) {
      const href = await caseStudiesLink.getAttribute('href');
      console.log(`✅ Case Studies link: ${href}`);
    }

    // Check "See Pricing" link
    const pricingLink = page.locator('a:has-text("Pricing"), a[href="/pricing"]').first();
    if (await pricingLink.count() > 0) {
      const href = await pricingLink.getAttribute('href');
      console.log(`✅ Pricing link: ${href}`);
    }
  });

  test('Location Pages Navigation', async ({ page }) => {
    console.log('\n=== LOCATION PAGES ===\n');

    // Test main locations page
    const locationsResponse = await page.goto('/locations');
    await page.waitForLoadState('networkidle');

    if (locationsResponse?.status() === 200 || locationsResponse?.status() === 304) {
      console.log('✅ /locations - WORKS');
    } else {
      console.log(`❌ /locations - BROKEN (${locationsResponse?.status()})`);
    }

    // Test sample location page
    const knoxvilleResponse = await page.goto('/locations/voice-ai-knoxville-tn');
    await page.waitForLoadState('networkidle');

    if (knoxvilleResponse?.status() === 200 || knoxvilleResponse?.status() === 304) {
      console.log('✅ /locations/voice-ai-knoxville-tn - WORKS');

      // Check for breadcrumbs
      const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"], ol.breadcrumb');
      if (await breadcrumbs.count() > 0) {
        console.log('✅ Breadcrumbs found');
      } else {
        console.log('⚠️  Breadcrumbs not found');
      }
    } else {
      console.log(`❌ /locations/voice-ai-knoxville-tn - BROKEN (${knoxvilleResponse?.status()})`);
    }
  });

  test('404 Page Check', async ({ page }) => {
    console.log('\n=== 404 PAGE ===\n');

    const response = await page.goto('/this-page-does-not-exist');
    await page.waitForLoadState('networkidle');

    console.log(`Status: ${response?.status()}`);

    // Check if custom 404 page renders
    const pageContent = await page.content();
    if (pageContent.includes('404') || pageContent.includes('Not Found')) {
      console.log('✅ 404 page renders');
    } else {
      console.log('❌ No 404 page detected');
    }

    // Check if navigation exists on 404 page
    const header = page.locator('header');
    if (await header.count() > 0) {
      console.log('✅ Navigation present on 404 page');
    } else {
      console.log('❌ No navigation on 404 page');
    }

    // Check for link back to home
    const homeLink = page.locator('a[href="/"]');
    const homeLinkCount = await homeLink.count();
    console.log(`Home links found: ${homeLinkCount}`);
  });

  test('Service Pages Cross-Links', async ({ page }) => {
    console.log('\n=== SERVICE PAGE CROSS-LINKS ===\n');

    await page.goto('/services/voice-ai');
    await page.waitForLoadState('networkidle');

    // Look for links to other services
    const serviceLinks = await page.locator('a[href^="/services/"]').all();
    console.log(`Found ${serviceLinks.length} service links on Voice AI page`);

    for (const link of serviceLinks.slice(0, 5)) {
      const href = await link.getAttribute('href');
      console.log(`  - ${href}`);
    }
  });

  test('Pricing Page CTA Links', async ({ page }) => {
    console.log('\n=== PRICING PAGE CTAs ===\n');

    const response = await page.goto('/pricing');
    await page.waitForLoadState('networkidle');

    if (response?.status() === 200 || response?.status() === 304) {
      console.log('✅ /pricing - WORKS');

      // Find all CTA buttons
      const ctaButtons = await page.locator('a:has-text("Get Started"), a:has-text("Book"), button:has-text("Choose")').all();
      console.log(`Found ${ctaButtons.length} CTA buttons`);

      // Check if they link to contact/demo
      for (const button of ctaButtons.slice(0, 3)) {
        const href = await button.getAttribute('href');
        if (href) {
          console.log(`  CTA → ${href}`);
        }
      }
    } else {
      console.log(`❌ /pricing - BROKEN (${response?.status()})`);
    }
  });

  test('Comprehensive Link Scan - Find All 404s', async ({ page }) => {
    console.log('\n=== COMPREHENSIVE LINK SCAN ===\n');

    const pagesToScan = [
      '/',
      '/services/voice-ai',
      '/pricing',
      '/contact',
    ];

    const brokenLinks: string[] = [];
    const workingLinks: string[] = [];

    for (const pagePath of pagesToScan) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      const links = await page.locator('a[href^="/"]').all();
      const uniqueHrefs = new Set<string>();

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && !uniqueHrefs.has(href) && !href.includes('#')) {
          uniqueHrefs.add(href);
        }
      }

      console.log(`\nScanning ${pagePath} - Found ${uniqueHrefs.size} unique internal links`);

      for (const href of Array.from(uniqueHrefs).slice(0, 10)) {
        try {
          const response = await page.goto(href);
          await page.waitForLoadState('networkidle');

          if (response?.status() === 404) {
            brokenLinks.push(href);
            console.log(`  ❌ 404: ${href}`);
          } else if (response?.status() === 200 || response?.status() === 304) {
            workingLinks.push(href);
            console.log(`  ✅ ${href}`);
          } else {
            console.log(`  ⚠️  ${response?.status()}: ${href}`);
          }
        } catch (error) {
          console.log(`  ❌ ERROR: ${href}`);
          brokenLinks.push(href);
        }
      }
    }

    console.log(`\n=== FINAL RESULTS ===`);
    console.log(`Working links: ${workingLinks.length}`);
    console.log(`Broken links: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.log('\nBROKEN LINKS:');
      brokenLinks.forEach(link => console.log(`  - ${link}`));
    }
  });
});
