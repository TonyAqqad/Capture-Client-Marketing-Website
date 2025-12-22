# AI Voice Demo API

Production-ready API endpoint for generating realistic AI receptionist responses using Claude API.

## Endpoint

```
POST /api/demo-response
```

## Features

- Real-time AI-generated responses via Claude 3.5 Sonnet
- Business-specific conversation contexts (plumbing, dental, auto, HVAC, law, general)
- Automatic lead qualification and scoring (1-10)
- CRM data extraction (name, phone, email, service, urgency)
- Intent detection (inquiry, schedule, pricing, complaint, general)
- Rate limiting (10 requests/minute per IP)
- Graceful fallback responses when API key not configured
- Under 50-word responses for natural phone conversations

## Request Format

```typescript
interface DemoRequest {
  userMessage: string;
  businessType: "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";
  conversationHistory?: ConversationMessage[];
}

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}
```

### Example Request

```json
{
  "userMessage": "Hi, I have a water leak in my basement",
  "businessType": "plumbing",
  "conversationHistory": []
}
```

## Response Format

```typescript
interface DemoResponse {
  response: string; // AI-generated response text
  intent: Intent; // Detected intent
  leadScore: number; // 1-10 lead quality score
  suggestedCrmFields: ExtractedCRMData; // Extracted contact/service data
}

type Intent = "inquiry" | "schedule" | "pricing" | "complaint" | "general";

interface ExtractedCRMData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  urgency?: "low" | "medium" | "high";
  preferredTime?: string;
  location?: string;
}
```

### Example Response

```json
{
  "response": "Oh no, a leak can cause serious damage. I can get a plumber out today. What's your name and phone number?",
  "intent": "schedule",
  "leadScore": 9,
  "suggestedCrmFields": {
    "service": "leak repair",
    "urgency": "high",
    "location": "basement"
  }
}
```

## Business Types

### Plumbing

- Context: Emergency leaks, drain cleaning, water heater repairs, installations
- Pricing: $95 service call, $150/hr labor
- Emergency rate: 1.5x

### Dental

- Context: Cleanings, fillings, cosmetic dentistry, emergencies
- Pricing: $99 new patient exam (includes X-rays, cleaning)
- Hours: M-F 8am-6pm

### Auto Repair

- Context: Oil changes, brake repairs, diagnostics, inspections
- Pricing: $39.99 oil change, brake service from $199
- Features: Free multi-point inspection

### HVAC

- Context: AC repair, heating service, installations, maintenance plans
- Pricing: $79 service call, maintenance plans from $199/year
- Availability: 24/7 emergency service

### Law Firm

- Context: Personal injury, family law, estate planning consultations
- Pricing: Free initial consultation
- Model: No fees unless we win

### General

- Context: Professional service business
- Focus: Friendly assistance and lead capture

## Lead Scoring Algorithm

The API calculates a lead score from 1-10 based on:

- **+2 points**: Urgency indicators (emergency, urgent, asap, now, today)
- **+3 points**: Contact information provided (phone or email)
- **+1 point**: Multiple messages (shows engagement)
- **+1 point**: Specific service mentioned
- **+2 points**: Ready to schedule (schedule, book, appointment)
- **-2 points**: Low intent signals (just browsing, not sure)

### Lead Score Interpretation

- **9-10**: Hot lead (high intent, ready to convert)
- **7-8**: Warm lead (engaged, needs nurturing)
- **5-6**: Qualified lead (interested, needs qualification)
- **1-4**: Cold lead (early stage, low intent)

## Intent Detection

The API automatically detects conversation intent:

- **Schedule**: Keywords like "appointment", "book", "available", "tomorrow"
- **Pricing**: Keywords like "cost", "price", "how much", "rate"
- **Complaint**: Keywords like "problem", "issue", "unhappy", "refund"
- **Inquiry**: Keywords like "do you", "can you", "offer", "service"
- **General**: Default for other conversations

