import { featuredSponsorTiers } from "@/data/sponsors";
import { sponsorAccentClasses } from "@/lib/sponsor-styles";
import { PaperCard } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

export function SponsorTierGrid() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {featuredSponsorTiers.map((tier) => {
        const accent = sponsorAccentClasses(tier.accentColor);

        return (
          <li key={tier.id}>
            <PaperCard
              torn
              className={cn(
                "flex h-full flex-col px-5 py-6",
                accent.card,
                tier.id === "title_sponsor" && "ring-2 ring-gold-400",
              )}
            >
              <p className={accent.label}>{tier.name}</p>
              <p className={cn("mt-2 font-serif text-3xl", accent.check)}>{tier.price}</p>
              <p className="mt-2 font-sans text-sm text-ink-muted">{tier.description}</p>
              <ul className="mt-5 flex-1 space-y-2 border-t border-paper-300 pt-5">
                {tier.features.slice(0, 5).map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 font-sans text-sm text-ink"
                  >
                    <span className={cn("shrink-0 font-bold", accent.check)} aria-hidden>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </PaperCard>
          </li>
        );
      })}
    </ul>
  );
}
