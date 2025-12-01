import { useEffect, useState } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  isActive?: boolean;
}

export function useTypingEffect({
  text,
  speed = 50,
  isActive = true,
}: UseTypingEffectOptions): string {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    if (!isActive) {
      setDisplayedText(text);
      return;
    }

    // Reset to empty when text changes
    setDisplayedText('');
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex += 1;
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, speed, isActive]);

  return displayedText;
}
