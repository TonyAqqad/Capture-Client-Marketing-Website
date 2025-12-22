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
- **Parallel Site Auditing Pattern** (2025-12-20): Efficient multi-page audit strategy using subagents:
  - **Problem**: Need to audit typography/contrast across 15+ pages without overwhelming main thread context
  - **Solution**: Deploy 8 parallel site-auditor subagents, each assigned 1-2 pages
  - **Benefits**:
    - Each agent runs independently (no context pollution)
    - Audits complete in parallel (faster than sequential)
    - Results aggregated without bloating main thread
  - **Implementation**: Assign related pages to same agent (e.g., Pricing agent audits both /pricing and /pricing/[slug])
  - **Result aggregation**: Create summary report of HIGH/MEDIUM/LOW priority issues across all agents
  - **Follow-up pattern**: Fix HIGH priority issues first (batch by commit), then MEDIUM, then LOW
  - **Lesson**: For site-wide audits, parallelize with subagents rather than reading all files in main thread
- **Blog Content Dark-to-Light Migration Pattern** (2025-12-20): Converting JSON blog content for light theme:
  - **Problem**: 20 blog JSON files had dark theme styles (text-gray-300, text-white, bg-gray-800/50) hardcoded in content
  - **Detection strategy**: Search for dark color classes in JSON files: `text-gray-300`, `text-white`, `text-amber-400`, `bg-gray-800`
  - **Light theme replacements**:
    - Body text: `text-gray-300` → `text-slate-600`
    - Headings: `text-white` → `text-slate-900`
    - Links/CTAs: `text-amber-400` → `text-blue-600`
    - Card backgrounds: `bg-gray-800/50` → `bg-slate-50`
  - **Validation**: Check blog rendering on live site to ensure readability on white background
  - **Batch approach**: Fixed all 20 blog files in single commit (27b3b3e) for atomic change
  - **Lesson**: When migrating themes, don't forget data files (JSON/MD) that contain hardcoded styling classes
- **Industry Benchmark Data Pattern** (2025-12-21): Creating reusable industry data structures for calculators:
  - **Problem**: Need industry-specific default values for ROI/cost calculators without hardcoding in components
  - **Solution**: Create centralized data file (e.g., `src/data/industry-benchmarks.ts`) with typed interface
  - **Structure**: Each industry object contains name, icon (Lucide component name as string), and benchmark metrics
  - **Benefits**:
    - Single source of truth for industry data
    - Type-safe with TypeScript interfaces
    - Easy to maintain/update benchmarks
    - Reusable across multiple calculator components
  - **Example structure**:
    ```typescript
    export interface IndustryBenchmark {
      name: string;
      icon: string; // Lucide icon name
      avgLeadValue: number;
      avgCallsPerWeek: number;
      avgAnswerRate: number;
    }
    ```
  - **Usage pattern**: Import benchmarks array, map to dropdown options, auto-fill calculator inputs on industry selection
  - **Lesson**: Centralize domain-specific data (industry benchmarks, pricing tiers, feature sets) in `/data` directory rather than component files
- **Calculator UX Pattern with 3D Effects** (2025-12-21): Best practices for interactive calculators:
  - **Desktop enhancement**: Use 3D tilt effects (react-tilt-tsx or custom useHover hooks) on result cards for premium feel
  - **Mobile optimization**: Disable 3D effects on mobile with `useIsMobile` hook to avoid performance issues + awkward touch interactions
  - **Animated counters**: Use react-countup or custom useCountUp hook for number animations when results update
  - **Visual hierarchy**: 3 result cards pattern works well - Monthly Impact → AI Opportunity → Annual Impact
  - **Input types**: Sliders work better than text inputs for range-based values (feels more interactive, prevents invalid input)
  - **Auto-fill pattern**: When user selects industry from dropdown, auto-populate sliders with benchmark defaults
  - **FAQ section**: Add calculator-related FAQ at bottom for SEO value + user education
  - **Schema markup**: Include SoftwareApplication JSON-LD schema with calculator features for rich snippets
  - **Lesson**: Calculators should feel playful and interactive on desktop, but stay performant and touch-friendly on mobile
