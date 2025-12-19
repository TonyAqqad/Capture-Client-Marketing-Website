# Learnings (lean)
- Always add `relative z-10` over backgrounds; use `overflow-hidden` on parents.
- Responsive defaults: `flex-col md:flex-row`, `grid md:grid-cols-2 lg:grid-cols-3`, `px-4 sm:px-6 lg:px-8`, buttons `w-full sm:w-auto`.
- Motion import must be `@/lib/motion`; include `viewport={{ once: true }}`.
- Standard components/classes first; avoid new button/glass styles; no hardcoded colors.
- Phone number: 865-346-6111 everywhere.
- Icons: use lucide-react only. Centralized mapping in `src/lib/icon-map.ts`.
- SEO: keep server/client split; metadata + canonical + JSON-LD on pages; titles <60 chars, descriptions ~150-160.
- Batch work: discovery agents in parallel; batch-fixer sequential per folder; verify with typecheck/build and quick audits.
- **Icon Serialization Pattern** (2025-12-07, Phase 4): In Next.js 14+, React components (like Lucide icons) cannot be passed directly from server to client components. Error: "Functions cannot be passed directly to Client Components". Fix: Pass icon NAME as string prop, then resolve to component inside the client component using an internal icon map. Example:
  ```tsx
  // Server: <IntegrationDetailHero categoryIcon="users" />
  // Client: const IconComponent = categoryIcons[categoryIcon] || null;
  ```
- **CSS Architecture Decision** (2025-12-07): Keep globals.css AND globals-mobile-optimized.css as separate files. globals.css = design system (standard rules), globals-mobile-optimized.css = performance overrides (uses !important for mobile-first loading). They serve different purposes and should remain separate.
- **Audit verification pattern** (2025-12-07, Phase 3): When running automated audits for unused imports, always verify removal candidates by checking actual usage in code. Tools like ts-prune can have false positives. Manual verification prevents accidentally removing imports that are used indirectly (e.g., via type inference, re-exports, or runtime-only usage).
- **$10M Hero Transformation Pattern** (2025-12-08): Complete hero transformation recipe:
  - **5 Background Layers**: Aurora base (opacity-40) → Floating orbs (parallax) → Geometric shapes → Particles → Noise texture
  - **Typography Formula**: 3-line headline using `clamp(2.8rem, 10vw, 6.5rem)`, weight contrast (200 vs 800), separate gradient for each line
  - **Scarcity Badge**: glass-3d container, ping animation on dot, gradient text, positioned at top
  - **CTA Pattern**: Gold gradient (`linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)`), pulsing glow via animated boxShadow
  - **Mobile Optimization**: All decorative elements use `hidden md:block`, static gradient fallbacks for mobile
  - **State Management**: Generate orbs/shapes/particles in useEffect with `mounted` flag to avoid hydration mismatch
