import { useState, useEffect, useRef } from 'react';

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

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  };

  // ============================================================================
  // MAIN TYPEWRITER EFFECT
  // ============================================================================

  useEffect(() => {
    // If not active, stop typing
    if (!isActive) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // If just activated, reset and start from beginning
    if (isActive && displayText === '' && currentIndex === 0) {
      // Initial delay before typing starts
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          startTyping();
        }, delay);
        return;
      } else {
        startTyping();
      }
    }

    function startTyping() {
      if (!isActiveRef.current) return;

      // If we've reached the end of the text
      if (currentIndex >= text.length) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // Get the next character
      const nextChar = text[currentIndex];
      setDisplayText(prev => prev + nextChar);
      setCurrentIndex(prev => prev + 1);

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
      timeoutRef.current = setTimeout(() => {
        startTyping();
      }, nextDelay);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isActive, currentIndex, text, speed, delay, onComplete, displayText]);

  // ============================================================================
  // RESET WHEN TEXT CHANGES
  // ============================================================================

  useEffect(() => {
    reset();
  }, [text]);

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

// ============================================================================
// UTILITY: useMultipleTypewriters
// For managing multiple typewriter instances with sequential activation
// ============================================================================

export interface MultiTypewriterLine {
  text: string;
  speed?: number;
  delay?: number;
}

export function useMultipleTypewriters(
  lines: MultiTypewriterLine[],
  isActive: boolean,
  sequentialDelay: number = 0 // Delay between lines
) {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  // Reset when isActive changes to true
  useEffect(() => {
    if (isActive) {
      setActiveLineIndex(0);
      setAllComplete(false);
    }
  }, [isActive]);

  // Create typewriter results for all lines
  const results = lines.map((line, index) => {
    const isLineActive = isActive && index === activeLineIndex;

    return useTypewriter({
      text: line.text,
      isActive: isLineActive,
      speed: line.speed,
      delay: line.delay,
      onComplete: () => {
        // Move to next line after sequential delay
        if (index < lines.length - 1) {
          setTimeout(() => {
            setActiveLineIndex(index + 1);
          }, sequentialDelay);
        } else {
          setAllComplete(true);
        }
      },
    });
  });

  return {
    results,
    allComplete,
    currentLineIndex: activeLineIndex,
  };
}
