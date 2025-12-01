/**
 * Type definitions for AI Voice Demo feature
 * Shared between API routes and client components
 */

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

export type BusinessType = "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";

export type Intent = "inquiry" | "schedule" | "pricing" | "complaint" | "general";

export interface ExtractedCRMData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  urgency?: "low" | "medium" | "high";
  preferredTime?: string;
  location?: string;
}

export interface DemoRequest {
  userMessage: string;
  businessType: BusinessType;
  conversationHistory?: ConversationMessage[];
}

export interface DemoResponse {
  response: string;
  intent: Intent;
  leadScore: number;
  suggestedCrmFields: ExtractedCRMData;
}

export interface DemoErrorResponse {
  error: string;
  code?: string;
}

/**
 * Business type metadata for UI display
 */
export interface BusinessTypeMetadata {
  label: string;
  icon: string;
  description: string;
  exampleQuery: string;
}

export const BUSINESS_TYPE_METADATA: Record<BusinessType, BusinessTypeMetadata> = {
  plumbing: {
    label: "Plumbing",
    icon: "🔧",
    description: "Emergency repairs, installations, maintenance",
    exampleQuery: "Hi, I have a water leak in my basement",
  },
  dental: {
    label: "Dental",
    icon: "🦷",
    description: "Cleanings, fillings, cosmetic dentistry",
    exampleQuery: "I need to schedule a teeth cleaning",
  },
  auto: {
    label: "Auto Repair",
    icon: "🚗",
    description: "Oil changes, brake service, diagnostics",
    exampleQuery: "My check engine light is on",
  },
  hvac: {
    label: "HVAC",
    icon: "❄️",
    description: "AC repair, heating, installations",
    exampleQuery: "My AC is not cooling properly",
  },
  law: {
    label: "Law Firm",
    icon: "⚖️",
    description: "Legal consultations, case evaluations",
    exampleQuery: "I need help with a personal injury case",
  },
  general: {
    label: "General Business",
    icon: "💼",
    description: "Professional service business",
    exampleQuery: "I'd like to learn about your services",
  },
};

/**
 * Lead score interpretation helpers
 */
export interface LeadScoreInterpretation {
  label: string;
  color: string;
  description: string;
}

export function interpretLeadScore(score: number): LeadScoreInterpretation {
  if (score >= 9) {
    return {
      label: "Hot Lead",
      color: "text-red-500",
      description: "High intent, ready to convert",
    };
  } else if (score >= 7) {
    return {
      label: "Warm Lead",
      color: "text-orange-500",
      description: "Engaged, needs nurturing",
    };
  } else if (score >= 5) {
    return {
      label: "Qualified Lead",
      color: "text-yellow-500",
      description: "Interested, needs qualification",
    };
  } else {
    return {
      label: "Cold Lead",
      color: "text-blue-500",
      description: "Early stage, low intent",
    };
  }
}

/**
 * Intent display helpers
 */
export const INTENT_METADATA: Record<Intent, { label: string; icon: string; color: string }> = {
  inquiry: {
    label: "Service Inquiry",
    icon: "❓",
    color: "bg-blue-100 text-blue-800",
  },
  schedule: {
    label: "Ready to Schedule",
    icon: "📅",
    color: "bg-green-100 text-green-800",
  },
  pricing: {
    label: "Pricing Question",
    icon: "💰",
    color: "bg-purple-100 text-purple-800",
  },
  complaint: {
    label: "Issue/Complaint",
    icon: "⚠️",
    color: "bg-red-100 text-red-800",
  },
  general: {
    label: "General",
    icon: "💬",
    color: "bg-gray-100 text-gray-800",
  },
};
