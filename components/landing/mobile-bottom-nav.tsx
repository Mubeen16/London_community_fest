"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavIcon } from "@/components/ui/mobile-nav-icon";
import { eventConfig } from "@/lib/config/event";
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
      href: eventConfig.registrationOpen ? eventConfig.ticketUrl : "/#attend",
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
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-cream/10 bg-forest-950 shadow-[0_-8px_32px_rgba(10,18,10,0.45)] lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <ul className="grid grid-cols-5">
          {mobileNavItems.map((item) => {
            const isPageLink = !item.href.includes("#");
            const isActive = isPageLink && pathname === item.href;

            return (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-cream-muted transition-colors hover:text-cream"
                  >
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
