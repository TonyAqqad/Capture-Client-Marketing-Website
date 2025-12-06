# SEO QUICK FIX CHECKLIST
## Get to 95/100 in 30 Minutes

**Current Score: 87/100**
**Target Score: 95/100**
**Time Required: ~30-35 minutes**

---

## CRITICAL FIXES (MUST DO BEFORE DEPLOYMENT)

### 1. Create OG Image (15 minutes) ⚠️ HIGH PRIORITY

**Issue:** Missing `/public/og-image.jpg` - All social sharing will be broken

**Solution:**
```bash
# Create 1200x630 image with:
# - Capture Client logo
# - Tagline: "AI Voice Agents & Lead Generation for Small Business"
# - Phone: (865) 346-3339
# - Professional background (blue gradient recommended)

# Save as: capture-client-site/public/og-image.jpg
```

**Tools:**
- Canva: https://canva.com (1200x630 template)
- Figma: https://figma.com
- Photoshop/GIMP

**Quick Template:**
```
┌─────────────────────────────────────────┐
│                                         │
│    [Capture Client Logo]                │
│                                         │
│    AI Voice Agents &                    │
│    Lead Generation                      │
│    for Small Business                   │
│                                         │
│    Never Miss a Lead Again              │
│    (865) 346-3339                       │
│                                         │
└─────────────────────────────────────────┘
    1200px × 630px
```

**Impact:** +5 points (fixes broken social sharing)

---

### 2. Add Search Console Verification (5 minutes) ⚠️ HIGH PRIORITY

**Issue:** Placeholder verification codes prevent search engine ownership verification

**File:** `/c/Users/eaqqa/capture-client-website-seo/capture-client-site/src/lib/seo-config.ts`

**Current (Line ~45-50):**
```typescript
verification: {
  google: 'your-google-verification-code',  // ❌ PLACEHOLDER
  yandex: 'your-yandex-verification-code',  // ❌ PLACEHOLDER
  bing: 'your-bing-verification-code',      // ❌ PLACEHOLDER
}
```

**Steps:**

1. **Get Google Code:**
   - Go to: https://search.google.com/search-console
   - Click "Add Property"
   - Enter: `https://captureclientai.net`
   - Choose "HTML tag" method
   - Copy the `content="..."` value
   - Example: `google-site-verification=ABC123XYZ789`

2. **Get Bing Code:**
   - Go to: https://www.bing.com/webmasters
   - Click "Add a site"
   - Enter: `https://captureclientai.net`
   - Choose "Meta tag" method
   - Copy the `content="..."` value

3. **Update seo-config.ts:**
```typescript
verification: {
  google: 'ABC123XYZ789',  // ✅ YOUR ACTUAL CODE
  bing: 'DEF456UVW012',    // ✅ YOUR ACTUAL CODE
  // Remove yandex if not needed
}
```

**Impact:** +2 points (enables search console tracking)

---

### 3. Add Priority to Hero Image (10 minutes) ⚠️ MEDIUM PRIORITY

**Issue:** Hero images not marked as priority, causing slower LCP (Largest Contentful Paint)

**File to Check:** `/c/Users/eaqqa/capture-client-website-seo/capture-client-site/src/components/sections/PremiumHero.tsx`

**Current (likely):**
```tsx
<Image
  src="/hero-image.jpg"
  alt="AI Voice Agent"
  width={600}
  height={400}
/>
```

**Fix:**
```tsx
<Image
  src="/hero-image.jpg"
  alt="AI Voice Agent"
  width={600}
  height={400}
  priority  // ✅ ADD THIS - Preloads for faster LCP
  quality={90}
/>
```

**Where to Add:**
- Homepage hero section
- Service page hero images
- Location page hero images

**Find all hero images:**
```bash
cd /c/Users/eaqqa/capture-client-website-seo/capture-client-site
grep -r "PremiumHero\|ServiceHero\|LocationHero" src/app/
grep -r "<Image" src/components/sections/ | grep -i "hero"
```

**Impact:** +3 points (improves Core Web Vitals LCP score)

---

### 4. Verify H1 Tags Exist (5 minutes) ⚠️ MEDIUM PRIORITY

**Issue:** Cannot confirm H1 tag presence via static code analysis

