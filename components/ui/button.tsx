import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const variantClasses = {
  primary: "bg-crimson-400 text-cream hover:bg-crimson-500",
  secondary: "bg-gold-400 text-forest-900 hover:bg-gold-300",
  outline:
    "border border-cream/15 bg-transparent text-cream hover:bg-cream/5",
  ghost: "bg-transparent text-cream-muted hover:text-cream",
} as const;

const sizeClasses = {
  sm: "rounded-md px-4 py-2 text-sm",
  default: "rounded-lg px-6 py-3 text-sm",
  lg: "rounded-lg px-8 py-4 text-base",
} as const;

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

export function buttonClasses(
  variant: keyof typeof variantClasses,
  size: keyof typeof sizeClasses = "default",
  className?: string,
) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export function Button({
  variant,
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props} />
  );
}
