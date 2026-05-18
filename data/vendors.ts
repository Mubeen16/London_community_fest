import { siteValues } from "@/lib/config/site";

export const vendorMarketing = {
  title: "Trade at the fest",
  description:
    "Bring your brand to Kennington Park. We welcome food, fashion, market, arts, and community stalls for a vibrant day with families and visitors from across London.",
  highlights: [
    ...siteValues,
    "High footfall in the main event area",
    "Applications reviewed within 5 working days",
  ],
  ctaLabel: "Apply for a stall",
  ctaHref: "/vendors",
} as const;
