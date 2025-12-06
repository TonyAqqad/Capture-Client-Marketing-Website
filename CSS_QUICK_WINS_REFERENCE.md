# CSS QUICK WINS - VISUAL REFERENCE GUIDE

## ALL 23 NEW UTILITY CLASSES

### 1. SHADOWS (5 classes)

```css
/* Subtle multi-layer depth */
.shadow-premium-sm
  └─ Perfect for: Small cards, badges, tooltips

/* Medium depth for cards */
.shadow-premium-md
  └─ Perfect for: Standard cards, modals, dropdowns

/* Large depth for hero elements */
.shadow-premium-lg
  └─ Perfect for: Hero cards, featured content, pricing cards

/* Gold glow aura */
.shadow-glow-gold
  └─ Perfect for: Premium CTAs, highlighted features

/* Cyan glow aura */
.shadow-glow-cyan
  └─ Perfect for: Primary CTAs, interactive elements
```

### 2. TRANSITIONS (3 classes)

```css
/* Bouncy multi-property transition */
.transition-premium
  └─ Animates: transform, box-shadow, border, background, opacity
  └─ Perfect for: Interactive cards, buttons with multiple states

/* Ultra-smooth transition */
.transition-smooth
  └─ 400ms ease-out
  └─ Perfect for: Subtle hover effects, smooth reveals

/* Playful bounce */
.transition-bounce
  └─ 500ms bounce easing
  └─ Perfect for: CTAs, interactive buttons, playful elements
```

### 3. FOCUS RINGS (2 classes)

```css
/* Gold accessibility ring */
.focus-ring-gold:focus-visible
  └─ Perfect for: Gold-themed CTAs, premium buttons

/* Cyan accessibility ring */
.focus-ring-cyan:focus-visible
  └─ Perfect for: Primary actions, links, interactive cards
```

### 4. GLASS EFFECTS (2 classes)

```css
/* Hover enhancement for glass */
.glass-premium-hover:hover
  └─ Use with: .glass-premium (existing class)
  └─ Perfect for: Interactive glass cards

/* Enhanced glass with saturation */
.glass-enhanced
  └─ 20px blur + 180% saturation
  └─ Perfect for: Standalone glass elements
```

### 5. HOVER EFFECTS (11 classes)

```css
/* Large lift effect */
.hover-lift-lg
  └─ -8px lift on hover
  └─ Perfect for: Large cards, featured content

/* Scale to 1.02 */
.hover-scale
  └─ Perfect for: Cards, images, interactive elements

/* Small scale to 1.01 */
.hover-scale-sm
  └─ Perfect for: Subtle interactions, pricing cards

/* Cyan glow on hover */
.hover-glow-cyan
  └─ Perfect for: Primary CTAs, interactive cards

/* Combined lift + glow */
.hover-lift-glow
  └─ -4px lift + cyan glow
  └─ Perfect for: Premium CTAs, hero buttons
```

---

## COMBINATION RECIPES

### Premium Hero Card:
```jsx
className="
  glass-enhanced
  shadow-premium-lg
  hover-lift-glow
  transition-premium
  focus-ring-cyan
"
```
**Effect:** Glassy card with large depth that lifts and glows on hover

### Gold CTA Button:
```jsx
className="
  btn-gold
  shadow-glow-gold
  hover-scale
  transition-bounce
  focus-ring-gold
"
```
**Effect:** Gold button with glow that bounces and scales on interaction

### Service Card:
```jsx
className="
  card
  shadow-premium-md
  hover-lift-lg
  hover-glow-cyan
  transition-smooth
"
```
**Effect:** Standard card with medium depth that lifts high with cyan glow

### Testimonial Card:
```jsx
className="
  glass-premium
  glass-premium-hover
  shadow-premium-sm
  hover-scale-sm
  transition-smooth
"
```
**Effect:** Glass card with subtle interactions

### Pricing Card (Featured):
```jsx
className="
  bg-premium-elevated
  shadow-premium-lg
  shadow-glow-gold
  hover-scale
  transition-premium
  focus-ring-gold
"
```
**Effect:** Elevated card with gold glow and bouncy scale

---

## PERFORMANCE MATRIX

| Class | GPU-Accelerated | Mobile-Safe | Respects Reduced Motion |
|-------|----------------|-------------|------------------------|
| `.shadow-premium-*` | ✅ Yes | ✅ Yes | ✅ Yes |
| `.shadow-glow-*` | ✅ Yes | ✅ Yes | ✅ Yes |
| `.transition-*` | ✅ Yes | ✅ Yes | ✅ Auto-disabled |
| `.focus-ring-*` | ✅ Yes | ✅ Yes | ✅ Yes |
| `.glass-enhanced` | ⚠️ Desktop only | ❌ Disabled on mobile | ✅ Yes |
| `.glass-premium-hover` | ⚠️ Desktop only | ❌ Disabled on mobile | ✅ Yes |
| `.hover-lift-*` | ✅ Yes | ✅ Hover disabled | ✅ Auto-disabled |
| `.hover-scale-*` | ✅ Yes | ✅ Hover disabled | ✅ Auto-disabled |
| `.hover-glow-*` | ✅ Yes | ✅ Hover disabled | ✅ Auto-disabled |

---

## ACCESSIBILITY CHECKLIST

- ✅ All focus states are :focus-visible (keyboard-only)
- ✅ Color contrast maintained in all states
- ✅ Animations respect prefers-reduced-motion
- ✅ Touch targets maintained (no layout shift)
- ✅ Screen reader friendly (no hidden content)

---

## BROWSER SUPPORT

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Multi-layer shadows | ✅ | ✅ | ✅ | ✅ |
| Cubic-bezier easing | ✅ | ✅ | ✅ | ✅ |
| :focus-visible | ✅ | ✅ | ✅ | ✅ |
| backdrop-filter | ✅ | ✅ | ✅ | ✅ |
| transform scale/translate | ✅ | ✅ | ✅ | ✅ |

---

## WHEN TO USE WHAT

### Cards & Containers:
- **Small cards:** `.shadow-premium-sm` + `.hover-scale-sm`
- **Standard cards:** `.shadow-premium-md` + `.hover-lift-lg`
- **Hero cards:** `.shadow-premium-lg` + `.hover-lift-glow`

### Buttons & CTAs:
- **Primary CTA:** `.shadow-glow-cyan` + `.hover-scale` + `.transition-bounce`
- **Premium CTA:** `.shadow-glow-gold` + `.hover-scale` + `.transition-premium`
- **Secondary:** `.shadow-premium-sm` + `.transition-smooth`

### Glass Elements:
- **Static glass:** `.glass-premium` or `.glass-enhanced`
- **Interactive glass:** `.glass-premium` + `.glass-premium-hover`

### Focus States:
- **Gold theme:** `.focus-ring-gold`
- **Cyan theme:** `.focus-ring-cyan`
- **Default:** Use existing `.focus-ring-premium`

---

## QUICK TESTING CHECKLIST

- [ ] Hover states work on desktop
- [ ] Focus states visible on keyboard tab
- [ ] Animations smooth at 60fps
- [ ] No layout shift on interaction
- [ ] Mobile: hover effects disabled
- [ ] Mobile: backdrop-filter disabled
- [ ] Reduced motion: animations disabled

