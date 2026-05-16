export const eventConfig = {
  name: "London Community Fest 2026",
  date: new Date("2026-07-12T11:00:00+01:00"),
  dateDisplay: "Sunday, 12 July 2026",
  timeDisplay: "11am – 7pm",
  venue: {
    name: "Kennington Park",
    address: "Kennington Park Road, London SE11 4AX",
    postcode: "SE11 4AX",
    nearestStations: [
      "Oval (Northern line)",
      "Kennington (Northern line)",
    ],
    parking:
      "No dedicated festival car park. Limited on-street parking nearby; we strongly recommend public transport. Oval and Kennington stations are a short walk from the park.",
    accessibility:
      "Level access from Kennington Park Road. Paved paths throughout the main event area. Accessible toilets on site. If you need assistance on the day, visit the information tent near the main entrance.",
  },
  pricing: {
    adult: {
      amount: 3,
      currency: "GBP",
      display: "£3",
      ageRange: "10+",
    },
    child: {
      amount: 0,
      currency: "GBP",
      display: "Free",
      ageRange: "under 10",
    },
  },
  registrationOpen: false,
  expectedAttendance: "4,000+",
  foodStallCount: "10+",
} as const;
