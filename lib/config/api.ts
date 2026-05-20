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

/**
 * Temporary operational endpoints (Google Apps Script).
 * Form intake uses Apps Script until the Django API is hosted; then switch
 * `postSponsorEnquiry` / `postVendorEnquiry` to `postJsonToApi(...)`.
 */
export const appsScriptConfig = {
  sponsors:
    "https://script.google.com/macros/s/AKfycbxTYtvgVOdRR7sCG0n6zZ_y2QrLQH8tJXY0P0V83BhKQYzg61dr-qBFQauH9dlVzScsgQ/exec",
  vendors:
    "https://script.google.com/macros/s/AKfycbwEhqoyzg8BRz_cG3YDUcz1tLXiHuAqGH_XOo0fveeAGSC61OPJiJQiwMBFmHSLi0-M/exec",
} as const;

/** Convenience map — Django paths + temporary Apps Script URLs. */
export const API = {
  sponsors: apiConfig.endpoints.sponsors,
  sponsorsAppsScript: appsScriptConfig.sponsors,
  vendors: apiConfig.endpoints.vendors,
  vendorsAppsScript: appsScriptConfig.vendors,
} as const;

export type ApiEndpoint = keyof typeof apiConfig.endpoints;

export function apiUrl(endpoint: ApiEndpoint) {
  return apiConfig.baseUrl + apiConfig.endpoints[endpoint];
}
