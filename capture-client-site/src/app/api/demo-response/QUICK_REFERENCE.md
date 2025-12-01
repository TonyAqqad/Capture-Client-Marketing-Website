# AI Voice Demo API - Quick Reference Card

## Endpoint
```
POST /api/demo-response
```

## Request Body
```typescript
{
  userMessage: string;          // Required
  businessType: BusinessType;   // Required
  conversationHistory?: Array<{ // Optional
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

## Business Types
- `plumbing` - Emergency repairs, installations
- `dental` - Cleanings, cosmetic dentistry
- `auto` - Oil changes, brake service
- `hvac` - AC repair, heating service
- `law` - Legal consultations
- `general` - Professional services

## Response
```typescript
{
  response: string;           // AI-generated response (under 50 words)
  intent: Intent;            // Detected conversation intent
  leadScore: number;         // Lead quality (1-10)
  suggestedCrmFields: {      // Extracted data
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
    urgency?: 'low' | 'medium' | 'high';
    preferredTime?: string;
    location?: string;
  };
}
```

## Intents
- `inquiry` - Service questions
- `schedule` - Ready to book
- `pricing` - Cost questions
- `complaint` - Issues/problems
- `general` - Other conversations

## Lead Scores
- **9-10**: Hot Lead (ready to convert)
- **7-8**: Warm Lead (engaged)
- **5-6**: Qualified Lead (interested)
- **1-4**: Cold Lead (early stage)

## Rate Limits
- 10 requests per minute per IP
- HTTP 429 when exceeded

## Setup
```bash
# 1. Install dependency
npm install @anthropic-ai/sdk

# 2. Add API key to .env.local
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# 3. Start server
npm run dev
```

## Quick Test
```bash
curl -X POST http://localhost:3000/api/demo-response \
  -H "Content-Type: application/json" \
  -d '{
    "userMessage": "I need help with a plumbing emergency",
    "businessType": "plumbing"
  }'
```

## Usage in React
```typescript
import type { DemoRequest, DemoResponse } from '@/types/demo';

async function chat(message: string, businessType: BusinessType) {
  const res = await fetch('/api/demo-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userMessage: message,
      businessType,
      conversationHistory: []
    } as DemoRequest)
  });

  const data: DemoResponse = await res.json();
  return data;
}
```

## Error Codes
- **400**: Invalid request (missing required fields)
- **429**: Rate limit exceeded
- **200**: Success (even if Claude API fails - fallback used)

## Cost
- ~$0.002 per request (0.2 cents)
- ~$2 per 1000 requests

## Files
- API: `src/app/api/demo-response/route.ts`
- Types: `src/types/demo.ts`
- Docs: `src/app/api/demo-response/README.md`
- Tests: `src/app/api/demo-response/test.ts`

## Key Features
- Claude 3.5 Sonnet integration
- Business-specific contexts
- Automatic lead qualification
- CRM data extraction
- Intent detection
- Rate limiting
- Graceful fallbacks
- Production-ready error handling

## Example Conversations

### Emergency (High Score)
```
User: "I have a water leak emergency!"
AI: "Oh no, a leak needs immediate attention. I can get someone out today.
     What's your name and number?"
Intent: schedule
Score: 9
CRM: { service: "leak repair", urgency: "high" }
```

### Pricing (Medium Score)
```
User: "How much does a teeth cleaning cost?"
AI: "New patient exams are $99, which includes X-rays and cleaning.
     Would you like to schedule?"
Intent: pricing
Score: 6
CRM: { service: "teeth cleaning" }
```

### Browsing (Low Score)
```
User: "I'm just looking around"
AI: "No problem! I'm here if you have any questions. What brings you in today?"
Intent: general
Score: 3
CRM: { urgency: "low" }
```

## Troubleshooting

**No responses?**
- Check API key in `.env.local`
- Restart Next.js server
- Check console for errors

**Rate limited?**
- Wait 60 seconds
- Or clear IP from rate limit store

**Slow responses?**
- Normal: 1-2 seconds (Claude API)
- Check network connectivity

## Production Tips
1. Use Redis for rate limiting (not in-memory)
2. Monitor API usage and costs
3. Add request logging
4. Configure CORS properly
5. Add timeout handling (optional)

## Get Help
- Full docs: `README.md`
- API flow: `API_FLOW.md`
- Test suite: `test.ts`
