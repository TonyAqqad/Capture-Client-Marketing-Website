# Trust Badges Code Examples & Usage Guide

## Quick Start

### 1. Basic Usage in Industry Page

```tsx
import { IndustryTrustBadges } from '@/components/industries/IndustryTrustBadges';

// In your page component
{industry.trustBadges && industry.trustBadges.length > 0 && (
  <IndustryTrustBadges
    badges={industry.trustBadges}
    clientCount={industry.clientCount}
    industryName={industry.name}
  />
)}
```

### 2. Adding Trust Badges to New Industry

```typescript
// In src/data/industries.ts

{
  id: 'your-industry',
  name: 'Your Industry',
  // ... other fields
  trustBadges: [
    {
      type: 'compliance',
      label: 'HIPAA Compliant',
      icon: 'health_and_safety',
      description: 'Full PHI protection'
    },
    {
      type: 'certification',
      label: 'ISO 27001',
      icon: 'security',
      value: 'Certified 2024'
    },
    {
      type: 'clients',
      label: '500+ Customers',
      icon: 'groups',
      value: 'Trusted Partner'
    },
    {
      type: 'award',
      label: '99.9% Uptime',
      icon: 'check_circle',
      value: 'SLA Guaranteed'
    }
  ],
  clientCount: 500, // Shows animated ticker
}
```

## Badge Type Reference

### Compliance Badges (Regulatory)
**Color**: Blue (`text-blue-400`)

```typescript
{
  type: 'compliance',
  label: 'HIPAA Compliant',
  icon: 'health_and_safety',
  description: 'Protected Health Information security'
}
```

**Common compliance badges:**
- HIPAA (Healthcare)
- SOC-II Type 2 (Security)
- SEC Compliant (Financial)
- FINRA Approved (Financial)
- ABA Compliant (Legal)
- GDPR Ready (Data Privacy)
- PCI DSS (Payment Card)

### Certification Badges
**Color**: Green (`text-green-400`)

```typescript
{
  type: 'certification',
  label: 'MLS Integrated',
  icon: 'home_work',
  description: 'Real-time property sync',
  value: 'Certified Partner' // Optional tag
}
```

**Common certifications:**
- NAR Member (Real Estate)
- BBB Accredited
- ISO 27001
- Licensed & Insured
- BAA Available (Healthcare)
- Encrypted Storage

### Client Count Badges
**Color**: Accent (`text-accent-400`)

```typescript
{
  type: 'clients',
  label: '1,200+ Contractors',
  icon: 'construction',
  value: 'Industry Leader'
}
```

**Variations:**
- "500+ Law Firms"
- "800+ Agents"
- "600+ Practices"
- "10K+ Jobs Booked/Month"

### Award Badges
**Color**: Gold (`text-gold-400`)

```typescript
{
  type: 'award',
  label: '99.9% Uptime',
  icon: 'check_circle',
  value: 'SLA Backed'
}
```

**Common awards:**
- 99.9% Uptime
- 24/7 Support
- Integration Partner (Salesforce, etc.)
- Best in Class
- Industry Recognition

### Rating Badges
**Color**: Yellow (`text-yellow-400`)

```typescript
{
  type: 'rating',
  label: 'Customer Reviews',
  icon: 'star',
  value: '4.9/5'
}
```

## Material Icons Reference

### Compliance Icons
```
health_and_safety    // HIPAA, Healthcare
security            // SOC-II, Cybersecurity
verified_user       // General compliance
gavel               // Legal, FINRA, ABA
lock                // Encryption, Data Security
public              // GDPR, International
shield              // Protection, Insurance
```

### Certification Icons
```
workspace_premium   // Premium certifications
verified            // Verified/Licensed
card_membership     // Memberships (NAR, etc.)
description         // Agreements (BAA)
sync                // Integrations (HL7 FHIR)
integration_instructions // Partner integrations
```

### Client/Business Icons
```
groups              // Client counts
construction        // Contractors
real_estate_agent   // Real estate
local_hospital      // Healthcare
trending_up         // Financial services
account_balance     // Legal, Financial
```

### Award/Achievement Icons
```
check_circle        // Uptime, Success
star                // Ratings, Reviews
workspace_premium   // Awards
support_agent       // 24/7 Support
event_available     // Bookings, Availability
favorite            // Patient-critical, Care
```

## Customization Options

### Custom Rating/Review Count

```tsx
<IndustryTrustBadges
  badges={industry.trustBadges}
  clientCount={1200}
  industryName="Healthcare Providers"
  rating={4.8}              // Custom rating (default: 4.9)
  reviewCount={500}         // Custom review count (default: 200)
/>
```

### Custom Styling

```tsx
<IndustryTrustBadges
  badges={badges}
  clientCount={800}
  className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
/>
```

## Animation Customization

### Client Count Animation Speed

In `IndustryTrustBadges.tsx`, modify the `duration`:

```typescript
const duration = 2000; // 2 seconds (default)
// Change to:
const duration = 3000; // 3 seconds (slower)
const duration = 1000; // 1 second (faster)
```

### Badge Stagger Delay

Modify the animation delay in the map:

