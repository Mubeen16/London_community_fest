import type { Metadata } from "next";
import Link from "next/link";
import { SponsorForm } from "@/components/forms/sponsor-form";
import { SponsorPartnershipSection } from "@/components/landing/sponsor-partnership-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partner with us | London Community Fest",
  description:
    "Enquire about sponsoring London Community Fest 2026. Connect your brand with thousands of families at Kennington Park.",
};

const headerScrollOffset =
  "scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+0.75rem)]";

export default function SponsorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-[calc(3.5rem+env(safe-area-inset-top,0px))]">
        <section
          className={cn(sectionClasses("hero"), "py-8 text-center sm:py-10")}
        >
          <Container>
            <Link
              href="/"
              className="inline-block font-sans text-sm text-cream-faint transition-colors hover:text-cream"
            >
              ← Back to home
            </Link>
            <SectionHeading
              compact
              theme="dark"
              align="center"
              label="Sponsorship"
              title="Partner with us"
              description="Connect your brand with thousands of families across London."
              className="mt-3 mb-0"
            />
            <Link
              href="#enquiry"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-gold-300/70 bg-gold-400 px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-gold-300 sm:mt-6"
            >
              Start your enquiry
            </Link>
          </Container>
        </section>

        <SponsorPartnershipSection />

        <section
          id="enquiry"
          className={cn(
            sectionClasses("sponsors"),
            headerScrollOffset,
            "py-6 sm:py-8",
          )}
        >
          <Container size="narrow" className="relative z-10">
            <PaperCard
              torn={false}
              className="relative overflow-visible rounded-xl px-3 py-3 sm:px-4 sm:py-4"
            >
              <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-crimson-400">
                Enquiry form
              </p>
              <SponsorForm />
            </PaperCard>

            <p className="mt-4 text-center font-sans text-sm text-cream-muted">
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
