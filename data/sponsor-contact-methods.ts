/** Values must match Django SponsorEnquiry.preferred_contact choices exactly */
export const sponsorContactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type SponsorPreferredContact = (typeof sponsorContactMethods)[number]["value"];
