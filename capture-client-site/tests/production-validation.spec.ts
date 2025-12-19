import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';

const BASE_URL = 'http://localhost:3000';

interface TestResult {
  url: string;
  status: 'PASS' | 'FAIL';
  statusCode?: number;
  issues: string[];
  consoleErrors: string[];
  hasMainContent: boolean;
  hasCTA: boolean;
  hasForm?: boolean;
  brokenImages: number;
}

const testResults: TestResult[] = [];
const globalConsoleErrors: string[] = [];

// Test configuration
const PAGES_TO_TEST = [
  // Core pages
  { url: '/', name: 'Homepage', requiresForm: true },
  { url: '/demo', name: 'Demo booking', requiresForm: true },
  { url: '/pricing', name: 'Pricing', requiresForm: false },
  { url: '/contact', name: 'Contact', requiresForm: true },
  { url: '/features', name: 'Features', requiresForm: false },
  { url: '/how-it-works', name: 'How it works', requiresForm: false },
  { url: '/services', name: 'Services listing', requiresForm: false },
  { url: '/about', name: 'About', requiresForm: false },

  // Who We Serve pages
  { url: '/who-we-serve/legal-law-firms', name: 'Legal/Law Firms', requiresForm: true },
  { url: '/who-we-serve/home-services', name: 'Home Services', requiresForm: true },
  { url: '/who-we-serve/healthcare', name: 'Healthcare', requiresForm: true },
  { url: '/who-we-serve/real-estate', name: 'Real Estate', requiresForm: true },

  // Pricing detail pages
  { url: '/pricing/starter-package', name: 'Starter Package', requiresForm: true },
  { url: '/pricing/growth-package', name: 'Growth Package', requiresForm: true },
  { url: '/pricing/enterprise-package', name: 'Enterprise Package', requiresForm: true },

  // Integration pages
  { url: '/integrations', name: 'Integrations listing', requiresForm: false },
  { url: '/integrations/hubspot', name: 'HubSpot Integration', requiresForm: true },
  { url: '/integrations/salesforce', name: 'Salesforce Integration', requiresForm: true },

  // Service detail pages
  { url: '/services/voice-ai', name: 'Voice AI Service', requiresForm: true },
  { url: '/services/google-ads', name: 'Google Ads Service', requiresForm: true },
];

