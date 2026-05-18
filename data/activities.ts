import type { Activity, ActivityGroup, CollagePhoto, ExperienceItem } from "@/types";

/** Bump when replacing files in public/images/collage/ */
const collageVersion = "2";

const experienceImages = {
  food: {
    src: `/images/collage/food.jpg?v=${collageVersion}`,
    alt: "Asian cuisine and food stalls at the festival",
  },
  fashion: {
    src: `/images/collage/fashion.jpg?v=${collageVersion}`,
    alt: "Modest fashion and market stalls",
  },
  football: {
    src: `/images/collage/football.jpg?v=${collageVersion}`,
    alt: "Community football tournament on the pitch",
  },
  family: {
    src: `/images/collage/family.jpg?v=${collageVersion}`,
    alt: "Kids zone with families enjoying activities",
  },
  stage: {
    src: `/images/collage/stage.jpg?v=${collageVersion}`,
    alt: "Live stage performances and community spotlights",
  },
  games: {
    src: `/images/collage/games.jpg?v=${collageVersion}`,
    alt: "Games and interactive activities in the park",
  },
} as const;

export type ExperienceImageKey = keyof typeof experienceImages;

/** Single source of truth for photo strip + programme cards */
export const experienceItems: readonly ExperienceItem[] = [
  {
    id: "kids-zone",
    imageKey: "family",
    icon: "family",
    category: "Family & Kids",
    title: "Kids zone & bouncy castle",
    description:
      "Dedicated family play area with games, activities, and bouncy fun for children throughout the day",
  },
  {
    id: "food-stalls",
    imageKey: "food",
    icon: "food",
    category: "Culture & Entertainment",
    title: "Global food & cuisine stalls",
    description:
      "Authentic street food, traditional dishes, fresh flavours, and community favourites from around the world",
  },
  {
    id: "fashion-market",
    imageKey: "fashion",
    icon: "fashion",
    category: "Culture & Entertainment",
    title: "Fashion & community market stalls",
    description:
      "Independent designers, small businesses, and community brands showcasing their products and creativity",
  },
  {
    id: "live-stage",
    imageKey: "stage",
    icon: "stage",
    category: "Culture & Entertainment",
    title: "Live stage performances",
    description:
      "Cultural performances, spoken word, community spotlights, and live experiences on the main stage",
  },
  {
    id: "community-talks",
    imageKey: "stage",
    icon: "community",
    category: "Community & Learning",
    title: "Community talks & ideas hub",
    description:
      "Meaningful discussions, local voices, and inspiring conversations on topics that matter",
  },
  {
    id: "wellbeing",
    imageKey: "games",
    icon: "wellness",
    category: "Community & Learning",
    title: "Health & wellbeing pavilion",
    description:
      "Wellbeing guidance, health awareness, and practical support for individuals and families",
  },
  {
    id: "youth-zone",
    imageKey: "family",
    icon: "youth",
    category: "Community & Learning",
    title: "Youth & future zone",
    description:
      "Inspiration, mentorship, and interactive activities designed to support and encourage young people",
  },
  {
    id: "football",
    imageKey: "football",
    icon: "football",
    category: "Sports & Activities",
    title: "Football tournament",
    description:
      "Community teams competing in a friendly tournament — join a team or support from the sidelines",
  },
  {
    id: "games",
    imageKey: "games",
    icon: "games",
    category: "Sports & Activities",
    title: "Games & activities",
    description:
      "Interactive experiences, friendly competitions, and fun activities for all ages",
  },
  {
    id: "networking",
    imageKey: "fashion",
    icon: "network",
    category: "Business & Networking",
    title: "Professional networking",
    description:
      "Connect with professionals, local businesses, entrepreneurs, and community organisations",
  },
] as const;

export function getExperienceImage(key: string) {
  return experienceImages[key as ExperienceImageKey] ?? experienceImages.stage;
}

function groupByCategory(items: readonly ExperienceItem[]): ActivityGroup[] {
  const order = [
    "Family & Kids",
    "Culture & Entertainment",
    "Community & Learning",
    "Sports & Activities",
    "Business & Networking",
  ];
  const map = new Map<string, Activity[]>();

  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push({
      icon: item.icon,
      title: item.title,
      description: item.description,
    });
    map.set(item.category, list);
  }

  return order
    .filter((category) => map.has(category))
    .map((category) => ({
      category,
      activities: map.get(category) ?? [],
    }));
}

export const activityGroups: readonly ActivityGroup[] = groupByCategory(experienceItems);

export const activities: Activity[] = experienceItems.map((item) => ({
  icon: item.icon,
  title: item.title,
  description: item.description,
}));

export const collagePhotos: CollagePhoto[] = experienceItems.map((item) => {
  const image = getExperienceImage(item.imageKey);
  return {
    id: item.id,
    label: item.title,
    src: image.src,
    alt: image.alt,
    replaceWith: `Photo for ${item.title}`,
  };
});
