import type { ReactNode } from "react";
import { MobileBottomNav } from "@/components/landing/mobile-bottom-nav";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(3.5rem+env(safe-area-inset-top,0px))] lg:pb-0">
        {children}
      </main>
      <MobileBottomNav />
      <SiteFooter />
    </>
  );
}
