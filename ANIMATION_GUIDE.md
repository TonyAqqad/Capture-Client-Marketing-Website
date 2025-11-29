# Animation Visual Guide

## 1. AI Voice Technology Section

```
┌─────────────────────────────────────────────────┐
│  🎙️ Active Call - 1:23        📊 ▂▅▇▆▃▅▇▅     │
│  +1 (555) 123-4567            (Animated Waveform)│
├─────────────────────────────────────────────────┤
│                                                 │
│  💬 AI Agent:                                   │
│  "Thank you for calling. How|"  ← Typing cursor │
│  (Types letter by letter)                       │
│                                                 │
│  💬 Caller:                                     │
│  "I'm interested in learning more..."          │
│  (Slides in from right)                        │
│                                                 │
│  💬 AI Agent:                                   │
│  "I'd be happy to help! Let me schedule..."    │
│  (Slides in from left)                         │
│                                                 │
├─────────────────────────────────────────────────┤
│  ✨ AI analyzing conversation tone...  ▰▰▱▱▱   │
│     (Scanning progress bar animation)          │
└─────────────────────────────────────────────────┘
     ∴ ∴ ∴  ← Floating particles fade in/out
```

**Animations:**
- Waveform bars pulse up/down continuously
- Messages type out character by character
- Blinking cursor on active message
- Scanning bar slides left to right
- Particles float and fade around edges

---

## 2. Growth Dashboard Section

```
┌─────────────────────────────────────────────────┐
│  Growth Dashboard                    🔴 Live    │
│                                      (Pulsing)  │
├──────────────────┬──────────────────────────────┤
│  Lead Growth     │  Calls Handled              │
│  +0% → +127%     │  0 → 1,847                  │
│  📈 vs last month│  📞 this month              │
│  (Counts up)     │  (Counts up)                │
├──────────────────┼──────────────────────────────┤
│  Conversion Rate │  Revenue Impact             │
│  0% → 34.2%      │  $0K → $48K                 │
│  📊 +12% increase│  💰 attributed              │
├──────────────────┴──────────────────────────────┤
│  Recent Activity                                │
│  ● New lead from Google Ads        2m ago      │
│    (Newest - pulsing dot)                      │
│  ○ AI scheduled appointment        8m ago      │
│  ○ Call completed & transcribed    15m ago     │
│  (Rotates every 3 seconds)                     │
└─────────────────────────────────────────────────┘
```

**Animations:**
- Numbers count from 0 to target over 2 seconds
- Each stat card appears with stagger (0.1s delays)
- Cards lift and scale on hover
- Activity feed cycles through items
- Newest item has pulsing dot
- Background gradient breathes
- Tiny chart bars animate in background

---

## 3. Pricing Cards Section

```
     ┌───────────┐
     │ Most      │  ← Floating badge
     │ Popular   │     (Gradient + vertical float)
     └─────┬─────┘
           ↓
┌──────────┴─────────┐
│                    │     HOVER EFFECT:
│   Growth           │     • Card tilts based on mouse position
│   $2,195/mo        │     • Shine sweeps across (→)
│                    │     • Scale grows to 1.05
│   ✓ 2 AI Agents    │     • Gradient overlay fades in
│   ✓ 200+ calls     │     • Checkmarks pulse
│   ✓ Full CRM       │
│   ✓ Google Ads     │
│                    │
│  [Get Started]     │
│                    │
└────────────────────┘
  ∿ ∿ ∿ ← 3D perspective transform
```

**Animations:**
- Popular badge floats up/down continuously
- Badge gradient slides horizontally
- Card rotates in 3D based on mouse position
- Shine effect sweeps on hover
- Checkmarks scale/rotate individually on hover
- Cards scroll in with stagger
- Gradient overlay fades on hover

---

## 4. Testimonials Carousel

```
        ┌─────────┐
        │  ─────  │  ← Giant quote mark (decorative)
        │ "       │
┌───────┼─────────┼───────┐
│ PREV  │ ⭐⭐⭐⭐⭐ │ NEXT  │
│       │         │       │
│       │ "Capture│       │
│ 30%   │  Client │  30%  │ ← Side previews
│opacity│  trans- │opacity│   (visible on desktop)
│       │  formed │       │
│       │  our... │       │
│       │         │       │
│       │ 👤 Sarah│       │
│       │  HVAC   │       │
└───────┴─────────┴───────┘
         ● ○ ○  ← Dot indicators
       [◀]   [▶] ← Navigation
```

**Animations:**
- Testimonials slide horizontally (spring physics)
- Stars spin in sequentially (0.1s delays)
- Quote mark scales in from 0
- Auto-rotates every 5 seconds
- Hover effects on navigation buttons
- Active dot has expanding ring
- Background gradient pulses
- Avatar scales on hover

