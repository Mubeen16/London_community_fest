import { vendorTariffs } from "@/data/vendor-tariffs";
import { cn } from "@/lib/utils";

const tierAccent = {
  ink: {
    name: "text-ink",
    price: "text-ink",
    border: "border-paper-300",
  },
  slate: {
    name: "text-slate-500",
    price: "text-slate-500",
    border: "border-slate-300",
  },
  gold: {
    name: "text-gold-500",
    price: "text-gold-400",
    border: "border-gold-300",
  },
} as const;

interface VendorTariffGridProps {
  compact?: boolean;
  /** Vertical list for sidebar layout on /vendors */
  stacked?: boolean;
  hideTitle?: boolean;
}

export function VendorTariffGrid({
  compact = false,
  stacked = false,
  hideTitle = false,
}: VendorTariffGridProps) {
  if (compact && stacked) {
    return (
      <div>
        <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {vendorTariffs.title}
        </p>
        <ul className="mt-3 space-y-2">
          {vendorTariffs.tiers.map((tier) => {
            const accent = tierAccent[tier.accent as keyof typeof tierAccent];

            return (
              <li
                key={tier.name}
                className={cn(
                  "rounded-md border bg-paper-50 px-3 py-2.5",
                  accent.border,
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className={cn("font-sans text-[10px] font-bold uppercase", accent.name)}>
                    {tier.name}
                  </p>
                  <p className={cn("font-serif text-lg leading-none", accent.price)}>
                    {tier.price}
                  </p>
                </div>
                <p className="mt-1 font-sans text-[11px] text-ink-muted">{tier.dimensions}</p>
              </li>
            );
          })}
        </ul>
        <ul className="mt-3 space-y-1 border-t border-paper-300/80 pt-3">
          {vendorTariffs.inclusions.map((item) => (
            <li key={item} className="font-sans text-[11px] leading-snug text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (compact) {
    return (
      <div>
        {!hideTitle && (
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {vendorTariffs.title}
          </p>
        )}
        <ul
          className={cn(
            "grid grid-cols-1 gap-2 min-[420px]:grid-cols-3",
            !hideTitle && "mt-3",
          )}
        >
          {vendorTariffs.tiers.map((tier) => {
            const accent = tierAccent[tier.accent as keyof typeof tierAccent];

            return (
              <li
                key={tier.name}
                className={cn(
                  "rounded-md border bg-paper-50 px-2 py-2.5 text-center",
                  accent.border,
                )}
              >
                <p className={cn("font-sans text-[10px] font-bold uppercase", accent.name)}>
                  {tier.name}
                </p>
                <p className={cn("mt-0.5 font-serif text-lg leading-none", accent.price)}>
                  {tier.price}
                </p>
                <p className="mt-1 font-sans text-[10px] text-ink-muted">{tier.dimensions}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 break-words font-sans text-[11px] leading-snug text-ink-muted">
          {vendorTariffs.inclusions.join(" · ")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-serif text-xl text-ink sm:text-2xl">{vendorTariffs.title}</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {vendorTariffs.tiers.map((tier) => {
          const accent = tierAccent[tier.accent as keyof typeof tierAccent];

          return (
            <li
              key={tier.name}
              className={cn(
                "flex flex-col rounded-lg border bg-paper-50 px-4 py-5 text-center",
                accent.border,
              )}
            >
              <p className={cn("font-sans text-sm font-bold uppercase tracking-wide", accent.name)}>
                {tier.name}
              </p>
              <p className={cn("mt-2 font-serif text-3xl", accent.price)}>{tier.price}</p>
              <p className="mt-2 font-sans text-sm font-semibold text-ink">{tier.dimensions}</p>
              <p className="mt-2 flex-1 font-sans text-xs leading-relaxed text-ink-muted">
                {tier.note}
              </p>
            </li>
          );
        })}
      </ul>
      <ul className="mt-5 space-y-1 border-t border-paper-300/80 pt-5">
        {vendorTariffs.inclusions.map((item) => (
          <li key={item} className="font-sans text-sm text-ink-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
