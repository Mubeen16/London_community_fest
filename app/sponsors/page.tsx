import type { Metadata } from "next";
import Link from "next/link";
import { SponsorPartnershipSection } from "@/components/landing/sponsor-partnership-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partner with us | London Community Fest",
  description:
    "Enquire about sponsoring London Community Fest 2026. Connect your brand with thousands of families at Kennington Park.",
};

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
          </Container>
        </section>

        <SponsorPartnershipSection id="enquiry" />
      </main>
      <SiteFooter />
    </>
  );
}
