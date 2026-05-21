"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isTicketSalesOpen, ticketCopy } from "@/lib/config/tickets";
import { navigationLinks } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import {
  headerBarClasses,
  headerBrandClasses,
  headerCtaClasses,
  headerLinkClasses,
  headerMobileLinkClasses,
  headerMobilePanelClasses,
} from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { TicketCta } from "@/components/ui/ticket-cta";
import { cn } from "@/lib/utils";

const eventNavLinks = navigationLinks.filter((link) => link.href.includes("#"));
const involvedNavLinks = navigationLinks.filter((link) => !link.href.includes("#"));

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ticketsOpen = isTicketSalesOpen();
  const ctaLabel = ticketsOpen ? ticketCopy.primaryLabel : "Plan your visit";
  const ctaHref = "/#attend";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        headerBarClasses(scrolled),
        "border-b border-transparent transition-all duration-300",
        scrolled &&
          "border-cream/10 bg-forest-900/85 shadow-[0_10px_30px_rgba(8,14,10,0.45)] backdrop-blur-xl",
      )}
    >
      <Container className="flex h-14 w-full items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMobile}
        >
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={32}
            height={32}
            priority
            className="h-8 w-auto"
          />
          <span className="hidden font-serif text-lg sm:inline">
            <span className={headerBrandClasses("crimson")}>London</span>{" "}
            <span className={headerBrandClasses("cream")}>Community</span>{" "}
            <span className={headerBrandClasses("gold")}>Fest</span>
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-end gap-5 lg:flex xl:gap-6"
          aria-label="Main"
        >
          {eventNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-sm transition-colors", headerLinkClasses())}
            >
              {link.label}
            </Link>
          ))}
          <div className="hidden items-center gap-4 xl:flex">
            <span className="h-5 w-px bg-cream/15" aria-hidden />
            {involvedNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide text-cream-muted transition-colors hover:text-cream",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {ticketsOpen ? (
          <TicketCta
            trackingMedium="navbar"
            className="hidden min-w-[10.75rem] shrink-0 px-7 lg:inline-flex"
          />
        ) : (
          <Link
            href={ctaHref}
            className={cn(
              headerCtaClasses(),
              "hidden min-w-[10.75rem] shrink-0 px-7 lg:inline-flex",
            )}
          >
            {ctaLabel}
          </Link>
        )}

        <div className="flex items-center gap-2 lg:hidden">
          {ticketsOpen ? (
            <TicketCta trackingMedium="navbar-mobile" variant="compact" />
          ) : null}
          <button
            type="button"
            className="relative flex min-h-11 min-w-11 items-center justify-center rounded-md border border-cream/10 bg-cream/5"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-cream transition-all duration-200",
                mobileOpen ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-cream transition-opacity duration-200",
                mobileOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-cream transition-all duration-200",
                mobileOpen ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className={cn(headerMobilePanelClasses(), "shadow-lg shadow-forest-950/50")}
          aria-label="Mobile menu"
        >
          <Container className="py-5">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
              Event
            </p>
            <ul className="mt-2 flex flex-col">
              {eventNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-md px-2 py-3 font-sans text-base font-medium transition-colors",
                      headerMobileLinkClasses(),
                    )}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
              Get involved
            </p>
            <ul className="mt-2 flex flex-col">
              {involvedNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-md px-2 py-3 font-sans text-base font-medium transition-colors",
                      headerMobileLinkClasses(),
                    )}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {ticketsOpen ? (
              <TicketCta
                trackingMedium="navbar-drawer"
                className="mt-6 w-full"
                onClick={closeMobile}
              />
            ) : (
              <Link
                href={ctaHref}
                className={cn(headerCtaClasses(), "mt-6 w-full")}
                onClick={closeMobile}
              >
                {ctaLabel}
              </Link>
            )}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
