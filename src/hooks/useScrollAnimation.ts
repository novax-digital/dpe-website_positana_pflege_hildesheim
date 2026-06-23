import { useEffect } from "react";

export const useScrollAnimation = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".fade-in-section"));

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      document.body.classList.add("scroll-animations-ready");
      return;
    }

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        element.classList.add("is-visible");
      }
    });

    document.body.classList.add("scroll-animations-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>(".fade-in-section:not(.is-visible)").forEach((element) => {
        observer.observe(element);
      });
    };

    observe();

    const mutationObserver = new MutationObserver(() => observe());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.body.classList.remove("scroll-animations-ready");
    };
  }, []);
};
