"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTicketUrl, isTicketSalesOpen, ticketCopy } from "@/lib/config/tickets";
import { navigationLinks } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import {
  headerBarClasses,
  headerBrandClasses,
  headerCtaClasses,
  headerMobileLinkClasses,
  headerNavLinkClasses,
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
          "border-cream/10 bg-crimson-600/90 shadow-[0_10px_30px_rgba(94,12,28,0.4)] backdrop-blur-xl",
      )}
    >
      <div className="flex h-14 w-full items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
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
            className="h-8 w-auto shrink-0"
          />
          <span className="hidden truncate font-serif text-lg sm:inline">
            <span className={headerBrandClasses("gold")}>London</span>{" "}
            <span className={headerBrandClasses("cream")}>Community</span>{" "}
            <span className={headerBrandClasses("fest")}>Fest</span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-evenly lg:flex"
          aria-label="Main"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-1 text-center text-sm whitespace-nowrap",
                headerNavLinkClasses(),
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {ticketsOpen ? (
            <TicketCta
              trackingMedium="navbar"
              className="hidden shrink-0 px-5 lg:inline-flex xl:px-6"
            />
          ) : (
            <Link
              href={ctaHref}
              className={cn(
                headerCtaClasses(),
                "hidden shrink-0 whitespace-nowrap px-5 lg:inline-flex xl:px-6",
              )}
            >
              {ctaLabel}
            </Link>
          )}

          <button
            type="button"
            className="relative flex min-h-11 min-w-11 items-center justify-center rounded-md border border-cream/10 bg-cream/5 lg:hidden"
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
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className={cn(headerMobilePanelClasses(), "shadow-lg shadow-crimson-950/50")}
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

            <p className="mt-5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
              Tickets
            </p>
            <ul className="mt-2 flex flex-col">
              <li>
                {ticketsOpen ? (
                  <a
                    href={getTicketUrl("navbar-drawer")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "block rounded-md px-2 py-3 font-sans text-base font-medium transition-colors",
                      headerMobileLinkClasses(),
                    )}
                    onClick={closeMobile}
                  >
                    {ticketCopy.primaryLabel}
                    <span className="sr-only"> on Eventbrite (opens in new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className={cn(
                      "block rounded-md px-2 py-3 font-sans text-base font-medium transition-colors",
                      headerMobileLinkClasses(),
                    )}
                    onClick={closeMobile}
                  >
                    {ctaLabel}
                  </Link>
                )}
              </li>
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
