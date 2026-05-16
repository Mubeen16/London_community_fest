import type { Activity, CollagePhoto } from "@/types";

export const activities: Activity[] = [
  {
    icon: "food",
    title: "Asian food stalls",
    description:
      "Halal cuisine, street food, fresh juices from across South Asia",
  },
  {
    icon: "football",
    title: "Football tournament",
    description:
      "Community teams compete — sign up your team or come cheer",
  },
  {
    icon: "family",
    title: "Kids zone",
    description:
      "Bouncy castle, face painting, games and activities all day",
  },
  {
    icon: "fashion",
    title: "Modest fashion",
    description: "Local designers and independent brands showcasing",
  },
  {
    icon: "stage",
    title: "Live stage",
    description:
      "Speeches, nasheed, spoken word, community awards",
  },
  {
    icon: "games",
    title: "Games & activities",
    description:
      "Raffles, competitions, interactive entertainment zones",
  },
];

/** Bump when replacing files in public/images/collage/ so browsers pick up new images */
const collageVersion = "2";

export const collagePhotos: CollagePhoto[] = [
  {
    id: "food",
    label: "Asian food stalls",
    src: `/images/collage/food.jpg?v=${collageVersion}`,
    alt: "Indian thali platter with rice, curries, and side dishes",
    replaceWith:
      "Halal food stalls — thali, biryani, or street food from your vendors",
  },
  {
    id: "fashion",
    label: "Modest fashion",
    src: `/images/collage/fashion.jpg?v=${collageVersion}`,
    alt: "Colourful textiles and clothing displayed at a market fashion stall",
    replaceWith:
      "Modest fashion stall — abayas, hijabs, or designer pieces on display",
  },
  {
    id: "football",
    label: "Football tournament",
    src: `/images/collage/football.jpg?v=${collageVersion}`,
    alt: "Group of people playing football on a green grass pitch",
    replaceWith:
      "Community football tournament — teams on the pitch or a match in play",
  },
  {
    id: "family",
    label: "Kids zone",
    src: `/images/collage/family.jpg?v=${collageVersion}`,
    alt: "Children playing on an outdoor bouncy castle",
    replaceWith:
      "Kids zone — bouncy castle, face painting, or families in the play area",
  },
  {
    id: "stage",
    label: "Live stage",
    src: `/images/collage/stage.jpg?v=${collageVersion}`,
    alt: "Crowd gathered at an outdoor concert stage for a community performance",
    replaceWith:
      "Live stage — nasheed, speeches, awards, or community performances",
  },
  {
    id: "games",
    label: "Games & activities",
    src: `/images/collage/games.jpg?v=${collageVersion}`,
    alt: "Crowded carnival midway with outdoor fair game booths",
    replaceWith:
      "Games zone — raffles, stalls, competitions, or interactive entertainment",
  },
];
