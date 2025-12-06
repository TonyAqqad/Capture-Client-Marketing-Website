const { chromium } = require('playwright');
const fs = require('fs');

const BASE_URL = 'http://localhost:3001';

const PAGES_TO_TEST = [
  { name: 'Homepage', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Demo', url: '/demo' },
  { name: 'Location: Knoxville', url: '/locations/voice-ai-knoxville-tn' },
  { name: 'Pricing', url: '/pricing' },
];

async function auditPage(page, pageName, url) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`AUDITING: ${pageName} (${url})`);
  console.log('='.repeat(60));

  const requests = [];
  const failed = [];
  const largeAssets = [];
  const consoleMessages = [];

  // Collect network requests
  page.on('request', req => {
    requests.push({
      url: req.url(),
      method: req.method(),
      resourceType: req.resourceType()
    });
  });

  page.on('requestfailed', req => {
    failed.push({
      url: req.url(),
      failure: req.failure()?.errorText || 'Unknown error'
    });
  });

  page.on('response', async resp => {
    try {
      const headers = resp.headers();
      const contentLength = headers['content-length'];
      const size = contentLength ? parseInt(contentLength) : 0;

      if (size > 500000) { // 500KB
        largeAssets.push({
          url: resp.url(),
          size: Math.round(size / 1024) + ' KB',
          type: resp.request().resourceType()
        });
      }
    } catch (e) {
      // Ignore errors from responses
    }
  });

  // Collect console messages
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Navigate to page
  const startTime = Date.now();
  try {
    await page.goto(BASE_URL + url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  } catch (error) {
    console.error(`❌ Failed to load page: ${error.message}`);
    return null;
  }

  // Take loading screenshot
  const screenshotName = pageName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  await page.screenshot({
    path: `perf-${screenshotName}-loading.png`,
    fullPage: false
  });

  // Wait for network to settle
  await page.waitForTimeout(2000);
  try {
    await page.waitForLoadState('networkidle', { timeout: 5000 });
  } catch (e) {
    console.log('⚠️  Network did not fully idle');
  }

  const loadTime = Date.now() - startTime;

  // Take loaded screenshot
  await page.screenshot({
    path: `perf-${screenshotName}-loaded.png`,
    fullPage: false
  });

  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const paint = performance.getEntriesByType('paint');
    const navigation = performance.getEntriesByType('navigation')[0];

    return {
      fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      lcp: 0, // Would need PerformanceObserver
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
      transferSize: navigation?.transferSize || 0,
    };
  });

  // Count resource types
  const images = requests.filter(r => r.resourceType === 'image');
  const fonts = requests.filter(r => r.resourceType === 'font');
  const scripts = requests.filter(r => r.resourceType === 'script');
  const stylesheets = requests.filter(r => r.resourceType === 'stylesheet');
  const xhr = requests.filter(r => r.resourceType === 'xhr' || r.resourceType === 'fetch');

  // Count console issues
  const errors = consoleMessages.filter(m => m.type === 'error');
  const warnings = consoleMessages.filter(m => m.type === 'warning');

  // Report
  console.log(`\n📊 LOAD METRICS:`);
  console.log(`   Total Load Time: ${loadTime}ms`);
  console.log(`   First Contentful Paint: ${Math.round(metrics.fcp)}ms`);
  console.log(`   DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
  console.log(`   Transfer Size: ${Math.round(metrics.transferSize / 1024)} KB`);

  console.log(`\n🌐 NETWORK REQUESTS: ${requests.length} total`);
  console.log(`   Images: ${images.length}`);
  console.log(`   Fonts: ${fonts.length}`);
  console.log(`   Scripts: ${scripts.length}`);
  console.log(`   Stylesheets: ${stylesheets.length}`);
  console.log(`   XHR/Fetch: ${xhr.length}`);

  if (failed.length > 0) {
    console.log(`\n❌ FAILED REQUESTS: ${failed.length}`);
    failed.forEach(f => {
      console.log(`   - ${f.url}`);
      console.log(`     Error: ${f.failure}`);
    });
  } else {
    console.log(`\n✅ No failed requests`);
  }

  if (largeAssets.length > 0) {
    console.log(`\n⚠️  LARGE ASSETS (>500KB): ${largeAssets.length}`);
    largeAssets.forEach(a => {
      console.log(`   - ${a.type}: ${a.size}`);
      console.log(`     ${a.url.substring(0, 100)}...`);
    });
  } else {
    console.log(`\n✅ No assets over 500KB`);
  }

  if (errors.length > 0) {
    console.log(`\n❌ CONSOLE ERRORS: ${errors.length}`);
    errors.slice(0, 10).forEach(e => {
      console.log(`   - ${e.text}`);
      if (e.location.url) {
        console.log(`     at ${e.location.url}:${e.location.lineNumber}`);
      }
    });
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  } else {
    console.log(`\n✅ No console errors`);
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  CONSOLE WARNINGS: ${warnings.length}`);
    warnings.slice(0, 5).forEach(w => {
      console.log(`   - ${w.text.substring(0, 100)}`);
    });
    if (warnings.length > 5) {
      console.log(`   ... and ${warnings.length - 5} more warnings`);
    }
  } else {
    console.log(`\n✅ No console warnings`);
  }

  return {
    pageName,
    url,
    loadTime,
    metrics,
    requests: {
      total: requests.length,
      images: images.length,
      fonts: fonts.length,
      scripts: scripts.length,
      stylesheets: stylesheets.length,
      xhr: xhr.length
    },
    failed: failed.length,
    failedDetails: failed,
    largeAssets: largeAssets.length,
    largeAssetDetails: largeAssets,
    console: {
      errors: errors.length,
      warnings: warnings.length,
      errorDetails: errors.slice(0, 10),
      warningDetails: warnings.slice(0, 5)
    }
  };
}

