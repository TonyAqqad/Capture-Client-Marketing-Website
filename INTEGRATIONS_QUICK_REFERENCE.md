# Integrations Page - Quick Reference Guide

## Add New Integration (5 Minutes)

**File:** `src/components/integrations/IntegrationsGrid.tsx`

```typescript
export const integrations = [
  // ... existing integrations

  // Add your new integration here:
  {
    id: "new-platform",           // Unique ID (lowercase-with-hyphens)
    name: "Platform Name",        // Display name
    logo: "https://logo.clearbit.com/platform.com",  // Clearbit logo URL
    description: "Brief description here",  // 3-5 words max
    category: "CRM",              // Must match existing category
    featured: false,              // Set to true for featured section
  },
];
```

---

## Available Categories

Use EXACTLY these category names (case-sensitive):

- `"Payments"`
- `"Communication"`
- `"Email"`
- `"Calendar"`
- `"Video"`
- `"Social"`
- `"Ads"`
- `"Automation"`
- `"CRM"`
- `"E-commerce"`
- `"Accounting"`
- `"Forms"`
- `"Local SEO"`
- `"Analytics"`
- `"Website"`

---

## Add New Category

**Step 1:** Add to categories array in `IntegrationsGrid.tsx`

```typescript
export const categories = [
  "All",
  "Payments",
  "Communication",
  // ... existing categories
  "Your New Category",  // Add here
];
```

**Step 2:** Add integrations with matching category

```typescript
{
  id: "platform-1",
  name: "Platform 1",
  logo: "https://logo.clearbit.com/platform1.com",
  description: "Description",
  category: "Your New Category",  // Matches step 1
},
```

---

## Mark as Featured

Featured integrations appear in the top section (6 max recommended).

```typescript
{
  id: "important-platform",
  name: "Important Platform",
  logo: "https://logo.clearbit.com/important.com",
  description: "Key integration",
  category: "CRM",
  featured: true,  // ← Add this
},
```

**Result:** Card appears in "Featured Integrations" section with gold star badge.

---

## Logo Requirements

### Option 1: Clearbit (Recommended)
```typescript
logo: "https://logo.clearbit.com/stripe.com"
```
- No setup required
- Works for 95% of companies
- High-quality logos
- Always up-to-date

### Option 2: Custom URL
```typescript
logo: "https://yourdomain.com/logos/platform-logo.png"
```
- Use if Clearbit doesn't have logo
- Image should be:
  - PNG or SVG
  - Transparent background
  - 300x120px minimum
  - High contrast (works on white)

### Option 3: Local File (Not Recommended)
```typescript
logo: "/integrations/custom-logo.png"
```
- Place in `public/integrations/` folder
- Image requirements same as Option 2

---

## Testing Checklist

After adding integration:

### Visual
- [ ] Logo displays correctly
- [ ] Name is readable (not too long)
- [ ] Description fits on 2 lines max
- [ ] Category badge shows correct category
- [ ] Card hovers properly (scale, lift, glow)

### Functional
- [ ] Integration appears in "All" filter
- [ ] Integration appears when category selected
- [ ] Featured badge shows if `featured: true`
- [ ] No console errors

### Quick Test
```bash
npm run dev
# Navigate to /integrations
# Click category filter
# Verify card appears
```

---

## Common Issues

### Logo Not Loading
**Problem:** Clearbit doesn't have logo
**Solution:** Use custom URL or contact Clearbit

### Logo Too Large/Small
**Problem:** Logo doesn't fit white container
**Solution:** Clearbit handles this automatically. If using custom URL, resize to 300x120px.

### Card Overlapping Text
**Problem:** Name or description too long
**Solution:**
- Name: Max 20 characters
- Description: Max 35 characters
- Use abbreviations if needed

### Category Not Filtering
**Problem:** Integration doesn't show when category selected
**Solution:** Ensure `category` value EXACTLY matches category in `categories` array (case-sensitive).

### Featured Section Empty
**Problem:** No featured integrations show
**Solution:** Set `featured: true` on at least 1 integration.

---

## SEO: Update Metadata

**File:** `src/app/integrations/page.tsx`

### Add to Keywords Array
```typescript
keywords: [
  // ... existing keywords
  "New Platform integration",
  "New Platform API",
],
```

### Add to Feature List (JSON-LD)
```typescript
featureList: [
  // ... existing features
  "New Platform Integration",
],
```

---

## Design Tokens Reference

