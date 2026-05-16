import { cn } from "@/lib/utils";

interface PaperCardProps {
  children: React.ReactNode;
  className?: string;
  torn?: boolean;
}

export function PaperCard({ children, className, torn = true }: PaperCardProps) {
  return (
    <div
      className={cn(
        "bg-paper-100 text-ink shadow-lg shadow-forest-950/30",
        torn && "paper-torn",
        className,
      )}
    >
      {children}
    </div>
  );
}