async function generateReport(results) {
  console.log(`\n\n${'='.repeat(60)}`);
  console.log('PERFORMANCE AUDIT SUMMARY');
  console.log('='.repeat(60));

  const totalErrors = results.reduce((sum, r) => sum + r.console.errors, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.console.warnings, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
  const totalLargeAssets = results.reduce((sum, r) => sum + r.largeAssets, 0);
  const avgLoadTime = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length;

  console.log(`\n📈 OVERALL METRICS:`);
  console.log(`   Pages Tested: ${results.length}`);
  console.log(`   Average Load Time: ${Math.round(avgLoadTime)}ms`);
  console.log(`   Total Console Errors: ${totalErrors}`);
  console.log(`   Total Console Warnings: ${totalWarnings}`);
  console.log(`   Total Failed Requests: ${totalFailed}`);
  console.log(`   Total Large Assets (>500KB): ${totalLargeAssets}`);

  // Performance score (out of 10)
  let score = 10;
  if (avgLoadTime > 3000) score -= 2;
  if (avgLoadTime > 5000) score -= 2;
  if (totalErrors > 0) score -= 2;
  if (totalFailed > 0) score -= 2;
  if (totalLargeAssets > 3) score -= 1;
  if (totalWarnings > 10) score -= 1;

  console.log(`\n⭐ PERFORMANCE SCORE: ${Math.max(0, score)}/10`);

  if (score < 7) {
    console.log(`\n🚨 CRITICAL ISSUES FOUND - Does not meet $3M quality standards`);
  } else if (score < 9) {
    console.log(`\n⚠️  IMPROVEMENTS NEEDED for premium quality`);
  } else {
    console.log(`\n✅ EXCELLENT - Meets $3M quality standards`);
  }

  console.log(`\n📄 Screenshots saved:`);
  results.forEach(r => {
    const name = r.pageName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    console.log(`   - perf-${name}-loading.png`);
    console.log(`   - perf-${name}-loaded.png`);
  });

  // Generate markdown report
  let markdown = `# PERFORMANCE AUDIT REPORT\n\n`;
  markdown += `## Overall Performance Score: ${Math.max(0, score)}/10\n\n`;

  if (score < 7) {
    markdown += `### 🚨 CRITICAL - Does not meet $3M quality standards\n\n`;
  } else if (score < 9) {
    markdown += `### ⚠️ NEEDS IMPROVEMENT for premium quality\n\n`;
  } else {
    markdown += `### ✅ EXCELLENT - Meets $3M quality standards\n\n`;
  }

  markdown += `### Summary Statistics\n\n`;
  markdown += `- Pages Tested: ${results.length}\n`;
  markdown += `- Average Load Time: ${Math.round(avgLoadTime)}ms\n`;
  markdown += `- Total Console Errors: ${totalErrors}\n`;
  markdown += `- Total Console Warnings: ${totalWarnings}\n`;
  markdown += `- Total Failed Requests: ${totalFailed}\n`;
  markdown += `- Total Large Assets (>500KB): ${totalLargeAssets}\n\n`;

  markdown += `## Page Load Analysis\n\n`;

  results.forEach(r => {
    markdown += `### ${r.pageName} (${r.url})\n\n`;
    markdown += `**Load Metrics:**\n`;
    markdown += `- Total Load Time: ${r.loadTime}ms\n`;
    markdown += `- First Contentful Paint: ${Math.round(r.metrics.fcp)}ms\n`;
    markdown += `- Transfer Size: ${Math.round(r.metrics.transferSize / 1024)} KB\n\n`;

    markdown += `**Network Requests:** ${r.requests.total}\n`;
    markdown += `- Images: ${r.requests.images}\n`;
    markdown += `- Fonts: ${r.requests.fonts}\n`;
    markdown += `- Scripts: ${r.requests.scripts}\n`;
    markdown += `- Stylesheets: ${r.requests.stylesheets}\n`;
    markdown += `- XHR/Fetch: ${r.requests.xhr}\n\n`;

    if (r.failed > 0) {
      markdown += `**❌ Failed Requests:** ${r.failed}\n`;
      r.failedDetails.forEach(f => {
        markdown += `- ${f.url}\n  Error: ${f.failure}\n`;
      });
      markdown += `\n`;
    }

    if (r.largeAssets > 0) {
      markdown += `**⚠️ Large Assets (>500KB):** ${r.largeAssets}\n`;
      r.largeAssetDetails.forEach(a => {
        markdown += `- ${a.type}: ${a.size} - ${a.url.substring(0, 80)}...\n`;
      });
      markdown += `\n`;
    }

    if (r.console.errors > 0) {
      markdown += `**❌ Console Errors:** ${r.console.errors}\n`;
      r.console.errorDetails.forEach(e => {
        markdown += `- ${e.text}\n`;
        if (e.location.url) {
          markdown += `  at ${e.location.url}:${e.location.lineNumber}\n`;
        }
      });
      markdown += `\n`;
    }

    if (r.console.warnings > 0) {
      markdown += `**⚠️ Console Warnings:** ${r.console.warnings}\n`;
      r.console.warningDetails.forEach(w => {
        markdown += `- ${w.text.substring(0, 100)}\n`;
      });
      markdown += `\n`;
    }

    markdown += `---\n\n`;
  });

  markdown += `## Recommendations\n\n`;

  if (totalErrors > 0) {
    markdown += `### Critical (Blocking $3M Quality)\n`;
    markdown += `1. Fix all console errors immediately - these indicate broken functionality\n`;
    markdown += `2. Investigate and resolve JavaScript errors that may impact user experience\n\n`;
  }

  if (totalFailed > 0) {
    markdown += `### High Priority\n`;
    markdown += `1. Fix failed network requests (404s, failed assets)\n`;
    markdown += `2. Ensure all images and resources load correctly\n\n`;
  }

  if (avgLoadTime > 3000) {
    markdown += `### Performance Optimization\n`;
    markdown += `1. Reduce page load time - target <2s for premium experience\n`;
    markdown += `2. Implement code splitting and lazy loading\n`;
    markdown += `3. Optimize critical rendering path\n\n`;
  }

  if (totalLargeAssets > 0) {
    markdown += `### Resource Optimization\n`;
    markdown += `1. Compress or optimize assets over 500KB\n`;
    markdown += `2. Use next/image for automatic optimization\n`;
    markdown += `3. Consider lazy loading large images\n\n`;
  }

  markdown += `## Screenshots\n\n`;
  results.forEach(r => {
    const name = r.pageName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    markdown += `### ${r.pageName}\n`;
    markdown += `- Loading state: \`perf-${name}-loading.png\`\n`;
    markdown += `- Loaded state: \`perf-${name}-loaded.png\`\n\n`;
  });

  fs.writeFileSync('PERFORMANCE_AUDIT_DETAILED.md', markdown);
  console.log(`\n📄 Detailed report saved to: PERFORMANCE_AUDIT_DETAILED.md`);
}

async function main() {
  console.log('Starting Performance Audit...');
  console.log(`Testing ${PAGES_TO_TEST.length} pages on ${BASE_URL}\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const results = [];

  for (const testPage of PAGES_TO_TEST) {
    const result = await auditPage(page, testPage.name, testPage.url);
    if (result) {
      results.push(result);
    }
    // Clear listeners for next page
    page.removeAllListeners();
  }

  await browser.close();

  if (results.length > 0) {
    await generateReport(results);
  } else {
    console.error('\n❌ No pages were successfully audited');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
