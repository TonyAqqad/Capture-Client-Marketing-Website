# Lead Rescue Simulator - Visual Guide

## State Machine Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         STAGE 1: SETUP                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │   ❌ Phone Icon (Red)                                │    │
│  │   "9:47 AM - Sarah Mitchell (Inbound Lead)"         │    │
│  │   "Your competitor just missed this call..."        │    │
│  │                                                       │    │
│  │   [Watch AI Capture This Lead]  ← CTA Button        │    │
│  │                                                       │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
│                    User clicks button                           │
│                           ▼                                     │
└─────────────────────────────────────────────────────────────────┘

                    startSimulation()

┌─────────────────────────────────────────────────────────────────┐
│                     STAGE 2: SIMULATION                         │
│                     (8 second sequence)                         │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────┐  │
│  │   PHONE SECTION      │  │   CRM SECTION                │  │
│  ├──────────────────────┤  ├──────────────────────────────┤  │
│  │                      │  │                              │  │
│  │  [0s-2s]             │  │  CRM Auto-Population         │  │
│  │  📞 RINGING          │  │                              │  │
│  │  Orange pulse        │  │  [ ] Lead Name               │  │
│  │                      │  │  [ ] Business Goal           │  │
│  │  [2s+]               │  │  [ ] Lead Status             │  │
│  │  📞 CONNECTED        │  │                              │  │
│  │  Cyan glow           │  │  [4s] ✓ Lead Name            │  │
│  │  🌊🌊🌊 Waveform    │  │       "Sarah Mitchell"       │  │
│  │                      │  │                              │  │
│  │  ─────────────────   │  │  [6s] ✓ Business Goal        │  │
│  │  Live Transcript:    │  │       "Scale to 10..."       │  │
│  │  [2.5s+]             │  │                              │  │
│  │  "Hi, this is Emma   │  │  [7.5s] ✓ Lead Status        │  │
│  │  from Capture AI...  │  │         "HOT LEAD" (orange)  │  │
│  │  |" ← cursor         │  │                              │  │
│  │                      │  │  ⚡ Syncing live...          │  │
│  │  ▓▓▓▓▓░░░░░         │  │                              │  │
│  │  Progress: 60%       │  │                              │  │
│  │                      │  │                              │  │
│  └──────────────────────┘  └──────────────────────────────┘  │
│                                                                 │
│                      [8s timer expires]                         │
│                            ▼                                    │
└─────────────────────────────────────────────────────────────────┘

                Transition to Stage 3

┌─────────────────────────────────────────────────────────────────┐
│                       STAGE 3: PAYOFF                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │                         ✨                            │    │
│  │     Perfect Lead Qualification in 8 Seconds           │    │
│  │                                                       │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │    │
│  │  │$12,000  │  │  8 sec  │  │  100%   │             │    │
│  │  │Potential│  │   Call  │  │ Capture │             │    │
│  │  │  LTV    │  │Duration │  │  Rate   │             │    │
│  │  └─────────┘  └─────────┘  └─────────┘             │    │
│  │                                                       │    │
│  │  "While your competitors miss calls,                 │    │
│  │   your AI agent captures every lead. 24/7."          │    │
│  │                                                       │    │
│  │  [Get Your AI Voice Agent]  ← Primary CTA           │    │
│  │  [Watch Again]              ← Reset button          │    │
│  │                                                       │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Timeline Visualization

