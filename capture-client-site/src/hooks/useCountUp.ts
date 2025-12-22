import { useEffect, useState } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  isActive?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  isActive = true,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [start, end, duration, isActive]);

  return count;
}
