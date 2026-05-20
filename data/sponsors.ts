import type { SponsorTier } from "@/types";

export const sponsorPackagesIntro =
  "We offer a range of sponsorship opportunities designed to provide strong brand visibility, community engagement, and meaningful event presence at London Community Fest 2026." as const;

export const sponsorNegotiableNote =
  "All packages are negotiable. Contact us to discuss a custom arrangement." as const;

export const featuredSponsorTiers = [
  {
    id: "title_sponsor",
    name: "Title Sponsor",
    price: "From £10,000",
    accentColor: "gold",
    exclusive: true,
    featured: true,
    description:
      "Exclusive top-tier partnership — become the face of London Community Fest 2026. Maximum visibility with premium event-wide branding and recognition.",
    features: [
      "Exclusive Title Sponsor status — the only Main Sponsor",
      "Main Entrance Arch branding",
      "Exclusive company logo placement on the primary event banner",
      "Premium stall placement near the main entrance and exit (3m × 2m)",
      "LED/LCD screen promotion throughout the event",
      "Stage recognition and sponsor acknowledgements during speeches",
      "Opportunity to operate a promotional or sales stall in the main event area (3m × 2m)",
      "Exclusive influencer features across multiple social media promotions",
      "Maximum brand exposure and strong association with the event",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: "From £5,000",
    accentColor: "slate",
    featured: true,
    description:
      'Introduced as "Powered By". Extensive visibility with a prominent presence throughout the event.',
    features: [
      "Prominent company logo placement across the event park",
      "LED/LCD screen promotions throughout the event",
      "One promotional or sales stall in the main event area (3m × 2m)",
      "Company logo featured in social media promotions",
      "Logo placement on printed leaflets distributed to residents",
      "Branding included in digital event memorabilia",
      "Includes all Platinum Package benefits",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "From £3,000",
    accentColor: "crimson",
    featured: true,
    description: 'Introduced as "Co-Powered By".',
    features: [
      "Promotional or sales stall (3m × 2m)",
      "Large logo placement on event banners",
      "Recognition as a sponsor for selected event participant prizes",
      "Visibility on secondary stage flex banners",
      "Selective LED screen promotions",
      "Three dedicated social media promotions",
      "Logo placement on event backdrops and printed leaflets",
      "Includes all Gold Package benefits",
    ],
  },
] as const satisfies readonly SponsorTier[];

export const standardSponsorTiers = [
  {
    id: "gold",
    name: "Gold",
    price: "£2,000",
    accentColor: "gold",
    featured: false,
    description: 'Introduced as "Sponsored By".',
    features: [
      "Promotional or sales stall (3m × 2m)",
      "Selective social media promotions",
      "LED screen promotional rotation",
      "Company logo displayed on promotional leaflets",
      "Includes all Silver Package benefits",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "£1,000",
    accentColor: "slate",
    featured: false,
    description: 'Introduced as "Co-Sponsored By".',
    features: [
      "Promotional stall (3m × 2m)",
      "Company logo placement on promotional leaflets",
    ],
  },
] as const satisfies readonly SponsorTier[];

export const sponsorTiers: SponsorTier[] = [
  ...featuredSponsorTiers,
  ...standardSponsorTiers,
];
