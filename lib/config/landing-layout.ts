import type { SectionName } from "@/lib/config/design";

/** Consistent vertical rhythm for homepage sections */
export const sectionSpacing = {
  default: "py-14 sm:py-20",
  compact: "py-12 sm:py-16",
} as const;

/** Homepage section order and metadata — single source for structure */
export const homepageSections = {
  about: {
    id: "about",
    theme: "about" satisfies SectionName,
    label: "About",
    title: "Our story",
    description: "A community-led celebration open to all of London.",
  },
  whatsOn: {
    id: "whats-on",
    theme: "collage" satisfies SectionName,
    label: "What's on",
    title: "The experience",
    description:
      "Culture, connection, learning, and family fun — thoughtfully curated across the park.",
  },
  attend: {
    id: "attend",
    theme: "attend" satisfies SectionName,
    label: "Attend",
    title: "Plan your visit",
    description: "Date, location, tickets, and everything you need before you arrive.",
  },
  getInvolved: {
    id: "get-involved",
    theme: "getInvolved" satisfies SectionName,
    label: "Get involved",
    title: "Partner with the fest",
    description: "Stalls, sponsorship, and volunteer opportunities for organisations and brands.",
  },
  faq: {
    id: "faq",
    theme: "faq" satisfies SectionName,
    label: "FAQ",
    title: "Good to know",
    description: "Quick answers before you visit.",
  },
} as const;
