import type { SponsorTier } from "@/types";

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Event partner",
    price: "£9,000",
    description: "Be the face of the festival. Only one available.",
    features: [
      "Event named after your brand",
      "12–15 min stage speaking slot",
      "Premium 5m × 4m stall",
      "8 social posts (80k+ reach)",
      "LED screen visibility all day",
    ],
    accentColor: "crimson",
  },
  {
    name: "Strategic partner",
    price: "£5,000",
    description: "Premium engagement, direct access.",
    features: [
      "8–10 min speaking opportunity",
      "4m × 3m high-traffic stall",
      "5 social posts (50k+ reach)",
      "Logo on 8,000+ leaflets",
    ],
    accentColor: "slate",
  },
  {
    name: "Community partner",
    price: "£2,000",
    description: "Strong visibility, direct connection.",
    features: [
      "3m × 2.5m stall included",
      "3 social posts (30k+ reach)",
      "Logo on event leaflets",
      "MC stage acknowledgement",
    ],
    accentColor: "gold",
  },
];
