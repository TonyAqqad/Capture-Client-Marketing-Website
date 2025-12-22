const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const BRIGHT_DATA_ENDPOINT = 'wss://brd-customer-hl_a6265209-zone-scraping_browser1:dmjhp96pix30@brd.superproxy.io:9222';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchGoogleMaps(page, query, location) {
  console.log(`\nSearching for "${query}" in ${location}...`);

  // Navigate to Google Maps
  await page.goto('https://www.google.com/maps', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(2000);

  // Search for the query + location
  const searchBox = await page.waitForSelector('input[id="searchboxinput"]', { timeout: 10000 });
  await searchBox.click();
  await searchBox.type(`${query} ${location}`, { delay: 100 });
  await delay(1000);

  // Submit search
  await page.keyboard.press('Enter');
  await delay(5000);

  // Wait for results to load
  await page.waitForSelector('div[role="feed"]', { timeout: 15000 });
  await delay(3000);

  // Scroll to load more results
  const feed = await page.$('div[role="feed"]');
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => {
      const feedElement = document.querySelector('div[role="feed"]');
      if (feedElement) {
        feedElement.scrollTop = feedElement.scrollHeight;
      }
    });
    await delay(2000);
  }

  // Extract agency information
  const agencies = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('div[role="article"]');

    for (let i = 0; i < Math.min(5, elements.length); i++) {
      const element = elements[i];

      try {
        const nameElement = element.querySelector('a[aria-label]');
        const name = nameElement ? nameElement.getAttribute('aria-label') : null;

        if (name) {
          results.push({
            name: name,
            element: i
          });
        }
      } catch (e) {
        console.error('Error extracting agency:', e);
      }
    }

    return results;
  });

  console.log(`Found ${agencies.length} agencies`);
  return agencies;
}

async function getAgencyDetails(page, agencyIndex) {
  try {
    console.log(`\nGetting details for agency #${agencyIndex}...`);

    // Click on the agency
    const articles = await page.$$('div[role="article"]');
    if (agencyIndex >= articles.length) {
      console.log('Agency index out of bounds');
      return null;
    }

    await articles[agencyIndex].click();
    await delay(4000);

    // Extract details from the side panel
    const details = await page.evaluate(() => {
      const data = {
        name: '',
        website: '',
        phone: '',
        address: '',
        rating: ''
      };

      // Get name
      const nameElement = document.querySelector('h1');
      if (nameElement) {
        data.name = nameElement.textContent.trim();
      }

      // Get website
      const websiteButton = document.querySelector('a[data-item-id="authority"]');
      if (websiteButton) {
        data.website = websiteButton.getAttribute('href');
      }

      // Get phone
      const phoneButton = document.querySelector('button[data-item-id="phone:tel:"]');
      if (phoneButton) {
        const phoneText = phoneButton.getAttribute('data-item-id');
        if (phoneText) {
          data.phone = phoneText.replace('phone:tel:', '');
        }
      }

      // Get address
      const addressButton = document.querySelector('button[data-item-id^="address"]');
      if (addressButton) {
        data.address = addressButton.getAttribute('aria-label') || '';
      }

      // Get rating
      const ratingElement = document.querySelector('div[role="img"][aria-label*="star"]');
      if (ratingElement) {
        data.rating = ratingElement.getAttribute('aria-label');
      }

      return data;
    });

    console.log(`Agency: ${details.name}`);
    console.log(`Website: ${details.website}`);

    return details;
  } catch (e) {
    console.error('Error getting agency details:', e);
    return null;
  }
}

