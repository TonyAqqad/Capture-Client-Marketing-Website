import { useEffect, useState, RefObject } from 'react';
import { createIOSOptimizedObserver, isIOSDevice } from '@/lib/ios-performance';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: UseInViewOptions = {}
): boolean {
  const { threshold = 0.1, triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detect iOS on mount
  useEffect(() => {
    setIsIOS(isIOSDevice());
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // iOS OPTIMIZATION: Use createIOSOptimizedObserver for better iOS performance
    // This uses lower threshold and larger root margin on iOS
    const observer = createIOSOptimizedObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        if (inView) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      isIOS
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, triggerOnce, isIOS]);

  return isInView;
}
