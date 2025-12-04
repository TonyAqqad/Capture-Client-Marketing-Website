import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Exit Intent Popup Centering Verification', () => {

  test('Desktop: Exit intent popup is centered', async ({ page }) => {
    console.log('🖥️  Testing Desktop viewport (1920x1080)...');

    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Navigate to homepage
    await page.goto(BASE_URL);
    console.log('✅ Page loaded');

    // Wait for exit intent to become active (5+ seconds)
    console.log('⏳ Waiting 6 seconds for exit intent to activate...');
    await page.waitForTimeout(6000);

    // Trigger exit intent by simulating mouseleave event at top of viewport
    console.log('🖱️  Triggering exit intent (mouseleave at top)...');

    // Move mouse into the document first
    await page.mouse.move(960, 540);
    await page.waitForTimeout(100);

    // Then trigger mouseleave by moving to top edge
    await page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        clientY: 5,
        clientX: 960,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    });

    // Wait for popup animation
    await page.waitForTimeout(1000);

    // Find the backdrop (which has flex centering)
    const backdrop = page.locator('div.fixed.inset-0.flex.items-center.justify-center').first();
    await expect(backdrop).toBeVisible({ timeout: 5000 });
    console.log('✅ Exit intent backdrop is visible');

    // Find the popup content
    const popup = page.locator('div.fixed.inset-0.flex.items-center.justify-center > div').first();
    await expect(popup).toBeVisible({ timeout: 2000 });
    console.log('✅ Popup content is visible');

    // Take screenshot
    const screenshotPath = 'C:\\Users\\eaqqa\\capture-client-website-seo\\.playwright-mcp\\exit-intent-desktop-centered.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    // Measure centering
    const boundingBox = await popup.boundingBox();
    if (!boundingBox) {
      throw new Error('Could not get popup bounding box');
    }

    const viewportSize = page.viewportSize();
    if (!viewportSize) {
      throw new Error('Could not get viewport size');
    }

    const popupCenterX = boundingBox.x + (boundingBox.width / 2);
    const popupCenterY = boundingBox.y + (boundingBox.height / 2);
    const viewportCenterX = viewportSize.width / 2;
    const viewportCenterY = viewportSize.height / 2;

    const horizontalOffset = Math.abs(popupCenterX - viewportCenterX);
    const verticalOffset = Math.abs(popupCenterY - viewportCenterY);

    console.log('\n📐 CENTERING MEASUREMENTS (Desktop):');
    console.log(`Viewport: ${viewportSize.width}x${viewportSize.height}`);
    console.log(`Popup position: x=${boundingBox.x.toFixed(2)}, y=${boundingBox.y.toFixed(2)}`);
    console.log(`Popup size: ${boundingBox.width.toFixed(2)}x${boundingBox.height.toFixed(2)}`);
    console.log(`Popup center: (${popupCenterX.toFixed(2)}, ${popupCenterY.toFixed(2)})`);
    console.log(`Viewport center: (${viewportCenterX}, ${viewportCenterY})`);
    console.log(`Horizontal offset from center: ${horizontalOffset.toFixed(2)}px`);
    console.log(`Vertical offset from center: ${verticalOffset.toFixed(2)}px`);

    // Check if centered (offset should be < 20px)
    const isCentered = horizontalOffset < 20 && verticalOffset < 20;
    console.log(`\n${isCentered ? '✅ PASS' : '❌ FAIL'}: Popup is ${isCentered ? '' : 'NOT '}centered`);

    // Check for console errors
    if (consoleErrors.length > 0) {
      console.log('\n⚠️  Console Errors:');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No console errors');
    }

    // Verify the popup uses flex centering
    const backdropClasses = await backdrop.getAttribute('class');
    console.log(`\n🎨 Backdrop classes: ${backdropClasses}`);
    const hasFlexCenter = backdropClasses?.includes('flex') &&
                         backdropClasses?.includes('items-center') &&
                         backdropClasses?.includes('justify-center');
    console.log(`${hasFlexCenter ? '✅' : '❌'} Flex centering classes present`);

    // Assertions
    expect(horizontalOffset).toBeLessThan(20);
    expect(verticalOffset).toBeLessThan(20);
  });

  test('Mobile: Exit intent popup is centered', async ({ page }) => {
    console.log('\n📱 Testing Mobile viewport (375x667)...');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Navigate to homepage
    await page.goto(BASE_URL);
    console.log('✅ Page loaded');

    // Wait for exit intent to become active
    console.log('⏳ Waiting 6 seconds for exit intent to activate...');
    await page.waitForTimeout(6000);

    // Trigger exit intent
    console.log('🖱️  Triggering exit intent (mouseleave at top)...');

    await page.mouse.move(187, 333);
    await page.waitForTimeout(100);

    await page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        clientY: 5,
        clientX: 187,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    });

    await page.waitForTimeout(1000);

    // Find the backdrop
    const backdrop = page.locator('div.fixed.inset-0.flex.items-center.justify-center').first();
    await expect(backdrop).toBeVisible({ timeout: 5000 });
    console.log('✅ Exit intent backdrop is visible');

    // Find the popup content
    const popup = page.locator('div.fixed.inset-0.flex.items-center.justify-center > div').first();
    await expect(popup).toBeVisible({ timeout: 2000 });
    console.log('✅ Popup content is visible');

    // Take screenshot
    const screenshotPath = 'C:\\Users\\eaqqa\\capture-client-website-seo\\.playwright-mcp\\exit-intent-mobile-centered.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    // Measure centering
    const boundingBox = await popup.boundingBox();
    if (!boundingBox) {
      throw new Error('Could not get popup bounding box');
    }

    const viewportSize = page.viewportSize();
    if (!viewportSize) {
      throw new Error('Could not get viewport size');
    }

    const popupCenterX = boundingBox.x + (boundingBox.width / 2);
    const popupCenterY = boundingBox.y + (boundingBox.height / 2);
    const viewportCenterX = viewportSize.width / 2;
    const viewportCenterY = viewportSize.height / 2;

    const horizontalOffset = Math.abs(popupCenterX - viewportCenterX);
    const verticalOffset = Math.abs(popupCenterY - viewportCenterY);

    console.log('\n📐 CENTERING MEASUREMENTS (Mobile):');
    console.log(`Viewport: ${viewportSize.width}x${viewportSize.height}`);
    console.log(`Popup position: x=${boundingBox.x.toFixed(2)}, y=${boundingBox.y.toFixed(2)}`);
    console.log(`Popup size: ${boundingBox.width.toFixed(2)}x${boundingBox.height.toFixed(2)}`);
    console.log(`Popup center: (${popupCenterX.toFixed(2)}, ${popupCenterY.toFixed(2)})`);
    console.log(`Viewport center: (${viewportCenterX}, ${viewportCenterY})`);
    console.log(`Horizontal offset from center: ${horizontalOffset.toFixed(2)}px`);
    console.log(`Vertical offset from center: ${verticalOffset.toFixed(2)}px`);

    // Check if centered (offset should be < 20px)
    const isCentered = horizontalOffset < 20 && verticalOffset < 20;
    console.log(`\n${isCentered ? '✅ PASS' : '❌ FAIL'}: Popup is ${isCentered ? '' : 'NOT '}centered`);

    // Check for console errors
    if (consoleErrors.length > 0) {
      console.log('\n⚠️  Console Errors:');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No console errors');
    }

    // Verify the popup uses flex centering
    const backdropClasses = await backdrop.getAttribute('class');
    console.log(`\n🎨 Backdrop classes: ${backdropClasses}`);
    const hasFlexCenter = backdropClasses?.includes('flex') &&
                         backdropClasses?.includes('items-center') &&
                         backdropClasses?.includes('justify-center');
    console.log(`${hasFlexCenter ? '✅' : '❌'} Flex centering classes present`);

    // Assertions
    expect(horizontalOffset).toBeLessThan(20);
    expect(verticalOffset).toBeLessThan(20);
  });
});