async function scrapeWebsite(page, url) {
  if (!url || !url.startsWith('http')) {
    console.log('Invalid URL, skipping website scrape');
    return {
      services: [],
      packages: [],
      pricing: []
    };
  }

  try {
    console.log(`\nScraping website: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);

    const websiteData = await page.evaluate(() => {
      const data = {
        services: [],
        packages: [],
        pricing: []
      };

      const bodyText = document.body.innerText.toLowerCase();

      // Check for services
      const serviceKeywords = [
        'voice ai', 'ai voice', 'ai agents', 'ai receptionist',
        'lead generation', 'facebook ads', 'google ads', 'ppc',
        'local seo', 'seo services', 'search engine optimization',
        'social media marketing', 'content marketing', 'email marketing',
        'web design', 'website design', 'reputation management'
      ];

      serviceKeywords.forEach(keyword => {
        if (bodyText.includes(keyword)) {
          data.services.push(keyword);
        }
      });

      // Look for pricing/package sections
      const pricingKeywords = ['pricing', 'packages', 'plans', 'investment'];
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

      headings.forEach(heading => {
        const text = heading.textContent.toLowerCase();
        pricingKeywords.forEach(keyword => {
          if (text.includes(keyword)) {
            // Try to find price elements nearby
            const section = heading.closest('section') || heading.parentElement;
            if (section) {
              const sectionText = section.innerText;

              // Look for dollar amounts
              const priceMatches = sectionText.match(/\$[\d,]+(?:\/mo|\/month|per month)?/gi);
              if (priceMatches) {
                data.pricing.push(...priceMatches);
              }

              // Look for package names
              const packageMatches = sectionText.match(/(starter|basic|growth|professional|enterprise|premium|standard|advanced|pro)\s*(package|plan)?/gi);
              if (packageMatches) {
                data.packages.push(...packageMatches);
              }
            }
          }
        });
      });

      return data;
    });

    console.log(`Services found: ${websiteData.services.length}`);
    console.log(`Packages found: ${websiteData.packages.length}`);
    console.log(`Pricing found: ${websiteData.pricing.length}`);

    return websiteData;
  } catch (e) {
    console.error('Error scraping website:', e.message);
    return {
      services: [],
      packages: [],
      pricing: []
    };
  }
}

async function researchCity(page, city, state) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`RESEARCHING: ${city}, ${state}`);
  console.log('='.repeat(60));

  const location = `${city}, ${state}`;
  const agencies = [];

  // Search for both "marketing agency" and "lead generation agency"
  const queries = ['marketing agency', 'lead generation agency'];

  for (const query of queries) {
    const searchResults = await searchGoogleMaps(page, query, location);

    // Get details for top 3 results
    for (let i = 0; i < Math.min(3, searchResults.length); i++) {
      const details = await getAgencyDetails(page, i);

      if (details && details.website) {
        // Check if we already have this agency
        const existing = agencies.find(a => a.name === details.name || a.website === details.website);
        if (existing) {
          console.log(`Already have ${details.name}, skipping...`);
          continue;
        }

        // Scrape the website
        const websiteData = await scrapeWebsite(page, details.website);

        agencies.push({
          name: details.name,
          website: details.website,
          phone: details.phone,
          address: details.address,
          rating: details.rating,
          city: city,
          state: state,
          services: websiteData.services,
          packages: websiteData.packages,
          pricing: websiteData.pricing,
          foundVia: query
        });

        console.log(`✓ Added ${details.name}`);

        // Only keep top 3 unique agencies
        if (agencies.length >= 3) break;
      }

      // Go back to search results
      await page.goBack({ waitUntil: 'networkidle2', timeout: 30000 });
      await delay(2000);
    }

    if (agencies.length >= 3) break;
  }

  return agencies;
}

async function main() {
  console.log('Connecting to Bright Data Browser...');

  const browser = await puppeteer.connect({
    browserWSEndpoint: BRIGHT_DATA_ENDPOINT
  });

  console.log('✓ Connected to Bright Data Browser');

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const allAgencies = [];

  try {
    // Research Miami
    const miamiAgencies = await researchCity(page, 'Miami', 'FL');
    allAgencies.push(...miamiAgencies);

    console.log(`\n✓ Found ${miamiAgencies.length} agencies in Miami`);

    // Research Houston
    const houstonAgencies = await researchCity(page, 'Houston', 'TX');
    allAgencies.push(...houstonAgencies);

    console.log(`\n✓ Found ${houstonAgencies.length} agencies in Houston`);

    // Save results
    const outputPath = path.join(__dirname, 'capture-client-site', 'src', 'data', 'research', 'competitor-miami-houston.json');

    // Ensure directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const output = {
      timestamp: new Date().toISOString(),
      totalAgencies: allAgencies.length,
      cities: {
        miami: miamiAgencies.length,
        houston: houstonAgencies.length
      },
      agencies: allAgencies
    };

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('✓ RESEARCH COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total agencies found: ${allAgencies.length}`);
    console.log(`Miami: ${miamiAgencies.length}`);
    console.log(`Houston: ${houstonAgencies.length}`);
    console.log(`\nResults saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error during research:', error);
  } finally {
    await browser.close();
    console.log('\n✓ Browser closed');
  }
}

main().catch(console.error);
