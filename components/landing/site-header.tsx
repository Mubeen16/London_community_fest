"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { eventConfig } from "@/lib/config/event";
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
import { cn } from "@/lib/utils";

const eventNavLinks = navigationLinks.filter((link) => link.href.includes("#"));
const involvedNavLinks = navigationLinks.filter((link) => !link.href.includes("#"));

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ctaLabel = eventConfig.registrationOpen
    ? "Get tickets"
    : "Plan your visit";
  const ctaHref = eventConfig.registrationOpen ? eventConfig.ticketUrl : "/#attend";

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
    <header className={headerBarClasses(scrolled)}>
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

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-sm transition-colors", headerLinkClasses())}
            >
              {link.label}
            </Link>
          ))}
          {eventConfig.registrationOpen ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={headerCtaClasses()}
            >
              {ctaLabel}
            </a>
          ) : (
            <Link href={ctaHref} className={headerCtaClasses()}>
              {ctaLabel}
            </Link>
          )}
        </nav>

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

            {eventConfig.registrationOpen ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(headerCtaClasses(), "mt-6 w-full")}
                onClick={closeMobile}
              >
                {ctaLabel}
              </a>
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
