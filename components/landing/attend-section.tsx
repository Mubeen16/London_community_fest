import type { ReactNode } from "react";
import Link from "next/link";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import {
  CalendarIcon,
  MapPinIcon,
  TrainIcon,
} from "@/components/landing/attend-detail-icons";
import { eventConfig } from "@/lib/config/event";
import { sectionAccent, sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

function AttendPanelCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-cream/10 bg-black/20",
        className,
      )}
    >
      {children}
    </div>
  );
}

function AttendInfoRow({
  icon,
  title,
  detail,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <AttendPanelCard className="flex items-start gap-2.5 px-3 py-2.5 sm:py-3">
      <span className="shrink-0 text-gold-400 [&_svg]:size-4">{icon}</span>
      <div className="min-w-0">
        <p className="font-sans text-xs font-semibold text-cream sm:text-sm">{title}</p>
        <p className="mt-0.5 font-sans text-[11px] leading-snug text-cream-muted sm:text-xs">
          {detail}
        </p>
      </div>
    </AttendPanelCard>
  );
}

function formatStations(stations: readonly string[]) {
  const names = stations.map((s) => s.replace(/\s*\([^)]*\)/, "").trim());
  return `${names.join(" · ")} (Northern)`;
}

export function AttendSection() {
  const { venue, pricing } = eventConfig;
  const accent = sectionAccent("attend");
  const showWaitlist = !eventConfig.registrationOpen;
  const childPrice =
    pricing.child.display.toLowerCase() === "free"
      ? "FREE"
      : pricing.child.display;

  return (
    <section id="attend" className={sectionClasses("attend", "py-8 sm:py-10")}>
      <Container className="relative z-10">
        <div className="rounded-xl border border-cream/10 bg-crimson-600/40 p-4 sm:p-5 lg:p-6">
          <SectionHeading
            compact
            align="left"
            theme={sectionHeadingTheme("attend")}
            label="Attend"
            title={`Join us at ${venue.name}`}
            description={eventConfig.attendTagline}
          />

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <AttendPanelCard className="px-3 py-4 text-center sm:py-5">
                  <p className={cn("font-serif text-3xl sm:text-4xl", accent)}>
                    {pricing.adult.display}
                  </p>
                  <p className="mt-1 font-sans text-xs text-cream-muted">
                    Adults ({pricing.adult.ageRange})
                  </p>
                </AttendPanelCard>
                <AttendPanelCard className="px-3 py-4 text-center sm:py-5">
                  <p className={cn("font-serif text-3xl sm:text-4xl", accent)}>
                    {childPrice}
                  </p>
                  <p className="mt-1 font-sans text-xs text-cream-muted">
                    Kids {pricing.child.ageRange}
                  </p>
                </AttendPanelCard>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-3">
                <AttendInfoRow
                  icon={<CalendarIcon />}
                  title={eventConfig.dateDisplay}
                  detail={eventConfig.timeDisplay}
                />
                <AttendInfoRow
                  icon={<MapPinIcon />}
                  title={venue.name}
                  detail={venue.postcode ? `London ${venue.postcode}` : venue.address}
                />
                <AttendInfoRow
                  icon={<TrainIcon />}
                  title="Nearest tubes"
                  detail={formatStations(venue.nearestStations)}
                />
              </div>
            </div>

            {showWaitlist && (
              <div className="flex flex-col border-t border-cream/10 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                <h3 className="mb-3 font-sans text-sm font-semibold text-cream">
                  Get notified when registration opens
                </h3>

                <WaitlistForm variant="panel" />
              </div>
            )}
          </div>

          <p className="mt-5 border-t border-cream/10 pt-4 text-center sm:text-left">
            <Link
              href="#faq"
              className="font-sans text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
            >
              Questions? Read the FAQ
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
