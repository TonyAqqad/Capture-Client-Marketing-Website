# useInteractiveDemo Hook

A production-ready React hook for managing interactive AI voice demo state with real-time conversation, CRM field auto-population, and lead scoring.

## Features

- **Real-time Conversation Management**: Handles bi-directional messaging between user and AI
- **Automatic CRM Field Population**: Extracts and populates contact data as conversation progresses
- **Lead Scoring**: Dynamically calculates lead quality based on conversation context
- **Typing Animation Integration**: Smooth typewriter effect for AI responses
- **API Integration with Retry Logic**: Robust API calls with automatic fallback
- **Business Type Switching**: Support for multiple business verticals
- **Error Handling**: Graceful degradation with user-friendly error messages
- **TypeScript First**: Fully typed with comprehensive interfaces

## Installation

The hook is already available in your project at:

```
capture-client-site/src/hooks/useInteractiveDemo.ts
```

## Basic Usage

```tsx
import { useInteractiveDemo } from "@/hooks/useInteractiveDemo";

export default function MyDemoComponent() {
  const { state, controls } = useInteractiveDemo("plumbing");

  const handleSendMessage = async () => {
    await controls.sendMessage("Hi, I have a leak in my basement");
  };

  return (
    <div>
      {/* Conversation display */}
      {state.conversationHistory.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.text}
        </div>
      ))}

      {/* CRM Fields */}
      {state.crmFields.map((field) => (
        <div key={field.id}>
          {field.label}: {field.isFilled ? field.value : "Not captured"}
        </div>
      ))}

      {/* Lead Score */}
      <div>Lead Score: {state.leadScore}/100</div>

      <button onClick={handleSendMessage} disabled={state.isLoading}>
        Send Test Message
      </button>
    </div>
  );
}
```

## API Reference

### Hook Signature

```typescript
function useInteractiveDemo(initialBusinessType?: BusinessType): {
  state: DemoState;
  controls: DemoControls;
};
```

### Parameters

| Parameter             | Type           | Default      | Description                            |
| --------------------- | -------------- | ------------ | -------------------------------------- |
| `initialBusinessType` | `BusinessType` | `'plumbing'` | The initial business type for the demo |

### Return Value

#### `state: DemoState`

```typescript
interface DemoState {
  businessType: BusinessType; // Current business type
  conversationHistory: Message[]; // Full conversation history
  isLoading: boolean; // True while API call in progress
  error: string | null; // Error message if any
  crmFields: CRMField[]; // CRM fields with current values
  leadScore: number; // Lead score (0-100)
  isTyping: boolean; // True while AI is "typing"
  currentAiResponse: string; // Partial AI response during typing
  isTypingComplete: boolean; // True when typing animation finishes
}
```

#### `controls: DemoControls`

```typescript
interface DemoControls {
  sendMessage: (message: string) => Promise<void>;
  setBusinessType: (type: BusinessType) => void;
  resetDemo: () => void;
  loadExampleConversation: (transcriptId: string) => void;
}
```

### Business Types

```typescript
type BusinessType = "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";
```

### Message Structure

```typescript
interface Message {
  id: string; // Unique message identifier
  role: "ai" | "user"; // Message sender
  text: string; // Message content
  timestamp: Date; // When message was created
}
```

### CRM Field Structure

```typescript
interface CRMField {
  id: string; // Field identifier
  label: string; // Display label
  value: string; // Current value
  isFilled: boolean; // Whether field has been populated
  isFlashing: boolean; // Animation state for visual feedback
  isUrgent?: boolean; // Special styling for urgent fields
}
```

## Advanced Usage

### Custom Business Type Flow

```tsx
function BusinessTypeSwitcher() {
  const { state, controls } = useInteractiveDemo("plumbing");

  const switchToHVAC = () => {
    controls.setBusinessType("hvac");
    // Resets conversation and starts with HVAC greeting
  };

  return <button onClick={switchToHVAC}>Switch to HVAC Business</button>;
}
```

### Monitoring CRM Field Updates

```tsx
function CRMFieldMonitor() {
  const { state } = useInteractiveDemo("plumbing");

  React.useEffect(() => {
    const filledFields = state.crmFields.filter((f) => f.isFilled);
    console.log(`${filledFields.length} fields captured`);
  }, [state.crmFields]);

  return (
    <div>
      {state.crmFields.map((field) => (
        <div key={field.id} className={field.isFlashing ? "animate-flash" : ""}>
          {field.label}: {field.value || "Waiting..."}
        </div>
      ))}
    </div>
  );
}
```

### Error Handling

```tsx
function DemoWithErrorHandling() {
  const { state, controls } = useInteractiveDemo("plumbing");

  const sendMessage = async (msg: string) => {
    try {
      await controls.sendMessage(msg);
    } catch (error) {
      // Error is already captured in state.error
      console.error("Message send failed:", error);
    }
  };

  return (
    <div>
      {state.error && (
        <div className="error-banner">
          {state.error}
          <button onClick={controls.resetDemo}>Try Again</button>
        </div>
      )}
      {/* Rest of component */}
    </div>
  );
}
```

### Typing Effect Display

