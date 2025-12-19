# Industries Implementation - Code Reference

## Quick Code Examples

### 1. Using the Industry Data

```typescript
import { INDUSTRIES, getIndustryBySlug, getCategories } from '@/data/industries';

// Get all industries
const allIndustries = INDUSTRIES; // 12 industries

// Get specific industry
const legal = getIndustryBySlug('legal-law-firms');

// Get categories
const categories = getCategories();
// ['Professional Services', 'Home Services', 'Real Estate & Property', 'Healthcare', 'Hospitality']

// Filter by category
const homeServices = INDUSTRIES.filter(i => i.category === 'Home Services');
```

### 2. Using the IndustryCard Component

```typescript
import { IndustryCard } from '@/components/industries/IndustryCard';
import { INDUSTRIES } from '@/data/industries';

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {INDUSTRIES.map((industry, index) => (
        <IndustryCard
          key={industry.id}
          industry={industry}
          index={index} // For stagger animation
        />
      ))}
    </div>
  );
}
```

### 3. Creating New Industries

Add to `src/data/industries.ts`:

```typescript
{
  id: 'my-industry',
  name: 'My Industry Name',
  slug: 'my-industry-slug',
  category: 'Professional Services', // or Home Services, etc.
  tagline: 'Compelling One-Liner',
  description: 'Full description of the industry solution...',
  heroImage: 'https://images.unsplash.com/photo-...',
  painPoints: [
    'Pain point 1 with real numbers...',
    'Pain point 2...',
    // 5+ pain points
  ],
  solutions: [
    {
      title: 'Solution Name',
      description: 'How AI solves this...',
      icon: 'material_icon_name', // From Material Icons
    },
    // 4 solutions
  ],
  keyFeatures: [
    'Feature 1',
    'Feature 2',
    // 8+ features
  ],
  stats: [
    { value: '99%', label: 'Success rate' },
    { value: '$50K', label: 'Annual savings' },
    // 4 stats
  ],
  testimonial: {
    quote: 'Customer testimonial quote...',
    author: 'Name',
    company: 'Company Name',
    avatar: 'https://images.unsplash.com/photo-...',
  },
  relatedIntegrations: ['integration-1', 'integration-2'],
  ctaText: 'Book Industry Demo',
  roiCalculation: {
    traditionalCost: '$50,000/year',
    aiSolution: '$1,140/year',
    annualSavings: '$48,860',
    breakdownItems: [
      { item: 'Line item', traditional: '$50,000', ai: '$1,140' },
    ],
  },
}
```

## File Structure

```
capture-client-site/
├── src/
│   ├── data/
│   │   └── industries.ts              # ✨ Industry data & helpers
│   ├── components/
│   │   └── industries/
│   │       └── IndustryCard.tsx       # ✨ Reusable card component
│   └── app/
│       └── who-we-serve/
│           ├── page.tsx               # ✨ Main overview page
│           └── [slug]/
│               └── page.tsx           # ✨ Dynamic industry pages
```

## SEO Patterns

### Metadata Generation

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);

  return {
    title: `${industry.name} AI Voice Agent | ${industry.tagline}`,
    description: `${industry.description}...`,
    keywords: [
      `${industry.name.toLowerCase()} ai receptionist`,
      `ai for ${industry.name.toLowerCase()}`,
      // 8+ keywords
    ],
    openGraph: {
      title: `${industry.name} AI Voice Agent`,
      description: industry.description,
      images: [{ url: industry.heroImage }],
    },
  };
}
```

### Schema Markup

```typescript
import { generateWebPageSchema } from '@/lib/seo-config';

const pageSchema = generateWebPageSchema({
  title: `${industry.name} - Capture Client`,
  description: industry.description,
  url: `${SITE_CONFIG.url}/who-we-serve/${industry.slug}`,
});

// Service schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `AI Voice Agent for ${industry.name}`,
  description: industry.description,
  provider: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
  },
};

// In component
<JsonLd schema={[pageSchema, serviceSchema]} />
```

## Design Patterns

### Premium Hero

```typescript
<section className="relative py-20 md:py-32 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src={industry.heroImage}
      alt={industry.name}
      fill
      className="object-cover opacity-20"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
  </div>

  {/* Mesh Background */}
  <div className="absolute inset-0 bg-mesh-premium opacity-30" />

  {/* Content */}
  <div className="container mx-auto px-6 relative z-10">
    <h1 className="font-heading text-5xl md:text-7xl font-bold">
      {industry.name}
    </h1>
    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
      {industry.tagline}
    </p>
  </div>
</section>
```

### Stats Grid

```typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {industry.stats.map((stat, index) => (
    <div key={index} className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
        {stat.value}
      </div>
      <div className="text-sm text-foreground-muted">
        {stat.label}
      </div>
    </div>
  ))}