### Card Styling
```typescript
// Don't modify these - they're automatic:
className="glass-premium-mobile p-4 sm:p-6 rounded-2xl"
```

### Hover Effects
```typescript
// Framer Motion handles this:
whileHover={{ scale: 1.05, y: -4 }}
```

### Featured Badge
```typescript
// Shows automatically if featured: true
<span className="inline-flex items-center gap-1 px-2 py-1
                 text-[9px] font-bold uppercase tracking-wider
                 text-gold bg-gold/10 rounded-full
                 border border-gold/30">
  <span className="material-icons text-[10px]">star</span>
  Featured
</span>
```

---

## Component File Locations

```
src/
├── app/
│   └── integrations/
│       └── page.tsx              ← Main page (metadata)
└── components/
    └── integrations/
        ├── IntegrationsHero.tsx   ← Hero section
        ├── IntegrationsGrid.tsx   ← ⭐ EDIT THIS to add integrations
        ├── IntegrationCard.tsx    ← Individual card (don't edit)
        ├── IntegrationFilter.tsx  ← Filter bar (don't edit)
        └── IntegrationsCTA.tsx    ← Bottom CTA (don't edit)
```

**90% of the time, you only edit `IntegrationsGrid.tsx`**

---

## Example: Add Slack Integration

```typescript
// In IntegrationsGrid.tsx, add to integrations array:
{
  id: "slack",
  name: "Slack",
  logo: "https://logo.clearbit.com/slack.com",
  description: "Team messaging & collaboration",
  category: "Communication",
  featured: false,
},
```

**Result:**
- Card appears in "Communication" category
- Logo loads from Clearbit
- Hover effects automatic
- No other changes needed

---

## Example: Create "Project Management" Category

**Step 1:** Add category
```typescript
export const categories = [
  "All",
  // ... existing
  "Project Management",  // New category
];
```

**Step 2:** Add integrations
```typescript
{
  id: "asana",
  name: "Asana",
  logo: "https://logo.clearbit.com/asana.com",
  description: "Project management software",
  category: "Project Management",  // Matches step 1
},
{
  id: "trello",
  name: "Trello",
  logo: "https://logo.clearbit.com/trello.com",
  description: "Visual project boards",
  category: "Project Management",
},
```

**Result:**
- New "Project Management" filter pill appears
- 2 integrations show when category selected
- Works immediately (no restart needed in dev mode)

---

## Performance Tips

### DO
✅ Use Clearbit for logos (optimized)
✅ Keep descriptions short
✅ Limit featured integrations to 6-8
✅ Use existing categories when possible

### DON'T
❌ Add 100+ integrations at once (lazy load instead)
❌ Use massive logo files (> 100 KB)
❌ Create too many categories (dilutes filter value)
❌ Forget to test on mobile

---

## Keyboard Shortcuts (Dev Mode)

| Key | Action |
|-----|--------|
| `Ctrl+K` | Open command palette (VS Code) |
| `Ctrl+P` | Quick file search |
| `Ctrl+F` | Find in file |
| `Ctrl+Shift+F` | Find in project |

**Search for:** `export const integrations` to jump to integration data

---

## Git Commit Message Template

```bash
git add .
git commit -m "Add [Platform Name] integration

- Added [Platform Name] to [Category] category
- Logo loaded from Clearbit
- Description: [Brief description]
- Featured: [Yes/No]"
```

---

## Support & Troubleshooting

### Can't Find Logo on Clearbit
Try alternative domains:
- `stripe.com` vs `stripe.io`
- `hubspot.com` vs `hubspot.net`
- `google.com` (works for most Google products)

### Logo Wrong Colors
Clearbit logos adapt to background. White container handles this automatically.

### Card Not Clickable
Cards don't link anywhere by default. To add links:

```typescript
// In IntegrationCard.tsx, wrap card with:
<Link href={`/integrations/${integration.id}`}>
  {/* existing card code */}
</Link>
```

### Need Help?
- Check console for errors: `F12` → Console tab
- Review existing integrations for examples
- Test on mobile: `F12` → Toggle device toolbar
- Ask in #dev-support channel

---

## One-Liner Commands

```bash
# Run dev server
npm run dev

# Build for production (test)
npm run build

# Run TypeScript check
npx tsc --noEmit

# Format code
npx prettier --write src/components/integrations/

# Lint check
npm run lint
```

---

This quick reference guide should cover 95% of use cases for adding and managing integrations. Keep this document handy when making updates to the integrations page.
