# Interactive AI Demo - Visual Design Guide

## Component Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     SECTION BACKGROUND                       │
│         (Slate-950 with gradient orbs and grid)              │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │               HEADER SECTION                        │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  ✨ Live AI Demo  (Pulsing badge)        │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │   Try Our AI Voice Agent                           │    │
│  │   Right Now                                        │    │
│  │   (Gradient text: cyan → primary)                  │    │
│  │                                                     │    │
│  │   See how our AI handles real customer...         │    │
│  │   ✓ This is a live demo...                        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │          BUSINESS TYPE SELECTOR                     │    │
│  │  [Plumbing] [Dental] [Auto] [HVAC] [Law] [General] │    │
│  │  (Pills - active has gradient bg + glow)           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────┐  ┌────────────────────┐       │
│  │   CHAT INTERFACE        │  │   CRM PANEL        │       │
│  │   (2/3 width desktop)   │  │   (1/3 width)      │       │
│  │                         │  │                    │       │
│  │  ┌──────────────────┐  │  │  ┌──────────────┐ │       │
│  │  │ 🟢 AI Active     │  │  │  │ ✓ Lead Data  │ │       │
│  │  │ [Reset ↻]        │  │  │  │ Real-time    │ │       │
│  │  └──────────────────┘  │  │  └──────────────┘ │       │
│  │                         │  │                    │       │
│  │  ┌──────────────────┐  │  │  ┌──────────────┐ │       │
│  │  │ MESSAGES AREA    │  │  │  │ 👤 Name      │ │       │
│  │  │ (Scrollable)     │  │  │  │  Waiting...  │ │       │
│  │  │                  │  │  │  ├──────────────┤ │       │
│  │  │ ┌──────────────┐ │  │  │  │ 📞 Phone     │ │       │
│  │  │ │ 🤖 AI: Hi!   │ │  │  │  │  Waiting...  │ │       │
│  │  │ └──────────────┘ │  │  │  ├──────────────┤ │       │
│  │  │                  │  │  │  │ 📍 Service   │ │       │
│  │  │   ┌────────────┐ │  │  │  │  Waiting...  │ │       │
│  │  │   │ 👤 User: ? │ │  │  │  ├──────────────┤ │       │
│  │  │   └────────────┘ │  │  │  │ 💬 Intent    │ │       │
│  │  │                  │  │  │  │  Waiting...  │ │       │
│  │  │ ┌──────────────┐ │  │  │  └──────────────┘ │       │
│  │  │ │ 🤖 AI: ...▮  │ │  │  │                    │       │
│  │  │ └──────────────┘ │  │  │  ┌──────────────┐ │       │
│  │  │                  │  │  │  │ ⭐ Lead Score│ │       │
│  │  └──────────────────┘  │  │  │   8/10       │ │       │
│  │                         │  │  │ [========  ] │ │       │
│  │  ┌──────────────────┐  │  │  └──────────────┘ │       │
│  │  │ Input field...   │  │  │                    │       │
│  │  │          [Send →]│  │  │  🕐 Real-time      │       │
│  │  └──────────────────┘  │  │  ✓ Auto-saved      │       │
│  │                         │  │                    │       │
│  │  Try asking:            │  └────────────────────┘       │
│  │  [Q1] [Q2] [Q3]        │                               │
│  └─────────────────────────┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Mobile Layout (< 1024px)

```
┌──────────────────────┐
│    HEADER SECTION    │
│   ✨ Live AI Demo    │
│   Try Our AI Agent   │
└──────────────────────┘

┌──────────────────────┐
│  BUSINESS SELECTOR   │
│ [Plumbing] [Dental]  │
│ [Auto] [HVAC] [Law]  │
└──────────────────────┘

┌──────────────────────┐
│   CHAT INTERFACE     │
│ (Full width, stacks) │
│                      │
│ 🤖 AI Messages       │
│    User Messages 👤  │
│                      │
│ [Input] [Send]       │
└──────────────────────┘

┌──────────────────────┐
│    CRM PANEL         │
│  (Below chat on      │
│   mobile)            │
│                      │
│  👤 Name: ...        │
│  📞 Phone: ...       │
│  📍 Service: ...     │
│  💬 Intent: ...      │
│  ⭐ Score: 8/10      │
└──────────────────────┘
```

## Color Palette

### Primary Colors
```css
/* Accent Gradient */
bg-gradient-to-r from-cyan-500 to-primary
/* #06b6d4 → #4A69E2 */

/* Glass Effect */
backdrop-blur-xl bg-white/[0.03] border border-white/10
/* Semi-transparent with blur */

/* Text Colors */
text-white              /* Primary text */
text-slate-400          /* Secondary text */
text-cyan-400           /* Accent text */
text-slate-500          /* Tertiary text */
```

### State Colors
```css
/* AI Messages */
bg-white/5 border-white/10

/* User Messages */
bg-primary/20 to-cyan-500/20 border-primary/30

/* Filled CRM Fields */
bg-cyan-500/5 border-cyan-500/30 shadow-cyan-500/20

/* Loading States */
bg-white/20 (pulsing dots)

/* Error States */
bg-red-500/10 border-red-500/30 text-red-400
```

## Typography

