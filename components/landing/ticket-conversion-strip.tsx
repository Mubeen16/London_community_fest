import Link from "next/link";
import { eventConfig } from "@/lib/config/event";
import { isTicketSalesOpen, ticketCopy } from "@/lib/config/tickets";
import { TicketCta } from "@/components/ui/ticket-cta";
import { Container } from "@/components/ui/container";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

/** Single mid-page emotional conversion moment — placed after What's On */
export function TicketConversionStrip() {
  if (!isTicketSalesOpen()) {
    return null;
  }

  return (
    <section
      className={cn(
        sectionClasses("about"),
        "border-y border-paper-200 py-10 sm:py-12",
      )}
      aria-label="Join the festival"
    >
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-crimson-400">
            Join us
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            {ticketCopy.storyHeadline}
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted sm:text-lg">
            {ticketCopy.storySubtext}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TicketCta trackingMedium="strip-story" />
            <Link
              href="/#faq"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-50"
            >
              Read the FAQ
            </Link>
          </div>
          <p className="mt-4 font-sans text-xs text-ink-muted">
            {eventConfig.dateDisplay} · {eventConfig.venue.name} · {ticketCopy.trustNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
