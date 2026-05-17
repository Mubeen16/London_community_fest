export const vendorTariffs = {
  title: "Stall tariffs",
  tiers: [
    {
      name: "Bronze",
      price: "£500",
      dimensions: "3m × 3m",
      note: "Position charges apply",
      accent: "ink",
    },
    {
      name: "Silver",
      price: "£700",
      dimensions: "3m × 6m",
      note: "Premium spot has additional charges",
      accent: "slate",
    },
    {
      name: "Gold",
      price: "£900",
      dimensions: "6m × 12m",
      note: "Large space · premium spot",
      accent: "gold",
    },
  ],
  inclusions: [
    "Gazebo stalls, tables, 2 chairs per stall",
    "Electricity provided if needed",
  ],
} as const;
