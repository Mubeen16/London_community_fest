"use client";

import Link from "next/link";
import { TornLogo } from "@/components/ui/torn-logo";
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

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ctaLabel = eventConfig.registrationOpen
    ? "Get tickets"
    : "Plan your visit";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={headerBarClasses(scrolled)}>
      <Container className="flex h-14 w-full items-center justify-between gap-4">
        <Link
          href="#hero"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMobile}
        >
          <TornLogo
            alt={siteConfig.name}
            width={32}
            height={32}
            priority
            className="p-1"
            imageClassName="h-7 w-auto"
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
          <Link href="#attend" className={headerCtaClasses()}>
            {ctaLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className={cn("block h-0.5 w-5", headerBrandClasses("cream"))} />
          <span className={cn("block h-0.5 w-5", headerBrandClasses("cream"))} />
          <span className={cn("block h-0.5 w-5", headerBrandClasses("cream"))} />
        </button>
      </Container>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className={headerMobilePanelClasses()}
          aria-label="Mobile"
        >
          <Container className="py-6">
          <ul className="flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-2 text-base transition-colors",
                    headerMobileLinkClasses(),
                  )}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="#attend"
                className={headerCtaClasses()}
                onClick={closeMobile}
              >
                {ctaLabel}
              </Link>
            </li>
          </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
