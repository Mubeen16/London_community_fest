import Link from "next/link";
import { eventConfig } from "@/lib/config/event";
import { navigationLinks } from "@/lib/config/navigation";
import { siteConfig, siteValuesLine } from "@/lib/config/site";
import { VenueDirectionsLink } from "@/components/ui/venue-directions-link";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const eventHrefs = new Set(["/#about", "/#whats-on", "/#attend", "/#faq"]);

const eventLinks = navigationLinks.filter((link) => eventHrefs.has(link.href));

const getInvolvedLinks = [
  { label: "Apply for a stall", href: "/vendors" },
  { label: "Sponsorship", href: "/sponsors" },
  {
    label: "Volunteer",
    href: `mailto:${siteConfig.email}?subject=Volunteer`,
  },
] as const;

function FooterColumnHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "mb-2.5 font-sans text-xs font-bold uppercase tracking-widest text-gold-400",
        className,
      )}
    >
      {children}
    </h3>
  );
}

function FooterLinkList({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <ul className="space-y-1.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm text-cream-muted transition-colors hover:text-gold-300"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface SiteFooterProps {
  /** Extra bottom space for the fixed mobile nav (homepage shell only). */
  clearMobileNav?: boolean;
}

export function SiteFooter({ clearMobileNav = false }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        sectionClasses("footer"),
        "pt-6 sm:pt-7 lg:py-8",
        clearMobileNav
          ? "pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] lg:pb-8"
          : "pb-6 sm:pb-7 lg:pb-8",
      )}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-10">
          <div className="sm:col-span-2 md:col-span-4">
            <p className="mb-2.5 font-serif text-base leading-tight sm:text-lg">
              <span className="text-gold-400">London</span>{" "}
              <span className="text-cream">Community</span>{" "}
              <span className="italic text-gold-400">Fest</span>
            </p>
            <p className="text-sm leading-snug text-cream-muted sm:max-w-xs">
              {siteConfig.description}
            </p>
            <p className="mt-2 font-serif text-sm italic text-cream sm:max-w-xs">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Event" className="md:col-span-2">
            <FooterColumnHeading>Event</FooterColumnHeading>
            <FooterLinkList links={eventLinks} />
          </nav>

          <nav aria-label="Get involved" className="md:col-span-2">
            <FooterColumnHeading>Get involved</FooterColumnHeading>
            <FooterLinkList links={getInvolvedLinks} />
          </nav>

          <div className="md:col-span-2">
            <FooterColumnHeading>Visit</FooterColumnHeading>
            <p className="text-sm leading-snug text-cream-muted">
              {eventConfig.venue.name}
              <br />
              {eventConfig.venue.address}
            </p>
            <p className="mt-2">
              <VenueDirectionsLink theme="dark" />
            </p>
          </div>

          <div className="md:col-span-2">
            <FooterColumnHeading>Contact</FooterColumnHeading>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-cream-muted transition-colors hover:text-gold-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phone.map((number) => (
                <li key={number}>
                  <a
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="text-sm text-cream-muted transition-colors hover:text-gold-300"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-cream/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-snug text-cream-muted md:text-xs">
            © 2026 London Community Fest · {siteConfig.organisedBy}
          </p>
          <p className="break-words text-[10px] leading-snug text-cream-muted md:text-xs">
            {siteValuesLine}
          </p>
        </div>
      </Container>
    </footer>
  );
}
