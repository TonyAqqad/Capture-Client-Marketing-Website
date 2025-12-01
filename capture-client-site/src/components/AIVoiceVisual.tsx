"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useTypingEffect } from "@/hooks/useTypingEffect";

interface Message {
  id: number;
  type: "ai" | "caller";
  text: string;
}

interface CallScenario {
  caller: string;
  phone: string;
  business: string;
  messages: Message[];
  statuses: string[];
}

const callScenarios: CallScenario[] = [
  {
    caller: "Mike's Plumbing",
    phone: "+1 (555) 234-5678",
    business: "Plumbing Services",
    messages: [
      { id: 1, type: "ai", text: "Thank you for calling! How can I help you today?" },
      { id: 2, type: "caller", text: "Hi, I need help with my website's SEO. We're not showing up on Google." },
      { id: 3, type: "ai", text: "I'd be happy to help with that. Let me connect you with our SEO specialist. What's the best time for a consultation?" },
      { id: 4, type: "caller", text: "Tomorrow afternoon would be great." },
      { id: 5, type: "ai", text: "Perfect! I've scheduled a call for tomorrow at 2 PM. You'll receive a confirmation email shortly." },
    ],
    statuses: ["Call Answered", "Qualifying Lead", "Interest Confirmed", "Booking Appointment", "Appointment Booked"],
  },
  {
    caller: "Sarah's Dental Clinic",
    phone: "+1 (555) 876-5432",
    business: "Dental Practice",
    messages: [
      { id: 1, type: "ai", text: "Hello! Thanks for reaching out. How may I assist you?" },
      { id: 2, type: "caller", text: "I'm looking for help with Facebook ads for my dental practice." },
      { id: 3, type: "ai", text: "Excellent! We specialize in Facebook ads for healthcare businesses. May I ask what your current marketing challenges are?" },
      { id: 4, type: "caller", text: "We need more new patient appointments." },
      { id: 5, type: "ai", text: "Understood. I'm booking a strategy session with our ads expert. They'll show you how we've helped similar practices increase patient bookings by 40%." },
    ],
    statuses: ["Call Answered", "Qualifying Lead", "Needs Assessment", "Solution Presented", "Appointment Booked"],
  },
  {
    caller: "Tom's Auto Repair",
    phone: "+1 (555) 345-6789",
    business: "Auto Repair Shop",
    messages: [
      { id: 1, type: "ai", text: "Good afternoon! How can I help you today?" },
      { id: 2, type: "caller", text: "I want to get more customers through Google. Can you help with that?" },
      { id: 3, type: "ai", text: "Absolutely! We offer both Google Ads and local SEO services. Based on your industry, I'd recommend starting with local SEO to dominate Google Maps. Sound good?" },
      { id: 4, type: "caller", text: "Yes, that sounds perfect!" },
      { id: 5, type: "ai", text: "Great! I'm scheduling a free audit call where we'll analyze your current Google presence and create a custom growth plan. Does Wednesday at 10 AM work?" },
    ],
    statuses: ["Call Answered", "Qualifying Lead", "Recommending Solution", "Interest Confirmed", "Scheduling Audit"],
  },
];

