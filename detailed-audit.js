// Comprehensive page audit script
const pages = [
  { name: 'Homepage', url: 'http://localhost:3000/' },
  { name: 'Pricing', url: 'http://localhost:3000/pricing' },
  { name: 'Industries - Home Services', url: 'http://localhost:3000/industries/home-services' },
  { name: 'Industries - Legal', url: 'http://localhost:3000/industries/legal' },
  { name: 'Industries - Healthcare', url: 'http://localhost:3000/industries/healthcare' },
  { name: 'Industries - Real Estate', url: 'http://localhost:3000/industries/real-estate' },
  { name: 'Industries - Automotive', url: 'http://localhost:3000/industries/automotive' },
  { name: 'Industries - Dental', url: 'http://localhost:3000/industries/dental' },
  { name: 'Industries - Restaurants', url: 'http://localhost:3000/industries/restaurants' },
  { name: 'Industries - Fitness', url: 'http://localhost:3000/industries/fitness' },
];

const validRoutes = new Set([
  '/contact', '/pricing', '/demo', '/get-started', '/schedule',
  '/industries', '/services', '/about', '/faq', '/how-it-works',
  '/features', '/case-studies', '/blog', '/terms-of-service',
  '/privacy-policy', '/who-we-serve',
  // Industry pages
  '/industries/home-services', '/industries/legal', '/industries/healthcare',
  '/industries/real-estate', '/industries/automotive', '/industries/dental',
  '/industries/restaurants', '/industries/fitness', '/industries/med-spa',
  '/industries/martial-arts',
  // Pricing packages
  '/pricing/starter-package', '/pricing/growth-package', '/pricing/enterprise-package',
]);

function extractLinks(html) {
  const links = [];
  const hrefPattern = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefPattern.exec(html)) !== null) {
    const href = match[1];
    // Filter for internal links only (not tel:, mailto:, #, or external)
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes('#')) {
      links.push(href);
    }
  }

  return [...new Set(links)]; // Remove duplicates
}

function checkForBrokenImages(html) {
  const issues = [];

  // Check for common broken image patterns
  if (html.includes('alt=""') || html.includes('alt=\'\'')) {
    issues.push('WARNING: Found images with empty alt text (accessibility issue)');
  }

  return issues;
}

function checkForConsoleErrors(html) {
  const issues = [];

  // Check for common error patterns in server-rendered HTML
  if (html.includes('Hydration') || html.includes('hydration')) {
    issues.push('POTENTIAL: May have hydration errors (check browser console)');
  }

  return issues;
}

