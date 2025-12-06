# MagneticButton - Quick Start Guide

## Import

```tsx
import { MagneticButton } from "@/components/ui/premium-components";
```

## Basic Usage

```tsx
<MagneticButton variant="primary" size="lg">
  Get Started Free
</MagneticButton>
```

## All Props

```tsx
<MagneticButton
  variant="primary"              // "primary" | "secondary" | "ghost"
  size="md"                      // "sm" | "md" | "lg"
  onClick={() => alert("Hi!")}   // Optional click handler
  href="/demo"                   // Optional link (makes it an <a>)
  fullWidth={false}              // Stretch to container width
  ariaLabel="Book a demo"        // Accessibility label
  disabled={false}               // Disabled state
  className="mt-4"               // Additional Tailwind classes
>
  Button Text
</MagneticButton>
```

## Common Patterns

### Hero CTA
```tsx
<MagneticButton variant="primary" size="lg" href="/get-started">
  Get Started Free
</MagneticButton>
```

### Secondary Action
```tsx
<MagneticButton variant="secondary" href="/demo">
  Watch Demo
</MagneticButton>
```

### Form Submit
```tsx
<MagneticButton
  variant="primary"
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</MagneticButton>
```

### Full Width CTA
```tsx
<MagneticButton variant="primary" size="lg" fullWidth>
  Start Your Free Trial
</MagneticButton>
```

## How It Works

**Desktop:** Hover = magnetic cursor-following effect
**Mobile:** Automatic detection disables magnetic effect (better performance)
**All Devices:** Ripple effect on click

## Accessibility

- Minimum 48px touch targets
- Keyboard navigation (Tab, Enter, Space)
- Visible focus rings
- Screen reader friendly

## Performance

- GPU-accelerated animations
- SSR-safe (no hydration errors)
- Mobile-optimized (disables magnetic effect)
- ~2KB component size

## Files

- Component: `src/components/ui/MagneticButton.tsx`
- Examples: `src/components/examples/MagneticButtonExample.tsx`
- Full Docs: `MAGNETIC_BUTTON_COMPONENT.md`

## TypeScript

All props are strictly typed. No `any` types. Full IntelliSense support.

---

That's it! Start using MagneticButton in your CTAs for a premium, physics-based interaction.
