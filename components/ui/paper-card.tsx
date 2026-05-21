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
        "bg-paper-50 text-ink shadow-lg shadow-black/20",
        torn && "paper-torn",
        className,
      )}
    >
      {children}
    </div>
  );
}
