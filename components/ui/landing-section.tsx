import type { ReactNode } from "react";
import type { SectionName } from "@/lib/config/design";
import { sectionSpacing } from "@/lib/config/landing-layout";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface LandingSectionProps {
  id: string;
  section: SectionName;
  children: ReactNode;
  containerSize?: "default" | "narrow" | "wide";
  spacing?: keyof typeof sectionSpacing;
  className?: string;
  containerClassName?: string;
}

export function LandingSection({
  id,
  section,
  children,
  containerSize = "default",
  spacing = "default",
  className,
  containerClassName,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(sectionClasses(section), sectionSpacing[spacing], className)}
    >
      <Container
        size={containerSize}
        className={cn("relative z-10", containerClassName)}
      >
        {children}
      </Container>
    </section>
  );
}
