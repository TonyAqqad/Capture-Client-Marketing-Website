# FONT OPTIMIZATION PLAN - Reduce from 23 to 5 Files

## Current State (BAD - 23 font files)
- **Poppins**: 400, 500, 600, 700 = 4 files
- **Inter**: 400, 500, 600 = 3 files  
- **Space Grotesk**: 500, 600, 700 = 3 files
- **Bricolage Grotesque**: 200, 300, 400, 500, 600, 700, 800 = 7 files
- **Syne**: 400, 500, 600, 700, 800 = 5 files
- **Material Icons**: 1 file
- **TOTAL: 23 font files**

## Target State (GOOD - 5 font files)
- **Inter**: 400, 600 = 2 files (body font)
- **Bricolage Grotesque**: 400, 700 = 2 files (display font)
- **Material Icons**: 1 file
- **TOTAL: 5 font files** (78% reduction)

## Changes Required

### 1. layout.tsx
```typescript
// REMOVE these imports:
import { Poppins, Inter, Space_Grotesk, Bricolage_Grotesque, Syne } from "next/font/google";

// REPLACE with:
import { Inter, Bricolage_Grotesque } from "next/font/google";

// REMOVE all font declarations except:
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600"], // Only 2 weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  weight: ["400", "700"], // Only 2 weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// UPDATE body className:
className={`${inter.variable} ${bricolageGrotesque.variable} font-body...`}
```

### 2. globals.css
- Remove references to --font-poppins
- Remove references to --font-space-grotesk  
- Remove references to --font-syne
- Keep only:
  - --font-inter (body)
  - --font-bricolage-grotesque (display)

### 3. tailwind.config.ts
```typescript
fontFamily: {
  heading: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
  body: ["var(--font-inter)", "system-ui", "sans-serif"],
  display: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
  hero: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
  // REMOVE: accent: ["var(--font-syne)", ...]
}
```

## Font Weight Mapping
Since we're reducing weights, map old weights to new ones:

### Inter (body text)
- 400 (normal) → 400 ✓
- 500 (medium) → 600 (semibold) - slightly heavier
- 600 (semibold) → 600 ✓

### Bricolage Grotesque (headlines)
- 200 (ultra-light) → 400 (normal) - more readable
- 300 (light) → 400 ✓
- 400 (normal) → 400 ✓
- 500 (medium) → 400 (normal)
- 600 (semibold) → 700 (bold)
- 700 (bold) → 700 ✓
- 800 (extrabold) → 700 (bold)

CSS will automatically handle this via font-synthesis.

## Performance Gains
- **Before**: 23 font files × ~15KB each = ~345KB
- **After**: 5 font files × ~15KB each = ~75KB
- **Reduction**: 270KB saved (78% reduction)
- **FCP improvement**: ~100ms faster
- **LCP improvement**: ~50ms faster

## Testing Checklist
- [ ] Build completes without errors
- [ ] Homepage loads fonts correctly
- [ ] Headlines use Bricolage Grotesque
- [ ] Body text uses Inter
- [ ] No FOIT/FOUT (flash of invisible/unstyled text)
- [ ] Font weights look appropriate
- [ ] Mobile performance improved
