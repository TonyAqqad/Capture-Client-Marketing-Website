const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3001';

// Mobile viewport - iPhone 14 Pro
const MOBILE_VIEWPORT = {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
};

const PAGES_TO_AUDIT = [
  { url: '/', name: 'Homepage' },
  { url: '/services', name: 'Services' },
  { url: '/pricing', name: 'Pricing' },
  { url: '/demo', name: 'Demo' },
  { url: '/how-it-works', name: 'How It Works' },
  { url: '/contact', name: 'Contact' },
  { url: '/locations/voice-ai-knoxville-tn', name: 'Location Page' },
];

async function auditPage(page, pageInfo, screenshotDir) {
  console.log(`\n🔍 Auditing: ${pageInfo.name} (${pageInfo.url})`);

  const results = {
    name: pageInfo.name,
    url: pageInfo.url,
    screenshots: [],
    issues: [],
    scores: {},
    consoleErrors: [],
    recommendations: [],
  };

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text());
    }
  });

  try {
    // Navigate to page
    await page.goto(`${BASE_URL}${pageInfo.url}`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for page to be interactive
    await page.waitForTimeout(2000);

    // Take full page screenshot
    const screenshotPath = path.join(screenshotDir, `${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-mobile-full.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    results.screenshots.push(screenshotPath);
    console.log(`  ✓ Screenshot saved: ${screenshotPath}`);

    // Take viewport screenshot (above the fold)
    const viewportScreenshot = path.join(screenshotDir, `${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-mobile-viewport.png`);
    await page.screenshot({
      path: viewportScreenshot,
      fullPage: false
    });
    results.screenshots.push(viewportScreenshot);

    // Check for horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalOverflow) {
      results.issues.push('❌ Horizontal overflow detected - content wider than viewport');
      results.scores.layoutAdaptation = 3;
    } else {
      results.scores.layoutAdaptation = 10;
    }

    // Check touch target sizes for buttons and links
    const touchTargets = await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button, a')];
      const smallTargets = [];

      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;

        if (isVisible && (rect.width < 44 || rect.height < 44)) {
          smallTargets.push({
            tag: btn.tagName,
            text: btn.innerText?.substring(0, 30) || 'No text',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      });

      return {
        total: buttons.filter(b => {
          const rect = b.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }).length,
        smallTargets,
      };
    });

    if (touchTargets.smallTargets.length > 0) {
      results.issues.push(`⚠️ Found ${touchTargets.smallTargets.length} touch targets smaller than 44x44px`);
      touchTargets.smallTargets.slice(0, 5).forEach(target => {
        results.issues.push(`  - ${target.tag}: "${target.text}" (${target.width}x${target.height}px)`);
      });
      results.scores.touchTargets = Math.max(3, 10 - (touchTargets.smallTargets.length * 2));
    } else {
      results.scores.touchTargets = 10;
    }

    // Check typography scaling
    const typography = await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
      const paragraphs = [...document.querySelectorAll('p')];

      const tooSmallText = [];

      [...headings, ...paragraphs].forEach(el => {
        const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
        if (fontSize < 14 && el.innerText.length > 10) {
          tooSmallText.push({
            tag: el.tagName,
            fontSize: Math.round(fontSize),
            text: el.innerText.substring(0, 50),
          });
        }
      });

      return {
        tooSmallText,
        h1Count: document.querySelectorAll('h1').length,
      };
    });

    if (typography.tooSmallText.length > 0) {
      results.issues.push(`⚠️ Found ${typography.tooSmallText.length} text elements smaller than 14px`);
      results.scores.typographyScaling = 6;
    } else {
      results.scores.typographyScaling = 10;
    }

    // Test mobile navigation if homepage
    if (pageInfo.url === '/') {
      try {
        // Look for hamburger menu
        const menuButton = await page.$('button[aria-label*="menu" i], button:has(svg)');

        if (menuButton) {
          // Take screenshot before menu open
          const beforeMenu = path.join(screenshotDir, 'mobile-menu-closed.png');
          await page.screenshot({ path: beforeMenu, fullPage: false });
          results.screenshots.push(beforeMenu);

          // Click menu
          await menuButton.click();
          await page.waitForTimeout(500);

          // Take screenshot with menu open
          const afterMenu = path.join(screenshotDir, 'mobile-menu-open.png');
          await page.screenshot({ path: afterMenu, fullPage: false });
          results.screenshots.push(afterMenu);

          // Check if menu is visible
          const menuVisible = await page.evaluate(() => {
            const nav = document.querySelector('nav');
            return nav && window.getComputedStyle(nav).display !== 'none';
          });

          if (menuVisible) {
            results.scores.navigation = 10;
            console.log('  ✓ Mobile menu opens successfully');
          } else {
            results.issues.push('❌ Mobile menu does not appear to open');
            results.scores.navigation = 3;
          }

          // Try to close menu
          const closeButton = await page.$('button[aria-label*="close" i]');
          if (closeButton) {
            await closeButton.click();
          } else {
            // Click the same button again to toggle
            await menuButton.click();
          }
          await page.waitForTimeout(300);

        } else {
          results.issues.push('⚠️ Mobile menu button not found');
          results.scores.navigation = 5;
        }
      } catch (error) {
        results.issues.push(`⚠️ Mobile navigation test failed: ${error.message}`);
        results.scores.navigation = 5;
      }
    } else {
      results.scores.navigation = 10; // Assume OK for other pages
    }

    // Check for backdrop-blur on mobile (performance issue)
    const hasBackdropBlur = await page.evaluate(() => {
      const elements = [...document.querySelectorAll('*')];
      return elements.some(el => {
        const style = window.getComputedStyle(el);
        return style.backdropFilter && style.backdropFilter !== 'none';
      });
    });

    if (hasBackdropBlur) {
      results.recommendations.push('⚡ Consider disabling backdrop-blur on mobile for better performance');
    }

    // Check form usability (if forms exist)
    const formIssues = await page.evaluate(() => {
      const inputs = [...document.querySelectorAll('input, textarea, select')];
      const issues = [];

      inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        if (rect.height < 44 && rect.height > 0) {
          issues.push(`Small input: ${input.name || input.id || 'unknown'} (${Math.round(rect.height)}px)`);
        }

        // Check if input has visible label
        const label = document.querySelector(`label[for="${input.id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const placeholder = input.getAttribute('placeholder');

        if (!label && !ariaLabel && !placeholder) {
          issues.push(`Input missing label: ${input.name || input.id || 'unknown'}`);
        }
      });

      return issues;
    });

    if (formIssues.length > 0) {
      results.issues.push(`⚠️ Form usability issues (${formIssues.length}):`);
      formIssues.slice(0, 3).forEach(issue => {
        results.issues.push(`  - ${issue}`);
      });
    }

    // Calculate overall score
    const scores = Object.values(results.scores);
    results.overallScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 8;

  } catch (error) {
    results.issues.push(`❌ Error during audit: ${error.message}`);
    results.overallScore = 0;
  }

  return results;
}