```typescript
transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
// Faster: delay: 0.1 + index * 0.03
// Slower: delay: 0.3 + index * 0.1
```

## Real-World Examples

### Legal Industry
```typescript
trustBadges: [
  { type: 'compliance', label: 'ABA Compliant', icon: 'verified_user' },
  { type: 'compliance', label: 'SOC-II Certified', icon: 'security' },
  { type: 'certification', label: 'Attorney-Client Privilege', icon: 'gavel' },
  { type: 'clients', label: '500+ Law Firms', icon: 'account_balance' },
  { type: 'award', label: '99.9% Uptime', icon: 'check_circle' },
  { type: 'award', label: 'Clio Integration', icon: 'integration_instructions' },
],
clientCount: 500
```

### Healthcare Industry
```typescript
trustBadges: [
  { type: 'compliance', label: 'HIPAA Compliant', icon: 'health_and_safety' },
  { type: 'compliance', label: 'SOC-II Type 2', icon: 'security' },
  { type: 'certification', label: 'BAA Available', icon: 'description' },
  { type: 'clients', label: '600+ Practices', icon: 'local_hospital' },
  { type: 'award', label: 'Epic Integrated', icon: 'integration_instructions' },
  { type: 'award', label: '99.99% Uptime', icon: 'favorite' },
],
clientCount: 600
```

### Home Services Industry
```typescript
trustBadges: [
  { type: 'certification', label: 'BBB Accredited', icon: 'workspace_premium', value: 'A+ Rating' },
  { type: 'certification', label: 'Licensed & Insured', icon: 'verified' },
  { type: 'clients', label: '1,200+ Contractors', icon: 'construction' },
  { type: 'award', label: 'ServiceTitan Partner', icon: 'integration_instructions' },
  { type: 'clients', label: '50K+ Jobs Booked', icon: 'event_available', value: 'Monthly' },
],
clientCount: 1200
```

## TypeScript Interface

```typescript
interface TrustBadge {
  type: 'compliance' | 'rating' | 'certification' | 'clients' | 'award';
  label: string;           // Main badge text
  icon: string;            // Material Icon name
  value?: string;          // Optional tag (e.g., "A+ Rating")
  description?: string;    // Hover tooltip text
}

interface IndustryTrustBadgesProps {
  badges: TrustBadge[];
  clientCount?: number;    // Shows animated ticker
  industryName?: string;   // Used in ticker text
  rating?: number;         // Star rating (default: 4.9)
  reviewCount?: number;    // Review count (default: 200)
  className?: string;      // Additional Tailwind classes
}
```

## Accessibility Best Practices

### Screen Reader Support
```tsx
<section aria-label="Trust signals and social proof">
  <div role="img" aria-label={`${badge.label}${badge.value ? `: ${badge.value}` : ""}`}>
    {/* Badge content */}
  </div>
</section>
```

### Star Rating Accessibility
```tsx
<div aria-label={`${rating} out of 5 stars`}>
  {renderStars(rating)}
</div>
```

## Performance Tips

1. **Lazy Load**: Component uses `useInView` to only animate when visible
2. **Request Animation Frame**: Smooth 60fps count-up animation
3. **CSS Transforms**: Hardware-accelerated hover effects
4. **Conditional Rendering**: Only renders if badges exist

```tsx
// Good: Only render if data exists
{industry.trustBadges && industry.trustBadges.length > 0 && (
  <IndustryTrustBadges badges={industry.trustBadges} />
)}

// Bad: Always renders empty component
<IndustryTrustBadges badges={industry.trustBadges || []} />
```

## Common Patterns

### Full-Width with Background
```tsx
<IndustryTrustBadges
  badges={badges}
  clientCount={500}
  className="py-16 bg-gradient-to-b from-gray-900 to-black"
/>
```

### Compact Without Client Count
```tsx
<IndustryTrustBadges
  badges={badges}
  // No clientCount prop = no ticker section
/>
```

### Custom Industry Name
```tsx
<IndustryTrustBadges
  badges={badges}
  clientCount={800}
  industryName="Real Estate Professionals" // Custom text
/>
```

## Testing Checklist

- [ ] Badges render correctly on mobile (2 columns)
- [ ] Badges render correctly on tablet (3 columns)
- [ ] Badges render correctly on desktop (4 columns)
- [ ] Client count animates on scroll
- [ ] Star rating displays correctly
- [ ] Hover effects work on badges
- [ ] Compliance note shows for compliance-heavy industries
- [ ] Screen reader announces badges correctly
- [ ] Component doesn't render if no badges

## Troubleshooting

### Badges not showing?
Check that `trustBadges` array exists in your industry data:
```typescript
console.log(industry.trustBadges); // Should be array, not undefined
```

### Animation not triggering?
Ensure Framer Motion is installed:
```bash
npm install framer-motion
```

### Icons not showing?
Verify Material Icons are loaded in your layout:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### TypeScript errors?
Import the TrustBadge interface:
```typescript
import { TrustBadge } from '@/data/industries';
```

---

**Need Help?** Check the implementation in:
- `src/components/industries/IndustryTrustBadges.tsx`
- `src/data/industries.ts`
- `src/app/who-we-serve/[slug]/page.tsx`