</div>
```

### Pain Points List

```typescript
<div className="space-y-4">
  {industry.painPoints.map((pain, index) => (
    <div
      key={index}
      className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-gold-500/30 transition-all"
    >
      <span className="material-icons text-gold-400 text-2xl">
        error_outline
      </span>
      <p className="text-foreground-muted leading-relaxed text-lg">
        {pain}
      </p>
    </div>
  ))}
</div>
```

### Solutions Grid

```typescript
<div className="grid md:grid-cols-2 gap-8">
  {industry.solutions.map((solution, index) => (
    <GlassCard key={index} variant="premium" hover={true}>
      <div className="p-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 flex items-center justify-center mb-6">
          <span className="material-icons text-4xl text-accent-400">
            {solution.icon}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {solution.title}
        </h3>
        <p className="text-foreground-muted leading-relaxed text-lg">
          {solution.description}
        </p>
      </div>
    </GlassCard>
  ))}
</div>
```

### ROI Calculator

```typescript
{industry.roiCalculation && (
  <GlassCard variant="premium">
    <div className="p-8">
      {/* Comparison */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <div className="text-sm text-foreground-muted mb-2">
            Traditional Cost
          </div>
          <div className="text-4xl font-bold text-foreground-muted line-through">
            {industry.roiCalculation.traditionalCost}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <span className="material-icons text-4xl text-gold-400">
            arrow_forward
          </span>
        </div>

        <div className="text-center">
          <div className="text-sm text-gold-400 mb-2">
            With Capture Client
          </div>
          <div className="text-4xl font-bold text-gold-400">
            {industry.roiCalculation.aiSolution}
          </div>
        </div>
      </div>

      {/* Savings */}
      <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-gold-500/20 to-gold-600/10 border border-gold-500/30">
        <div className="text-sm text-gold-400 mb-2">
          Your Annual Savings
        </div>
        <div className="text-5xl font-bold text-gold-400">
          {industry.roiCalculation.annualSavings}
        </div>
      </div>
    </div>
  </GlassCard>
)}
```

## Material Icons Reference

Common icons used in industries:

```typescript
// Professional Services
'business_center', 'gavel', 'verified_user', 'account_balance'

// Home Services
'home_repair_service', 'emergency', 'build', 'handyman'

// Real Estate
'real_estate_agent', 'home', 'location_on', 'calendar_month'

// Healthcare
'medical_services', 'shield', 'local_hospital', 'healing'

// IT/Tech
'computer', 'support', 'settings', 'code'

// General
'check_circle', 'error_outline', 'arrow_forward', 'star'
```

## Color System

```typescript
// Gold (Primary Accent)
'from-gold-400 to-gold-600'        // Gradient
'text-gold-400'                     // Text
'bg-gold-500/20'                    // Background
'border-gold-500/30'                // Border
'shadow-glow-gold'                  // Glow

// Cyan (Secondary Accent)
'from-accent-400 to-accent-600'    // Gradient
'text-accent-400'                   // Text
'bg-accent-500/20'                  // Background

// Primary Blue
'from-primary-400 to-primary-600'  // Gradient
'text-primary-400'                  // Text

// Glass Effects
'bg-white/[0.08]'                   // Light glass
'backdrop-blur-xl'                  // Blur
'border-white/10'                   // Subtle border
```

## Responsive Breakpoints

```typescript
// Mobile First
className="text-4xl md:text-5xl lg:text-6xl"
className="grid md:grid-cols-2 lg:grid-cols-3"
className="py-12 md:py-20 lg:py-32"
className="px-6 md:px-8 lg:px-12"

// Container
className="container mx-auto px-6"
className="max-w-4xl mx-auto"
className="max-w-6xl mx-auto"
```

## Animation Patterns

```typescript
// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>

// Stagger children
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
))}

// Hover effects
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
>
```

## Testing Checklist

```bash
# Build test
npm run build

# Type check
npx tsc --noEmit

# Development
npm run dev

# Visit pages
http://localhost:3000/who-we-serve
http://localhost:3000/who-we-serve/legal-law-firms
http://localhost:3000/who-we-serve/home-services
# ... etc for all 12 industries
```

## Performance Best Practices

1. **Images**: Always use Next.js `<Image>` component
2. **Lazy Load**: Use `viewport={{ once: true }}` on animations
3. **Server Components**: Keep pages as Server Components (default)
4. **Client Components**: Only use `'use client'` when needed (IndustryCard for animations)
5. **Static Generation**: Use `generateStaticParams()` for all industries

---

**Quick Copy-Paste Snippets Ready to Use**
