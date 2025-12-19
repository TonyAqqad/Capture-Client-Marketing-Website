# Component File Locations

## Quick Reference Guide

### Custom Hooks
All located in: `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\hooks\`

1. **useInView.ts**
   - Scroll-triggered animation hook
   - Uses Intersection Observer API
   - Returns: boolean (is element in viewport)

2. **useCountUp.ts**
   - Number counting animation hook
   - Smooth easing with requestAnimationFrame
   - Returns: current count value

3. **useTypingEffect.ts**
   - Realistic typing animation hook
   - Character-by-character reveal
   - Returns: partially typed string

---

### Interactive Components
All located in: `C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\`

1. **AIVoiceVisual.tsx**
   - AI Voice Technology section animation
   - Features: typing, waveform, particles
   - Used in: Homepage AI Voice section

2. **GrowthDashboard.tsx**
   - Growth Dashboard animation
   - Features: counting numbers, live feed, stats
   - Used in: Homepage Dashboard section

3. **PricingCards.tsx**
   - Premium pricing cards with 3D effects
   - Features: tilt, shine, hover effects
   - Used in: Homepage Pricing section

4. **TestimonialsCarousel.tsx**
   - Auto-rotating testimonial carousel
   - Features: slide transitions, controls, stars
   - Used in: Homepage Social Proof section

5. **AnimatedStats.tsx**
   - Animated statistics display
   - Features: counting, glows, staggered reveals
   - Used in: Homepage stats row

---

### Modified Files

**src/app/page.tsx**
- Main homepage component
- Imports and uses all 5 new components
- Lines modified:
  - Imports (lines 4-8)
  - AI Voice section (line ~206)
  - Dashboard section (line ~216)
  - Pricing section (line ~282)
  - Testimonials section (line ~290)
  - Stats section (line ~311)

**src/components/Footer.tsx**
- Fixed parsing error (line 17-24)
- Cleaned up Image component structure

---

### Documentation Files
All located in: `C:\Users\eaqqa\capture-client-website-seo\`

1. **INTERACTIVE_COMPONENTS_SUMMARY.md**
   - Complete implementation overview
   - Technical details and features
   - Build status and testing instructions

2. **ANIMATION_GUIDE.md**
   - Visual guide to all animations
   - ASCII art mockups
   - Timing and performance details

3. **COMPONENT_LOCATIONS.md** (this file)
   - Quick reference for file locations
   - Import statements guide

---

## Import Statements

### To use hooks in your components:

```typescript
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { useTypingEffect } from '@/hooks/useTypingEffect';
```

### To use animated components:

```typescript
import AIVoiceVisual from '@/components/AIVoiceVisual';
import GrowthDashboard from '@/components/GrowthDashboard';
import PricingCards from '@/components/PricingCards';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import AnimatedStats from '@/components/AnimatedStats';
```

### Example usage in page:

```tsx
export default function MyPage() {
  return (
    <div>
      {/* Your content */}
      <AIVoiceVisual />
      <GrowthDashboard />
      <PricingCards />
      {/* More content */}
    </div>
  );
}
```

---

## Project Structure

```
capture-client-website-seo/
├── capture-client-site/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx          ← Homepage (modified)
│   │   ├── components/
│   │   │   ├── AIVoiceVisual.tsx          ← NEW
│   │   │   ├── GrowthDashboard.tsx        ← NEW
│   │   │   ├── PricingCards.tsx           ← NEW
│   │   │   ├── TestimonialsCarousel.tsx   ← NEW
│   │   │   ├── AnimatedStats.tsx          ← NEW
│   │   │   ├── Footer.tsx                 ← FIXED
│   │   │   └── [other components...]
│   │   └── hooks/
│   │       ├── useInView.ts               ← NEW
│   │       ├── useCountUp.ts              ← NEW
│   │       └── useTypingEffect.ts         ← NEW
│   ├── package.json
│   └── [other config files]
├── INTERACTIVE_COMPONENTS_SUMMARY.md      ← NEW
├── ANIMATION_GUIDE.md                      ← NEW
└── COMPONENT_LOCATIONS.md                  ← NEW (this file)
```

---

## Commands

### Development
```bash
cd C:\Users\eaqqa\capture-client-website-seo\capture-client-site
npm run dev
```
Then visit: http://localhost:3000

### Build
```bash
cd C:\Users\eaqqa\capture-client-website-seo\capture-client-site
npm run build
```

### Start production
```bash
cd C:\Users\eaqqa\capture-client-website-seo\capture-client-site
npm run start
```

---

## Dependencies

All animations use:
- **Framer Motion** v12.23.24 (already installed)
- **React** v19.2.0
- **Next.js** v16.0.5

No additional dependencies needed!

---

## Quick Access Paths

Copy these paths to quickly navigate in your editor:

```
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\hooks\useInView.ts
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\hooks\useCountUp.ts
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\hooks\useTypingEffect.ts

C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\AIVoiceVisual.tsx
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\GrowthDashboard.tsx
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\PricingCards.tsx
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\TestimonialsCarousel.tsx
C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\components\AnimatedStats.tsx

C:\Users\eaqqa\capture-client-website-seo\capture-client-site\src\app\page.tsx
```

---

## Troubleshooting

### If animations don't work:
1. Check browser console for errors
2. Verify Framer Motion is installed: `npm list framer-motion`
3. Clear Next.js cache: `rm -rf .next`
4. Rebuild: `npm run build`

### If TypeScript errors appear:
1. Check all imports are correct
2. Verify hook signatures match usage
3. Run: `npm run lint`

### If build fails:
1. Check all component imports exist
2. Verify no syntax errors in new files
3. Check Footer.tsx is properly formatted

---

**All files are ready to use!** 🚀
