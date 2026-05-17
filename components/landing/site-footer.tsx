import Link from "next/link";
import { navigationLinks } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const eventHrefs = new Set(["#about", "#whats-on", "#attend", "#faq"]);

const eventLinks = navigationLinks.filter((link) => eventHrefs.has(link.href));

const getInvolvedLinks = [
  { label: "Apply for a stall", href: "/vendors" },
  { label: "Sponsorship", href: "#sponsors" },
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
  className: string;
}) {
  return (
    <h3
      className={cn(
        "mb-2.5 font-sans text-xs font-bold uppercase tracking-widest",
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
            className="text-sm text-cream-faint transition-colors hover:text-cream"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className={cn(sectionClasses("footer"), "py-6 sm:py-7")}>
      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 md:grid-cols-12 md:items-start">
            <div className="col-span-2 md:col-span-5">
              <p className="font-serif text-base leading-tight sm:text-lg">
                <span className="text-crimson-400">London</span>{" "}
                <span className="text-cream">Community</span>{" "}
                <span className="italic text-gold-400">Fest</span>
              </p>
              <p className="mt-2 max-w-[16rem] text-sm leading-snug text-cream-faint">
                {siteConfig.description}
              </p>
              <p className="mt-1 max-w-[16rem] font-serif text-sm italic text-cream-muted">
                {siteConfig.tagline}
              </p>
            </div>

            <nav aria-label="Event" className="md:col-span-2">
              <FooterColumnHeading className="text-gold-400">
                Event
              </FooterColumnHeading>
              <FooterLinkList links={eventLinks} />
            </nav>

            <nav aria-label="Get involved" className="md:col-span-2">
              <FooterColumnHeading className="text-crimson-400">
                Get involved
              </FooterColumnHeading>
              <FooterLinkList links={getInvolvedLinks} />
            </nav>

            <div className="col-span-2 md:col-span-3">
              <FooterColumnHeading className="text-gold-400">
                Contact
              </FooterColumnHeading>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-cream-faint transition-colors hover:text-cream"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.phone.map((number) => (
                  <li key={number}>
                    <a
                      href={`tel:${number.replace(/\s/g, "")}`}
                      className="text-sm text-cream-faint transition-colors hover:text-cream"
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-cream/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-snug text-cream-faint">
              © 2026 London Community Fest · {siteConfig.organisedBy}
            </p>
            <p className="text-xs leading-snug text-cream-faint">
              Family-friendly · Alcohol-free · Halal-focused
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
