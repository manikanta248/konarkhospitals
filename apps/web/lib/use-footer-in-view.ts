"use client";

import { useEffect, useState } from "react";

/**
 * True once the site footer scrolls into view. The chat bubble and FAQ callout are fixed to
 * the bottom-right corner, so on mobile they cover the footer's address and map text when the
 * visitor gets that far. Hiding them while the footer is visible avoids the overlap.
 */
export function useFooterInView() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return inView;
}
