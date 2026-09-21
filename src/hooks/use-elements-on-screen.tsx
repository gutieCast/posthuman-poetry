import { RefObject, useEffect, useRef } from "react";

const useElementsOnScreen = (
  options: IntersectionObserverInit,
  onlyFirst: boolean = false // New parameter to control single vs multiple visibility
): RefObject<HTMLElement[]> => {
  const containerRefs = useRef<HTMLElement[]>([]);

  const onChangeSectionView = (entries: IntersectionObserverEntry[]) => {
    if (onlyFirst) {
      // Only mark the first intersecting element as visible
      const allRefs = containerRefs.current;

      // Find the first intersecting element
      let firstVisibleElement: HTMLElement | null = null;

      for (const ref of allRefs) {
        const rect = ref.getBoundingClientRect();
        // Check if element is in viewport
        if (rect.left < window.innerWidth && rect.right > 0) {
          firstVisibleElement = ref;
          break; // Stop at the first visible one
        }
      }

      // Apply classes based on whether it's the first visible element
      allRefs.forEach(ref => {
        if (ref === firstVisibleElement) {
          ref.classList.add("is-visible");
          ref.classList.remove("is-hidden");
        } else {
          ref.classList.remove("is-visible");
          ref.classList.add("is-hidden");
        }
      });
    } else {
      // Original behavior: mark all intersecting elements as visible
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.add("is-visible");
          target.classList.remove("is-hidden");
        } else {
          target.classList.remove("is-visible");
          target.classList.add("is-hidden");
        }
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onChangeSectionView, options);
    const currentRefs = containerRefs.current;
    currentRefs.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      currentRefs.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
      observer.disconnect();
    };
  }, [containerRefs, options]);

  return containerRefs;
};

export default useElementsOnScreen;
