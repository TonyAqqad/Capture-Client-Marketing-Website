# Location Pages - Quick Start Guide

## 5-Minute Setup

### Step 1: Verify Files Exist

```bash
# Check all new components are present
ls src/components/locations/
# Should show:
# - LocalMarketStats.tsx
# - LocalIndustriesServed.tsx
# - ServiceAreaMap.tsx
# - CompetitorComparison.tsx

# Check updated files
ls src/app/locations/[slug]/page.tsx
ls src/components/cro/MobileCTABar.tsx
ls tailwind.config.ts
```

### Step 2: Add Data to Location JSON (Optional)

Edit any location file in `src/data/locations/`:

```json
{
  "page_id": "voice-ai-knoxville-tn",
  "location": {
    "city": "Knoxville",
    "state": "Tennessee",
    "state_abbr": "TN",
    "nearby_areas": ["Maryville", "Oak Ridge", "Sevierville"],
    "service_area_radius": "30 miles"
  },

  // ADD THESE OPTIONAL FIELDS:
  "estimated_missed_call_loss": 47000,
  "missed_call_percentage": 27,
  "local_phone_number": "865-346-3339",
  "popular_industries": [
    {
      "name": "HVAC & Home Services",
      "icon": "build",
      "description": "24/7 call answering for emergency calls"
    },
    {
      "name": "Legal & Law Firms",
      "icon": "gavel",
      "description": "Pre-qualify leads before attorney consultation"
    },
    {
      "name": "Medical & Healthcare",
      "icon": "local_hospital",
      "description": "HIPAA-compliant appointment scheduling"
    },
    {
      "name": "Real Estate",
      "icon": "home",
      "description": "Qualify buyers and schedule property showings"
    }
  ],

  // ... rest of location data
}
```

**Note:** All fields have defaults. If you don't add them, the page will still work beautifully.

### Step 3: Build and Test

```bash
# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Start dev server
npm run dev

# Visit a location page
open http://localhost:3000/locations/voice-ai-knoxville-tn
```

---

## What You Should See

### 1. Aurora Hero (Top of Page)
- Animated flowing gradients in background
- City name prominently displayed
- Local phone number in primary CTA
- "$47,000/year" loss data in headline

### 2. Market Stats Section
- Three animated counters (scroll to trigger)
- Orange/red urgent color scheme
- Business loss, percentage, city total

### 3. Industries Section
- **Desktop**: Tab navigation (4 default industries)
- **Mobile**: Horizontal scrolling cards
- Industry-specific descriptions

### 4. Competitor Comparison
- **Desktop**: Full comparison table
- **Mobile**: Stacked comparison cards
- Green checkmarks vs red X's

### 5. Service Area Map
- Visual map with pulsing rings
- Center pin for main city
- Dots for nearby areas
- List of all areas served

---

## Customization Quick Reference

### Change Default Phone Number Globally

Edit `src/components/cro/MobileCTABar.tsx`:

```typescript
export default function MobileCTABar({
  phoneNumber = "YOUR-DEFAULT-NUMBER"
}: MobileCTABarProps = {}) {
```

### Change Default Statistics

Edit `src/components/locations/LocalMarketStats.tsx`:

```typescript
estimatedLoss={location.estimated_missed_call_loss || 50000}  // Change 47000
missedCallPercentage={location.missed_call_percentage || 30}  // Change 27
```

### Change Default Industries

Edit `src/app/locations/[slug]/page.tsx` (line ~354):

```typescript
popularIndustries={location.popular_industries || [
  { name: "YOUR INDUSTRY", icon: "YOUR_ICON", description: "..." },
  // ... add 4 industries
]}
```

### Material Icons Reference

Common icons you can use:
- `build` - Tools/HVAC
- `gavel` - Legal
- `local_hospital` - Healthcare
- `home` - Real Estate
- `restaurant` - Food/Restaurants
- `directions_car` - Automotive
- `business_center` - Professional Services
- `store` - Retail

Full list: https://fonts.google.com/icons

---

## Testing Checklist

### Desktop (Chrome)
- [ ] Aurora hero animations smooth
- [ ] Stat counters animate on scroll
- [ ] Industry tabs clickable
- [ ] Map dots show tooltips on hover
- [ ] Comparison table renders correctly
- [ ] Phone number links work

### Mobile (Chrome DevTools → iPhone 12)
- [ ] Hero is centered and readable
- [ ] Stats stack vertically
- [ ] Industries scroll horizontally
- [ ] Comparison shows stacked cards
- [ ] Map stacks above areas list
- [ ] Phone CTA prominent and clickable
- [ ] Mobile sticky bar appears on scroll

