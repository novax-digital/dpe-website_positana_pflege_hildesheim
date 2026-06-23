import { useEffect } from "react";

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const observe = () => {
      const elements = document.querySelectorAll(".fade-in-section:not(.is-visible)");
      elements.forEach((el) => observer.observe(el));
    };

    observe();

    // Re-observe when new elements are added to the DOM (e.g. async data)
    const mutationObserver = new MutationObserver(() => observe());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};
