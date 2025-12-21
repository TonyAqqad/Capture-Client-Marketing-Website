"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  Play,
  Pause,
  RotateCcw,
  Bot,
  User,
  Phone,
  Signal,
  Clock,
} from "lucide-react";
import type { Scenario, TranscriptMessage } from "./data/scenarios";

// ============================================
// SCENARIO PLAYER - Cinematic Conversation Playback
// ============================================

interface ScenarioPlayerProps {
  scenario: Scenario;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export function ScenarioPlayer({ scenario, onComplete, autoPlay = true }: ScenarioPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleMessages = scenario.transcript.slice(0, currentIndex + 1);
  const progress = ((currentIndex + 1) / scenario.transcript.length) * 100;

  // Auto-advance messages
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const timer = setTimeout(() => {
      if (currentIndex < scenario.transcript.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
        setIsPlaying(false);
        onComplete?.();
      }
    }, 2500); // Time between messages

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, isComplete, scenario.transcript.length, onComplete]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const handlePlayPause = useCallback(() => {
    if (isComplete) {
      // Restart
      setCurrentIndex(0);
      setIsComplete(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isComplete, isPlaying]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsComplete(false);
    setIsPlaying(true);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Phone Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200 px-6 py-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{scenario.title}</h4>
              <p className="text-xs text-slate-500">{scenario.callerPersona}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Call status */}
            <div className="flex items-center gap-1.5">
              {isPlaying && !isComplete && (
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
              <Signal className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">{scenario.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-100 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Transcript - scrollable within flex container */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-slate-50"
      >
        <AnimatePresence mode="popLayout">
          {visibleMessages.map((message, index) => (
            <MessageBubble
              key={`${scenario.id}-${index}`}
              message={message}
              isNew={index === currentIndex && isPlaying}
            />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isPlaying && !isComplete && currentIndex < scenario.transcript.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-4"
          >
            <div className="flex items-center gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-slate-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-slate-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-slate-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Audio Waveform */}
      <div className="flex-shrink-0 px-6 py-4 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center justify-center gap-0.5 h-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-blue-600 to-cyan-500"
              animate={{
                height: isPlaying && !isComplete
                  ? [4, 16 + Math.sin(i * 0.5) * 12, 4]
                  : 4,
                opacity: isPlaying && !isComplete ? [0.4, 1, 0.4] : 0.3,
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 flex items-center justify-center gap-4 px-6 py-4 border-t border-slate-200 bg-white rounded-b-2xl">
        <motion.button
          onClick={handleRestart}
          className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </motion.button>

        <motion.button
          onClick={handlePlayPause}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(37, 99, 235, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying && !isComplete ? (
            <Pause className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-1" />
          )}
        </motion.button>

        {/* Message counter */}
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          <span className="text-sm font-medium text-slate-600">
            {currentIndex + 1}/{scenario.transcript.length}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MESSAGE BUBBLE COMPONENT
// ============================================

interface MessageBubbleProps {
  message: TranscriptMessage;
  isNew: boolean;
}

function MessageBubble({ message, isNew }: MessageBubbleProps) {
  const isAI = message.speaker === "AI";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
        ${isAI
          ? "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md"
          : "bg-slate-200"
        }
      `}>
        {isAI ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${isAI ? "" : "text-right"}`}>
        <div className={`
          inline-block px-4 py-3 rounded-2xl
          ${isAI
            ? "bg-white border border-slate-200 rounded-tl-sm shadow-sm"
            : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-sm shadow-md"
          }
        `}>
          <p className={`text-sm leading-relaxed ${isAI ? "text-slate-700" : "text-white"}`}>
            {message.text}
          </p>
        </div>
        <p className="text-xs text-slate-400 mt-1 px-2">
          {message.timestamp}
        </p>
      </div>
    </motion.div>
  );
}
