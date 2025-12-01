import { useState, useCallback, useRef, useEffect } from 'react';
import { TYPEWRITER_CONFIG } from './useTypewriter';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type BusinessType =
  | 'plumbing'
  | 'dental'
  | 'auto'
  | 'hvac'
  | 'law'
  | 'general';

export interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export interface CRMField {
  id: string;
  label: string;
  value: string;
  isFilled: boolean;
  isFlashing: boolean;
  isUrgent?: boolean;
}

export interface DemoState {
  businessType: BusinessType;
  conversationHistory: Message[];
  isLoading: boolean;
  error: string | null;
  crmFields: CRMField[];
  leadScore: number;
  isTyping: boolean;
  currentAiResponse: string;
  isTypingComplete: boolean;
}

export interface DemoControls {
  sendMessage: (message: string) => Promise<void>;
  setBusinessType: (type: BusinessType) => void;
  resetDemo: () => void;
  loadExampleConversation: (transcriptId: string) => void;
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const API_CONFIG = {
  ENDPOINT: '/api/demo-response',
  TIMEOUT_MS: 10000,
  MAX_RETRIES: 2,
  RETRY_DELAY_MS: 1000,
} as const;

const DEMO_TIMING = {
  TYPING_SPEED: TYPEWRITER_CONFIG.DEFAULT_SPEED,
  FIELD_FLASH_DURATION: 600,
  FIELD_UPDATE_DELAY: 300,
  MESSAGE_DELAY: 500,
} as const;

// Initial CRM field structure
const INITIAL_CRM_FIELDS: CRMField[] = [
  {
    id: 'name',
    label: 'Contact Name',
    value: '',
    isFilled: false,
    isFlashing: false,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    value: '',
    isFilled: false,
    isFlashing: false,
  },
  {
    id: 'service',
    label: 'Service Needed',
    value: '',
    isFilled: false,
    isFlashing: false,
  },
  {
    id: 'urgency',
    label: 'Lead Priority',
    value: '',
    isFilled: false,
    isFlashing: false,
    isUrgent: true,
  },
];

// Business-specific AI greetings
const AI_GREETINGS: Record<BusinessType, string> = {
  plumbing:
    "Hello! Thanks for calling Elite Plumbing Services. I'm here to help with your plumbing needs. What can I assist you with today?",
  dental:
    "Good morning! You've reached Bright Smile Dental. How can I help you with your dental care today?",
  auto: "Hi there! Thanks for calling AutoCare Pro. What can I help you with for your vehicle today?",
  hvac: "Hello! You've reached Climate Control HVAC. How can I help with your heating or cooling needs?",
  law: "Good day! Thanks for calling Johnson & Associates Law Firm. How may I assist you today?",
  general:
    "Hello! Thanks for calling. I'm here to help answer your questions. What can I do for you?",
};

// ============================================================================
// INITIAL STATE
// ============================================================================

const createInitialState = (businessType: BusinessType): DemoState => ({
  businessType,
  conversationHistory: [
    {
      id: 'ai-greeting',
      role: 'ai',
      text: AI_GREETINGS[businessType],
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  error: null,
  crmFields: INITIAL_CRM_FIELDS,
  leadScore: 0,
  isTyping: false,
  currentAiResponse: '',
  isTypingComplete: true,
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate unique message ID
 */
function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulate typing effect for AI responses
 */
function simulateTyping(
  text: string,
  onProgress: (partial: string) => void,
  onComplete: () => void,
  speed: number = DEMO_TIMING.TYPING_SPEED
): () => void {
  let currentIndex = 0;
  let timeoutId: NodeJS.Timeout;

  const typeNextCharacter = () => {
    if (currentIndex < text.length) {
      currentIndex++;
      onProgress(text.substring(0, currentIndex));

      // Add pause for punctuation
      const char = text[currentIndex - 1];
      const pauseTime =
        TYPEWRITER_CONFIG.PAUSE_ON_PUNCTUATION[
          char as keyof typeof TYPEWRITER_CONFIG.PAUSE_ON_PUNCTUATION
        ] || 0;

      timeoutId = setTimeout(typeNextCharacter, speed + pauseTime);
    } else {
      onComplete();
    }
  };

  typeNextCharacter();

  // Return cleanup function
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
}

/**
 * Extract CRM data from AI response metadata
 */
function extractCRMData(responseData: {
  suggestedCrmFields?: {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
    urgency?: 'low' | 'medium' | 'high';
    preferredTime?: string;
    location?: string;
  };
  leadScore?: number;
}): { updates: Partial<CRMField>[]; score: number } {
  const updates: Partial<CRMField>[] = [];
  const { suggestedCrmFields = {}, leadScore = 0 } = responseData;

  // Map extracted data to CRM fields
  if (suggestedCrmFields.name) {
    updates.push({
      id: 'name',
      value: suggestedCrmFields.name,
      isFilled: true,
      isFlashing: true,
    });
  }

  if (suggestedCrmFields.phone) {
    updates.push({
      id: 'phone',
      value: suggestedCrmFields.phone,
      isFilled: true,
      isFlashing: true,
    });
  }

  if (suggestedCrmFields.service) {
    updates.push({
      id: 'service',
      value: suggestedCrmFields.service,
      isFilled: true,
      isFlashing: true,
    });
  }

  if (suggestedCrmFields.urgency) {
    const urgencyMap = {
      low: 'MEDIUM - Schedule Within Week',
      medium: 'HIGH - Respond Within 24 Hours',
      high: 'EMERGENCY - Immediate Response Required',
    };

    updates.push({
      id: 'urgency',
      value: urgencyMap[suggestedCrmFields.urgency],
      isFilled: true,
      isFlashing: true,
      isUrgent: suggestedCrmFields.urgency === 'high',
    });
  }

  return { updates, score: leadScore };
}

/**
 * Call demo response API with retry logic
 */
async function callDemoAPI(
  message: string,
  businessType: BusinessType,
  conversationHistory: Message[],
  retryCount = 0
): Promise<{
  response: string;
  intent?: string;
  leadScore?: number;
  suggestedCrmFields?: {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
    urgency?: 'low' | 'medium' | 'high';
    preferredTime?: string;
    location?: string;
  };
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      API_CONFIG.TIMEOUT_MS
    );

    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userMessage: message,
        businessType,
        conversationHistory: conversationHistory.map((msg) => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: msg.text,
        })),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Retry logic for transient errors
    if (retryCount < API_CONFIG.MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, API_CONFIG.RETRY_DELAY_MS * (retryCount + 1))
      );
      return callDemoAPI(message, businessType, conversationHistory, retryCount + 1);
    }

