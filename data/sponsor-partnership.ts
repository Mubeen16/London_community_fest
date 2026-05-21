import { eventConfig } from "@/lib/config/event";

export const sponsorPartnershipIntro =
  "London Community Fest brings brands together with a diverse, family-focused audience in the heart of London. Partnerships are shaped around your goals — we do not publish fixed packages online." as const;

export const sponsorPartnershipNote =
  "Our team will respond with tailored partnership options — usually within 24 hours." as const;

export const sponsorPartnershipHighlights = [
  `${eventConfig.expectedAttendance} attendees expected at ${eventConfig.venue.name}`,
  "Family-focused community festival — culture, food, sport, and local business",
  "Strong on-site presence and digital reach across London communities",
  "Flexible arrangements for local, regional, and national partners",
] as const;
