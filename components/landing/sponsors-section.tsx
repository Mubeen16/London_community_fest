import Link from "next/link";
import { sponsorTiers } from "@/data/sponsors";
import { siteConfig } from "@/lib/config/site";
import {
  sectionClasses,
  sectionHeadingTheme,
} from "@/lib/section-theme";
import { sponsorAccentClasses } from "@/lib/sponsor-styles";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className={sectionClasses("sponsors", "py-12 sm:py-14")}
    >
      <Container className="relative z-10">
        <SectionHeading
          align="center"
          theme={sectionHeadingTheme("sponsors")}
          label="Sponsors"
          title="Partner with us"
          description="Support London Community Fest and connect with thousands of families across the capital."
        />

        <ul className="grid gap-6 lg:grid-cols-3">
          {sponsorTiers.map((tier) => {
            const accent = sponsorAccentClasses(tier.accentColor);

            return (
              <li key={tier.name}>
                <PaperCard
                  torn
                  className={cn("flex h-full flex-col px-5 py-6", accent.card)}
                >
                  <p className={accent.label}>{tier.name}</p>
                  <p className={cn("mt-2", accent.price)}>{tier.price}</p>
                  <p className="mt-2 font-sans text-sm text-ink-muted">
                    {tier.description}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-paper-300 pt-5">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 font-sans text-sm text-ink"
                      >
                        <span className={accent.check} aria-hidden>
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

        <div className="mt-10 flex justify-center">
          <Link
            href={`mailto:${siteConfig.email}?subject=Sponsorship%20enquiry`}
            className="inline-flex items-center justify-center rounded-lg bg-gold-400 px-6 py-3 text-sm font-semibold text-forest-900 transition-colors duration-200 hover:bg-gold-300"
          >
            Become a partner
          </Link>
        </div>
      </Container>
    </section>
  );
}
