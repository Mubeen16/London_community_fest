import Link from "next/link";
import {
  sponsorPartnershipHighlights,
  sponsorPartnershipIntro,
} from "@/data/sponsor-partnership";
import { sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

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
          description={sponsorPartnershipIntro}
        />

        <ul className="mx-auto mt-8 max-w-xl space-y-3">
          {sponsorPartnershipHighlights.slice(0, 3).map((item) => (
            <li
              key={item}
              className="text-center font-sans text-sm leading-relaxed text-cream-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/sponsors"
            className="inline-flex items-center justify-center rounded-lg bg-gold-400 px-6 py-3 text-sm font-semibold text-forest-900 transition-colors duration-200 hover:bg-gold-300"
          >
            Start an enquiry
          </Link>
        </div>
      </Container>
    </section>
  );
}
