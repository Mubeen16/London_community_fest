export interface FAQItem {
  question: string;
  answer: string;
}

export interface Activity {
  icon: string;
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

export interface SponsorTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  accentColor: string;
}