export default function AIVoiceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("");

  const currentScenario = callScenarios[currentScenarioIndex];
  const currentMessage = currentScenario.messages[currentMessageIndex];

  const displayedText = useTypingEffect({
    text: currentMessage?.text || "",
    speed: 30,
    isActive: isInView && isTyping,
  });

  // Call duration timer
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Format call duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Update status based on message progress
  useEffect(() => {
    if (currentScenario.statuses[currentMessageIndex]) {
      setCurrentStatus(currentScenario.statuses[currentMessageIndex]);
    }
  }, [currentMessageIndex, currentScenario]);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isInView]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText === currentMessage?.text) {
      const timer = setTimeout(() => {
        if (currentMessageIndex < currentScenario.messages.length - 1) {
          setCurrentMessageIndex((prev) => prev + 1);
        } else {
          // Move to next scenario after a pause
          setTimeout(() => {
            const nextScenario = (currentScenarioIndex + 1) % callScenarios.length;
            setCurrentScenarioIndex(nextScenario);
            setCurrentMessageIndex(0);
            setCallDuration(0);
          }, 3000);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [displayedText, currentMessage, currentMessageIndex, currentScenario, currentScenarioIndex, isTyping]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="glass p-4 sm:p-6 lg:p-8 rounded-2xl shadow-glow"
      >
        {/* Header with caller info and waveform */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <motion.div
            key={currentScenarioIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center relative flex-shrink-0"
          >
            <span className="material-icons text-accent">phone_in_talk</span>
            {/* Ringing animation */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-full border-2 border-accent"
            />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenarioIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="min-w-0 flex-1"
            >
              <p className="text-sm sm:text-base text-foreground font-semibold truncate">
                {currentScenario.caller} - {formatDuration(callDuration)}
              </p>
              <p className="text-foreground-muted text-xs sm:text-sm truncate">{currentScenario.phone}</p>
            </motion.div>
          </AnimatePresence>
          <div className="ml-auto hidden sm:block">
            <Waveform isActive={isInView} />
          </div>
        </div>

        {/* Status Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStatus}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/30 mb-4 sm:mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="text-accent font-semibold text-xs sm:text-sm">{currentStatus}</span>
          </motion.div>
        </AnimatePresence>

        {/* Conversation */}
        <div className="space-y-3 sm:space-y-4 min-h-[220px] sm:min-h-[280px]">
          <AnimatePresence mode="sync">
            {currentScenario.messages.slice(0, currentMessageIndex + 1).map((msg, index) => (
              <motion.div
                key={`${currentScenarioIndex}-${msg.id}`}
                initial={{ opacity: 0, x: msg.type === "ai" ? -20 : 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={
                  msg.type === "ai"
                    ? "bg-primary/10 border border-primary/20 rounded-lg p-3 sm:p-4"
                    : "bg-surface/50 border border-surface-border rounded-lg p-3 sm:p-4"
                }
              >
                <p className="text-foreground-muted text-xs sm:text-sm mb-1 flex items-center gap-1.5 sm:gap-2">
                  {msg.type === "ai" ? (
                    <>
                      <span className="material-icons text-xs">smart_toy</span>
                      AI Agent
                    </>
                  ) : (
                    <>
                      <span className="material-icons text-xs">person</span>
                      {currentScenario.caller}
                    </>
                  )}
                </p>
                <p className="text-sm sm:text-base text-foreground">
                  {index === currentMessageIndex ? (
                    <span>
                      {displayedText}
                      {displayedText && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                          className="inline-block w-0.5 h-4 bg-accent ml-1 align-middle"
                        />
                      )}
                    </span>
                  ) : (
                    msg.text
                  )}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* AI Analysis Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-surface-border"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground-muted flex-wrap">
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="material-icons text-accent text-lg"
            >
              auto_awesome
            </motion.span>
            <span>AI analyzing conversation sentiment, intent & booking probability...</span>
            <ScanningEffect isActive={isInView} />
          </div>
        </motion.div>

        {/* Floating particles */}
        <FloatingParticles isActive={isInView} />
      </motion.div>
    </div>
  );
}

function Waveform({ isActive }: { isActive: boolean }) {
  const bars = [8, 6, 10, 7, 9, 6, 8, 7];

  return (
    <div className="flex gap-1 items-center h-10">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={
            isActive
              ? {
                  height: [`${height * 4}px`, `${height * 6}px`, `${height * 4}px`],
                }
              : { height: `${height * 4}px` }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
          className="w-1 bg-accent rounded-full"
        />
      ))}
    </div>
  );
}

function ScanningEffect({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-16 h-1 bg-surface/50 rounded-full overflow-hidden ml-2">
      <motion.div
        animate={
          isActive
            ? {
                x: ["-100%", "200%"],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
      />
    </div>
  );
}

function FloatingParticles({ isActive }: { isActive: boolean }) {
  const particles = [
    { x: "10%", y: "20%", delay: 0 },
    { x: "80%", y: "30%", delay: 1 },
    { x: "15%", y: "70%", delay: 2 },
    { x: "85%", y: "80%", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isActive
              ? {
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  y: [0, -30, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
          }}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
          }}
          className="w-2 h-2 bg-accent/50 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}
