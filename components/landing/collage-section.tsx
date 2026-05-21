import Link from "next/link";
import { eventConfig } from "@/lib/config/event";
import { isTicketSalesOpen, ticketCopy } from "@/lib/config/tickets";
import { ExperienceCarousel } from "@/components/landing/experience-carousel";
import { TicketCta } from "@/components/ui/ticket-cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";

export function CollageSection() {
  return (
    <section
      id="whats-on"
      className={sectionClasses("collage", "py-12 sm:py-14")}
    >
      <Container className="relative z-10">
        <SectionHeading
          theme={sectionHeadingTheme("collage")}
          label="What's on"
          title="The experience"
          description="Culture, connection, learning, and family fun — thoughtfully curated across the park."
        />

        <ExperienceCarousel />

        <p className="mt-8 text-center font-sans text-sm text-cream-muted">
          {eventConfig.venue.name} · {eventConfig.expectedAttendance} expected
        </p>

        {isTicketSalesOpen() ? (
          <div className="mt-8 flex flex-col items-center gap-3 border-t border-cream/10 pt-8 text-center sm:flex-row sm:justify-center">
            <p className="max-w-md font-sans text-sm text-cream-muted">
              Every experience below is included with your festival ticket.
            </p>
            <TicketCta trackingMedium="whats-on" className="shrink-0" />
            <Link
              href="/#attend"
              className="font-sans text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
            >
              View date & location
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
