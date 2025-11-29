# Lead Rescue Simulator - State Management Documentation

## Overview

A precision-timed 3-stage interactive simulator demonstrating AI voice agent lead capture with React state management, custom hooks, and orchestrated timing sequences.

---

## Architecture

### File Structure

```
src/
├── hooks/
│   ├── useSimulationState.ts    # Main state machine & timing orchestration
│   ├── useTypewriter.ts          # Typewriter effect with natural pacing
│   └── index.ts                  # Barrel exports
└── components/
    ├── LeadRescueSimulator.tsx   # Your actual component
    └── LeadRescueSimulator.example.tsx  # Usage reference
```

---

## Core Hooks

### 1. `useSimulationState()`

**Purpose:** Manages the entire simulation lifecycle with precise timing control.

**Returns:**
```typescript
{
  state: SimulationState,
  controls: SimulationControls
}
```

**State Shape:**
```typescript
interface SimulationState {
  stage: 'setup' | 'simulation' | 'payoff';
  callState: 'idle' | 'ringing' | 'connected';
  isTyping: boolean;
  crmFields: CRMField[];
  transcriptComplete: boolean;
}
```

**Controls:**
```typescript
interface SimulationControls {
  startSimulation: () => void;   // Begin stage 2 sequence
  resetSimulation: () => void;    // Return to stage 1
  skipToPayoff: () => void;       // Jump to stage 3 (testing)
}
```

**Key Features:**
- ✅ Automatic timeout cleanup on unmount
- ✅ Proper timer reference tracking
- ✅ Sequential state updates at precise intervals
- ✅ Flash animation coordination
- ✅ Stage transitions

---

### 2. `useTypewriter()`

**Purpose:** Character-by-character text reveal with natural pacing.

**Usage:**
```typescript
const transcript = useTypewriter({
  text: AI_TRANSCRIPT,
  isActive: state.isTyping,
  speed: 45,  // ms per character
  delay: 0,   // initial delay
  onComplete: () => console.log('Done!'),
});

// Returns:
// {
//   displayText: string,
//   isComplete: boolean,
//   progress: number (0-100),
//   reset: () => void
// }
```

**Key Features:**
- ✅ Natural pause after punctuation (300ms for periods, 150ms for commas)
- ✅ Configurable speed presets (FAST: 30ms, DEFAULT: 45ms, SLOW: 65ms)
- ✅ Progress tracking (0-100%)
- ✅ Completion callback
- ✅ Manual reset capability

---

## Timing Configuration

### The 8-Second Sequence

Located in `SIMULATION_TIMING` constant:

```typescript
const SIMULATION_TIMING = {
  RING_DURATION: 2000,           // 0s-2s: Phone rings (orange glow)
  CONNECT_AT: 2000,              // 2s: Phone connects (cyan glow)
  TRANSCRIPT_START_AT: 2500,     // 2.5s: AI transcript typing begins
  CRM_FIELD_1_AT: 4000,          // 4s: "Name" field populates + flash
  CRM_FIELD_2_AT: 6000,          // 6s: "Goal" field populates + flash
  CRM_FIELD_3_AT: 7500,          // 7.5s: "Status" field populates (urgent)
  STAGE_3_TRANSITION_AT: 8000,   // 8s: Transition to payoff stage

  FLASH_DURATION: 600,           // Field flash animation duration
  FIELD_FADE_IN: 400,            // Field fade-in animation
};
```

### Visual Timeline

```
0s ──────────► Phone starts RINGING (orange pulse animation)

2s ──────────► Phone CONNECTS (switch to cyan glow)
              │ Waveform activates

2.5s ────────► Transcript TYPING begins (typewriter effect)
              │ "Hi, this is Emma..."

4s ──────────► CRM Field 1: "Name" populates ✓
              │ Flash animation (600ms)
              │ Value: "Sarah Mitchell"

6s ──────────► CRM Field 2: "Goal" populates ✓
              │ Flash animation (600ms)
              │ Value: "Scale to 10 locations by 2026"

7.5s ────────► CRM Field 3: "Status" populates ✓ (URGENT)
              │ Flash animation (600ms)
              │ Value: "HOT LEAD - Follow up today"

8s ──────────► Transition to PAYOFF stage
              │ Show metrics & CTA
```

---

## Implementation Guide

### Step 1: Import Hooks

```typescript
import {
  useSimulationState,
  useTypewriter,
  SIMULATION_TIMING,
} from '@/hooks';
```

### Step 2: Initialize State

```typescript
export default function LeadRescueSimulator() {
  const { state, controls } = useSimulationState();

  const transcript = useTypewriter({
    text: AI_TRANSCRIPT,
    isActive: state.isTyping,
    speed: 45,
  });

  // ... render based on state.stage
}
```

### Step 3: Conditional Rendering

```typescript
if (state.stage === 'setup') {
  return <SetupStage onStart={controls.startSimulation} />;
}

if (state.stage === 'simulation') {
  return (
    <SimulationStage
      callState={state.callState}
      transcript={transcript.displayText}
      isTyping={state.isTyping}
      crmFields={state.crmFields}
    />
  );
}

if (state.stage === 'payoff') {
  return <PayoffStage onReset={controls.resetSimulation} />;
}
```

---

## CRM Field Behavior

### Field Structure

```typescript
interface CRMField {
  id: string;          // 'name', 'goal', 'status'
  label: string;       // Display label
  value: string;       // Populated value
  isFilled: boolean;   // Whether field has data
  isFlashing: boolean; // Flash animation active
  isUrgent?: boolean;  // Red urgent styling
}
```

### Default Fields

