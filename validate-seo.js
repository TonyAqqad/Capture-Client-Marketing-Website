#!/usr/bin/env node

/**
 * SEO Validation Script for Capture Client
 *
 * This script validates the SEO implementation by checking:
 * - Sitemap accessibility and structure
 * - Robots.txt configuration
 * - JSON-LD schemas on sample pages
 * - Metadata completeness
 * - Open Graph tags
 *
 * Usage:
 *   node validate-seo.js
 *
 * Or after making executable:
 *   chmod +x validate-seo.js
 *   ./validate-seo.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';
const USE_HTTPS = BASE_URL.startsWith('https');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`✓ ${message}`, colors.green);
}

function error(message) {
  log(`✗ ${message}`, colors.red);
}

function warning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function info(message) {
  log(`ℹ ${message}`, colors.cyan);
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = USE_HTTPS ? https : http;

    client.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data, headers: res.headers });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function validateSitemap() {
  info('\n=== Validating Sitemap ===');

  try {
    const { statusCode, data } = await fetchUrl(`${BASE_URL}/sitemap.xml`);

    if (statusCode === 200) {
      success('Sitemap is accessible');

      // Count URLs in sitemap
      const urlMatches = data.match(/<url>/g);
      const urlCount = urlMatches ? urlMatches.length : 0;

      if (urlCount > 0) {
        success(`Sitemap contains ${urlCount} URLs`);

        if (urlCount >= 100) {
          success('Expected ~100-120 pages found');
        } else {
          warning(`Expected ~100-120 pages, found ${urlCount}`);
        }
      } else {
        error('No URLs found in sitemap');
      }

      // Check for required pages
      const requiredPages = ['/services', '/locations', '/pricing', '/contact'];
      requiredPages.forEach(page => {
        if (data.includes(`<loc>${BASE_URL}${page}</loc>`)) {
          success(`Found ${page} in sitemap`);
        } else {
          error(`Missing ${page} in sitemap`);
        }
      });

    } else {
      error(`Sitemap returned status code ${statusCode}`);
    }
  } catch (err) {
    error(`Failed to fetch sitemap: ${err.message}`);
  }
}

async function validateRobots() {
  info('\n=== Validating Robots.txt ===');

  try {
    const { statusCode, data } = await fetchUrl(`${BASE_URL}/robots.txt`);

    if (statusCode === 200) {
      success('Robots.txt is accessible');

      // Check for sitemap reference
      if (data.includes('Sitemap:')) {
        success('Sitemap reference found in robots.txt');
      } else {
        error('No sitemap reference in robots.txt');
      }

      // Check for disallow directives
      const expectedDisallows = ['/api/', '/admin/', '/_next/'];
      expectedDisallows.forEach(path => {
        if (data.includes(`Disallow: ${path}`)) {
          success(`Disallow directive found for ${path}`);
        } else {
          warning(`Missing disallow directive for ${path}`);
        }
      });

      // Check for allow directive
      if (data.includes('Allow: /')) {
        success('Allow directive found');
      } else {
        warning('No explicit allow directive');
      }

    } else {
      error(`Robots.txt returned status code ${statusCode}`);
    }
  } catch (err) {
    error(`Failed to fetch robots.txt: ${err.message}`);
  }
}

async function validatePage(url, expectedSchemas = []) {
  info(`\n=== Validating ${url} ===`);

  try {
    const { statusCode, data } = await fetchUrl(url);

    if (statusCode === 200) {
      success('Page is accessible');

      // Check for title
      const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/);
      if (titleMatch && titleMatch[1]) {
        success(`Title: "${titleMatch[1]}"`);

        if (titleMatch[1].length < 30) {
          warning('Title is too short (< 30 characters)');
        } else if (titleMatch[1].length > 60) {
          warning('Title is too long (> 60 characters)');
        }
      } else {
        error('No title tag found');
      }

      // Check for meta description
      const descMatch = data.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
      if (descMatch && descMatch[1]) {
        success(`Description found (${descMatch[1].length} chars)`);

        if (descMatch[1].length < 120) {
          warning('Description is too short (< 120 characters)');
        } else if (descMatch[1].length > 160) {
          warning('Description is too long (> 160 characters)');
        }
      } else {
        error('No meta description found');
      }

      // Check for canonical URL
      if (data.includes('rel="canonical"')) {
        success('Canonical URL found');
      } else {
        error('No canonical URL found');
      }

      // Check for Open Graph tags
      const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
      ogTags.forEach(tag => {
        if (data.includes(`property="${tag}"`)) {
          success(`Open Graph tag found: ${tag}`);
        } else {
          warning(`Missing Open Graph tag: ${tag}`);
        }
      });

      // Check for Twitter Card tags
      if (data.includes('name="twitter:card"')) {
        success('Twitter Card tags found');
      } else {
        warning('No Twitter Card tags found');
      }

      // Check for JSON-LD schemas
      const jsonLdMatches = data.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi);

      if (jsonLdMatches && jsonLdMatches.length > 0) {
        success(`Found ${jsonLdMatches.length} JSON-LD schema(s)`);

        jsonLdMatches.forEach((match, index) => {
          try {
            const jsonMatch = match.match(/>([^<]+)</);
            if (jsonMatch && jsonMatch[1]) {
              const schema = JSON.parse(jsonMatch[1]);
              const schemaType = schema['@type'];

              if (schemaType) {
                success(`  Schema ${index + 1}: ${schemaType}`);

                // Check if expected schemas are present
                if (expectedSchemas.includes(schemaType)) {
                  success(`    ✓ Expected schema type found`);
                }
              }
            }
          } catch (e) {
            error(`  Schema ${index + 1}: Invalid JSON`);
          }
        });

        // Check for expected schemas
        expectedSchemas.forEach(expectedType => {
          const found = jsonLdMatches.some(match => match.includes(`"@type":"${expectedType}"`));
          if (found) {
            success(`Expected schema found: ${expectedType}`);
          } else {
            error(`Expected schema NOT found: ${expectedType}`);
          }
        });

      } else {
        error('No JSON-LD schemas found');
      }

    } else {
      error(`Page returned status code ${statusCode}`);
    }
  } catch (err) {
    error(`Failed to fetch page: ${err.message}`);
  }
}

async function main() {
  log('\n╔════════════════════════════════════════════╗', colors.blue);
  log('║   SEO Validation for Capture Client       ║', colors.blue);
  log('╚════════════════════════════════════════════╝', colors.blue);

  info(`\nValidating site: ${BASE_URL}`);
  info('Make sure the development server is running (npm run dev)');

  // Validate sitemap and robots.txt
  await validateSitemap();
  await validateRobots();

  // Validate homepage
  await validatePage(
    `${BASE_URL}/`,
    ['Organization', 'WebSite']
  );

  // Note: For dynamic pages, you'd need to fetch actual slugs
  info('\n=== Note ===');
  info('To validate location and service pages, please test manually:');
  info('1. Visit a location page (e.g., /locations/voice-ai-knoxville-tn)');
  info('2. View page source');
  info('3. Search for "application/ld+json"');
  info('4. Verify LocalBusiness, Service, FAQ, Breadcrumb schemas are present');
  info('');
  info('Use these tools for comprehensive validation:');
  info('• Google Rich Results Test: https://search.google.com/test/rich-results');
  info('• Schema.org Validator: https://validator.schema.org/');
  info('• Google Search Console: https://search.google.com/search-console');

  log('\n✓ Validation complete!', colors.green);
}

main().catch(err => {
  error(`\nValidation failed: ${err.message}`);
  process.exit(1);
});
