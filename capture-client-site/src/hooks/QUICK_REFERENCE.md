# useInteractiveDemo - Quick Reference

## Import

```typescript
import { useInteractiveDemo } from '@/hooks/useInteractiveDemo';
```

## Basic Setup

```tsx
const { state, controls } = useInteractiveDemo('plumbing');
```

## State Properties

| Property | Type | Description |
|----------|------|-------------|
| `state.businessType` | `BusinessType` | Current business type |
| `state.conversationHistory` | `Message[]` | All messages |
| `state.isLoading` | `boolean` | API call in progress |
| `state.error` | `string \| null` | Error message |
| `state.crmFields` | `CRMField[]` | CRM field states |
| `state.leadScore` | `number` | Lead score (0-100) |
| `state.isTyping` | `boolean` | AI typing animation active |
| `state.currentAiResponse` | `string` | Partial AI response |

## Control Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `controls.sendMessage()` | `message: string` | Send user message |
| `controls.setBusinessType()` | `type: BusinessType` | Change business type |
| `controls.resetDemo()` | - | Reset to initial state |
| `controls.loadExampleConversation()` | `transcriptId: string` | Load example |

## Business Types

- `'plumbing'` - Elite Plumbing Services
- `'dental'` - Bright Smile Dental
- `'auto'` - AutoCare Pro
- `'hvac'` - Climate Control HVAC
- `'law'` - Johnson & Associates
- `'general'` - Generic business

## Common Patterns

### Display Conversation

```tsx
{state.conversationHistory.map((msg) => (
  <div key={msg.id} className={msg.role === 'ai' ? 'ai' : 'user'}>
    {msg.text}
  </div>
))}
```

### Show Typing Indicator

```tsx
{state.isTyping && (
  <div className="typing">
    {state.currentAiResponse}
  </div>
)}
```

### Display CRM Fields

```tsx
{state.crmFields.map((field) => (
  <div key={field.id} className={field.isFlashing ? 'flash' : ''}>
    <label>{field.label}</label>
    <span>{field.isFilled ? field.value : 'Waiting...'}</span>
  </div>
))}
```

### Show Lead Score

```tsx
<div className="score-bar">
  <div style={{ width: `${state.leadScore}%` }} />
</div>
<span>{state.leadScore}/100</span>
```

### Send Message Button

```tsx
<button
  onClick={() => controls.sendMessage(input)}
  disabled={state.isLoading || state.isTyping}
>
  {state.isLoading ? 'Sending...' : 'Send'}
</button>
```

### Error Display

```tsx
{state.error && (
  <div className="error">
    {state.error}
    <button onClick={controls.resetDemo}>Reset</button>
  </div>
)}
```

### Business Type Selector

```tsx
<select
  value={state.businessType}
  onChange={(e) => controls.setBusinessType(e.target.value as BusinessType)}
>
  <option value="plumbing">Plumbing</option>
  <option value="dental">Dental</option>
  <option value="auto">Auto</option>
  <option value="hvac">HVAC</option>
  <option value="law">Law</option>
  <option value="general">General</option>
</select>
```

## Configuration

Default timing values (in `useInteractiveDemo.ts`):

```typescript
TYPING_SPEED: 45,              // ms per character
FIELD_FLASH_DURATION: 600,     // ms
FIELD_UPDATE_DELAY: 300,       // ms between fields
MESSAGE_DELAY: 500,            // ms before AI types

API_TIMEOUT_MS: 10000,         // 10 seconds
MAX_RETRIES: 2,                // Retry twice
RETRY_DELAY_MS: 1000,          // 1 second between retries
```

## Complete Example

```tsx
'use client';

import { useInteractiveDemo } from '@/hooks/useInteractiveDemo';
import { useState } from 'react';

export default function QuickDemo() {
  const { state, controls } = useInteractiveDemo('plumbing');
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    await controls.sendMessage(input);
    setInput('');
  };

  return (
    <div className="demo-container">
      {/* Messages */}
      <div className="messages">
        {state.conversationHistory.map((msg) => (
          <div key={msg.id} className={msg.role}>
            {msg.text}
          </div>
        ))}
        {state.isTyping && (
          <div className="ai typing">{state.currentAiResponse}</div>
        )}
      </div>

      {/* CRM */}
      <div className="crm">
        <div>Score: {state.leadScore}/100</div>
        {state.crmFields.map((field) => (
          <div key={field.id}>
            {field.label}: {field.value || 'N/A'}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={state.isLoading}
        />
        <button
          onClick={handleSend}
          disabled={state.isLoading || !input.trim()}
        >
          Send
        </button>
        <button onClick={controls.resetDemo}>Reset</button>
      </div>

      {/* Error */}
      {state.error && (
        <div className="error">{state.error}</div>
      )}
    </div>
  );
}
```

## Testing Checklist

- [ ] Messages send successfully
- [ ] Typing animation displays
- [ ] CRM fields populate
- [ ] Lead score updates
- [ ] Business type switching works
- [ ] Reset clears all state
- [ ] Error handling works
- [ ] Loading states display
- [ ] Flash animations trigger
- [ ] API fallback works

## Files

- Hook: `src/hooks/useInteractiveDemo.ts`
- Example: `src/hooks/useInteractiveDemo.example.tsx`
- Docs: `src/hooks/useInteractiveDemo.md`
- API: `src/app/api/demo-response/route.ts`

## Support

See full documentation: `useInteractiveDemo.md`

See working example: `useInteractiveDemo.example.tsx`