- **Demo Personalization Pattern with SessionStorage** (2025-12-21): Persisting user input across page interactions:
  - **Problem**: Demo personalization data (business name, industry) should persist across page refreshes but not permanently
  - **Solution**: Use sessionStorage (not localStorage) for temporary persistence within browser session
  - **Implementation**: Save to sessionStorage on input change, load on component mount
  - **Benefits of sessionStorage over localStorage**:
    - Clears automatically when user closes tab/browser
    - Better for privacy (doesn't persist indefinitely)
    - Appropriate for demo/trial data that shouldn't be permanent
  - **UX pattern**: Collapsible accordion UI (collapsed by default) reduces friction:
    - Users can try demo immediately without filling form
    - Power users can expand to personalize experience
    - Shows/hides based on accordion state
  - **API integration**: Pass personalization data in POST body to Claude API for industry-specific responses
  - **Visual indicators**: Show "Personalized" badge or dynamic subtitle when personalization is active
  - **Required vs Optional fields**: Only require minimums (business name + industry), make phone/location optional to reduce friction
  - **Lesson**: For demo/trial features, use sessionStorage + collapsible UI to balance personalization value with low friction
- **Conversation History Pattern for Chat Simulators** (2025-12-21): Building multi-turn conversation UIs:
  - **Problem**: Need to display conversation history in chat UI while maintaining typewriter effect for new messages
  - **Solution**: Store messages in array state, show typewriter only on latest AI message
  - **Message interface**: Include role (user/assistant), content, timestamp, optional metadata (intent, score)
  - **Visual pattern**: User messages on right (blue bubbles), AI messages on left (white bubbles)
  - **Performance**: Only animate latest message, render older messages statically to avoid re-rendering animations
  - **UX enhancements**:
    - Clear input field after submission (better affordance)
    - Show intent badges on AI responses (booking, info-request, objection, etc.)
    - Display lead score + CRM fields after conversation starts (not before)
  - **State management**: Add message to array on submit, update latest message when API responds
  - **Example structure**:
    ```typescript
    interface ConversationMessage {
      role: 'user' | 'assistant';
      content: string;
      timestamp: Date;
      intent?: string;
      score?: number;
    }
    ```
  - **Lesson**: For chat simulators, separate conversation history (static) from active message (animated) for better performance and UX
- **Cross-Component Personalization Sync Pattern** (2025-12-21): Syncing state between sibling components:
  - **Problem**: PersonalizationForm and LeadResponseSimulator are siblings, need to sync industry selection
  - **Solution**: Lift state to parent (DemoContent), pass data as props, use useEffect for side effects
  - **Industry mapping**: Create explicit mapping between form industries and simulator enum values
  - **UX considerations**:
    - Hide redundant UI when personalized (e.g., "Try an example" section)
    - Show visual indicators of personalization (badges, dynamic text)
    - Update placeholder text to reference business name
  - **Implementation pattern**:
    ```typescript
    // Parent component
    const [personalization, setPersonalization] = useState<PersonalizationData | null>(null);

    // Child 1: Form
    <PersonalizationForm onUpdate={setPersonalization} />

    // Child 2: Simulator with sync effect
    useEffect(() => {
      if (personalization?.industry) {
        setSelectedIndustry(mapIndustryToEnum(personalization.industry));
      }
    }, [personalization]);
    ```
  - **Lesson**: When sibling components need to stay in sync, lift state to parent and use useEffect in children for derived state
- **Light Theme Migration for Integration Cards** (2025-12-21): Converting dark-themed card components to light:
  - **Problem**: GradientCard and IntegrationHowItWorks used dark theme classes (bg-premium-card, glass-premium-mobile) incompatible with light theme pages
  - **Root cause**: Components designed for dark backgrounds now used on white pages
  - **Fix pattern**:
    - Replace semantic dark tokens: `bg-premium-card` → `bg-white/90`
    - Adjust overlays: `to-black/[0.05]` → `to-slate-100/10` (light tint instead of dark)
    - Replace dark glass: `glass-premium-mobile` → `bg-white/80 backdrop-blur-md border-slate-200/60`
    - Fix text contrast: `text-black` → `text-white` on colored backgrounds (e.g., blue step badges)
  - **Validation**: Check all integration pages to ensure consistent light theme
  - **Lesson**: When migrating to light theme, audit all card/glass components for dark-specific styling, especially semantic tokens that may hide dark backgrounds
- **Schema Discovery Pattern** (2025-12-21): Audit agents can miss existing schemas:
  - **Problem**: Searching for `<script type="application/ld+json">` misses schemas rendered via helper functions
  - **Real implementation**: Site uses `generateXXXSchema()` from `@/lib/seo-config` + `<JsonLd>` component
  - **Verification strategy**: Check for:
    1. Inline `<script>` tags with dangerouslySetInnerHTML
    2. Helper function calls (e.g., `generateOrganizationSchema()`)
    3. `<JsonLd schema={...}>` component usage in layout/pages
  - **Example**: Homepage already had Organization + WebSite schemas via layout.tsx, but audit reported them as missing
  - **Lesson**: Before claiming schemas are missing, verify all three implementation patterns
- **Legacy Documentation Archiving Pattern** (2025-12-21): Preventing agent confusion:
  - **Problem**: 20 outdated files (gold theme, dark mode, old phone) were misleading agents
  - **Solution**: Move to `docs/_archive/` (gitignored) + create `.claude/rules/05-ignore-paths.md`
  - **Files archived**: UI_DESIGN_SUMMARY.txt, PRICING_TRANSFORMATION_SUMMARY.md, navigation-README.md, patch files, QA scripts
  - **Guardrails**: Explicit rule file tells agents to ignore archived content, documents correct patterns
  - **Lesson**: When migrating design systems, actively archive outdated docs rather than letting them accumulate
- **Parallel Audit Orchestration Pattern** (2025-12-21): Efficient site-wide audits:
  - **Strategy**: Launch 4 specialized subagents simultaneously for comprehensive pre-deployment scan
  - **Agents deployed**: site-auditor (Desktop), site-auditor (Mobile), schema-builder, code-reviewer
  - **Benefits**: Parallel execution, independent context per agent, results aggregated without bloating main thread
  - **Lesson**: For site-wide audits, parallelize with specialized subagents rather than reading all files in main thread
- **JSON-LD Schema Compliance Patterns** (2025-12-21): Critical schema.org compliance fixes:
  - **Duplicate script IDs**: When using a reusable `<JsonLd>` component, add `idPrefix` prop based on schema content hash to prevent ID collisions when both layout and page render schemas
  - **SearchAction validation**: Only include `potentialAction.SearchAction` if the target URL actually exists. No `/search` route = remove SearchAction
  - **AggregateRating**: Never include ratings without verified review data. Google treats fake ratings as spam
  - **GeoCoordinates**: Must use numeric `latitude`/`longitude` values, not address fields like `addressLocality`. If no lat/long data, omit `geo` entirely
  - **Non-standard properties**: Use only schema.org vocabulary. `integrationWith` is NOT valid; use `isRelatedTo` for software relationships
  - **Validation strategy**: After schema changes, validate with Google Rich Results Test before shipping
- **Orchestration Docs Consistency Pattern** (2025-12-21): Keeping agent docs aligned:
  - **Skill vs Command distinction**: Skills provide domain knowledge context; Commands are action-oriented workflows
  - **Naming alignment**: When renaming skills/commands, update ALL references: CLAUDE.md, state.md, command files, skill files
  - **Policy vs Enforcement**: Clarify when rules are "guidance" (ask before editing) vs "enforced" (settings.json deny rules)
  - **Unused MCP configs**: Remove stale MCP configs (e.g., ccmem.json) rather than leaving them to confuse agents
  - **Search pattern**: Use `grep -r "skill-name" .claude/` to find all references before renaming
