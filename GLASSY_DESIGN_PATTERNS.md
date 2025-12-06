# Premium Glassy Design Patterns - Quick Reference

Reusable code patterns for creating premium glassy UI components.

---

## Pattern 1: Premium Glassy Card

```tsx
<div className="group relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,201,255,0.25)] hover:-translate-y-1">
  {/* Inner glow on hover */}
  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

  {/* Mesh gradient overlay */}
  <div className="absolute inset-0 opacity-40 bg-mesh-premium pointer-events-none rounded-2xl" />

  {/* Content */}
  <div className="relative z-10">
    Your content here
  </div>
</div>
```

---

## Pattern 2: Glowing Icon Container

```tsx
<div className="relative w-16 h-16">
  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 rounded-2xl blur-md" />
  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-sm border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center group-hover:border-accent/40 transition-colors duration-500">
    <span className="material-icons text-4xl text-accent drop-shadow-[0_4px_8px_rgba(0,201,255,0.5)]">
      check_circle
    </span>
  </div>
</div>
```

---

## Pattern 3: Premium Section Headers

```tsx
<h2 className="text-5xl font-heading font-black text-center mb-12">
  <span className="text-white/40 font-extralight">Key</span>{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-primary">
    Benefits
  </span>
</h2>
```

---

## Pattern 4: Glowing Checkmarks

```tsx
<div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 backdrop-blur-sm border border-accent/50 shadow-[0_2px_8px_rgba(0,201,255,0.3)] group-hover:shadow-[0_4px_12px_rgba(0,201,255,0.5)]">
  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(0,201,255,0.8)]" />
</div>
```

---

## Pattern 5: Gradient Text Reveal on Hover

```tsx
<h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent transition-all duration-500">
  Service Title
</h3>
```

---

## Color Reference

- Primary: `#4A69E2` (Indigo)
- Accent: `#00C9FF` (Electric Cyan)
- Background: `#0F172A` (Deep Navy)

## Shadow Glows

```css
/* Accent glow */
shadow-[0_8px_24px_rgba(0,201,255,0.4)]

/* Primary glow */
shadow-[0_8px_24px_rgba(74,105,226,0.4)]

/* Large glow */
shadow-[0_20px_60px_rgba(0,201,255,0.25)]
```

---

See full documentation in SERVICES_UI_ENHANCEMENT_COMPLETE.md
