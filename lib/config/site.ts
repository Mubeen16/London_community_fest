export const siteValues = [
  "Community-led",
  "All communities welcome",
  "Family-friendly",
  "Free for kids under 10",
] as const;

export const siteValuesLine = siteValues.join(" · ");

export const siteConfig = {
  name: "London Community Fest",
  shortName: "LCF",
  description:
    "A family-focused community experience that brings together culture, connection, entertainment, wellbeing, learning, and meaningful conversations in one vibrant event.",
  tagline: "More than a festival",
  url: "https://londoncommunityfest.org",
  ogImage: "/images/logo.png",
  organisedBy: "South Indian Community UK",
  email: "mail@communityfest.uk",
  phone: ["07961 950 231", "07423 029 023"],
  /** Set when sponsorship PDF is added to public/ */
  sponsorshipPdfUrl: null as string | null,
} as const;
