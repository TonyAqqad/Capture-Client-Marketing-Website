# Simulator Timing Reference Card

## Quick Timing Values

| Time | Event | Visual Effect | Duration |
|------|-------|---------------|----------|
| **0s** | Stage 2 begins | Phone RINGING (orange pulse) | 2s |
| **2s** | Phone connects | Switch to CYAN glow + waveform | — |
| **2.5s** | Transcript starts | Typewriter effect begins | ~5.5s |
| **4s** | CRM Field 1 | "Name" populates + flash | 600ms flash |
| **6s** | CRM Field 2 | "Goal" populates + flash | 600ms flash |
| **7.5s** | CRM Field 3 | "Status" (URGENT) + flash | 600ms flash |
| **8s** | Stage 3 transition | Show payoff metrics | — |

## Color Codes

| State | Color | Hex | Usage |
|-------|-------|-----|-------|
| Ringing | Orange | `#ff6b35` | Phone pulse animation |
| Connected | Cyan | `#00d9ff` | Phone glow, waveform, transcript |
| CRM Fields | Cyan | `#00d9ff` | Filled field background |
| Urgent Field | Orange | `#ff6b35` | Status field (hot lead) |
| Flash | Cyan | `#00d9ff` | 600ms flash on populate |

## Animation Durations

| Animation | Duration | Easing |
|-----------|----------|--------|
| Phone pulse | 1s (loop) | ease-in-out |
| Waveform bars | 1.2s (loop) | ease-in-out |
| Field fade-in | 400ms | ease |
| Field flash | 600ms | ease |
| Progress bar | 100ms | linear |
| Cursor blink | 1s (loop) | step |

## Typewriter Speed

| Preset | Speed (ms/char) | Characters/sec | Use Case |
|--------|----------------|----------------|----------|
| FAST | 30ms | ~33 chars/sec | Quick reveals |
| DEFAULT | 45ms | ~22 chars/sec | Natural speech |
| SLOW | 65ms | ~15 chars/sec | Dramatic effect |

**Punctuation pauses:**
- Period/Question/Exclamation: +300ms
- Comma: +150ms
- Colon/Semicolon: +200ms

## Tuning Guide

**To make simulation feel faster:**
1. Reduce `CONNECT_AT` (2000 → 1500)
2. Reduce `TRANSCRIPT_START_AT` (2500 → 2000)
3. Reduce gaps between CRM fields (currently 2s apart)
4. Use `FAST_SPEED` for typewriter (30ms)

**To make simulation feel more dramatic:**
1. Increase `RING_DURATION` (2000 → 3000)
2. Increase gaps between CRM fields (4s, 7s, 10s)
3. Use `SLOW_SPEED` for typewriter (65ms)
4. Increase `FLASH_DURATION` (600 → 800)

**Current pacing:** Balanced, professional, natural speech rhythm.

## State Machine Flow

```
setup ──[startSimulation()]──► simulation ──[8s timer]──► payoff
  ▲                                                           │
  └───────────────────[resetSimulation()]───────────────────┘
```

## File Import

```typescript
import {
  useSimulationState,
  useTypewriter,
  SIMULATION_TIMING,
  TYPEWRITER_CONFIG,
} from '@/hooks';
```

---

**Last Updated:** 2025-11-28
**Total Sequence Duration:** 8 seconds
**Total Pages:** 3 stages (setup → simulation → payoff)
