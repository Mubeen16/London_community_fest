import type { WaitlistPayload } from "@/types";

/** Payload for Google Apps Script — Django field names plus event context for the sheet. */
export function buildWaitlistAppsScriptPayload(body: WaitlistPayload) {
  const email = body.email.trim().toLowerCase();

  return {
    email,
    submitted_at: new Date().toISOString(),
    event_slug: "london-community-fest-2026",
  };
}
