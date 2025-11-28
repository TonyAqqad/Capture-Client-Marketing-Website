# Marketing Agency Website Generator

A Claude Code multi-agent system that generates complete, SEO-optimized marketing agency websites with local and national SEO pages, lead capture forms, and package/pricing pages.

## What It Does

This system creates complete marketing agency websites for agencies that offer:
- **Voice AI / AI Voice Agents** for small businesses
- **Lead Generation** (Facebook Ads, Google Ads)
- **Local SEO** services
- Other digital marketing services

### Features

- **One-Shot Generation**: From agency info to deployed website in a single workflow
- **Local SEO Pages**: Service + Location combinations (e.g., "Voice AI Agency in Knoxville, TN")
- **National SEO Pages**: Keyword-targeted pages without location (e.g., "AI Voice Agents for Small Business")
- **Package/Pricing Pages**: Comparison and detail pages for pricing tiers
- **Lead Capture Forms**: On every page for maximum conversion
- **Unsplash Images**: Real, free images scraped via Jina AI
- **Parallel Generation**: Multiple agents create pages simultaneously
- **Playwright Testing**: Automated QA before deployment

## How It Works

1. **Input Collection**: Agency name, services, packages, target areas, Jina API key
2. **Design Generation**: Creates or uses provided HTML/CSS/JS design
3. **Target Area Discovery**: Finds local areas + creates keyword combinations
4. **Schema Creation**: Builds page templates for all content types
5. **Parallel Page Generation**: Multiple agents create 100+ pages with images
6. **NextJS Build**: Compiles everything into a production-ready website
7. **Testing**: Playwright validates all pages, forms, and SEO
8. **Deployment**: Pushes to GitHub, ready for Vercel/hosting

## Agents

| Agent | Purpose |
|-------|---------|
| `design-generator` | Creates HTML/CSS/JS design for marketing agencies |
| `target-area-generator` | Discovers locations + creates SEO keyword combos |
| `marketing-schema-creator` | Creates page schemas for services and packages |
| `marketing-page-generator` | Generates service/location/national pages (parallel) |
| `packages-page-generator` | Creates pricing/package pages |
| `nextjs-builder` | Builds complete NextJS website |
| `playwright-tester` | QA testing before deployment |

## Example Output

For a marketing agency in Tennessee offering Voice AI, Facebook Ads, Google Ads, and Local SEO:

- **80+ Local SEO Pages**: Service × Location combinations
- **10+ National SEO Pages**: Keyword-targeted content
- **4 Package Pages**: Comparison + 3 detail pages
- **Core Pages**: Home, About, Services, Contact
- **Total: 100+ SEO-optimized pages**

### Example Page Titles

**Local SEO:**
- "Voice AI Agency in Knoxville, TN | GrowthPulse Marketing"
- "Facebook Ads Agency Nashville | Lead Generation Experts"
- "Local SEO Services Chattanooga, TN | Rank #1 on Google Maps"

**National SEO:**
- "AI Voice Agents for Small Business | GrowthPulse Marketing"
- "Lead Generation Agency | Facebook & Google Ads Experts"
- "Voice AI for Lead Qualification | 24/7 AI Receptionist"

## Requirements

- Jina AI API key (for web scraping and Unsplash image gathering)
- Node.js 18+
- GitHub CLI (`gh`) for deployment

## Usage

Simply tell the orchestrator:

```
"Make me a marketing agency website"
```

Then provide:
1. Agency name
2. Services offered
3. Package/pricing information
4. Target areas for local SEO
5. Jina API key
6. Optional: HTML/CSS/JS design

The system handles everything else automatically.

## Skills

The `frontend-aesthetics` skill prevents "AI slop" designs by:
- Avoiding Inter, Roboto, and generic fonts
- Using distinctive typography (Plus Jakarta Sans, Outfit, etc.)
- Creating bold color palettes (no purple gradients on white)
- Adding meaningful animations and backgrounds

## Output

- Complete NextJS project
- 100+ SEO-optimized pages
- Lead capture forms on every page
- Mobile-responsive design
- GitHub repository
- Ready for Vercel deployment

---

Built with Claude Code Multi-Agent Architecture
