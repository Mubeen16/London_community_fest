/**
 * Browser forms use same-origin `/api/...` paths (proxied in next.config.ts).
 * Set NEXT_PUBLIC_API_URL only when calling the API on another origin directly.
 *
 * Google Apps Script URLs live in server env vars only (`SPONSORS_APPS_SCRIPT_URL`,
 * `VENDORS_APPS_SCRIPT_URL`) — see `lib/api/apps-script-urls.ts` and `app/api/*-enquiry/`.
 */
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  endpoints: {
    waitlist: "/api/v1/events/london-community-fest-2026/waitlist/",
    vendors: "/api/v1/events/london-community-fest-2026/vendors/",
    sponsors: "/api/v1/events/london-community-fest-2026/sponsors/",
    tickets: "/api/v1/events/london-community-fest-2026/tickets/",
    checkout: "/api/v1/events/london-community-fest-2026/tickets/checkout/",
  },
} as const;

export type ApiEndpoint = keyof typeof apiConfig.endpoints;

export function apiUrl(endpoint: ApiEndpoint) {
  return apiConfig.baseUrl + apiConfig.endpoints[endpoint];
}
