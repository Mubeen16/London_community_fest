import { designConfig } from "@/lib/config/design";
import { cn } from "@/lib/utils";

export function BrandBar() {
  const { colors, height } = designConfig.brandBar;

  return (
    <div className={cn("flex w-full", height)} aria-hidden>
      {colors.map((color) => (
        <div key={color} className={cn("flex-1", color)} />
      ))}
    </div>
  );
}
