import type { Activity } from "@/types";

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

export const collagePhotos = [
  {
    id: "food",
    label: "Asian food stalls",
    src: "/images/collage/food.jpg",
    alt: "Halal street food and shared platters at the festival",
  },
  {
    id: "fashion",
    label: "Modest fashion",
    src: "/images/collage/fashion.jpg",
    alt: "Modest fashion fabrics and designer stalls",
  },
  {
    id: "football",
    label: "Football tournament",
    src: "/images/collage/football.jpg",
    alt: "Community football tournament on the pitch",
  },
  {
    id: "family",
    label: "Kids zone",
    src: "/images/collage/family.jpg",
    alt: "Children enjoying the kids zone and bouncy castle",
  },
  {
    id: "stage",
    label: "Live stage",
    src: "/images/collage/stage.jpg",
    alt: "Live stage performances and community speeches",
  },
  {
    id: "games",
    label: "Games & activities",
    src: "/images/collage/games.jpg",
    alt: "Festival games and interactive entertainment",
  },
] as const;
