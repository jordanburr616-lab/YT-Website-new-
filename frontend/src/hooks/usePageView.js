import { useEffect, useRef } from "react";
import { trackEvent } from "../utils/analytics";

export function usePageView(page) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    hasTracked.current = true;
    trackEvent("page_view", page);
  }, [page]);
}