import Link from "next/link";
import { getInvolved } from "@/data/get-involved";
import { homepageSections } from "@/lib/config/landing-layout";
import { LandingSection } from "@/components/ui/landing-section";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHeadingTheme } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

const { id, theme, label, title, description } = homepageSections.getInvolved;

const buttonStyles = {
  gold: "bg-gold-400 text-ink hover:bg-gold-300",
  crimson: "bg-crimson-400 text-cream hover:bg-crimson-500",
} as const;

export function GetInvolvedSection() {
  return (
    <LandingSection id={id} section={theme}>
      <SectionHeading
        align="center"
        titleId={`${id}-title`}
        theme={sectionHeadingTheme(theme)}
        label={label}
        title={title}
        description={description}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {getInvolved.cards.map((card) => (
          <article key={card.title}>
            <PaperCard torn={false} className="flex h-full flex-col p-5 sm:p-6">
            <span className="text-2xl leading-none" aria-hidden>
              {card.icon}
            </span>
            <h3 className="mt-3 font-serif text-xl text-ink sm:text-2xl">
              {card.title}
            </h3>
            <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink-muted">
              {card.description}
            </p>
            <Link
              href={card.href}
              className={cn(
                "mt-5 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors sm:w-auto",
                buttonStyles[card.buttonStyle],
              )}
            >
              {card.ctaLabel}
            </Link>
            </PaperCard>
          </article>
        ))}
      </div>
    </LandingSection>
  );
}