---

## 5. Animated Stats Section

```
    ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
    │   💫 GLOW   │       │   💫 GLOW   │       │   💫 GLOW   │
    │             │       │             │       │             │
    │    500+     │       │     1M+     │       │    4.9/5    │
    │    (Cyan)   │       │  (Indigo)   │       │    (Cyan)   │
    │  ─────────  │       │  ─────────  │       │  ─────────  │
    │    Active   │       │    Calls    │       │   Average   │
    │   Clients   │       │   Handled   │       │   Rating    │
    └─────────────┘       └─────────────┘       └─────────────┘
     0 → 500+              0 → 1M+               0.0 → 4.9/5
     (2s count)            (2.5s count)          (2s count)
```

**Animations:**
- Numbers count up when scrolled into view
- Background glow pulses (1 → 1.2 → 1 scale)
- Underlines grow from center
- Stats appear in staggered sequence
- Each has unique colored glow
- Spring physics for bouncy reveal

---

## Scroll Behavior

```
USER SCROLLS DOWN ↓

┌────────────────────────────────┐
│ ← Out of view                  │  (No animation)
└────────────────────────────────┘
              ↓
┌────────────────────────────────┐
│ ← 10% visible                  │  (Trigger point)
├────────────────────────────────┤  ← Animations START
│                                │
│   💫 Elements fade in          │
│   📊 Numbers start counting    │
│   🎭 Components animate        │
│                                │
└────────────────────────────────┘
              ↓
┌────────────────────────────────┐
│ ← Fully in view                │  (All animations playing)
│   Everything interactive       │
└────────────────────────────────┘
```

**Intersection Observer Settings:**
- Threshold: 10-30% (varies by component)
- Trigger once: true (don't re-animate on scroll up)
- Root margin: 0px (standard viewport)

---

## Performance Notes

### GPU Acceleration
- ✅ `transform: translate3d()` - Hardware accelerated
- ✅ `opacity` - Composite layer
- ✅ `scale` - Hardware accelerated
- ❌ Avoid animating: width, height, margin, padding

### Frame Rate
- Target: 60fps
- Method: `requestAnimationFrame`
- Easing: ease-out-quart for natural deceleration

### Battery Optimization
- Animations pause when tab is not visible
- Intervals cleared on component unmount
- No infinite loops without user interaction

---

## Mobile Adaptations

### Touch Devices
- 3D tilt disabled (no mouse position)
- Simplified hover effects
- Larger touch targets (48px minimum)
- Reduced motion complexity

### Responsive Breakpoints
- **Mobile (<768px)**: Single column, simplified animations
- **Tablet (768-1024px)**: Some side-by-side layouts
- **Desktop (>1024px)**: Full 3D effects, side previews

---

## Color Usage in Animations

### Cyan (#00C9FF)
- Lead growth indicators
- Activity dots
- Waveform bars
- AI technology elements
- "Alive" system indicators

### Indigo (#6366F1)
- Dashboard elements
- Call metrics
- CRM features
- Depth and sophistication

### White/Slate
- Text content
- Glass effects
- Subtle overlays
- Professional appearance

---

## Timing Reference

| Element | Duration | Delay | Easing |
|---------|----------|-------|--------|
| Fade in | 0.6s | 0-0.5s | ease-out |
| Slide in | 0.4s | 0-0.3s | spring |
| Count up | 2s | 0s | ease-out-quart |
| Typing | 30ms/char | 0.5s | linear |
| Carousel | 5s | 0s | spring |
| Hover lift | 0.3s | 0s | ease-out |
| 3D tilt | 20ms | 0s | spring |
| Pulse | 2-4s | varies | ease-in-out |

---

## Implementation Details

### Framer Motion Variants
```typescript
// Example: Slide in from left
variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

// Example: Staggered children
variants = {
  container: {
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }
}
```

### Custom Hooks
```typescript
// Trigger animations on scroll
const isInView = useInView(ref, { threshold: 0.3 })

// Animate numbers
const count = useCountUp({ end: 1847, duration: 2000 })

// Type text
const text = useTypingEffect({ text: "Hello", speed: 50 })
```

---

## Browser Support

- ✅ Chrome 90+ (Full support)
- ✅ Firefox 88+ (Full support)
- ✅ Safari 14+ (Full support)
- ✅ Edge 90+ (Full support)
- ⚠️ IE11 (Not supported - use polyfills)

### Fallbacks
- No Intersection Observer → immediate show (no animations)
- No requestAnimationFrame → setTimeout fallback
- Reduced motion preference → instant transitions

---

**This guide shows all animations in the new interactive sections!**
