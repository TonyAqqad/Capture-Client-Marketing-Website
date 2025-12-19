# OPTIMIZED METADATA CODE REFERENCE

## Quick Copy-Paste Patterns for Service Page Metadata

---

## 1. MAIN SERVICES PAGE METADATA

**File:** `capture-client-site/src/app/services/page.tsx`

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Services for Small Business | Voice AI, Ads & Lead Gen | Capture Client",
  description:
    "Never miss a lead again. 24/7 AI voice agents, ROI-focused Google Ads, Facebook Ads, and lead generation services for small businesses. Trusted by 500+ companies. Free consultation: (865) 346-3339",
  keywords: [
    "marketing services small business",
    "voice ai for business",
    "google ads management",
    "facebook ads agency",
    "lead generation services",
    "ai voice agents",
    "small business marketing",
    "24/7 call answering",
    "automated lead generation"
  ],
  openGraph: {
    title: "Marketing Services for Small Business | Never Miss a Lead",
    description:
      "Voice AI agents that answer every call, Google Ads & Facebook Ads that generate qualified leads. Trusted by 500+ small businesses. Book your free consultation today.",
    url: "https://captureclient.net/services",
    type: "website",
    images: [
      {
        url: "https://captureclient.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capture Client Marketing Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Services for Small Business | Voice AI & Lead Generation",
    description:
      "24/7 AI voice agents, professional Google Ads & Facebook Ads management. Trusted by 500+ businesses.",
  },
  alternates: {
    canonical: "https://captureclient.net/services",
  },
};
```

---

## 2. INDIVIDUAL SERVICE PAGE METADATA (Dynamic)

**File:** `capture-client-site/src/app/services/[slug]/page.tsx`

The existing implementation already pulls from optimized JSON files:

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const pageUrl = `${SITE_CONFIG.url}/services/${service.service.service_slug}`;
  const ogImageUrl = service.hero?.hero_image?.url || `${SITE_CONFIG.url}/og-image.jpg`;

  return {
    title: service.seo.page_title,
    description: service.seo.meta_description,
    keywords: service.seo.keywords,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: service.seo.og_title || service.seo.page_title,
      description: service.seo.og_description || service.seo.meta_description,
      url: pageUrl,
      type: "website",
      locale: "en_US",
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: service.service.service_name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: service.seo.page_title,
      description: service.seo.meta_description,
      images: [ogImageUrl],
    },

    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}
```

---

## 3. SERVICE JSON SCHEMA (Enhanced SEO Fields)

**Template for new services:**

```json
{
  "page_id": "service-slug",
  "page_type": "service",
  "service": {
    "service_id": "service-slug",
    "service_name": "Service Name",
    "service_slug": "service-slug"
  },
  "seo": {
    "page_title": "[Service Name] for Small Business | [Key Benefit] | Capture Client",
    "meta_description": "[Pain point]? [Solution]. [Benefit 1]. [Benefit 2]. [Trust signal]. Free [CTA]: (865) 346-3339",
    "h1_heading": "Compelling Headline with Primary Benefit",
    "primary_benefit": "Key Benefit for Title",
    "pain_point": "Customer pain point question or statement",
    "solution": "How we solve the problem",
    "keywords": [
      "primary keyword",
      "secondary keyword",
      "long-tail keyword",
      "service + location",
      "service + industry"
    ],
    "canonical_url": "/service-slug",
    "og_title": "[Service Name] | [Benefit Statement]",
    "og_description": "[Solution]. [Benefits]. [Trust signal]. [CTA]."
  }
}
```

---

## 4. OPTIMIZED SERVICE EXAMPLES

### Voice AI Service
```json
{
  "seo": {
    "page_title": "Voice AI Agents for Small Business | 24/7 Lead Capture | Capture Client",
    "meta_description": "Missing calls and losing leads? AI voice agents answer 24/7, qualify prospects, book appointments automatically. Handle unlimited calls. Trusted by 500+ businesses. Free demo: (865) 346-3339",
    "h1_heading": "Never Miss Another Call. Never Lose Another Lead.",
    "primary_benefit": "24/7 Lead Capture",
    "pain_point": "Missing calls and losing leads",
    "solution": "AI voice agents answer 24/7, qualify prospects automatically"
  }
}
```

### Google Ads Service
```json
{
  "seo": {
    "page_title": "Google Ads Management | ROI-Focused PPC for Service Businesses | Capture Client",
    "meta_description": "Wasting money on Google Ads? We manage ROI-focused campaigns that generate qualified leads, not just clicks. Google Partner certified. 4:1 average ROAS. Free strategy call: (865) 346-3339",
    "h1_heading": "Get More Leads from Google. Spend Less. Grow Faster.",
    "primary_benefit": "ROI-Focused PPC",
    "pain_point": "Wasting money on Google Ads",
    "solution": "We manage campaigns that generate qualified leads, not just clicks"
  }
}
```

### Facebook Ads Service
```json
{
  "seo": {
    "page_title": "Facebook Ads Agency | Lower Cost Leads for Contractors | Capture Client",
    "meta_description": "Wasting budget on Facebook Ads that don't convert? Expert Meta advertising generates high-quality leads 50-70% cheaper than Google Ads. Lookalike audiences, retargeting. Free strategy: (865) 346-3339",
    "h1_heading": "Turn Facebook & Instagram into Your Best Lead Source",
    "primary_benefit": "Lower Cost Leads",
    "pain_point": "Wasting budget on Facebook Ads that don't convert",
    "solution": "Expert campaigns generate leads 50-70% cheaper than Google Ads"
  }
}
```

### Lead Generation Service
```json
{
  "seo": {
    "page_title": "Lead Generation Services | Predictable Growth for Small Business | Capture Client",
    "meta_description": "Stop chasing leads. Let them come to you. Professional Google & Facebook Ads management delivers qualified prospects ready to buy. 3-5x ROI within 90 days. Free consultation: (865) 346-3339",
    "h1_heading": "Stop Chasing Leads. Let Them Come to You.",
    "primary_benefit": "Predictable Growth",
    "pain_point": "Stop chasing leads",
    "solution": "Professional campaigns deliver qualified prospects automatically"
  }
}
```

---

## 5. TITLE TAG FORMULAS

### Formula 1: Pain Point + Benefit
```
[Service Name] for [Audience] | [Key Benefit] | Capture Client
```
Example: "Voice AI Agents for Small Business | 24/7 Lead Capture | Capture Client"

### Formula 2: Service + Industry
```
[Service Name] | [Benefit] for [Industry] | Capture Client
```
Example: "Facebook Ads Agency | Lower Cost Leads for Contractors | Capture Client"

### Formula 3: Service + Location (for location pages)
```
[Service Name] in [City, State] | [Benefit] | Capture Client
```
Example: "Voice AI Agency in Knoxville, TN | 24/7 AI Receptionist | Capture Client"

---

## 6. META DESCRIPTION FORMULAS

### Formula 1: Question-Based (Pain Point)
```
[Pain point question]? [Solution]. [Benefit 1]. [Benefit 2]. [Trust signal]. Free [CTA]: (865) 346-3339
```
Example: "Missing calls and losing leads? AI voice agents answer 24/7, qualify prospects, book appointments automatically. Trusted by 500+ businesses. Free demo: (865) 346-3339"

### Formula 2: Statement-Based
```
[Pain statement]. [Solution]. [Benefit 1]. [Benefit 2]. [Trust signal]. Free [CTA]: (865) 346-3339
```
Example: "Stop chasing leads. Let them come to you. Professional campaigns deliver qualified prospects. 3-5x ROI within 90 days. Free consultation: (865) 346-3339"

### Formula 3: Comparison-Based
```
[Current problem]? [Our solution] [comparison to alternative]. [Benefit]. [Trust signal]. [CTA + phone].
```
Example: "Wasting budget on Facebook Ads? Expert campaigns generate leads 50-70% cheaper than Google Ads. Lookalike audiences, retargeting. Free strategy: (865) 346-3339"

---

## 7. H1 HEADLINE FORMULAS

### Formula 1: Double Benefit
```
[Negative outcome eliminated]. [Positive outcome achieved].
```
Example: "Never Miss Another Call. Never Lose Another Lead."

### Formula 2: Triple Benefit
```
[Benefit 1]. [Benefit 2]. [Benefit 3].
```
Example: "Get More Leads from Google. Spend Less. Grow Faster."

### Formula 3: Transformation Statement
```
Turn [Current State] into [Desired State]
```
Example: "Turn Facebook & Instagram into Your Best Lead Source"

### Formula 4: Command with Benefit
```
Stop [Negative]. [Positive Action].
```
Example: "Stop Chasing Leads. Let Them Come to You."

---

## 8. KEYWORDS ARRAY STRUCTURE

```json
"keywords": [
  // Primary keyword (exact match)
  "voice ai",
  "ai voice agents",

  // Service variations
  "ai receptionist",
  "automated phone answering",
  "24/7 call answering",

  // Service + industry
  "ai phone system for small business",
  "virtual receptionist",

  // Service + use case
  "lead qualification ai",
  "appointment scheduling ai",

  // Long-tail keywords
  "ai answering service",
  "business phone automation",
  "conversational ai",
  "ai customer service"
]
```

---

## 9. OPEN GRAPH OPTIMIZATION

```typescript
openGraph: {
  title: "[Service Name] | [Benefit Statement]",  // Shorter than page title
  description: "[Solution]. [Benefits]. [Trust signal].",  // No phone number for social
  url: "https://captureclient.net/services/[slug]",
  type: "website",
  locale: "en_US",
  siteName: "Capture Client",
  images: [
    {
      url: "https://captureclient.net/og-image-service.jpg",
      width: 1200,
      height: 630,
      alt: "[Service Name] - Capture Client"
    }
  ]
}
```

---

## 10. TWITTER CARD OPTIMIZATION

```typescript
twitter: {
  card: "summary_large_image",
  site: "@captureclient",
  creator: "@captureclient",
  title: "[Service Name] | [Key Benefit]",
  description: "[Solution]. [Benefit 1]. [Benefit 2].",
  images: ["https://captureclient.net/twitter-card-service.jpg"]
}
```

---

## 11. COMMON PAIN POINTS BY SERVICE TYPE

### Voice AI / AI Receptionist
- "Missing calls and losing leads?"
- "Can't answer every call?"
- "Sending callers to voicemail?"
- "Losing leads after hours?"

### Google Ads / PPC
- "Wasting money on Google Ads?"
- "Not getting ROI from paid search?"
- "High cost per click, low conversions?"
- "Google Ads not working?"

### Facebook Ads / Social Media
- "Wasting budget on Facebook Ads that don't convert?"
- "Facebook Ads not generating leads?"
- "Can't target the right audience?"
- "Low engagement on ads?"

### Lead Generation
- "Stop chasing leads"
- "Tired of inconsistent lead flow?"
- "Not enough qualified prospects?"
- "Leads going to competitors?"

---

## 12. TRUST SIGNALS TO INCLUDE

### Credibility
- "Trusted by 500+ businesses"
- "Google Partner certified"
- "Meta Business Partner"
- "BBB Accredited"
- "SOC-II compliant"

### Social Proof
- "50,000+ calls handled"
- "97% customer satisfaction"
- "4:1 average ROAS"
- "3-5x ROI within 90 days"

### Performance Metrics
- "Handle unlimited calls"
- "24/7 availability"
- "15-25% conversion rates"
- "50-70% cheaper than alternatives"

---

## 13. CALL-TO-ACTION VARIATIONS

### Phone CTAs
```
Free consultation: (865) 346-3339
Free demo: (865) 346-3339
Free strategy call: (865) 346-3339
Free audit: (865) 346-3339
Book free consultation: (865) 346-3339
```

### Link CTAs (for social media)
```
Book your free consultation today
Get your free audit
Start your free trial
See how it works
Request a demo
```

---

## 14. CHARACTER LIMITS

### Title Tags
- **Optimal:** 50-60 characters
- **Maximum:** 70 characters (Google cutoff)
- **Mobile:** 55 characters (displays fully)

### Meta Descriptions
- **Optimal:** 150-160 characters
- **Maximum:** 160 characters (Google cutoff)
- **Mobile:** 120 characters (displays fully)

### H1 Headlines
- **Optimal:** 40-70 characters
- **Maximum:** No limit, but shorter is better for impact

---

## 15. TESTING CHECKLIST

Before deploying metadata changes:

- [ ] Title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] Phone number included in description
- [ ] Pain point or benefit in title
- [ ] Trust signal in description
- [ ] CTA in description
- [ ] Keywords array populated
- [ ] Open Graph tags complete
- [ ] Twitter Card tags complete
- [ ] Canonical URL set
- [ ] Image URLs valid
- [ ] No typos or grammatical errors

---

## DEPLOYMENT NOTES

All optimizations are now live in:
- `capture-client-site/src/app/services/page.tsx`
- `capture-client-site/src/data/services/*.json`

The dynamic page generator (`services/[slug]/page.tsx`) automatically pulls optimized metadata from the JSON files.

No code changes needed - just update the JSON files for any new services following the patterns above.
