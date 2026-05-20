/** Values must match Django SponsorEnquiry.business_type choices exactly */
export const sponsorBusinessTypes = [
  { value: "restaurant_food", label: "Restaurant / Food" },
  { value: "retail", label: "Retail" },
  { value: "clothing_fashion", label: "Clothing / Fashion" },
  { value: "finance_insurance", label: "Finance / Insurance" },
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "charity_non_profit", label: "Charity / Non-Profit" },
  { value: "community_organisation", label: "Community Organisation" },
  { value: "real_estate", label: "Real Estate" },
  { value: "other", label: "Other" },
] as const;

export type SponsorBusinessType = (typeof sponsorBusinessTypes)[number]["value"];
