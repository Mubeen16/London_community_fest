import { sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import type { SectionName } from "@/lib/config/design";

interface PageHeroProps {
  section: SectionName;
  label: string;
  title: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export function PageHero({
  section,
  label,
  title,
  description,
  className,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        sectionClasses(section, compact ? "py-8 sm:py-9" : "py-12 sm:py-14"),
        className,
      )}
    >
      <Container
        size="narrow"
        className={cn("relative z-10", compact && "[&>div]:mb-5")}
      >
        <SectionHeading
          align="center"
          theme={sectionHeadingTheme(section)}
          label={label}
          title={title}
          description={description}
        />
      </Container>
    </section>
  );
}
