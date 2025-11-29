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
    if (!isActive) {
      setDisplayedText(text);
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, isActive]);

  return displayedText;
}
