import Link from "next/link";
import { getInvolved } from "@/data/get-involved";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const buttonStyles = {
  gold: "bg-gold-400 text-forest-900 hover:bg-gold-300",
  crimson: "bg-crimson-400 text-cream hover:bg-crimson-500",
} as const;

export function GetInvolvedSection() {
  return (
    <section
      id="get-involved"
      className={sectionClasses("getInvolved", "py-10 sm:py-12")}
    >
      <Container>
        <p className="text-center font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
          {getInvolved.label}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {getInvolved.cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-xl border border-cream/10 bg-forest-800 p-5 sm:p-6"
            >
              <span className="text-2xl leading-none" aria-hidden>
                {card.icon}
              </span>
              <h3 className="mt-3 font-serif text-xl text-cream sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-cream-muted">
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
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
