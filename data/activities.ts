import type { Activity, ActivityGroup, CollagePhoto, ExperienceItem } from "@/types";

/** Bump when you replace any file in public/images/collage/ */
const collageVersion = "3";

/** One image per programme card — filename must match card id: {id}.jpg */
const experienceImages = {
  "kids-zone": {
    src: `/images/collage/kids-zone.jpg?v=${collageVersion}`,
    alt: "Kids zone and bouncy castle at the festival",
  },
  "food-stalls": {
    src: `/images/collage/food-stalls.jpg?v=${collageVersion}`,
    alt: "Global food and cuisine stalls",
  },
  "fashion-market": {
    src: `/images/collage/fashion-market.jpg?v=${collageVersion}`,
    alt: "Fashion and community market stalls",
  },
  "live-stage": {
    src: `/images/collage/live-stage.jpg?v=${collageVersion}`,
    alt: "Live stage performances",
  },
  "community-talks": {
    src: `/images/collage/community-talks.jpg?v=${collageVersion}`,
    alt: "Community talks and ideas hub",
  },
  wellbeing: {
    src: `/images/collage/wellbeing.jpg?v=${collageVersion}`,
    alt: "Health and wellbeing pavilion",
  },
  "youth-zone": {
    src: `/images/collage/youth-zone.jpg?v=${collageVersion}`,
    alt: "Youth and future zone",
  },
  football: {
    src: `/images/collage/football.jpg?v=${collageVersion}`,
    alt: "Community football tournament",
  },
  games: {
    src: `/images/collage/games.jpg?v=${collageVersion}`,
    alt: "Games and activities in the park",
  },
  networking: {
    src: `/images/collage/networking.jpg?v=${collageVersion}`,
    alt: "Professional networking at the festival",
  },
} as const;

export type ExperienceImageKey = keyof typeof experienceImages;

/** Single source of truth for programme carousel (order = carousel order) */
export const experienceItems: readonly ExperienceItem[] = [
  {
    id: "kids-zone",
    imageKey: "kids-zone",
    icon: "family",
    category: "Family & Kids",
    title: "Kids zone & bouncy castle",
    description:
      "Dedicated family play area with games, activities, and bouncy fun for children throughout the day",
  },
  {
    id: "food-stalls",
    imageKey: "food-stalls",
    icon: "food",
    category: "Culture & Entertainment",
    title: "Global food & cuisine stalls",
    description:
      "Authentic street food, traditional dishes, fresh flavours, and community favourites from around the world",
  },
  {
    id: "fashion-market",
    imageKey: "fashion-market",
    icon: "fashion",
    category: "Culture & Entertainment",
    title: "Fashion & community market stalls",
    description:
      "Independent designers, small businesses, and community brands showcasing their products and creativity",
  },
  {
    id: "live-stage",
    imageKey: "live-stage",
    icon: "stage",
    category: "Culture & Entertainment",
    title: "Live stage performances",
    description:
      "Cultural performances, spoken word, community spotlights, and live experiences on the main stage",
  },
  {
    id: "community-talks",
    imageKey: "community-talks",
    icon: "community",
    category: "Community & Learning",
    title: "Community talks & ideas hub",
    description:
      "Meaningful discussions, local voices, and inspiring conversations on topics that matter",
  },
  {
    id: "wellbeing",
    imageKey: "wellbeing",
    icon: "wellness",
    category: "Community & Learning",
    title: "Health & wellbeing pavilion",
    description:
      "Wellbeing guidance, health awareness, and practical support for individuals and families",
  },
  {
    id: "youth-zone",
    imageKey: "youth-zone",
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
    imageKey: "networking",
    icon: "network",
    category: "Business & Networking",
    title: "Professional networking",
    description:
      "Connect with professionals, local businesses, entrepreneurs, and community organisations",
  },
] as const;

export function getExperienceImage(key: string) {
  return (
    experienceImages[key as ExperienceImageKey] ?? experienceImages["live-stage"]
  );
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
