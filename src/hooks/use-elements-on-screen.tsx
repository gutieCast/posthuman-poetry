import { RefObject, useEffect, useRef } from "react";

const useElementsOnScreen = (
  options: IntersectionObserverInit
): RefObject<HTMLElement[]> => {
  const containerRefs = useRef<HTMLElement[]>([]);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
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
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
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
