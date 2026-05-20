/**
 * Server-only Apps Script URL accessors.
 *
 * Import only from app/api route handlers (e.g. sponsor-enquiry, vendor-enquiry) — never from client components.
 * Browsers post to `/api/sponsor-enquiry` and `/api/vendor-enquiry`; these env vars
 * keep Google Script URLs off the public bundle.
 *
 * Temporary until Django is hosted; then remove these routes and use `postJsonToApi`.
 */

const MISSING_SPONSOR_URL = "SPONSORS_APPS_SCRIPT_URL is not configured.";
const MISSING_VENDOR_URL = "VENDORS_APPS_SCRIPT_URL is not configured.";

function normalizeAppsScriptUrl(raw: string | undefined): string {
  const url = raw?.trim().replace(/^["']|["']$/g, "") ?? "";

  if (!url || !url.startsWith("https://")) {
    throw new Error("invalid");
  }

  return url;
}

export function getSponsorsAppsScriptUrl(): string {
  try {
    return normalizeAppsScriptUrl(process.env.SPONSORS_APPS_SCRIPT_URL);
  } catch {
    throw new Error(MISSING_SPONSOR_URL);
  }
}

export function getVendorsAppsScriptUrl(): string {
  try {
    return normalizeAppsScriptUrl(process.env.VENDORS_APPS_SCRIPT_URL);
  } catch {
    throw new Error(MISSING_VENDOR_URL);
  }
}

/** User-safe message when env is missing (do not expose env var names to clients). */
export const APPS_SCRIPT_NOT_CONFIGURED_MESSAGE =
  "Submission service is temporarily unavailable. Please try again later or email us directly.";
