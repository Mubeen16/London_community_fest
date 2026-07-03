import { eventConfig } from "@/lib/config/event";

export const ticketCopy = {
  primaryLabel: "Get tickets",
  secondaryLabel: "Explore what's on",
  panelLabel: "Get tickets on Eventbrite",
  liveBadge: "Tickets live",
  trustNote: "Secure checkout via Eventbrite",
  attendHeading: "Tickets & entry",
  attendIntro: "Adults from £3 · Under 10s free · One ticket covers the full festival day",
} as const;

/** Ticket page URL with UTM params for conversion tracking. */
export function getTicketUrl(medium: string): string {
  const params = new URLSearchParams({
    utm_source: "website",
    utm_medium: medium,
    utm_campaign: "london-community-fest-2026",
  });
  const separator = eventConfig.ticketUrl.includes("?") ? "&" : "?";
  return `${eventConfig.ticketUrl}${separator}${params.toString()}`;
}

export function isTicketSalesOpen(): boolean {
  return eventConfig.registrationOpen;
}
