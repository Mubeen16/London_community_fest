import {
  featuredSponsorTiers,
  sponsorNegotiableNote,
  sponsorPackagesIntro,
  standardSponsorTiers,
} from "@/data/sponsors";
import type { SponsorTier } from "@/types";
import { sponsorAccentClasses } from "@/lib/sponsor-styles";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

function TierFeatureList({
  features,
  checkClass,
  compact = false,
}: {
  features: readonly string[];
  checkClass: string;
  compact?: boolean;
}) {
  const items = compact ? features.slice(0, 3) : features;

  return (
    <ul
      className={cn(
        "space-y-2",
        compact ? "mt-3" : "mt-5 flex-1 border-t border-paper-300/80 pt-5",
      )}
    >
      {items.map((feature) => (
        <li key={feature} className="flex gap-2 font-sans text-sm leading-snug text-ink">
          <span className={cn("shrink-0 font-bold", checkClass)} aria-hidden>
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedTierCard({ tier }: { tier: SponsorTier }) {
  const accent = sponsorAccentClasses(tier.accentColor);

  return (
    <PaperCard
      torn={false}
      className={cn(
        "flex h-full flex-col rounded-xl px-5 py-6",
        accent.card,
        tier.exclusive === true && "ring-2 ring-gold-400 shadow-md",
      )}
    >
      {tier.exclusive === true ? (
        <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-gold-500">
          Only one available
        </p>
      ) : null}
      <p className={accent.label}>{tier.name}</p>
      <p className={cn("mt-2 font-serif text-3xl", accent.check)}>{tier.price}</p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{tier.description}</p>
      <TierFeatureList features={tier.features} checkClass={accent.check} />
    </PaperCard>
  );
}

function StandardTierCard({ tier }: { tier: SponsorTier }) {
  const accent = sponsorAccentClasses(tier.accentColor);

  return (
    <PaperCard torn={false} className={cn("h-full rounded-xl px-4 py-5", accent.card)}>
      <p className={accent.label}>{tier.name}</p>
      <p className={cn("mt-1 font-serif text-2xl", accent.check)}>{tier.price}</p>
      <p className="mt-2 font-sans text-sm leading-snug text-ink-muted">{tier.description}</p>
      <TierFeatureList features={tier.features} checkClass={accent.check} />
    </PaperCard>
  );
}

export function SponsorTiersPageSection() {
  return (
    <section className={sectionClasses("about", "py-10 sm:py-12")}>
      <Container>
        <p className="mx-auto mb-8 max-w-2xl text-center font-sans text-sm leading-relaxed text-ink-muted sm:text-base">
          {sponsorPackagesIntro}
        </p>

        <ul className="grid gap-6 lg:grid-cols-3">
          {featuredSponsorTiers.map((tier) => (
            <li key={tier.id}>
              <FeaturedTierCard tier={tier} />
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {standardSponsorTiers.map((tier) => (
            <li key={tier.id}>
              <StandardTierCard tier={tier} />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center font-sans text-sm text-ink-muted">
          {sponsorNegotiableNote}
        </p>
      </Container>
    </section>
  );
}
