export interface FAQItem {
  question: string;
  answer: string;
  /** Show Google Maps directions link below the answer (transport FAQ). */
  directionsLink?: boolean;
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

/** Waitlist signup — shared by Apps Script (now) and Django API (later). */
export interface WaitlistPayload {
  email: string;
}

/** Vendor application payload — shared by Apps Script (now) and Django API (later). */
export interface VendorEnquiryPayload {
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  stall_type: string;
  description: string;
  halal_certified?: boolean;
}

/** Sponsor enquiry form payload — shared by Apps Script (now) and Django API (later). */
export interface SponsorEnquiryPayload {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string;
  tier_interest: string;
  preferred_contact: string;
  message: string;
  consent: boolean;
}

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
