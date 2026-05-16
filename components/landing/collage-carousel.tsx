"use client";

import { useEffect, useState } from "react";
import { collagePhotos } from "@/data/activities";
import { Polaroid } from "@/components/ui/polaroid";
import { cn } from "@/lib/utils";

export function CollageCarousel() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const loopPhotos = reduceMotion
    ? collagePhotos
    : [...collagePhotos, ...collagePhotos];

  return (
    <div className="relative -mx-4 sm:-mx-0">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-forest-800 to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-forest-800 to-transparent sm:w-14"
        aria-hidden
      />

      <div
        className={cn(
          reduceMotion && "scrollbar-hide snap-x snap-mandatory overflow-x-auto pb-2",
          !reduceMotion && "overflow-hidden",
        )}
      >
        <div
          className={cn(
            "flex w-max gap-5 px-4 sm:px-1",
            !reduceMotion && "collage-marquee-track",
          )}
        >
          {loopPhotos.map((photo, index) => (
            <Polaroid
              key={`${photo.id}-${index}`}
              label={photo.label}
              src={photo.src}
              alt={photo.alt}
              rotate={index % 2 === 0 ? "-rotate-2" : "rotate-2"}
              className={cn(
                "w-44 shrink-0 sm:w-48",
                reduceMotion && "snap-center",
              )}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-center font-sans text-xs text-cream-faint">
        {reduceMotion
          ? "Swipe to explore highlights"
          : "Hover to pause · auto-scrolling"}
      </p>
    </div>
  );
}
