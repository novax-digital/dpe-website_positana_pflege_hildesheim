import { useEffect } from "react";

declare global {
  interface Window {
    __positanaInitScrollAnimations?: () => void;
  }
}

export const useScrollAnimation = () => {
  useEffect(() => {
    window.__positanaInitScrollAnimations?.();
  }, []);
};
