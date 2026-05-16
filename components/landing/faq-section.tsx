import { getFaqItems } from "@/data/faq";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import {
  sectionClasses,
  sectionHeadingTheme,
} from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqSection() {
  const items = getFaqItems();
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <section id="faq" className={sectionClasses("faq", "py-10 sm:py-12")}>
      <Container size="narrow" className="relative z-10">
        <SectionHeading
          align="center"
          theme={sectionHeadingTheme("faq")}
          label="FAQ"
          title="Good to know"
          description="Quick answers before you visit."
        />

        <PaperCard torn className="overflow-hidden">
          <FaqAccordion columns={columns} />
        </PaperCard>
      </Container>
    </section>
  );
}
