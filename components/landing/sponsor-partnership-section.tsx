import {
  sponsorPartnershipHighlights,
  sponsorPartnershipIntro,
} from "@/data/sponsor-partnership";
import { sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function SponsorPartnershipSection() {
  return (
    <section className={sectionClasses("vendors", "py-6 sm:py-8")}>
      <Container size="narrow" className="relative z-10">
        <SectionHeading
          compact
          theme={sectionHeadingTheme("vendors")}
          align="center"
          label="Partnership"
          title="Why partner with us"
          description={sponsorPartnershipIntro}
          className="mb-5"
        />

        <PaperCard torn={false} className="rounded-xl px-5 py-5 sm:px-6 sm:py-6">
          <ul className="space-y-2.5">
            {sponsorPartnershipHighlights.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 font-sans text-sm leading-snug text-ink"
              >
                <span
                  className="mt-0.5 shrink-0 font-bold text-crimson-400"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PaperCard>
      </Container>
    </section>
  );
}
