# Animation Optimization Code Patterns
## Copy-Paste Reference for 60fps Performance

---

## 1. Mobile Detection Pattern (Use in ALL animated components)

```tsx
"use client";

import { useState, useEffect } from "react";

export function OptimizedComponent() {
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile + reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(mobile);
      setDisableAnimations(mobile || reducedMotion);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      // Conditional animations
      animate={disableAnimations ? {} : { scale: [1, 1.1, 1] }}
      transition={disableAnimations ? { duration: 0 } : { duration: 2 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

---

## 2. GPU-Accelerated Framer Motion Pattern

```tsx
// ✅ CORRECT: GPU-accelerated with will-change
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  style={{
    willChange: "transform, opacity",
    transform: "translateZ(0)" // Force GPU layer
  }}
>
  Content
</motion.div>

// ❌ WRONG: Animating expensive properties
<motion.div
  animate={{ height: 100, width: 200, boxShadow: "..." }}
>
  Don't do this!
</motion.div>
```

---

## 3. Conditional Animation Pattern (Mobile vs Desktop)

```tsx
<motion.div
  // Hide expensive elements on mobile
  className={isMobile ? "hidden" : "block"}
  animate={disableAnimations ? {} : {
    rotate: [0, 360],
    scale: [1, 1.05, 1],
  }}
  transition={disableAnimations ? { duration: 0 } : {
    duration: 40,
    repeat: Infinity,
    ease: "linear"
  }}
  style={{
    willChange: disableAnimations ? "auto" : "transform",
    transform: "translateZ(0)"
  }}
>
  {/* Expensive 3D shapes, particles, etc. */}
</motion.div>

// Conditional ping animation
<div className="relative flex h-3 w-3">
  {!disableAnimations && (
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
  )}
  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
</div>
```

---

## 4. Progress Bar Animation (Transform, not width)

```tsx
// ✅ CORRECT: Animate scaleX
<div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 4, ease: "linear" }}
    style={{
      transformOrigin: "left",
      willChange: "transform",
      transform: "translateZ(0)"
    }}
    className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-accent to-primary rounded-full"
  />
</div>

// ❌ WRONG: Animate width
<motion.div
  animate={{ width: "100%" }} // Causes layout reflow!
/>
```

---

## 5. Typing Indicator Animation (Staggered)

```tsx
// ✅ Optimized typing dots
<div className="flex gap-1">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }}
      style={{
        willChange: "transform",
        transform: "translateZ(0)"
      }}
      className="w-2 h-2 bg-accent rounded-full"
    />
  ))}
</div>
```

---

## 6. Message Entry/Exit Animation

```tsx
import { AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  {messages.map((message, index) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)"
      }}
    >
      {message.text}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## 7. Smooth Scrolling with RAF (Prevent jank)

```tsx
import { useEffect, useRef } from "react";

export function useOptimizedScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Use RAF to prevent layout thrashing
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
    }
  }, [messages]); // Re-run when messages change

  return containerRef;
}

// Usage:
const messagesContainerRef = useOptimizedScroll();

<div ref={messagesContainerRef} className="overflow-y-auto">
  {/* Messages */}
</div>
```

---

## 8. Mouse Tracking with RAF Throttling

```tsx
import { useMotionValue, useSpring } from "framer-motion";

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);
const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

useEffect(() => {
  // Disable on mobile
  if (window.innerWidth < 1024) return;

  let ticking = false;

  const handleMouseMove = (e: MouseEvent) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX - innerWidth / 2) / 50);
        mouseY.set((clientY - innerHeight / 2) / 50);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, [mouseX, mouseY]);

// Use with parallax
<motion.div
  style={{
    x: springX,
    y: springY,
    willChange: "transform",
    transform: "translateZ(0)"
  }}
>
  Parallax element
</motion.div>
```

---

## 9. Intersection Observer for Scroll Animations

```tsx
// Already implemented in hooks/useInView.ts
import { useInView } from "@/hooks/useInView";

export function ScrollAnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  return (
    <div ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        style={{
          willChange: isInView ? "transform, opacity" : "auto",
          transform: "translateZ(0)"
        }}
      >
        Animated when in view
      </motion.div>
    </div>
  );
}
```

---

## 10. Waveform/Audio Visualization (Transform-based)

```tsx
function Waveform({ isActive }: { isActive: boolean }) {
  const bars = [8, 6, 10, 7, 9, 6, 8, 7];

  return (
    <div className="flex gap-1 items-center h-10">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            scaleY: [1, 1.5, 1], // Use scaleY, not height!
          } : {
            scaleY: 1
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{
            height: `${height * 4}px`,
            transformOrigin: "bottom",
            willChange: "transform",
            transform: "translateZ(0)"
          }}
          className="w-1 bg-accent rounded-full"
        />
      ))}
    </div>
  );
}
```

