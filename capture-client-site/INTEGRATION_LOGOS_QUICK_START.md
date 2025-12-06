# Integration Logos - Quick Start Cheat Sheet

## 🚀 Copy & Paste This First

```tsx
import { IntegrationLogo, IntegrationLogoGrid } from '@/components/IntegrationLogo';
```

---

## 📦 Most Common Use Cases

### 1. Simple Logo
```tsx
<IntegrationLogo integration="zapier" size="md" />
```

### 2. Hero Section (Most Popular)
```tsx
<IntegrationLogoGrid
  integrations={[
    'zapier', 'hubspot', 'salesforce', 'calendly',
    'slack', 'servicetitan', 'twilio', 'stripe',
    'google-calendar', 'mailchimp', 'zoom', 'ringcentral'
  ]}
  size="lg"
  grayscale
/>
```

### 3. Infinite Scroll Banner
```tsx
import { IntegrationLogoMarquee } from '@/components/IntegrationLogo';

<IntegrationLogoMarquee
  integrations={['zapier', 'hubspot', 'salesforce', 'calendly', 'slack']}
  speed="normal"
  grayscale
/>
```

---

## 🎯 All 30 Integration Keys

Copy-paste any of these keys into the `integration` prop:

### Popular (Top 10)
```
'zapier'
'hubspot'
'salesforce'
'calendly'
'slack'
'servicetitan'
'twilio'
'stripe'
'google-calendar'
'zoom'
```

### CRM
```
'hubspot'
'salesforce'
'pipedrive'
'zoho'
'keap'
```

### Communication
```
'slack'
'microsoft-teams'
'zoom'
'ringcentral'
'twilio'
'nextiva'
'dialpad'
'openphone'
```

### Scheduling
```
'calendly'
'acuity-scheduling'
'setmore'
'google-calendar'
```

### Field Service
```
'servicetitan'
'housecall-pro'
'jobber'
```

### Payments
```
'stripe'
'quickbooks'
'paypal'
```

### Marketing
```
'mailchimp'
'activecampaign'
'gohighlevel'
```

### Other
```
'clio' (Legal)
'google-analytics' (Analytics)
'callrail' (Analytics)
```

---

## 🎨 Size Options

```tsx
size="sm"  // 32px
size="md"  // 48px (default)
size="lg"  // 64px
size="xl"  // 96px

// Or custom:
width={100} height={100}
```

---

## 🖼️ Common Patterns

### Pattern 1: "Integrates With" Section
```tsx
<section className="py-24 bg-white">
  <h2 className="text-4xl font-bold text-center mb-12">
    Integrates With Everything You Already Use
  </h2>
  <IntegrationLogoGrid
    integrations={['zapier', 'hubspot', 'salesforce', 'calendly', 'slack', 'stripe']}
    size="lg"
    grayscale
  />
</section>
```

### Pattern 2: Footer Integrations
```tsx
<div className="border-t pt-8">
  <p className="text-sm text-gray-500 text-center mb-4">Integrates With</p>
  <div className="flex justify-center gap-8">
    {['zapier', 'hubspot', 'salesforce'].map(key => (
      <IntegrationLogo key={key} integration={key} size="sm" grayscale />
    ))}
  </div>
</div>
```

### Pattern 3: Dark Background
```tsx
<section className="py-24 bg-blue-700 text-white">
  <h2 className="text-4xl font-bold text-center mb-12">
    Works With Your Stack
  </h2>
  <div className="flex justify-center gap-12 flex-wrap">
    {['hubspot', 'salesforce', 'slack'].map(key => (
      <div key={key} className="bg-white/10 rounded-xl p-4">
        <IntegrationLogo integration={key} size="lg" />
      </div>
    ))}
  </div>
</section>
```

---

## 📋 Props Cheat Sheet

### IntegrationLogo
| Prop | Type | Default | Example |
|------|------|---------|---------|
| `integration` | string | required | `"zapier"` |
| `size` | sm\|md\|lg\|xl | `"md"` | `"lg"` |
| `grayscale` | boolean | `false` | `true` |
| `priority` | boolean | `false` | `true` |
| `className` | string | - | `"mx-auto"` |

### IntegrationLogoGrid
| Prop | Type | Default | Example |
|------|------|---------|---------|
| `integrations` | string[] | required | `['zapier', 'hubspot']` |
| `size` | sm\|md\|lg\|xl | `"md"` | `"lg"` |
| `grayscale` | boolean | `true` | `false` |
| `className` | string | - | `"py-12"` |

### IntegrationLogoMarquee
| Prop | Type | Default | Example |
|------|------|---------|---------|
| `integrations` | string[] | required | `['zapier', 'hubspot']` |
| `speed` | slow\|normal\|fast | `"normal"` | `"slow"` |
| `size` | sm\|md\|lg\|xl | `"md"` | `"md"` |
| `grayscale` | boolean | `true` | `true` |

---

## 🔧 Advanced Usage

### Get Category Logos
```tsx
import { getIntegrationsByCategory } from '@/data/integration-logos';

const crmLogos = getIntegrationsByCategory('crm');
// Returns: [HubSpot, Salesforce, Pipedrive, Zoho, Keap]
```

### Get Single Logo URL
```tsx
import { getIntegrationLogoUrl } from '@/data/integration-logos';

const url = getIntegrationLogoUrl('zapier');
// Returns: 'https://logo.clearbit.com/zapier.com'
```

### Custom Fallback
```tsx
<IntegrationLogo
  integration="custom-integration"
  showNameFallback={true} // Shows colored circle + name if logo fails
/>
```

---

## ✅ Ready-to-Use Examples

All examples are in: `src/components/examples/IntegrationsShowcase.tsx`

1. **IntegrationsHeroSection** - Full hero with 12 logos
2. **IntegrationsBanner** - Infinite scrolling (all 30 logos)
3. **IntegrationsByCategory** - Organized by CRM, Communication, etc.
4. **FeaturedIntegrations** - Detailed cards with benefits
5. **IntegrationsFooter** - Compact footer display
6. **IntegrationCTA** - CTA with logo proof
7. **SingleIntegrationHighlight** - Highlight one integration

**Import and use**:
```tsx
import { IntegrationsHeroSection } from '@/components/examples/IntegrationsShowcase';

<IntegrationsHeroSection />
```

---

## 🐛 Troubleshooting

### Logo not showing?
✅ Check integration key is lowercase and hyphenated
❌ `'Google Calendar'`
✅ `'google-calendar'`

### Want custom logo?
```tsx
// Add to src/data/integration-logos.ts
'my-integration': {
  name: 'My Integration',
  logoUrl: 'https://logo.clearbit.com/myintegration.com',
  source: 'Clearbit Logo API',
}
```

### Logo too small/big?
```tsx
// Use custom dimensions
<IntegrationLogo integration="zapier" width={128} height={128} />
```

---

## 📚 Full Documentation

See **INTEGRATION_LOGOS_README.md** for complete documentation.

---

## 🎯 Quick Implementation Checklist

- [ ] Import IntegrationLogo or IntegrationLogoGrid
- [ ] Choose integration keys from list above
- [ ] Set size (sm/md/lg/xl)
- [ ] Add `grayscale` for subtle appearance
- [ ] Deploy!

**That's it!** 🚀
