import { test, expect } from '@playwright/test';

test.describe('SIMPLIFIED NAVIGATION AUDIT', () => {

  test('Direct URL Navigation Tests', async ({ page }) => {
    const results: Record<string, { status: number | undefined; works: boolean }> = {};

    const urlsToTest = [
      // Core pages
      { path: '/', name: 'Homepage' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
      { path: '/pricing', name: 'Pricing' },
      { path: '/faq', name: 'FAQ' },
      { path: '/how-it-works', name: 'How It Works' },
      { path: '/demo', name: 'Demo' },

      // Services
      { path: '/services', name: 'Services Hub' },
      { path: '/services/voice-ai', name: 'Voice AI Service' },
      { path: '/services/google-ads', name: 'Google Ads Service' },
      { path: '/services/facebook-ads', name: 'Facebook Ads Service' },
      { path: '/services/lead-generation', name: 'Lead Generation Service' },

      // Industries
      { path: '/industries/healthcare', name: 'Healthcare Industry' },
      { path: '/industries/home-services', name: 'Home Services Industry' },
      { path: '/industries/automotive', name: 'Automotive Industry' },
      { path: '/industries/legal', name: 'Legal Industry' },
      { path: '/industries/real-estate', name: 'Real Estate Industry' },
      { path: '/industries/restaurants', name: 'Restaurants Industry' },

      // Resources
      { path: '/case-studies', name: 'Case Studies Hub' },
      { path: '/case-studies/hvac', name: 'HVAC Case Study' },
      { path: '/case-studies/dental', name: 'Dental Case Study' },
      { path: '/case-studies/plumbing', name: 'Plumbing Case Study' },
      { path: '/blog', name: 'Blog' },

      // Locations
      { path: '/locations', name: 'Locations Hub' },
      { path: '/locations/voice-ai-knoxville-tn', name: 'Knoxville Location' },

      // Legal
      { path: '/privacy', name: 'Privacy Policy' },
      { path: '/terms', name: 'Terms of Service' },

      // Packages
      { path: '/pricing/starter-package', name: 'Starter Package' },
      { path: '/pricing/growth-package', name: 'Growth Package' },
      { path: '/pricing/enterprise-package', name: 'Enterprise Package' },

      // Features
      { path: '/features', name: 'Features' },

      // 404 Test
      { path: '/this-does-not-exist', name: '404 Test' },
    ];

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║           DIRECT URL NAVIGATION TEST RESULTS                  ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    for (const { path, name } of urlsToTest) {
      try {
        const response = await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 10000 });
        const status = response?.status();

        results[path] = {
          status,
          works: status === 200 || status === 304,
        };

        const statusIcon = status === 200 || status === 304 ? '✅' :
                           status === 404 ? '🔴' :
                           status === 500 ? '💥' : '⚠️';

        console.log(`${statusIcon} ${status} | ${name.padEnd(30)} | ${path}`);
      } catch (error) {
        results[path] = { status: undefined, works: false };
        console.log(`❌ ERR | ${name.padEnd(30)} | ${path}`);
      }
    }

    // Summary
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    SUMMARY REPORT                              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const working = Object.values(results).filter(r => r.works).length;
    const broken = Object.values(results).filter(r => !r.works).length;
    const total = Object.values(results).length;

    console.log(`Total URLs Tested: ${total}`);
    console.log(`✅ Working (200/304): ${working}`);
    console.log(`❌ Broken/Error: ${broken}`);
    console.log(`Success Rate: ${((working / total) * 100).toFixed(1)}%\n`);

    // List broken links
    const brokenLinks = Object.entries(results).filter(([_, r]) => !r.works);
    if (brokenLinks.length > 0) {
      console.log('BROKEN LINKS:');
      brokenLinks.forEach(([path, result]) => {
        console.log(`  💥 ${result.status || 'ERROR'} | ${path}`);
      });
    }
  });

  test('Header Logo Link Test', async ({ page }) => {
    await page.goto('/services/voice-ai', { waitUntil: 'domcontentloaded' });

    console.log('\n=== HEADER LOGO TEST ===');

    // Try multiple logo selectors
    const logoSelectors = [
      'header a[href="/"] img',
      'header nav a[href="/"]',
      'header a img[alt*="Capture"]',
      'a[aria-label*="Home"]',
    ];

    for (const selector of logoSelectors) {
      const logo = page.locator(selector).first();
      const count = await logo.count();
      if (count > 0) {
        console.log(`✅ Found logo with selector: ${selector}`);
        const href = await logo.evaluate(el => {
          const link = el.tagName === 'A' ? el : el.closest('a');
          return link?.getAttribute('href');
        });
        console.log(`   Links to: ${href}`);
        return;
      }
    }

    console.log('❌ Logo link not found with any selector');
  });

  test('Footer Link Audit', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    FOOTER LINKS AUDIT                          ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer');

    // Get all footer links
    const footerLinks = await footer.locator('a[href^="/"]').all();
    console.log(`Total internal footer links: ${footerLinks.length}\n`);

    const linkMap: Record<string, number> = {};

    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      if (href) {
        linkMap[href] = (linkMap[href] || 0) + 1;
      }
    }

    console.log('FOOTER LINKS FOUND:');
    Object.entries(linkMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([href, count]) => {
        console.log(`  • ${href} ${count > 1 ? `(${count}x)` : ''}`);
      });

    // Check for external social links
    const socialLinks = await footer.locator('a[target="_blank"]').all();
    console.log(`\nExternal links (social): ${socialLinks.length}`);

    for (const link of socialLinks) {
      const href = await link.getAttribute('href');
      console.log(`  • ${href}`);
    }
  });

  test('Phone and CTA Links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║               PHONE & CTA LINKS AUDIT                          ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    // Phone links
    const phoneLinks = await page.locator('a[href^="tel:"]').all();
    console.log(`Phone links found: ${phoneLinks.length}`);
    for (const link of phoneLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`  ☎️  ${href} | "${text?.trim()}"`);
    }

    // CTA buttons
    console.log('\nCTA Buttons:');
    const ctaSelectors = [
      'a:has-text("Book")',
      'a:has-text("Demo")',
      'a:has-text("Get Started")',
      'a:has-text("Contact")',
    ];

    for (const selector of ctaSelectors) {
      const ctas = await page.locator(selector).all();
      for (const cta of ctas.slice(0, 2)) {
        const href = await cta.getAttribute('href');
        const text = await cta.textContent();
        if (href) {
          console.log(`  🔘 ${href} | "${text?.trim()}"`);
        }
      }
    }
  });

  test('Service Cross-Links Check', async ({ page }) => {
    await page.goto('/services/voice-ai', { waitUntil: 'domcontentloaded' });

    console.log('\n=== SERVICE CROSS-LINKS ===');

    const serviceLinks = await page.locator('a[href^="/services/"]').all();
    console.log(`\nService links found on /services/voice-ai: ${serviceLinks.length}`);

    const uniqueServices = new Set<string>();
    for (const link of serviceLinks) {
      const href = await link.getAttribute('href');
      if (href) uniqueServices.add(href);
    }

    console.log('\nUnique service links:');
    Array.from(uniqueServices).forEach(href => console.log(`  • ${href}`));
  });

  test('Check for Broken Images', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    console.log('\n=== IMAGE LOADING CHECK ===');

    await page.waitForTimeout(2000);

    const brokenImages = await page.$$eval('img', imgs =>
      imgs
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => ({
          src: img.src,
          alt: img.alt,
        }))
    );

    console.log(`\nBroken images found: ${brokenImages.length}`);

    if (brokenImages.length > 0) {
      brokenImages.slice(0, 10).forEach(img => {
        console.log(`  ❌ ${img.src}`);
        console.log(`     Alt: "${img.alt}"`);
      });
    } else {
      console.log('✅ All images loaded successfully');
    }
  });

  test('Navigation Breadcrumbs', async ({ page }) => {
    const pagesWithBreadcrumbs = [
      '/services/voice-ai',
      '/industries/healthcare',
      '/case-studies/hvac',
    ];

    console.log('\n=== BREADCRUMB NAVIGATION ===');

    for (const path of pagesWithBreadcrumbs) {
      try {
        await page.goto(path, { waitUntil: 'domcontentloaded' });

        const breadcrumbSelectors = [
          'nav[aria-label="Breadcrumb"]',
          'nav[aria-label="breadcrumb"]',
          'ol.breadcrumb',
          '[itemtype="https://schema.org/BreadcrumbList"]',
        ];

        let found = false;
        for (const selector of breadcrumbSelectors) {
          const breadcrumb = page.locator(selector);
          if (await breadcrumb.count() > 0) {
            console.log(`✅ ${path} - Breadcrumbs found`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log(`⚠️  ${path} - No breadcrumbs detected`);
        }
      } catch (error) {
        console.log(`❌ ${path} - Error loading page`);
      }
    }
  });
});
