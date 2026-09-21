import { useEffect } from "react";


type ScrollDirection = 'down' | 'up';

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DURATIONS = {
  ENTER_FROM_TOP: 400,
  ENTER_FROM_BOTTOM: 500,
} as const;

const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: [0, 0.01, 0.05, 0.1],
  rootMargin: '100px 0px 100px 0px',
};

const VISIBILITY_CHECK_DELAY = 100;

/**
 * Hook to manage scroll-triggered animations with directional awareness
 */
const useScrollAnimation = (sectionRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    // Animation state
    let lastScrollY = window.scrollY;
    let scrollDirection: ScrollDirection = 'down';
    let hasBeenTriggered = false;
    let hasAnimatedDown = false;
    let hasAnimatedUp = false;

    const updateScrollDirection = (): ScrollDirection => {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
      return scrollDirection;
    };

    const applyVisibleState = (element: Element) => {
      element.classList.add('is-visible');
      element.classList.remove('is-hidden');
    };

    const applyHiddenState = (element: Element) => {
      element.classList.remove('is-visible', 'enter-from-top', 'enter-from-bottom');
      element.classList.add('is-hidden');
    };

    const applyDirectionalAnimation = (
      element: Element,
      direction: ScrollDirection,
      duration: number
    ) => {
      const animationClass = direction === 'up' ? 'enter-from-top' : 'enter-from-bottom';
      element.classList.add(animationClass);

      setTimeout(() => {
        element.classList.remove(animationClass);
      }, duration);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const direction = updateScrollDirection();
        const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;

        if (isIntersecting) {
          if (!hasBeenTriggered) {
            // First appearance
            applyVisibleState(entry.target);
            hasBeenTriggered = true;

            if (direction === 'down') {
              hasAnimatedDown = true;
            } else {
              hasAnimatedUp = true;
            }
          } else {
            // Re-entering viewport
            const shouldAnimateUp = direction === 'up' && !hasAnimatedUp;
            const shouldAnimateDown = direction === 'down' && !hasAnimatedDown;

            entry.target.classList.remove('is-hidden', 'exit-up', 'exit-down');
            applyVisibleState(entry.target);

            if (shouldAnimateUp) {
              applyDirectionalAnimation(entry.target, 'up', ANIMATION_DURATIONS.ENTER_FROM_TOP);
              hasAnimatedUp = true;
            } else if (shouldAnimateDown) {
              applyDirectionalAnimation(entry.target, 'down', ANIMATION_DURATIONS.ENTER_FROM_BOTTOM);
              hasAnimatedDown = true;
            }
          }
        } else {
          // Exiting viewport
          if (hasBeenTriggered && entry.intersectionRatio === 0) {
            applyHiddenState(entry.target);
            entry.target.classList.add(direction === 'up' ? 'exit-up' : 'exit-down');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, OBSERVER_CONFIG);

    const checkInitialVisibility = () => {
      if (!currentSection || hasBeenTriggered) return;

      const rect = currentSection.getBoundingClientRect();
      const windowHeight = window.innerHeight * 0.8;
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;

      if (isInViewport) {
        applyVisibleState(currentSection);
        hasBeenTriggered = true;
      }
    };

    const handleScrollBackup = () => {
      if (!currentSection || hasBeenTriggered) return;

      const rect = currentSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 1.2 && rect.bottom > -windowHeight * 0.2) {
        applyVisibleState(currentSection);
        hasBeenTriggered = true;
        window.removeEventListener('scroll', handleScrollBackup);
      }
    };

    const timeoutId = setTimeout(() => {
      checkInitialVisibility();
      observer.observe(currentSection);
      window.addEventListener('scroll', handleScrollBackup, { passive: true });
    }, VISIBILITY_CHECK_DELAY);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollBackup);
    };
  }, [sectionRef]);
};

export default useScrollAnimation