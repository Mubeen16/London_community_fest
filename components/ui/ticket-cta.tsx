import { getTicketUrl, ticketCopy } from "@/lib/config/tickets";
import { headerCtaClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

interface TicketCtaProps {
  label?: string;
  /** UTM medium — e.g. hero, navbar, attend */
  trackingMedium: string;
  variant?: "primary" | "panel" | "compact";
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  primary: cn(
    headerCtaClasses(),
    "group relative gap-1 overflow-hidden whitespace-nowrap border border-gold-300/70 bg-gold-400 text-forest-900 shadow-[0_10px_30px_rgba(217,177,74,0.28)] transition-all hover:-translate-y-0.5 hover:bg-gold-300",
  ),
  panel:
    "inline-flex w-full items-center justify-center rounded-xl border border-cream/20 bg-cream px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-paper-50 md:w-auto",
  compact: cn(
    headerCtaClasses(),
    "group relative gap-1 overflow-hidden whitespace-nowrap border border-gold-300/70 bg-gold-400 px-4 text-xs text-forest-900 shadow-[0_8px_24px_rgba(217,177,74,0.22)] transition-all hover:-translate-y-0.5 hover:bg-gold-300",
  ),
} as const;

export function TicketCta({
  label = ticketCopy.primaryLabel,
  trackingMedium,
  variant = "primary",
  className,
  onClick,
}: TicketCtaProps) {
  const href = getTicketUrl(trackingMedium);
  const showArrow = variant === "primary" || variant === "compact";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} on Eventbrite (opens in new tab)`}
      className={cn(variantClasses[variant], className)}
      onClick={onClick}
    >
      <span className={variant === "primary" || variant === "compact" ? "relative z-10" : undefined}>
        {label}
      </span>
      {showArrow ? (
        <span className="relative z-10 ml-1 text-xs transition-transform group-hover:translate-x-0.5">
          →
        </span>
      ) : null}
      {variant === "primary" || variant === "compact" ? (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/4 w-1/3 -skew-x-12 bg-cream/45 opacity-0 transition-all duration-500 group-hover:left-[110%] group-hover:opacity-100"
        />
      ) : null}
    </a>
  );
}
