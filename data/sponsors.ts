import type { SponsorTier } from "@/types";

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
      "Exclusive top-tier partnership — be the face of London Community Fest 2026. Only one available.",
    features: [
      "Exclusive Title Sponsor status — the ONLY one",
      "Logo on main Entrance Arch gates",
      "Only company logo on the Event Banner",
      "Exclusive stall near main entrance: 3m × 2m",
      "LED screen promotion",
      "Promotional/selling stall in main event location",
      "Named recognition in speeches and videos",
      "Platform presence for your representative",
      "Featured exclusively by influencers",
      "Maximum brand exposure",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: "From £5,000",
    accentColor: "slate",
    featured: true,
    description:
      "Introduced as 'Powered by'. Extensive visibility with prominent event presence.",
    features: [
      "Company logo displayed prominently around the park",
      "LED screen promotion",
      "1 promotional or selling stall: 3m × 2m",
      "Logo on all social media promotions",
      "Logo on leaflets distributed to residents",
      "Digital memorabilia",
      "Everything in Platinum package included",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "From £3,000",
    accentColor: "crimson",
    featured: true,
    description:
      "Introduced as 'Co-Powered by'. Premium package with strong event presence.",
    features: [
      "Promotional or selling stall: 3m × 2m",
      "Large logo on event park banner",
      "Special event prize sponsor",
      "Flex banners on secondary stage",
      "Digital memorabilia with your logo",
      "Selective LED screen promotion",
      "3 social media posts with your logo",
      "Logo on main event backdrop",
      "Logo on distributed leaflets",
      "Everything in Gold included",
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
    description: "Introduced as 'Sponsored by'. Strong visibility for local businesses.",
    features: [
      "Promotional or selling stall: 3m × 2m",
      "3 social media posts with your logo",
      "Selective LED screen promotion",
      "Logo on promotional leaflets",
      "Everything in Silver included",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "£1,000",
    accentColor: "slate",
    featured: false,
    description: "Introduced as 'Co-Sponsored by'. Entry-level sponsorship.",
    features: ["Promotional stall: 3m × 2m", "Logo on promotional leaflets"],
  },
] as const satisfies readonly SponsorTier[];

export const sponsorTiers: SponsorTier[] = [
  ...featuredSponsorTiers,
  ...standardSponsorTiers,
];
