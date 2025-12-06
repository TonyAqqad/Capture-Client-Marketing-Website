import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../../.playwright-mcp');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const PAGES_TO_AUDIT = [
  { name: 'Homepage', url: '/', key: 'homepage' },
  { name: 'Services', url: '/services', key: 'services' },
  { name: 'Pricing', url: '/pricing', key: 'pricing' },
  { name: 'Demo', url: '/demo', key: 'demo' },
  { name: 'How It Works', url: '/how-it-works', key: 'howitworks' },
  { name: 'Use Cases', url: '/use-cases', key: 'usecases' },
  { name: 'Contact', url: '/contact', key: 'contact' },
  { name: 'Location Page', url: '/locations/voice-ai-knoxville-tn', key: 'location-knoxville' },
];

test.describe('Desktop Visual Audit - $3M Standards', () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  for (const pageInfo of PAGES_TO_AUDIT) {
    test(`Audit: ${pageInfo.name}`, async ({ page }) => {
      const consoleMessages: string[] = [];
      const consoleErrors: string[] = [];

      // Capture console messages
      page.on('console', msg => {
        const text = `[${msg.type()}] ${msg.text()}`;
        consoleMessages.push(text);
        if (msg.type() === 'error') {
          consoleErrors.push(text);
        }
      });

      // Navigate to page
      console.log(`\n${'='.repeat(80)}`);
      console.log(`AUDITING: ${pageInfo.name} (${pageInfo.url})`);
      console.log('='.repeat(80));

      const response = await page.goto(`${BASE_URL}${pageInfo.url}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      console.log(`✓ Page loaded - Status: ${response?.status()}`);

      // Wait for page to be fully rendered
      await page.waitForTimeout(2000);

      // Capture full page screenshot
      const screenshotPath = path.join(SCREENSHOT_DIR, `audit-${pageInfo.key}-desktop-full.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`✓ Screenshot saved: audit-${pageInfo.key}-desktop-full.png`);

      // Capture hero section separately
      const heroScreenshotPath = path.join(SCREENSHOT_DIR, `audit-${pageInfo.key}-desktop-hero.png`);
      await page.screenshot({
        path: heroScreenshotPath,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      console.log(`✓ Hero screenshot saved: audit-${pageInfo.key}-desktop-hero.png`);

      // Typography Analysis
      console.log('\n--- TYPOGRAPHY ANALYSIS ---');
      const h1Elements = await page.locator('h1').all();
      console.log(`H1 elements: ${h1Elements.length}`);
      for (let i = 0; i < Math.min(h1Elements.length, 3); i++) {
        const text = await h1Elements[i].textContent();
        const styles = await h1Elements[i].evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            fontFamily: computed.fontFamily,
            color: computed.color,
            lineHeight: computed.lineHeight,
          };
        });
        console.log(`  H1 ${i + 1}: "${text?.substring(0, 50)}..."`);
        console.log(`    Font: ${styles.fontFamily}`);
        console.log(`    Size: ${styles.fontSize}, Weight: ${styles.fontWeight}`);
        console.log(`    Color: ${styles.color}`);
      }

      const h2Elements = await page.locator('h2').all();
      console.log(`H2 elements: ${h2Elements.length}`);

      const bodyText = await page.locator('p').first().evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          lineHeight: computed.lineHeight,
        };
      });
      console.log(`Body text: ${bodyText.fontSize}, ${bodyText.fontFamily}`);

      // Color & Brand Analysis
      console.log('\n--- COLOR & BRAND ANALYSIS ---');

      // Check for gold accent usage
      const goldElements = await page.locator('[class*="gold"], [style*="#D4AF37"], [style*="rgb(212, 175, 55)"]').count();
      console.log(`Gold accent elements: ${goldElements}`);

      // Check for purple gradients (AI slop detection)
      const purpleGradients = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        let count = 0;
        elements.forEach(el => {
          const computed = window.getComputedStyle(el);
          const bg = computed.backgroundImage;
          if (bg && (bg.includes('purple') || bg.includes('violet') || bg.includes('139, 92, 246'))) {
            count++;
          }
        });
        return count;
      });
      console.log(`Purple gradient elements (AI slop): ${purpleGradients}`);

      // Check background color
      const bodyBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      console.log(`Body background: ${bodyBg}`);

      // Layout & Spacing Analysis
      console.log('\n--- LAYOUT & SPACING ANALYSIS ---');

      // Check for overlapping elements
      const overlaps = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('section, div[class*="container"]'));
        let overlapCount = 0;

        for (let i = 0; i < elements.length - 1; i++) {
          const rect1 = elements[i].getBoundingClientRect();
          const rect2 = elements[i + 1].getBoundingClientRect();

          if (rect1.bottom > rect2.top && rect1.top < rect2.bottom) {
            overlapCount++;
          }
        }

        return overlapCount;
      });
      console.log(`Potential overlapping sections: ${overlaps}`);

      // Check spacing consistency
      const sectionSpacing = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section'));
        return sections.map(s => {
          const computed = window.getComputedStyle(s);
          return {
            paddingTop: computed.paddingTop,
            paddingBottom: computed.paddingBottom,
            marginTop: computed.marginTop,
            marginBottom: computed.marginBottom,
          };
        });
      });
      console.log(`Section spacing patterns: ${sectionSpacing.length} sections analyzed`);

      // CTA Analysis
      console.log('\n--- CTA ANALYSIS ---');

      const ctaButtons = await page.locator('a:has-text("Get Started"), a:has-text("Start Free"), button:has-text("Get Started")').all();
      console.log(`Primary CTA buttons found: ${ctaButtons.length}`);

      if (ctaButtons.length > 0) {
        const firstCTA = ctaButtons[0];
        const ctaStyles = await firstCTA.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            padding: computed.padding,
            borderRadius: computed.borderRadius,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
          };
        });
        console.log('Primary CTA styles:', ctaStyles);
      }

      // Visual Polish Checks
      console.log('\n--- VISUAL POLISH CHECKS ---');

      // Check for broken images
      const brokenImages = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images.filter(img => !img.complete || img.naturalWidth === 0).length;
      });
      console.log(`Broken images: ${brokenImages}`);

      // Check for animations
      const animatedElements = await page.locator('[class*="animate"], [class*="transition"]').count();
      console.log(`Elements with animations/transitions: ${animatedElements}`);

      // Console Errors
      console.log('\n--- CONSOLE OUTPUT ---');
      if (consoleErrors.length > 0) {
        console.log('⚠️ Console Errors Found:');
        consoleErrors.forEach(err => console.log(`  ${err}`));
      } else {
        console.log('✓ No console errors');
      }

      // Accessibility Quick Check
      console.log('\n--- ACCESSIBILITY QUICK CHECK ---');
      const missingAltImages = await page.locator('img:not([alt])').count();
      console.log(`Images missing alt text: ${missingAltImages}`);

      const headingStructure = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return headings.map(h => ({ tag: h.tagName, text: h.textContent?.substring(0, 50) }));
      });
      console.log(`Heading structure: ${headingStructure.length} headings`);

      console.log('\n' + '='.repeat(80) + '\n');

      // Basic assertions
      expect(response?.status()).toBe(200);
      expect(consoleErrors.length).toBe(0);
      expect(brokenImages).toBe(0);
    });
  }

  // Summary test
  test('Generate Audit Summary', async () => {
    console.log('\n' + '='.repeat(80));
    console.log('DESKTOP VISUAL AUDIT COMPLETE');
    console.log('='.repeat(80));
    console.log('\nScreenshots saved to: .playwright-mcp/');
    console.log('\nReview screenshots for:');
    console.log('  1. Typography distinctiveness');
    console.log('  2. Gold (#D4AF37) accent consistency');
    console.log('  3. Layout balance and spacing');
    console.log('  4. Visual polish and animations');
    console.log('  5. CTA prominence and hierarchy');
    console.log('\n' + '='.repeat(80) + '\n');
  });
});
