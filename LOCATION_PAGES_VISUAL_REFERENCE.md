# Location Pages: Visual Design Reference

## Component-by-Component Breakdown

---

## 1. AURORA HERO (Full-Screen)

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  [Aurora Animated Background - flowing cyan/blue/purple]│
│                                                          │
│      🗺️  Voice AI Agency in                             │
│         KNOXVILLE, TN                                    │
│                                                          │
│    Stop Losing $47,000/Year to Missed Calls             │
│              in Knoxville                                │
│                                                          │
│  AI Voice Agents That Answer, Qualify, and Convert      │
│                Leads 24/7 for Knoxville Businesses       │
│                                                          │
│  [ 📞 Call Our Knoxville Team (865) 346-3339 → ]       │
│  [         Get Your Free Consultation         ]         │
│                                                          │
│  ✓ Free Strategy Call  ⚡ 15-Min Response  👤 Local     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Key Design Elements
- **Background**: 3 animated gradient orbs moving independently
- **Badge**: Location icon + city name in cyan gradient
- **Headline**: White text with orange/gold gradient on dollar amount
- **Phone CTA**: Primary gradient button (cyan → blue) with local number
- **Secondary CTA**: Glass morphism outline button
- **Trust Bar**: Green verified badge + cyan icons

### Color Palette
```css
/* Aurora gradients */
from-cyan-400/30 via-blue-500/20 to-transparent
from-blue-600/20 via-cyan-500/30 to-transparent
from-cyan-300/20 via-blue-400/20 to-transparent

/* Text gradient */
from-orange-400 via-orange-500 to-amber-400

/* CTAs */
from-cyan-400 via-cyan-500 to-blue-500
```

---

## 2. LOCAL MARKET STATS (Animated Counters)

### Desktop Layout (3 Columns)
```
┌──────────────────────────────────────────────────────────┐
│        📉 The Cost of Missed Calls                       │
│   Knoxville Businesses Are Bleeding Revenue             │
│                                                          │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│ │   🏪       │  │   📞❌     │  │   🏙️      │         │
│ │            │  │            │  │            │         │
│ │ $47,000    │  │   27%      │  │  $5.6M     │         │
│ │ per year   │  │ of calls   │  │ city-wide  │         │
│ │            │  │            │  │            │         │
│ │ Avg loss   │  │ Avg missed │  │ Total loss │         │
│ └────────────┘  └────────────┘  └────────────┘         │
│                                                          │
│  [ Don't Let Your Knoxville Business Be Part... → ]     │
└──────────────────────────────────────────────────────────┘
```

### Mobile Layout (Stacked)
```
┌──────────────────────┐
│  📉 The Cost of      │
│   Missed Calls       │
│                      │
│ ┌──────────────────┐ │
│ │  🏪              │ │
│ │  $47,000         │ │
│ │  per business    │ │
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │  📞❌            │ │
│ │  27%             │ │
│ │  of calls missed │ │
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │  🏙️              │ │
│ │  $5.6M           │ │
│ │  city-wide loss  │ │
│ └──────────────────┘ │
│                      │
│ [ Fix This Now → ]   │
└──────────────────────┘
```