```css
/* Headings */
font-heading (Poppins)
text-3xl sm:text-4xl md:text-5xl
font-bold tracking-tight

/* Body Text */
font-body (Inter)
text-sm, text-base, text-lg
font-medium

/* Mono/Code */
font-mono
text-xs
uppercase tracking-wider
```

## Spacing System

```css
/* Section Padding */
py-16 sm:py-20 md:py-24 lg:py-32

/* Card Padding */
p-6 lg:p-8

/* Gap Between Elements */
gap-3, gap-4, gap-6, gap-8

/* Border Radius */
rounded-xl    /* Buttons, inputs */
rounded-2xl   /* Cards */
rounded-3xl   /* Main containers */
rounded-full  /* Badges, indicators */
```

## Interactive States

### Button Hover
```
Default: scale(1)
Hover:   scale(1.05) + shadow-glow
Active:  scale(0.95)
```

### Business Type Pills
```
Inactive: bg-white/5 border-white/10
Hover:    bg-white/10 border-white/20
Active:   bg-gradient-to-r from-cyan-500 to-primary
```

### CRM Field Population
```
Empty:   bg-white/[0.02] border-white/5
         → Pulsing dots animation

Filling: Flash effect (cyan-500/30)
         → Scale animation

Filled:  bg-cyan-500/5 border-cyan-500/30
         → Checkmark appears with spring
```

## Animation Timings

```typescript
// Entrance animations
duration: 0.5s
ease: [0.43, 0.13, 0.23, 0.96] (smooth)

// Typewriter effect
speed: 30ms per character
pause on punctuation: 150-300ms

// CRM field updates
delay: 500ms after API response
duration: 0.6s
stagger: 0.15s between fields

// Button interactions
hover: 0.2s
click: 0.15s
```

## Icons Used (Lucide React)

```typescript
Sparkles       - AI indicator, demo badge
User           - User avatar, name field
Phone          - Phone field
MessageCircle  - Intent field
MapPin         - Service field
Star           - Lead score
CheckCircle2   - Success states
AlertCircle    - Error states
Send           - Send button
RotateCcw      - Reset button
Clock          - Real-time indicator
Mail           - Email field (optional)
```

## Accessibility Indicators

### Focus States
```css
focus:outline-none
focus:border-cyan-500/50
focus:bg-white/10
```

### ARIA Labels
```tsx
aria-label="Select plumbing business type"
aria-label="Message input"
aria-label="Send message"
aria-label="Reset conversation"
```

### Screen Reader Text
```tsx
<span className="sr-only">AI is typing</span>
<span className="sr-only">Lead score: 8 out of 10</span>
```

## Loading States

### API Call Loading
```
┌────────────────┐
│  ●  ●  ●      │  ← Pulsing dots
│  AI is        │
│  thinking...  │
└────────────────┘
```

### Typewriter Effect
```
"Thanks for calling!▮"  ← Blinking cursor
```

### CRM Field Waiting
```
┌──────────────┐
│ 👤 Name      │
│ • • •  Wait..│  ← Animated dots
└──────────────┘
```

## Responsive Breakpoints

```css
/* Mobile First */
base: 320px+ (full width, stacked)

/* Small tablets */
sm: 640px+ (slight padding increase)

/* Tablets */
md: 768px+ (2-column for selector)

/* Desktop */
lg: 1024px+ (side-by-side chat + CRM)
```

## Grid Layout (Desktop)

```css
grid-template-columns: 2fr 1fr
/* Chat: 66.66% | CRM: 33.33% */

gap: 2rem (lg:gap-8)
```

## Z-Index Layers

```css
Background:     z-0  (gradients, grid)
Content:        z-10 (main components)
Overlays:       z-40 (modals, if added)
Fixed buttons:  z-50 (mobile triggers)
```

## Animation Sequence (Initial Load)

```
1. Badge fades in (delay: 0.1s)
2. Heading fades in (delay: 0.2s)
3. Description fades in (delay: 0.3s)
4. Business selector appears (delay: 0.4s)
5. Chat interface slides in from left (delay: 0.5s)
6. CRM panel slides in from right (delay: 0.5s)
7. AI greeting starts typing (delay: 0.8s)
```

## Performance Optimizations

### Image Loading
- No images in component (uses SVG icons only)
- Background gradients are CSS-only

### JavaScript Bundle
- Lazy load Framer Motion animations
- Conditional rendering for inactive states
- Memoized callbacks for handlers

### Rendering Strategy
```typescript
// Only re-render when necessary
useRef for non-rendering state
useMemo for expensive calculations
useCallback for event handlers
```

## Dark Mode Only
This component is designed exclusively for dark backgrounds:
- No light mode variant needed
- Optimized for `bg-slate-950` parent

## Print Styles
Not applicable - interactive component, not printable.

---

## Quick Copy-Paste Styles

### Glass Card
```tsx
className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl"
```

### Gradient Button
```tsx
className="bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold hover:shadow-glow"
```

### Message Bubble (AI)
```tsx
className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
```

### CRM Field (Filled)
```tsx
className="bg-cyan-500/5 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
```

### Pulsing Indicator
```tsx
<motion.div
  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="w-2 h-2 rounded-full bg-cyan-400"
/>
```

---

**This visual guide provides a complete reference for understanding and customizing the Interactive AI Demo component's design.**
