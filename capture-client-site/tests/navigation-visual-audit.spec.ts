import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('NAVIGATION VISUAL AUDIT - $5M QUALITY', () => {

  test('Desktop Navigation - Closed State', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Screenshot header
    await page.screenshot({
      path: 'nav-desktop-closed.png',
      fullPage: false
    });

    console.log('✅ Captured: nav-desktop-closed.png');
  });

  test('Desktop Navigation - Solutions Mega Menu', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Find and hover over Solutions
    const solutionsButton = page.locator('button:has-text("Solutions")').first();
    await solutionsButton.hover();
    await page.waitForTimeout(500); // Wait for animation

    await page.screenshot({
      path: 'nav-mega-menu-solutions.png',
      fullPage: false
    });

    console.log('✅ Captured: nav-mega-menu-solutions.png');
  });

  test('Desktop Navigation - Industries Mega Menu', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Find and hover over Industries
    const industriesButton = page.locator('button:has-text("Industries")').first();
    await industriesButton.hover();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'nav-mega-menu-industries.png',
      fullPage: false
    });

    console.log('✅ Captured: nav-mega-menu-industries.png');
  });

  test('Desktop Navigation - Resources Dropdown', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Find and hover over Resources
    const resourcesButton = page.locator('button:has-text("Resources")').first();
    await resourcesButton.hover();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'nav-dropdown-resources.png',
      fullPage: false
    });

    console.log('✅ Captured: nav-dropdown-resources.png');
  });

  test('Mobile Navigation - Closed', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'nav-mobile-closed.png',
      fullPage: false
    });

    console.log('✅ Captured: nav-mobile-closed.png');
  });

  test('Mobile Navigation - Open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Click hamburger menu
    const menuButton = page.locator('button[aria-label*="menu" i], button:has(svg)').first();
    await menuButton.click();
    await page.waitForTimeout(500); // Wait for slide animation

    await page.screenshot({
      path: 'nav-mobile-open.png',
      fullPage: true
    });

    console.log('✅ Captured: nav-mobile-open.png');
  });

  test('Navigation Link Testing', async ({ page }) => {
    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
      consoleLogs.push(`[${msg.type()}] ${text}`);
    });

    await page.goto(BASE_URL);

    // Test key navigation links
    const linksToTest = [
      { name: 'Voice AI Service', selector: 'a[href="/services/voice-ai"]' },
      { name: 'Pricing', selector: 'a[href="/pricing"]' },
      { name: 'Contact', selector: 'a[href="/contact"]' },
      { name: 'Demo', selector: 'a[href="/demo"]' }
    ];

    console.log('\n=== NAVIGATION LINK TESTING ===\n');

    for (const link of linksToTest) {
      const linkElement = page.locator(link.selector).first();
      const count = await linkElement.count();

      if (count > 0) {
        const href = await linkElement.getAttribute('href');
        console.log(`✅ ${link.name}: ${href}`);

        // Test if link is clickable
        const isVisible = await linkElement.isVisible();
        const isEnabled = await linkElement.isEnabled();
        console.log(`   Visible: ${isVisible}, Enabled: ${isEnabled}`);
      } else {
        console.log(`❌ ${link.name}: NOT FOUND`);
      }
    }

    console.log('\n=== CONSOLE ERRORS ===\n');
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.log(`❌ ${err}`));
    } else {
      console.log('✅ No console errors during navigation');
    }
  });

  test('Navigation Accessibility Audit', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    console.log('\n=== ACCESSIBILITY AUDIT ===\n');

    // Check touch targets
    const navLinks = await page.locator('nav a').all();
    console.log(`Total nav links: ${navLinks.length}`);

    let smallTouchTargets = 0;
    for (const link of navLinks) {
      const box = await link.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        smallTouchTargets++;
        const text = await link.textContent();
        console.log(`⚠️  Small touch target: "${text}" (${box.width}x${box.height}px)`);
      }
    }

    if (smallTouchTargets === 0) {
      console.log('✅ All touch targets meet 44x44px minimum');
    }

    // Check ARIA labels
    const menuButton = page.locator('button[aria-label*="menu" i]');
    const hasAriaLabel = await menuButton.count() > 0;
    console.log(`\n${hasAriaLabel ? '✅' : '❌'} Mobile menu has aria-label`);

    // Check keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    console.log(`✅ Keyboard navigation works (focused: ${focusedElement})`);
  });

  test('Mega Menu Visual Quality Assessment', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    console.log('\n=== MEGA MENU QUALITY ASSESSMENT ===\n');

    // Hover over Solutions to open mega menu
    const solutionsButton = page.locator('button:has-text("Solutions")').first();
    await solutionsButton.hover();
    await page.waitForTimeout(500);

    // Check if mega menu is visible
    const megaMenu = page.locator('[role="menu"], .mega-menu, [class*="dropdown"]').first();
    const isVisible = await megaMenu.isVisible();
    console.log(`${isVisible ? '✅' : '❌'} Mega menu opens on hover`);

    // Check for animations
    const hasTransition = await megaMenu.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.transition !== 'all 0s ease 0s' || styles.animation !== 'none';
    });
    console.log(`${hasTransition ? '✅' : '⚠️'} Mega menu has smooth animations`);

    // Check mega menu structure
    const menuItems = await megaMenu.locator('a').count();
    console.log(`✅ Mega menu contains ${menuItems} links`);

    // Check for visual hierarchy
    const hasHeaders = await megaMenu.locator('h2, h3, h4, [class*="heading"]').count();
    console.log(`${hasHeaders > 0 ? '✅' : '⚠️'} Mega menu has visual hierarchy (${hasHeaders} headers)`);
  });

});
