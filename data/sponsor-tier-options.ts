/** Values must match Django SponsorEnquiry.tier_interest choices exactly */
export const sponsorTierOptions = [
  { value: "title_sponsor", label: "Title / headline partnership" },
  { value: "diamond", label: "Major partnership" },
  { value: "platinum", label: "Premium partnership" },
  { value: "gold", label: "Brand partnership" },
  { value: "silver", label: "Community partnership" },
  { value: "undecided", label: "Not sure yet — please advise" },
] as const;

export type SponsorTierInterest = (typeof sponsorTierOptions)[number]["value"];
