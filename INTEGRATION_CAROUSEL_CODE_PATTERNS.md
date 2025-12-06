# Integration Carousel - Code Patterns Reference

## State Management Pattern

```tsx
// Component state for carousel behavior
const [isPaused, setIsPaused] = useState(false);
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const [isDragging, setIsDragging] = useState(false);
const scrollRef = useRef<HTMLDivElement>(null);
```

## Infinite Loop Pattern

```tsx
// Duplicate integrations 3x for seamless infinite scrolling
const duplicatedIntegrations = [
  ...integrations,
  ...integrations,
  ...integrations,
];

// Calculate animation distance
const cardWidth = 280;
const gap = 24;
const totalWidth = integrations.length * (cardWidth + gap);
```

## Auto-Scrolling Animation

```tsx
<motion.div
  className="flex gap-6"
  animate={{
    x: isPaused || isDragging ? undefined : [0, -totalWidth],
  }}
  transition={{
    x: {
      repeat: Infinity,
      duration: integrations.length * 3,
      ease: "linear",
    },
  }}
  drag="x"
  dragConstraints={{ left: -totalWidth, right: 0 }}
  dragElastic={0.1}
>
```

## Key Takeaways

1. Duplicate content 3x for seamless infinite loop
2. Calculate totalWidth from card dimensions
3. Stop animation on hover for better UX
4. Prevent clicks during drag
5. Use AnimatePresence for smooth transitions
6. Fixed card sizes prevent layout shift
7. Gradient overlays create professional fade
8. Linear easing for consistent scrolling
9. GPU transforms for 60fps performance
10. Mobile-first with progressive enhancement

---

**Pattern Source:** IntegrationRelated.tsx carousel implementation
