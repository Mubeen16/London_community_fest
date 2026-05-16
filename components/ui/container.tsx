import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

const sizeClasses = {
  default: "max-w-6xl",
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
} as const;

export function containerClasses(
  size: keyof typeof sizeClasses = "default",
  className?: string,
) {
  return cn("mx-auto w-full px-6 sm:px-8", sizeClasses[size], className);
}

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return <div className={containerClasses(size, className)} {...props} />;
}
