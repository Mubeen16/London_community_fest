import { sponsorBusinessTypes } from "@/data/sponsor-business-types";
import { sponsorContactMethods } from "@/data/sponsor-contact-methods";
import { sponsorTierOptions } from "@/data/sponsor-tier-options";
import type { SponsorEnquiryPayload } from "@/types";

function optionLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/**
 * Payload for Google Apps Script — includes Django field names plus labels and
 * camelCase aliases so existing sheet scripts can read common property names.
 */
export function buildSponsorAppsScriptPayload(body: SponsorEnquiryPayload) {
  const businessTypeLabel = optionLabel(sponsorBusinessTypes, body.business_type);
  const tierLabel = optionLabel(sponsorTierOptions, body.tier_interest);
  const preferredContactLabel = body.preferred_contact
    ? optionLabel(sponsorContactMethods, body.preferred_contact)
    : "No preference";

  return {
    ...body,
    submitted_at: new Date().toISOString(),
    companyName: body.company_name,
    contactName: body.contact_name,
    businessType: body.business_type,
    business_type_label: businessTypeLabel,
    tierInterest: body.tier_interest,
    tier_interest_label: tierLabel,
    preferredContact: body.preferred_contact,
    preferred_contact_label: preferredContactLabel,
    consent_given: body.consent ? "Yes" : "No",
  };
}
