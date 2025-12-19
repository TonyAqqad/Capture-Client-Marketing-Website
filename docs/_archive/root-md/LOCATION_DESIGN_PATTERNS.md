# LOCATION PAGES - DESIGN PATTERN REFERENCE

Quick reference for the premium design system applied to location pages.

---

## GLASS CARD PATTERN

### Base Structure
```jsx
<div className="relative h-full">
  {/* Glow effect on hover */}
  <div className="absolute -inset-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />

  {/* Layered frame (desktop only) */}
  <div className="hidden sm:block absolute inset-0 border border-white/5 rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />

  {/* Main card */}
  <div className="relative h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] group-hover:border-cyan-400/30 group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.2)] transition-all duration-500 group-hover:translate-y-[-4px]">
    {/* Mesh gradient on hover */}
    <div className="absolute inset-0 bg-mesh-premium rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Content */}
    <div className="relative z-10">
      {/* Your content here */}
    </div>
  </div>
</div>
```

---

## ICON WITH GLOW PATTERN

### Structure
```jsx
<div className="relative flex-shrink-0">
  {/* Glow behind icon */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

  {/* Icon container */}
  <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 via-cyan-500/10 to-blue-500/20 border border-cyan-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
    <span className="material-icons text-cyan-300 text-2xl">
      icon_name
    </span>
  </div>
</div>
```

### Usage
- Benefits section icons
- Location card icons
- Testimonial quote icons
- Section header badges

---

## GRADIENT TEXT PATTERN

### On Hover
```jsx
<h3 className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-cyan-400 transition-all">
  Text Here
</h3>
```

### Always Gradient
```jsx
<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">
  City Name
</span>
```

### Usage
- State headers (always gradient)
- City names in headings (always gradient)
- Card titles (gradient on hover)
- Section headlines (mixed)

---

## SECTION HEADER PATTERN

### Structure
```jsx
<div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
  {/* Badge */}
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
    <span className="material-icons text-cyan-400 text-sm">icon_name</span>
    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
      Badge Text
    </span>
  </div>

  {/* Title */}
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
    Main Heading{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
      Highlighted Part
    </span>
  </h2>

  {/* Description */}
  <p className="text-slate-400 text-base sm:text-lg">
    Supporting description text
  </p>
</div>
```

### Badge Icon Options
- `workspace_premium` - Why Choose Us
- `help_outline` - FAQ
- `star` - Testimonials
- `explore` - Service Area
- `location_on` - Location-related

---

## STATE HEADER PATTERN

### Structure
```jsx
<div className="relative flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
  {/* Left gradient line */}
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/20" />

  {/* State name with glow */}
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
    <h2 className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white px-4 sm:px-8 py-2 sm:py-3">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">
        State Name
      </span>
    </h2>
  </div>

  {/* Right gradient line */}
  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-400/40 to-cyan-400/20" />
</div>
```

---

## COLLAPSIBLE FAQ ITEM PATTERN

