# Interactive AI Demo Component

## Overview

The **InteractiveAIDemo** component is a production-ready, conversion-optimized UI feature that allows website visitors to experience AI voice agent technology in real-time through a chat interface. It demonstrates lead capture, qualification, and CRM data extraction capabilities.

## File Location

```
capture-client-site/src/components/features/InteractiveAIDemo.tsx
```

## Features

### Core Functionality
- **Live AI Conversations**: Real-time chat powered by Claude API
- **Business Type Selector**: 6 pre-configured business types (Plumbing, Dental, Auto, HVAC, Law, General)
- **Typewriter Effect**: Natural typing animation for AI responses
- **Real-time CRM Population**: Animated field updates as data is extracted
- **Lead Scoring**: Dynamic 1-10 score based on conversation quality
- **Mobile Responsive**: Optimized for all screen sizes

### UI/UX Excellence
- **Premium Glassmorphism Design**: Matches existing design system
- **Framer Motion Animations**: Smooth transitions and micro-interactions
- **Accessibility**: Full ARIA labels and keyboard navigation
- **Error Handling**: Graceful fallbacks with example questions
- **Loading States**: Clear visual feedback during API calls
- **Trust Signals**: "Live demo" badge, real-time indicators

## Architecture

### Component Structure

```
InteractiveAIDemo (Main Container)
├── Business Type Selector
├── Chat Interface
│   ├── Chat Header (with reset button)
│   ├── Messages Area (scrollable)
│   │   └── ChatMessage components
│   ├── Loading Indicator
│   └── Input Area (with example questions)
└── CRM Panel
    ├── CRM Header
    ├── CRM Fields (Name, Phone, Service, Intent)
    └── Lead Score Display
```

### State Management

```typescript
// Core State
- businessType: BusinessType          // Selected business type
- messages: Message[]                  // Conversation history
- userInput: string                    // Current input value
- isLoading: boolean                   // API call in progress
- isError: boolean                     // Error state
- crmData: CRMData                     // Extracted lead data
- activeAIMessage: string              // Current AI message for typewriter
- isTyping: boolean                    // Typewriter animation active
```

### API Integration

The component integrates with `/api/demo-response` which uses Claude API for intelligent responses.

**Request Format:**
```typescript
{
  businessType: "plumbing" | "dental" | "auto" | "hvac" | "law" | "general",
  userMessage: string,
  conversationHistory: Array<{
    role: "user" | "assistant",
    content: string
  }>
}
```

**Response Format:**
```typescript
{
  response: string,              // AI response text
  intent: Intent,                // Detected intent (inquiry, schedule, pricing, etc.)
  leadScore: number,             // 1-10 score
  suggestedCrmFields: {
    name?: string,
    phone?: string,
    email?: string,
    service?: string,
    urgency?: "low" | "medium" | "high",
    preferredTime?: string
  }
}
```

## Usage

### Basic Implementation

```tsx
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function DemoPage() {
  return (
    <div>
      <InteractiveAIDemo />
    </div>
  );
}
```

### Environment Setup

Required environment variable:
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

If the API key is not configured, the component will use fallback responses.

## Design System Integration

### Colors Used
- `cyan-400`, `cyan-500` - Primary accent
- `primary` (blue) - Secondary accent
- `slate-*` - Text and backgrounds
- `white/5`, `white/10` - Glass effects

### Animations
- Uses `presets.fadeInUp` for section entrance
- Custom typewriter effect via `useTypewriter` hook
- CRM field animations from `simulator-animations.ts`
- Smooth transitions with `EASING.smooth`

### Typography
- Headings: `font-heading` (Poppins)
- Body: `font-body` (Inter)
- Mono: Used for time stamps and technical data

## Accessibility

### ARIA Labels
```tsx
aria-label="Select {type} business type"
aria-label="Message input"
aria-label="Send message"
aria-label="Reset conversation"
```

### Keyboard Navigation
- Tab through business type buttons
- Enter to submit message
- Focus management on reset

### Screen Reader Support
- Semantic HTML structure
- Clear button labels
- Status updates announced

## Performance Optimizations

