import type { Metadata } from "next";
import Link from "next/link";
import { SponsorForm } from "@/components/forms/sponsor-form";
import { SponsorTiersPageSection } from "@/components/landing/sponsor-tiers-page-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { BrandBar } from "@/components/ui/brand-bar";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sponsorship Packages | London Community Fest",
  description:
    "Partner with London Community Fest 2026. Sponsorship packages from £1,000 to £10,000. Reach 4,000+ families at Kennington Park."
};

export default function SponsorsPage() {
  const pdfUrl = siteConfig.sponsorshipPdfUrl;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-14">
        <section className={cn(sectionClasses("hero", "py-16 text-center"))}>
          <Container>
            <Link
              href="/"
              className="inline-block font-sans text-sm text-cream-faint transition-colors hover:text-cream"
            >
              ← Back to home
            </Link>
            <SectionHeading
              theme="dark"
              align="center"
              label="Sponsorship"
              title="Partner with us"
              description="Support London Community Fest and connect your brand with thousands of families across London."
              className="mt-6 mb-0"
            />
          </Container>
        </section>

        <BrandBar />

        <SponsorTiersPageSection />

        <BrandBar />

        <section className={sectionClasses("sponsors", "py-10 sm:py-12")}>
          <Container size="narrow" className="relative z-10">
            <SectionHeading
              theme="dark"
              align="center"
              label="Interested?"
              title="Get in touch"
              className="mb-8"
            />

            <PaperCard torn={false} className="rounded-xl px-4 py-5 sm:px-6 sm:py-7">
              <SponsorForm />
            </PaperCard>

            {pdfUrl ? (
              <p className="mt-6 text-center">
                <Link
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-semibold text-gold-400 underline-offset-2 hover:underline"
                >
                  Download our full sponsorship pack (PDF)
                </Link>
              </p>
            ) : null}

            <p className="mt-6 text-center font-sans text-sm text-cream-muted">
              Prefer email?{" "}
              <Link
                href={`mailto:${siteConfig.email}?subject=Sponsorship%20enquiry`}
                className="font-semibold text-gold-400 underline-offset-2 hover:underline"
              >
                {siteConfig.email}
              </Link>
            </p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
