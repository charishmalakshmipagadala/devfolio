import { useEffect, useRef } from "react";
import { usePortfolioStore } from "../store/portfolioStore";

export function useAutoSave() {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const setIsSaved = usePortfolioStore((state) => state.setIsSaved);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // skip showing "saved" on initial load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsSaved(true);
    const timer = setTimeout(() => setIsSaved(false), 1500);
    return () => clearTimeout(timer);
  }, [portfolio]);
}