1. **Debounced API Calls**: Prevents rapid-fire requests
2. **Lazy State Updates**: CRM data updates delayed for animation
3. **Optimized Re-renders**: useRef for non-rendering state
4. **Rate Limiting**: Built into API (10 requests/minute)
5. **Fallback Responses**: No API dependency for basic functionality

## Mobile Optimization

### Responsive Breakpoints
```css
- Base: Full width, stacked layout
- lg (1024px+): 2-column grid (chat 2/3, CRM 1/3)
```

### Touch Interactions
- Large tap targets (44px minimum)
- Smooth scroll with momentum
- Optimized input for mobile keyboards

## Customization

### Adding Business Types

1. Update `BUSINESS_TYPES` constant:
```typescript
const BUSINESS_TYPES: Record<BusinessType, BusinessGreeting> = {
  // ... existing types
  newtype: {
    greeting: "Custom greeting here",
    questions: [
      "Example question 1",
      "Example question 2",
      "Example question 3",
    ],
  },
};
```

2. Update API business contexts in `route.ts`

### Styling Modifications

The component uses Tailwind classes aligned with the design system. Key customization points:

```tsx
// Main container background
className="relative py-16 sm:py-20 md:py-24 lg:py-32"

// Glass card styling
className="backdrop-blur-xl bg-white/[0.03] border border-white/10"

// Gradient buttons
className="bg-gradient-to-r from-cyan-500 to-primary"
```

## Testing Recommendations

### Unit Tests
- Message state management
- API response handling
- CRM data extraction
- Error boundary behavior

### Integration Tests
- Full conversation flow
- Business type switching
- Reset functionality
- Rate limiting

### E2E Tests (Playwright)
```typescript
test("Interactive AI Demo completes full conversation", async ({ page }) => {
  await page.goto("/features");

  // Select business type
  await page.click('button:has-text("Plumbing")');

  // Type message
  await page.fill('input[placeholder*="caller"]', "I have a leak");
  await page.click('button:has-text("Send")');

  // Wait for AI response
  await page.waitForSelector('.text-cyan-400:has-text("AI Voice Agent")');

  // Verify CRM field populated
  await expect(page.locator('text=Emergency Plumbing')).toBeVisible();
});
```

## Common Issues & Solutions

### Issue: API responses are slow
**Solution**: Component includes loading states and typewriter effect to mask latency. Consider implementing streaming responses for faster perceived performance.

### Issue: CRM fields not populating
**Solution**: Check API response structure matches expected format. Verify `suggestedCrmFields` object is present in response.

### Issue: Typewriter effect stuttering
**Solution**: Ensure `useTypewriter` hook dependencies are stable. Consider increasing `speed` parameter for faster typing.

### Issue: Mobile scroll issues
**Solution**: Messages container has fixed height with overflow-y-auto. Adjust height in media queries if needed.

## Performance Metrics

### Target Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- API Response Time: < 2s (95th percentile)
- Lead Capture Rate: > 15% (benchmark)

### Monitoring
```typescript
// Track demo engagement
analytics.track("demo_started", { businessType });
analytics.track("demo_message_sent", { messageCount });
analytics.track("demo_lead_captured", { leadScore, hasContactInfo });
```

## Future Enhancements

### Planned Features
1. **Voice Input**: Allow users to speak instead of type
2. **Multi-language**: Support Spanish, French, etc.
3. **Conversation Templates**: Pre-filled scenarios for quick demos
4. **Export Transcript**: Download conversation as PDF
5. **Screen Sharing**: Show AI making API calls in real-time
6. **A/B Testing**: Test different AI personalities

### Integration Opportunities
- CRM webhooks (Salesforce, HubSpot)
- Analytics dashboards (Mixpanel, Amplitude)
- Video demo alongside chat
- Appointment scheduling API

## Support

### Dependencies
```json
{
  "framer-motion": "^10.x",
  "lucide-react": "^0.x",
  "@anthropic-ai/sdk": "^0.x"
}
```

### Browser Support
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 90+

## Credits

Built following the **Component Architect** standards:
- Strict TypeScript (no `any`)
- Reuses existing design tokens
- Server-first approach (client-only when needed)
- Accessibility-first design
- Production-ready error handling

---

**Last Updated**: 2025-12-01
**Version**: 1.0.0
**Maintained By**: Component Architect Team
