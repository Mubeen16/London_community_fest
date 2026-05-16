export interface FAQItem {
  question: string;
  answer: string;
}

export interface Activity {
  icon: string;
  title: string;
  description: string;
}

export interface SponsorTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  accentColor: string;
}
