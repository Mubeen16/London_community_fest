import { activities } from "@/data/activities";
import { eventConfig } from "@/lib/config/event";
import {
  sectionAccent,
  sectionClasses,
  sectionHeadingTheme,
} from "@/lib/section-theme";
import { CollageCarousel } from "@/components/landing/collage-carousel";
import { ActivityIcon } from "@/components/ui/activity-icon";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

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
          title="Festival highlights"
          description="Food, sport, fashion, family fun and live performances across the park."
        />

        <CollageCarousel />

        <PaperCard className="mt-8 px-4 py-5 sm:px-6" torn>
          <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">
            Activities
          </p>
          <ul className="scrollbar-hide mt-5 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {activities.map((activity) => (
              <li
                key={activity.title}
                className="flex w-56 shrink-0 snap-center flex-col gap-2 sm:w-60"
              >
                <span className={sectionAccent("collage")}>
                  <ActivityIcon
                    name={activity.icon}
                    className="h-7 w-7 text-current"
                  />
                </span>
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
                  {activity.title}
                </span>
                <p className="font-sans text-sm leading-relaxed text-ink-muted">
                  {activity.description}
                </p>
              </li>
            ))}
          </ul>
        </PaperCard>

        <p className="mt-6 text-center font-sans text-sm text-cream-muted">
          {eventConfig.venue.name} · {eventConfig.expectedAttendance} expected
        </p>
      </Container>
    </section>
  );
}
