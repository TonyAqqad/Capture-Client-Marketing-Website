# Integration Logos System

## Overview

This system provides a robust, production-ready solution for displaying integration partner logos across the Capture Client website. It includes 30+ integration logos with automatic fallbacks and flexible display options.

## Files Created

### 1. `src/data/integration-logos.ts`
Complete mapping of 30 integration logos with:
- Clearbit Logo API URLs (primary source)
- Official brand guidelines links
- Alternative URLs for some integrations (SVG, PNG, white versions)
- Helper functions for retrieving logos
- Category-based organization

### 2. `src/components/IntegrationLogo.tsx`
React component system with:
- **IntegrationLogo**: Main component with smart fallbacks
- **IntegrationLogoGrid**: Grid layout for multiple logos
- **IntegrationLogoMarquee**: Infinite scrolling animation

## Supported Integrations (30 Total)

### Automation & Workflows
- Zapier

### CRM Systems
- HubSpot
- Salesforce
- Pipedrive
- Zoho
- Keap

### Scheduling Tools
- Calendly
- Acuity Scheduling
- Setmore
- Google Calendar

### Communication Platforms
- Slack
- Microsoft Teams
- Zoom
- RingCentral
- Twilio
- Nextiva
- Dialpad
- OpenPhone

### Field Service Management
- ServiceTitan
- Housecall Pro
- Jobber

### Payment & Financial
- Stripe
- QuickBooks
- PayPal

### Marketing Automation
- Mailchimp
- ActiveCampaign
- GoHighLevel

### Legal Software
- Clio

### Analytics & Tracking
- Google Analytics
- CallRail

## Usage Examples

### Basic Logo Display

```tsx
import { IntegrationLogo } from '@/components/IntegrationLogo';

// Simple logo
<IntegrationLogo integration="zapier" size="md" />

// Large logo
<IntegrationLogo integration="hubspot" size="lg" />

// Custom size
<IntegrationLogo
  integration="salesforce"
  width={100}
  height={100}
/>

// Grayscale (common for "integrates with" sections)
<IntegrationLogo
  integration="slack"
  size="md"
  grayscale
/>
```

### Logo Grid

```tsx
import { IntegrationLogoGrid } from '@/components/IntegrationLogo';

<IntegrationLogoGrid
  integrations={[
    'zapier',
    'hubspot',
    'salesforce',
    'calendly',
    'slack',
    'stripe'
  ]}
  size="md"
  grayscale
  className="py-12"
/>
```

### Infinite Scrolling Marquee

```tsx
import { IntegrationLogoMarquee } from '@/components/IntegrationLogo';

<IntegrationLogoMarquee
  integrations={[
    'zapier',
    'hubspot',
    'salesforce',
    'calendly',
    'slack',
    'servicetitan',
    'twilio',
    'stripe'
  ]}
  speed="normal"
  size="md"
  grayscale
/>
```

### Get Logos by Category

```tsx
import { getIntegrationsByCategory } from '@/data/integration-logos';

// Get all CRM logos
const crmLogos = getIntegrationsByCategory('crm');
// Returns: [HubSpot, Salesforce, Pipedrive, Zoho, Keap]

// Get all communication platform logos
const commLogos = getIntegrationsByCategory('communication');
// Returns: [Slack, Teams, Zoom, RingCentral, Twilio, etc.]
```

### Direct Logo URL Access

```tsx
import { getIntegrationLogoUrl } from '@/data/integration-logos';

const zapierUrl = getIntegrationLogoUrl('zapier');
// Returns: 'https://logo.clearbit.com/zapier.com'
```

## Logo Fallback System

The component uses a **3-tier fallback strategy**:

1. **Primary**: Official logo from `integration-logos.ts` mapping
2. **Secondary**: Clearbit Logo API (automatic domain-based fallback)
3. **Tertiary**: Initials fallback (colored circle with first letter)

### Example Fallback Flow

```tsx
// If "custom-integration" is not in the mapping:
<IntegrationLogo integration="custom-integration" showNameFallback />

// 1. Tries: integration-logos.ts lookup → Not found
// 2. Tries: https://logo.clearbit.com/customintegration.com
// 3. Falls back to: Colored circle with "C" + "Custom Integration" text
```

