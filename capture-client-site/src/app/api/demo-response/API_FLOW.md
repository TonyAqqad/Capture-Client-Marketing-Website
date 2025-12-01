# AI Voice Demo API Flow

## Request Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  User types: "I have a water leak emergency!"                  │
│  Business type selected: "plumbing"                             │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ POST /api/demo-response
                                │ {
                                │   userMessage: "I have a water leak...",
                                │   businessType: "plumbing",
                                │   conversationHistory: []
                                │ }
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API ROUTE (Server)                          │
│                                                                 │
│  Step 1: Validate Input                                        │
│    ✓ userMessage present                                       │
│    ✓ businessType valid                                        │
│                                                                 │
│  Step 2: Check Rate Limit                                      │
│    ✓ IP: 123.456.789.0                                         │
│    ✓ Requests: 3/10 this minute                                │
│                                                                 │
│  Step 3: Get Anthropic Client                                  │
│    ✓ API key configured                                        │
│    ✓ Client initialized                                        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ Build system prompt for "plumbing"
                                │ Build conversation messages
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLAUDE API (Anthropic)                       │
│                                                                 │
│  Model: claude-3-5-sonnet-20241022                             │
│  Max tokens: 150                                                │
│  Temperature: 0.7                                               │
│                                                                 │
│  System: "You are an AI receptionist for Elite Plumbing..."   │
│  User: "I have a water leak emergency!"                        │
│                                                                 │
│  ⚡ Processing... (~1-2 seconds)                                │
│                                                                 │
│  Response: "Oh no, a leak can cause serious damage. I can..."  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ AI response text
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                API ROUTE - POST PROCESSING                      │
│                                                                 │
│  Step 4: Extract CRM Data                                      │
│    • Name: null                                                 │
│    • Phone: null                                                │
│    • Service: "leak repair"                                     │
│    • Urgency: "high" (detected "emergency")                     │
│                                                                 │
│  Step 5: Detect Intent                                         │
│    • Keywords: "emergency", "leak"                              │
│    • Intent: "schedule"                                         │
│                                                                 │
│  Step 6: Calculate Lead Score                                  │
│    Base: 5                                                      │
│    + Urgency keywords: +2                                       │
│    + Specific service: +1                                       │
│    = Lead Score: 8                                              │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ JSON response
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  Response received:                                             │
│  {                                                              │
│    response: "Oh no, a leak can cause serious damage...",      │
│    intent: "schedule",                                          │
│    leadScore: 8,                                                │
│    suggestedCrmFields: {                                        │
│      service: "leak repair",                                    │
│      urgency: "high"                                            │
│    }                                                            │
│  }                                                              │
│                                                                 │
│  UI Updates:                                                    │
│  ✓ Display AI response in chat                                 │
│  ✓ Show lead score badge: "Warm Lead (8/10)"                   │
│  ✓ Show intent badge: "Ready to Schedule"                      │
│  ✓ Populate CRM fields sidebar                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Multi-Turn Conversation Flow

