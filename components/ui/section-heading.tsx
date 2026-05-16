import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  theme = "light",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div className={cn("mb-10", isCenter && "text-center")}>
      <p
        className={cn(
          "font-sans text-xs font-bold uppercase tracking-widest",
          isDark ? "text-gold-400" : "text-crimson-400",
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "mt-2 font-serif",
          isDark ? "text-cream" : "text-ink",
        )}
        style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 font-sans text-base leading-relaxed",
            isDark ? "text-cream-muted" : "text-ink-muted",
            isCenter && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
