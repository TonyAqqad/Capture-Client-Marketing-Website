# Advanced Schema Implementation Report

## Summary

Comprehensive JSON-LD structured data has been implemented across the Capture Client website to maximize visibility in Google Search and enable rich snippets.

## Files Created

### 1. Global Schema Configuration
**File:** `C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src/config/global-schema.json`

Contains the foundational schemas that define the business:
- **Organization Schema** - Complete business information, services offered, ratings
- **WebSite Schema** - Site identity with SearchAction for sitelinks search box
- **LocalBusiness Schema** - Physical location, service area, operating hours

### 2. Advanced Schema Generators
**File:** `C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src/lib/advanced-schemas.ts`

New schema generator functions:
- `generateHowToSchema()` - For "How It Works" sections
- `generateVideoSchema()` - For embedded videos
- `generateSoftwareApplicationSchema()` - For platform features
- `generateCollectionPageSchema()` - For listing pages
- `generateLocationServiceSchema()` - Enhanced service+location schema
- `generateEventSchema()` - For webinars/demos
- `generateSpecialAnnouncementSchema()` - For promotions
- `generateTestimonialsSchema()` - For review collections
- Pre-built `VoiceAIHowToSchema` and `LeadGenerationHowToSchema`

## Files Modified

### 1. Homepage (`/src/app/page.tsx`)
**Schemas Added:**
- FAQPage Schema (5 questions from PremiumFAQ component)
- LocalBusiness Schema with geo coordinates

**Existing Schemas:**
- Organization Schema
- WebSite Schema with SearchAction

### 2. Services Listing Page (`/src/app/services/page.tsx`)
**Schemas Added:**
- CollectionPage Schema for service listings
- BreadcrumbList Schema

### 3. Individual Service Pages (`/src/app/services/[slug]/page.tsx`)
**Schemas Added:**
- HowTo Schema (from process steps)

**Existing Schemas:**
- Service Schema
- Breadcrumb Schema
- WebPage Schema
- FAQPage Schema (if FAQs exist)

### 4. Locations Listing Page (`/src/app/locations/page.tsx`)
**Schemas Added:**
- CollectionPage Schema for location listings
- BreadcrumbList Schema
- LocalBusiness Schema with areaServed

### 5. Individual Location Pages (`/src/app/locations/[slug]/page.tsx`)
**Schemas Added:**
- HowTo Schema (from how_it_works data)
- Enhanced LocationService Schema with benefits

**Existing Schemas:**
- LocalBusiness Schema
- Service Schema
- Breadcrumb Schema
- WebPage Schema
- FAQPage Schema (if FAQs exist)

## Schema Types Implemented

| Schema Type | Pages | Purpose |
|------------|-------|---------|
| Organization | Homepage | Core business identity |
| LocalBusiness | Homepage, Locations | Local SEO, Google Maps |
| WebSite | Homepage | Sitelinks search box |
| FAQPage | Homepage, FAQ, Services, Locations | FAQ rich snippets |
| Service | Services, Locations | Service rich results |
| CollectionPage | Services listing, Locations listing | ItemList for navigation |
| BreadcrumbList | All pages | Breadcrumb rich snippets |
| WebPage | All pages | Page-level metadata |
| HowTo | Services, Locations | How-to rich snippets |
| Product | Pricing | Pricing rich snippets |
| BlogPosting | Blog posts | Article rich results |
| ItemList | Features, Pricing | List-based rich results |
| SoftwareApplication | Features | App store/software results |

## Sample Schema JSON

### Organization Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Capture Client",
  "url": "https://captureclientai.net",
  "logo": "https://captureclientai.net/logo-full.png",
  "telephone": "+1-865-346-3339",
  "email": "team@captureclientai.net",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Knoxville",
    "addressRegion": "TN",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "State", "name": "Tennessee" },
    { "@type": "State", "name": "Georgia" },
    { "@type": "State", "name": "North Carolina" },
    { "@type": "State", "name": "Kentucky" },
    { "@type": "State", "name": "Virginia" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```

### HowTo Schema (Service/Location Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get Started with Voice AI in Knoxville",
  "description": "Step-by-step guide to implementing Voice AI for your Knoxville business.",
  "totalTime": "P2W",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Schedule Free Strategy Call",
      "text": "Book a 15-minute call to discuss your needs..."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Custom AI Training",
      "text": "We train your AI with your business info..."
    }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "AI Voice Agent Platform" },
    { "@type": "HowToTool", "name": "Business Phone Number" }
  ]
}
```

### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will the AI voice agent sound robotic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not at all! Our AI uses cutting-edge natural language processing..."
      }
    }
  ]
}
```

### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Capture Client",
  "telephone": "+1-865-346-3339",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Knoxville",
    "addressRegion": "TN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.9606,
    "longitude": -83.9207
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

## Validation Status

All schemas are designed to pass validation at:
- https://validator.schema.org/
- https://search.google.com/test/rich-results

## Rich Snippet Eligibility

| Rich Result Type | Eligible Pages |
|-----------------|----------------|
| FAQ Rich Results | Homepage, FAQ page, Service pages, Location pages |
| How-To Rich Results | Service pages, Location pages |
| Breadcrumb | All pages |
| Sitelinks Search Box | Homepage |
| Local Business Panel | Homepage, Location pages |
| Product/Pricing | Pricing page |
| Article | Blog posts |

## Recommendations

1. **Add Real Reviews**: Replace placeholder aggregateRating with real Google Business Profile reviews
2. **Add Video Schema**: When demo videos are added, use `generateVideoSchema()`
3. **Event Schema**: Use for upcoming webinars or live demos
4. **Monitor in GSC**: Check Google Search Console for schema validation and rich result performance
5. **Test with Rich Results Tool**: Validate each page type at https://search.google.com/test/rich-results

## Technical Notes

- All schemas use the `@id` pattern for entity references, allowing schemas to interlink
- The `SITE_CONFIG` constant in `seo-config.ts` centralizes URL and business info
- Schemas are injected via `<script type="application/ld+json">` tags in page components
- The `JsonLd` component handles array-based schema injection for dynamic pages
