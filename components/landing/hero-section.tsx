import Link from "next/link";
import { HeroCountdown } from "@/components/landing/hero-countdown";
import { HeroEventBlock } from "@/components/landing/hero-event-block";
import { TicketCta } from "@/components/ui/ticket-cta";
import { eventConfig } from "@/lib/config/event";
import { isTicketSalesOpen, ticketCopy } from "@/lib/config/tickets";
import { siteConfig } from "@/lib/config/site";
import { Container } from "@/components/ui/container";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

const proofChips = [
  { label: eventConfig.expectedAttendance, suffix: "expected" },
  { label: eventConfig.foodStallCount, suffix: "food stalls" },
  { label: "Family-friendly", suffix: null },
] as const;

export function HeroSection() {
  const ticketsOpen = isTicketSalesOpen();

  return (
    <section
      id="hero"
      className={cn(
        sectionClasses("hero"),
        "relative overflow-hidden py-10 sm:py-14",
      )}
    >
      <Container className="relative z-10">
        <div>
          {ticketsOpen ? (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-gold-400/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
              <span className="size-1.5 rounded-full bg-gold-400" aria-hidden />
              {ticketCopy.liveBadge}
            </p>
          ) : null}

          <h1 className="font-sans text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.08em] sm:text-6xl sm:tracking-[0.12em] md:text-7xl">
            <span className="text-crimson-400">London</span>
            <br />
            <span className="text-cream">Community</span>
          </h1>
          <p className="relative z-10 -mt-1 font-serif text-5xl italic text-gold-400 sm:-mt-3 sm:text-8xl md:text-9xl">
            Fest
          </p>

          <p className="mt-4 font-serif text-xl italic text-cream-muted sm:text-2xl">
            {siteConfig.tagline}
          </p>
          <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-cream-muted sm:text-base">
            {siteConfig.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Event highlights">
            {proofChips.map((chip) => (
              <li
                key={chip.label}
                className="rounded-full border border-cream/15 bg-cream/5 px-3 py-1 font-sans text-xs text-cream-muted"
              >
                <span className="font-semibold text-gold-400">{chip.label}</span>
                {chip.suffix ? ` ${chip.suffix}` : null}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {ticketsOpen ? (
              <>
                <TicketCta trackingMedium="hero" />
                <Link
                  href="/#whats-on"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream/35 hover:bg-cream/5"
                >
                  {ticketCopy.secondaryLabel}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/#attend"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold-400 px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-gold-300"
                >
                  Plan your visit
                </Link>
                <Link
                  href="/#whats-on"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream/35 hover:bg-cream/5"
                >
                  {ticketCopy.secondaryLabel}
                </Link>
              </>
            )}
          </div>

          {ticketsOpen ? (
            <p className="mt-3 font-sans text-xs text-cream-faint">
              {ticketCopy.trustNote}
            </p>
          ) : null}

          <HeroEventBlock />

          <HeroCountdown className="mt-6" />
        </div>
      </Container>
    </section>
  );
}
