import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

// Track all issues found
const issues: string[] = [];
const consoleErrors: string[] = [];
const consoleWarnings: string[] = [];

test.describe('Capture Client Website Validation', () => {

  test.beforeEach(async ({ page }) => {
    // Capture console messages
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();

      if (type === 'error' && !text.includes('favicon')) {
        consoleErrors.push(`${text}`);
      }
      if (type === 'warning') {
        consoleWarnings.push(`${text}`);
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`PAGE ERROR: ${error.message}`);
    });
  });

  test('1. Homepage - Desktop & Mobile', async ({ page, browser }) => {
    console.log('\n=== TESTING HOMEPAGE ===');

    // Desktop test
    await page.setViewportSize({ width: 1920, height: 1080 });
    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    console.log('✅ Homepage returns 200');

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);
    expect(title.length).toBeGreaterThan(20);

    // Check meta description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    console.log(`   Meta Description Length: ${metaDesc?.length || 0} chars`);

    // Check for lead capture form
    const forms = await page.locator('form').count();
    console.log(`   Forms found: ${forms}`);
    expect(forms).toBeGreaterThan(0);

    // Check for phone links (click-to-call)
    const phoneLinks = await page.locator('a[href^="tel:"]').count();
    console.log(`   Click-to-call buttons: ${phoneLinks}`);

    // Check hero section
    const h1 = await page.locator('h1').first().textContent();
    console.log(`   H1: "${h1}"`);
    expect(h1).toBeTruthy();

    // Mobile test
    console.log('\n   Testing MOBILE viewport...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check mobile-optimized CSS is loaded
    const mobileStyles = await mobilePage.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.map(link => (link as HTMLLinkElement).href);
    });

    const hasMobileCSS = mobileStyles.some(href => href.includes('globals-mobile'));
    console.log(`   Mobile-optimized CSS loaded: ${hasMobileCSS ? '✅' : '❌'}`);

    // Check for backdrop-filter on mobile (should be disabled)
    const backdropFilterElements = await mobilePage.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const filtered = Array.from(elements).filter(el => {
        const style = window.getComputedStyle(el);
        return style.backdropFilter && style.backdropFilter !== 'none';
      });
      return filtered.length;
    });
    console.log(`   Elements with backdrop-filter: ${backdropFilterElements}`);
    if (backdropFilterElements > 0) {
      issues.push(`⚠️ Mobile: ${backdropFilterElements} elements still have backdrop-filter`);
    }

    // Check content is visible (not opacity 0)
    const invisibleContent = await mobilePage.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return true;
      const style = window.getComputedStyle(main);
      return style.opacity === '0';
    });

    if (invisibleContent) {
      issues.push('❌ Mobile: Main content has opacity 0');
      console.log('   ❌ Content visibility: HIDDEN');
    } else {
      console.log('   ✅ Content visibility: VISIBLE');
    }

    // Check form is visible on mobile
    const mobileFormVisible = await mobilePage.locator('form').first().isVisible();
    console.log(`   Mobile form visible: ${mobileFormVisible ? '✅' : '❌'}`);

    await mobileContext.close();
  });

  test('2. Services Page', async ({ page }) => {
    console.log('\n=== TESTING SERVICES PAGE ===');

    const response = await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });

    if (response?.status() === 404) {
      issues.push('❌ Services page returns 404');
      console.log('❌ Services page returns 404');
      return;
    }

    expect(response?.status()).toBe(200);
    console.log('✅ Services page returns 200');

    // Check for service cards/links
    const serviceLinks = await page.locator('a[href*="/services/"]').count();
    console.log(`   Service links found: ${serviceLinks}`);

    if (serviceLinks === 0) {
      issues.push('⚠️ Services page has no service links');
    }

    // Check title
    const title = await page.title();
    console.log(`   Title: "${title}"`);

    // Check for images
    const images = await page.locator('img').count();
    console.log(`   Images: ${images}`);

    // Check for broken images
    const brokenImages = await page.$$eval('img', imgs =>
      imgs.filter(img => !img.complete || img.naturalWidth === 0).length
    );

    if (brokenImages > 0) {
      issues.push(`⚠️ Services page has ${brokenImages} broken images`);
      console.log(`   ⚠️ Broken images: ${brokenImages}`);
    } else {
      console.log('   ✅ All images loaded');
    }
  });

  test('3. Service Detail Page (Voice AI)', async ({ page }) => {
    console.log('\n=== TESTING SERVICE DETAIL PAGE ===');

    // Try common service URLs
    const serviceUrls = [
      '/services/voice-ai',
      '/services/ai-voice-agents',
      '/voice-ai',
      '/services'
    ];

    let foundPage = false;
    let workingUrl = '';

    for (const url of serviceUrls) {
      const response = await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });
      if (response?.status() === 200) {
        foundPage = true;
        workingUrl = url;
        break;
      }
    }

    if (!foundPage) {
      issues.push('⚠️ Could not find a service detail page');
      console.log('⚠️ Could not find service detail page');
      return;
    }

    console.log(`✅ Service page found: ${workingUrl}`);

    // Check for lead form
    const hasForm = await page.locator('form').count() > 0;
    console.log(`   Lead form present: ${hasForm ? '✅' : '❌'}`);

    if (!hasForm) {
      issues.push(`⚠️ Service page ${workingUrl} missing lead form`);
    }

    // Check for CTA buttons
    const ctaButtons = await page.locator('a:has-text("Get Started"), a:has-text("Contact"), button:has-text("Get Started")').count();
    console.log(`   CTA buttons: ${ctaButtons}`);
  });

  test('4. Locations Page', async ({ page }) => {
    console.log('\n=== TESTING LOCATIONS PAGE ===');

    const response = await page.goto(`${BASE_URL}/locations`, { waitUntil: 'networkidle' });

    if (response?.status() === 404) {
      issues.push('⚠️ Locations page returns 404');
      console.log('⚠️ Locations page returns 404 (may not be implemented)');
      return;
    }

    expect(response?.status()).toBe(200);
    console.log('✅ Locations page returns 200');

    // Check for location links
    const locationLinks = await page.locator('a[href*="knoxville"], a[href*="nashville"], a[href*="chattanooga"], a[href*="memphis"]').count();
    console.log(`   Location links found: ${locationLinks}`);
  });

  test('5. Location Detail Page (Voice AI Knoxville)', async ({ page }) => {
    console.log('\n=== TESTING LOCATION DETAIL PAGE ===');

    // Try common location URLs
    const locationUrls = [
      '/locations/voice-ai-knoxville-tn',
      '/voice-ai-knoxville',
      '/services/voice-ai/knoxville',
      '/locations/knoxville'
    ];

    let foundPage = false;
    let workingUrl = '';

    for (const url of locationUrls) {
      const response = await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });
      if (response?.status() === 200) {
        foundPage = true;
        workingUrl = url;
        break;
      }
    }

    if (!foundPage) {
      issues.push('⚠️ Could not find a location detail page');
      console.log('⚠️ Could not find location detail page');
      return;
    }

    console.log(`✅ Location page found: ${workingUrl}`);

    // Check title includes location
    const title = await page.title();
    const hasLocation = /knoxville|nashville|chattanooga|memphis/i.test(title);
    console.log(`   Title includes location: ${hasLocation ? '✅' : '❌'}`);
    console.log(`   Title: "${title}"`);

    // Check for lead form
    const hasForm = await page.locator('form').count() > 0;
    console.log(`   Lead form present: ${hasForm ? '✅' : '❌'}`);
  });

  test('6. Pricing Page', async ({ page }) => {
    console.log('\n=== TESTING PRICING PAGE ===');

    const response = await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });

    if (response?.status() === 404) {
      issues.push('❌ Pricing page returns 404');
      console.log('❌ Pricing page returns 404');
      return;
    }

    expect(response?.status()).toBe(200);
    console.log('✅ Pricing page returns 200');

    // Check for pricing elements
    const priceElements = await page.locator(':has-text("$")').count();
    console.log(`   Price elements found: ${priceElements}`);

    if (priceElements === 0) {
      issues.push('⚠️ Pricing page has no visible prices');
    }

    // Check for package tiers
    const packageTiers = await page.locator(':has-text("Starter"), :has-text("Growth"), :has-text("Enterprise"), :has-text("Basic"), :has-text("Pro"), :has-text("Premium")').count();
    console.log(`   Package tiers found: ${packageTiers}`);

    // Check for CTA buttons
    const ctaButtons = await page.locator('a:has-text("Get Started"), button:has-text("Get Started"), a:has-text("Choose Plan")').count();
    console.log(`   CTA buttons: ${ctaButtons}`);
  });

  test('7. Features Page', async ({ page }) => {
    console.log('\n=== TESTING FEATURES PAGE ===');

    const response = await page.goto(`${BASE_URL}/features`, { waitUntil: 'networkidle' });

    if (response?.status() === 404) {
      issues.push('⚠️ Features page returns 404');
      console.log('⚠️ Features page returns 404 (may not be implemented)');
      return;
    }

    expect(response?.status()).toBe(200);
    console.log('✅ Features page returns 200');

    // Check for feature sections
    const featureCards = await page.locator('[class*="feature"], [class*="card"]').count();
    console.log(`   Feature elements found: ${featureCards}`);
  });

  test('8. Contact Page', async ({ page }) => {
    console.log('\n=== TESTING CONTACT PAGE ===');

    const response = await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });

    if (response?.status() === 404) {
      issues.push('⚠️ Contact page returns 404');
      console.log('⚠️ Contact page returns 404');
      return;
    }

    expect(response?.status()).toBe(200);
    console.log('✅ Contact page returns 200');

    // Check for contact form
    const forms = await page.locator('form').count();
    console.log(`   Contact forms found: ${forms}`);

    if (forms === 0) {
      issues.push('❌ Contact page has no form');
    }

    // Check for contact information
    const phoneLinks = await page.locator('a[href^="tel:"]').count();
    const emailLinks = await page.locator('a[href^="mailto:"]').count();
    console.log(`   Phone links: ${phoneLinks}`);
    console.log(`   Email links: ${emailLinks}`);
  });

  test('9. Lead Capture Form Functionality', async ({ page }) => {
    console.log('\n=== TESTING LEAD CAPTURE FORM ===');

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Find the first form
    const form = page.locator('form').first();
    const formVisible = await form.isVisible();

    if (!formVisible) {
      issues.push('❌ Lead capture form not visible on homepage');
      console.log('❌ Form not visible');
      return;
    }

    console.log('✅ Form is visible');

    // Check form fields
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i]').first();
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    const phoneInput = page.locator('input[name="phone"], input[type="tel"]').first();

    const hasName = await nameInput.count() > 0;
    const hasEmail = await emailInput.count() > 0;
    const hasPhone = await phoneInput.count() > 0;

    console.log(`   Name field: ${hasName ? '✅' : '❌'}`);
    console.log(`   Email field: ${hasEmail ? '✅' : '❌'}`);
    console.log(`   Phone field: ${hasPhone ? '✅' : '❌'}`);

    if (!hasEmail) {
      issues.push('❌ Lead form missing email field');
    }

    // Check submit button
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    const hasSubmit = await submitButton.count() > 0;
    console.log(`   Submit button: ${hasSubmit ? '✅' : '❌'}`);

    if (!hasSubmit) {
      issues.push('❌ Lead form missing submit button');
    }

    // Try filling form (don't submit)
    if (hasName && hasEmail) {
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      if (hasPhone) {
        await phoneInput.fill('555-123-4567');
      }
      console.log('✅ Form fields are fillable');
    }
  });

  test('10. 404 Page Handling', async ({ page }) => {
    console.log('\n=== TESTING 404 HANDLING ===');

    const response = await page.goto(`${BASE_URL}/this-page-does-not-exist-12345`, { waitUntil: 'networkidle' });

    const status = response?.status();
    console.log(`   404 page status: ${status}`);

    // Check if 404 page has helpful content
    const content = await page.textContent('body');
    const has404Message = content?.toLowerCase().includes('404') || content?.toLowerCase().includes('not found');
    console.log(`   Has 404 message: ${has404Message ? '✅' : '❌'}`);

    // Check for navigation back to home
    const homeLink = await page.locator('a[href="/"], a:has-text("Home")').count();
    console.log(`   Links back to home: ${homeLink}`);
  });

  test('11. Mobile Performance Check', async ({ browser }) => {
    console.log('\n=== MOBILE PERFORMANCE CHECK ===');

    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobileContext.newPage();

    // Track performance metrics
    const startTime = Date.now();
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    console.log(`   Page load time: ${loadTime}ms`);

    // Check for animation performance issues
    const infiniteAnimations = await mobilePage.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      let count = 0;

      sheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.cssText.includes('animation') && rule.cssText.includes('infinite')) {
              count++;
            }
          });
        } catch (e) {
          // CORS errors are expected for external stylesheets
        }
      });

      return count;
    });

    console.log(`   Infinite animations in CSS: ${infiniteAnimations}`);

    if (infiniteAnimations > 5) {
      issues.push(`⚠️ Mobile: ${infiniteAnimations} infinite animations detected (may cause performance issues)`);
    }

    // Check scroll performance by detecting layout shifts
    let layoutShiftDetected = false;

    mobilePage.on('console', msg => {
      if (msg.text().includes('layout shift') || msg.text().includes('CLS')) {
        layoutShiftDetected = true;
      }
    });

    // Scroll the page
    await mobilePage.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await mobilePage.waitForTimeout(500);

    console.log(`   Layout shift detected: ${layoutShiftDetected ? '⚠️' : '✅ None'}`);

    // Check mobile menu
    const mobileMenuButton = await mobilePage.locator('button[aria-label*="menu" i], button:has(svg)').count();
    console.log(`   Mobile menu button: ${mobileMenuButton > 0 ? '✅' : '❌'}`);

    await mobileContext.close();
  });

  test('12. SEO Meta Tags Validation', async ({ page }) => {
    console.log('\n=== SEO META TAGS VALIDATION ===');

    const testPages = [
      { url: '/', name: 'Homepage' },
      { url: '/services', name: 'Services' },
      { url: '/pricing', name: 'Pricing' }
    ];

    for (const { url, name } of testPages) {
      const response = await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });

      if (response?.status() !== 200) {
        console.log(`   ⚠️ ${name}: Page not accessible`);
        continue;
      }

      console.log(`\n   ${name}:`);

      // Check title
      const title = await page.title();
      console.log(`   - Title: "${title}" (${title.length} chars)`);
      if (title.length < 30) {
        issues.push(`⚠️ ${name}: Title too short (${title.length} chars)`);
      }

      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      console.log(`   - Meta Description: ${metaDesc?.length || 0} chars`);
      if (!metaDesc || metaDesc.length < 100) {
        issues.push(`⚠️ ${name}: Meta description missing or too short`);
      }

      // Check Open Graph
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      console.log(`   - OG:Title: ${ogTitle ? '✅' : '❌'}`);
      console.log(`   - OG:Image: ${ogImage ? '✅' : '❌'}`);

      // Check canonical
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      console.log(`   - Canonical: ${canonical ? '✅' : '❌'}`);
    }
  });

  test.afterAll(async () => {
    console.log('\n\n' + '='.repeat(80));
    console.log('PLAYWRIGHT TESTING COMPLETE');
    console.log('='.repeat(80));

    // Summary
    const totalIssues = issues.length;
    const totalErrors = consoleErrors.length;
    const totalWarnings = consoleWarnings.length;

    console.log('\n📊 TEST SUMMARY:');
    console.log(`   Total Issues Found: ${totalIssues}`);
    console.log(`   Console Errors: ${totalErrors}`);
    console.log(`   Console Warnings: ${totalWarnings}`);

    if (totalIssues === 0 && totalErrors === 0) {
      console.log('\n✅ ALL TESTS PASSED - SITE IS READY FOR DEPLOYMENT');
    } else {
      console.log('\n⚠️ ISSUES FOUND - REVIEW REQUIRED');

      if (issues.length > 0) {
        console.log('\n📋 ISSUES DETECTED:');
        issues.forEach(issue => console.log(`   ${issue}`));
      }

      if (consoleErrors.length > 0) {
        console.log('\n❌ CONSOLE ERRORS:');
        consoleErrors.slice(0, 10).forEach(error => console.log(`   - ${error}`));
        if (consoleErrors.length > 10) {
          console.log(`   ... and ${consoleErrors.length - 10} more errors`);
        }
      }
    }

    console.log('\n' + '='.repeat(80));
  });
});