test.describe('Production Validation Tests', () => {

  test('Test all critical pages for production readiness', async ({ page }) => {
    console.log(`\n🧪 PRODUCTION VALIDATION TEST STARTED`);
    console.log(`Testing ${PAGES_TO_TEST.length} critical pages...\n`);

    for (const pageConfig of PAGES_TO_TEST) {
      const result: TestResult = {
        url: pageConfig.url,
        status: 'PASS',
        issues: [],
        consoleErrors: [],
        hasMainContent: false,
        hasCTA: false,
        brokenImages: 0,
      };

      console.log(`📄 Testing: ${pageConfig.name} (${pageConfig.url})`);

      // Capture console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const errorText = msg.text();
          result.consoleErrors.push(errorText);
          if (!globalConsoleErrors.includes(errorText)) {
            globalConsoleErrors.push(errorText);
          }
        }
      });

      try {
        // Navigate to page
        const response = await page.goto(`${BASE_URL}${pageConfig.url}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });

        result.statusCode = response?.status();

        // Check HTTP status
        if (response?.status() === 404) {
          result.status = 'FAIL';
          result.issues.push('404 NOT FOUND');
          console.log(`   ❌ 404 NOT FOUND`);
          testResults.push(result);
          continue;
        }

        if (response?.status() && response.status() >= 500) {
          result.status = 'FAIL';
          result.issues.push(`SERVER ERROR ${response.status()}`);
          console.log(`   ❌ SERVER ERROR ${response.status()}`);
          testResults.push(result);
          continue;
        }

        // Check for main content (h1 or main element)
        const h1Count = await page.locator('h1').count();
        const mainCount = await page.locator('main').count();
        result.hasMainContent = h1Count > 0 || mainCount > 0;

        if (!result.hasMainContent) {
          result.status = 'FAIL';
          result.issues.push('NO MAIN CONTENT (missing h1 or main element)');
        }

        // Check for CTA buttons
        const ctaButtons = page.locator('a:has-text("Book a Demo"), a:has-text("Get Started"), a:has-text("Schedule Demo"), a:has-text("Contact"), button:has-text("Book"), button:has-text("Get Started")');
        const ctaCount = await ctaButtons.count();
        result.hasCTA = ctaCount > 0;

        if (!result.hasCTA) {
          result.status = 'FAIL';
          result.issues.push('NO CTA BUTTONS FOUND');
        }

        // Check for forms if required
        if (pageConfig.requiresForm) {
          const formCount = await page.locator('form').count();
          result.hasForm = formCount > 0;

          if (!result.hasForm) {
            result.status = 'FAIL';
            result.issues.push('MISSING LEAD FORM (required on this page)');
          }
        }

        // Check for broken images
        const brokenImages = await page.$$eval('img', imgs =>
          imgs.filter(img => !img.complete || img.naturalWidth === 0).length
        );
        result.brokenImages = brokenImages;

        if (brokenImages > 0) {
          result.status = 'FAIL';
          result.issues.push(`${brokenImages} BROKEN IMAGE(S)`);
        }

        // Check for console errors
        if (result.consoleErrors.length > 0) {
          result.status = 'FAIL';
          result.issues.push(`${result.consoleErrors.length} CONSOLE ERROR(S)`);
        }

        // Log result
        if (result.status === 'PASS') {
          console.log(`   ✅ PASS`);
        } else {
          console.log(`   ❌ FAIL: ${result.issues.join(', ')}`);
        }

      } catch (error) {
        result.status = 'FAIL';
        result.issues.push(`EXCEPTION: ${error.message}`);
        console.log(`   ❌ EXCEPTION: ${error.message}`);
      }

      testResults.push(result);
    }

    console.log(`\n✅ Testing complete!`);
  });

  test('Test CTA button navigation', async ({ page }) => {
    console.log(`\n🔗 Testing CTA button navigation...`);

    await page.goto(BASE_URL);

    // Test "Book a Demo" button
    const bookDemoBtn = page.locator('a:has-text("Book a Demo"), a:has-text("Schedule Demo")').first();
    if (await bookDemoBtn.count() > 0) {
      const href = await bookDemoBtn.getAttribute('href');
      console.log(`   Book Demo button href: ${href}`);

      if (href && (href.includes('/demo') || href.includes('/contact'))) {
        console.log(`   ✅ Book Demo button has correct href`);
      } else {
        console.log(`   ⚠️ Book Demo button href may be incorrect`);
      }
    } else {
      console.log(`   ⚠️ No "Book a Demo" button found on homepage`);
    }

    // Test "Get Started" button
    const getStartedBtn = page.locator('a:has-text("Get Started")').first();
    if (await getStartedBtn.count() > 0) {
      const href = await getStartedBtn.getAttribute('href');
      console.log(`   Get Started button href: ${href}`);

      if (href && (href.includes('/pricing') || href.includes('/demo') || href.includes('/contact'))) {
        console.log(`   ✅ Get Started button has correct href`);
      } else {
        console.log(`   ⚠️ Get Started button href may be incorrect`);
      }
    }
  });

  test('Test mobile viewport (375px)', async ({ page }) => {
    console.log(`\n📱 Testing mobile viewport (375px)...`);

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Check if mobile menu exists
    const mobileMenuBtn = page.locator('[aria-label*="menu" i], button:has(svg)').first();
    const hasMobileMenu = await mobileMenuBtn.count() > 0;

    if (hasMobileMenu) {
      console.log(`   ✅ Mobile menu button found`);
    } else {
      console.log(`   ⚠️ Mobile menu button not found`);
    }

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    if (bodyWidth <= viewportWidth + 10) {
      console.log(`   ✅ No horizontal scroll (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`);
    } else {
      console.log(`   ❌ Horizontal scroll detected (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`);
    }

    // Check if hero is visible
    const heroVisible = await page.locator('h1').first().isVisible();
    if (heroVisible) {
      console.log(`   ✅ Hero headline visible on mobile`);
    } else {
      console.log(`   ❌ Hero headline not visible on mobile`);
    }
  });

  test.afterAll(async () => {
    // Generate final report
    const passed = testResults.filter(r => r.status === 'PASS').length;
    const failed = testResults.filter(r => r.status === 'FAIL').length;
    const failures = testResults.filter(r => r.status === 'FAIL');

    const report = {
      pages_tested: testResults.length,
      pages_passed: passed,
      pages_failed: failed,
      pass_rate: `${((passed / testResults.length) * 100).toFixed(1)}%`,
      failures: failures.map(f => ({
        url: f.url,
        status_code: f.statusCode,
        issues: f.issues,
        console_errors: f.consoleErrors.length,
        broken_images: f.brokenImages,
      })),
      all_console_errors: globalConsoleErrors,
      summary: {
        total_console_errors: globalConsoleErrors.length,
        total_broken_images: testResults.reduce((sum, r) => sum + r.brokenImages, 0),
        pages_missing_forms: testResults.filter(r => r.hasForm === false).length,
        pages_missing_ctas: testResults.filter(r => !r.hasCTA).length,
      },
      recommendations: [],
    };

    // Add recommendations based on findings
    if (failed > 0) {
      report.recommendations.push(`Fix ${failed} failing page(s) before production deployment`);
    }
    if (globalConsoleErrors.length > 0) {
      report.recommendations.push(`Resolve ${globalConsoleErrors.length} console error(s)`);
    }
    if (report.summary.total_broken_images > 0) {
      report.recommendations.push(`Fix ${report.summary.total_broken_images} broken image(s)`);
    }
    if (report.summary.pages_missing_ctas > 0) {
      report.recommendations.push(`Add CTA buttons to ${report.summary.pages_missing_ctas} page(s)`);
    }
    if (passed === testResults.length) {
      report.recommendations.push('✅ ALL TESTS PASSED - READY FOR PRODUCTION DEPLOYMENT');
    }

    console.log(`\n` + '='.repeat(80));
    console.log(`📊 PRODUCTION VALIDATION REPORT`);
    console.log('='.repeat(80));
    console.log(JSON.stringify(report, null, 2));
    console.log('='.repeat(80));

    // Also save report to file
    writeFileSync(
      'production-validation-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log(`\n💾 Report saved to: production-validation-report.json\n`);
  });
});