```
TURN 1
──────
User: "Do you do oil changes?"

API Processing:
• Intent: "inquiry"
• Lead Score: 5 (base)
• CRM Data: { service: "oil change" }

AI Response: "Yes, we offer oil changes for $39.99. Would you like to schedule one?"


TURN 2
──────
User: "Yes, I'd like to schedule for tomorrow morning"

Conversation History:
[
  { role: "user", content: "Do you do oil changes?" },
  { role: "assistant", content: "Yes, we offer oil changes for $39.99..." }
]

API Processing:
• Intent: "schedule" (detected "schedule")
• Lead Score: 9 (base + engaged + schedule intent)
• CRM Data: {
    service: "oil change",
    preferredTime: "tomorrow morning",
    urgency: "medium"
  }

AI Response: "Great! I can get you in tomorrow morning. What's your name and phone number?"


TURN 3
──────
User: "My name is John Smith, call me at 865-555-1234"

API Processing:
• Intent: "schedule"
• Lead Score: 10 (HOT LEAD - contact info + schedule + engaged)
• CRM Data: {
    name: "John Smith",
    phone: "865-555-1234",
    service: "oil change",
    preferredTime: "tomorrow morning",
    urgency: "medium"
  }

AI Response: "Perfect, John. I've got you scheduled for an oil change tomorrow morning. We'll call you at 865-555-1234 to confirm the time!"
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        ERROR SCENARIOS                          │
└─────────────────────────────────────────────────────────────────┘

SCENARIO 1: Missing API Key
────────────────────────────
Client → API: Valid request
API: process.env.ANTHROPIC_API_KEY = undefined
API → Client: {
  response: "Thanks for calling! How can I help you today?",
  intent: "general",
  leadScore: 5,
  suggestedCrmFields: {}
}
Status: 200 (graceful degradation)


SCENARIO 2: Rate Limit Exceeded
────────────────────────────────
Client → API: 11th request in 1 minute
API: checkRateLimit(ip) = false
API → Client: {
  error: "Rate limit exceeded. Please try again in a minute."
}
Status: 429


SCENARIO 3: Invalid Business Type
──────────────────────────────────
Client → API: { businessType: "invalid" }
API: TypeScript validation fails
API → Client: {
  error: "userMessage and businessType are required"
}
Status: 400


SCENARIO 4: Claude API Error
─────────────────────────────
Client → API: Valid request
API → Claude: Request sent
Claude → API: Error (timeout/server error)
API → Client: {
  response: "I'd be happy to help! What service are you interested in?",
  intent: "inquiry",
  leadScore: 6,
  suggestedCrmFields: {}
}
Status: 200 (graceful degradation - user never knows error occurred)
```

## Rate Limiting Details

```
┌─────────────────────────────────────────────────────────────────┐
│                    RATE LIMIT TRACKING                          │
└─────────────────────────────────────────────────────────────────┘

In-Memory Store (Map):
{
  "123.456.789.0": {
    count: 3,
    resetTime: 1701234567890  // Unix timestamp (60 seconds from now)
  },
  "98.76.54.32": {
    count: 10,
    resetTime: 1701234550000  // Will reset in 50 seconds
  }
}

Request Flow:
1. Extract IP from x-forwarded-for header
2. Check if IP exists in store
3. If not exists OR resetTime passed → Allow (create new entry)
4. If exists AND count < 10 → Allow (increment count)
5. If exists AND count >= 10 → Deny (return 429)

Cleanup:
• Every 60 seconds, remove expired entries
• Prevents memory leak

Production Recommendation:
• Use Redis instead of in-memory Map
• Allows distributed rate limiting across multiple servers
• Persists across server restarts
```

## Lead Scoring Details

```
┌─────────────────────────────────────────────────────────────────┐
│                    LEAD SCORE CALCULATION                       │
└─────────────────────────────────────────────────────────────────┘

Example 1: Emergency Call
─────────────────────────
User: "I have a water leak emergency in my basement!"

Base Score:                     5
+ Urgency keywords:            +2  (emergency, leak)
+ Specific service:            +1  (leak repair)
────────────────────────────────
Total:                          8  (Warm Lead)


Example 2: Hot Lead
───────────────────
User: "I need AC repair ASAP. My name is John, 865-555-1234"
Conversation turns: 2

Base Score:                     5
+ Urgency keywords:            +2  (ASAP)
+ Contact info provided:       +3  (name + phone)
+ Engagement (multiple msgs):  +1
+ Specific service:            +1  (AC repair)
────────────────────────────────
Total:                         12 → Capped at 10 (Hot Lead)


Example 3: Cold Lead
────────────────────
User: "I'm just browsing, not sure if I need anything"

Base Score:                     5
- Low intent signals:          -2  (just browsing, not sure)
────────────────────────────────
Total:                          3  (Cold Lead)
```

## Intent Detection Logic

```
┌─────────────────────────────────────────────────────────────────┐
│                      INTENT PATTERNS                            │
└─────────────────────────────────────────────────────────────────┘

Priority Order (First match wins):

1. SCHEDULE
   Keywords: appointment, schedule, book, available, calendar,
            tomorrow, today, next week
   Example: "Can I schedule an appointment?"
   → Intent: "schedule"

2. PRICING
   Keywords: cost, price, how much, expensive, cheap, rate, fee, charge
   Example: "How much does an oil change cost?"
   → Intent: "pricing"

3. COMPLAINT
   Keywords: complaint, problem, issue, unhappy, disappointed, refund, angry
   Example: "I'm unhappy with the service"
   → Intent: "complaint"

4. INQUIRY
   Keywords: do you, can you, offer, provide, available, service
   Example: "Do you offer emergency services?"
   → Intent: "inquiry"

5. GENERAL (Default)
   No specific keywords matched
   Example: "Hello"
   → Intent: "general"
```