## Integration Categories

All integrations are organized into categories:

```typescript
const categories = {
  automation: ['zapier'],
  crm: ['hubspot', 'salesforce', 'pipedrive', 'zoho', 'keap'],
  scheduling: ['calendly', 'acuity-scheduling', 'setmore', 'google-calendar'],
  communication: ['slack', 'microsoft-teams', 'zoom', 'ringcentral', 'twilio', 'nextiva', 'dialpad', 'openphone'],
  fieldService: ['servicetitan', 'housecall-pro', 'jobber'],
  payments: ['stripe', 'quickbooks', 'paypal'],
  marketing: ['mailchimp', 'activecampaign', 'gohighlevel'],
  legal: ['clio'],
  analytics: ['google-analytics', 'callrail'],
};
```

## Component Props

### IntegrationLogo

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `integration` | `string` | **required** | Integration key (e.g., 'zapier') |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset (32/48/64/96px) |
| `width` | `number` | - | Custom width (overrides size) |
| `height` | `number` | - | Custom height (overrides size) |
| `className` | `string` | - | Additional CSS classes |
| `showNameFallback` | `boolean` | `true` | Show name with initials fallback |
| `priority` | `boolean` | `false` | Priority loading for above-fold |
| `grayscale` | `boolean` | `false` | Apply grayscale filter with hover effect |

### IntegrationLogoGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `integrations` | `string[]` | **required** | Array of integration keys |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset |
| `grayscale` | `boolean` | `true` | Apply grayscale filter |
| `className` | `string` | - | Additional CSS classes |

### IntegrationLogoMarquee

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `integrations` | `string[]` | **required** | Array of integration keys |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Scroll speed (60s/40s/20s) |
| `grayscale` | `boolean` | `true` | Apply grayscale filter |
| `className` | `string` | - | Additional CSS classes |

## Logo Source Details

### Clearbit Logo API

All logos are sourced from Clearbit's Logo API:
- **URL Format**: `https://logo.clearbit.com/{domain}`
- **Advantages**:
  - High-quality, consistent logos
  - Automatic updates when companies rebrand
  - CDN-hosted for fast loading
  - No API key required
  - Free for reasonable usage
- **Image Format**: PNG
- **Resolution**: 128x128px (scaled cleanly)

### Alternative Sources

For some integrations, official SVG/PNG alternatives are available:

```typescript
// Example: Slack has official alternatives
const slackLogo = getIntegrationLogo('slack');
slackLogo.alternativeUrls.svg // Official SVG
slackLogo.alternativeUrls.white // White version for dark backgrounds
slackLogo.alternativeUrls.png // Official PNG
```

## Best Practices

### 1. Use Grayscale for "Integrates With" Sections

```tsx
<IntegrationLogoGrid
  integrations={['zapier', 'hubspot', 'salesforce']}
  grayscale // Subtle, professional appearance
/>
```

### 2. Add Priority Loading for Above-the-Fold Logos

```tsx
<IntegrationLogo
  integration="zapier"
  size="lg"
  priority // Loads immediately
/>
```

### 3. Category-Based Display

```tsx
// Show only CRM integrations
const crmIntegrations = getIntegrationsByCategory('crm');

<IntegrationLogoGrid
  integrations={crmIntegrations.map(logo => logo.name.toLowerCase().replace(/\s+/g, '-'))}
  size="md"
/>
```

### 4. Responsive Sizing

```tsx
<IntegrationLogo
  integration="hubspot"
  size="sm" // Mobile
  className="md:hidden"
/>
<IntegrationLogo
  integration="hubspot"
  size="lg" // Desktop
  className="hidden md:block"
/>
```

## Adding New Integrations

To add a new integration:

1. **Add to `integration-logos.ts`**:

```typescript
export const integrationLogos: Record<string, IntegrationLogo> = {
  // ... existing integrations

  'new-integration': {
    name: 'New Integration',
    logoUrl: 'https://logo.clearbit.com/newintegration.com',
    source: 'Clearbit Logo API',
    brandGuidelines: 'https://newintegration.com/brand', // Optional
  },
};
```