async function runMobileAudit() {
  console.log('🚀 Starting Mobile Visual Audit - $3M Website Standards\n');
  console.log(`📱 Viewport: ${MOBILE_VIEWPORT.width}x${MOBILE_VIEWPORT.height} (iPhone 14 Pro)`);
  console.log(`🌐 Base URL: ${BASE_URL}\n`);

  const screenshotDir = path.join(__dirname, '.playwright-mcp');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: MOBILE_VIEWPORT,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();

  const allResults = [];

  for (const pageInfo of PAGES_TO_AUDIT) {
    const results = await auditPage(page, pageInfo, screenshotDir);
    allResults.push(results);
    await page.waitForTimeout(1000); // Pause between pages
  }

  await browser.close();

  // Generate report
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 MOBILE VISUAL AUDIT REPORT');
  console.log('='.repeat(80) + '\n');

  const avgScore = Math.round(
    allResults.reduce((sum, r) => sum + r.overallScore, 0) / allResults.length
  );
  console.log(`### Overall Mobile Score: ${avgScore}/10\n`);

  console.log('### Page-by-Page Analysis\n');

  allResults.forEach(result => {
    console.log(`#### ${result.name} (${result.url}) - Mobile`);
    console.log(`- Overall Score: ${result.overallScore}/10`);
    console.log(`- Screenshots: ${result.screenshots.length} captured`);
    result.screenshots.forEach(s => console.log(`  - ${path.basename(s)}`));

    if (Object.keys(result.scores).length > 0) {
      console.log('- Scores:');
      Object.entries(result.scores).forEach(([key, value]) => {
        console.log(`  - ${key}: ${value}/10`);
      });
    }

    if (result.issues.length > 0) {
      console.log('- Issues Found:');
      result.issues.forEach(issue => console.log(`  ${issue}`));
    } else {
      console.log('- Issues Found: None ✓');
    }

    if (result.recommendations.length > 0) {
      console.log('- Recommendations:');
      result.recommendations.forEach(rec => console.log(`  ${rec}`));
    }

    if (result.consoleErrors.length > 0) {
      console.log('- Console Errors:');
      result.consoleErrors.slice(0, 3).forEach(err => console.log(`  ⚠️ ${err.substring(0, 100)}`));
    }

    console.log('');
  });

  // Critical issues summary
  const criticalIssues = allResults
    .flatMap(r => r.issues)
    .filter(issue => issue.includes('❌'));

  if (criticalIssues.length > 0) {
    console.log('### Critical Mobile Issues (Must Fix)\n');
    criticalIssues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
    console.log('');
  }

  // All console errors
  const allErrors = allResults.flatMap(r =>
    r.consoleErrors.map(err => ({ page: r.name, error: err }))
  );

  if (allErrors.length > 0) {
    console.log('### Console Errors on Mobile\n');
    allErrors.slice(0, 10).forEach(({ page, error }) => {
      console.log(`- [${page}] ${error.substring(0, 100)}`);
    });
    console.log('');
  }

  console.log(`✅ Audit complete! Screenshots saved to: ${screenshotDir}`);
  console.log('='.repeat(80));

  // Write JSON report
  const reportPath = path.join(__dirname, 'mobile-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    viewport: MOBILE_VIEWPORT,
    overallScore: avgScore,
    results: allResults,
  }, null, 2));

  console.log(`\n📄 JSON report saved to: ${reportPath}`);
}

runMobileAudit().catch(console.error);
