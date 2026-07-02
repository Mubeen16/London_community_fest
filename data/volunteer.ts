import { eventConfig } from "@/lib/config/event";

export const volunteerIntro =
  "London Community Fest is run by volunteers. Sign up in under 30 seconds — roles are assigned on the morning based on attendance and what the event needs." as const;

export const volunteerWhyTitle = "Why volunteer?" as const;

export const volunteerBenefits = [
  { icon: "🤝", text: "Make a difference in your community" },
  { icon: "🎉", text: "Be part of London Community Fest 2026" },
  {
    icon: "🍽️",
    text: "Enjoy a £10 food voucher as a thank you",
    highlight: "£10 food voucher",
  },
  { icon: "👥", text: "Meet and work alongside fellow volunteers" },
] as const;

export const volunteerInfoTitle = "Volunteer Information" as const;

export const volunteerInfoThankYou = {
  before: "Thank you for volunteering with ",
  highlight: "London Community Fest 2026",
  after: ".",
} as const;

export const volunteerArrivalExpectation = {
  before: "All volunteers are requested to arrive ",
  highlight: "between 7:00 AM and 8:00 AM",
  after:
    " for registration, a short briefing, and role allocation before the festival opens.",
} as const;

export const volunteerDayOverview =
  "Throughout the day, you may assist with visitor guidance, ticketing, traffic and vehicle assistance, vendor support, health & safety, stewarding, event setup, and pack-down." as const;

export const volunteerVoucherThankYou = {
  before: "As a thank you for your support, every volunteer will receive a ",
  highlight: "£10 food voucher",
  after: " to use at participating food stalls.",
} as const;

export const volunteerSignupSummary = {
  headcount: "We're looking for 40+ volunteers",
  date: eventConfig.dateDisplay,
  arrival: "Arrive between 7:00–8:00 AM",
  venue: eventConfig.venue.name,
} as const;

export const volunteerFormReassurance =
  "It only takes 30 seconds to register. We'll contact you with further details before the event." as const;

export const volunteerSubmitLabel = "Become a Volunteer" as const;
