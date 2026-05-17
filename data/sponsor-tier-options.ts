/** Values must match Django SponsorEnquiry.tier_interest choices exactly */
export const sponsorTierOptions = [
  { value: "title_sponsor", label: "Title Sponsor (from £10,000)" },
  { value: "diamond", label: "Diamond (from £5,000)" },
  { value: "platinum", label: "Platinum (from £3,000)" },
  { value: "gold", label: "Gold (£2,000)" },
  { value: "silver", label: "Silver (£1,000)" },
  { value: "undecided", label: "Not sure yet" },
] as const;

export type SponsorTierInterest = (typeof sponsorTierOptions)[number]["value"];
