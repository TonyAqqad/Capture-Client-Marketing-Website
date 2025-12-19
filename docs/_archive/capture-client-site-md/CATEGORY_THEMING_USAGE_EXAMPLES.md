# Category Theming System - Usage Examples

## Overview
The category theming system provides consistent visual identity across all 11 integration categories with colors, gradients, glows, and styling classes.

## Location
**File:** `src/data/categoryThemes.ts`

## Import Options

### Option 1: Import from main data index
```typescript
import { getThemeByCategory, getCategoryTheme, getGradientForCategory } from '@/data';
```

### Option 2: Direct import
```typescript
import { getThemeByCategory, categoryThemes } from '@/data/categoryThemes';
```

## Usage Examples

### 1. Basic Theme Usage
```tsx
import { getThemeByCategory } from '@/data/categoryThemes';

export function IntegrationHero({ categoryId }: { categoryId: string }) {
  const theme = getThemeByCategory(categoryId);

  return (
    <div className={`${theme.bgClass} ${theme.borderClass} border rounded-lg p-8`}>
      <div className={`${theme.iconBg} w-16 h-16 rounded-xl ${theme.accentGlow}`}>
        {/* Icon */}
      </div>
      <h1 className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
        {theme.name}
      </h1>
    </div>
  );
}
```

### 2. Timeline with Gradient
```tsx
import { getTimelineGradient } from '@/data/categoryThemes';

export function IntegrationTimeline({ categoryId }: { categoryId: string }) {
  const gradient = getTimelineGradient(categoryId);

  return (
    <div
      className="h-1 rounded-full"
      style={{ background: gradient }}
    />
  );
}
```

### 3. Category Badge
```tsx
import { getBadgeClass } from '@/data/categoryThemes';

export function CategoryBadge({ categoryId, label }: Props) {
  const badgeClass = getBadgeClass(categoryId);

  return (
    <span className={`${badgeClass} px-3 py-1 rounded-full text-sm font-medium border`}>
      {label}
    </span>
  );
}
```

### 4. Icon with Glow Effect
```tsx
import { getIconBgClass, getAccentGlow, getHoverGlow } from '@/data/categoryThemes';

export function IntegrationIcon({ categoryId, icon }: Props) {
  const iconBg = getIconBgClass(categoryId);
  const glow = getAccentGlow(categoryId);
  const hoverGlow = getHoverGlow(categoryId);

  return (
    <div className={`${iconBg} ${glow} ${hoverGlow} w-12 h-12 rounded-lg flex items-center justify-center transition-all`}>
      {icon}
    </div>
  );
}
```

### 5. Card with Category Theme
```tsx
import { getThemeByCategory } from '@/data/categoryThemes';

export function IntegrationCard({ integration }: Props) {
  const theme = getThemeByCategory(integration.category);

  return (
    <div className={`${theme.bgClass} ${theme.borderClass} border rounded-2xl p-6 ${theme.hoverGlow} transition-all`}>
      <div className={`${theme.iconBg} w-16 h-16 rounded-xl ${theme.accentGlow} mb-4`}>
        <img src={integration.logoUrl} alt={integration.name} />
      </div>

      <h3 className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
        {integration.name}
      </h3>

      <p className="text-gray-400 mt-2">{integration.description}</p>

      <span className={`${theme.badgeClass} inline-block mt-4 px-3 py-1 rounded-full text-sm`}>
        {theme.name}
      </span>
    </div>
  );
}
```

### 6. Hero Section with Full Theme
```tsx
import { getThemeByCategory } from '@/data/categoryThemes';

export function CategoryHero({ categoryId, title, description }: Props) {
  const theme = getThemeByCategory(categoryId);

  return (
    <section className={`${theme.bgClass} relative overflow-hidden`}>
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 ${theme.accentGlow} opacity-20 blur-3xl`}
        style={{ background: theme.primary }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <span className={`${theme.badgeClass} inline-block mb-6 px-4 py-2 rounded-full`}>
          {theme.name}
        </span>

        <h1 className={`text-6xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6`}>
          {title}
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl">
          {description}
        </p>

        <button className={`${theme.iconBg} ${theme.hoverGlow} mt-8 px-8 py-4 rounded-xl text-white font-semibold transition-all`}>
          Get Started
        </button>
      </div>
    </section>
  );
}
```

### 7. Dynamic Category Grid
```tsx
import { getAllCategoryIds, getThemeByCategory } from '@/data/categoryThemes';

