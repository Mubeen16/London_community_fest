export const getInvolved = {
  label: "Get involved",
  cards: [
    {
      icon: "🏪",
      title: "Trade at the fest",
      description:
        "Food, fashion, business or crafts — apply for a stall and reach 2,000+ visitors",
      href: "/vendors",
      ctaLabel: "Apply for a stall →",
      buttonStyle: "gold" as const,
    },
    {
      icon: "🤝",
      title: "Partner with us",
      description:
        "Connect your brand with thousands of engaged families across London",
      href: "/sponsors",
      ctaLabel: "View packages →",
      buttonStyle: "crimson" as const,
    },
  ],
} as const;
