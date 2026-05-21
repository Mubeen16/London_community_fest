import { eventConfig } from "@/lib/config/event";
import { cn } from "@/lib/utils";

interface VenueDirectionsLinkProps {
  className?: string;
  /** light = paper sections (ink/gold); dark = forest/crimson sections (cream/gold) */
  theme?: "light" | "dark";
  showArrow?: boolean;
}

export function VenueDirectionsLink({
  className,
  theme = "dark",
  showArrow = true,
}: VenueDirectionsLinkProps) {
  const { venue } = eventConfig;

  return (
    <a
      href={venue.mapsDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get directions to ${venue.name} on Google Maps (opens in new tab)`}
      className={cn(
        "inline-flex items-center gap-1 font-sans text-xs font-semibold transition-colors sm:text-sm",
        theme === "dark"
          ? "text-gold-400 hover:text-gold-300"
          : "text-crimson-400 hover:text-crimson-500",
        className,
      )}
    >
      {venue.directionsLabel}
      {showArrow ? <span aria-hidden>→</span> : null}
    </a>
  );
}
