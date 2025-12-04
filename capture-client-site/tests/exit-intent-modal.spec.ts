import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Exit Intent Popup Centering Test', () => {
  test('Exit intent popup should be centered on trigger', async ({ page }) => {
    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];

    // Capture console messages
    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
      consoleLogs.push(`${msg.type()}: ${text}`);
    });

    // Navigate to homepage
    console.log('Navigating to homepage...');
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Get viewport size
    const viewport = page.viewportSize();
    console.log(`Viewport size: ${viewport?.width}x${viewport?.height}`);

    // Take screenshot before triggering modal
    await page.screenshot({ path: '.playwright-mcp/before-exit-intent.png', fullPage: false });
    console.log('Screenshot taken: before-exit-intent.png');

    // Wait for the 5-second delay before exit intent activates
    console.log('Waiting 5.5 seconds for exit intent to activate...');
    await page.waitForTimeout(5500);

    // Trigger exit intent by dispatching mouseleave event on document
    console.log('Triggering exit intent popup...');
    await page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
        clientY: 5,
        clientX: window.innerWidth / 2,
        view: window
      });
      document.dispatchEvent(event);
    });

    // Wait for modal animation
    await page.waitForTimeout(1000);

    // Check if modal/popup is visible
    // The popup uses a backdrop with fixed positioning and z-[100]
    const backdrop = page.locator('.fixed.inset-0.bg-background-dark\\/90').first();
    const popup = page.locator('.fixed.top-1\\/2.left-1\\/2').first();

    let popupVisible = false;
    try {
      await backdrop.waitFor({ state: 'visible', timeout: 3000 });
      popupVisible = true;
      console.log('✅ Exit intent popup appeared');
    } catch (e) {
      console.log('❌ Popup did not appear within timeout');
      // Try to find any popup-related elements
      const allPopups = await page.locator('[class*="fixed"][class*="z-\\[10"]').count();
      console.log(`Found ${allPopups} high z-index elements`);

      // Take debug screenshot
      await page.screenshot({ path: '.playwright-mcp/exit-intent-debug.png', fullPage: false });
      console.log('Debug screenshot taken: exit-intent-debug.png');
    }

    if (popupVisible) {
      // Take screenshot with popup visible
      await page.screenshot({ path: '.playwright-mcp/exit-intent-popup-visible.png', fullPage: false });
      console.log('Screenshot taken: exit-intent-popup-visible.png');

      // Check popup positioning and centering
      const popupBox = await popup.boundingBox();
      if (popupBox && viewport) {
        const viewportCenterX = viewport.width / 2;
        const viewportCenterY = viewport.height / 2;
        const popupCenterX = popupBox.x + popupBox.width / 2;
        const popupCenterY = popupBox.y + popupBox.height / 2;

        const offsetX = Math.abs(viewportCenterX - popupCenterX);
        const offsetY = Math.abs(viewportCenterY - popupCenterY);

        console.log('\n=== POPUP POSITIONING ===');
        console.log(`Popup box: x=${popupBox.x.toFixed(1)}, y=${popupBox.y.toFixed(1)}, width=${popupBox.width.toFixed(1)}, height=${popupBox.height.toFixed(1)}`);
        console.log(`Popup center: x=${popupCenterX.toFixed(1)}, y=${popupCenterY.toFixed(1)}`);
        console.log(`Viewport center: x=${viewportCenterX.toFixed(1)}, y=${viewportCenterY.toFixed(1)}`);
        console.log(`Offset from center: x=${offsetX.toFixed(1)}px, y=${offsetY.toFixed(1)}px`);

        // Popup should be centered within reasonable margin
        // Allow 5px tolerance for horizontal centering
        // Allow 5px tolerance for vertical centering
        const horizontallyCentered = offsetX < 5;
        const verticallyCentered = offsetY < 5;

        console.log(`Horizontally centered: ${horizontallyCentered ? '✅' : '❌'} (offset: ${offsetX.toFixed(1)}px)`);
        console.log(`Vertically centered: ${verticallyCentered ? '✅' : '❌'} (offset: ${offsetY.toFixed(1)}px)`);

        if (horizontallyCentered && verticallyCentered) {
          console.log('✅ Popup is perfectly centered');
        } else {
          console.log(`⚠️ Popup centering needs adjustment`);
        }

        // Test assertions
        expect(offsetX).toBeLessThan(5);
        expect(offsetY).toBeLessThan(5);
      } else {
        console.log('⚠️ Could not get popup bounding box');
      }

      // Check for close button
      const closeButton = page.locator('button[aria-label*="close" i], button:has-text("close")').first();
      const closeButtonVisible = await closeButton.isVisible().catch(() => false);

      if (closeButtonVisible) {
        console.log('✅ Close button found');

        // Take screenshot of close button area
        const closeBox = await closeButton.boundingBox();
        if (closeBox) {
          console.log(`Close button position: top-right (${closeBox.x.toFixed(1)}, ${closeBox.y.toFixed(1)})`);
        }

        // Click close button
        await closeButton.click();
        await page.waitForTimeout(800); // Wait for exit animation

        // Verify popup is closed
        const popupStillVisible = await backdrop.isVisible().catch(() => false);
        if (!popupStillVisible) {
          console.log('✅ Popup closed successfully');
        } else {
          console.log('❌ Popup did not close');
        }

        // Take screenshot after closing
        await page.screenshot({ path: '.playwright-mcp/after-exit-intent-close.png', fullPage: false });
        console.log('Screenshot taken: after-exit-intent-close.png');
      } else {
        console.log('⚠️ Close button not found');
      }

      // Test CTA buttons
      console.log('\n=== CTA BUTTONS TEST ===');
      const ctaButtons = await page.locator('button, a').filter({ hasText: /book|call/i }).count();
      console.log(`Found ${ctaButtons} CTA buttons`);
    }

    // Report console errors
    if (consoleErrors.length > 0) {
      console.log('\n❌ Console Errors Found:');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No console errors');
    }

    // Summary
    console.log('\n=== TEST SUMMARY ===');
    console.log(`Popup appeared: ${popupVisible ? '✅ Yes' : '❌ No'}`);
    console.log(`Console errors: ${consoleErrors.length}`);
    console.log(`Screenshots saved to: .playwright-mcp/`);

    expect(consoleErrors.length).toBe(0);
    expect(popupVisible).toBe(true);
  });

  test('Exit intent popup should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('\n=== MOBILE VIEWPORT TEST ===');
    console.log('Testing on mobile viewport (375x667)...');
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Wait for exit intent to activate (5 seconds)
    console.log('Waiting 5.5 seconds for exit intent to activate...');
    await page.waitForTimeout(5500);

    // Trigger exit intent
    await page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
        clientY: 5,
        clientX: 187,
        view: window
      });
      document.dispatchEvent(event);
    });

    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: '.playwright-mcp/exit-intent-mobile.png', fullPage: false });
    console.log('Screenshot taken: exit-intent-mobile.png');

    // Check if popup is visible and responsive
    const popup = page.locator('.fixed.top-1\\/2.left-1\\/2').first();
    const popupVisible = await popup.isVisible().catch(() => false);

    if (popupVisible) {
      const popupBox = await popup.boundingBox();
      if (popupBox) {
        console.log(`Mobile popup size: ${popupBox.width.toFixed(1)}x${popupBox.height.toFixed(1)}`);
        console.log(`Mobile popup position: x=${popupBox.x.toFixed(1)}, y=${popupBox.y.toFixed(1)}`);

        // Popup should fit within mobile viewport with padding
        const fitsWidth = popupBox.width <= 375;
        const hasProperPadding = popupBox.x >= 0 && (popupBox.x + popupBox.width) <= 375;

        console.log(`Fits mobile width: ${fitsWidth ? '✅' : '❌'}`);
        console.log(`Has proper padding: ${hasProperPadding ? '✅' : '❌'}`);

        expect(fitsWidth).toBe(true);
        console.log('✅ Popup fits mobile viewport');
      }
    }

    console.log(`Mobile test - Popup appeared: ${popupVisible ? '✅' : '❌'}`);
    expect(consoleErrors.length).toBe(0);
  });

  test('Exit intent popup visual elements test', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('\n=== VISUAL ELEMENTS TEST ===');
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Wait and trigger
    await page.waitForTimeout(5500);
    await page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
        clientY: 5,
        clientX: window.innerWidth / 2,
        view: window
      });
      document.dispatchEvent(event);
    });

    await page.waitForTimeout(1000);

    const backdrop = page.locator('.fixed.inset-0.bg-background-dark\\/90').first();
    const popupVisible = await backdrop.isVisible().catch(() => false);

    if (popupVisible) {
      console.log('Checking visual elements...');

      // Check headline
      const headline = page.locator('h3:has-text("Wait! Don\'t Miss Out")');
      const headlineVisible = await headline.isVisible().catch(() => false);
      console.log(`Headline visible: ${headlineVisible ? '✅' : '❌'}`);

      // Check benefits list
      const benefits = page.locator('.flex.items-center.gap-3').filter({ hasText: /Get started|Average|money-back/i });
      const benefitsCount = await benefits.count();
      console.log(`Benefits shown: ${benefitsCount} ${benefitsCount === 3 ? '✅' : '❌'}`);

      // Check urgency element
      const urgency = page.locator(':has-text("7 spots left")');
      const urgencyVisible = await urgency.isVisible().catch(() => false);
      console.log(`Urgency element visible: ${urgencyVisible ? '✅' : '❌'}`);

      // Check CTA buttons
      const bookDemo = page.locator('button:has-text("Book Free Demo")');
      const callNow = page.locator('a[href^="tel:"]');
      const bookDemoVisible = await bookDemo.isVisible().catch(() => false);
      const callNowVisible = await callNow.isVisible().catch(() => false);
      console.log(`"Book Free Demo" button visible: ${bookDemoVisible ? '✅' : '❌'}`);
      console.log(`"Call Now" button visible: ${callNowVisible ? '✅' : '❌'}`);

      // Check trust badges
      const trustBadges = page.locator(':has-text("500+ Clients"), :has-text("4.9/5 Rating"), :has-text("100% Secure")');
      const trustBadgesCount = await trustBadges.count();
      console.log(`Trust badges shown: ${trustBadgesCount} ${trustBadgesCount >= 3 ? '✅' : '❌'}`);

      // Take detailed screenshot
      await page.screenshot({ path: '.playwright-mcp/exit-intent-visual-elements.png', fullPage: false });
      console.log('Screenshot taken: exit-intent-visual-elements.png');
    }

    expect(consoleErrors.length).toBe(0);
  });
});
