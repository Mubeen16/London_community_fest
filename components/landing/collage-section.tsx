import { eventConfig } from "@/lib/config/event";
import { isTicketSalesOpen } from "@/lib/config/tickets";
import { ExperienceCarousel } from "@/components/landing/experience-carousel";
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
          <p className="mt-8 border-t border-cream/10 pt-8 text-center font-sans text-sm text-cream-muted">
            Every experience above is included with your festival ticket.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