---

## 11. Chart Bar Animation (Transform-based)

```tsx
function ChartBars({ isInView }: { isInView: boolean }) {
  const bars = [40, 65, 50, 80, 70, 90, 85];

  return (
    <div className="flex items-end gap-1 h-full">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{
            delay: 0.6 + i * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{
            height: `${height}%`,
            transformOrigin: "bottom",
            willChange: "transform",
            transform: "translateZ(0)"
          }}
          className="w-2 bg-accent rounded-t"
        />
      ))}
    </div>
  );
}
```

---

## 12. Button Hover Animation (Desktop Only)

```tsx
<motion.button
  whileHover={isMobile ? {} : { scale: 1.05, y: -5 }}
  whileTap={isMobile ? { scale: 0.95 } : { scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  style={{
    willChange: "transform",
    transform: "translateZ(0)"
  }}
  className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-primary"
>
  Click Me
</motion.button>
```

---

## 13. Particle/Floating Effects (Mobile Hidden)

```tsx
{!isMobile && (
  <div className="absolute inset-0 pointer-events-none">
    {particles.map((particle, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? {
          opacity: [0, 0.3, 0],
          scale: [0, 1, 0],
          y: [0, -30, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        }}
        style={{
          position: "absolute",
          left: particle.x,
          top: particle.y,
          willChange: "transform, opacity",
          transform: "translateZ(0)"
        }}
        className="w-2 h-2 bg-accent/50 rounded-full blur-sm"
      />
    ))}
  </div>
)}
```

---

## 14. Gradient Orb Animation (Mobile Simplified)

```tsx
<motion.div
  style={{
    x: disableAnimations ? 0 : springX,
    y: disableAnimations ? 0 : springY,
    willChange: disableAnimations ? "auto" : "transform, opacity",
    transform: "translateZ(0)"
  }}
  animate={disableAnimations ? {} : {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.4, 0.3],
  }}
  transition={disableAnimations ? { duration: 0 } : {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/20 to-transparent blur-3xl"
/>
```

---

## 15. CSS-Only Alternative (Best Performance)

For simple repeating animations, prefer CSS over Framer Motion:

```tsx
// ❌ Framer Motion (heavier)
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
/>

// ✅ CSS Animation (lighter, better performance)
<div className="animate-scale-pulse" />

// In tailwind.config.ts:
animation: {
  "scale-pulse": "scalePulse 3s ease-in-out infinite",
},
keyframes: {
  scalePulse: {
    "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
    "50%": { transform: "scale(1.05)", opacity: "0.8" },
  },
}
```

---

## 16. Cleanup Pattern (Prevent Memory Leaks)

```tsx
useEffect(() => {
  if (disableAnimations) return;

  // Set up animation
  const interval = setInterval(() => {
    // Animation logic
  }, 1000);

  // ✅ ALWAYS cleanup
  return () => clearInterval(interval);
}, [disableAnimations]);

// Stop animations when tab hidden
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      setDisableAnimations(true);
    } else {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDisableAnimations(window.innerWidth < 768 || reducedMotion);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
}, []);
```

---

## 17. Typing Cursor Animation

```tsx
<motion.span
  animate={{ opacity: [1, 0.3, 1] }}
  transition={{
    duration: 0.8,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  style={{
    willChange: "opacity",
    transform: "translateZ(0)"
  }}
  className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 align-middle rounded-full"
/>
```

---

## 18. Staggered Children Animation

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

<motion.div
  variants={container}
  initial="hidden"
  animate="visible"
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={item}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)"
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 19. Modal/Overlay Animation

```tsx
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)"
        }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        {/* Modal content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 20. Loading Spinner (CSS Alternative)

```tsx
// ✅ CSS spinner (best performance)
<div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent" />

// Or custom keyframe:
<svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
    fill="none"
  />
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>
```

---

## Performance Checklist Before Deployment

- [ ] All animations use `transform` and `opacity` only
- [ ] GPU acceleration enabled (`transform: translateZ(0)`)
- [ ] `willChange` scoped to animated states (not always on)
- [ ] Mobile detection implemented in animated components
- [ ] Expensive animations disabled on mobile
- [ ] `prefers-reduced-motion` respected
- [ ] Intersection Observer used for scroll animations
- [ ] RAF throttling for mouse/scroll handlers
- [ ] Event listeners marked as `{ passive: true }`
- [ ] All intervals/timers cleaned up on unmount
- [ ] Animations stop when tab not visible
- [ ] AnimatePresence used for enter/exit animations
- [ ] No `layout` prop (causes expensive reflows)
- [ ] No animating `width`, `height`, `top`, `left`
- [ ] No animating `box-shadow` (use opacity on pseudo-element)

---

**Copy these patterns into your components for guaranteed 60fps performance!**
