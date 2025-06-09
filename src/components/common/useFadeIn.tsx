import { useRef, useEffect, useCallback } from "react";

export default function useFadeIn() {
  const domRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const { current } = domRef;
    if (!current) return;

    if (entry.isIntersecting) {
      current.style.transitionProperty = "opacity, transform";
      current.style.transitionDuration = "1s";
      current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
      current.style.transitionDelay = "0s";
      current.style.opacity = "1";
      current.style.transform = "translate3d(0, 0, 0)";
    } else {
      current.style.opacity = "0";
      current.style.transform = "translate3d(0, 20%, 0)";
    }
  }, []);

  useEffect(() => {
    const { current } = domRef;
    if (!current) return;

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
      rootMargin: "0px",
    });

    observer.observe(current);
    return () => observer.disconnect();
  }, [handleScroll]);

  return {
    ref: domRef,
    style: {
      opacity: 0,
      transform: "translate3d(0, 50%, 0)",
    } as React.CSSProperties,
  };
}
