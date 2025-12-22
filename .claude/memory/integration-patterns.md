# Integration Page Patterns

> Reference for `/integrations/[slug]` page structure and consistency.

## Page Structure

### 1. Hero Section
```tsx
<IntegrationHero
  integration={integration}
  breadcrumb={["Integrations", category, name]}
  title={`Connect Capture Client with ${name}`}
  description={paragraph}
  ctas={["Set Up Integration", `Visit ${partner}`]}
  tags={[category, type]}
/>
```

### 2. Key Features Section (IntegrationFeatures)
- 3-column grid layout
- Blue/cyan themed cards (NOT tan/beige)
- Icon + feature text per card
- Feature count indicator

**Card Styling (Current Standard):**
```tsx
// Card container
className="bg-white/90 border border-slate-200 rounded-2xl p-6
           hover:border-blue-300 hover:shadow-lg transition-all"

// Icon container
className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3"

// Icon
className="w-6 h-6 text-blue-600"

// Text
className="text-slate-900 font-medium" // title
className="text-slate-600"             // description
```

### 3. Related Integrations
- Other integrations in same category
- Card grid layout (3 columns desktop, 1 mobile)

### 4. CTA Section
- Standard IntegrationCTA component
- Blue-to-cyan gradient button

## File Structure
```
src/app/integrations/[slug]/
├── page.tsx           # Main page with metadata
└── (uses shared components)

src/components/integrations/
├── IntegrationFeatures.tsx  # Feature cards
├── IntegrationHero.tsx      # Hero section
├── IntegrationRelated.tsx   # Related integrations
├── IntegrationCTA.tsx       # Call to action
└── IntegrationHowItWorks.tsx # How it works section
```

## Data Source
- Integration data: `src/data/integrations.ts`
- Categories: CRM Systems, Scheduling, Phone Systems, Automation, All-in-One

## SEO Requirements

### Metadata
- **Title**: `[Name] Integration | Connect Your [Category] | Capture Client`
- **Description**: 150-160 characters
- **Canonical**: `https://captureclient.com/integrations/[slug]`

### Schema Markup
- SoftwareApplication schema
- Optional: Service schema
- No duplicate schemas

## Visual Consistency Checklist
- [ ] Feature cards use blue/cyan theme
- [ ] Cards are equal-sized in 3-column grid
- [ ] Icons use `text-blue-600` color
- [ ] Icon backgrounds: `from-blue-50 to-cyan-50`
- [ ] Card borders: `border-slate-200`
- [ ] Hover states: `hover:border-blue-300`
- [ ] Light theme throughout (no dark backgrounds)

## Common Issues
1. **Tan/beige cards**: Old design, should be white with blue accents
2. **Missing logos**: Check `/public/integrations/[name].svg`
3. **Partner URL 404**: Verify external URLs are valid
4. **Short meta descriptions**: Aim for 150-160 chars

## Related Commands
- `/audit-integrations` - Batch audit all integration pages
- `/audit-page /integrations/[slug]` - Single page audit
- `/fix-page /integrations/[slug]` - Fix specific integration
