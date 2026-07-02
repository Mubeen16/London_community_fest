import type { VolunteerEnquiryPayload } from "@/types";

export function buildVolunteerAppsScriptPayload(body: VolunteerEnquiryPayload) {
  return {
    ...body,
    submitted_at: new Date().toISOString(),
    contactName: body.contact_name,
  };
}
