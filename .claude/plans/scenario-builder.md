# Scenario Builder - Implementation Plan

## Overview
An interactive tool that lets visitors build custom conversation scenarios to see how Capture Client's AI would handle their specific business situations. This goes beyond the Lead Response Simulator by allowing multi-turn conversations and scenario customization.

## User Flow
```
[Choose Business Type] → [Select/Create Scenario] → [Watch Conversation Unfold]
                                                    ↓
                              [See Full Transcript + Lead Outcome]
```

## Key Differentiator from Lead Response Simulator
| Lead Response Simulator | Scenario Builder |
|------------------------|------------------|
| Single message → Single response | Multi-turn conversation |
| User provides the lead | Pre-built + custom scenarios |
| Tests AI response quality | Tests full conversation flow |
| Quick "try it" experience | Deep "see how it works" experience |

---

## Feature Options

### Option A: Pre-Built Scenario Library (Recommended)
Curated scenarios that showcase AI capabilities:

**By Industry:**
- Plumbing: Emergency leak, routine maintenance, pricing inquiry
- Dental: Emergency toothache, new patient, insurance question
- HVAC: AC broken in summer, heating issue, maintenance plan
- Auto: Check engine light, oil change, brake concerns
- Law: Accident inquiry, consultation request, follow-up
- General: After-hours call, pricing question, complaint

**By Scenario Type:**
- Emergency situations (high urgency)
- Routine service requests
- Pricing/quote inquiries
- Scheduling appointments
- Complaint handling
- After-hours calls

### Option B: Custom Scenario Creator (Advanced)
Users define their own scenarios:
1. Choose business type
2. Describe caller persona (e.g., "frustrated homeowner with leak")
3. Define caller's goal (e.g., "get someone out today")
4. AI generates realistic conversation

---

## Recommended Implementation: Hybrid Approach

### Phase 1: Pre-Built Scenario Library
- Ship quickly with curated scenarios
- Prove value with polished examples
- Low risk, high impact

### Phase 2: Custom Scenario Input (Future)
- Let users describe custom scenarios
- AI generates conversation based on description
- More personalized experience

---

## Technical Design

### Data Structure
```typescript
interface Scenario {
  id: string;
  title: string;
  businessType: BusinessType;
  category: "emergency" | "routine" | "pricing" | "scheduling" | "complaint" | "after_hours";
  description: string;
  callerPersona: string;
  callerGoal: string;
  transcript: TranscriptMessage[];
  outcome: {
    leadScore: number;
    intent: Intent;
    actionTaken: string; // "Appointment Booked", "Service Scheduled", etc.
  };
}

interface TranscriptMessage {
  timestamp: string;
  speaker: "AI" | "Caller";
  text: string;
  metadata?: {
    emotion?: string; // "frustrated", "relieved", "curious"
    crmExtracted?: string[]; // ["name", "phone", "service"]
  };
}
```

### Component Architecture
```
ScenarioBuilder/
├── ScenarioBuilder.tsx        # Main component
├── ScenarioLibrary.tsx        # Grid of available scenarios
├── ScenarioCard.tsx           # Individual scenario card
├── ScenarioPlayer.tsx         # Plays through conversation
├── ScenarioOutcome.tsx        # Shows final result
└── data/
    └── scenarios.ts           # Pre-built scenario data
```

---

## UI Design

### Main Interface
```
┌────────────────────────────────────────────────────────┐
│  🎭 Scenario Builder                                   │
│  See how AI handles different business situations      │
├────────────────────────────────────────────────────────┤
│  [Filter by: Industry ▼] [Filter by: Type ▼]          │
├────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ 🚨       │ │ 📅       │ │ 💰       │               │
│  │ Emergency│ │ Routine  │ │ Pricing  │               │
│  │ Leak     │ │ Cleaning │ │ Question │               │
│  │ Plumbing │ │ Dental   │ │ HVAC     │               │
│  └──────────┘ └──────────┘ └──────────┘               │
│                                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ 📞       │ │ 😤       │ │ 🌙       │               │
│  │ Schedule │ │ Complaint│ │ After    │               │
│  │ Consult  │ │ Response │ │ Hours    │               │
│  │ Law Firm │ │ Auto     │ │ General  │               │
│  └──────────┘ └──────────┘ └──────────┘               │
└────────────────────────────────────────────────────────┘
```