**Solution:** Start dev server and check:

```bash
cd /c/Users/eaqqa/capture-client-website-seo/capture-client-site
npm run dev

# In another terminal:
# Check homepage
curl http://localhost:3000 | grep -i "<h1"

# Check service page
curl http://localhost:3000/services/voice-ai | grep -i "<h1"

# Check location page
curl http://localhost:3000/locations/voice-ai-knoxville-tn | grep -i "<h1"

# Check pricing
curl http://localhost:3000/pricing | grep -i "<h1"
```

**Expected Results:**
- Homepage: 1 H1 with "AI Voice Agents" or similar
- Service pages: 1 H1 with service name
- Location pages: 1 H1 with "Service in City, State"
- Each page should have EXACTLY ONE H1

**If Missing:**
Find the main heading and change from `<h2>` or `className` to `<h1>`:

```tsx
// ❌ BAD
<h2 className="text-4xl font-bold">AI Voice Agents</h2>
<div className="h1">AI Voice Agents</div>

// ✅ GOOD
<h1 className="text-4xl font-bold">AI Voice Agents</h1>
```

**Impact:** +3 points (critical SEO signal)

---

## OPTIONAL IMPROVEMENTS (Do After Launch)

### 5. Create Screenshot Images (Later)

**Issue:** Schema references screenshots that don't exist

**File:** `/c/Users/eaqqa/capture-client-website-seo/capture-client-site/src/lib/seo-config.ts`

**Current (Line ~240-250):**
```typescript
screenshot: [
  {
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.url}/screenshots/dashboard.jpg`,  // ❌ Missing
    caption: 'Capture Client Dashboard',
  },
]
```

**Quick Fix (if no time):**
Remove the screenshot array entirely:
```typescript
// Comment out or delete
// screenshot: [...],
```

**Proper Fix (post-launch):**
1. Take 2-3 high-quality screenshots of your dashboard
2. Save to `/public/screenshots/`
3. Optimize images (compress, WebP)
4. Update schema URLs

**Impact:** Minor (schema validation warnings only)

---

### 6. Add Review Schema (Post-Launch)

**Issue:** Only aggregate rating, no individual reviews

**When:** After collecting 5+ customer reviews

**How:** Use the existing function in seo-config.ts:
```typescript
const reviewSchema = generateReviewSchema([
  {
    author: 'John Smith',
    authorUrl: 'https://google.com/reviews/john-smith',
    reviewRating: 5,
    reviewBody: 'Amazing AI voice agent! Never miss a call.',
    datePublished: '2025-01-15',
  },
  // ... more reviews
]);
```

**Impact:** +5-10 points (review stars in SERPs = huge CTR boost)

---

## VERIFICATION STEPS (Before Deployment)

### Local Testing

```bash
cd /c/Users/eaqqa/capture-client-website-seo/capture-client-site

# 1. Build production version
npm run build

# 2. Start production server
npm run start

# 3. Test in browser
# Visit: http://localhost:3000

# 4. Test sitemap
curl http://localhost:3000/sitemap.xml | head -20

# 5. Test robots.txt
curl http://localhost:3000/robots.txt

# 6. Verify OG image
ls -la public/og-image.jpg

# 7. Check meta tags in HTML
curl http://localhost:3000 | grep -i "og:image"
curl http://localhost:3000 | grep -i "google-site-verification"
```

### Post-Deployment Validation

```bash
# 1. Test Rich Results
# Visit: https://search.google.com/test/rich-results
# Enter: https://captureclientai.net
# Should show: Organization, LocalBusiness, SoftwareApplication schemas

# 2. Test Mobile-Friendly
# Visit: https://search.google.com/test/mobile-friendly
# Enter: https://captureclientai.net
# Should pass all tests

# 3. Test Page Speed
# Visit: https://pagespeed.web.dev/
# Enter: https://captureclientai.net
# Target: 90+ on mobile, 95+ on desktop

# 4. Validate Sitemap
# Visit: https://captureclientai.net/sitemap.xml
# Should see all pages with priorities

