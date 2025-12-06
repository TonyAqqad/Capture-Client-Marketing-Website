# JSON-LD Schema Quick Reference Guide

**For Capture Client Developers**

---

## Rule #1: Never Duplicate Organization or WebSite Schemas

### ❌ WRONG - Duplicating global schemas
```typescript
// DON'T DO THIS in page.tsx files!
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Capture Client",
  // ...
};
```

### ✅ CORRECT - Use only page-specific schemas
```typescript
// In any page.tsx file
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...]
};
```

---

## Global Schemas (layout.tsx ONLY)

**File:** `capture-client-site/src/app/layout.tsx`

```typescript
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo-config";

const organizationSchema = generateOrganizationSchema();
const websiteSchema = generateWebSiteSchema();

<JsonLd schema={[organizationSchema, websiteSchema]} />
```

**Rendered on EVERY page:**
1. Organization schema
2. WebSite schema

---

## Page-Specific Schemas (Use These!)

### Homepage
```typescript
// src/app/page.tsx
const faqSchema = { "@type": "FAQPage", ... };
const localBusinessSchema = { "@type": "LocalBusiness", ... };
const softwareSchema = generateSoftwareApplicationSchema();
```

### Service Pages
```typescript
// src/app/services/[slug]/page.tsx
import { generateServiceSchema } from "@/lib/seo-config";

const serviceSchema = generateServiceSchema(serviceData);
```

### Location Pages
```typescript
// src/app/locations/[slug]/page.tsx
import { generateLocalBusinessSchema } from "@/lib/seo-config";

const localBusinessSchema = generateLocalBusinessSchema(locationData);
```

### Blog Posts
```typescript
// src/app/blog/[slug]/page.tsx
import { generateBlogPostingSchema } from "@/lib/seo-config";

const blogPostSchema = generateBlogPostingSchema(post);
```

### Contact Page
```typescript
// src/app/contact/page.tsx
const contactPageSchema = { "@type": "ContactPage", ... };
const localBusinessSchema = { "@type": "LocalBusiness", ... };
```

### About Page
```typescript
// src/app/about/page.tsx
const aboutPageSchema = { "@type": "AboutPage", ... };
```

---

## Schema Rendering Patterns

### Single Schema
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### Multiple Schemas
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      faqSchema,
      localBusinessSchema,
      serviceSchema,
    ])
  }}
/>
```

---

## Helper Functions (src/lib/seo-config.ts)

| Function | Returns | Use Case |
|----------|---------|----------|
| `generateOrganizationSchema()` | Organization | **GLOBAL ONLY** (layout.tsx) |
| `generateWebSiteSchema()` | WebSite | **GLOBAL ONLY** (layout.tsx) |
| `generateServiceSchema(serviceData)` | Service | Service pages |
| `generateLocalBusinessSchema(locationData)` | LocalBusiness | Location pages |
| `generateBlogPostingSchema(post)` | BlogPosting | Blog posts |
| `generateFAQSchema(faqs)` | FAQPage | Pages with FAQs |
| `generateProductSchema(packageData)` | Product | Pricing pages |
| `generateSoftwareApplicationSchema()` | SoftwareApplication | Platform pages |

---

## Schema @id References

When referencing global schemas from page-specific schemas:

```typescript
const localBusinessSchema = {
  "@type": "LocalBusiness",
  parentOrganization: {
    "@type": "Organization",
    "@id": "https://captureclientai.net/#organization"  // Reference global schema
  }
};

const contactPageSchema = {
  "@type": "ContactPage",
  about: {
    "@id": "https://captureclientai.net/#organization"  // Reference global schema
  },
  isPartOf: {
    "@id": "https://captureclientai.net/#website"  // Reference global schema
  }
};
```

---

## Canonical URLs

**ALWAYS set canonical URLs in page metadata:**

```typescript
export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: {
    canonical: "https://captureclientai.net/[page-path]",  // Required!
  },
};
```

---

## Open Graph Tags

**ALWAYS include OG tags:**

```typescript
export const metadata: Metadata = {
  openGraph: {
    title: "...",
    description: "...",
    url: "https://captureclientai.net/[page-path]",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclientai.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "...",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    images: ["https://captureclientai.net/og-image.jpg"],
  },
};
```

---

## Common Schema Types by Page

| Page Type | Schema Types to Use |
|-----------|-------------------|
| Homepage | FAQPage, LocalBusiness, SoftwareApplication |
| About | AboutPage |
| Contact | ContactPage, LocalBusiness |
| Services | Service |
| Locations | LocalBusiness, Service |
| Blog Post | BlogPosting |
| Blog Index | Blog (collection) |
| Pricing | Product (per package) |
| Integration | Service |
| Industry | Service |

---

## Testing Your Schemas

### 1. Google Rich Results Test
```
https://search.google.com/test/rich-results
```
Paste your page URL → Check for errors

### 2. Schema Markup Validator
```
https://validator.schema.org/
```
Paste your JSON-LD → Validate structure

### 3. Check for Duplicates
```bash
# Search for Organization schemas
grep -r "@type.*Organization" src/app/

# Search for WebSite schemas
grep -r "@type.*WebSite" src/app/
```

**Expected results:**
- Organization: Should ONLY appear in `layout.tsx`
- WebSite: Should ONLY appear in `layout.tsx`

---

## Quick Checklist for New Pages

When creating a new page:

- [ ] Add proper `metadata` export
- [ ] Set canonical URL in `alternates.canonical`
- [ ] Add OpenGraph tags
- [ ] Add Twitter Card tags
- [ ] Add page-specific JSON-LD schema (if applicable)
- [ ] **DO NOT** add Organization or WebSite schemas
- [ ] Reference global schemas using `@id` if needed
- [ ] Test with Google Rich Results Test
- [ ] Validate with Schema Markup Validator

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Duplicating Organization Schema
```typescript
// DON'T DO THIS in page files!
const organizationSchema = {
  "@type": "Organization",
  name: "Capture Client"
};
```

### ❌ Mistake 2: Forgetting Canonical URLs
```typescript
export const metadata: Metadata = {
  title: "...",
  description: "...",
  // Missing canonical!
};
```

### ❌ Mistake 3: Wrong @id References
```typescript
// WRONG - missing #organization anchor
"@id": "https://captureclientai.net/"

// CORRECT
"@id": "https://captureclientai.net/#organization"
```

### ❌ Mistake 4: No OG Images
```typescript
openGraph: {
  title: "...",
  // Missing images!
}
```

---

## Need to Add a New Schema Type?

1. **Check if it's global or page-specific:**
   - Global (Organization, WebSite) → Add to `layout.tsx`
   - Page-specific (all others) → Add to specific page

2. **Create helper function in `src/lib/seo-config.ts`:**
```typescript
export function generateMyNewSchema(data: MyData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MySchemaType',
    // ... schema properties
  };
}
```

3. **Use in page:**
```typescript
import { generateMyNewSchema } from "@/lib/seo-config";

const mySchema = generateMyNewSchema(data);
```

---

## Questions?

- Check `src/lib/seo-config.ts` for all available schema generators
- Reference `JSON_LD_DEDUPLICATION_AUDIT_REPORT.md` for detailed explanation
- Test all changes with Google Rich Results Test

**Remember:** Organization and WebSite schemas go in `layout.tsx` ONLY!
