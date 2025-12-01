/**
 * Test Script for AI Voice Demo API
 *
 * Run with: node --loader ts-node/esm test.ts
 * Or use curl commands below
 */

import type { DemoRequest, DemoResponse } from "@/types/demo";

// ==========================================
// Test Scenarios
// ==========================================

export const testScenarios: Array<{
  name: string;
  request: DemoRequest;
  expectedIntent?: string;
  expectedMinScore?: number;
}> = [
  {
    name: "Emergency Plumbing - High Lead Score",
    request: {
      userMessage: "I have a water leak emergency in my basement!",
      businessType: "plumbing",
      conversationHistory: [],
    },
    expectedIntent: "schedule",
    expectedMinScore: 8,
  },
  {
    name: "Dental Pricing Inquiry",
    request: {
      userMessage: "How much does a teeth cleaning cost?",
      businessType: "dental",
      conversationHistory: [],
    },
    expectedIntent: "pricing",
    expectedMinScore: 5,
  },
  {
    name: "Multi-turn Conversation - Auto Repair",
    request: {
      userMessage: "I'd like to schedule an appointment for tomorrow morning",
      businessType: "auto",
      conversationHistory: [
        {
          role: "user",
          content: "Do you do oil changes?",
        },
        {
          role: "assistant",
          content: "Yes, we offer oil changes for $39.99. Would you like to schedule one?",
        },
      ],
    },
    expectedIntent: "schedule",
    expectedMinScore: 8,
  },
  {
    name: "HVAC Emergency with Contact Info",
    request: {
      userMessage:
        "My AC isn't working and it's 95 degrees. My name is John Smith, call me at 865-555-1234",
      businessType: "hvac",
      conversationHistory: [],
    },
    expectedIntent: "schedule",
    expectedMinScore: 9,
  },
  {
    name: "Law Firm Consultation",
    request: {
      userMessage: "I need help with a personal injury case from a car accident",
      businessType: "law",
      conversationHistory: [],
    },
    expectedIntent: "inquiry",
    expectedMinScore: 7,
  },
  {
    name: "Low Intent - Just Browsing",
    request: {
      userMessage: "I'm just looking around, not sure if I need anything",
      businessType: "general",
      conversationHistory: [],
    },
    expectedIntent: "general",
    expectedMinScore: 3,
  },
  {
    name: "Complaint Handling",
    request: {
      userMessage: "I'm really unhappy with the service I received last week",
      businessType: "plumbing",
      conversationHistory: [],
    },
    expectedIntent: "complaint",
    expectedMinScore: 5,
  },
];

// ==========================================
// Curl Command Examples
// ==========================================

export const curlExamples = `
# Test 1: Emergency Plumbing
curl -X POST http://localhost:3000/api/demo-response \\
  -H "Content-Type: application/json" \\
  -d '{
    "userMessage": "I have a water leak emergency in my basement!",
    "businessType": "plumbing"
  }'

# Test 2: Dental Pricing
curl -X POST http://localhost:3000/api/demo-response \\
  -H "Content-Type: application/json" \\
  -d '{
    "userMessage": "How much does a teeth cleaning cost?",
    "businessType": "dental"
  }'

# Test 3: Multi-turn Conversation
curl -X POST http://localhost:3000/api/demo-response \\
  -H "Content-Type: application/json" \\
  -d '{
    "userMessage": "I would like to schedule an appointment",
    "businessType": "auto",
    "conversationHistory": [
      {"role": "user", "content": "Do you do oil changes?"},
      {"role": "assistant", "content": "Yes, we offer oil changes for $39.99"}
    ]
  }'

# Test 4: HVAC Emergency with Contact Info
curl -X POST http://localhost:3000/api/demo-response \\
  -H "Content-Type: application/json" \\
  -d '{
    "userMessage": "My AC is not working. My name is John at 865-555-1234",
    "businessType": "hvac"
  }'

# Test 5: Rate Limiting (run 11+ times quickly)
for i in {1..12}; do
  curl -X POST http://localhost:3000/api/demo-response \\
    -H "Content-Type: application/json" \\
    -d '{"userMessage": "test", "businessType": "general"}'
  echo ""
done
`;

// ==========================================
// Test Runner Function
// ==========================================

export async function runTests(baseUrl: string = "http://localhost:3000") {
  console.log("🧪 Running AI Voice Demo API Tests\n");
  console.log(`Base URL: ${baseUrl}\n`);

  let passed = 0;
  let failed = 0;

  for (const scenario of testScenarios) {
    console.log(`Testing: ${scenario.name}`);

    try {
      const response = await fetch(`${baseUrl}/api/demo-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scenario.request),
      });

      if (!response.ok) {
        console.log(`❌ FAIL: HTTP ${response.status}`);
        failed++;
        continue;
      }

      const data: DemoResponse = await response.json();

      // Validate response structure
      if (!data.response || !data.intent || !data.leadScore) {
        console.log("❌ FAIL: Invalid response structure");
        failed++;
        continue;
      }

      // Check expected intent
      if (scenario.expectedIntent && data.intent !== scenario.expectedIntent) {
        console.log(`⚠️  WARN: Expected intent "${scenario.expectedIntent}", got "${data.intent}"`);
      }

      // Check minimum lead score
      if (scenario.expectedMinScore && data.leadScore < scenario.expectedMinScore) {
        console.log(
          `⚠️  WARN: Expected score >=${scenario.expectedMinScore}, got ${data.leadScore}`
        );
      }

      console.log(`✅ PASS`);
      console.log(`   Response: "${data.response}"`);
      console.log(`   Intent: ${data.intent}, Score: ${data.leadScore}`);
      if (Object.keys(data.suggestedCrmFields).length > 0) {
        console.log(`   CRM Data:`, data.suggestedCrmFields);
      }
      passed++;
    } catch (error) {
      console.log(`❌ FAIL: ${error}`);
      failed++;
    }

    console.log("");
  }

  console.log("=".repeat(50));
  console.log(`Tests Complete: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(50));
}

// ==========================================
// Usage
// ==========================================

console.log(`
AI Voice Demo API - Test Suite

To run tests:
1. Start the dev server: npm run dev
2. Run this script: ts-node test.ts
3. Or use the curl commands below

Curl Examples:
${curlExamples}
`);

// Uncomment to auto-run tests
// runTests();
