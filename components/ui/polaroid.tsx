import Image from "next/image";
import { cn } from "@/lib/utils";

interface PolaroidProps {
  label: string;
  src: string;
  alt: string;
  className?: string;
  rotate?: string;
}

export function Polaroid({
  label,
  src,
  alt,
  className,
  rotate = "-rotate-1",
}: PolaroidProps) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col bg-paper-50 p-2 pb-7 shadow-xl shadow-forest-950/40",
        rotate,
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-forest-900">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={src.startsWith("/images/")}
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/85 via-forest-950/40 to-transparent px-3 pb-3 pt-10">
          <span className="font-sans text-xs font-medium uppercase tracking-wider text-cream">
            {label}
          </span>
        </div>
      </div>
      <div className="tape-strip" aria-hidden />
    </figure>
  );
}
