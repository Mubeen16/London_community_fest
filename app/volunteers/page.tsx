import type { Metadata } from "next";
import Link from "next/link";
import { VolunteerPageSection } from "@/components/landing/volunteer-page-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Container } from "@/components/ui/container";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Volunteer | London Community Fest",
  description:
    "Sign up to volunteer at London Community Fest 2026. Arrive 7:00–8:00 AM on event day and receive a £10 food voucher as a thank you.",
};

export default function VolunteersPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-[calc(3.5rem+env(safe-area-inset-top,0px))]">
        <section
          className={cn(sectionClasses("hero"), "py-5 text-center sm:py-6")}
        >
          <Container>
            <Link
              href="/"
              className="inline-block font-sans text-sm text-cream-faint transition-colors hover:text-cream"
            >
              ← Back to home
            </Link>
            <p className="mt-3 font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              Volunteers
            </p>
            <h1 className="mt-1 font-serif text-3xl leading-tight text-cream sm:text-4xl">
              Join the team
            </h1>
          </Container>
        </section>

        <VolunteerPageSection id="signup" />
      </main>
      <SiteFooter />
    </>
  );
}
