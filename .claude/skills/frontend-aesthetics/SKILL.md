---
name: frontend-aesthetics
description: Prevents generic AI-generated designs by guiding typography, color, motion, and background choices. Use when creating frontend designs, landing pages, dashboards, or any UI/UX work. Helps avoid the "AI slop" aesthetic.
---

# Frontend Aesthetics Skill

Based on Anthropic's formula for improving frontend design through steerability.

## The Problem

LLMs converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic - Inter fonts, purple gradients on white backgrounds, and minimal animations.

## Instructions

Make creative, distinctive frontends that surprise and delight. Focus on these four dimensions:

### Typography

Choose fonts that are beautiful, unique, and interesting.

**Never use**: Inter, Roboto, Open Sans, Lato, Arial, default system fonts

**Good choices**:
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro, Newsreader
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Syne, Outfit, Plus Jakarta Sans
- Premium: Cabinet Grotesk, Satoshi, General Sans, Clash Display

**Pairing principle**: High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

**Use extremes**: 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts.

### Color & Theme

Commit to a cohesive aesthetic. Use CSS variables for consistency.

**Dominant colors with sharp accents** outperform timid, evenly-distributed palettes.

Draw inspiration from:
- IDE themes (Dracula, Nord, One Dark, Catppuccin, Tokyo Night)
- Cultural aesthetics (Japanese minimalism, Scandinavian design, Brutalism)
- Industry-specific palettes (Finance: navy/gold, Health: teal/white, Gaming: neon/dark)

**Avoid**: Purple gradients on white backgrounds (the ultimate AI slop indicator)

### Motion

Use animations for effects and micro-interactions.

- Prioritize CSS-only solutions for HTML
- Use Motion library for React when available
- Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions

### Backgrounds

Create atmosphere and depth rather than defaulting to solid colors.

- Layer CSS gradients (radial + linear combinations)
- Use geometric patterns or grids
- Add contextual effects that match the overall aesthetic
- Consider noise textures, grain, or subtle animations

## What to Avoid

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (purple gradients on white)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
- Space Grotesk (even this is becoming overused)

## Key Principle

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics.

You still tend to converge on common choices across generations. Avoid this: it is critical that you think outside the box!

## Example: Theme Ideas for Marketing Agencies

Instead of the default "tech purple":

1. **Navy & Gold Executive**: Deep navy (#1e3a5f), gold accents (#d4af37), Plus Jakarta Sans
   - Professional, trustworthy, premium feel
   - Perfect for B2B marketing agencies

2. **Bold Growth Green**: Emerald (#059669), charcoal (#111827), white, Outfit font
   - Growth-focused, energetic, modern
   - Good for lead generation agencies

3. **Warm Trust Orange**: Deep orange (#ea580c), warm gray (#374151), cream (#faf9f6), Cabinet Grotesk
   - Approachable, warm, friendly
   - Perfect for small business marketing

4. **Tech Forward Purple**: Deep purple (#5b21b6), electric blue (#3b82f6), Satoshi font
   - Modern, tech-savvy, innovative
   - Good for AI/automation focused agencies

5. **Clean Modern Black**: Pure black (#000000), white, subtle grays, Space Grotesk
   - Minimal, bold, high-contrast
   - Premium positioning

## Marketing Agency Specific Guidelines

**Trust Signals:**
- Use real testimonial photos (not stock)
- Display client logos if available
- Show specific numbers (leads generated, ROI achieved)
- Include certifications/partnerships

**Lead Capture Forms:**
- Make forms visually distinct from background
- Use contrasting colors for submit buttons
- Keep fields minimal (name, email, phone max)
- Add privacy reassurance text

**CTAs:**
- Use action-oriented text ("Get Your Free Consultation")
- Make primary CTAs stand out with accent color
- Include urgency where appropriate
- Repeat CTAs throughout the page

**Hero Section:**
- Bold, benefit-focused headline
- Clear value proposition
- Lead form or strong CTA above fold
- Trust badges (clients served, results)

Remember: Marketing agency websites need to look better than their clients' websites. The design IS the first impression of their capabilities.
