# Industry Page Structure Template (Gold Standard)

Based on HomeServicesClient.tsx - the proven pattern for industry pages.

## Section Structure (In Order)

### 1. Hero Section
```
- Aurora/gradient background (bg-aurora-animated)
- Animated gradient orbs (motion.div with scale animation)
- Industry badge (inline-flex with gold border)
- Headline with $ stat in gradient text (text-gradient-gold-cyan)
- Subheadline addressing pain point
- Money counter animation in glass-premium card
- CTA buttons: btn-gold (primary) + btn-ghost (secondary)
```

### 2. Problem Impact Section
```
- 3-column grid showing pain flow
- Glass-cards with emojis (📞 ❌ 🏃)
- Stats: "27% of calls go unanswered, 85% never call back"
- Provocative question at end
```

### 3. Industry-Specific Tabs
```
- Interactive tab buttons for sub-niches
- AnimatePresence for smooth transitions
- Each tab shows:
  - Scenario description
  - Average job/treatment value
  - 3-4 step flow of how AI handles it
  - Glass cards with numbered steps
```

### 4. Integration Showcase
```
- Badge with "Seamless Integration"
- Grid of platform logos/names
- Key benefit callout
```

### 5. ROI Calculator
```
- Interactive sliders (monthly calls, avg value)
- Live calculation display
- Results in gradient card
- Stats breakdown (missed calls, lost jobs)
- CTA button
```

### 6. How It Works (4 Steps)
```
- 4-column grid
- Step cards with icons
- "STEP 1, STEP 2..." labels
- Short descriptions
```

### 7. Testimonials
```
- 3-column grid
- Quote cards with:
  - Quote symbol in gold
  - Quote text
  - Name + business type
  - Revenue metric (e.g., "$142K")
```

### 8. Before/After Comparison
```
- 2-column grid
- Before: red-bordered, pain points with ❌
- After: green-bordered, benefits with ✓
- Glass-premium for "after" card
```

### 9. Final CTA
```
- Dramatic background with blur glow
- Large glass-premium card
- Bold headline with gradient text
- Phone CTA (btn-gold, larger)
- Demo CTA (btn-ghost)
- Urgency/scarcity message
```

## Key CSS Classes to Use
- `glass-premium` - Primary cards
- `glass-card` - Secondary cards
- `glass` - Subtle transparency
- `btn-gold` - Primary CTA
- `btn-ghost` - Secondary CTA
- `text-gradient-gold-cyan` - Emphasis text
- `bg-aurora-animated` - Hero background
- `bg-mesh-premium` - Section backgrounds
- `container-custom` - Content width
- `section` - Standard section padding

## Animation Patterns
```tsx
// Standard fade up
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}

// Staggered children
transition={{ delay: index * 0.1 }}

// Scale animation for emphasis
initial={{ opacity: 0, scale: 0.9 }}
whileInView={{ opacity: 1, scale: 1 }}
```

## Industry-Specific Customizations

### Fitness Page Should Include:
- Gym/studio sub-types (CrossFit, yoga, F45, etc.)
- Class booking scenarios
- Member retention stats
- Mindbody/ZenPlanner integrations

### Dental Page Should Include:
- Practice types (general, ortho, cosmetic)
- Emergency call scenarios
- New patient value stats
- Dentrix/Eaglesoft integrations

### Med Spa Page Should Include:
- Treatment types (Botox, fillers, laser)
- High-ticket consultation scenarios
- Average treatment values ($2K-5K)
- Luxury/premium positioning

### Martial Arts Page Should Include:
- Studio types (BJJ, karate, MMA, taekwondo)
- Parent inquiry scenarios
- Trial class booking flows
- Family-focused messaging
