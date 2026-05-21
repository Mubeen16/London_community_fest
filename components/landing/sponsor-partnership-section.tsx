import Link from "next/link";
import { SponsorForm } from "@/components/forms/sponsor-form";
import {
  sponsorPartnershipHighlights,
  sponsorPartnershipIntro,
} from "@/data/sponsor-partnership";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

interface SponsorPartnershipSectionProps {
  id?: string;
  className?: string;
}

export function SponsorPartnershipSection({
  id = "enquiry",
  className,
}: SponsorPartnershipSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        sectionClasses("collage"),
        "scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+0.75rem)] py-6 sm:py-8",
        className,
      )}
    >
      <Container className="relative z-10">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="lg:pr-4">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-crimson-400">
              Partnership
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-3xl">
              Why partner with us
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted sm:text-base">
              {sponsorPartnershipIntro}
            </p>

            <ul className="mt-5 space-y-2.5">
              {sponsorPartnershipHighlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 font-sans text-sm leading-snug text-ink sm:text-[15px]"
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
          </div>

          <div className="lg:pl-2">
            <PaperCard
              torn={false}
              className="relative overflow-visible rounded-xl px-3 py-3 sm:px-4 sm:py-4"
            >
              <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-crimson-400">
                Enquiry form
              </p>
              <SponsorForm />
            </PaperCard>

            <p className="mt-3 text-center font-sans text-sm text-ink-muted lg:text-left">
              Prefer email?{" "}
              <Link
                href={`mailto:${siteConfig.email}?subject=Sponsorship%20enquiry`}
                className="font-semibold text-crimson-400 underline-offset-2 hover:text-crimson-500"
              >
                {siteConfig.email}
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
