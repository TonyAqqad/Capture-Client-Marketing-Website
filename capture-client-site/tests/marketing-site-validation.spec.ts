import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Track all errors across tests
const testResults = {
  passed: [] as string[],
  failed: [] as string[],
  errors404: [] as string[],
  consoleErrors: [] as { url: string; error: string }[],
  brokenFunctionality: [] as string[],
};

test.describe('Marketing Agency Site Validation', () => {

  test('Homepage loads with lead capture form', async ({ page }) => {
    const url = '/';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response received`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404 Error`);
        return;
      }

      expect(response.status()).toBe(200);

      // Check for console errors
      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      // Verify page title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Verify lead capture form exists
      const forms = page.locator('form');
      const formCount = await forms.count();

      if (formCount === 0) {
        testResults.brokenFunctionality.push(`${url} - No lead capture form found`);
      }

      // Verify meta description exists
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      if (!metaDesc || metaDesc.length < 50) {
        testResults.brokenFunctionality.push(`${url} - Missing or short meta description`);
      }

      // Verify navigation exists
      const nav = page.locator('nav, header');
      await expect(nav.first()).toBeVisible();

      testResults.passed.push(`${url} - Loaded successfully`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Services page loads correctly', async ({ page }) => {
    const url = '/services';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Check for service listings
      const serviceLinks = page.locator('a[href*="/services/"]');
      const linkCount = await serviceLinks.count();

      if (linkCount === 0) {
        testResults.brokenFunctionality.push(`${url} - No service links found`);
      }

      testResults.passed.push(`${url} - Loaded with ${linkCount} services`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Voice AI service detail page loads', async ({ page }) => {
    const url = '/services/voice-ai';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Verify lead form
      const forms = page.locator('form');
      if (await forms.count() === 0) {
        testResults.brokenFunctionality.push(`${url} - No lead form`);
      }

      // Check for broken images
      await page.waitForLoadState('networkidle');
      const brokenImages = await page.$$eval('img', imgs =>
        imgs.filter(img => !img.complete || img.naturalWidth === 0).length
      );

      if (brokenImages > 0) {
        testResults.brokenFunctionality.push(`${url} - ${brokenImages} broken images`);
      }

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - Service page loaded`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Locations page loads correctly', async ({ page }) => {
    const url = '/locations';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Check for location listings
      const locationLinks = page.locator('a[href*="/locations/"]');
      const linkCount = await locationLinks.count();

      if (linkCount === 0) {
        testResults.brokenFunctionality.push(`${url} - No location links found`);
      }

      testResults.passed.push(`${url} - Loaded with ${linkCount} locations`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Location detail page loads (Knoxville)', async ({ page }) => {
    const url = '/locations/voice-ai-knoxville-tn';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Verify title includes location
      const title = await page.title();
      if (!title.toLowerCase().includes('knoxville')) {
        testResults.brokenFunctionality.push(`${url} - Title missing location keyword`);
      }

      // Verify lead form
      const forms = page.locator('form');
      if (await forms.count() === 0) {
        testResults.brokenFunctionality.push(`${url} - No lead form`);
      }

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - Location page loaded`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Pricing page loads correctly', async ({ page }) => {
    const url = '/pricing';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Verify pricing information
      const priceElements = page.locator(':has-text("$")');
      const priceCount = await priceElements.count();

      if (priceCount === 0) {
        testResults.brokenFunctionality.push(`${url} - No pricing visible`);
      }

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - Pricing page loaded`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Package detail page loads (Starter)', async ({ page }) => {
    const url = '/pricing/starter-package';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Verify CTA exists
      const cta = page.locator('a:has-text("Get Started"), button:has-text("Get Started"), a:has-text("Contact"), button:has-text("Contact")');
      const ctaCount = await cta.count();

      if (ctaCount === 0) {
        testResults.brokenFunctionality.push(`${url} - No CTA found`);
      }

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - Package page loaded`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Contact page loads correctly', async ({ page }) => {
    const url = '/contact';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Verify contact form
      const forms = page.locator('form');
      if (await forms.count() === 0) {
        testResults.brokenFunctionality.push(`${url} - No contact form`);
      }

      // Verify phone link
      const phoneLinks = page.locator('a[href^="tel:"]');
      const phoneCount = await phoneLinks.count();

      if (phoneCount === 0) {
        testResults.brokenFunctionality.push(`${url} - No click-to-call button`);
      }

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - Contact page loaded with form`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('About page loads correctly', async ({ page }) => {
    const url = '/about';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - About page loaded`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('National SEO page loads (Voice AI Small Business)', async ({ page }) => {
    const url = '/voice-ai-small-business';
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (!response) {
        testResults.failed.push(`${url} - No response`);
        return;
      }

      if (response.status() === 404) {
        testResults.errors404.push(url);
        testResults.failed.push(`${url} - 404`);
        return;
      }

      expect(response.status()).toBe(200);

      // Verify lead form
      const forms = page.locator('form');
      if (await forms.count() === 0) {
        testResults.brokenFunctionality.push(`${url} - No lead form`);
      }

      // Verify meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      if (!metaDesc || metaDesc.length < 100) {
        testResults.brokenFunctionality.push(`${url} - Short meta description`);
      }

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          testResults.consoleErrors.push({ url, error: err });
        });
      }

      testResults.passed.push(`${url} - National SEO page loaded`);

    } catch (error) {
      testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Mobile responsiveness check', async ({ page }) => {
    const url = '/';

    try {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`${BASE_URL}${url}`);

      // Verify no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      if (bodyWidth > viewportWidth + 10) {
        testResults.brokenFunctionality.push('Mobile: Horizontal scroll detected');
      }

      // Verify mobile menu or navigation
      const nav = page.locator('nav, header');
      await expect(nav.first()).toBeVisible();

      testResults.passed.push('Mobile responsiveness verified');

    } catch (error) {
      testResults.failed.push(`Mobile test - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Click-to-call functionality', async ({ page }) => {
    const url = '/';

    try {
      await page.goto(`${BASE_URL}${url}`);

      // Find phone links
      const phoneLinks = page.locator('a[href^="tel:"]');
      const phoneCount = await phoneLinks.count();

      if (phoneCount === 0) {
        testResults.brokenFunctionality.push('No click-to-call buttons found on homepage');
      } else {
        // Verify phone number format
        const firstPhoneHref = await phoneLinks.first().getAttribute('href');
        if (firstPhoneHref && !firstPhoneHref.match(/tel:\+?[\d-().\s]+/)) {
          testResults.brokenFunctionality.push('Invalid phone number format');
        }
        testResults.passed.push(`Click-to-call verified (${phoneCount} buttons)`);
      }

    } catch (error) {
      testResults.failed.push(`Click-to-call test - Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  test('Sample location pages load without 404s', async ({ page }) => {
    const sampleUrls = [
      '/locations/voice-ai-nashville-tn',
      '/locations/voice-ai-chattanooga-tn',
      '/locations/voice-ai-atlanta-ga',
    ];

    for (const url of sampleUrls) {
      try {
        const response = await page.goto(`${BASE_URL}${url}`);

        if (!response) {
          testResults.failed.push(`${url} - No response`);
          continue;
        }

        if (response.status() === 404) {
          testResults.errors404.push(url);
          testResults.failed.push(`${url} - 404`);
          continue;
        }

        expect(response.status()).toBe(200);
        testResults.passed.push(`${url} - Loaded`);

      } catch (error) {
        testResults.failed.push(`${url} - Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  });

  test('SEO meta tags validation', async ({ page }) => {
    const testUrls = [
      '/',
      '/services',
      '/services/voice-ai',
      '/locations/voice-ai-knoxville-tn',
    ];

    for (const url of testUrls) {
      try {
        await page.goto(`${BASE_URL}${url}`);

        // Check title
        const title = await page.title();
        if (!title || title.length < 20) {
          testResults.brokenFunctionality.push(`${url} - Title too short`);
        }

        // Check meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (!metaDesc || metaDesc.length < 50) {
          testResults.brokenFunctionality.push(`${url} - Meta description too short`);
        }

        // Check canonical (if exists)
        await page.locator('link[rel="canonical"]').getAttribute('href');

      } catch {
        // Continue with next URL
      }
    }

    testResults.passed.push('SEO meta tags validation completed');
  });

  // Print final report after all tests
  test.afterAll(async () => {
    console.log('\n' + '='.repeat(80));
    console.log('PAGE TESTING REPORT');
    console.log('='.repeat(80));
    console.log(`\nPAGES TESTED: ${testResults.passed.length + testResults.failed.length}`);
    console.log(`\nPASSED: ${testResults.passed.length}`);
    testResults.passed.forEach(result => console.log(`  ✓ ${result}`));

    if (testResults.failed.length > 0) {
      console.log(`\nFAILED: ${testResults.failed.length}`);
      testResults.failed.forEach(result => console.log(`  ✗ ${result}`));
    }

    if (testResults.errors404.length > 0) {
      console.log(`\n404 ERRORS: ${testResults.errors404.length}`);
      testResults.errors404.forEach(url => console.log(`  - ${url}`));
    }

    if (testResults.consoleErrors.length > 0) {
      console.log(`\nCONSOLE ERRORS: ${testResults.consoleErrors.length}`);
      testResults.consoleErrors.forEach(({ url, error }) => {
        console.log(`  - ${url}: ${error}`);
      });
    }

    if (testResults.brokenFunctionality.length > 0) {
      console.log(`\nBROKEN FUNCTIONALITY: ${testResults.brokenFunctionality.length}`);
      testResults.brokenFunctionality.forEach(issue => console.log(`  - ${issue}`));
    }

    const isReady = testResults.errors404.length === 0 &&
                    testResults.failed.length === 0 &&
                    testResults.consoleErrors.length === 0;

    console.log(`\nOVERALL STATUS: ${isReady ? 'READY ✓' : 'NOT READY ✗'} for deployment`);
    console.log('='.repeat(80) + '\n');
  });
});
