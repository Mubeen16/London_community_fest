import { eventConfig } from "@/lib/config/event";
import { PaperCard } from "@/components/ui/paper-card";
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
  className,
}: {
  label: string;
  value: string;
  secondaryValue?: string;
  className?: string;
}) {
  return (
    <PaperCard
      className={cn(
        "relative flex min-h-[7rem] flex-col justify-center gap-2 px-4 py-4 sm:min-h-[8.5rem]",
        className,
      )}
      torn
    >
      <p className={paperLabel}>{label}</p>
      <p className={paperValue}>{value}</p>
      {secondaryValue ? <p className={paperMuted}>{secondaryValue}</p> : null}
    </PaperCard>
  );
}

function HeroEntryBox({ className }: { className?: string }) {
  const { pricing } = eventConfig;

  return (
    <PaperCard
      className={cn(
        "relative flex min-h-[7rem] flex-col justify-center gap-2 px-4 py-4 sm:min-h-[8.5rem]",
        className,
      )}
      torn
    >
      <p className={paperLabel}>Entry</p>
      <p className="font-sans text-ink">
        Adults ({pricing.adult.ageRange}):{" "}
        <span className={paperPrice}>{pricing.adult.display}</span>
      </p>
      <p className={paperMuted}>
        Children ({pricing.child.ageRange}): {pricing.child.display}
      </p>
    </PaperCard>
  );
}

export function HeroEventBlock({ className }: { className?: string }) {
  const { venue } = eventConfig;
  const { weekday, day, month, year } = parseHeroDate(eventConfig.dateDisplay);
  const locationLine = `${venue.name}, London ${venue.postcode.split(" ")[0]}`;

  return (
    <div
      className={cn(
        "mt-6 grid w-full grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4 md:gap-4",
        className,
      )}
    >
      <PaperCard
        className="relative flex min-h-[7rem] flex-col justify-center px-5 py-4 min-[420px]:col-span-2 sm:min-h-[8.5rem] md:col-span-1"
        torn
      >
        <span className="tape-strip" aria-hidden />
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
          {weekday}
        </p>
        <p className="mt-1 font-sans text-xl font-bold uppercase tracking-wide text-crimson-400 sm:text-2xl">
          {day} {month}
        </p>
        <p className="font-serif text-3xl font-bold text-ink sm:text-4xl">{year}</p>
      </PaperCard>

      <HeroDetailBox label="Time" value={eventConfig.timeDisplay} />

      <HeroDetailBox label="Location" value={locationLine} />

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
