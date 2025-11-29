# Quick Start Guide - Lead Rescue Simulator

**Get the simulator running in 5 minutes.**

---

## Step 1: Copy the Hooks (Already Done ✅)

The hooks are already created in:
```
src/hooks/
├── useSimulationState.ts
├── useTypewriter.ts
└── index.ts
```

---

## Step 2: Create Your Component

Create `src/components/LeadRescueSimulator.tsx`:

```typescript
import React from 'react';
import { useSimulationState, useTypewriter } from '@/hooks';

const AI_TRANSCRIPT = `Hi, this is Emma from Capture AI. I see you're interested in growing your business. What's your name?

Sarah Mitchell.

Great to meet you, Sarah! What's your main business goal right now?

I want to scale from 3 to 10 locations by 2026.

That's ambitious! I'd love to help. Can I have someone follow up with you today?

Yes, please!`;

export default function LeadRescueSimulator() {
  const { state, controls } = useSimulationState();

  const transcript = useTypewriter({
    text: AI_TRANSCRIPT,
    isActive: state.isTyping,
    speed: 45,
  });

  // Stage 1: Setup
  if (state.stage === 'setup') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Your Competitor Just Missed This Call</h2>
        <div className="bg-red-100 p-6 rounded-lg mb-6">
          <div className="text-6xl mb-2">📞</div>
          <p className="text-lg">9:47 AM - Sarah Mitchell (Inbound Lead)</p>
        </div>
        <button
          onClick={controls.startSimulation}
          className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold"
        >
          Watch AI Capture This Lead
        </button>
      </div>
    );
  }

  // Stage 2: Simulation
  if (state.stage === 'simulation') {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">AI Voice Agent in Action</h2>
        <div className="grid md:grid-cols-2 gap-8">

          {/* Phone Section */}
          <div>
            <div className={`p-8 rounded-2xl border-4 ${
              state.callState === 'ringing'
                ? 'border-orange-500 shadow-orange-500/50'
                : 'border-cyan-500 shadow-cyan-500/50'
            } shadow-lg text-center`}>
              <div className="text-6xl mb-4">📞</div>
              <p className="text-xl font-bold">
                {state.callState === 'ringing' ? 'RINGING...' : 'CONNECTED'}
              </p>
              {state.callState === 'connected' && (
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-10 bg-cyan-500 rounded animate-wave"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Transcript */}
            <div className="mt-4 bg-gray-900 p-4 rounded-lg">
              <h3 className="text-cyan-500 font-bold mb-2">Live Transcript</h3>
              <p className="text-cyan-300 whitespace-pre-wrap font-mono text-sm">
                {transcript.displayText}
                {state.isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>

          {/* CRM Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CRM Auto-Population</h3>
            <div className="space-y-4">
              {state.crmFields.map((field) => (
                <div
                  key={field.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    field.isFilled
                      ? field.isUrgent
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 bg-gray-800'
                  } ${field.isFlashing ? 'animate-flash' : ''}`}
                >
                  <div className="text-sm text-gray-400">{field.label}</div>
                  <div className="text-lg font-bold mt-1">
                    {field.isFilled ? field.value : '—'}
                  </div>
                </div>
              ))}
            </div>
            {state.crmFields.some(f => f.isFilled) && (
              <p className="mt-4 text-cyan-500">⚡ Syncing live...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Stage 3: Payoff
  if (state.stage === 'payoff') {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-3xl font-bold mb-6">Perfect Lead Qualification in 8 Seconds</h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-cyan-500">$12,000</div>
            <div className="text-gray-400">Potential LTV</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-cyan-500">8 sec</div>
            <div className="text-gray-400">Call Duration</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-cyan-500">100%</div>
            <div className="text-gray-400">Capture Rate</div>
          </div>
        </div>

        <p className="text-xl mb-6">
          While your competitors miss calls, your AI agent captures every lead. 24/7.
        </p>

        <div className="space-x-4">
          <button className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold">
            Get Your AI Voice Agent
          </button>
          <button
            onClick={controls.resetSimulation}
            className="bg-gray-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            Watch Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
```

---

## Step 3: Add CSS Animations

Add to your `globals.css` or Tailwind config:

```css
@keyframes wave {
  0%, 100% { height: 1rem; }
  50% { height: 2.5rem; }
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.animate-wave {
  animation: wave 1.2s ease-in-out infinite;
}

.animate-flash {
  animation: flash 0.6s ease;
}
```

---

## Step 4: Use in Your Page

```typescript
import LeadRescueSimulator from '@/components/LeadRescueSimulator';

export default function HomePage() {
  return (
    <div>
      <LeadRescueSimulator />
    </div>
  );
}
```

---

## Step 5: Run & Test

```bash
npm run dev
```

Visit http://localhost:3000 and click "Watch AI Capture This Lead"

---

## Done! 🎉

You now have a working simulator with:
- ✅ 8-second timing sequence
- ✅ Phone state transitions (ringing → connected)
- ✅ Typewriter effect
- ✅ CRM field auto-population
- ✅ 3 stages (setup → simulation → payoff)

---

## Customization

### Change Timing

Edit `src/hooks/useSimulationState.ts`:

```typescript
export const SIMULATION_TIMING = {
  CONNECT_AT: 1500,  // Connect faster (was 2000)
  // ... other timings
};
```

### Change Colors

Update your Tailwind config or CSS:

```typescript
// Orange → Blue
className="border-orange-500" → className="border-blue-500"
```

### Change Transcript

Update the `AI_TRANSCRIPT` constant in your component.

### Change CRM Fields

Edit `INITIAL_CRM_FIELDS` in `src/hooks/useSimulationState.ts`.

---

## Troubleshooting

**Typewriter not working?**
- Check `state.isTyping` is true during stage 2

**CRM fields not populating?**
- Check timing in browser console
- Use debug controls: `controls.skipToPayoff()`

**Animations not smooth?**
- Check CSS animations are loaded
- Test in Chrome (most reliable)

---

## Next Steps

1. **Styling:** Match your brand colors
2. **Content:** Update transcript to your service
3. **Images:** Add real photos/avatars
4. **Analytics:** Track button clicks
5. **Deploy:** Push to production

---

## Reference Docs

- Full docs: `SIMULATOR_STATE_MANAGEMENT.md`
- Timing reference: `TIMING_REFERENCE.md`
- Visual guide: `SIMULATOR_VISUAL_GUIDE.md`
- Complete example: `src/components/LeadRescueSimulator.example.tsx`

---

**Questions? Check the docs or review the example component.**

**Happy building! 🚀**