export function CategoriesGrid() {
  const categoryIds = getAllCategoryIds();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryIds.map((categoryId) => {
        const theme = getThemeByCategory(categoryId);
        return (
          <div
            key={categoryId}
            className={`${theme.bgClass} ${theme.borderClass} border rounded-xl p-6 ${theme.hoverGlow} cursor-pointer transition-all`}
          >
            <div className={`${theme.iconBg} w-12 h-12 rounded-lg ${theme.accentGlow} mb-4`} />
            <h3 className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              {theme.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
```

### 8. Progress Bar with Category Theme
```tsx
import { getTimelineGradient, getPrimaryColor } from '@/data/categoryThemes';

export function ProgressBar({ categoryId, progress }: Props) {
  const gradient = getTimelineGradient(categoryId);
  const primary = getPrimaryColor(categoryId);

  return (
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${progress}%`,
          background: gradient,
          boxShadow: `0 0 10px ${primary}`
        }}
      />
    </div>
  );
}
```

## All 11 Category Themes

### Theme Properties Reference
Each theme includes:
- **primary**: Hex color code
- **gradient**: Tailwind gradient classes (from-X via-Y to-Z)
- **gradientFrom/gradientTo**: Hex color codes for CSS gradients
- **bgClass**: Background gradient with opacity
- **iconBg**: Solid gradient for icon backgrounds
- **badgeClass**: Badge styling with text, bg, and border
- **accentGlow**: Shadow effect for glowing elements
- **timelineGradient**: CSS linear gradient string
- **hoverGlow**: Enhanced glow on hover
- **borderClass**: Border color class

### Category List
1. **crm** - Gold theme (trust, premium)
2. **automation** - Purple theme (innovation)
3. **scheduling** - Green theme (growth)
4. **phone-systems** - Blue theme (reliability)
5. **home-services** - Orange/Ember theme (action)
6. **legal** - Indigo/Midnight theme (professional)
7. **healthcare** - Rose/Pink theme (caring)
8. **real-estate** - Teal/Ocean theme (stability)
9. **marketing** - Pink/Royal theme (creative)
10. **payments** - Emerald/Forest theme (secure)
11. **all-in-one** - Aurora rainbow theme (comprehensive)

## Helper Functions

### getThemeByCategory(categoryId)
Returns complete theme object for a category. Falls back to CRM gold theme if category not found.

### getGradientForCategory(categoryId)
Returns Tailwind gradient class string (e.g., "from-amber-400 via-yellow-500 to-amber-600")

### getTimelineGradient(categoryId)
Returns CSS linear-gradient string for timeline/progress elements

### getPrimaryColor(categoryId)
Returns hex color code for the category's primary color

### getIconBgClass(categoryId)
Returns Tailwind classes for icon background gradients

### getBadgeClass(categoryId)
Returns complete badge styling classes

### getAccentGlow(categoryId)
Returns shadow class for glow effects

### getHoverGlow(categoryId)
Returns enhanced shadow class for hover states

### getAllCategoryIds()
Returns array of all category IDs

### hasTheme(categoryId)
Returns boolean indicating if theme exists for category

## Best Practices

1. **Always use helper functions** - Don't access categoryThemes directly unless needed
2. **Consistent application** - Use the same theme properties across related components
3. **Fallback handling** - getThemeByCategory returns CRM theme as fallback
4. **Performance** - Theme lookups are O(1) using object keys
5. **Type safety** - All functions are fully typed with TypeScript

## Example Component Pattern
```tsx
import { getThemeByCategory } from '@/data/categoryThemes';

interface Props {
  categoryId: string;
  // other props
}

export function ThemedComponent({ categoryId }: Props) {
  const theme = getThemeByCategory(categoryId);

  return (
    <div className={theme.bgClass}>
      {/* Use theme properties throughout */}
    </div>
  );
}
```

## Integration with Existing Code
Replace hardcoded category colors/gradients with theme system:

**Before:**
```tsx
<div className="bg-gradient-to-r from-amber-400 to-yellow-600">
```

**After:**
```tsx
const theme = getThemeByCategory(categoryId);
<div className={`bg-gradient-to-r ${theme.gradient}`}>
```