## CRM Data Extraction Patterns

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXTRACTION PATTERNS                          │
└─────────────────────────────────────────────────────────────────┘

PHONE NUMBER:
Pattern: \d{3}[-.\s]?\d{3}[-.\s]?\d{4}
Matches:
  ✓ 865-555-1234
  ✓ 865.555.1234
  ✓ 865 555 1234
  ✓ (865) 555-1234
  ✓ 8655551234

EMAIL:
Pattern: [\w.-]+@[\w.-]+\.\w{2,}
Matches:
  ✓ john@example.com
  ✓ john.doe@company.co.uk
  ✓ john_doe123@test-mail.com

NAME:
Pattern: (?:my name is|I'm|this is|I am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)
Matches:
  ✓ "My name is John Smith"
  ✓ "I'm Sarah Johnson"
  ✓ "This is Mike Davis"

URGENCY:
High:     emergency, urgent, asap, now, immediately
Medium:   soon, this week, today, tomorrow
Low:      (default if no urgency keywords)

PREFERRED TIME:
Pattern: morning|afternoon|evening|today|tomorrow|next week|
         monday|tuesday|wednesday|thursday|friday
```

## Full Example Trace

```
┌─────────────────────────────────────────────────────────────────┐
│              COMPLETE REQUEST/RESPONSE TRACE                    │
└─────────────────────────────────────────────────────────────────┘

1. Client Request
   POST http://localhost:3000/api/demo-response
   Headers: { "Content-Type": "application/json" }
   Body: {
     "userMessage": "I have a water leak emergency in my basement!",
     "businessType": "plumbing"
   }

2. API: Validate Input ✓
   userMessage: present
   businessType: valid (plumbing)

3. API: Check Rate Limit ✓
   IP: 192.168.1.100
   Current requests: 2/10

4. API: Get Anthropic Client ✓
   API key: configured
   Client: initialized

5. API: Build System Prompt
   "You are an AI receptionist for Elite Plumbing Services.
   Handle: emergency leaks, drain cleaning, water heater repairs...
   Keep responses under 50 words..."

6. API → Claude API
   model: claude-3-5-sonnet-20241022
   max_tokens: 150
   temperature: 0.7
   system: [system prompt]
   messages: [{ role: "user", content: "I have a water leak..." }]

7. Claude API → API
   content: "Oh no, a basement leak needs immediate attention!
            I can get a plumber to you today. What's your name
            and phone number so we can reach you?"

8. API: Extract CRM Data
   name: null
   phone: null
   service: "leak repair"
   urgency: "high" (keyword: emergency)
   location: "basement"

9. API: Detect Intent
   Keywords: emergency, leak
   Intent: "schedule"

10. API: Calculate Lead Score
    Base: 5
    + Urgency: +2
    + Service: +1
    Total: 8

11. API → Client
    Status: 200
    Body: {
      "response": "Oh no, a basement leak needs immediate attention!...",
      "intent": "schedule",
      "leadScore": 8,
      "suggestedCrmFields": {
        "service": "leak repair",
        "urgency": "high",
        "location": "basement"
      }
    }

12. Client: Update UI
    • Display AI message in chat
    • Show "Warm Lead (8/10)" badge
    • Show "Ready to Schedule" intent badge
    • Populate CRM sidebar with extracted data
```

## Performance Metrics

```
Typical Request Timeline:
─────────────────────────
0ms     → Request received
1ms     → Input validation
2ms     → Rate limit check
5ms     → System prompt built
10ms    → Request sent to Claude
1500ms  → Claude response received
1501ms  → CRM data extraction
1502ms  → Intent detection
1503ms  → Lead score calculation
1504ms  → Response sent to client

Total: ~1.5 seconds (Claude API latency dominates)
```