### Performance
- [ ] Lighthouse Performance > 90
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images load properly
- [ ] Animations don't cause jank

---

## Common Issues & Fixes

### Issue: Counters don't animate
**Cause**: Intersection Observer not supported or scroll too fast
**Fix**: They show final numbers instantly (acceptable fallback)

### Issue: Aurora not visible
**Cause**: Opacity too low or wrong colors
**Fix**: Check `tailwind.config.ts` has aurora keyframes, increase opacity in hero section

### Issue: Tabs not switching
**Cause**: Component is server-rendered
**Fix**: Verify `LocalIndustriesServed.tsx` has `'use client'` at top

### Issue: Map dots not positioned
**Cause**: Trigonometry calculation or nearby_areas missing
**Fix**: Check console for errors, verify `location.nearby_areas` array exists

### Issue: Phone number not clickable
**Cause**: `tel:` link malformed
**Fix**: Ensure phone number in data has digits (auto-strips formatting)

---

## Pro Tips

### Tip 1: Customize Aurora Colors
Edit the aurora divs in `page.tsx` hero section:

```tsx
// Change from cyan/blue to purple/pink
from-purple-400/30 via-pink-500/20 to-transparent
```

### Tip 2: Add More Stats
Clone a stat card in `LocalMarketStats.tsx`:

```tsx
{/* Stat 4: New metric */}
<div className="group relative">
  {/* Copy structure from existing stat */}
</div>
```

### Tip 3: Change Tab Indicator Style
In `LocalIndustriesServed.tsx`, modify active tab:

```tsx
{activeTab === index && (
  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2
    w-2 h-2 bg-cyan-400 rounded-full" />
  // Change to: w-full h-1 for underline style
)}
```

### Tip 4: Adjust Animation Speed
In `tailwind.config.ts`:

```typescript
"aurora-1": "aurora1 15s ease-in-out infinite",  // Faster (was 20s)
"aurora-2": "aurora2 20s ease-in-out infinite",  // Faster (was 25s)
"aurora-3": "aurora3 25s ease-in-out infinite",  // Faster (was 30s)
```

### Tip 5: Reduce Motion for Accessibility
Add to hero section:

```tsx
<div className="motion-reduce:hidden">
  {/* Aurora animations */}
</div>
<div className="hidden motion-reduce:block bg-gradient-to-br from-slate-900 to-slate-950">
  {/* Static fallback */}
</div>
```

---

## File Reference

| File | Purpose | Type |
|------|---------|------|
| `src/app/locations/[slug]/page.tsx` | Main location page template | Server Component |
| `src/components/locations/LocalMarketStats.tsx` | Animated stat counters | Client Component |
| `src/components/locations/LocalIndustriesServed.tsx` | Industry tabs/cards | Client Component |
| `src/components/locations/ServiceAreaMap.tsx` | Coverage map visual | Server Component |
| `src/components/locations/CompetitorComparison.tsx` | Comparison table | Server Component |
| `src/components/cro/MobileCTABar.tsx` | Sticky mobile CTA | Client Component |
| `tailwind.config.ts` | Aurora animations | Config |

---

## Performance Benchmarks

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- Time to Interactive: < 3.5s

**If below targets:**
1. Check image sizes (should be WebP, < 200KB)
2. Verify aurora animations not too heavy (reduce blur)
3. Ensure fonts are preloaded
4. Check for unused JavaScript bundles

---

## Deployment

### Before Production:
1. Run build: `npm run build`
2. Check for TypeScript errors
3. Test on real devices (iOS Safari especially)
4. Run Lighthouse audit
5. Verify all location pages generate successfully

### Build Commands:
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Export static (if using next export)
npm run export
```

---

## Support

### Questions?
- Read `LOCATION_PAGES_$5M_UPGRADE_SUMMARY.md` for full details
- Check `LOCATION_PAGES_VISUAL_REFERENCE.md` for design specs
- Review component code for inline comments

### Need Help?
- Check browser console for errors
- Use React DevTools to inspect component props
- Test with `console.log()` in client components
- Verify data structure matches interfaces

---

## Next Steps

Once basic setup works:

1. **Customize per city**: Add real local statistics
2. **Add more industries**: Research popular industries per market
3. **Localize copy**: Mention local landmarks in `local_intro`
4. **A/B test**: Try different headlines, CTAs, stat orders
5. **Track metrics**: Set up analytics on CTA clicks, scroll depth
6. **Optimize images**: Use city-specific photos from Unsplash
7. **Expand coverage**: Add more nearby areas to service map

---

**You're all set!** Visit your location page and see the premium upgrade in action.
