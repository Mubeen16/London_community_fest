import { eventConfig } from "@/lib/config/event";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function PricingBanner() {
  const { adult, child } = eventConfig.pricing;

  return (
    <section
      className={cn(sectionClasses("hero"), "py-10")}
      aria-label="Entry pricing"
    >
      <Container
        size="narrow"
        className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-10"
      >
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em]">
          Adults entry fee:
        </p>
        <p className="font-serif text-5xl italic text-gold-400 sm:text-6xl">
          {adult.display}
        </p>
        <p className="max-w-xs font-sans text-sm uppercase tracking-wide text-cream-muted">
          Free entry for kids {child.ageRange}
        </p>
      </Container>
    </section>
  );
}
