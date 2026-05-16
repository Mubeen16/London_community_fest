"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "@/lib/config/event";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
] as const;

export function HeroCountdown({ className }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(eventConfig.date),
  );

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(eventConfig.date));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(className)}
      aria-live="polite"
      aria-label={
        timeLeft.ended
          ? "The festival has started"
          : "Countdown to London Community Fest"
      }
    >
      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-cream-muted">
        {timeLeft.ended ? "We're on!" : "Countdown to the fest"}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-sm border border-cream/10 bg-cream/5 px-2 py-3 text-center sm:px-3"
          >
            <p className="font-sans text-2xl font-bold tabular-nums text-gold-400 sm:text-3xl">
              {String(timeLeft[key]).padStart(2, "0")}
            </p>
            <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-cream-muted sm:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