2. **Add to appropriate category** (optional):

```typescript
export const integrationCategories = {
  // ... existing categories

  yourCategory: ['new-integration'],
};
```

3. **Use immediately**:

```tsx
<IntegrationLogo integration="new-integration" size="md" />
```

## Performance Considerations

1. **Clearbit logos are cached** by Clearbit's CDN
2. **Images are optimized** via Next.js Image component
3. **Lazy loading** is automatic for off-screen logos
4. **Priority loading** available for above-fold images
5. **Unoptimized flag** set (Clearbit already optimizes)

## Brand Guidelines

Each integration includes a `brandGuidelines` link when available:

```typescript
const hubspot = getIntegrationLogo('hubspot');
console.log(hubspot.brandGuidelines);
// Output: 'https://www.hubspot.com/brand-kit'
```

**Always consult brand guidelines** before using logos in marketing materials!

## Example Sections

### "Integrates With Everything" Section

```tsx
import { IntegrationLogoGrid } from '@/components/IntegrationLogo';

export function IntegrationsSection() {
  const topIntegrations = [
    'zapier', 'hubspot', 'salesforce', 'calendly',
    'slack', 'servicetitan', 'twilio', 'stripe',
    'google-calendar', 'mailchimp', 'zoom', 'ringcentral'
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Integrates With Everything You Already Use
        </h2>

        <IntegrationLogoGrid
          integrations={topIntegrations}
          size="md"
          grayscale
          className="mb-8"
        />

        <p className="text-center text-gray-600 mt-8">
          Plus 5,000+ more via Zapier
        </p>
      </div>
    </section>
  );
}
```

### Infinite Scrolling Banner

```tsx
import { IntegrationLogoMarquee } from '@/components/IntegrationLogo';
import { getAllIntegrationLogos } from '@/data/integration-logos';

export function IntegrationsBanner() {
  const allIntegrations = getAllIntegrationLogos().map(
    logo => logo.name.toLowerCase().replace(/\s+/g, '-')
  );

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <IntegrationLogoMarquee
        integrations={allIntegrations}
        speed="normal"
        size="md"
        grayscale
      />
    </section>
  );
}
```

### Category-Based Integration Showcase

```tsx
import { getIntegrationsByCategory } from '@/data/integration-logos';
import { IntegrationLogoGrid } from '@/components/IntegrationLogo';

export function IntegrationsByCategory() {
  const crmIntegrations = getIntegrationsByCategory('crm');
  const commIntegrations = getIntegrationsByCategory('communication');

  return (
    <div className="space-y-16">
      <div>
        <h3 className="text-2xl font-bold mb-6">CRM Integrations</h3>
        <IntegrationLogoGrid
          integrations={crmIntegrations.map(l => l.name.toLowerCase().replace(/\s+/g, '-'))}
          size="md"
          grayscale
        />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6">Communication Platforms</h3>
        <IntegrationLogoGrid
          integrations={commIntegrations.map(l => l.name.toLowerCase().replace(/\s+/g, '-'))}
          size="md"
          grayscale
        />
      </div>
    </div>
  );
}
```

## Troubleshooting

### Logo not displaying?

1. Check integration key matches exactly (lowercase, hyphenated)
2. Verify domain is correct in `integration-logos.ts`
3. Check browser console for network errors
4. Clearbit may not have logo for that domain

### Logo quality issues?

1. Use `size="lg"` or `size="xl"` for larger displays
2. Consider using alternative SVG if available
3. For print/high-res, contact integration for official assets

### Slow loading?

1. Add `priority` prop for above-fold logos
2. Reduce number of logos per page
3. Consider lazy loading sections

## License & Usage

- **Clearbit Logo API**: Free for reasonable usage
- **Integration Logos**: Property of respective companies
- **Always consult brand guidelines** before commercial use
- **This system**: MIT License (use freely in Capture Client project)

## Support

For questions or issues with the integration logos system:
1. Check this README first
2. Review `integration-logos.ts` for available integrations
3. Test with `<IntegrationLogo integration="test" showNameFallback />` to see fallback behavior

---

**Built for Capture Client Website by Claude Code**
*Last Updated: 2025-12-04*