## Rate Limiting

- **Limit**: 10 requests per minute per IP address
- **Window**: 60 seconds (rolling window)
- **Response**: HTTP 429 when limit exceeded
- **Production**: Consider using Redis for distributed rate limiting

## Error Handling

The API uses graceful degradation:

1. **No API key**: Returns predefined fallback responses
2. **Claude API error**: Returns fallback responses (never exposes errors to client)
3. **Rate limit**: Returns HTTP 429 with clear message
4. **Invalid input**: Returns HTTP 400 with validation error

## Setup

### 1. Install Dependencies

```bash
npm install @anthropic-ai/sdk
```

### 2. Configure Environment Variables

Add to `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Get your API key from: https://console.anthropic.com/

### 3. Test the API

```bash
curl -X POST http://localhost:3000/api/demo-response \
  -H "Content-Type: application/json" \
  -d '{
    "userMessage": "I need help with a plumbing emergency",
    "businessType": "plumbing"
  }'
```

## Usage Example (Client)

```typescript
async function sendMessage(
  message: string,
  businessType: BusinessType,
  history: ConversationMessage[] = []
) {
  const response = await fetch("/api/demo-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userMessage: message,
      businessType,
      conversationHistory: history,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response");
  }

  const data: DemoResponse = await response.json();
  return data;
}
```

## Performance Optimization

- **Response time**: ~1-2 seconds (Claude API latency)
- **Max tokens**: 150 (optimized for short responses)
- **Temperature**: 0.7 (natural variation)
- **Model**: claude-3-5-sonnet-20241022 (latest)

## Security Considerations

1. **API Key Protection**: Never expose `ANTHROPIC_API_KEY` to client
2. **Rate Limiting**: Prevents abuse (use Redis in production)
3. **Input Validation**: Validates all incoming data
4. **Error Masking**: Never exposes internal errors to client
5. **CORS**: Configure appropriately for production

## Production Recommendations

1. **Use Redis for rate limiting** (not in-memory)
2. **Add authentication** (if not public demo)
3. **Monitor API usage** (track costs)
4. **Add request logging** (for debugging/analytics)
5. **Implement request timeout** (prevent hanging)
6. **Add response caching** (for common queries)
7. **Configure CORS properly** (restrict origins)

## Cost Estimates

Claude API pricing (as of 2024):

- **Input**: $3 per million tokens
- **Output**: $15 per million tokens
- **Average request**: ~300 input + 100 output tokens
- **Cost per request**: ~$0.002 (0.2 cents)
- **1000 requests**: ~$2.00

## Testing

Example test scenarios:

```typescript
// Test 1: Emergency scheduling
{
  userMessage: "I have a water leak emergency!",
  businessType: "plumbing",
  // Expected: High lead score, schedule intent, urgency=high
}

// Test 2: Pricing inquiry
{
  userMessage: "How much does a teeth cleaning cost?",
  businessType: "dental",
  // Expected: pricing intent, medium lead score
}

// Test 3: Multi-turn conversation
{
  userMessage: "I'd like to schedule an appointment",
  businessType: "auto",
  conversationHistory: [
    { role: "user", content: "Do you do oil changes?" },
    { role: "assistant", content: "Yes, we offer oil changes for $39.99..." }
  ],
  // Expected: High lead score, schedule intent
}
```

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"

- Add API key to `.env.local`
- Restart Next.js dev server
- Fallback responses will be used until configured

### Rate limit exceeded

- Wait 60 seconds
- Consider implementing authenticated rate limits
- Use Redis for production-grade rate limiting

### Slow responses

- Claude API typically responds in 1-2 seconds
- Check network connectivity
- Consider implementing timeout handling

## Related Files

- `/src/types/demo.ts` - TypeScript type definitions
- `/src/components/features/AIVoiceDemo.tsx` - Demo component (to be created)
- `.env.example` - Environment variable template

## License

Part of the Capture Client website codebase.
