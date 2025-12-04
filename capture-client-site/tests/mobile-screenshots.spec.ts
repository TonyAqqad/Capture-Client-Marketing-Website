import { test, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

const mobileViewport = {
  width: 375,
  height: 667,
};

test.describe('Mobile Screenshots', () => {
  test.use({
    viewport: mobileViewport,
    userAgent: devices['iPhone SE'].userAgent,
  });

  test('Capture mobile screenshots', async ({ page }) => {
    // Homepage
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/mobile-homepage.png', fullPage: true });
    console.log('✅ Homepage screenshot saved');

    // Homepage with menu open
    const menuButton = page.locator('button[aria-label*="menu" i]').first();
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'tests/screenshots/mobile-menu-open.png', fullPage: false });
      console.log('✅ Mobile menu screenshot saved');
      await menuButton.click(); // Close menu
    }

    // Contact page
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/mobile-contact.png', fullPage: true });
    console.log('✅ Contact page screenshot saved');

    // Services page
    await page.goto(`${BASE_URL}/services`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/mobile-services.png', fullPage: true });
    console.log('✅ Services page screenshot saved');

    // Location page
    await page.goto(`${BASE_URL}/locations/voice-ai-knoxville-tn`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/mobile-location.png', fullPage: true });
    console.log('✅ Location page screenshot saved');

    // Scroll to show sticky CTA bar
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/mobile-sticky-cta.png', fullPage: false });
    console.log('✅ Sticky CTA bar screenshot saved');
  });
});
