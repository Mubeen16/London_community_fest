import { eventConfig } from "@/lib/config/event";
import { homepageSections } from "@/lib/config/landing-layout";
import { isTicketSalesOpen } from "@/lib/config/tickets";
import { ExperienceCarousel } from "@/components/landing/experience-carousel";
import { LandingSection } from "@/components/ui/landing-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHeadingTheme } from "@/lib/section-theme";

const { id, theme, label, title, description } = homepageSections.whatsOn;

export function CollageSection() {
  return (
    <LandingSection id={id} section={theme}>
      <SectionHeading
        titleId={`${id}-title`}
        theme={sectionHeadingTheme(theme)}
        label={label}
        title={title}
        description={description}
      />

      <ExperienceCarousel />

      <p className="mt-8 text-center font-sans text-sm text-ink-muted">
        {eventConfig.venue.name} · {eventConfig.expectedAttendance} expected
      </p>

      {isTicketSalesOpen() ? (
        <p className="mt-8 border-t border-paper-300 pt-8 text-center font-sans text-sm text-ink-muted">
          Every experience above is included with your festival ticket.
        </p>
      ) : null}
    </LandingSection>
  );
}
