"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavIcon } from "@/components/ui/mobile-nav-icon";
import { eventConfig } from "@/lib/config/event";
import { getTicketUrl } from "@/lib/config/tickets";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const mobileNavItems = [
    { label: "About", href: "/#about", icon: "about" as const, external: false },
    {
      label: "Programme",
      href: "/#whats-on",
      icon: "programme" as const,
      external: false,
    },
    {
      label: eventConfig.registrationOpen ? "Tickets" : "Attend",
      href: eventConfig.registrationOpen
        ? getTicketUrl("bottom-nav")
        : "/#attend",
      icon: "attend" as const,
      external: eventConfig.registrationOpen,
    },
    {
      label: "Contribute",
      href: "/#get-involved",
      icon: "involved" as const,
      external: false,
    },
    { label: "FAQ", href: "/#faq", icon: "faq" as const, external: false },
  ];

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-cream/10 bg-crimson-600 shadow-[0_-8px_32px_rgba(94,12,28,0.45)] lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <ul className="grid grid-cols-5">
          {mobileNavItems.map((item) => {
            const isPageLink = !item.href.includes("#");
            const isActive = isPageLink && pathname === item.href;
            const isTicketItem = item.label === "Tickets";

            return (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-cream-muted transition-colors hover:text-cream",
                      isTicketItem &&
                        "z-10 rounded-xl border border-gold-300/40 bg-gradient-to-b from-gold-400/25 to-gold-400/10 text-gold-300 shadow-[0_0_0_1px_rgba(217,177,74,0.16),0_8px_18px_rgba(217,177,74,0.2)]",
                    )}
                  >
                    {isTicketItem ? (
                      <span
                        aria-hidden
                        className="absolute -top-1.5 rounded-full border border-gold-300/60 bg-gold-400 px-1.5 py-0.5 font-sans text-[8px] font-bold uppercase tracking-wide text-forest-900"
                      >
                        Live
                      </span>
                    ) : null}
                    <MobileNavIcon name={item.icon} />
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
                      {item.label}
                    </span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 transition-colors",
                      isActive ? "text-gold-400" : "text-cream-muted hover:text-cream",
                    )}
                  >
                    {isActive ? (
                      <span
                        className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-gold-400"
                        aria-hidden
                      />
                    ) : null}
                    <MobileNavIcon name={item.icon} />
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
