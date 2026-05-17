/**
 * Browser forms use same-origin `/api/...` paths (proxied in next.config.ts).
 * Set NEXT_PUBLIC_API_URL only when calling the API on another origin directly.
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
