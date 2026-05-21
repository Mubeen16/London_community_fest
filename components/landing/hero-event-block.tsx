import type { ReactNode } from "react";
import { eventConfig } from "@/lib/config/event";
import { PaperCard } from "@/components/ui/paper-card";
import { VenueDirectionsLink } from "@/components/ui/venue-directions-link";
import { cn } from "@/lib/utils";

const paperLabel =
  "font-sans text-xs font-semibold uppercase tracking-wider text-crimson-400";
const paperValue = "font-sans text-lg font-semibold leading-snug text-ink";
const paperMuted = "font-sans text-sm leading-relaxed text-ink-muted";
const paperPrice = "font-serif text-2xl italic text-gold-400";

function parseHeroDate(dateDisplay: string) {
  const [weekday, day, month, year] = dateDisplay
    .replace(",", "")
    .toUpperCase()
    .split(" ");
  return { weekday, day, month, year };
}

function HeroDetailBox({
  label,
  value,
  secondaryValue,
  action,
  className,
  labelClassName,
  valueClassName,
  secondaryClassName,
}: {
  label: string;
  value: string;
  secondaryValue?: string;
  action?: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  secondaryClassName?: string;
}) {
  return (
    <PaperCard
      className={cn(
        "relative flex min-h-[7rem] flex-col justify-center gap-2 px-4 py-4 sm:min-h-[8.5rem]",
        className,
      )}
      torn
    >
      <p className={cn(paperLabel, labelClassName)}>{label}</p>
      <p className={cn(paperValue, valueClassName)}>{value}</p>
      {secondaryValue ? (
        <p className={cn(paperMuted, secondaryClassName)}>{secondaryValue}</p>
      ) : null}
      {action}
    </PaperCard>
  );
}

function HeroEntryBox({ className }: { className?: string }) {
  const { pricing } = eventConfig;

  return (
    <PaperCard
      className={cn(
        "relative flex min-h-[8rem] flex-col items-center justify-center gap-2 px-5 py-5 text-center sm:min-h-[9.5rem]",
        className,
      )}
      torn
    >
      <p className={cn(paperLabel, "text-xl font-extrabold uppercase sm:text-2xl")}>
        Entry
      </p>
      <p className="font-sans text-lg font-semibold text-ink sm:text-xl">
        Adults ({pricing.adult.ageRange}) —{" "}
        <span className={paperPrice}>{pricing.adult.display}</span>
      </p>
      <p className="font-sans text-lg font-semibold text-ink sm:text-xl">
        Children {pricing.child.ageRange} — Free
      </p>
    </PaperCard>
  );
}

export function HeroEventBlock({ className }: { className?: string }) {
  const { venue } = eventConfig;
  const { weekday, day, month, year } = parseHeroDate(eventConfig.dateDisplay);
  const locationLine = venue.name;
  const locationDetail = `London ${venue.postcode}`;

  return (
    <div
      className={cn(
        "mt-6 grid w-full grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4 md:gap-4",
        className,
      )}
    >
      <PaperCard
        className="relative flex min-h-[8rem] flex-col items-center justify-center px-5 py-5 text-center min-[420px]:col-span-2 sm:min-h-[9.5rem] md:col-span-1"
        torn
      >
        <span className="tape-strip" aria-hidden />
        <p className="font-sans text-lg font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {weekday}
        </p>
        <p className="mt-1 font-sans text-4xl font-bold uppercase tracking-wide text-crimson-400 sm:text-5xl">
          {day} {month}
        </p>
        <p className="font-serif text-6xl font-bold leading-none text-ink sm:text-7xl">{year}</p>
      </PaperCard>

      <HeroDetailBox
        label="Time"
        value={eventConfig.timeDisplay}
        className="min-h-[8rem] items-center justify-center gap-2 px-5 py-5 text-center sm:min-h-[9.5rem]"
        labelClassName="text-xl font-extrabold sm:text-2xl"
        valueClassName="text-3xl font-bold leading-snug tracking-tight sm:text-4xl"
      />

      <HeroDetailBox
        label="Location"
        value={locationLine}
        secondaryValue={locationDetail}
        className="min-h-[8rem] items-center justify-center gap-2 px-5 py-5 text-center sm:min-h-[9.5rem]"
        labelClassName="text-xl font-extrabold sm:text-2xl"
        valueClassName="text-2xl font-bold sm:text-3xl"
        secondaryClassName="text-ink text-lg font-semibold sm:text-xl"
        action={
          <VenueDirectionsLink
            theme="light"
            className="mt-1 inline-flex justify-center"
          />
        }
      />

      <HeroEntryBox className="min-[420px]:col-span-2 md:col-span-1" />

      <p className="flex flex-wrap gap-x-8 gap-y-1 font-sans text-sm text-cream-muted min-[420px]:col-span-2 md:col-span-4">
        <span>
          <span className="font-semibold text-gold-400">
            {eventConfig.expectedAttendance}
          </span>{" "}
          expected
        </span>
        <span>
          <span className="font-semibold text-gold-400">
            {eventConfig.foodStallCount}
          </span>{" "}
          food stalls
        </span>
      </p>
    </div>
  );
}
