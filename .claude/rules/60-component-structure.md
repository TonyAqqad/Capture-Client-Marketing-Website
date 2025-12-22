# Component Structure Standards

## Size Limits

- **Components > 300 lines**: Should be split into smaller sub-components
- **Static data > 100 lines**: Should be extracted to `/src/data/`
- **Inline SVG icons**: Should be extracted if component exceeds limits

## Folder Structure for Complex Components

When a component grows complex (5+ related files), create a folder:

```
src/components/sections/[component-name]/
├── index.tsx           # Main orchestrator (exports default)
├── SubComponent1.tsx   # Extracted pieces
├── SubComponent2.tsx
├── types.ts            # Shared types (if needed)
└── icons/              # Co-located custom icons
    ├── CustomIcon1.tsx
    └── CustomIcon2.tsx
```

### Example: premium-services/

```
src/components/sections/premium-services/
├── index.tsx              # Orchestrates sections, manages shared state
├── ProblemStatement.tsx   # Problem stats section
├── VoiceAIHeroCard.tsx    # Hero feature card
├── ServicesGrid.tsx       # Grid of service cards
├── ServiceCard.tsx        # Reusable card component
├── FinalCTA.tsx           # Bottom CTA section
└── icons/
    ├── VoiceAIIcon.tsx
    ├── GoogleAdsIcon.tsx
    ├── FacebookAdsIcon.tsx
    └── LeadGenIcon.tsx
```

## Data Extraction Pattern

Static data arrays/objects belong in `/src/data/`:

```typescript
// src/data/[feature-name].ts

// 1. Define TypeScript interface
export interface MyDataType {
  name: string;
  value: number;
  category: string;
}

// 2. Export typed data array
export const myData: MyDataType[] = [
  { name: "Item 1", value: 100, category: "A" },
  { name: "Item 2", value: 200, category: "B" },
];

// 3. Provide helper functions
export function getByCategory(category: string): MyDataType[] {
  return myData.filter(item => item.category === category);
}

export function getByName(name: string): MyDataType | undefined {
  return myData.find(item => item.name === name);
}
```

### Existing Data Files (reference patterns)

- `src/data/integrations.ts` - Integration catalog (100+ items)
- `src/data/integration-partners.ts` - CRO partner logos
- `src/data/industries.ts` - Industry data
- `src/data/case-studies.json` - Case study content

## When to Split vs Keep Together

### Split when:
- Component exceeds 300 lines
- Multiple distinct visual sections
- Sub-components could be reused
- Data could be shared with other components

### Keep together when:
- Under 300 lines
- Tightly coupled logic
- Single-use animations/effects
- Would create unnecessary file overhead

## Import Patterns

### Orchestrator imports sub-components:
```typescript
// src/components/sections/premium-services/index.tsx
import { ProblemStatement } from './ProblemStatement';
import { VoiceAIHeroCard } from './VoiceAIHeroCard';
import { ServicesGrid } from './ServicesGrid';
import { FinalCTA } from './FinalCTA';
```

### External code imports from index:
```typescript
// Other files
import PremiumServices from '@/components/sections/premium-services';
```