    // Fallback to demo response on persistent failure
    console.warn('Demo API failed, using fallback response:', error);
    return getFallbackResponse(message, businessType);
  }
}

/**
 * Fallback response generator when API is unavailable
 */
function getFallbackResponse(
  message: string,
  businessType: BusinessType
): {
  response: string;
  intent?: string;
  leadScore?: number;
  suggestedCrmFields?: {
    name?: string;
    phone?: string;
    service?: string;
    urgency?: 'low' | 'medium' | 'high';
  };
} {
  const lowerMessage = message.toLowerCase();

  // Extract potential name
  const nameMatch = message.match(/(?:i'm|i am|my name is|this is)\s+([a-z]+)/i);
  const name = nameMatch ? nameMatch[1] : undefined;

  // Extract potential phone
  const phoneMatch = message.match(
    /(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)\s*\d{3}[-.\s]?\d{4})/
  );
  const phone = phoneMatch ? phoneMatch[1] : undefined;

  // Determine urgency
  const urgency = lowerMessage.includes('emergency') ||
    lowerMessage.includes('urgent') ||
    lowerMessage.includes('asap') ||
    lowerMessage.includes('right away')
    ? 'high'
    : lowerMessage.includes('soon') || lowerMessage.includes('today')
    ? 'medium'
    : 'low';

  // Business-specific responses
  const responses: Record<BusinessType, string> = {
    plumbing:
      "I understand you need plumbing assistance. Could you tell me your name and the best phone number to reach you? Also, is this an emergency or can it wait for a scheduled appointment?",
    dental:
      "I'd be happy to help with your dental needs. May I have your name and phone number to schedule an appointment?",
    auto: "I can help you with that. To better assist you, could you share your name and contact number?",
    hvac: "Got it. To help you with your HVAC needs, may I get your name and contact number? Is this a heating or cooling issue?",
    law: "I understand. To schedule a consultation, may I have your name and the best number to reach you?",
    general:
      "I'd be happy to help with that. May I have your name and phone number so we can better assist you?",
  };

  const suggestedCrmFields: {
    name?: string;
    phone?: string;
    urgency?: 'low' | 'medium' | 'high';
  } = {};

  if (name) suggestedCrmFields.name = name;
  if (phone) suggestedCrmFields.phone = phone;
  if (urgency !== 'low') suggestedCrmFields.urgency = urgency;

  return {
    response: responses[businessType],
    intent: 'inquiry',
    leadScore: urgency === 'high' ? 9 : urgency === 'medium' ? 7 : 5,
    suggestedCrmFields: Object.keys(suggestedCrmFields).length > 0 ? suggestedCrmFields : undefined,
  };
}

// ============================================================================
// MAIN HOOK: useInteractiveDemo
// ============================================================================

export function useInteractiveDemo(
  initialBusinessType: BusinessType = 'plumbing'
): { state: DemoState; controls: DemoControls } {
  const [state, setState] = useState<DemoState>(
    () => createInitialState(initialBusinessType)
  );

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const typingCleanupRef = useRef<(() => void) | null>(null);

  // ============================================================================
  // CLEANUP HELPERS
  // ============================================================================

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  }, []);

  // ============================================================================
  // CRM FIELD UPDATES
  // ============================================================================

  const updateCRMFields = useCallback(
    (updates: Partial<CRMField>[]) => {
      if (updates.length === 0) return;

      updates.forEach((update, index) => {
        scheduleTimeout(() => {
          setState((prev) => ({
            ...prev,
            crmFields: prev.crmFields.map((field) =>
              field.id === update.id ? { ...field, ...update } : field
            ),
          }));

          // Remove flash after duration
          scheduleTimeout(() => {
            setState((prev) => ({
              ...prev,
              crmFields: prev.crmFields.map((field) =>
                field.id === update.id ? { ...field, isFlashing: false } : field
              ),
            }));
          }, DEMO_TIMING.FIELD_FLASH_DURATION);
        }, DEMO_TIMING.FIELD_UPDATE_DELAY * index);
      });
    },
    [scheduleTimeout]
  );

  // ============================================================================
  // SEND MESSAGE
  // ============================================================================

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || state.isLoading) return;

      // Cancel any ongoing typing animation
      if (typingCleanupRef.current) {
        typingCleanupRef.current();
        typingCleanupRef.current = null;
      }

      // Add user message immediately
      const userMessage: Message = {
        id: generateMessageId(),
        role: 'user',
        text: message.trim(),
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, userMessage],
        isLoading: true,
        error: null,
        currentAiResponse: '',
        isTyping: false,
        isTypingComplete: false,
      }));

      try {
        // Call API
        const responseData = await callDemoAPI(
          message,
          state.businessType,
          state.conversationHistory
        );

        // Extract CRM data
        const { updates, score } = extractCRMData(responseData);

        // Update lead score
        setState((prev) => ({
          ...prev,
          leadScore: Math.max(prev.leadScore, score),
          isLoading: false,
        }));

        // Update CRM fields
        updateCRMFields(updates);

        // Start typing animation for AI response
        scheduleTimeout(() => {
          setState((prev) => ({
            ...prev,
            isTyping: true,
            currentAiResponse: '',
          }));

          typingCleanupRef.current = simulateTyping(
            responseData.response,
            (partial) => {
              setState((prev) => ({ ...prev, currentAiResponse: partial }));
            },
            () => {
              // Typing complete - add to conversation history
              const aiMessage: Message = {
                id: generateMessageId(),
                role: 'ai',
                text: responseData.response,
                timestamp: new Date(),
              };

              setState((prev) => ({
                ...prev,
                conversationHistory: [...prev.conversationHistory, aiMessage],
                isTyping: false,
                currentAiResponse: '',
                isTypingComplete: true,
              }));

              typingCleanupRef.current = null;
            },
            DEMO_TIMING.TYPING_SPEED
          );
        }, DEMO_TIMING.MESSAGE_DELAY);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to get response. Please try again.',
        }));
      }
    },
    [
      state.isLoading,
      state.businessType,
      state.conversationHistory,
      updateCRMFields,
      scheduleTimeout,
    ]
  );

  // ============================================================================
  // SET BUSINESS TYPE
  // ============================================================================

  const setBusinessType = useCallback((type: BusinessType) => {
    clearAllTimeouts();
    if (typingCleanupRef.current) {
      typingCleanupRef.current();
      typingCleanupRef.current = null;
    }
    setState(createInitialState(type));
  }, [clearAllTimeouts]);

  // ============================================================================
  // RESET DEMO
  // ============================================================================

  const resetDemo = useCallback(() => {
    clearAllTimeouts();
    if (typingCleanupRef.current) {
      typingCleanupRef.current();
      typingCleanupRef.current = null;
    }
    setState((prev) => createInitialState(prev.businessType));
  }, [clearAllTimeouts]);

  // ============================================================================
  // LOAD EXAMPLE CONVERSATION
  // ============================================================================

  const loadExampleConversation = useCallback(
    (transcriptId: string) => {
      // This would load a pre-defined conversation transcript
      // For now, reset to initial state
      console.info('Loading transcript:', transcriptId);
      resetDemo();
    },
    [resetDemo]
  );

  // ============================================================================
  // CLEANUP ON UNMOUNT
  // ============================================================================

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (typingCleanupRef.current) {
        typingCleanupRef.current();
      }
    };
  }, [clearAllTimeouts]);

  // ============================================================================
  // RETURN STATE & CONTROLS
  // ============================================================================

  const controls: DemoControls = {
    sendMessage,
    setBusinessType,
    resetDemo,
    loadExampleConversation,
  };

  return { state, controls };
}
