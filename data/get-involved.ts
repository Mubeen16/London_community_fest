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
      ctaLabel: "Partner with us →",
      buttonStyle: "crimson" as const,
    },
    {
      icon: "🙋",
      title: "Volunteer on the day",
      description:
        "Join 40+ volunteers on event day — receive a £10 food voucher and help keep the fest running smoothly",
      href: "/volunteers",
      ctaLabel: "Sign up to volunteer →",
      buttonStyle: "gold" as const,
    },
  ],
} as const;
