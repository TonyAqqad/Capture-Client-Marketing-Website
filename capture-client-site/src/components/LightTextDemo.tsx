"use client";

import { motion } from "@/lib/motion";
import { Send, Bot, Sparkles, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { useInteractiveDemo, type BusinessType } from "@/hooks/useInteractiveDemo";

// ============================================
// LIGHT TEXT DEMO - Interactive AI Chat
// Billion-dollar aesthetic with real Claude integration
// ============================================

// Industry options for selector
const INDUSTRIES: { value: BusinessType; label: string; emoji: string }[] = [
  { value: "general", label: "General", emoji: "💬" },
  { value: "plumbing", label: "Plumbing", emoji: "🔧" },
  { value: "dental", label: "Dental", emoji: "🦷" },
  { value: "hvac", label: "HVAC", emoji: "❄️" },
  { value: "auto", label: "Auto Repair", emoji: "🚗" },
  { value: "law", label: "Legal", emoji: "⚖️" },
];

// Quick prompts for different industries
const QUICK_PROMPTS: Record<BusinessType, string[]> = {
  general: [
    "Tell me about your services",
    "What are your business hours?",
    "How can I get started?",
  ],
  plumbing: [
    "I need emergency plumbing help",
    "What are your rates?",
    "Can you fix a leak this week?",
  ],
  dental: [
    "I need to schedule a cleaning",
    "Do you accept my insurance?",
    "Do you offer emergency appointments?",
  ],
  hvac: [
    "My AC stopped working",
    "Can you service my furnace?",
    "What's a maintenance plan cost?",
  ],
  auto: [
    "My check engine light is on",
    "I need an oil change",
    "Can you do brake repair?",
  ],
  law: [
    "I need legal consultation",
    "What types of cases do you handle?",
    "How do consultations work?",
  ],
};

export function LightTextDemo() {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<BusinessType>("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Use the interactive demo hook
  const { state, controls } = useInteractiveDemo(selectedIndustry);
  const {
    conversationHistory,
    isLoading,
    error,
    isTyping,
    currentAiResponse,
  } = state;
  const { sendMessage, setBusinessType } = controls;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      requestAnimationFrame(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [conversationHistory, currentAiResponse]);

  // Handle industry change
  const handleIndustryChange = (industry: BusinessType) => {
    setSelectedIndustry(industry);
    setBusinessType(industry);
  };

  // Handle message send
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  // Handle quick prompt click
  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return;
    await sendMessage(prompt);
  };

  // Handle voice button click - triggers LeadConnector widget
  const handleVoiceClick = () => {
    // LeadConnector API: https://help.gohighlevel.com/support/solutions/articles/48001191051
    if (window.leadConnector?.chatWidget?.openWidget) {
      window.leadConnector.chatWidget.openWidget();
    }
  };

  // Get current prompts for selected industry
  const currentPrompts = QUICK_PROMPTS[selectedIndustry];

  return (
    <>
      {/* LeadConnector Voice Agent - Demo Button Widget */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="693b0f0d5762717f7855a5cd"
        strategy="afterInteractive"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-2xl mx-auto"
      >
      {/* Floating animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(37, 99, 235, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Main card */}
        <div className="relative bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-blue-500/10 overflow-hidden">
          {/* Header */}
          <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-5 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-b border-slate-200">
            {/* Top Row: Eyebrow + AI Status */}
            <div className="flex items-center justify-between mb-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 border border-blue-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Live AI Demo
                </span>
              </motion.div>

              {/* AI Online Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border shadow-sm transition-all ${
                  isLoading
                    ? "bg-blue-50/80 border-blue-200"
                    : error
                    ? "bg-amber-50/80 border-amber-200"
                    : "bg-white/80 border-emerald-200"
                }`}
              >
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isLoading ? "bg-blue-500" : error ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  />
                  {!error && (
                    <div
                      className={`absolute inset-0 w-2 h-2 rounded-full ${
                        isLoading ? "bg-blue-500" : "bg-emerald-500"
                      } animate-ping`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isLoading ? "text-blue-700" : error ? "text-amber-700" : "text-emerald-700"
                  }`}
                >
                  {isLoading ? "Thinking..." : error ? "Retry" : "AI Ready"}
                </span>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              Chat with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AI
              </span>
            </motion.h3>

            {/* Industry Selector - Horizontal scroll on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative -mx-6 sm:mx-0"
            >
              <div className="flex gap-2 px-6 sm:px-0 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide sm:flex-wrap">
                {INDUSTRIES.map((industry) => (
                  <button
                    key={industry.value}
                    onClick={() => handleIndustryChange(industry.value)}
                    className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedIndustry === industry.value
                        ? "text-white shadow-md"
                        : "text-slate-600 bg-white/60 border border-slate-200/80 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    {/* Animated background for selected state */}
                    {selectedIndustry === industry.value && (
                      <motion.div
                        layoutId="industry-pill"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{industry.emoji}</span>
                      <span>{industry.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chat interface with scrollable messages */}
          <div
            ref={messagesContainerRef}
            className="px-6 sm:px-8 py-6 space-y-4 max-h-[400px] overflow-y-auto scroll-smooth"
          >
            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-amber-50 border border-amber-200"
              >
                <p className="text-sm text-amber-800">{error} Please try again.</p>
              </motion.div>
            )}

            {/* Messages */}
            {conversationHistory.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-800 border border-slate-200"
                  }`}
                >
                  {message.role === "ai" && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">AI Agent</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && currentAiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600">AI Agent</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {currentAiResponse}
                    <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse" />
                  </p>
                </div>
              </motion.div>
            )}

            {/* Loading dots */}
            {isLoading && !isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="px-4 py-3 rounded-2xl bg-slate-100">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="px-6 sm:px-8 pb-4"
          >
            <div className="flex flex-wrap gap-2">
              {currentPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 border border-slate-200 hover:border-blue-300 text-sm text-slate-700 hover:text-slate-900 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">{prompt}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Input area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="px-6 sm:px-8 pb-6 sm:pb-8"
          >
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="w-full px-4 py-3.5 pr-24 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {/* Voice Call Button - triggers LeadConnector widget */}
                <button
                  type="button"
                  onClick={handleVoiceClick}
                  className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Start voice call with AI"
                >
                  <Phone className="w-4 h-4" />
                </button>
                {/* Send Text Button */}
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Footer badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="px-6 sm:px-8 pb-6 flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-medium text-slate-600">
                Powered by Capture Client
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}
