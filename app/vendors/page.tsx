import type { Metadata } from "next";
import Link from "next/link";
import { VendorForm } from "@/components/forms/vendor-form";
import { VendorBenefitsPageSection } from "@/components/landing/vendor-benefits-page-section";
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
  title: "Apply for a Stall | London Community Fest",
  description:
    "Apply for a food, fashion, or business stall at London Community Fest 2026. Reach 4,000+ visitors at Kennington Park.",
};

export default function VendorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-14">
        <section
          className={cn(sectionClasses("hero", "py-16 text-center"))}
        >
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
              label="Vendors"
              title="Apply for a stall"
              description="Food, fashion, market, and community stalls welcome. Reach 4,000+ visitors at Kennington Park."
              className="mt-6 mb-0"
            />
          </Container>
        </section>

        <BrandBar />

        <VendorBenefitsPageSection />

        <section className={sectionClasses("vendors", "pb-10 sm:pb-12")}>
          <Container size="narrow">
            <PaperCard
              torn={false}
              className="relative overflow-visible rounded-xl px-4 py-5 sm:px-6 sm:py-7"
            >
              <VendorForm />
            </PaperCard>

            <p className="mt-6 text-center font-sans text-sm text-ink-muted">
              Prefer to apply by email?{" "}
              <Link
                href={`mailto:${siteConfig.email}?subject=Vendor%20application`}
                className="font-semibold text-crimson-400 underline-offset-2 hover:underline"
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
