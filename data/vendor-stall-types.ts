export const vendorStallTypes = [
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "business", label: "Business" },
  { value: "arts", label: "Arts & crafts" },
  { value: "other", label: "Other" },
] as const;

export type VendorStallType = (typeof vendorStallTypes)[number]["value"];
