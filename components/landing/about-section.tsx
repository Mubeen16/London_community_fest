import { siteConfig } from "@/lib/config/site";
import {
  sectionClasses,
  sectionHeadingTheme,
} from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className={sectionClasses("about", "py-12 sm:py-14")}>
      <Container size="narrow">
        <SectionHeading
          align="center"
          theme={sectionHeadingTheme("about")}
          label="About the event"
          title={siteConfig.name}
        />
        <PaperCard className="px-6 py-5 text-left" torn>
          <p className="font-sans text-base leading-relaxed text-ink">
            {siteConfig.description}
          </p>
          <p className="mt-4 font-sans text-sm text-ink-muted">
            Organised by{" "}
            <span className="font-semibold text-ink">{siteConfig.organisedBy}</span>
          </p>
        </PaperCard>
      </Container>
    </section>
  );
}
