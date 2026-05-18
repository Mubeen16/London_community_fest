import { siteConfig } from "@/lib/config/site";
import type { FAQItem } from "@/types";

export const faqItems: FAQItem[] = [
  {
    question: "Is the event family-friendly?",
    answer:
      "Absolutely. London Community Fest is designed as a welcoming community experience for all ages — with a dedicated children's zone, family activities, and a safe, inclusive atmosphere. Children under 10 enter free.",
  },
  {
    question: "How much is entry?",
    answer:
      "Adults (10+) pay £3 entry. Children under 10 enter free. All proceeds go towards organising the event.",
  },
  {
    question: "Who is the event for?",
    answer:
      "Everyone. Born from the South Indian Community UK and built for all of London — families, professionals, young people, local businesses, and communities across the capital are welcome.",
  },
  {
    question: "How do I get there?",
    answer:
      "Kennington Park is a 5-minute walk from Oval station and Kennington station, both on the Northern line. Street parking is available nearby, and there are bike racks at the park entrance.",
  },
  {
    question: "Is there wheelchair access?",
    answer:
      "Yes. Kennington Park has flat ground throughout, wheelchair-accessible paths, and accessible toilet facilities.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes! We're looking for 40+ volunteers. Email us with the subject 'Volunteer' and we'll be in touch with roles and shifts.",
  },
  {
    question: "Is there prayer space?",
    answer:
      "Yes. A dedicated prayer area with wudu facilities will be set up within the event grounds. Prayer times will be announced on the main stage.",
  },
  {
    question: "Who organises this?",
    answer:
      "London Community Fest is organised by South Indian Community UK, a registered community organisation. The event is run entirely by volunteers.",
  },
];

export function getFaqItems(): FAQItem[] {
  return faqItems.map((item) => {
    if (item.question !== "Can I volunteer?") {
      return item;
    }
    return {
      ...item,
      answer: `Yes! We're looking for 40+ volunteers. Email ${siteConfig.email} with the subject 'Volunteer' and we'll be in touch with roles and shifts.`,
    };
  });
}
