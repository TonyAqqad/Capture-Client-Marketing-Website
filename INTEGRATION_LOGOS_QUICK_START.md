# Integration Logos - Quick Start Guide

## What Was Done

All 60 integration logos have been updated from local file paths to **Simple Icons CDN** URLs.

**Example:**
- Before: `/integrations/hubspot.svg` ❌
- After: `https://cdn.simpleicons.org/hubspot` ✅

## Test the Implementation

### 1. Start the Development Server

```bash
cd capture-client-site
npm run dev
```

### 2. Test Integration Pages

Visit these URLs to verify logos display correctly:

#### Main Integrations Page
```
http://localhost:3000/integrations
```

Should display all 60 integrations with logos in a grid.

#### Test Individual Integration Pages (Popular)

**CRM Systems:**
- http://localhost:3000/integrations/hubspot
- http://localhost:3000/integrations/salesforce
- http://localhost:3000/integrations/zoho-crm
- http://localhost:3000/integrations/pipedrive

**Automation:**
- http://localhost:3000/integrations/zapier
- http://localhost:3000/integrations/make
- http://localhost:3000/integrations/slack

**Scheduling:**
- http://localhost:3000/integrations/calendly
- http://localhost:3000/integrations/google-calendar

**Phone Systems:**
- http://localhost:3000/integrations/ringcentral
- http://localhost:3000/integrations/twilio

**Home Services:**
- http://localhost:3000/integrations/servicetitan
- http://localhost:3000/integrations/housecall-pro
- http://localhost:3000/integrations/jobber

**Legal:**
- http://localhost:3000/integrations/clio
- http://localhost:3000/integrations/mycase

**Payments:**
- http://localhost:3000/integrations/stripe
- http://localhost:3000/integrations/gohighlevel

### 3. Check Browser Console

Open DevTools (F12) and check the Console tab for:
- ❌ 404 errors on logo URLs (indicates logo doesn't exist on Simple Icons)
- ❌ CORS errors
- ✅ No errors = all logos loading successfully

### 4. Visual Inspection Checklist

On the integrations page, verify:
- [ ] All integration cards show logos
- [ ] Logos are not pixelated or blurry
- [ ] Logos are centered in their containers
- [ ] Hover effects work (cards scale up, logos brighten)
- [ ] Mobile responsive (test at 375px width)

On individual integration detail pages, verify:
- [ ] Large logo displays at top of page
- [ ] Logo is in glassmorphic container with glow effect
- [ ] Logo matches the integration name

## If a Logo Doesn't Load (404 Error)

If a logo returns 404, it means Simple Icons doesn't have that brand. Here's how to fix it:

### Option 1: Check Simple Icons Directly

Visit: https://simpleicons.org/

Search for the brand name. The URL slug might be different than expected.

### Option 2: Use Brand Color

Some logos require a brand color to display:

```
https://cdn.simpleicons.org/[brand]/[HEX_COLOR]
```

Example:
```
https://cdn.simpleicons.org/hubspot/FF7A59
```

### Option 3: Create Custom Logo

If the brand isn't on Simple Icons:

1. Create a directory:
   ```bash
   mkdir -p capture-client-site/public/integrations
   ```

2. Add the SVG logo file:
   ```
   capture-client-site/public/integrations/[integration-slug].svg
   ```

3. Update the integration in `src/data/integrations.ts`:
   ```typescript
   logoUrl: '/integrations/[integration-slug].svg',
   ```

## Integrations That May Need Custom Logos

These integrations might not be on Simple Icons (verify during testing):

- Follow Up Boss
- GorillaDesk
- Service Fusion
- FieldEdge
- Lawmatics
- Smokeball
- athenahealth
- Kareo
- drchrono
- kvCORE
- BoomTown
- Realtor.com (might be "realtor")
- LawPay
- Keap
- Ontraport

## File Locations

- **Integration Data:** `capture-client-site/src/data/integrations.ts`
- **Detail Hero Component:** `capture-client-site/src/components/integrations/IntegrationDetailHero.tsx`
- **Card Component:** `capture-client-site/src/components/integrations/IntegrationCard.tsx`

## Quick Fixes

### All logos showing 404?

**Check:** Make sure you have an internet connection (logos load from CDN).

### Logos not loading in development?

**Fix:** Check Next.js image configuration in `next.config.js`:

```javascript
images: {
  domains: ['cdn.simpleicons.org'],
}
```

### Logo color doesn't match brand?

**Fix:** Add brand color to URL:

```typescript
logoUrl: 'https://cdn.simpleicons.org/[brand]/[HEX]',
```

Find brand colors at: https://brandcolors.net/

## Performance Notes

- Simple Icons CDN is globally distributed (fast loading)
- SVG format = resolution-independent (perfect on all screen sizes)
- Browser caching enabled (logos cached after first load)
- No impact on repository size (CDN-hosted)

## Deployment Checklist

Before deploying to production:

- [ ] All logos load in development
- [ ] No console errors
- [ ] Mobile responsive verified
- [ ] Hover effects work
- [ ] Integration detail pages load correctly
- [ ] Image domains configured in `next.config.js`

## Need Help?

1. Check the comprehensive summary: `INTEGRATION_LOGOS_IMPLEMENTATION_SUMMARY.md`
2. Visit Simple Icons: https://simpleicons.org/
3. Check Next.js Image docs: https://nextjs.org/docs/api-reference/next/image

---

**Status:** ✅ Ready for Testing
**Total Integrations:** 60
**Logo Source:** Simple Icons CDN
**Approach:** Option A (Recommended)