### Scenario Player (Modal or Slide-Out)
```
┌────────────────────────────────────────────────────────┐
│  Emergency Leak - Plumbing                    [Close]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [Phone Interface with Live Transcript]               │
│                                                        │
│  ┌────────────────────────────────────────────────┐   │
│  │ 0:01  AI: Thank you for calling...            │   │
│  │ 0:05  Caller: Hi, I have a major leak...      │   │
│  │ 0:11  AI: I understand, that sounds urgent... │   │
│  │ ...                                            │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  [▶ Play] [⏸ Pause] [↺ Restart]                       │
│                                                        │
├────────────────────────────────────────────────────────┤
│  📊 Outcome                                            │
│  ├─ Lead Score: 9/10 (High Quality)                   │
│  ├─ Intent: Emergency Service Request                 │
│  └─ Action: Service Scheduled (2-4 PM today)          │
└────────────────────────────────────────────────────────┘
```

---

## Pre-Built Scenarios (18 Total)

### Plumbing (3)
1. **Emergency Leak** - Burst pipe, needs immediate service
2. **Water Heater Issue** - No hot water, scheduling repair
3. **Pricing Inquiry** - Asking about drain cleaning cost

### Dental (3)
4. **Toothache Emergency** - Severe pain, needs same-day appointment
5. **New Patient Scheduling** - Booking first cleaning
6. **Insurance Question** - Asking about coverage

### HVAC (3)
7. **AC Emergency** - No cooling during heatwave
8. **Heating Concern** - Furnace making noise
9. **Maintenance Plan** - Inquiring about service contracts

### Auto (3)
10. **Check Engine Light** - Diagnostic needed
11. **Brake Concerns** - Squeaking sounds
12. **Oil Change Request** - Routine service scheduling

### Law (3)
13. **Accident Consultation** - Car accident victim seeking help
14. **Estate Planning** - Asking about will preparation
15. **Follow-Up Call** - Existing client with question

### General (3)
16. **After-Hours Call** - 2 AM inquiry, AI handling
17. **Pricing Negotiation** - Customer asking for discount
18. **Complaint Handling** - Unhappy customer, de-escalation

---

## Integration Options

### Option 1: Replace Existing Demo Section
Replace current scenario player with the new Scenario Builder

### Option 2: Add as New Tab/Section
Keep existing demo, add Scenario Builder as additional section

### Option 3: Separate Page (Recommended for V1)
Create `/demo/scenarios` page for deeper exploration

---

## Implementation Steps

### Phase 1: Core Components (MVP)
1. Create `scenarios.ts` data file with 6 scenarios (1 per industry)
2. Create `ScenarioCard.tsx` component
3. Create `ScenarioLibrary.tsx` grid component
4. Create `ScenarioPlayer.tsx` with auto-play transcript
5. Create `ScenarioOutcome.tsx` for results display

### Phase 2: Integration
6. Add to demo page OR create new `/demo/scenarios` route
7. Add filtering by industry/type
8. Mobile-optimize layout

### Phase 3: Polish
9. Add animations (message entrance, outcome reveal)
10. Add keyboard shortcuts (space to play/pause)
11. Add sharing capability (copy link to specific scenario)

### Phase 4: Future Enhancements
12. Custom scenario creator (AI-generated conversations)
13. Industry-specific landing pages
14. A/B test different scenarios

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/demo/scenarios/ScenarioBuilder.tsx` | Main container |
| `src/components/demo/scenarios/ScenarioLibrary.tsx` | Grid of scenario cards |
| `src/components/demo/scenarios/ScenarioCard.tsx` | Individual scenario preview |
| `src/components/demo/scenarios/ScenarioPlayer.tsx` | Conversation playback |
| `src/components/demo/scenarios/ScenarioOutcome.tsx` | Results display |
| `src/components/demo/scenarios/data/scenarios.ts` | Pre-built scenario data |
| `src/app/demo/scenarios/page.tsx` | Optional: separate page |

---

## Considerations

### Performance
- Pre-load scenario data (small, static)
- Lazy load ScenarioPlayer modal
- Use CSS animations over JS where possible

### SEO
- Each scenario could be its own page (`/demo/scenarios/plumbing-emergency`)
- Indexable for long-tail keywords ("AI plumber answering service demo")

### Analytics
- Track which scenarios are viewed most
- Track completion rate (did user watch full conversation?)
- Track click-through to CTA after viewing

---

## Success Metrics

✅ Visitor selects industry-relevant scenario
✅ Conversation feels natural and realistic
✅ Outcome shows clear business value
✅ User thinks: "This AI could handle MY calls"
✅ User proceeds to CTA (contact, trial, call)

---

## Estimated Effort

| Phase | Effort | Impact |
|-------|--------|--------|
| Phase 1 (MVP) | 2-3 hours | High |
| Phase 2 (Integration) | 1 hour | Medium |
| Phase 3 (Polish) | 1-2 hours | Medium |
| Phase 4 (Custom) | 4+ hours | High (future) |

**Recommendation**: Start with Phase 1 MVP using 6 curated scenarios (1 per industry). This proves value quickly while keeping scope manageable.