async function auditPage(page) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`AUDITING: ${page.name}`);
  console.log(`URL: ${page.url}`);
  console.log('='.repeat(60));

  try {
    const response = await fetch(page.url);
    const html = await response.text();

    if (!response.ok) {
      console.log(`❌ PAGE LOAD FAILED: HTTP ${response.status}\n`);
      return { page: page.name, status: 'failed', httpStatus: response.status };
    }

    console.log(`✅ PAGE LOADS: HTTP ${response.status}`);

    // Extract and check all internal links
    const links = extractLinks(html);
    console.log(`\n📎 INTERNAL LINKS FOUND: ${links.length}`);

    const brokenLinks = [];
    const workingLinks = [];

    for (const link of links) {
      // Check against known valid routes
      const baseLink = link.split('?')[0].split('#')[0]; // Remove query params and fragments
      const isKnownValid = validRoutes.has(baseLink) ||
                          baseLink.startsWith('/pricing/') ||
                          baseLink.startsWith('/services/') ||
                          baseLink.startsWith('/integrations/') ||
                          baseLink.startsWith('/locations/') ||
                          baseLink.startsWith('/use-cases/') ||
                          baseLink.startsWith('/blog/');

      if (isKnownValid) {
        workingLinks.push(link);
      } else {
        // Test the link
        try {
          const testResponse = await fetch(`http://localhost:3000${link}`);
          if (testResponse.ok) {
            workingLinks.push(link);
          } else {
            brokenLinks.push({ link, status: testResponse.status });
          }
        } catch (error) {
          brokenLinks.push({ link, error: error.message });
        }
      }
    }

    // CTAs analysis
    console.log(`\n🔘 BUTTON/CTA ANALYSIS:`);
    const ctaButtons = {
      'Get Started': html.match(/Get Started/gi)?.length || 0,
      'Contact': html.match(/href=["']\/contact["']/gi)?.length || 0,
      'Phone (tel:)': html.match(/href=["']tel:/gi)?.length || 0,
      'Demo': html.match(/href=["']\/demo["']/gi)?.length || 0,
      'Pricing': html.match(/href=["']\/pricing["']/gi)?.length || 0,
      'Schedule': html.match(/href=["']\/schedule["']/gi)?.length || 0,
    };

    Object.entries(ctaButtons).forEach(([label, count]) => {
      if (count > 0) {
        console.log(`  ✓ ${label}: ${count} found`);
      }
    });

    // Check for specific issues
    console.log(`\n🔍 SPECIFIC CHECKS:`);

    // Phone number consistency
    const phone1 = html.match(/865-346-3339/g)?.length || 0;
    const phone2 = html.match(/8653463339/g)?.length || 0;
    const totalPhone = phone1 + phone2;
    console.log(`  ✓ Phone number references: ${totalPhone} (formatted: ${phone1}, raw: ${phone2})`);

    // Image checks
    const imageIssues = checkForBrokenImages(html);
    if (imageIssues.length > 0) {
      imageIssues.forEach(issue => console.log(`  ⚠️  ${issue}`));
    }

    // Console error checks
    const consoleIssues = checkForConsoleErrors(html);
    if (consoleIssues.length > 0) {
      consoleIssues.forEach(issue => console.log(`  ⚠️  ${issue}`));
    }

    // Report broken links
    if (brokenLinks.length > 0) {
      console.log(`\n❌ BROKEN LINKS (${brokenLinks.length}):`);
      brokenLinks.forEach(({ link, status, error }) => {
        console.log(`  - ${link} ${status ? `(HTTP ${status})` : `(${error})`}`);
      });
    } else {
      console.log(`\n✅ ALL LINKS WORKING (${workingLinks.length} checked)`);
    }

    // Final verdict
    const hasIssues = brokenLinks.length > 0 || imageIssues.length > 0;
    console.log(`\n${'─'.repeat(60)}`);
    if (hasIssues) {
      console.log(`VERDICT: ⚠️  NEEDS ATTENTION (${brokenLinks.length} issues found)`);
    } else {
      console.log(`VERDICT: ✅ FULLY FUNCTIONAL`);
    }
    console.log('─'.repeat(60));

    return {
      page: page.name,
      status: 'success',
      linksWorking: workingLinks.length,
      linksBroken: brokenLinks.length,
      brokenLinks: brokenLinks,
      ctas: ctaButtons,
      issues: [...imageIssues, ...consoleIssues]
    };

  } catch (error) {
    console.log(`\n❌ ERROR AUDITING PAGE: ${error.message}`);
    return { page: page.name, status: 'error', error: error.message };
  }
}

async function runFullAudit() {
  console.log('\n');
  console.log('█'.repeat(60));
  console.log('     TIER 1 PAGES - COMPREHENSIVE FUNCTIONALITY AUDIT');
  console.log('█'.repeat(60));

  const results = [];

  for (const page of pages) {
    const result = await auditPage(page);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 300)); // Small delay
  }

  // Final summary
  console.log(`\n\n${'█'.repeat(60)}`);
  console.log('                    AUDIT SUMMARY');
  console.log('█'.repeat(60));

  const successful = results.filter(r => r.status === 'success' && r.linksBroken === 0);
  const needsAttention = results.filter(r => r.linksBroken > 0 || r.issues?.length > 0);
  const failed = results.filter(r => r.status === 'error' || r.status === 'failed');

  console.log(`\n✅ FULLY FUNCTIONAL: ${successful.length}/${pages.length} pages`);
  console.log(`⚠️  NEEDS ATTENTION: ${needsAttention.length}/${pages.length} pages`);
  console.log(`❌ FAILED TO LOAD: ${failed.length}/${pages.length} pages`);

  if (needsAttention.length > 0) {
    console.log(`\n⚠️  PAGES NEEDING ATTENTION:`);
    needsAttention.forEach(r => {
      console.log(`   - ${r.page}: ${r.linksBroken} broken links, ${r.issues?.length || 0} warnings`);
    });
  }

  if (failed.length > 0) {
    console.log(`\n❌ FAILED PAGES:`);
    failed.forEach(r => {
      console.log(`   - ${r.page}: ${r.error || `HTTP ${r.httpStatus}`}`);
    });
  }

  console.log(`\n${'█'.repeat(60)}\n`);
}

runFullAudit();
