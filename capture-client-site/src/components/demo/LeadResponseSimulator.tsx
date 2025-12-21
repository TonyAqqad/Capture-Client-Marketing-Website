"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  Wrench,
  Stethoscope,
  Car,
  Thermometer,
  Gavel,
  Building2,
  Send,
  Bot,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { LeadScoreIndicator } from "./LeadScoreIndicator";
import { IntentBadge } from "./IntentBadge";
import { CRMFieldsDisplay } from "./CRMFieldsDisplay";

// ==================== TYPES ====================

type BusinessType = "plumbing" | "dental" | "auto" | "hvac" | "law" | "general";
type Intent = "emergency" | "service_request" | "inquiry" | "schedule" | "pricing" | "complaint" | "general";

interface ExtractedCRMData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  urgency?: "low" | "medium" | "high";
  preferredTime?: string;
  location?: string;
}

interface DemoResponse {
  response: string;
  intent: Intent;
  leadScore: number;
  suggestedCrmFields: ExtractedCRMData;
}

interface LeadResponseSimulatorProps {
  personalization?: {
    businessName: string;
    industry: string;
    phoneNumber?: string;
    location?: string;
  } | null;
}

// ==================== DATA ====================

const INDUSTRIES = [
  {
    id: "plumbing" as BusinessType,
    label: "Plumbing",
    icon: Wrench,
    examples: [
      "Hi, I have a leak under my kitchen sink. Can you send someone today?",
      "My water heater stopped working. No hot water at all.",
    ],
  },
  {
    id: "dental" as BusinessType,
    label: "Dental",
    icon: Stethoscope,
    examples: [
      "I have severe tooth pain and need an emergency appointment.",
      "Looking to schedule a cleaning for my whole family.",
    ],
  },
  {
    id: "auto" as BusinessType,
    label: "Automotive",
    icon: Car,
    examples: [
      "My check engine light came on. Can you diagnose it?",
      "Need an oil change and tire rotation.",
    ],
  },
  {
    id: "hvac" as BusinessType,
    label: "HVAC",
    icon: Thermometer,
    examples: [
      "AC isn't blowing cold air. It's 90 degrees in here!",
      "Interested in a maintenance plan for my heating system.",
    ],
  },
  {
    id: "law" as BusinessType,
    label: "Law Firm",
    icon: Gavel,
    examples: [
      "I was in a car accident last week. I need legal help.",
      "Looking for help with a custody issue.",
    ],
  },
  {
    id: "general" as BusinessType,
    label: "Other",
    icon: Building2,
    examples: [
      "Do you offer 24/7 emergency service?",
      "What are your hours and pricing?",
    ],
  },
];

// ==================== TYPEWRITER HOOK ====================

function useTypewriter(text: string, speed: number = 25) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    setIsComplete(false);
    setDisplayedText("");

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// ==================== MAIN COMPONENT ====================

export function LeadResponseSimulator({ personalization }: LeadResponseSimulatorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<BusinessType>("plumbing");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<DemoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedIndustryData = INDUSTRIES.find((i) => i.id === selectedIndustry)!;
  const { displayedText, isComplete } = useTypewriter(response?.response || "", 20);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/demo-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: message,
          businessType: selectedIndustry,
          personalization: personalization || undefined,
        }),
      });

      if (res.status === 429) {
        setError("You've been testing a lot! Please wait a moment and try again.");
        return;
      }

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data: DemoResponse = await res.json();
      setResponse(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [message, selectedIndustry, isLoading]);

  const handleExampleClick = (example: string) => {
    setMessage(example);
    setResponse(null);
    setError(null);
  };

  const handleReset = () => {
    setMessage("");
    setResponse(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {personalization?.businessName && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                Personalized
              </span>
            )}
            <div>
              <h3 className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
                Lead Response Simulator
              </h3>
              <p className="text-sm text-slate-500">
                {personalization?.businessName
                  ? `See how Capture AI responds for ${personalization.businessName}`
                  : "Paste any lead message and watch our AI respond instantly"}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Industry Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select your industry
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <selectedIndustryData.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">{selectedIndustryData.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    className="absolute z-20 top-full left-0 mt-2 w-full sm:w-64 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {INDUSTRIES.map((industry) => (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => {
                          setSelectedIndustry(industry.id);
                          setShowDropdown(false);
                          setResponse(null);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${
                          selectedIndustry === industry.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <industry.icon className={`w-5 h-5 ${selectedIndustry === industry.id ? "text-blue-600" : "text-slate-400"}`} />
                        <span className={`font-medium ${selectedIndustry === industry.id ? "text-blue-600" : "text-slate-700"}`}>
                          {industry.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Paste a lead message, email, or voicemail transcript
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={selectedIndustryData.examples[0]}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-slate-900 placeholder:text-slate-400"
            />

            {/* Example prompts */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-slate-500">Try an example:</span>
              {selectedIndustryData.examples.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700 transition-colors truncate max-w-[200px]"
                  title={example}
                >
                  {example.slice(0, 35)}...
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Test Response</span>
                </>
              )}
            </motion.button>

            {response && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors font-medium active:scale-95 focus:ring-2 focus:ring-blue-500/20"
              >
                Reset
              </button>
            )}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Response Section */}
          <AnimatePresence>
            {response && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* AI Response */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        {!isComplete && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Response Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-blue-700">Capture AI</span>
                        <IntentBadge intent={response.intent} animate={isComplete} />
                      </div>
                      <p className="text-slate-800 leading-relaxed">
                        &ldquo;{displayedText}&rdquo;
                        {!isComplete && (
                          <span className="inline-block w-0.5 h-5 bg-blue-600 ml-0.5 animate-pulse" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lead Intelligence Panel */}
                <AnimatePresence>
                  {isComplete && (
                    <motion.div
                      className="grid md:grid-cols-2 gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Lead Score */}
                      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <LeadScoreIndicator score={response.leadScore} />
                      </div>

                      {/* CRM Fields */}
                      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <CRMFieldsDisplay data={response.suggestedCrmFields} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