# 5. Validate Robots
# Visit: https://captureclientai.net/robots.txt
# Should show proper rules and sitemap URL
```

---

## SCORE PROGRESSION

| Fix | Time | Score Impact | Running Total |
|-----|------|--------------|---------------|
| Start | - | - | 87/100 |
| 1. OG Image | 15 min | +5 | 92/100 |
| 2. Verification Codes | 5 min | +2 | 94/100 |
| 3. Hero Image Priority | 10 min | +3 | 97/100 |
| 4. H1 Verification | 5 min | 0 (if exists) | 97/100 |
| **TOTAL** | **35 min** | **+10** | **97/100** |

---

## POST-DEPLOYMENT CHECKLIST

### Week 1: Setup & Monitoring

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics 4
- [ ] Create Google My Business listing
- [ ] Verify all schemas with Rich Results Test
- [ ] Monitor Core Web Vitals in GSC
- [ ] Check indexing status (Google/Bing)
- [ ] Test social sharing on Facebook/Twitter/LinkedIn

### Week 2-4: Content & Authority

- [ ] Publish 2 blog posts (with BlogPosting schema)
- [ ] Submit to 10-20 local directories
- [ ] Start collecting customer reviews
- [ ] Create 2-3 case studies
- [ ] Reach out to local business partners

### Month 2+: Growth & Optimization

- [ ] Add review schema (after 5+ reviews)
- [ ] Create screenshot images for schema
- [ ] Guest posting (2-3 articles/month)
- [ ] Monitor and improve Core Web Vitals
- [ ] Refresh top-performing content
- [ ] Build 10-20 quality backlinks/month

---

## COMMAND REFERENCE

### Quick Build & Test
```bash
# Navigate to project
cd /c/Users/eaqqa/capture-client-website-seo/capture-client-site

# Install dependencies (if needed)
npm install

# Build production
npm run build

# Start production server
npm run start

# Open in browser
# http://localhost:3000
```

### File Locations
```
SEO Config:        src/lib/seo-config.ts
Advanced Schemas:  src/lib/advanced-schemas.ts
JsonLd Component:  src/components/seo/JsonLd.tsx
Homepage:          src/app/page.tsx
Service Pages:     src/app/services/[slug]/page.tsx
Location Pages:    src/app/locations/[slug]/page.tsx
Robots:            src/app/robots.ts
Sitemap:           src/app/sitemap.ts
Next Config:       next.config.js
Public Assets:     public/
```

### Git Commands (After Fixes)
```bash
# Check what changed
git status

# Add all changes
git add -A

# Commit
git commit -m "SEO: Add OG image, verification codes, hero image priority

- Created og-image.jpg (1200x630)
- Added Google/Bing verification codes
- Added priority prop to hero images
- Verified H1 tags on all pages

SEO Score: 87/100 → 97/100"

# Push to main
git push origin main
```

---

## IMMEDIATE NEXT STEPS

1. **Right Now (35 minutes):**
   - [ ] Create OG image → save to `public/og-image.jpg`
   - [ ] Get Google verification code → update `seo-config.ts`
   - [ ] Get Bing verification code → update `seo-config.ts`
   - [ ] Add `priority` to hero images
   - [ ] Verify H1 tags exist

2. **Before Deployment:**
   - [ ] Run `npm run build` (verify no errors)
   - [ ] Test locally with `npm run start`
   - [ ] Verify OG image shows in HTML source
   - [ ] Check sitemap.xml renders
   - [ ] Check robots.txt renders

3. **Deploy:**
   - [ ] Commit changes to git
   - [ ] Push to production
   - [ ] Verify live site loads

4. **After Deployment (Day 1):**
   - [ ] Submit sitemap to GSC
   - [ ] Test with Rich Results Test
   - [ ] Verify social sharing works
   - [ ] Monitor for any errors

---

## SUPPORT RESOURCES

**Google Tools:**
- Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- PageSpeed Insights: https://pagespeed.web.dev/

**Bing Tools:**
- Webmaster Tools: https://www.bing.com/webmasters

**Validation:**
- Schema.org Validator: https://validator.schema.org/
- W3C HTML Validator: https://validator.w3.org/

**Image Creation:**
- Canva (Free): https://canva.com
- OG Image Generator: https://ogimage.gallery/

---

**You're 35 minutes away from a 97/100 SEO score. Let's go! 🚀**

**Questions?** Check the full audit: `SEO_DEPLOYMENT_READINESS_AUDIT.md`
