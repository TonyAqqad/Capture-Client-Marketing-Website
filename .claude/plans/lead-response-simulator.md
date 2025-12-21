# Lead Response Simulator - Implementation Plan

## Overview
Create a "WOW factor" interactive demo that lets visitors paste a lead inquiry and instantly see how Capture Client's AI would respond. This proves AI capability in real-time, addressing the "Too robotic" and "AI Capability" objections.

## User Flow
```
[Select Industry] → [Paste Lead Message] → [Click "Test Response"] → [Watch AI Response Stream In]
                                                                    ↓
                                                        [See Lead Score + Intent + CRM Data]
```

## Existing Infrastructure (Leverage)

### `/api/demo-response/route.ts` (Already Built!)
- ✅ Claude API integration (`claude-sonnet-4-5-20250929`)
- ✅ Rate limiting (10 req/min per IP)
- ✅ 6 Business types: plumbing, dental, auto, hvac, law, general
- ✅ Intent detection (7 types: emergency, service_request, inquiry, schedule, pricing, complaint, general)
- ✅ Lead scoring (1-10 scale)
- ✅ CRM data extraction (name, phone, email, service, urgency, preferredTime)
- ✅ Fallback responses when API unavailable

### API Interface
```typescript
// Request
interface DemoRequest {
  userMessage: string;
  businessType: "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";
  conversationHistory?: ConversationMessage[];
}

// Response
interface DemoResponse {
  response: string;
  intent: Intent;
  leadScore: number;
  suggestedCrmFields: ExtractedCRMData;
}
```

---

## New Component: `LeadResponseSimulator.tsx`

### Location
`src/components/demo/LeadResponseSimulator.tsx`

### Features

#### 1. Industry Selector
- Dropdown or pill selector with 6 industries (+ icons)
- Map to API businessType values
- Industries: Plumbing, Dental, Auto, HVAC, Law, General Service

#### 2. Lead Message Input
- Large textarea (3-4 rows, expandable)
- Placeholder: "Paste a lead message, email, or voicemail transcript..."
- Example prompts for each industry (click to populate)

#### 3. AI Response Display
- Typewriter animation effect for response text
- AI avatar with pulsing indicator
- Glass morphism card styling

#### 4. Lead Intelligence Panel (after response)
Shows what the AI detected:
- **Lead Score**: Visual meter (1-10) with color coding
- **Intent**: Badge showing detected intent (emergency, schedule, etc.)
- **CRM Fields**: Extracted data as editable pills (name, phone, service, urgency)

#### 5. States
- **Idle**: Industry selected, awaiting input
- **Loading**: Pulsing animation, "AI is analyzing..."
- **Response**: Typewriter effect streaming
- **Complete**: Full response + lead intelligence panel

#### 6. Error Handling
- Rate limit exceeded: "You've been testing a lot! Wait a moment and try again."
- API error: Graceful fallback to show sample response

---

## Design System

### Light Theme (per guardrails)
```tsx
// Card container
className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg"

// Primary button
className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"

// Industry pills (selected)
className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"

// Industry pills (unselected)
className="bg-slate-100 text-slate-600 hover:bg-slate-200"

// Lead score meter
// 1-3: text-red-500 / bg-red-500
// 4-6: text-amber-500 / bg-amber-500
// 7-10: text-emerald-500 / bg-emerald-500
```

### Motion (from @/lib/motion)
```tsx
import { motion, AnimatePresence } from "@/lib/motion";

// Typewriter effect: 20-40ms per character
// Card entrance: fade + slide up (0.5s, spring physics)
// Lead panel: staggered reveal (0.1s delay per item)
```

---

## Integration into Demo Page

### Option A: New Section Before Live Stats (Recommended)
Add as prominent standalone section after the scenario player.

```tsx
// In DemoContent.tsx
<ScenarioPlayer /> // Existing

{/* NEW - Lead Response Simulator */}
<section className="section bg-white relative overflow-hidden">
  <div className="container-custom">
    <h2>Try It Yourself</h2>
    <LeadResponseSimulator />
  </div>
</section>

<LiveStatsSection /> // Existing
```

### Option B: Tabbed Interface
Add tabs: "Watch Demo" | "Try It Yourself"
- More compact but hides one experience at a time

**Recommendation: Option A** - Keeps both experiences visible, more impactful

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/demo/LeadResponseSimulator.tsx` | **CREATE** | Main simulator component |
| `src/components/demo/LeadScoreIndicator.tsx` | **CREATE** | Visual lead score meter |
| `src/components/demo/IntentBadge.tsx` | **CREATE** | Intent type badge |
| `src/components/demo/CRMFieldsDisplay.tsx` | **CREATE** | Extracted CRM data display |
| `src/app/demo/DemoContent.tsx` | **MODIFY** | Add new section |

---

## Example Industry Data

```typescript
const INDUSTRIES = [
  { id: "plumbing", label: "Plumbing", icon: Wrench, examples: [
    "Hi, I have a leak under my kitchen sink. Can you send someone today?",
    "My water heater stopped working. No hot water at all.",
  ]},
  { id: "dental", label: "Dental", icon: Stethoscope, examples: [
    "I have severe tooth pain and need an emergency appointment.",
    "Looking to schedule a cleaning for my whole family.",
  ]},
  { id: "auto", label: "Auto", icon: Car, examples: [
    "My check engine light came on. Can you diagnose it?",
    "Need an oil change and tire rotation.",
  ]},
  { id: "hvac", label: "HVAC", icon: Thermometer, examples: [
    "AC isn't blowing cold air. It's 90 degrees in here!",
    "Interested in a maintenance plan for my heating system.",
  ]},
  { id: "law", label: "Law Firm", icon: Gavel, examples: [
    "I was in a car accident and need legal help.",
    "Looking for help with a custody issue.",
  ]},
  { id: "general", label: "General", icon: Building2, examples: [
    "Do you offer 24/7 emergency service?",
    "What are your hours and pricing?",
  ]},
];
```

---

## Implementation Steps

### Phase 1: Create Core Component
1. Create `LeadResponseSimulator.tsx` with industry selector + input
2. Add API call to `/api/demo-response`
3. Implement loading state

### Phase 2: Add Visual Polish
4. Create `LeadScoreIndicator.tsx` (animated meter)
5. Create `IntentBadge.tsx` (styled badge)
6. Create `CRMFieldsDisplay.tsx` (pills)
7. Add typewriter animation for response

### Phase 3: Integrate + Test
8. Add section to `DemoContent.tsx`
9. Test all industry types
10. Test rate limiting behavior
11. Test mobile responsiveness

---

## Verification Checklist

After implementation:
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Works on mobile (375px+)
- [ ] Rate limiting shows friendly message
- [ ] All 6 industries return relevant responses
- [ ] Lead score, intent, CRM fields display correctly
- [ ] Typewriter animation smooth
- [ ] Light theme colors only (no gold/amber)

---

## Performance Considerations

1. **Debounce input** (optional) - Not needed since user clicks button
2. **Loading state** - Show immediately on click
3. **Timeout** - API has 150 max_tokens = ~2-3s max response time
4. **Caching** - Don't cache (each response should feel unique)

---

## Success Metrics (WOW Factor)

✅ Visitor pastes real lead message
✅ AI response appears in <3 seconds
✅ Response feels natural, not robotic
✅ Lead score shows AI understands urgency
✅ CRM fields prove extraction capability
✅ Visitor thinks: "This would actually work for my business"
