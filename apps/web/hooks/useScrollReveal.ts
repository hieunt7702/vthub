'use client';

import { useEffect } from 'react';

/**
 * Hook to automatically reveal elements with .scroll-reveal / .scroll-reveal-left / .scroll-reveal-right
 * as user scrolls up and down the page (similar to Dribbble / Keyvo / modern fintech animations).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Re-trigger when scrolling back up/down if above/below viewport
          const rect = entry.boundingClientRect;
          if (rect.top > window.innerHeight || rect.bottom < 0) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}
