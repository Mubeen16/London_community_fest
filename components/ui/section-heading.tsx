import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  compact?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  theme = "light",
  className,
  compact = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div className={cn(compact ? "mb-5" : "mb-10", isCenter && "text-center", className)}>
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
        style={{ fontSize: compact ? "clamp(22px, 3vw, 32px)" : "clamp(28px, 4vw, 42px)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            compact ? "mt-2 font-sans text-sm leading-relaxed" : "mt-3 font-sans text-base leading-relaxed",
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
