# Category Theming - Quick Reference

## Import
```tsx
import { getThemeByCategory, getGradientForCategory } from '@/data/categoryThemes';
// OR
import { getThemeByCategory } from '@/data';
```

## Get Theme
```tsx
const theme = getThemeByCategory('crm'); // Replace 'crm' with any category ID
```

## Common Patterns

### Text Gradient
```tsx
<h1 className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
  Title
</h1>
```

### Background
```tsx
<div className={theme.bgClass}>
  {/* Content */}
</div>
```

### Icon/Logo Container
```tsx
<div className={`${theme.iconBg} ${theme.accentGlow} w-16 h-16 rounded-xl`}>
  <img src={logo} alt="Logo" />
</div>
```

### Badge
```tsx
<span className={theme.badgeClass}>
  {theme.name}
</span>
```

### Button
```tsx
<button className={`${theme.iconBg} ${theme.hoverGlow} px-6 py-3 rounded-xl text-white`}>
  Click Me
</button>
```

### Card
```tsx
<div className={`${theme.bgClass} ${theme.borderClass} border rounded-xl p-6`}>
  {/* Card content */}
</div>
```

### Timeline/Progress
```tsx
<div style={{ background: getTimelineGradient(categoryId) }} className="h-1" />
```

## All Category IDs
- `crm` - Gold
- `automation` - Purple
- `scheduling` - Green
- `phone-systems` - Blue
- `home-services` - Orange
- `legal` - Indigo
- `healthcare` - Pink
- `real-estate` - Teal
- `marketing` - Hot Pink
- `payments` - Forest Green
- `all-in-one` - Violet

## Helper Functions
```tsx
getThemeByCategory(categoryId)      // Full theme object
getGradientForCategory(categoryId)  // Tailwind gradient classes
getTimelineGradient(categoryId)     // CSS gradient string
getPrimaryColor(categoryId)         // Hex color
getIconBgClass(categoryId)          // Icon background classes
getBadgeClass(categoryId)           // Badge classes
getAccentGlow(categoryId)           // Glow shadow
getHoverGlow(categoryId)            // Hover glow
getAllCategoryIds()                 // Array of all IDs
hasTheme(categoryId)                // Check if exists
```

## Theme Properties
```tsx
theme.primary          // Hex color: "#D4AF37"
theme.gradient         // "from-amber-400 via-yellow-500 to-amber-600"
theme.gradientFrom     // "#FCD34D"
theme.gradientTo       // "#D97706"
theme.bgClass          // Background gradient
theme.iconBg           // Icon background
theme.badgeClass       // Badge styling
theme.accentGlow       // Shadow glow
theme.timelineGradient // CSS gradient
theme.hoverGlow        // Hover glow
theme.borderClass      // Border color
```

## Full Example
```tsx
import { getThemeByCategory } from '@/data/categoryThemes';

export function IntegrationCard({ integration }) {
  const theme = getThemeByCategory(integration.category);

  return (
    <div className={`${theme.bgClass} ${theme.borderClass} border rounded-xl p-6 ${theme.hoverGlow}`}>
      <div className={`${theme.iconBg} ${theme.accentGlow} w-16 h-16 rounded-xl mb-4`}>
        <img src={integration.logo} alt={integration.name} />
      </div>

      <h3 className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
        {integration.name}
      </h3>

      <p className="text-gray-400 mt-2">
        {integration.description}
      </p>

      <span className={theme.badgeClass}>
        {theme.name}
      </span>
    </div>
  );
}
```

## Files
- **Theme Data**: `src/data/categoryThemes.ts`
- **Full Usage Guide**: `CATEGORY_THEMING_USAGE_EXAMPLES.md`
- **Visual Reference**: `CATEGORY_THEMES_VISUAL_REFERENCE.md`
- **Complete Summary**: `../CATEGORY_THEMING_SYSTEM_SUMMARY.md`