- **Brand Color Consistency Pattern** (2025-12-08): Rules for avoiding "AI slop" aesthetics:
  - **Gold (#D4AF37)** = Primary CTAs, premium highlights, "money" feeling
  - **Cyan (#00C9FF)** = Secondary accent, tech/AI feeling, innovation
  - **Purple (#8B5CF6, #4F46E5)** = GRADIENTS ONLY - never standalone, always mixed with gold/cyan
  - **Deep Space (#070B14, #030508, #0A0E1A)** = Backgrounds, creates premium depth
  - **Off-brand to avoid**: Random blues (#3B82F6), greens (#10B981), oranges (#F97316), pinks (#EC4899), limes
  - **Audit strategy**: Search for hardcoded hex colors and Tailwind color classes not in palette
  - **Root cause fix**: Always check data files (like categoryThemes.ts) that propagate colors
  - **CTA rule**: ALL primary CTAs must be gold gradient, never blue/purple
  - **Purple exception**: OK in multi-color text gradients like `from-cyan via-purple to-gold`
- **Mobile Hero Typography Pattern** (2025-12-08): Important learnings for mobile typography:
  - **Avoid CSS clamp() for critical mobile text**: `clamp(2.8rem, 10vw, 6.5rem)` calculates poorly at 375px (10vw = 37.5px), resulting in text too small
  - **Use explicit Tailwind responsive classes**: `text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl` gives precise control
  - **Custom bracket notation**: When Tailwind's default scale (text-4xl = 2.25rem) isn't enough, use `text-[2.5rem]` or `text-[3rem]` for exact sizes
  - **Mobile hero minimum sizes**: Headlines should be at least 40px (text-[2.5rem]) for readability on 375px screens
  - **Visual hierarchy on mobile**: Make the most important word largest (e.g., "Clients" at 3rem vs "Your Business" at 2.5rem)
  - **Tighter vertical spacing on mobile**: Reduce margins (`mt-3` → `mt-2`) to keep headlines grouped visually
  - **Full-width CTAs**: Use `w-full sm:w-auto` for thumb-friendly tapping on mobile
  - **Trust indicators**: Add `bg-white/5 backdrop-blur-sm` glass background for better contrast on mobile
- **Component Orphan Verification Pattern** (2025-12-08, Component Consolidation): Important lesson learned when identifying orphaned components:
  - **Problem**: Initial grep/search for component imports may miss dynamic imports and indirect usage
  - **Examples of missed usage patterns**:
    - Dynamic imports: `const Component = dynamic(() => import('./Component'))` - grep for 'Component' may not find the import path string
    - Client component boundaries: Components imported in files that are themselves dynamically imported
    - Conditional rendering: Components only imported based on runtime conditions
  - **Proper verification process**:
    1. Search for component NAME (not just file path) using multiple patterns: `grep -r "ComponentName" src/`
    2. Search for partial path strings: `grep -r "features/SmartScheduler" src/`
    3. Check dynamic import patterns: `grep -r "dynamic.*import.*ComponentPath" src/`
    4. Verify in actual files flagged as "orphaned" before deletion
    5. Test build after deletion to catch missed dependencies
  - **False positive example**: InteractiveAIDemo was flagged as orphaned but was actually used via dynamic import on homepage
  - **Lesson**: Always manually verify "orphaned" components with multiple search strategies before deletion. Automated tools can miss indirect imports.
- **PremiumFinalCTA Aesthetic Pattern** (2025-12-08, Homepage Upgrade): Established deep space visual language for premium sections:
  - **Background layers** (bottom to top): Deep space gradient → aurora overlay → noise texture → content
  - **Deep space gradient**: `linear-gradient(135deg, #070B14, #030508, #0A0E1A)` for cosmic depth
  - **Aurora**: `bg-aurora-animated` positioned absolute with `opacity-20`, `mix-blend-mode: screen`
  - **Noise texture**: SVG filter with `<feTurbulence>` for grain/depth, applied via `backdrop-filter`
  - **Grid patterns**: Cyan/gold lines (`from-accent/10 via-transparent to-gold/5`) for structure
  - **Geometric shapes**: Floating decorative elements (circles, squares) hidden on mobile (`hidden md:block`)
  - **Glass effects**: Enhanced borders with `border-accent/20` or `border-gold/20`, `backdrop-blur-xl`
  - **Typography**: Glow underlines on headings via pseudo-elements with `animate-pulse-glow`
  - **Mobile-first**: Hide decorative elements on mobile for performance, show core content only
  - **Z-index layering**: Background (0) → Aurora (0) → Noise (0) → Geometric shapes (0) → Content (10)
  - **Color palette consistency**: Gold (#D4AF37), Cyan (accent), Deep space (#070B14, #030508, #0A0E1A)
  - This pattern can be standardized across other premium pages (pricing, features, etc.)
- **Enterprise SEO Infrastructure Pattern** (2025-12-15, Comprehensive SEO Audit): Lessons from achieving 8.8/10 SEO score:
  - **robots.ts implementation**: Dynamic robots.txt generation with proper host detection, user-agent rules, sitemap reference
  - **sitemap.ts strategy**: Automatic sitemap generation covering all routes (core pages, industries, services, locations), proper lastModified dates, change frequencies, priorities
  - **seo-config.ts centralization**: Single source of truth for all SEO metadata including OpenGraph defaults, Twitter card settings, verification codes, JSON-LD schemas
  - **Canonical URL pattern**: Always use `alternates: { canonical: 'https://captureclient.com/path' }` in metadata - critical for domain migrations
  - **Metadata template**: title max 60 chars (40% of site needs optimization), description 150-160 chars, always include openGraph + twitter objects
  - **JSON-LD schemas**: Comprehensive implementation across site (Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, Service) for rich snippets
  - **Domain migration verification**: Use systematic search (robots.ts, sitemap.ts, all metadata canonicals) to verify 100% migration completion
  - **100% metadata coverage**: Every page must have metadata export with title, description, openGraph, twitter, alternates - no exceptions
  - **Structured data benefits**: Proper JSON-LD enables rich snippets, knowledge panels, enhanced search results
  - **Verification codes**: Keep placeholder values in seo-config.ts until actual verification codes obtained from Google/Bing/Pinterest
- **Title Tag Optimization Pattern** (2025-12-15): Best practices for SEO-friendly title tags:
  - **60 character limit**: Google typically displays first 50-60 chars in SERPs, rest gets truncated with "..."
  - **Front-load keywords**: Put most important keywords at start of title (e.g., "AI Receptionist" before industry name)
  - **Avoid redundancy**: Don't repeat words unnecessarily (e.g., "AI Voice Agent AI" is wasteful)
  - **Brand suffix**: Use " | Capture Client" consistently (15 chars including spaces), leaving 45 chars for primary content
  - **Industry pattern**: "Service for Industry | Capture Client" (e.g., "AI Receptionist for Legal | Capture Client")
  - **Location pattern**: "Service in Location | Capture Client" (e.g., "AI Receptionist in Nashville | Capture Client")
  - **Audit strategy**: Search for long titles using regex, calculate character counts, prioritize highest-traffic pages
  - **Title vs H1**: Title tags can differ from H1 headings - optimize title for SERPs, H1 for on-page engagement
- **Pricing Schema Implementation Pattern** (2025-12-15): Structured data for pricing sections:
  - **Product schema**: Use `@type: "Product"` with `name`, `description`, `offers` array for each pricing tier
  - **Offer schema**: Each tier needs `@type: "Offer"`, `price`, `priceCurrency: "USD"`, `priceValidUntil`, `availability`
  - **Aggregate offers**: For multiple tiers, use `AggregateOffer` with `lowPrice` and `highPrice`
  - **Benefits**: Enables rich snippets in Google Shopping, price comparison tools, enhanced SERP display
  - **Homepage opportunity**: Current homepage pricing section lacks schema - adding it could improve visibility
  - **Annual billing**: Consider toggle for annual vs monthly pricing with separate schema entries
- **www Redirect Pattern in Next.js** (2025-12-15): Canonical domain enforcement via next.config.js:
  - **Problem**: www vs non-www creates duplicate content issues, splits SEO authority
  - **Solution**: Add 301 permanent redirect in next.config.js `async redirects()` function
  - **Implementation**: Check if hostname starts with 'www.', redirect to non-www version preserving path and query params
  - **Code pattern**:
    ```javascript
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'www.captureclient.com' }],
          destination: 'https://captureclient.com/:path*',
          permanent: true, // 301 redirect
        },
      ];
    }
    ```
  - **Verification**: Test both www and non-www URLs to ensure redirect works, check Google Search Console for duplicate indexing
  - **Canonical tags**: Keep canonical URLs in metadata pointing to non-www version for consistency
- **Form Theme Context Mismatch Pattern** (2025-12-15): Critical lesson for form component reusability:
  - **Problem**: OptimizedLeadForm was designed for dark backgrounds (white text, transparent dark inputs) but used in light-themed PremiumFinalCTA section, making all form fields invisible
  - **Symptoms**: Labels, inputs, placeholders all using `text-white`, `bg-white/[0.03]`, `border-white/10` - invisible on white backgrounds
  - **Fix strategy**: Convert all dark theme styling to light theme equivalents:
    - Text: `text-white` → `text-slate-900`
    - Backgrounds: `bg-white/[0.03]` → `bg-white`
    - Borders: `border-white/10` → `border-slate-200`
    - Focus states: Accent colors → Blue theme (`focus:border-blue-500 focus:ring-blue-100`)
  - **Design principle**: Forms should either be theme-agnostic (work on both light and dark) or have explicit theme variants
  - **Prevention**: When creating reusable forms, test on both light and dark backgrounds before marking complete
- **Mobile Trust Badge Contrast Pattern** (2025-12-15): Lessons for mobile readability optimization:
  - **Problem**: Trust badges on mobile homepage used `bg-white/60` (60% opacity) with `text-slate-800`, creating poor contrast
  - **Fix applied**:
    - Solid backgrounds: `bg-white/60` → `bg-white` with `border-slate-200 shadow-sm`
    - Stronger text: `text-slate-800` → `text-slate-900` for maximum contrast
    - Responsive sizing: `text-xs` → `text-xs sm:text-sm` for better mobile legibility
  - **Design principle**: On mobile, prefer solid backgrounds with proper shadows over transparent glass effects for critical UI elements
  - **Contrast rule**: Text on white should be `text-slate-900` (not 800/700) for WCAG compliance on small screens
- **Mobile Backdrop-Blur Fallback Pattern** (2025-12-15): Critical lesson for mobile CSS architecture:
  - **Problem**: Mobile CSS (globals.css lines 2296-2324) disables backdrop-blur for performance, then compensates with solid background colors using `!important`
  - **Original issue**: Used DARK fallback (`rgba(15, 20, 25, 0.97)`) which overrode ALL component-level light styling on mobile
  - **Fix applied**: Changed fallback to LIGHT (`rgba(255, 255, 255, 0.97)`) for site-wide light theme
  - **Affected elements**: Any element using `backdrop-blur-*` classes appears dark on mobile despite having `bg-white/70` in component
  - **Debugging strategy**: When mobile differs from desktop, check globals.css for mobile-specific media queries with `!important` rules
  - **Design principle**: Mobile fallback colors must match site theme - can't mix dark fallbacks with light-themed components
- **Glass Morphism Light Theme Pattern** (2025-12-15): Converting glass effects for light backgrounds:
  - **Dark glass classes** (DON'T use on light pages): `.glass`, `.glass-premium`, `.glass-card` - all use `bg-white/5` or lower opacity
  - **Light alternative**: `.glass-card-light` exists in globals.css with `rgba(255, 255, 255, 0.7)` - 70% opacity white
  - **Inline light glass**: `bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg`
  - **Text colors on light glass**: `text-slate-900` (headings), `text-slate-600` (body), `text-slate-500` (muted)
  - **Border pattern**: `border-slate-200` or `border-slate-200/60` instead of `border-white/10`
- **Pricing Consistency Pattern** (2025-12-15): Avoiding homepage/pricing page mismatches:
  - **Problem**: Homepage showed Growth plan at $997/mo, pricing page showed $950/mo - confusing for users, bad for trust
  - **Root cause**: PricingCards.tsx hardcoded different value than pricing page data
  - **Fix**: Update PricingCards.tsx to match canonical pricing page values
  - **Prevention**: Single source of truth for pricing - consider extracting to data/pricing.ts file
  - **Verification**: Search codebase for all price mentions (e.g., grep for "$997", "$950") to catch inconsistencies
  - **Best practice**: All pricing displays should pull from same data source, avoid hardcoding prices in multiple places