### Structure
```jsx
<div className="group relative">
  {/* Glow when open */}
  {isOpen && (
    <div className="absolute -inset-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/50 to-cyan-400/30 rounded-2xl blur-sm" />
  )}

  {/* Card */}
  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
    {/* Mesh gradient when open */}
    {isOpen && (
      <div className="absolute inset-0 bg-mesh-premium opacity-50" />
    )}

    {/* Question Button */}
    <button className="relative z-10 w-full flex items-start justify-between gap-4 p-5 sm:p-6">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${isOpen ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/40' : 'bg-white/5 border border-white/10'}`}>
        <span className="material-icons">{isOpen ? 'remove' : 'add'}</span>
      </div>

      {/* Question Text */}
      <h3 className={isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400' : 'text-white'}>
        Question?
      </h3>

      {/* Arrow */}
      <div className={`transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <span className="material-icons">keyboard_arrow_down</span>
      </div>
    </button>

    {/* Answer Panel */}
    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="p-6">
        <p>Answer text</p>
      </div>
    </div>
  </div>
</div>
```

---

## TESTIMONIAL CARD PATTERN

### Structure
```jsx
<div className="group relative">
  {/* Hover glow */}
  <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/0 via-cyan-400/30 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

  {/* Card */}
  <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
    {/* Quote Icon */}
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-md opacity-30" />
      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
        <span className="material-icons text-cyan-300">format_quote</span>
      </div>
    </div>

    {/* Quote */}
    <blockquote className="mb-6">
      <p className="text-lg text-slate-200">"Quote text here"</p>
    </blockquote>

    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

    {/* Author */}
    <div className="flex items-center gap-4">
      {/* Avatar with initials */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-sm opacity-50" />
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border-2 border-cyan-400/40">
          <span className="text-cyan-200 font-black">AB</span>
        </div>
      </div>

      {/* Details */}
      <div>
        <div className="text-white font-bold">Author Name</div>
        <div className="text-slate-400 text-sm">Business Name</div>
        <div className="flex items-center gap-1 text-xs text-cyan-400">
          <span className="material-icons text-xs">location_on</span>
          <span>City, ST</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## SERVICE AREA BADGE PATTERN

### Structure
```jsx
<span className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-full text-cyan-300 text-xs sm:text-sm font-bold hover:border-cyan-400/40 hover:shadow-[0_4px_16px_rgba(6,182,212,0.15)] transition-all duration-300">
  <span className="material-icons text-xs">location_on</span>
  Area Name

  {/* Glow on hover */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
</span>
```

---

## STAGGERED ANIMATION PATTERN

### Implementation
```jsx
{items.map((item, index) => (
  <div
    key={index}
    style={{
      animationDelay: `${index * 80}ms` // or 50ms, 100ms depending on item count
    }}
  >
    {/* Card content */}
  </div>
))}
```

### Usage
- Location cards: 50ms delay
- Benefit cards: 80ms delay
- Testimonial cards: 100ms delay

---

## BACKGROUND EFFECTS PATTERN

### Subtle Mesh Gradient
```jsx
<div className="absolute inset-0">
  <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
  <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
</div>
```

### Centered Glow
```jsx
<div className="absolute inset-0">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl" />
</div>
```

---

## COLOR PALETTE REFERENCE

### Glass Backgrounds
```
from-white/[0.08] to-white/[0.02]  // Main cards
from-white/[0.06] to-white/[0.01]  // Stats cards
```

### Borders
```
border-white/10          // Default
border-white/20          // Elevated
border-cyan-400/30       // Hover
border-cyan-400/40       // Active
```

### Glows
```
bg-cyan-400/10           // Subtle
bg-cyan-400/20           // Medium
bg-cyan-400/30           // Strong
blur-sm / blur-md / blur-lg / blur-xl / blur-3xl
```

### Text Colors
```
text-white               // Primary headings
text-slate-200           // Body text (light)
text-slate-300           // Body text (medium)
text-slate-400           // Secondary text
text-cyan-300            // Accent text
text-cyan-400            // Icon text
```

### Gradient Text
```
from-cyan-300 via-cyan-400 to-blue-400  // Headers
from-cyan-300 to-cyan-400               // Simple gradient
```

---

## RESPONSIVE BREAKPOINTS

### Typography Scale
```
text-2xl sm:text-3xl lg:text-4xl    // H2 headers
text-xl sm:text-2xl                  // H3 headers
text-base sm:text-lg                 // Body text
text-sm sm:text-base                 // Secondary text
text-xs sm:text-sm                   // Badge text
```

### Grid Layouts
```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3    // Cards
grid-cols-2 sm:grid-cols-4                    // Stats
```

### Spacing
```
gap-4 sm:gap-6          // Card grid gap
gap-2.5 sm:gap-3        // Badge gap
p-6 sm:p-7              // Card padding
py-12 sm:py-16          // Section padding
mb-8 sm:mb-12           // Section margin
```

---

## ICON USAGE

### Material Icons
```
location_on              // Location/area markers
workspace_premium        // Benefits section
help_outline            // FAQ section
star                    // Testimonials/ratings
explore                 // Service area
format_quote            // Testimonial quotes
verified                // Trust signals
phone                   // Call CTAs
arrow_forward           // Navigation arrows
keyboard_arrow_down     // Dropdown indicators
add / remove            // Expand/collapse
```

---

## TOUCH-FRIENDLY CLASSES

```
touch-target            // min-height: 44px, min-width: 44px
active:scale-95         // Press feedback
transition-all duration-300  // Smooth interactions
```

---

**USE THIS REFERENCE** when creating similar sections or maintaining consistency across the site.