```typescript
[
  {
    id: 'name',
    label: 'Lead Name',
    value: 'Sarah Mitchell',
    isFilled: false,
    isFlashing: false,
  },
  {
    id: 'goal',
    label: 'Business Goal',
    value: 'Scale to 10 locations by 2026',
    isFilled: false,
    isFlashing: false,
  },
  {
    id: 'status',
    label: 'Lead Status',
    value: 'HOT LEAD - Follow up today',
    isFilled: false,
    isFlashing: false,
    isUrgent: true,  // Red styling
  },
]
```

### Flash Animation Timing

1. Field becomes `isFilled: true` and `isFlashing: true`
2. After 600ms, `isFlashing` switches to `false`
3. Field remains filled with subtle cyan/orange background

---

## Phone States & Styling

### State: 'ringing'
- **Color:** Orange (#ff6b35)
- **Effect:** Pulsing glow animation
- **Duration:** 0s - 2s

### State: 'connected'
- **Color:** Cyan (#00d9ff)
- **Effect:** Steady glow + audio waveform
- **Duration:** 2s - end of simulation

---

## Typewriter Speed Tuning

### Presets

```typescript
TYPEWRITER_CONFIG = {
  DEFAULT_SPEED: 45,   // Natural (22 chars/sec)
  FAST_SPEED: 30,      // Faster paced
  SLOW_SPEED: 65,      // Dramatic reveal
}
```

### Punctuation Pauses

```typescript
PAUSE_ON_PUNCTUATION = {
  '.': 300,   // Long pause
  '!': 300,
  '?': 300,
  ',': 150,   // Short pause
  ':': 200,   // Medium pause
  ';': 200,
}
```

**Why it matters:** Creates natural speaking rhythm. Without pauses, AI dialogue feels robotic.

---

## Advanced: Multiple Typewriters

For multi-line sequential reveals:

```typescript
import { useMultipleTypewriters } from '@/hooks';

const lines = [
  { text: "Hi, this is Emma.", speed: 45 },
  { text: "How can I help you today?", speed: 45, delay: 200 },
];

const { results, allComplete } = useMultipleTypewriters(
  lines,
  isActive,
  500  // 500ms delay between lines
);

// results[0].displayText → First line
// results[1].displayText → Second line
```

---

## Testing & Debugging

### Debug Controls

```typescript
<button onClick={controls.skipToPayoff}>
  Skip to Payoff →
</button>

<button onClick={controls.resetSimulation}>
  Reset
</button>
```

### Console Logging

Add to `useSimulationState.ts` for debugging:

```typescript
scheduleTimeout(() => {
  console.log('🔔 [2s] Phone connected');
  setState(prev => ({ ...prev, callState: 'connected' }));
}, SIMULATION_TIMING.CONNECT_AT);
```

### Common Issues

**Issue:** Typewriter starts too early
- **Fix:** Increase `TRANSCRIPT_START_AT` delay

**Issue:** CRM fields flash too long
- **Fix:** Decrease `FLASH_DURATION` (currently 600ms)

**Issue:** Transitions feel abrupt
- **Fix:** Add CSS transitions to all state-dependent styles

---

## Performance Considerations

### Memory Leaks Prevention

✅ All timeouts tracked in `timeoutsRef.current` array
✅ Cleanup on unmount via `useEffect` return function
✅ Timeouts cleared on reset

### React 18 Strict Mode

The hooks handle double-mounting in development mode correctly:
- Refs persist across re-renders
- Cleanup functions prevent duplicate timers

---

## Customization Guide

### Change Timing

Edit `SIMULATION_TIMING` in `useSimulationState.ts`:

```typescript
export const SIMULATION_TIMING = {
  CONNECT_AT: 1500,  // Speed up connection (was 2000)
  // ... other timings
};
```

### Change Transcript Speed

```typescript
const transcript = useTypewriter({
  text: AI_TRANSCRIPT,
  isActive: state.isTyping,
  speed: 30,  // Faster (was 45)
});
```

### Add More CRM Fields

Modify `INITIAL_CRM_FIELDS` array and add timing in `startSimulation()`:

```typescript
scheduleTimeout(() => {
  setState(prev => ({
    ...prev,
    crmFields: prev.crmFields.map((field, idx) =>
      idx === 3 ? { ...field, isFilled: true, isFlashing: true } : field
    ),
  }));
}, 9000);  // New field at 9s
```

---

## Production Checklist

- [ ] Remove debug controls (skip, reset buttons in simulation stage)
- [ ] Remove console.log statements
- [ ] Test on mobile devices (adjust timing if needed)
- [ ] Verify cleanup on page navigation
- [ ] Add error boundaries around simulator
- [ ] Test with slow network (images load gracefully)
- [ ] Verify accessibility (keyboard navigation, screen readers)

---

## File Locations Reference

```
C:\Users\eaqqa\capture-client-website-seo\
└── capture-client-site\
    └── src\
        ├── hooks\
        │   ├── useSimulationState.ts   ← State machine
        │   ├── useTypewriter.ts         ← Typewriter effect
        │   └── index.ts                 ← Exports
        └── components\
            └── LeadRescueSimulator.example.tsx  ← Usage guide
```

---

## Summary

You now have:

1. ✅ **useSimulationState()** - Precision-timed state orchestration
2. ✅ **useTypewriter()** - Natural typing effect with punctuation pauses
3. ✅ **Timing configuration** - Easy-to-tune constants
4. ✅ **CRM field system** - Auto-population with flash animations
5. ✅ **Cleanup logic** - No memory leaks
6. ✅ **Usage example** - Complete working reference

**The simulator now feels natural, polished, and professional.**
