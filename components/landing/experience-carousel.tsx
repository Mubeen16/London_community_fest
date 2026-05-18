"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { experienceItems, getExperienceImage } from "@/data/activities";
import { PaperCard } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL_MS = 4500;
const RESUME_DELAY_MS = 5000;
const PROGRAMMATIC_SCROLL_MS = 600;

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
        "relative flex h-full w-full flex-col bg-paper-50 p-1.5 shadow-xl shadow-forest-950/40",
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

      <div className="tape-strip" aria-hidden />
    </figure>
  );
}

export function ExperienceCarousel() {
  const scrollRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const isProgrammaticRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [autoEnabled, setAutoEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const reduced = media.matches;
      setReduceMotion(reduced);
      setAutoEnabled(!reduced);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
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

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;

    isProgrammaticRef.current = true;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    indexRef.current = index;

    window.setTimeout(() => {
      isProgrammaticRef.current = false;
    }, PROGRAMMATIC_SCROLL_MS);
  }, []);

  const advance = useCallback(() => {
    const next = (indexRef.current + 1) % experienceItems.length;
    scrollToIndex(next);
  }, [scrollToIndex]);

  useEffect(() => {
    if (!autoEnabled) return;

    const intervalId = window.setInterval(() => {
      if (pausedRef.current) return;
      advance();
    }, AUTO_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [advance, autoEnabled]);

  useEffect(() => clearResumeTimer, [clearResumeTimer]);

  function handleUserInteraction() {
    if (!autoEnabled) return;
    pauseAuto();
    syncIndexFromScroll();
  }

  function handleScroll() {
    if (isProgrammaticRef.current) return;
    handleUserInteraction();
  }

  return (
    <PaperCard className="mt-8 px-4 py-5 sm:px-6" torn>
      <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">
        Programme
      </p>

      <div
        className="relative mt-6 -mx-1"
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
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-paper-100 to-transparent sm:w-12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-paper-100 to-transparent sm:w-12"
          aria-hidden
        />

        <ul
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto py-2 pb-3 snap-x snap-mandatory sm:gap-5"
          aria-label="Festival programme highlights"
          onScroll={handleScroll}
          onTouchStart={handleUserInteraction}
          onPointerDown={handleUserInteraction}
        >
          {experienceItems.map((item, index) => (
            <li
              key={item.id}
              className="w-[min(80vw,240px)] shrink-0 snap-center list-none sm:w-[228px]"
            >
              <ExperienceCard item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-center font-sans text-xs text-ink-muted">
        {autoEnabled
          ? "Swipe to explore · moves automatically when idle"
          : "Swipe to explore the programme"}
      </p>
    </PaperCard>
  );
}
