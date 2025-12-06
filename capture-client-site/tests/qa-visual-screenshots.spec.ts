import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * QA Visual Testing Suite
 * Takes screenshots of key pages on desktop and mobile viewports
 * Checks for console errors
 */

test.describe('QA Visual Testing - Homepage & Key Pages', () => {
  // Screenshot directory
  const screenshotDir = path.join(__dirname, '../.playwright-mcp');

  test.beforeAll(() => {
    // Ensure screenshot directory exists
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  // Track console errors
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    // Listen for console errors
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (error) => {
      consoleErrors.push(`Page Error: ${error.message}`);
    });
  });

  test('STEP 1-2: Desktop Homepage Screenshots', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // Navigate to homepage
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for hero to be visible
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Allow animations to settle

    // 1. Homepage Hero (desktop viewport)
    await page.screenshot({
      path: path.join(screenshotDir, 'qa-homepage-hero.png'),
      fullPage: false,
    });
    console.log('✓ Screenshot saved: qa-homepage-hero.png');

    // 2. Homepage Full Page
    await page.screenshot({
      path: path.join(screenshotDir, 'qa-homepage-full.png'),
      fullPage: true,
    });
    console.log('✓ Screenshot saved: qa-homepage-full.png');
  });

  test('STEP 3: Mobile Homepage Screenshots', async ({ page }) => {
    // Resize to Mobile (iPhone size)
    await page.setViewportSize({ width: 375, height: 812 });

    // Navigate to homepage
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Allow animations to settle

    // 3. Mobile Homepage Hero
    await page.screenshot({
      path: path.join(screenshotDir, 'qa-mobile-hero.png'),
      fullPage: false,
    });
    console.log('✓ Screenshot saved: qa-mobile-hero.png');

    // 4. Mobile Full Page
    await page.screenshot({
      path: path.join(screenshotDir, 'qa-mobile-full.png'),
      fullPage: true,
    });
    console.log('✓ Screenshot saved: qa-mobile-full.png');
  });

  test('STEP 4: Key Pages - Services', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('http://localhost:3000/services', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(screenshotDir, 'qa-services.png'),
      fullPage: true,
    });
    console.log('✓ Screenshot saved: qa-services.png');
  });

  test('STEP 4: Key Pages - Pricing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('http://localhost:3000/pricing', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(screenshotDir, 'qa-pricing.png'),
      fullPage: true,
    });
    console.log('✓ Screenshot saved: qa-pricing.png');
  });

  test('STEP 4: Key Pages - Contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('http://localhost:3000/contact', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(screenshotDir, 'qa-contact.png'),
      fullPage: true,
    });
    console.log('✓ Screenshot saved: qa-contact.png');
  });

  test('STEP 4: Key Pages - Demo', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('http://localhost:3000/demo', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(screenshotDir, 'qa-demo.png'),
      fullPage: true,
    });
    console.log('✓ Screenshot saved: qa-demo.png');
  });

  test.afterEach(async () => {
    // Report console errors for this test
    if (consoleErrors.length > 0) {
      console.log('\n⚠️  Console Errors Detected:');
      consoleErrors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
  });

  test.afterAll(async () => {
    console.log('\n' + '='.repeat(80));
    console.log('QA VISUAL TESTING COMPLETE');
    console.log('='.repeat(80));
    console.log('\nScreenshots saved to: .playwright-mcp/');
    console.log('\nScreenshots taken:');
    console.log('  1. qa-homepage-hero.png (Desktop)');
    console.log('  2. qa-homepage-full.png (Desktop, full page)');
    console.log('  3. qa-mobile-hero.png (Mobile 375x812)');
    console.log('  4. qa-mobile-full.png (Mobile, full page)');
    console.log('  5. qa-services.png (Desktop, full page)');
    console.log('  6. qa-pricing.png (Desktop, full page)');
    console.log('  7. qa-contact.png (Desktop, full page)');
    console.log('  8. qa-demo.png (Desktop, full page)');
    console.log('='.repeat(80));
  });
});
