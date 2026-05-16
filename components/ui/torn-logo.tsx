import Image from "next/image";
import { cn } from "@/lib/utils";

interface TornLogoProps {
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  tape?: boolean;
}

export function TornLogo({
  alt,
  width,
  height,
  className,
  imageClassName,
  priority = false,
  tape = false,
}: TornLogoProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 bg-paper-100 paper-torn shadow-lg shadow-forest-950/30",
        tape && "mt-2",
        className,
      )}
    >
      {tape ? <span className="tape-strip" aria-hidden /> : null}
      <Image
        src="/images/logo.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn("h-auto w-full object-contain", imageClassName)}
      />
    </div>
  );
}
