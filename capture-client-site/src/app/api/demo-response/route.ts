/**
 * AI Voice Demo API Route
 *
 * Production-ready API for generating realistic AI receptionist responses
 * using Claude API. Handles conversation context, lead qualification,
 * and CRM data extraction.
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DemoRequest {
  userMessage: string;
  businessType: BusinessType;
  conversationHistory?: ConversationMessage[];
}

export type BusinessType = "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";

export type Intent =
  | "emergency"
  | "service_request"
  | "inquiry"
  | "schedule"
  | "pricing"
  | "complaint"
  | "general";

export interface ExtractedCRMData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  urgency?: "low" | "medium" | "high";
  preferredTime?: string;
  location?: string;
}

export interface DemoResponse {
  response: string;
  intent: Intent;
  leadScore: number;
  suggestedCrmFields: ExtractedCRMData;
}

// ==========================================
// BUSINESS TYPE CONTEXTS
// ==========================================

const BUSINESS_CONTEXTS: Record<BusinessType, string> = {
  plumbing: `You are an AI receptionist for "Elite Plumbing Services."
    Handle: emergency leaks, drain cleaning, water heater repairs, installations.
    Pricing: $95 service call, $150/hr labor. Emergency = 1.5x rate.`,

  dental: `You are an AI receptionist for "Bright Smile Dental."
    Handle: cleanings, fillings, cosmetic dentistry, emergencies.
    New patient exams: $99 (includes X-rays, cleaning). Open M-F 8am-6pm.`,

  auto: `You are an AI receptionist for "AutoCare Pro."
    Handle: oil changes, brake repairs, diagnostics, inspections.
    Oil change: $39.99. Brake service from $199. Free multi-point inspection.`,

  hvac: `You are an AI receptionist for "Climate Control HVAC."
    Handle: AC repair, heating service, installations, maintenance plans.
    Service call: $79. Maintenance plans from $199/year. 24/7 emergency.`,

  law: `You are an AI receptionist for "Johnson & Associates Law Firm."
    Handle: personal injury, family law, estate planning consultations.
    Free initial consultation. No fees unless we win your case.`,

  general: `You are an AI receptionist for a professional service business.
    Provide friendly, helpful assistance and capture lead information.`,
};

// ==========================================
// RATE LIMITING (In-Memory - Use Redis for Production)
// ==========================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Lazy cleanup: remove expired entries when checking (avoids setInterval memory leak)
  if (rateLimitStore.size > 100) {
    cleanupExpiredEntries();
  }

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

// Clean up old entries periodically
// Note: In serverless environments, this cleanup happens naturally on cold starts
// For persistent servers, we use a lazy cleanup approach in checkRateLimit instead
function cleanupExpiredEntries() {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [key, entry] of entries) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Cleanup is now performed lazily when checking rate limits to avoid memory leaks
// from setInterval in serverless environments

// ==========================================
// CLAUDE API CLIENT
// ==========================================

function getAnthropicClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("[demo-response] ANTHROPIC_API_KEY not configured");
    return null;
  }

  return new Anthropic({
    apiKey,
  });
}

// ==========================================
// SYSTEM PROMPT BUILDER
// ==========================================

function buildSystemPrompt(businessType: BusinessType): string {
  const businessContext = BUSINESS_CONTEXTS[businessType];

  return `${businessContext}

CRITICAL INSTRUCTIONS:
- Keep responses under 50 words (natural phone conversation length)
- Be warm, professional, and helpful
- Qualify the lead by asking about their needs
- Extract: name, phone, service needed, urgency, preferred time
- Use natural language (contractions, friendly tone)
- Never mention you're an AI unless asked directly
- Focus on ONE question at a time
- If emergency, prioritize scheduling immediately
- For pricing questions, provide ranges and suggest consultation

CONVERSATION FLOW:
1. Greet warmly and ask how you can help
2. Listen to their needs
3. Ask qualifying questions (What's happening? When do you need service?)
4. Capture contact info (May I have your name and phone number?)
5. Suggest next steps (schedule appointment or transfer to specialist)

RESPONSE STYLE:
- "Thanks for calling! How can I help you today?"
- "I'd be happy to help with that. What's your name?"
- "Let me get you scheduled. What day works best?"
- "That sounds urgent. I can get someone out today."`;
}

// ==========================================
// INTENT DETECTION
// ==========================================

function detectIntent(userMessage: string, aiResponse: string): Intent {
  const lowerMessage = userMessage.toLowerCase();
  const lowerResponse = aiResponse.toLowerCase();

  // Check for inquiry patterns first (to avoid false emergency detection)
  const isInquiry = /\b(do you|can you|offer|provide|available|what do you|tell me about)\b/i.test(
    lowerMessage
  );

  // Emergency intent (highest priority) - but not if it's just an inquiry
  if (
    !isInquiry &&
    /\b(leak|leaking|flood|flooding|no heat|no ac|no air|broken|burst|emergency|urgent|asap|right now|immediately)\b/i.test(
      lowerMessage
    )
  ) {
    return "emergency";
  }

  // Service request intent
  if (
    /\b(repair|fix|install|replace|check|service|maintenance|inspect|diagnose)\b/i.test(
      lowerMessage
    )
  ) {
    return "service_request";
  }

  // Schedule intent
  if (
    /\b(appointment|schedule|book|when available|when can|what time|set up)\b/i.test(
      lowerMessage + lowerResponse
    )
  ) {
    return "schedule";
  }

  // Pricing intent
  if (
    /\b(cost|price|how much|expensive|cheap|rate|fee|charge|quote|estimate)\b/i.test(lowerMessage)
  ) {
    return "pricing";
  }

  // Complaint intent
  if (
    /\b(complaint|problem|issue|not working|unhappy|disappointed|refund|angry)\b/i.test(
      lowerMessage
    )
  ) {
    return "complaint";
  }

  // Inquiry intent (specific service questions)
  if (isInquiry || /\b(24\/7|emergency service|hours)\b/i.test(lowerMessage)) {
    return "inquiry";
  }

  return "general";
}

// ==========================================
// LEAD SCORING
// ==========================================

function calculateLeadScore(
  userMessage: string,
  conversationHistory: ConversationMessage[] = [],
  extractedData: ExtractedCRMData,
  intent?: Intent
): number {
  let score = 5; // Base score

  // Emergency situations start higher (base becomes 7)
  if (/\b(emergency|urgent|asap|now|immediately)\b/i.test(userMessage)) {
    score = 7;
  }

  // Critical leak situations get even higher priority (+3)
  if (/\b(leak|leaking|flood|flooding|burst)\b/i.test(userMessage)) {
    score += 3;
  } else if (/\b(broken|no heat|no ac)\b/i.test(userMessage)) {
    // Other urgent issues (+2)
    score += 2;
  }

  // Service request intent adds value (+1)
  if (intent === "service_request" || intent === "emergency") {
    score += 1;
  }

  // Contact info provided (+3)
  if (extractedData.phone || extractedData.email) {
    score += 3;
  }

  // Multiple messages (engagement) (+1)
  if (conversationHistory.length > 2) {
    score += 1;
  }

  // Specific service mentioned (+1)
  if (extractedData.service) {
    score += 1;
  }

  // Ready to schedule (+2)
  if (/\b(schedule|book|appointment|available)\b/i.test(userMessage)) {
    score += 2;
  }

  // Negative signals (-2)
  if (/\b(just browsing|just looking|maybe later|not sure)\b/i.test(userMessage)) {
    score -= 2;
  }

  return Math.max(1, Math.min(10, score));
}

// ==========================================
// CRM DATA EXTRACTION
// ==========================================

function extractCRMData(
  userMessage: string,
  conversationHistory: ConversationMessage[] = []
): ExtractedCRMData {
  const allText = [...conversationHistory.map((m) => m.content), userMessage].join(" ");

  const extracted: ExtractedCRMData = {};

  // Extract phone (basic pattern)
  const phoneMatch = allText.match(
    /\b(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)\s?\d{3}[-.\s]?\d{4})\b/
  );
  if (phoneMatch) {
    extracted.phone = phoneMatch[0];
  }

  // Extract email (basic pattern)
  const emailMatch = allText.match(/\b[\w.-]+@[\w.-]+\.\w{2,}\b/);
  if (emailMatch) {
    extracted.email = emailMatch[0];
  }

  // Extract name (after "my name is", "I'm", "this is")
  const nameMatch = allText.match(
    /(?:my name is|I'm|this is|I am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i
  );
  if (nameMatch) {
    extracted.name = nameMatch[1];
  }

  // Extract service from keywords
  const lowerText = allText.toLowerCase();

  // Plumbing services
  if (/\b(pipe|leak|leaking|drain|clog|clogged)\b/i.test(lowerText)) {
    extracted.service = "Pipe Repair/Leak Fix";
  } else if (/\b(water heater|hot water)\b/i.test(lowerText)) {
    extracted.service = "Water Heater Installation/Repair";
  } else if (/\b(toilet|commode)\b/i.test(lowerText)) {
    extracted.service = "Toilet Repair";
  } else if (/\b(faucet|tap|sink)\b/i.test(lowerText)) {
    extracted.service = "Faucet/Sink Repair";
  } else if (/\b(sewer|sewage)\b/i.test(lowerText)) {
    extracted.service = "Sewer Line Service";
  }
  // HVAC services
  else if (/\b(ac|air conditioning|cooling|cold)\b/i.test(lowerText)) {
    extracted.service = "AC Repair/Service";
  } else if (/\b(furnace|heat|heating|warm)\b/i.test(lowerText)) {
    extracted.service = "Heating/Furnace Repair";
  } else if (/\b(thermostat)\b/i.test(lowerText)) {
    extracted.service = "Thermostat Service";
  } else if (/\b(hvac|air handler)\b/i.test(lowerText)) {
    extracted.service = "HVAC System Service";
  }
  // Dental services
  else if (/\b(teeth|tooth|dental)\b/i.test(lowerText)) {
    extracted.service = "Dental Exam/Cleaning";
  } else if (/\b(cleaning|hygiene)\b/i.test(lowerText)) {
    extracted.service = "Teeth Cleaning";
  } else if (/\b(filling|cavity)\b/i.test(lowerText)) {
    extracted.service = "Cavity Filling";
  } else if (/\b(crown|cap)\b/i.test(lowerText)) {
    extracted.service = "Dental Crown";
  } else if (/\b(toothache|pain)\b/i.test(lowerText)) {
    extracted.service = "Emergency Dental";
  }
  // Auto services
  else if (/\b(oil change|oil)\b/i.test(lowerText)) {
    extracted.service = "Oil Change";
  } else if (/\b(brake|brakes)\b/i.test(lowerText)) {
    extracted.service = "Brake Service/Repair";
  } else if (/\b(engine|motor)\b/i.test(lowerText)) {
    extracted.service = "Engine Diagnostic/Repair";
  } else if (/\b(tire|tires|wheel)\b/i.test(lowerText)) {
    extracted.service = "Tire Service";
  } else if (/\b(transmission)\b/i.test(lowerText)) {
    extracted.service = "Transmission Service";
  } else if (/\b(check engine|diagnostic)\b/i.test(lowerText)) {
    extracted.service = "Diagnostic Service";
  }
  // Legal services
  else if (/\b(injury|accident|hurt)\b/i.test(lowerText)) {
    extracted.service = "Personal Injury Consultation";
  } else if (/\b(divorce|separation|custody)\b/i.test(lowerText)) {
    extracted.service = "Family Law Consultation";
  } else if (/\b(estate|will|trust)\b/i.test(lowerText)) {
    extracted.service = "Estate Planning";
  } else if (/\b(lawsuit|sue|legal)\b/i.test(lowerText)) {
    extracted.service = "Legal Consultation";
  }

  // Determine urgency
  if (/\b(emergency|urgent|asap|now|immediately|leak|flood|burst)\b/i.test(allText)) {
    extracted.urgency = "high";
  } else if (/\b(soon|this week|today|tomorrow)\b/i.test(allText)) {
    extracted.urgency = "medium";
  } else {
    extracted.urgency = "low";
  }

  // Extract preferred time
  const timeMatch = allText.match(
    /\b(morning|afternoon|evening|today|tomorrow|next week|monday|tuesday|wednesday|thursday|friday)\b/i
  );
  if (timeMatch) {
    extracted.preferredTime = timeMatch[0];
  }

  return extracted;
}

// ==========================================
// FALLBACK RESPONSES
// ==========================================

function getFallbackResponse(businessType: BusinessType): DemoResponse {
  // Use business type to select a contextually relevant fallback
  const greetings: Record<BusinessType, string> = {
    plumbing: "Thanks for calling! Do you have a plumbing emergency or need to schedule service?",
    dental: "Thanks for calling! Are you looking to schedule an appointment or have a question?",
    auto: "Thanks for calling! What can we help you with today - service, repair, or a quote?",
    hvac: "Thanks for calling! Is your AC or heating system giving you trouble?",
    law: "Thank you for calling. How may I assist you with your legal matter today?",
    general: "Thanks for calling! How can I help you today?",
  };

  return {
    response: greetings[businessType] || greetings.general,
    intent: "general",
    leadScore: 5,
    suggestedCrmFields: {},
  };
}

// ==========================================
// MAIN API HANDLER
// ==========================================

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: DemoRequest = await request.json();

    // Validate required fields
    if (!body.userMessage || !body.businessType) {
      return NextResponse.json(
        { error: "userMessage and businessType are required" },
        { status: 400 }
      );
    }

    // Rate limiting (use IP or session ID)
    const clientIP = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 }
      );
    }

    // Get Anthropic client
    const client = getAnthropicClient();

    // If no API key, return graceful fallback
    if (!client) {
      console.warn("[demo-response] Using fallback response (no API key)");
      return NextResponse.json(getFallbackResponse(body.businessType));
    }

    // Build conversation messages for Claude
    const messages: Anthropic.Messages.MessageParam[] = [
      ...(body.conversationHistory || []).map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user",
        content: body.userMessage,
      },
    ];

    // Call Claude API
    const completion = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 150, // Short responses for phone conversation
      temperature: 0.7, // Natural variation
      system: buildSystemPrompt(body.businessType),
      messages,
    });

    // Extract response text
    const aiResponse =
      completion.content[0].type === "text"
        ? completion.content[0].text
        : "I apologize, I had trouble processing that. Can you repeat?";

    // Extract CRM data
    const extractedData = extractCRMData(body.userMessage, body.conversationHistory);

    // Detect intent
    const intent = detectIntent(body.userMessage, aiResponse);

    // Calculate lead score
    const leadScore = calculateLeadScore(
      body.userMessage,
      body.conversationHistory,
      extractedData,
      intent
    );

    // Build response
    const response: DemoResponse = {
      response: aiResponse,
      intent,
      leadScore,
      suggestedCrmFields: extractedData,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[demo-response] Error:", error);

    // Graceful degradation - return fallback
    return NextResponse.json(
      getFallbackResponse("general"),
      { status: 200 } // Don't expose errors to client
    );
  }
}

// ==========================================
// USAGE EXAMPLE
// ==========================================

/**
 * Example Request:
 *
 * POST /api/demo-response
 * {
 *   "userMessage": "Hi, I have a water leak in my basement",
 *   "businessType": "plumbing",
 *   "conversationHistory": []
 * }
 *
 * Example Response:
 * {
 *   "response": "Oh no, a leak can cause serious damage. I can get a plumber out today. What's your name and phone number?",
 *   "intent": "schedule",
 *   "leadScore": 9,
 *   "suggestedCrmFields": {
 *     "service": "leak repair",
 *     "urgency": "high",
 *     "location": "basement"
 *   }
 * }
 */
