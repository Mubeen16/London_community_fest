import { useEffect, useRef } from "react";

/** Keeps the success state visible in the viewport after submit (avoids jump to page top). */
export function useFormSuccessScroll(isSuccess: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSuccess || !containerRef.current) return;

    const element = containerRef.current;
    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [isSuccess]);

  return containerRef;
}
