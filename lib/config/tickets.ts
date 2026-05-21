import { eventConfig } from "@/lib/config/event";

export const ticketCopy = {
  primaryLabel: "Get tickets",
  secondaryLabel: "Explore what's on",
  panelLabel: "Get tickets on Eventbrite",
  liveBadge: "Tickets live",
  liveHeadline: "Tickets now live for London Community Fest 2026",
  liveSubtext: "Secure checkout via Eventbrite · Adults from £3 · Kids under 10 free",
  storyHeadline: "Be part of London's community celebration",
  storySubtext:
    "Culture, food, family activities, and connection — one unforgettable day in Kennington Park.",
  trustNote: "Secure checkout via Eventbrite",
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
