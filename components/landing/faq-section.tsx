import { getFaqItems } from "@/data/faq";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { homepageSections } from "@/lib/config/landing-layout";
import { LandingSection } from "@/components/ui/landing-section";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHeadingTheme } from "@/lib/section-theme";

const { id, theme, label, title, description } = homepageSections.faq;

interface FaqSectionProps {
  title?: string;
  description?: string;
}

export function FaqSection({
  title: titleOverride,
  description: descriptionOverride,
}: FaqSectionProps) {
  const items = getFaqItems();
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <LandingSection id={id} section={theme} containerSize="narrow">
      <SectionHeading
        align="center"
        titleId={`${id}-title`}
        theme={sectionHeadingTheme(theme)}
        label={label}
        title={titleOverride ?? title}
        description={descriptionOverride ?? description}
      />

      <PaperCard torn={false} className="overflow-hidden rounded-xl">
        <FaqAccordion columns={columns} />
      </PaperCard>
    </LandingSection>
  );
}
