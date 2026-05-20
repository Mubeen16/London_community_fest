import { vendorStallTypes } from "@/data/vendor-stall-types";
import type { VendorEnquiryPayload } from "@/types";

function stallTypeLabel(value: string): string {
  return vendorStallTypes.find((type) => type.value === value)?.label ?? value;
}

/**
 * Payload for Google Apps Script — Django field names plus labels and camelCase aliases.
 */
export function buildVendorAppsScriptPayload(body: VendorEnquiryPayload) {
  const stallLabel = stallTypeLabel(body.stall_type);

  return {
    ...body,
    submitted_at: new Date().toISOString(),
    businessName: body.business_name,
    contactName: body.contact_name,
    stallType: body.stall_type,
    stall_type_label: stallLabel,
    halalCertified: body.halal_certified ?? false,
    halal_certified_label:
      body.stall_type === "food"
        ? body.halal_certified
          ? "Yes"
          : "No"
        : "N/A",
  };
}
