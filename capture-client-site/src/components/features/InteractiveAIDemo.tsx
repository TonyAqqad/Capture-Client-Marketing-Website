"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Phone,
  User,
  MapPin,
  Star,
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw
} from "lucide-react";
import { useTypewriter, TYPEWRITER_CONFIG } from "@/hooks/useTypewriter";
import { presets, EASING } from "@/lib/simulator-animations";

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

  // Auto-scroll to bottom on new messages (within container only, not page)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
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

      // Update CRM data with animation
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
      console.error("Demo API error:", error);
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
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={presets.fadeInUp}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-cyan-400 text-sm font-medium tracking-wide">
              Live AI Demo
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Try Our AI Voice Agent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-primary">
              Right Now
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            See how our AI handles real customer conversations and captures leads automatically
          </p>

          {/* Trust Signal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-500" />
            <span>This is a live demo of our AI technology</span>
          </motion.div>
        </motion.div>

        {/* Business Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <label className="block text-sm font-semibold text-slate-300 mb-3 text-center">
            Choose Business Type
          </label>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(Object.keys(BUSINESS_TYPES) as BusinessType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleBusinessTypeChange(type)}
                className={`
                  px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 min-h-[44px] min-w-[44px]
                  ${
                    businessType === type
                      ? "bg-gradient-to-r from-cyan-500 to-primary text-white shadow-glow"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                  }
                `}
                aria-label={`Select ${type} business type`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Demo Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Left: Chat Interface */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {/* Chat Header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-400"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">AI Voice Agent</h3>
                      <p className="text-xs text-slate-400">Active & Ready</p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={messagesContainerRef}
                className="h-[350px] sm:h-[400px] lg:h-[450px] overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
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
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-slate-400"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="w-2 h-2 rounded-full bg-cyan-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm">AI is thinking...</span>
                  </motion.div>
                )}

                {isError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Connection issue. Try the example questions below.</span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="px-4 sm:px-6 py-4 border-t border-white/10 bg-black/20">
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
                    placeholder="Type what a caller would say..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-base placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all disabled:opacity-50 min-h-[48px]"
                    aria-label="Message input"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] min-w-[48px]"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>

                {/* Example Questions */}
                <div className="mt-4">
                  <p className="text-xs text-slate-500 mb-2">Try asking:</p>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                    {BUSINESS_TYPES[businessType].questions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        disabled={isLoading}
                        className="px-4 py-3 text-sm rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all disabled:opacity-50 text-left min-h-[48px] w-full sm:w-auto"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: CRM Panel - Stacks below on mobile/tablet */}
          <div className="lg:col-span-1">
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

  // Determine which text to display with safeguards
  let displayText = message.text;
  let showCursor = false;

  if (isLatest && isAI && isTyping) {
    // While typing: show typed text if available, otherwise show full message as fallback
    displayText = typedText || message.text;
    showCursor = typedText.length > 0 && typedText.length < message.text.length;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`flex items-start gap-3 ${isAI ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className={`
          w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0
          ${
            isAI
              ? "bg-gradient-to-br from-cyan-500/20 to-primary/20 border border-cyan-500/30"
              : "bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/30"
          }
        `}
      >
        {isAI ? (
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
        ) : (
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`
          max-w-[90%] sm:max-w-[80%] px-4 py-3 rounded-2xl
          ${
            isAI
              ? "bg-white/5 border border-white/10"
              : "bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30"
          }
        `}
      >
        <p className="text-base text-white leading-relaxed break-words">
          {displayText}
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 align-middle rounded-full"
            />
          )}
        </p>
        <p className="text-xs text-slate-500 mt-1">
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
    { label: "Name", value: crmData.name, icon: User, filled: !!crmData.name },
    { label: "Phone", value: crmData.phone, icon: Phone, filled: !!crmData.phone },
    { label: "Service", value: crmData.service, icon: MapPin, filled: !!crmData.service },
    { label: "Intent", value: crmData.intent, icon: MessageCircle, filled: !!crmData.intent },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-primary/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-primary/20 border border-cyan-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base">Lead Data</h3>
            <p className="text-xs text-slate-400 font-mono">Real-time Capture</p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {fields.map((field, index) => (
          <CRMField key={field.label} field={field} index={index} />
        ))}

        {/* Lead Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-4 border-t border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Lead Score
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={crmData.leadScore}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-lg font-bold text-white"
                >
                  {crmData.leadScore}
                </motion.span>
              </AnimatePresence>
              <span className="text-slate-500">/10</span>
            </div>
          </div>
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${crmData.leadScore * 10}%` }}
              transition={{ duration: 0.8, ease: EASING.smooth }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-primary rounded-full"
            />
          </div>
        </motion.div>

        {/* Integration Badges */}
        <div className="pt-4 flex items-center justify-center gap-4 text-slate-500 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-500/50" />
            Real-time
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-cyan-500/50" />
            Auto-saved
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// CRM FIELD COMPONENT
// ============================================================================

interface CRMFieldComponentProps {
  field: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    filled: boolean;
  };
  index: number;
}

function CRMField({ field, index }: CRMFieldComponentProps) {
  const Icon = field.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative rounded-xl backdrop-blur-md transition-all duration-500 p-3 sm:p-4
        ${
          field.filled
            ? "bg-cyan-500/5 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
            : "bg-white/[0.02] border border-white/5"
        }
      `}
    >
      {/* Label */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <Icon
          className={`
            w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300
            ${field.filled ? "text-cyan-400" : "text-white/30"}
          `}
        />
        <span
          className={`
            text-xs font-bold uppercase tracking-wider transition-colors duration-300
            ${field.filled ? "text-cyan-400" : "text-white/30"}
          `}
        >
          {field.label}
        </span>
      </div>

      {/* Value */}
      <div className="min-h-[24px] sm:min-h-[28px] flex items-center">
        <AnimatePresence mode="wait">
          {!field.filled ? (
            <motion.div
              key="empty"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-white/20"
                  />
                ))}
              </div>
              <span className="text-sm text-white/20 font-mono">Waiting...</span>
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between w-full"
            >
              {/* Flash Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, times: [0, 0.3, 1] }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/30 to-transparent"
              />

              {/* Value Text */}
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm font-mono font-medium text-white relative z-10 break-all"
              >
                {field.value}
              </motion.span>

              {/* Checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pulse Effect on Fill */}
      {field.filled && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 rounded-xl border-2 border-cyan-500/50 pointer-events-none"
        />
      )}
    </motion.div>
  );
}
