import type { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-14">{children}</main>
      <SiteFooter />
    </>
  );
}
