"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useTypewriter, TYPEWRITER_CONFIG } from "@/hooks/useTypewriter";
import {
  RotateCcw,
  Send,
  User,
  Phone,
  Briefcase,
  Target,
  TrendingUp,
  Zap,
  MessageCircle,
} from "lucide-react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Message {
  role: "ai" | "user";
  text: string;
  timestamp: Date;
}

interface CRMData {
  name: string;
  phone: string;
  service: string;
  intent: string;
  leadScore: number;
}

type BusinessType = "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";

interface BusinessGreeting {
  greeting: string;
  questions: string[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

const BUSINESS_TYPES: Record<BusinessType, BusinessGreeting> = {
  plumbing: {
    greeting: "Thanks for calling Swift Plumbing! How can I help you today?",
    questions: [
      "I have a leaking pipe under my sink",
      "Do you offer 24/7 emergency service?",
      "How much for a water heater installation?",
    ],
  },
  dental: {
    greeting: "Hi! Thanks for calling Bright Smile Dental. How can I assist you today?",
    questions: [
      "I need to schedule a cleaning",
      "Do you take my insurance?",
      "I have a toothache, can I get an emergency appointment?",
    ],
  },
  auto: {
    greeting: "Welcome to AutoFix Repair! What can I help you with today?",
    questions: [
      "My check engine light is on",
      "How much for an oil change?",
      "Do you work on European cars?",
    ],
  },
  hvac: {
    greeting: "Thanks for calling Climate Control HVAC. How can I help you today?",
    questions: [
      "My AC stopped working",
      "Can you service my furnace before winter?",
      "What's your pricing for a new AC unit?",
    ],
  },
  law: {
    greeting: "Thank you for calling Smith & Associates Law Firm. How may I direct your call?",
    questions: [
      "I need help with a personal injury case",
      "Do you offer free consultations?",
      "Can you help with estate planning?",
    ],
  },
  general: {
    greeting: "Thanks for calling! How can I help you today?",
    questions: [
      "I'd like to learn more about your services",
      "What are your hours?",
      "Do you have availability this week?",
    ],
  },
};

const BUSINESS_LABELS: Record<BusinessType, string> = {
  plumbing: "Plumbing",
  dental: "Dental",
  auto: "Auto Shop",
  hvac: "HVAC",
  law: "Law Firm",
  general: "General",
};

const INITIAL_CRM_DATA: CRMData = {
  name: "",
  phone: "",
  service: "",
  intent: "",
  leadScore: 0,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function InteractiveAIDemo() {
  // State management
  const [businessType, setBusinessType] = useState<BusinessType>("plumbing");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [crmData, setCrmData] = useState<CRMData>(INITIAL_CRM_DATA);
  const [activeAIMessage, setActiveAIMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Typewriter effect for AI responses
  const aiTyping = useTypewriter({
    text: activeAIMessage,
    isActive: isTyping,
    speed: TYPEWRITER_CONFIG.FAST_SPEED,
    onComplete: () => setIsTyping(false),
  });

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Initialize with AI greeting
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const greeting = BUSINESS_TYPES[businessType].greeting;
      setMessages([
        {
          role: "ai",
          text: greeting,
          timestamp: new Date(),
        },
      ]);
      setActiveAIMessage(greeting);
      setIsTyping(true);
    }
  }, [businessType]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        });
      });
    }
  }, [messages]);

  // Reset on business type change
  const handleBusinessTypeChange = (type: BusinessType) => {
    setBusinessType(type);
    setMessages([]);
    setCrmData(INITIAL_CRM_DATA);
    setIsError(false);
    hasInitialized.current = false;
  };

  // ============================================================================
  // MESSAGE HANDLING
  // ============================================================================

  const handleSendMessage = async (message?: string) => {
    const textToSend = message || userInput.trim();
    if (!textToSend || isLoading) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);
    setIsError(false);

    try {
      // Convert messages to API format
      const conversationHistory = messages.map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.text,
      }));

      // Call demo API endpoint
      const response = await fetch("/api/demo-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType,
          userMessage: textToSend,
          conversationHistory,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        role: "ai",
        text: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Trigger typewriter effect
      setActiveAIMessage(data.response);
      setIsTyping(true);

      // Update CRM data
      if (data.suggestedCrmFields || data.leadScore) {
        setTimeout(() => {
          setCrmData((prev) => ({
            name: data.suggestedCrmFields?.name || prev.name,
            phone: data.suggestedCrmFields?.phone || prev.phone,
            service: data.suggestedCrmFields?.service || prev.service,
            intent: data.intent || prev.intent,
            leadScore: data.leadScore || prev.leadScore,
          }));
        }, 500);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Demo API error:", error);
      }
      setIsError(true);

      // Fallback response
      const fallbackMessage: Message = {
        role: "ai",
        text: "I'd be happy to help! Can you tell me a bit more about what you need?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      setActiveAIMessage(fallbackMessage.text);
      setIsTyping(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleReset = () => {
    setMessages([]);
    setCrmData(INITIAL_CRM_DATA);
    setIsError(false);
    hasInitialized.current = false;
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-slate-950">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header - Clean editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 lg:mb-16"
        >
          <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4">
            Live Demo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            See the AI in action
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Type like a customer would. Watch leads captured in real-time.
          </p>
        </motion.div>

        {/* Business Type Selector - Clean pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 lg:mb-12"
        >
          {(Object.keys(BUSINESS_TYPES) as BusinessType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleBusinessTypeChange(type)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  businessType === type
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {BUSINESS_LABELS[type]}
            </button>
          ))}
        </motion.div>

        {/* Main Demo Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {/* Chat Interface - 3 columns on desktop */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white font-medium text-sm">SMS Agent</span>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={messagesContainerRef}
                className="h-[360px] sm:h-[400px] overflow-y-auto p-5 space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={`${message.timestamp.getTime()}-${index}`}
                      message={message}
                      isLatest={index === messages.length - 1 && message.role === "ai"}
                      typedText={aiTyping.displayText}
                      isTyping={isTyping}
                    />
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex gap-1 px-4 py-3 rounded-2xl bg-white/5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-slate-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {isError && (
                  <div className="text-sm text-amber-400/80 px-4 py-2">
                    Connection issue. Try an example below.
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-white/10 bg-slate-900/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="px-4 py-3 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick prompts */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {BUSINESS_TYPES[businessType].questions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      disabled={isLoading}
                      className="px-3 py-2 text-xs rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CRM Panel - 2 columns on desktop */}
          <div className="lg:col-span-2">
            <CRMPanel crmData={crmData} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CHAT MESSAGE COMPONENT
// ============================================================================

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
  typedText: string;
  isTyping: boolean;
}

function ChatMessage({ message, isLatest, typedText, isTyping }: ChatMessageProps) {
  const isAI = message.role === "ai";

  // Determine which text to display
  let displayText = message.text;
  let showCursor = false;

  if (isLatest && isAI && isTyping) {
    displayText = typedText || message.text;
    showCursor = typedText.length > 0 && typedText.length < message.text.length;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isAI ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`
          max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${
            isAI
              ? "bg-white/5 text-white rounded-bl-md"
              : "bg-cyan-500 text-white rounded-br-md"
          }
        `}
      >
        <p className="break-words">
          {displayText}
          {showCursor && (
            <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse" />
          )}
        </p>
        <p className={`text-xs mt-1.5 ${isAI ? "text-slate-500" : "text-cyan-200"}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// CRM PANEL COMPONENT
// ============================================================================

interface CRMPanelProps {
  crmData: CRMData;
}

function CRMPanel({ crmData }: CRMPanelProps) {
  const fields = [
    { label: "Name", value: crmData.name, icon: User },
    { label: "Phone", value: crmData.phone, icon: Phone },
    { label: "Service", value: crmData.service, icon: Briefcase },
    { label: "Intent", value: crmData.intent, icon: Target },
  ];

  const filledCount = fields.filter(f => f.value).length;
  const captureProgress = filledCount / fields.length;

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Lead Capture</h3>
            <p className="text-slate-500 text-xs">Auto-extracted data</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </div>

      {/* Fields */}
      <div className="p-5 space-y-3">
        {fields.map((field) => (
          <CRMField key={field.label} field={field} />
        ))}

        {/* Lead Score */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-400">Lead Score</span>
            </div>
            <span className="text-lg font-semibold text-white">
              {crmData.leadScore}
              <span className="text-slate-500 text-sm font-normal">/10</span>
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${crmData.leadScore * 10}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
            />
          </div>
        </div>

        {/* Capture progress indicator */}
        <div className="pt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Data captured</span>
            <span>{filledCount}/{fields.length} fields</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${captureProgress * 100}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-emerald-500/50 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CRM FIELD COMPONENT
// ============================================================================

interface CRMFieldProps {
  field: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

function CRMField({ field }: CRMFieldProps) {
  const IconComponent = field.icon;
  const filled = !!field.value;

  return (
    <div
      className={`
        rounded-xl p-3 transition-all duration-300
        ${filled ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-white/[0.02] border border-white/5"}
      `}
    >
      <div className="flex items-center gap-2 mb-1">
        <IconComponent
          className={`w-3.5 h-3.5 ${filled ? "text-cyan-400" : "text-slate-600"}`}
        />
        <span
          className={`text-xs font-medium uppercase tracking-wide ${
            filled ? "text-cyan-400" : "text-slate-600"
          }`}
        >
          {field.label}
        </span>
      </div>
      <div className="min-h-[20px]">
        <AnimatePresence mode="wait">
          {filled ? (
            <motion.p
              key="value"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-white font-mono"
            >
              {field.value}
            </motion.p>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-slate-600"
            >
              Waiting...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
