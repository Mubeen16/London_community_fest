import Link from "next/link";
import { PaperCard } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

interface SectionCtaProps {
  text: string;
  buttonLabel: string;
  href: string;
  className?: string;
}

export function SectionCta({ text, buttonLabel, href, className }: SectionCtaProps) {
  return (
    <PaperCard
      torn
      className={cn(
        "flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="font-sans text-sm text-ink">{text}</p>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-crimson-400 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-crimson-500"
      >
        {buttonLabel}
      </Link>
    </PaperCard>
  );
}