```
TIME    PHONE STATE         TRANSCRIPT          CRM FIELDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

0.0s    🔴 RINGING          [waiting...]        [ ] Name
        Orange pulse                            [ ] Goal
        animation                               [ ] Status

1.0s    🔴 RINGING          [waiting...]        [ ] Name
        (continues)                             [ ] Goal
                                                [ ] Status

2.0s    🔵 CONNECTED        [waiting...]        [ ] Name
        ─────────           │                   [ ] Goal
        Switch to cyan      │                   [ ] Status
        Activate waveform   │

2.5s    🔵 CONNECTED        "H|              [ ] Name
        🌊 Waveform         (typing starts)     [ ] Goal
                                                [ ] Status

3.0s    🔵 CONNECTED        "Hi, this is     [ ] Name
        🌊 Waveform         Emma from...|"      [ ] Goal
                                                [ ] Status

4.0s    🔵 CONNECTED        "...Capture AI.  [✓] Name ← FLASH!
        🌊 Waveform         I see you're        "Sarah Mitchell"
                            interested...|"     [ ] Goal
                                                [ ] Status

5.0s    🔵 CONNECTED        "...in growing   [✓] Name
        🌊 Waveform         your business.      "Sarah Mitchell"
                            What's your         [ ] Goal
                            name?...|"          [ ] Status

6.0s    🔵 CONNECTED        "Sarah           [✓] Name
        🌊 Waveform         Mitchell.           "Sarah Mitchell"
                            Great to meet    [✓] Goal ← FLASH!
                            you...|"            "Scale to 10..."
                                                [ ] Status

7.0s    🔵 CONNECTED        "What's your     [✓] Name
        🌊 Waveform         main business       "Sarah Mitchell"
                            goal right       [✓] Goal
                            now?...|"           "Scale to 10..."
                                                [ ] Status

7.5s    🔵 CONNECTED        "I want to       [✓] Name
        🌊 Waveform         scale from 3        "Sarah Mitchell"
                            to 10            [✓] Goal
                            locations...|"      "Scale to 10..."
                                             [✓] Status ← FLASH!
                                                "HOT LEAD" 🔥

8.0s    ╔═══════════════════════════════════════════════════╗
        ║         TRANSITION TO STAGE 3: PAYOFF             ║
        ║  Show success metrics, CTA buttons, testimonials  ║
        ╚═══════════════════════════════════════════════════╝
```

---

## Color Scheme

### Phone States

```
RINGING STATE:
┌─────────────────┐
│   📞 RINGING   │  ← Orange border (#ff6b35)
│                 │     Pulsing glow effect
│  "Incoming..."  │     1s animation loop
└─────────────────┘

CONNECTED STATE:
┌─────────────────┐
│  📞 CONNECTED  │  ← Cyan border (#00d9ff)
│                 │     Steady glow
│  🌊🌊🌊       │     Animated waveform
│                 │     1.2s wave cycle
└─────────────────┘
```

### CRM Field States

```
EMPTY:
┌────────────────────────────┐
│ Lead Name                  │  ← Gray border (#333)
│ ─                          │     No background
└────────────────────────────┘

FILLED (Normal):
┌────────────────────────────┐
│ Lead Name              ✓   │  ← Cyan border (#00d9ff)
│ Sarah Mitchell             │     Cyan tint background
└────────────────────────────┘     rgba(0, 217, 255, 0.1)

FILLED (Urgent):
┌────────────────────────────┐
│ Lead Status            ✓   │  ← Orange border (#ff6b35)
│ HOT LEAD - Follow up today │     Orange tint background
└────────────────────────────┘     rgba(255, 107, 53, 0.1)

FLASHING (600ms):
┌────────────────────────────┐
│ Lead Name              ✓   │  ← Bright pulse
│ Sarah Mitchell             │     0% → 40% → 10% opacity
└────────────────────────────┘     on background
```

---

## Animation Specifications

### Phone Pulse (Ringing)

```css
@keyframes pulse-orange {
  0%   { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
  50%  { box-shadow: 0 0 40px rgba(255, 107, 53, 0.7); }
  100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
}
/* Duration: 1s, infinite loop */
```

### Waveform Bars (Connected)

```
5 bars, staggered animation:

Bar 1: delay 0.0s    │
Bar 2: delay 0.1s     │   │
Bar 3: delay 0.2s     │   │   │
Bar 4: delay 0.3s     │   │   │   │
Bar 5: delay 0.4s     │   │   │   │   │

Each bar: 10px → 40px → 10px
Duration: 1.2s, infinite loop, ease-in-out
```

### Field Flash (CRM Population)

```
Timeline for single flash (600ms):

0ms  ──────► Background: rgba(0, 217, 255, 0.1)
300ms ─────► Background: rgba(0, 217, 255, 0.4)  ← Peak
600ms ─────► Background: rgba(0, 217, 255, 0.1)  ← Return

Easing: ease
```

### Field Fade-In (Initial Population)

```
0ms  ──────► opacity: 0, translateY(-10px)
200ms ─────► opacity: 0.5, translateY(-5px)
400ms ─────► opacity: 1, translateY(0)      ← Final

Easing: ease
```

### Typewriter Cursor Blink

