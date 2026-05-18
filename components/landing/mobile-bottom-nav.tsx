"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "About", href: "/#about" },
  { label: "What's on", href: "/#whats-on" },
  { label: "Attend", href: "/#attend" },
  { label: "Vendors", href: "/vendors" },
  { label: "FAQ", href: "/#faq" },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-cream/10 bg-forest-950/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-5">
        {mobileNavItems.map((item) => {
          const isPageLink = item.href.startsWith("/") && !item.href.includes("#");
          const isActive = isPageLink && pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-[3.25rem] flex-col items-center justify-center px-1 py-2 text-center font-sans text-[10px] font-semibold leading-tight transition-colors sm:text-xs",
                  isActive ? "text-gold-400" : "text-cream-muted hover:text-cream",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