### Animation Behavior
- Numbers count up from 0 when scrolled into view
- Duration: 2-3 seconds
- Easing: ease-out for natural feel
- One-time animation (doesn't repeat)

---

## 3. LOCAL INDUSTRIES SERVED

### Desktop (Tabs)
```
┌─────────────────────────────────────────────────────────┐
│       🏢 Popular Industries in Knoxville                │
│                                                          │
│  [🔧 HVAC] [⚖️ Legal] [🏥 Medical] [🏠 Real Estate]    │
│   ──────                                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │  🔧                                              │   │
│  │                                                  │   │
│  │  HVAC & Home Services                            │   │
│  │                                                  │   │
│  │  24/7 call answering for emergency calls        │   │
│  │                                                  │   │
│  │  ✓ 24/7 availability  ✓ Lead qualification     │   │
│  │  ✓ Auto booking       ✓ CRM integration         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Mobile (Horizontal Scroll)
```
┌──────────────────────────────────────────────────────┐
│     🏢 Popular Industries in Knoxville               │
│                                                      │
│  →  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐    │
│     │ 🔧    │  │ ⚖️    │  │ 🏥    │  │ 🏠    │    │
│     │       │  │       │  │       │  │       │    │
│     │ HVAC  │  │ Legal │  │Medical│  │ Real  │    │
│     │       │  │       │  │       │  │Estate │    │
│     │24/7...│  │Pre-...│  │HIPAA..│  │Quali..│    │
│     └───────┘  └───────┘  └───────┘  └───────┘    │
│     ● ○ ○ ○                                         │
└──────────────────────────────────────────────────────┘
```

### Interaction States
- **Inactive tab**: Gray text, slate background
- **Active tab**: Cyan text, cyan border, dot indicator below
- **Hover**: Border color brightens
- **Mobile swipe**: Snap to card, smooth scroll

---

## 4. COMPETITOR COMPARISON

### Desktop (Table)
```
┌──────────────────────────────────────────────────────────┐
│         ⚖️ Why Knoxville Businesses Choose Us            │
│                                                          │
│  Feature      │ 🏆 Capture Client │ Traditional Services│
│  ─────────────┼───────────────────┼─────────────────────│
│  ⚡ Answer    │ ✅ < 2 seconds    │ ❌ 30+ seconds      │
│     Speed     │                   │   (if answered)     │
│  ─────────────┼───────────────────┼─────────────────────│
│  ⏰ 24/7      │ ✅ Always         │ ❌ Business hours   │
│    Available  │    available      │    only             │
│  ─────────────┼───────────────────┼─────────────────────│
│  📞 Call      │ ✅ Every call     │ ❌ 27% of calls     │
│     Quality   │    answered       │    missed           │
│  ─────────────┼───────────────────┼─────────────────────│
│  🎯 Lead      │ ✅ Instant AI     │ ❌ Manual (wastes   │
│     Qualific. │    qualification  │    time)            │
│  ─────────────┼───────────────────┼─────────────────────│
│  ⏱️ Setup     │ ✅ 1-2 weeks      │ ❌ 4-6 weeks        │
│     Time      │                   │                     │
│  ─────────────┼───────────────────┼─────────────────────│
│  💰 Monthly   │ ✅ From $497/mo   │ ❌ $3,000+ for      │
│     Cost      │                   │    staff            │
│  ─────────────┴───────────────────┴─────────────────────│
│                                                          │
│  [ Experience the Difference in Knoxville → ]           │
└──────────────────────────────────────────────────────────┘
```

### Mobile (Stacked Cards)
```
┌────────────────────┐
│ ⚡ Answer Speed    │
│                    │
│ Us: ✅ < 2 sec     │
│ Others: ❌ 30+ sec │
├────────────────────┤
│ ⏰ 24/7 Available  │
│                    │
│ Us: ✅ Always      │
│ Others: ❌ Hours   │
├────────────────────┤
│ ... (etc)          │
└────────────────────┘
```

### Highlight Behavior
- Rows with `highlight: true` get cyan/5 background tint
- Green badges for "us" column
- Red badges for "competitors" column
- Hover effect on desktop rows

---

## 5. SERVICE AREA MAP

### Desktop Layout
```
┌─────────────────────────────────────────────────────────┐
│      🗺️ Serving Knoxville and Surrounding Areas        │
│    Full Voice AI coverage within 30 miles of Knox..    │
│                                                          │
│  ┌─────────────────────┐  ┌────────────────────────┐   │
│  │                     │  │ We Proudly Serve:      │   │
│  │      •  •  •        │  │                        │   │
│  │   •     ⦿     •     │  │ 📍 Downtown Knoxville  │   │
│  │      KNOXVILLE      │  │ 📍 West Knoxville      │   │
│  │   •     •     •     │  │ 📍 Farragut            │   │
│  │      •  •  •        │  │ 📍 Maryville           │   │
│  │                     │  │ 📍 Oak Ridge           │   │
│  │  ✓ 30 miles radius  │  │ 📍 Sevierville         │   │
│  └─────────────────────┘  │ 📍 Alcoa               │   │
│                           │ 📍 Powell              │   │
│                           │                        │   │
│                           │ 💬 Don't See Your Area?│   │
│                           │    Contact us to check │   │
│                           │    coverage → ──────── │   │
│                           └────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Map Visual Details
- **Center**: Large cyan pin with location icon
- **Pulse rings**: 3 concentric circles animating outward
- **Nearby dots**: Blue dots positioned at angles around center
- **Tooltips**: Hover over dots shows area name
- **Legend**: Green "Full Coverage" badge at bottom

### Mobile Stacking
```
┌──────────────────────┐
│  [Visual Map]        │
│      •  •  •         │
│   •     ⦿     •      │
│  KNOXVILLE           │
│   •     •     •      │
│      •  •  •         │
│                      │
│  ✓ 30 miles radius   │
├──────────────────────┤
│ We Serve:            │
│ 📍 Downtown Knox...  │
│ 📍 West Knoxville    │
│ 📍 Farragut          │
│ ... (all areas)      │
│                      │
│ Don't See Your Area? │
│ [ Contact Us → ]     │
└──────────────────────┘
```

---

## Color System Summary

### Aurora Hero
| Element | Color |
|---------|-------|
| Background base | `slate-950` |
| Aurora orb 1 | `cyan-400/30 → blue-500/20` |
| Aurora orb 2 | `blue-600/20 → cyan-500/30` |
| Aurora orb 3 | `cyan-300/20 → blue-400/20` |
| Grid overlay | `cyan-400/8` |
| Location badge | `cyan-300` text, `cyan-400` glow |
| Headline | `white` |
| Dollar amount | `orange-400 → amber-400` gradient |
| Primary CTA | `cyan-400 → blue-500` gradient |

### Market Stats
| Element | Color |
|---------|-------|
| Section badge | `orange-400` |
| Card backgrounds | `slate-900/90` |
| Card borders | `orange-400/20`, `red-400/20`, `amber-400/20` |
| Number text | Matching gradient (orange, red, amber) |
| Icon backgrounds | Matching color with /20 opacity |

### Industries Tabs
| Element | Color |
|---------|-------|
| Active tab | `cyan-400` text, `cyan-400/50` border |
| Inactive tab | `slate-400` text, `slate-700` border |
| Card background | `slate-900/80` |
| Icon container | `cyan-400/20 → blue-500/20` |
| Checkmarks | `green-400` |

### Competitor Table
| Element | Color |
|---------|-------|
| Header background | `slate-900/50` |
| Our column | `cyan-400` header |
| Checkmark badges | `green-500/10` bg, `green-400` icon |
| X badges | `red-500/10` bg, `red-400` icon |
| Highlight rows | `cyan-400/5` background |

### Service Map
| Element | Color |
|---------|-------|
| Map background | `slate-900/80` |
| Pulse rings | `cyan-400/20`, `/30`, `/40` |
| Center pin | `cyan-400 → blue-600` gradient |
| Nearby dots | `blue-400` |
| Area chips | `slate-900/60`, hover `cyan-400/50` |

---

## Typography Scale

### Headings
```css
/* Hero headline */
text-4xl sm:text-5xl md:text-6xl lg:text-7xl
font-black tracking-tight

/* Section headlines */
text-3xl sm:text-4xl lg:text-5xl
font-black

/* Subsection headlines */
text-2xl sm:text-3xl
font-black

/* Card titles */
text-xl sm:text-2xl
font-bold
```

### Body Text
```css
/* Large body (hero subheadline) */
text-lg sm:text-xl lg:text-2xl
text-slate-200

/* Regular body */
text-base sm:text-lg
text-slate-300

/* Small text (captions) */
text-sm
text-slate-400

/* Tiny text (labels) */
text-xs
text-slate-500
```

### Special Elements
```css
/* Stat numbers */
text-4xl sm:text-5xl lg:text-6xl
font-black
text-transparent bg-clip-text bg-gradient-to-r

/* Badges */
text-xs
font-bold uppercase tracking-wider
```

---

## Spacing & Rhythm

### Section Padding
```css
/* Standard section */
py-12 sm:py-16 px-4 sm:px-6 lg:px-16

/* Hero section */
py-24 sm:py-32 lg:py-40

/* Compact section */
py-8 sm:py-12
```

### Component Spacing
```css
/* Between major sections */
mb-10 sm:mb-14

/* Between elements in a section */
mb-6 sm:mb-8

/* Between cards in a grid */
gap-6 sm:gap-8
```

---

## Responsive Breakpoints

```css
/* Mobile first (default) */
Base styles (< 640px)

/* Small tablets */
sm: 640px

/* Tablets */
md: 768px

/* Desktop */
lg: 1024px

/* Large desktop */
xl: 1280px
```

### Common Patterns
```css
/* Text sizing */
text-base sm:text-lg lg:text-xl

/* Grid columns */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

/* Hide on mobile */
hidden lg:block

/* Show on mobile only */
lg:hidden

/* Flex direction */
flex-col sm:flex-row

/* Width constraints */
w-full sm:w-auto
```

---

## Animation Timings

```css
/* Hover transitions */
transition-all duration-300

/* Slower transitions (backgrounds) */
transition-all duration-500

/* Fast interactions (buttons) */
transition-all duration-200

/* Aurora animations */
animate-aurora-1: 20s ease-in-out infinite
animate-aurora-2: 25s ease-in-out infinite
animate-aurora-3: 30s ease-in-out infinite

/* Counter animations */
2000-3000ms with easing function
```

---

## Touch Target Sizes (Mobile)

```css
/* Buttons */
min-h-[48px] sm:min-h-[56px]

/* Tabs */
px-6 py-4 (48px+ total)

/* Icons with padding */
w-11 h-11 sm:w-12 sm:h-12

/* Area chips */
px-4 py-3 (40px+ total, acceptable for tags)
```

---

## Key Interactions

### 1. Aurora Background
- Continuous gentle movement
- Never jarring or distracting
- Creates premium depth

### 2. Stat Counters
- Trigger on scroll into view
- Count up over 2-3 seconds
- Single animation (no loop)

### 3. Industry Tabs (Desktop)
- Click to switch
- Active indicator slides
- Smooth content transition

### 4. Industry Cards (Mobile)
- Horizontal scroll
- Snap to card center
- Peek next card for affordance

### 5. Map Dots
- Hover reveals area name
- Tooltip appears above dot
- Smooth fade in/out

### 6. Comparison Table
- Hover highlights row
- Green/red badges reinforce message
- Mobile transforms gracefully

---

## Implementation Notes

### Server vs Client Components

**Server Components (No interactivity):**
- `ServiceAreaMap.tsx`
- `CompetitorComparison.tsx`

**Client Components (Interactive):**
- `LocalMarketStats.tsx` (counter animations)
- `LocalIndustriesServed.tsx` (tab state)

### Performance Optimizations
- CSS animations (GPU-accelerated)
- Intersection Observer for counters
- requestAnimationFrame for smooth counting
- Passive scroll listeners
- Lazy loading below fold

### Accessibility
- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast WCAG AA+

---

This visual reference should guide any designer or developer implementing or modifying these location page components.
