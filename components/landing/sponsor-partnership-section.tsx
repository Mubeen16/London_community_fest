import {
  sponsorPartnershipHighlights,
  sponsorPartnershipIntro,
  sponsorPartnershipNote,
} from "@/data/sponsor-partnership";
import { sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function SponsorPartnershipSection() {
  return (
    <section className={sectionClasses("vendors", "py-12 sm:py-14")}>
      <Container size="narrow" className="relative z-10">
        <SectionHeading
          theme={sectionHeadingTheme("vendors")}
          align="center"
          label="Why partner"
          title="Reach London together"
          description={sponsorPartnershipIntro}
        />

        <PaperCard torn={false} className="mt-8 rounded-xl px-6 py-8 sm:px-10 sm:py-10">
          <ul className="space-y-4">
            {sponsorPartnershipHighlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-sans text-sm leading-relaxed text-ink sm:text-base"
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
          <p className="mt-8 border-t border-paper-300/80 pt-6 text-center font-sans text-sm leading-relaxed text-ink-muted">
            {sponsorPartnershipNote}
          </p>
        </PaperCard>
      </Container>
    </section>
  );
}
