"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { experienceItems, getExperienceImage } from "@/data/activities";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL_MS = 3200;
const RESUME_DELAY_MS = 4000;
const SCROLL_DURATION_MS = 480;

/** Alternating scrapbook tilt — matches collage polaroid strip */
const CARD_ROTATES = ["-rotate-2", "rotate-2", "-rotate-1"] as const;

interface ExperienceCardProps {
  item: (typeof experienceItems)[number];
  index: number;
}

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const image = getExperienceImage(item.imageKey);
  const rotate = CARD_ROTATES[index % CARD_ROTATES.length];

  return (
    <figure
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden bg-paper-50 p-1.5 shadow-xl shadow-forest-950/40",
        "transition-shadow hover:shadow-2xl",
        rotate,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-900">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          unoptimized={image.src.startsWith("/images/")}
          sizes="260px"
          className="object-cover object-center"
        />
      </div>

      <figcaption className="flex flex-col gap-1 px-0.5 pt-2 pb-2.5">
        <h3 className="font-sans text-xs font-bold leading-snug text-ink">{item.title}</h3>
        <p className="font-sans text-xs leading-snug text-ink-muted">{item.description}</p>
      </figcaption>

      <span className="board-pin" aria-hidden />
    </figure>
  );
}

export function ExperienceCarousel() {
  const scrollRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);
  const isProgrammaticRef = useRef(false);
  const scrollAnimationRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoEnabled, setAutoEnabled] = useState(false);

  const cancelScrollAnimation = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 768px)");

    const update = () => {
      // Auto-advance on mobile can scroll the whole page (iOS scroll chaining); manual swipe only.
      setAutoEnabled(!reducedMotion.matches && !mobileViewport.matches);
    };

    update();
    reducedMotion.addEventListener("change", update);
    mobileViewport.addEventListener("change", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
      mobileViewport.removeEventListener("change", update);
    };
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, [clearResumeTimer]);

  const pauseAuto = useCallback(() => {
    pausedRef.current = true;
    scheduleResume();
  }, [scheduleResume]);

  const syncIndexFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;

    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    Array.from(el.children).forEach((child, i) => {
      const node = child as HTMLElement;
      const childCenter = node.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });

    indexRef.current = closest;
  }, []);

  const getScrollLeftForIndex = useCallback((el: HTMLUListElement, index: number) => {
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return null;
    return Math.max(0, child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2);
  }, []);

  const animateScrollTo = useCallback(
    (targetLeft: number) => {
      const el = scrollRef.current;
      if (!el) return;

      cancelScrollAnimation();
      isProgrammaticRef.current = true;

      const start = el.scrollLeft;
      const distance = targetLeft - start;
      if (Math.abs(distance) < 1) {
        isProgrammaticRef.current = false;
        return;
      }

      const startTime = performance.now();
      const lockedScrollY = window.scrollY;

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        el.scrollLeft = start + distance * eased;

        // Prevent iOS/Safari from chaining horizontal scroll into page scroll.
        if (window.scrollY !== lockedScrollY) {
          window.scrollTo(0, lockedScrollY);
        }

        if (progress < 1) {
          scrollAnimationRef.current = requestAnimationFrame(step);
          return;
        }

        scrollAnimationRef.current = null;
        isProgrammaticRef.current = false;
      };

      scrollAnimationRef.current = requestAnimationFrame(step);
    },
    [cancelScrollAnimation],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;

      const targetLeft = getScrollLeftForIndex(el, index);
      if (targetLeft === null) return;

      indexRef.current = index;
      animateScrollTo(targetLeft);
    },
    [animateScrollTo, getScrollLeftForIndex],
  );

  const advance = useCallback(() => {
    const next = (indexRef.current + 1) % experienceItems.length;
    scrollToIndex(next);
  }, [scrollToIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.4;
      },
      { threshold: [0, 0.4, 0.6], rootMargin: "-15% 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoEnabled) return;

    const intervalId = window.setInterval(() => {
      if (pausedRef.current || !inViewRef.current) return;
      advance();
    }, AUTO_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [advance, autoEnabled]);

  useEffect(() => clearResumeTimer, [clearResumeTimer]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScrollEnd = () => {
      if (!isProgrammaticRef.current) {
        syncIndexFromScroll();
      }
    };

    el.addEventListener("scrollend", onScrollEnd);
    return () => {
      el.removeEventListener("scrollend", onScrollEnd);
      cancelScrollAnimation();
    };
  }, [cancelScrollAnimation, syncIndexFromScroll]);

  function handleUserInteraction() {
    cancelScrollAnimation();
    isProgrammaticRef.current = false;
    if (!autoEnabled) {
      syncIndexFromScroll();
      return;
    }
    pauseAuto();
    syncIndexFromScroll();
  }

  function handleScroll() {
    if (isProgrammaticRef.current) return;
    handleUserInteraction();
  }

  return (
    <div className="mt-8">
      <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
        Programme
      </p>

      <div
        className="relative isolate mt-6 -mx-4 sm:-mx-6 md:-mx-8"
        onMouseEnter={() => {
          if (autoEnabled) pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (autoEnabled) {
            pausedRef.current = false;
          }
        }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-forest-800 to-transparent sm:w-16"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-forest-800 to-transparent sm:w-16"
          aria-hidden
        />

        <ul
          ref={scrollRef}
          className="scrollbar-hide flex touch-pan-x gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 py-2 pb-3 snap-x snap-mandatory sm:gap-5 sm:px-6 md:px-8"
          aria-label="Festival programme highlights"
          onScroll={handleScroll}
          onTouchStart={handleUserInteraction}
          onPointerDown={handleUserInteraction}
        >
          {experienceItems.map((item, index) => (
            <li
              key={item.id}
              className="w-[82vw] max-w-[240px] shrink-0 snap-center snap-always list-none sm:w-[228px]"
            >
              <ExperienceCard item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