```
0ms   ──────► opacity: 1  (visible)
500ms ─────► opacity: 0  (invisible)
1000ms ────► opacity: 1  (visible)

Infinite loop, step easing (no smooth transition)
```

---

## Responsive Breakpoints

### Desktop (1200px+)

```
┌─────────────────────────────────────────┐
│  PHONE SECTION     │   CRM SECTION      │
│  (50% width)       │   (50% width)      │
│                    │                    │
│  Side-by-side layout                    │
└─────────────────────────────────────────┘
```

### Tablet (768px - 1199px)

```
┌──────────────────────────┐
│    PHONE SECTION         │
│    (100% width)          │
├──────────────────────────┤
│    CRM SECTION           │
│    (100% width)          │
└──────────────────────────┘
Stacked layout
```

### Mobile (< 768px)

```
┌─────────────────┐
│  PHONE SECTION  │
│  (compact)      │
├─────────────────┤
│  CRM SECTION    │
│  (simplified)   │
└─────────────────┘
Smaller fonts, reduced padding
```

---

## User Interaction Points

### Stage 1: Setup

```
User sees missed call scenario
          ↓
[Watch AI Capture This Lead] ← Click
          ↓
startSimulation() fires
          ↓
Navigate to Stage 2
```

### Stage 2: Simulation

```
User watches 8-second sequence
          ↓
(Optional) [Skip to Payoff →] ← Click to fast-forward
          ↓
Auto-transition at 8s
          ↓
Navigate to Stage 3
```

### Stage 3: Payoff

```
User sees success metrics
          ↓
Two options:
┌────────────────┐  ┌───────────────┐
│ [Get AI Agent] │  │ [Watch Again] │
│   (primary)    │  │   (secondary) │
└────────────────┘  └───────────────┘
     ↓                      ↓
  Conversion         resetSimulation()
  (lead form)        Back to Stage 1
```

---

## Performance Considerations

### Critical Rendering Path

```
Initial Load:
  1. Load React components
  2. Initialize hooks
  3. Render Stage 1 (static)
  4. Preload audio waveform CSS
  5. Ready for interaction

Start Simulation:
  1. setState() to Stage 2
  2. Schedule 8 timeouts
  3. Begin rendering animations
  4. Start typewriter effect
  5. Update CRM fields sequentially
  6. Transition to Stage 3

Reset:
  1. Clear all timeouts
  2. setState() to Stage 1
  3. Reset CRM fields
  4. Reset typewriter
  5. Ready for next run
```

### Memory Management

```
Hooks create:
  - 8 setTimeout instances (tracked in ref)
  - 1 typewriter interval (tracked in ref)
  - State objects (garbage collected on unmount)

Cleanup ensures:
  ✅ All timeouts cleared on unmount
  ✅ All refs nullified
  ✅ No memory leaks
  ✅ No zombie timers
```

---

## Testing Scenarios

### Happy Path

1. Load page → Stage 1 visible
2. Click CTA → Stage 2 begins
3. Watch 8s sequence → All events fire
4. Auto-transition → Stage 3 visible
5. Click "Watch Again" → Back to Stage 1

### Edge Cases

1. **Rapid clicking:** Prevent double-start
2. **Unmount during simulation:** Clean up timers
3. **Browser tab inactive:** Timers continue (consider pausing)
4. **Slow network:** Images load gracefully
5. **Skip to payoff:** Immediately fill all CRM fields

---

## File Structure Summary

```
src/
├── hooks/
│   ├── useSimulationState.ts        # State machine (270 lines)
│   ├── useTypewriter.ts              # Typewriter effect (150 lines)
│   ├── useSimulationState.test.utils.ts  # Testing utilities
│   └── index.ts                      # Exports
├── components/
│   ├── LeadRescueSimulator.tsx       # Main component
│   └── LeadRescueSimulator.example.tsx  # Reference implementation
└── docs/
    ├── SIMULATOR_STATE_MANAGEMENT.md  # Full documentation
    ├── TIMING_REFERENCE.md            # Quick reference
    └── SIMULATOR_VISUAL_GUIDE.md      # This file
```

---

**Total Implementation:**
- 3 stages
- 8 second sequence
- 7 timing milestones
- 2 custom hooks
- 3 CRM fields
- 1 typewriter effect
- 4 animation types
- 100% polished experience
