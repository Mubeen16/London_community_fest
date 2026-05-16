import Link from "next/link";
import { eventConfig } from "@/lib/config/event";
import {
  sectionAccent,
  sectionClasses,
  sectionHeadingTheme,
} from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function AttendSection() {
  const { venue, pricing } = eventConfig;
  const accent = sectionAccent("attend");

  return (
    <section id="attend" className={sectionClasses("attend", "py-12 sm:py-14")}>
      <Container size="narrow" className="relative z-10">
        <SectionHeading
          align="center"
          theme={sectionHeadingTheme("attend")}
          label="Attend"
          title={`Join us at ${venue.name}`}
          description={venue.accessibility}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <PaperCard className="px-5 py-5" torn>
            <h3
              className={cn(
                "font-sans text-xs font-semibold uppercase tracking-wider",
                accent,
              )}
            >
              When
            </h3>
            <p className="mt-2 font-sans text-lg font-semibold text-ink">
              {eventConfig.dateDisplay}
            </p>
            <p className="font-sans text-sm text-ink-muted">
              {eventConfig.timeDisplay}
            </p>
          </PaperCard>

          <PaperCard className="px-5 py-5" torn>
            <h3
              className={cn(
                "font-sans text-xs font-semibold uppercase tracking-wider",
                accent,
              )}
            >
              Where
            </h3>
            <p className="mt-2 font-sans text-lg font-semibold text-ink">
              {venue.address}
            </p>
            <ul className="mt-2 space-y-1 font-sans text-sm text-ink-muted">
              {venue.nearestStations.map((station) => (
                <li key={station}>{station}</li>
              ))}
            </ul>
          </PaperCard>
        </div>

        <PaperCard className="mt-6 px-5 py-5" torn>
          <h3
            className={cn(
              "font-sans text-xs font-semibold uppercase tracking-wider",
              accent,
            )}
          >
            Entry
          </h3>
          <p className="mt-2 font-sans text-ink">
            Adults ({pricing.adult.ageRange}):{" "}
            <span className={cn("font-serif text-2xl", accent)}>{pricing.adult.display}</span>
          </p>
          <p className="mt-1 font-sans text-sm text-ink-muted">
            Children ({pricing.child.ageRange}): {pricing.child.display}
          </p>
        </PaperCard>

        <div className="mt-8 flex justify-center">
          <Link
            href="#faq"
            className="inline-flex items-center justify-center rounded-lg border border-cream/15 bg-transparent px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-cream/5"
          >
            Read the FAQ
          </Link>
        </div>
      </Container>
    </section>
  );
}
