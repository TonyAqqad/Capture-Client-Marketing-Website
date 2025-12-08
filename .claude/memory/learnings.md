# Learnings (lean)
- Always add `relative z-10` over backgrounds; use `overflow-hidden` on parents.
- Responsive defaults: `flex-col md:flex-row`, `grid md:grid-cols-2 lg:grid-cols-3`, `px-4 sm:px-6 lg:px-8`, buttons `w-full sm:w-auto`.
- Motion import must be `@/lib/motion`; include `viewport={{ once: true }}`.
- Standard components/classes first; avoid new button/glass styles; no hardcoded colors.
- Phone number: 865-346-3339 everywhere.
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
