import { cn } from "@/lib/utils";

const accentStyles = {
  crimson: {
    border: "border-crimson-400",
    text: "text-crimson-400",
    bg: "bg-crimson-50",
  },
  slate: {
    border: "border-slate-500",
    text: "text-slate-500",
    bg: "bg-slate-50",
  },
  gold: {
    border: "border-gold-400",
    text: "text-gold-500",
    bg: "bg-gold-50",
  },
} as const;

export function sponsorAccentClasses(accentColor: string) {
  const style =
    accentStyles[accentColor as keyof typeof accentStyles] ??
    accentStyles.slate;

  return {
    card: cn("border-2", style.border, style.bg),
    price: cn("font-serif text-3xl", style.text),
    label: cn(
      "font-sans text-xs font-semibold uppercase tracking-wider",
      style.text,
    ),
    check: style.text,
  };
}
