# Case Studies Page - Code Patterns Reference

## Key Design Patterns Used

### 1. Glass Morphism Card
```tsx
// Premium glass card with border and backdrop blur
<div className="glass-premium p-6 lg:p-8 rounded-2xl border-2 border-accent/20
  transition-all duration-500 hover:border-accent/50 hover:shadow-glow hover:scale-[1.02]">
  {/* Content */}
</div>
```

### 2. Industry Badge with Gradient
```tsx
<div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
  bg-gradient-to-r ${gradient} mb-6 self-start`}>
  <span className="material-icons text-white text-lg">{icon}</span>
  <span className="text-sm font-bold text-white">{industry}</span>
</div>
```

### 3. Before/After Metric Display
```tsx
<div className="flex items-center gap-3">
  {/* Before */}
  <div className="flex-1 bg-surface-border/30 rounded-lg p-2 text-center">
    <p className="text-foreground-muted text-sm line-through">
      {result.before}
    </p>
  </div>

  {/* Arrow */}
  <span className="material-icons text-accent text-sm">arrow_forward</span>

  {/* After */}
  <div className="flex-1 bg-gradient-to-r from-accent/20 to-primary/20
    rounded-lg p-2 text-center border border-accent/30">
    <p className="text-accent font-bold text-sm">{result.after}</p>
  </div>
</div>
```

### 4. Filter Button Pattern
```tsx
<button
  onClick={() => setSelectedIndustry(industry)}
  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
    selectedIndustry === industry
      ? "bg-gradient-to-r from-accent to-primary text-white shadow-glow"
      : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border hover:border-accent/30"
  }`}
>
  {industry}
</button>
```

### 5. Expandable Content with AnimatePresence
```tsx
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 overflow-hidden"
    >
      {/* Expandable content */}
    </motion.div>
  )}
</AnimatePresence>
```

### 6. Card Entrance Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.95 }}
  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
  transition={{
    duration: 0.6,
    delay: index * 0.1,
    type: "spring",
    stiffness: 100,
  }}
  className="group h-full"
>
  {/* Card content */}
</motion.div>
```

### 7. Hover Gradient Overlay
```tsx
{/* Add to card container */}
<motion.div
  initial={{ opacity: 0 }}
  whileHover={{ opacity: 1 }}
  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5
    via-transparent to-primary/5 pointer-events-none"
/>
```

### 8. Corner Accent Effect
```tsx
{/* Appears on hover in top-right corner */}
<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl
  from-accent/10 to-transparent rounded-tr-2xl opacity-0
  group-hover:opacity-100 transition-opacity duration-500" />
```

### 9. Responsive Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Cards */}
</div>
```

### 10. Premium Background Layer
```tsx
<div className="absolute inset-0">
  <div className="absolute inset-0 bg-gradient-to-br from-background
    via-background-dark to-background" />
  <div className="absolute inset-0 bg-mesh-premium opacity-40" />

  {/* Floating glow orbs */}
  <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial
    from-accent/10 to-transparent rounded-full blur-3xl animate-float-slow" />
</div>
```

## TypeScript Interface Patterns

### Case Study Data Structure
```typescript
interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface CaseStudy {
  id: string;
  industry: string;
  company: string;
  location: string;
  problem: string;
  solution: string;
  results: CaseStudyResult[];
  duration: string;
  roi: string;
}
```

### Component Props Pattern
```typescript
interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function CaseStudyCard({
  study,
  index,
  isInView,
  isExpanded,
  onToggleExpand
}: CaseStudyCardProps) {
  // Component logic
}
```

## State Management Patterns

### Filter & Sort State
```typescript
const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
const [expandedCard, setExpandedCard] = useState<string | null>(null);
const [sortBy, setSortBy] = useState<"roi" | "duration">("roi");
```

### Computed Values with useMemo
```typescript
const filteredAndSortedStudies = useMemo(() => {
  let filtered = caseStudies;

  if (selectedIndustry !== "All") {
    filtered = caseStudies.filter(
      (study) => study.industry === selectedIndustry
    );
  }

  return filtered.sort((a, b) => {
    if (sortBy === "roi") {
      return parseInt(b.roi) - parseInt(a.roi);
    } else {
      return parseInt(a.duration.split(" ")[0]) -
             parseInt(b.duration.split(" ")[0]);
    }
  });
}, [caseStudies, selectedIndustry, sortBy]);
```

## Animation Patterns

### Staggered Grid Animation
```typescript
{filteredAndSortedStudies.map((study, index) => (
  <motion.div
    key={study.id}
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{
      duration: 0.6,
      delay: index * 0.1, // Stagger by 0.1s per card
    }}
  >
    {/* Card content */}
  </motion.div>
))}
```

### Hover Scale Effect
```typescript
<motion.div
  whileHover={{ y: -12, transition: { duration: 0.3 } }}
  className="group"
>
  {/* Content scales up on hover */}
</motion.div>
```

## SEO Schema Patterns

### WebPage Schema
```typescript
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://captureclientai.net/case-studies/#webpage",
  url: "https://captureclientai.net/case-studies",
  name: "Case Studies | Real Client Results",
  description: "See how Capture Client transforms businesses...",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "..." },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "..." },
    ],
  },
};
```

### ItemList Schema
```typescript
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  numberOfItems: caseStudiesData.length,
  itemListElement: caseStudiesData.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${study.company} - ${study.industry}`,
    url: `https://captureclientai.net/case-studies/${study.id}`,
  })),
};
```

## Responsive Patterns

### Conditional Rendering for Desktop
```tsx
{/* Hidden on mobile, visible on xl screens */}
<div className="absolute top-20 right-20 w-48 h-48 border border-accent/10
  rounded-3xl rotate-45 backdrop-blur-sm animate-float-slow hidden xl:block" />
```

### Responsive Typography
```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
  font-heading font-bold text-foreground">
  {/* Scales from 36px to 72px */}
</h1>
```

### Responsive Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Auto margins center, responsive padding, max-width constraint */}
</div>
```

## Performance Patterns

### Lazy Loading with useInView
```typescript
const containerRef = useRef<HTMLElement>(null);
const isInView = useInView(containerRef, { threshold: 0.2 });

// Only animate when in viewport
<motion.div
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
>
```

### Dynamic Import Pattern
```typescript
// In page.tsx (for heavy components)
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

## Accessibility Patterns

### Semantic Button
```tsx
<button
  onClick={onToggleExpand}
  className="flex-1 inline-flex items-center justify-center gap-2
    px-4 py-2.5 rounded-xl"
  aria-expanded={isExpanded}
  aria-label={isExpanded ? "Collapse case study" : "Expand case study"}
>
  {isExpanded ? "Show Less" : "View Details"}
</button>
```

### Icon with Text Label
```tsx
<span className="material-icons text-accent text-xl" aria-hidden="true">
  verified
</span>
<span className="text-sm text-foreground-muted">
  90-Day Money-Back Guarantee
</span>
```

## Reusable Component Patterns

### Industry Icon Mapping
```typescript
const industryIcons: Record<string, string> = {
  "HVAC Services": "ac_unit",
  "Dental Practice": "medical_services",
  "Plumbing Company": "plumbing",
  "Law Firm": "gavel",
};

// Usage
const icon = industryIcons[study.industry] || "business";
```

### Gradient Mapping
```typescript
const industryGradients: Record<string, string> = {
  "HVAC Services": "from-accent to-primary",
  "Dental Practice": "from-primary to-accent",
};

// Usage
const gradient = industryGradients[study.industry] || "from-accent to-primary";
```

---

These patterns are production-ready and follow the Component Architect standards for strict typing, accessibility, and performance.
