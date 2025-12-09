// Quick page functionality test
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

async function testPage(page) {
  try {
    const response = await fetch(page.url);
    const html = await response.text();

    // Check for common issues
    const issues = [];

    // Check for broken demo links
    if (html.includes('href="/demo"') || html.includes('href=\"/demo\"')) {
      console.log(`✓ ${page.name}: Has /demo link (page exists)`);
    }

    // Check for phone links
    const phonePattern = /href="tel:865-346-3339"|href="tel:8653463339"/g;
    const phoneMatches = html.match(phonePattern);
    if (phoneMatches) {
      console.log(`✓ ${page.name}: Has ${phoneMatches.length} phone links`);
    }

    // Check for contact links
    if (html.includes('href="/contact"')) {
      console.log(`✓ ${page.name}: Has contact link`);
    }

    // Check for pricing links
    if (html.includes('href="/pricing"') || html.includes('href=\"/pricing\"')) {
      console.log(`✓ ${page.name}: Has pricing link`);
    }

    // Check status
    if (response.ok) {
      console.log(`✓ ${page.name}: Page loads (${response.status})\n`);
    } else {
      console.log(`✗ ${page.name}: HTTP ${response.status}\n`);
    }

    return { page: page.name, status: response.status, ok: response.ok };
  } catch (error) {
    console.log(`✗ ${page.name}: Error - ${error.message}\n`);
    return { page: page.name, error: error.message, ok: false };
  }
}

async function runTests() {
  console.log('=== TIER 1 PAGES FUNCTIONALITY TEST ===\n');

  for (const page of pages) {
    await testPage(page);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
  }

  console.log('\n=== TEST COMPLETE ===');
}

runTests();
