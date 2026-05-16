import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import {
  sectionClasses,
  sectionHeadingTheme,
} from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function VendorsSection() {
  return (
    <section
      id="vendors"
      className={sectionClasses("vendors", "py-12 sm:py-14")}
    >
      <Container size="narrow">
        <SectionHeading
          align="center"
          theme={sectionHeadingTheme("vendors")}
          label="Vendors"
          title="Stall applications"
          description="Halal food, modest fashion and community organisations welcome."
        />
        <PaperCard className="px-6 py-5 text-left" torn>
          <p className="font-sans text-sm leading-relaxed text-ink">
            We welcome halal food vendors, modest fashion brands, and community
            organisations. Spaces are limited — get in touch early to secure your
            stall.
          </p>
          <p className="mt-4 font-sans text-sm text-ink-muted">
            Email{" "}
            <a
              href={`mailto:${siteConfig.email}?subject=Vendor%20application`}
              className="font-semibold text-crimson-400 underline-offset-2 hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            with the subject &ldquo;Vendor application&rdquo;.
          </p>
        </PaperCard>
        <div className="mt-8 flex justify-center">
          <Link
            href={`mailto:${siteConfig.email}?subject=Vendor%20application`}
            className="inline-flex items-center justify-center rounded-lg bg-crimson-400 px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-crimson-500"
          >
            Apply for a stall
          </Link>
        </div>
      </Container>
    </section>
  );
}
