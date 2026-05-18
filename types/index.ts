export interface FAQItem {
  question: string;
  answer: string;
}

export interface Activity {
  icon: string;
  title: string;
  description: string;
}

export interface ActivityGroup {
  category: string;
  activities: readonly Activity[];
}

export interface ExperienceItem {
  id: string;
  imageKey: string;
  icon: string;
  category: string;
  title: string;
  description: string;
}

export interface CollagePhoto {
  id: string;
  label: string;
  src: string;
  alt: string;
  /** Real festival photo to use when replacing the Unsplash placeholder */
  replaceWith: string;
}

export type SponsorAccentColor = "gold" | "slate" | "crimson";

export interface SponsorTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: readonly string[];
  accentColor: SponsorAccentColor;
  /** Featured tiers show full detail in the 3-column grid */
  featured: boolean;
  /** Title Sponsor — premium card styling */
  exclusive?: boolean;
}
