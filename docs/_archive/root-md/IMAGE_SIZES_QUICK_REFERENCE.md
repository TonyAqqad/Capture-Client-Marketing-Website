# IMAGE SIZES QUICK REFERENCE

**Copy-paste patterns for Next.js Image optimization**

---

## COMMON PATTERNS

### 1. Full-Width Hero Images
```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  sizes="100vw"
  priority
  className="object-cover"
/>
```

### 2. Two-Column Grid
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="w-full"
/>
```

### 3. Three-Column Grid
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="w-full"
/>
```

### 4. Four-Column Grid
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={300}
  height={200}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="w-full"
/>
```

### 5. Small Logos (Fixed Size)
```tsx
<Image
  src="/logo.png"
  alt="Logo"
  width={120}
  height={40}
  sizes="120px"
  className="h-auto"
/>
```

### 6. Avatar Images
```tsx
<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={96}
  height={96}
  sizes="(max-width: 640px) 64px, 96px"
  className="rounded-full"
/>
```

### 7. Conditional Display (Desktop Only)
```tsx
<Image
  src="/desktop-image.jpg"
  alt="Desktop image"
  width={220}
  height={48}
  sizes="(max-width: 640px) 0px, 220px"
  className="hidden sm:block"
/>
```

### 8. Conditional Display (Mobile Only)
```tsx
<Image
  src="/mobile-image.jpg"
  alt="Mobile image"
  width={40}
  height={40}
  sizes="(min-width: 640px) 0px, 40px"
  className="sm:hidden"
/>
```

---

## DECISION TREE

```
Does image span full viewport width?
├─ YES → sizes="100vw"
└─ NO → Is it in a grid?
    ├─ YES → How many columns?
    │   ├─ 2 cols → sizes="(max-width: 768px) 100vw, 50vw"
    │   ├─ 3 cols → sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    │   └─ 4 cols → sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
    └─ NO → Is it a fixed size?
        ├─ YES → sizes="120px" (use actual pixel width)
        └─ NO → Use percentage: sizes="(max-width: 640px) 100vw, 50vw"
```

---

## BREAKPOINTS USED

| Breakpoint | Tailwind Class | Typical Usage |
|------------|----------------|---------------|
| 640px | `sm:` | Small tablets, large phones |
| 768px | `md:` | Tablets |
| 1024px | `lg:` | Laptops |
| 1280px | `xl:` | Desktops |
| 1536px | `2xl:` | Large desktops |

---

## PRIORITY PROP

**Use `priority` for above-the-fold images:**

```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="100vw"
  priority  // ← Prevents lazy loading
/>
```

**When to use:**
- ✅ Hero images
- ✅ Logo in header
- ✅ First testimonial image
- ✅ Any image in first viewport
- ❌ Below-the-fold images
- ❌ Images in carousels

---

## COMMON MISTAKES

### ❌ WRONG: No sizes prop
```tsx
<Image src="/image.jpg" alt="Image" width={600} height={400} />
```

### ✅ RIGHT: With sizes prop
```tsx
<Image
  src="/image.jpg"
  alt="Image"
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

### ❌ WRONG: Using 100vw for grid images
```tsx
<div className="grid grid-cols-2">
  <Image sizes="100vw" ... />  {/* Too large! */}
</div>
```

### ✅ RIGHT: Using 50vw for 2-column grid
```tsx
<div className="grid grid-cols-2">
  <Image sizes="(max-width: 768px) 100vw, 50vw" ... />
</div>
```

---

### ❌ WRONG: Missing priority on hero
```tsx
<Image src="/hero.jpg" fill sizes="100vw" />
```

### ✅ RIGHT: Priority on hero
```tsx
<Image src="/hero.jpg" fill sizes="100vw" priority />
```

---

## TESTING

### Check if sizes is working:
1. Open DevTools → Network tab
2. Filter by "Img"
3. Resize browser window
4. Reload page
5. Check image sizes change based on viewport

### Expected behavior:
- Mobile (375px): Loads ~400w image
- Tablet (768px): Loads ~800w image
- Desktop (1920px): Loads ~1920w image

---

## PERFORMANCE IMPACT

| Device | Without sizes | With sizes | Savings |
|--------|---------------|------------|---------|
| Mobile | 500KB | 150KB | 70% |
| Tablet | 500KB | 250KB | 50% |
| Desktop | 500KB | 500KB | 0% |

**Total bandwidth saved:** ~40% average across all devices

---

## QUICK AUDIT COMMAND

```bash
# Find Image components without sizes prop
grep -r "<Image" src/ | grep -v "sizes=" | grep -v ".md"
```

If this returns any results, add `sizes` prop to those images.

---

## RESOURCES

- [Next.js Image Docs](https://nextjs.org/docs/app/api-reference/components/image#sizes)
- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Web.dev: Optimize LCP](https://web.dev/optimize-lcp/)
