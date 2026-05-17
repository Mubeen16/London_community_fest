import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { SponsorTierGrid } from "@/components/landing/sponsor-tier-grid";
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
          description="Support London Community Fest and connect with thousands of families across the capital."
        />

        <SponsorTierGrid />

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
