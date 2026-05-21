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

/** Eventbrite URL with UTM params for conversion tracking. */
export function getTicketUrl(medium: string): string {
  const url = new URL(eventConfig.ticketUrl);
  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", "london-community-fest-2026");
  return url.toString();
}

export function isTicketSalesOpen(): boolean {
  return eventConfig.registrationOpen;
}
