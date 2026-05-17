import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const formInputClass =
  "w-full rounded-lg border border-paper-300/90 bg-white px-4 py-2.5 font-sans text-sm text-ink shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-ink-light/60 focus:border-crimson-400/60 focus:ring-2 focus:ring-crimson-400/15 disabled:cursor-not-allowed disabled:opacity-60";

export const formInputCompactClass =
  "w-full rounded-md border border-paper-300/90 bg-white px-3 py-2 font-sans text-sm text-ink shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-ink-light/60 focus:border-crimson-400/60 focus:ring-2 focus:ring-crimson-400/15 disabled:cursor-not-allowed disabled:opacity-60";

export const formLabelClass = "font-sans text-sm font-medium text-ink";

export const formLabelCompactClass =
  "font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function FormField({ id, label, children, className, compact = false }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={compact ? formLabelCompactClass : formLabelClass}>
        {label}
      </label>
      <div className={compact ? "mt-1" : "mt-1.5"}>{children}</div>
    </div>
  );
}

interface FormFieldGroupProps {
  title: string;
  description?: string;
  children: ReactNode;
  compact?: boolean;
}

export function FormFieldGroup({
  title,
  description,
  children,
  compact = false,
}: FormFieldGroupProps) {
  return (
    <fieldset className={cn("space-y-3", !compact && "space-y-4")}>
      <legend
        className={cn(
          "block w-full border-b border-paper-300/80",
          compact ? "mb-2 pb-2" : "mb-5 pb-4",
        )}
      >
        <span className={cn("font-serif text-ink", compact ? "text-base" : "text-xl")}>
          {title}
        </span>
        {description ? (
          <span
            className={cn(
              "mt-0.5 block font-sans leading-relaxed text-ink-muted",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {description}
          </span>
        ) : null}
      </legend>
      {children}
    </fieldset>
  );
}

export function FormCallout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "border-l-4 border-gold-400 bg-paper-50/90 py-3 pr-4 pl-4 font-sans text-sm leading-relaxed text-ink-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}
