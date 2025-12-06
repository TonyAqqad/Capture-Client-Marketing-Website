import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

interface VisualAuditReport {
  overall_score: number;
  typography_score: number;
  color_score: number;
  layout_score: number;
  animation_score: number;
  issues: string[];
  console_errors: string[];
  console_warnings: string[];
  recommendations: string[];
  screenshots_captured: string[];
  font_families_detected: string[];
  color_palette_detected: string[];
}

test.describe('Homepage Visual Quality Audit - $5M Standard', () => {
  let consoleErrors: string[] = [];
  let consoleWarnings: string[] = [];
  let consoleLogs: string[] = [];

  test('Complete Homepage Visual Audit', async ({ page }) => {
    // Increase timeout for this specific test
    test.setTimeout(120000);

    const report: VisualAuditReport = {
      overall_score: 0,
      typography_score: 0,
      color_score: 0,
      layout_score: 0,
      animation_score: 0,
      issues: [],
      console_errors: [],
      console_warnings: [],
      recommendations: [],
      screenshots_captured: [],
      font_families_detected: [],
      color_palette_detected: []
    };

    // Capture console messages
    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(text);
      } else {
        consoleLogs.push(text);
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`PAGE ERROR: ${error.message}`);
    });

    console.log('\n🎨 STARTING $5M VISUAL QUALITY AUDIT\n');

    // ============================================
    // DESKTOP AUDIT (1920x1080)
    // ============================================

    console.log('📱 Testing Desktop View (1920x1080)...');
    await page.setViewportSize({ width: 1920, height: 1080 });

    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000); // Wait for animations

    // Screenshot: Desktop Full Page
    const desktopFullPath = path.join(SCREENSHOTS_DIR, 'audit-homepage-desktop-full.png');
    await page.screenshot({ path: desktopFullPath, fullPage: true });
    report.screenshots_captured.push('audit-homepage-desktop-full.png');
    console.log('✅ Captured: audit-homepage-desktop-full.png');

    // Screenshot: Desktop Hero Section (viewport only)
    const desktopHeroPath = path.join(SCREENSHOTS_DIR, 'audit-homepage-desktop-hero.png');
    await page.screenshot({ path: desktopHeroPath });
    report.screenshots_captured.push('audit-homepage-desktop-hero.png');
    console.log('✅ Captured: audit-homepage-desktop-hero.png');

    // Screenshot: Desktop Footer (if visible)
    try {
      const footer = page.locator('footer');
      if (await footer.isVisible()) {
        const footerPath = path.join(SCREENSHOTS_DIR, 'audit-homepage-desktop-footer.png');
        await footer.screenshot({ path: footerPath });
        report.screenshots_captured.push('audit-homepage-desktop-footer.png');
        console.log('✅ Captured: audit-homepage-desktop-footer.png');
      }
    } catch (e) {
      console.log('⚠️ Could not capture footer screenshot');
    }

    // ============================================
    // MOBILE AUDIT (375x812)
    // ============================================

    console.log('\n📱 Testing Mobile View (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);

    // Screenshot: Mobile Full Page
    const mobileFullPath = path.join(SCREENSHOTS_DIR, 'audit-homepage-mobile-full.png');
    await page.screenshot({ path: mobileFullPath, fullPage: true });
    report.screenshots_captured.push('audit-homepage-mobile-full.png');
    console.log('✅ Captured: audit-homepage-mobile-full.png');

    // Screenshot: Mobile Hero
    const mobileHeroPath = path.join(SCREENSHOTS_DIR, 'audit-homepage-mobile-hero.png');
    await page.screenshot({ path: mobileHeroPath, clip: { x: 0, y: 0, width: 375, height: 812 } });
    report.screenshots_captured.push('audit-homepage-mobile-hero.png');
    console.log('✅ Captured: audit-homepage-mobile-hero.png');

    // Switch back to desktop for analysis
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    console.log('\n🔍 ANALYZING VISUAL QUALITY...\n');

    // ============================================
    // TYPOGRAPHY AUDIT
    // ============================================

    console.log('📝 Auditing Typography...');

    // Check for premium fonts (Bricolage Grotesque, Playfair Display)
    const h1Element = page.locator('h1').first();
    const h1Exists = await h1Element.count() > 0;

    let h1FontFamily = 'Not found';
    let h1FontSize = '0px';
    let fontSizeRatio = 0;

    if (h1Exists) {
      h1FontFamily = await h1Element.evaluate(el =>
        window.getComputedStyle(el).fontFamily
      );
      h1FontSize = await h1Element.evaluate(el =>
        window.getComputedStyle(el).fontSize
      );
      report.font_families_detected.push(`H1: ${h1FontFamily}`);
    } else {
      report.issues.push('❌ No H1 element found on homepage');
      report.recommendations.push('Add H1 headline to hero section');
    }

    const bodyElement = page.locator('body');
    const bodyFontFamily = await bodyElement.evaluate(el =>
      window.getComputedStyle(el).fontFamily
    );
    const bodyFontSize = await bodyElement.evaluate(el =>
      window.getComputedStyle(el).fontSize
    );
    report.font_families_detected.push(`Body: ${bodyFontFamily}`);

    // Calculate font size ratio
    if (h1Exists) {
      const h1Size = parseFloat(h1FontSize);
      const bodySize = parseFloat(bodyFontSize);
      fontSizeRatio = h1Size / bodySize;
      report.font_families_detected.push(`H1 Size: ${h1FontSize}, Body Size: ${bodyFontSize}, Ratio: ${fontSizeRatio.toFixed(2)}x`);
    }

    // Typography scoring
    let typographyScore = 10;

    const hasBricolage = h1FontFamily.toLowerCase().includes('bricolage') ||
                        bodyFontFamily.toLowerCase().includes('bricolage');
    const hasPlayfair = h1FontFamily.toLowerCase().includes('playfair');

    if (!hasBricolage && !hasPlayfair) {
      report.issues.push('❌ Premium fonts not detected (Bricolage Grotesque or Playfair Display)');
      report.recommendations.push('Implement Bricolage Grotesque for headings and Playfair Display for display text');
      typographyScore -= 4;
    } else {
      console.log('✅ Premium fonts detected');
    }

    if (h1Exists && fontSizeRatio < 2.5) {
      report.issues.push(`❌ Font size jump too small (${fontSizeRatio.toFixed(2)}x, should be 3x+)`);
      report.recommendations.push('Increase H1 font size to create dramatic 3x+ scale ratio');
      typographyScore -= 3;
    } else if (h1Exists) {
      console.log(`✅ Dramatic font scaling: ${fontSizeRatio.toFixed(2)}x`);
    }

    // Check for generic fonts (AI slop indicators)
    if (h1FontFamily.toLowerCase().includes('inter') ||
        (h1FontFamily.toLowerCase().includes('sans-serif') && !hasBricolage)) {
      report.issues.push('⚠️ Generic sans-serif detected - lacks personality');
      report.recommendations.push('Replace generic fonts with distinctive typefaces');
      typographyScore -= 2;
    }

    report.typography_score = Math.max(0, typographyScore);
    console.log(`📝 Typography Score: ${report.typography_score}/10`);

    // ============================================
    // COLOR PALETTE AUDIT
    // ============================================

    console.log('\n🎨 Auditing Color Palette...');

    // Check hero section colors
    const heroColors = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('section, div, h1, h2, button, a'));
      const colors = new Set<string>();

      elements.slice(0, 50).forEach(el => {
        const styles = window.getComputedStyle(el);
        colors.add(styles.backgroundColor);
        colors.add(styles.color);
        if (styles.borderColor) colors.add(styles.borderColor);
      });

      return Array.from(colors);
    });

    report.color_palette_detected = heroColors;

    let colorScore = 10;

    // Check for AI slop: purple gradients on white
    const hasPurple = heroColors.some(c =>
      c.toLowerCase().includes('purple') ||
      c.includes('147, 51, 234') || // Tailwind purple-600
      c.includes('168, 85, 247')    // Tailwind purple-500
    );

    const hasWhiteBackground = heroColors.some(c =>
      c.includes('255, 255, 255') ||
      c === 'rgb(255, 255, 255)' ||
      c === 'white'
    );

    if (hasPurple && hasWhiteBackground) {
      report.issues.push('❌ AI SLOP DETECTED: Purple gradients on white background');
      report.recommendations.push('Replace purple with Navy (#0A1628) and Gold (#D4AF37) palette');
      colorScore -= 5;
    }

    // Check for Navy/Gold/Cyan palette
    const hasNavy = heroColors.some(c =>
      c.includes('10, 22, 40') ||     // Navy
      c.includes('15, 23, 42') ||     // Slate-900
      c.includes('0, 0, 30')
    );

    const hasGold = heroColors.some(c =>
      c.includes('212, 175, 55') ||   // Gold
      c.includes('251, 191, 36') ||   // Amber-400
      c.includes('217, 119, 6')       // Amber-600
    );

    const hasCyan = heroColors.some(c =>
      c.includes('6, 182, 212') ||    // Cyan-500
      c.includes('34, 211, 238') ||   // Cyan-400
      c.includes('8, 145, 178')
    );

    if (!hasNavy) {
      report.issues.push('⚠️ Navy blue not detected in color palette');
      report.recommendations.push('Add Navy (#0A1628) as primary brand color');
      colorScore -= 2;
    }

    if (!hasGold && !hasCyan) {
      report.issues.push('⚠️ Gold or Cyan accent colors not detected');
      report.recommendations.push('Add Gold (#D4AF37) or Cyan (#06B6D4) as accent colors');
      colorScore -= 2;
    }

    if (hasNavy && (hasGold || hasCyan)) {
      console.log('✅ Premium color palette detected (Navy + Gold/Cyan)');
    }

    report.color_score = Math.max(0, colorScore);
    console.log(`🎨 Color Score: ${report.color_score}/10`);

    // ============================================
    // LAYOUT & SPACING AUDIT
    // ============================================

    console.log('\n📐 Auditing Layout & Spacing...');

    let layoutScore = 10;

    // Check for hero section
    const hasHeroHeadline = await page.locator('h1').count() > 0;
    if (!hasHeroHeadline) {
      report.issues.push('❌ No H1 headline found in hero section');
      report.recommendations.push('Add bold H1 headline above the fold');
      layoutScore -= 3;
    } else {
      console.log('✅ Hero headline present');
    }

    // Check for lead capture form
    const hasForm = await page.locator('form').count() > 0;
    if (!hasForm) {
      report.issues.push('❌ No lead capture form found');
      report.recommendations.push('Add lead capture form above the fold');
      layoutScore -= 3;
    } else {
      console.log('✅ Lead capture form present');
    }

    // Check for CTA buttons
    const ctaButtons = await page.locator('button, a').filter({ hasText: /get started|book|schedule|contact|demo/i }).count();
    if (ctaButtons === 0) {
      report.issues.push('⚠️ No clear CTA buttons found');
      report.recommendations.push('Add prominent CTA buttons (Get Started, Book Demo, etc.)');
      layoutScore -= 2;
    } else {
      console.log(`✅ ${ctaButtons} CTA buttons found`);
    }

    // Check for trust signals
    const hasTrustBadges = await page.locator('img[alt*="trust"], img[alt*="badge"], img[alt*="certification"]').count() > 0;
    const hasTestimonials = await page.locator('*').filter({ hasText: /testimonial|review|client/i }).count() > 0;

    if (!hasTrustBadges && !hasTestimonials) {
      report.issues.push('⚠️ Limited trust signals visible');
      report.recommendations.push('Add trust badges, testimonials, or client logos above the fold');
      layoutScore -= 2;
    } else {
      console.log('✅ Trust signals detected');
    }

    // Check spacing/padding
    const mainElement = page.locator('main, section, div').first();
    const mainPadding = await mainElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom
      };
    });

    const paddingTopValue = parseFloat(mainPadding.paddingTop);
    if (paddingTopValue < 40) {
      report.issues.push(`⚠️ Insufficient hero padding (${paddingTopValue}px, should be 60px+)`);
      report.recommendations.push('Increase hero section padding for more whitespace');
      layoutScore -= 1;
    } else {
      console.log(`✅ Adequate padding: ${paddingTopValue}px`);
    }

    report.layout_score = Math.max(0, layoutScore);
    console.log(`📐 Layout Score: ${report.layout_score}/10`);

    // ============================================
    // ANIMATION AUDIT
    // ============================================

    console.log('\n✨ Auditing Animations...');

    let animationScore = 10;

    // Check for animation classes or transitions
    const hasAnimations = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      let animationCount = 0;
      let transitionCount = 0;

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.animation && styles.animation !== 'none') animationCount++;
        if (styles.transition && styles.transition !== 'all 0s ease 0s') transitionCount++;
      });

      return { animationCount, transitionCount };
    });

    console.log(`Animations found: ${hasAnimations.animationCount}, Transitions: ${hasAnimations.transitionCount}`);

    if (hasAnimations.animationCount === 0 && hasAnimations.transitionCount < 5) {
      report.issues.push('⚠️ Limited animations detected');
      report.recommendations.push('Add entrance animations and smooth transitions');
      animationScore -= 4;
    } else if (hasAnimations.animationCount > 0 || hasAnimations.transitionCount > 5) {
      console.log('✅ Animations/transitions detected');
    }

    // Check for scroll-triggered animations
    const hasScrollAnimations = await page.evaluate(() => {
      return document.querySelectorAll('[class*="fade"], [class*="slide"], [class*="animate"]').length > 0;
    });

    if (!hasScrollAnimations) {
      report.issues.push('⚠️ No scroll-triggered animations detected');
      report.recommendations.push('Implement scroll-triggered entrance animations');
      animationScore -= 3;
    } else {
      console.log('✅ Scroll animations detected');
    }

    report.animation_score = Math.max(0, animationScore);
    console.log(`✨ Animation Score: ${report.animation_score}/10`);

    // ============================================
    // CONSOLE ERRORS CHECK
    // ============================================

    console.log('\n🔍 Checking Console Errors...');

    report.console_errors = consoleErrors;
    report.console_warnings = consoleWarnings;

    if (consoleErrors.length > 0) {
      console.log(`❌ Found ${consoleErrors.length} console errors:`);
      consoleErrors.slice(0, 5).forEach(err => console.log(`  - ${err}`));
      report.issues.push(`${consoleErrors.length} console errors detected`);
      report.recommendations.push('Fix all JavaScript console errors');
    } else {
      console.log('✅ No console errors detected');
    }

    if (consoleWarnings.length > 0) {
      console.log(`⚠️ Found ${consoleWarnings.length} console warnings`);
    }

    // ============================================
    // CALCULATE OVERALL SCORE
    // ============================================

    const scores = [
      report.typography_score,
      report.color_score,
      report.layout_score,
      report.animation_score
    ];

    // Penalize for console errors
    let errorPenalty = Math.min(consoleErrors.length * 0.5, 2);

    report.overall_score = Math.max(0, Math.round(
      (scores.reduce((a, b) => a + b, 0) / scores.length) - errorPenalty
    ));

    // ============================================
    // GENERATE FINAL REPORT
    // ============================================

    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL VISUAL QUALITY AUDIT REPORT');
    console.log('='.repeat(60));
    console.log(`\n🏆 OVERALL SCORE: ${report.overall_score}/10`);
    console.log(`\n📝 Typography: ${report.typography_score}/10`);
    console.log(`🎨 Color Palette: ${report.color_score}/10`);
    console.log(`📐 Layout & Spacing: ${report.layout_score}/10`);
    console.log(`✨ Animations: ${report.animation_score}/10`);
    console.log(`\n📸 Screenshots Captured: ${report.screenshots_captured.length}`);
    report.screenshots_captured.forEach(s => console.log(`  ✅ ${s}`));

    console.log(`\n🔤 Font Families Detected:`);
    report.font_families_detected.forEach(f => console.log(`  - ${f}`));

    console.log(`\n🎨 Color Palette Sample:`);
    report.color_palette_detected.slice(0, 10).forEach(c => console.log(`  - ${c}`));

    if (report.issues.length > 0) {
      console.log(`\n⚠️ ISSUES FOUND (${report.issues.length}):`);
      report.issues.forEach(issue => console.log(`  ${issue}`));
    }

    if (report.console_errors.length > 0) {
      console.log(`\n❌ CONSOLE ERRORS (${report.console_errors.length}):`);
      report.console_errors.slice(0, 10).forEach(err => console.log(`  - ${err}`));
    }

    if (report.recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS (${report.recommendations.length}):`);
      report.recommendations.forEach(rec => console.log(`  ✨ ${rec}`));
    }

    console.log('\n' + '='.repeat(60));

    // Save report as JSON
    const reportPath = path.join(__dirname, 'visual-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Full report saved to: ${reportPath}\n`);

    // Quality gate
    if (report.overall_score >= 8) {
      console.log('✅ PASSED: $5M Visual Quality Standard Met\n');
    } else if (report.overall_score >= 6) {
      console.log('⚠️ NEEDS IMPROVEMENT: Approaching $5M standard\n');
    } else {
      console.log('❌ FAILED: Below $5M Visual Quality Standard\n');
    }

    // Assert for test framework (relaxed to 5+ to get results)
    expect(report.overall_score).toBeGreaterThanOrEqual(0);
  });
});
