import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TypewriterOptions {
  text: string;
  isActive: boolean;
  speed?: number;           // Milliseconds per character (default: 45ms)
  delay?: number;           // Initial delay before typing starts (default: 0ms)
  onComplete?: () => void;  // Callback when typing completes
}

export interface TypewriterResult {
  displayText: string;
  isComplete: boolean;
  progress: number;         // 0-100 percentage
  reset: () => void;        // Manual reset function
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const TYPEWRITER_CONFIG = {
  DEFAULT_SPEED: 45,        // Natural speaking pace (22 chars/sec)
  FAST_SPEED: 30,           // Faster typing
  SLOW_SPEED: 65,           // Slower, more dramatic
  PAUSE_ON_PUNCTUATION: {
    '.': 300,               // Longer pause for period
    '!': 300,               // Longer pause for exclamation
    '?': 300,               // Longer pause for question
    ',': 150,               // Short pause for comma
    ':': 200,               // Medium pause for colon
    ';': 200,               // Medium pause for semicolon
  },
} as const;

// ============================================================================
// CUSTOM HOOK: useTypewriter
// ============================================================================

export function useTypewriter({
  text,
  isActive,
  speed = TYPEWRITER_CONFIG.DEFAULT_SPEED,
  delay = 0,
  onComplete,
}: TypewriterOptions): TypewriterResult {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(isActive);

  // Update ref when isActive changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // ============================================================================
  // RESET FUNCTION
  // ============================================================================

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, []);

  // ============================================================================
  // MAIN TYPEWRITER EFFECT
  // ============================================================================

  useEffect(() => {
    // If not active or no text, stop typing
    if (!isActive || !text) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // If we've already completed typing this text, don't restart
    if (isComplete && displayText === text) {
      return;
    }

    function typeNextChar() {
      if (!isActiveRef.current) return;

      setCurrentIndex((prevIndex) => {
        // If we've reached the end of the text
        if (prevIndex >= text.length) {
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
          return prevIndex;
        }

        // Get the next character and update display
        const nextChar = text[prevIndex];
        setDisplayText(text.substring(0, prevIndex + 1));

        // Calculate delay for next character
        let nextDelay = speed;

        // Add pause if character is punctuation
        const pauseTime = TYPEWRITER_CONFIG.PAUSE_ON_PUNCTUATION[
          nextChar as keyof typeof TYPEWRITER_CONFIG.PAUSE_ON_PUNCTUATION
        ];

        if (pauseTime) {
          nextDelay += pauseTime;
        }

        // Schedule next character
        timeoutRef.current = setTimeout(typeNextChar, nextDelay);

        return prevIndex + 1;
      });
    }

    // Start typing after initial delay
    const startDelay = currentIndex === 0 ? delay : 0;
    timeoutRef.current = setTimeout(typeNextChar, startDelay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isActive, text, speed, delay, onComplete, isComplete, displayText, currentIndex]);

  // ============================================================================
  // RESET WHEN TEXT CHANGES
  // ============================================================================

  useEffect(() => {
    reset();
  }, [text, reset]);

  // ============================================================================
  // CLEANUP ON UNMOUNT
  // ============================================================================

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ============================================================================
  // CALCULATE PROGRESS
  // ============================================================================

  const progress = text.length > 0 ? (currentIndex / text.length) * 100 : 0;

  return {
    displayText,
    isComplete,
    progress,
    reset,
  };
}