```tsx
function TypingIndicator() {
  const { state } = useInteractiveDemo("plumbing");

  return (
    <>
      {state.isTyping && (
        <div className="ai-message typing">
          <span className="label">AI is typing...</span>
          <p>{state.currentAiResponse}</p>
        </div>
      )}
    </>
  );
}
```

### Lead Score Visualization

```tsx
function LeadScoreBar() {
  const { state } = useInteractiveDemo("plumbing");

  const scoreColor =
    state.leadScore >= 80
      ? "text-green-500"
      : state.leadScore >= 50
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="lead-score-container">
      <div className="flex justify-between mb-2">
        <span>Lead Quality</span>
        <span className={scoreColor}>{state.leadScore}/100</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${state.leadScore}%` }} />
      </div>
    </div>
  );
}
```

## API Integration

The hook integrates with the `/api/demo-response` endpoint:

### Request Format

```typescript
POST /api/demo-response
{
  "userMessage": "Hi, I have a water leak",
  "businessType": "plumbing",
  "conversationHistory": [
    { "role": "assistant", "content": "Hello! How can I help?" }
  ]
}
```

### Response Format

```typescript
{
  "response": "I can help with that. What's your name?",
  "intent": "inquiry",
  "leadScore": 7,
  "suggestedCrmFields": {
    "service": "leak repair",
    "urgency": "high"
  }
}
```

### Fallback Behavior

If the API is unavailable:

1. Hook automatically retries (up to 2 times)
2. Falls back to rule-based responses
3. Continues to extract basic CRM data (name, phone, urgency)
4. No errors exposed to end user

## Configuration

### Timing Constants

```typescript
const DEMO_TIMING = {
  TYPING_SPEED: 45, // Milliseconds per character
  FIELD_FLASH_DURATION: 600, // Flash animation duration
  FIELD_UPDATE_DELAY: 300, // Delay between field updates
  MESSAGE_DELAY: 500, // Delay before AI starts typing
};
```

### API Configuration

```typescript
const API_CONFIG = {
  ENDPOINT: "/api/demo-response",
  TIMEOUT_MS: 10000, // 10 second timeout
  MAX_RETRIES: 2, // Retry twice on failure
  RETRY_DELAY_MS: 1000, // 1 second between retries
};
```

## Best Practices

### 1. Always Handle Loading State

```tsx
<button onClick={() => controls.sendMessage(input)} disabled={state.isLoading || state.isTyping}>
  {state.isLoading ? "Sending..." : "Send"}
</button>
```

### 2. Display Typing Animation

```tsx
{
  state.isTyping && <div className="ai-typing">{state.currentAiResponse}</div>;
}
```

### 3. Highlight Field Updates

```tsx
<div className={field.isFlashing ? "flash-animation" : ""}>
  {field.label}: {field.value}
</div>
```

### 4. Reset on Business Type Change

The hook automatically resets when you call `setBusinessType()`, so no manual cleanup needed.

### 5. Use Reset for "Try Again" Scenarios

```tsx
<button onClick={controls.resetDemo}>Start Over</button>
```

## Performance Considerations

- **Typing Animation**: Runs on client-side only, no server impact
- **API Calls**: Debounced implicitly by user typing speed
- **Memory**: Conversation history is maintained in component state
- **Cleanup**: All timeouts automatically cleaned up on unmount

## Testing

### Unit Testing Example

```typescript
import { renderHook, act } from "@testing-library/react";
import { useInteractiveDemo } from "./useInteractiveDemo";

test("should initialize with greeting message", () => {
  const { result } = renderHook(() => useInteractiveDemo("plumbing"));

  expect(result.current.state.conversationHistory).toHaveLength(1);
  expect(result.current.state.conversationHistory[0].role).toBe("ai");
});

test("should update lead score after message", async () => {
  const { result } = renderHook(() => useInteractiveDemo("plumbing"));

  await act(async () => {
    await result.current.controls.sendMessage("Emergency leak!");
  });

  expect(result.current.state.leadScore).toBeGreaterThan(0);
});
```

## Troubleshooting

### Issue: AI Not Responding

**Cause**: API endpoint not available or ANTHROPIC_API_KEY not set

**Solution**: Check that `.env.local` has:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### Issue: CRM Fields Not Populating

**Cause**: API not extracting data correctly

**Solution**: Check that messages include clear contact info:

- "My name is John Smith"
- "Call me at 555-0123"
- Use explicit phrases for better extraction

### Issue: Typing Animation Stutters

**Cause**: Component re-rendering during typing

**Solution**: Memoize parent components or use React.memo():

```tsx
export default React.memo(MyDemoComponent);
```

## Example Projects

See complete implementation examples:

- **Basic Demo**: `src/hooks/useInteractiveDemo.example.tsx`
- **Features Page**: `src/app/features/page.tsx`

## Related Hooks

- `useTypewriter` - Standalone typing effect hook
- `useSimulationState` - Lead rescue simulation hook
- `useTypingEffect` - Simple typing animation

## Support

For issues or questions:

1. Check the example file: `useInteractiveDemo.example.tsx`
2. Review API endpoint: `src/app/api/demo-response/route.ts`
3. Verify environment variables are set correctly

## License

Part of the Capture Client marketing website project.
