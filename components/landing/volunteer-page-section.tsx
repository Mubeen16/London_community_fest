import Link from "next/link";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import {
  volunteerArrivalExpectation,
  volunteerBenefits,
  volunteerDayOverview,
  volunteerInfoThankYou,
  volunteerInfoTitle,
  volunteerIntro,
  volunteerSignupSummary,
  volunteerVoucherThankYou,
  volunteerWhyTitle,
} from "@/data/volunteer";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

interface VolunteerPageSectionProps {
  id?: string;
  className?: string;
}

function VolunteerSignupSummary({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "space-y-0.5 font-sans text-xs font-semibold text-ink-muted sm:text-sm",
        className,
      )}
    >
      <p>{volunteerSignupSummary.headcount}</p>
      <p>
        {volunteerSignupSummary.date} ·{" "}
        <strong className="font-semibold text-ink">{volunteerSignupSummary.arrival}</strong>
      </p>
      <p>{volunteerSignupSummary.venue}</p>
    </div>
  );
}

function renderBenefitText(text: string, highlight?: string) {
  if (!highlight || !text.includes(highlight)) {
    return text;
  }

  const [before, after] = text.split(highlight);

  return (
    <>
      {before}
      <strong className="font-semibold text-ink">{highlight}</strong>
      {after}
    </>
  );
}

export function VolunteerPageSection({
  id = "signup",
  className,
}: VolunteerPageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        sectionClasses("collage"),
        "scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+0.75rem)] py-5 sm:py-8",
        className,
      )}
    >
      <Container className="relative z-10">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:gap-10">
          <div className="order-2 space-y-5 lg:order-1 lg:pr-2">
            <header className="hidden lg:block">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-crimson-400">
                Volunteers
              </p>
              <h2 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                Help make the fest happen
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted sm:text-base">
                {volunteerIntro}
              </p>
              <VolunteerSignupSummary className="mt-2" />
            </header>

            <div>
              <h3 className="font-serif text-lg text-ink sm:text-xl">{volunteerWhyTitle}</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {volunteerBenefits.map((benefit) => (
                  <li
                    key={benefit.text}
                    className="flex gap-2.5 font-sans text-sm leading-snug text-ink-muted"
                  >
                    <span className="shrink-0 text-base" aria-hidden>
                      {benefit.icon}
                    </span>
                    <span>
                      {renderBenefitText(
                        benefit.text,
                        "highlight" in benefit ? benefit.highlight : undefined,
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-paper-300/80 bg-paper-50/90 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="font-serif text-lg text-ink sm:text-xl">{volunteerInfoTitle}</h3>
              <div className="mt-3 space-y-3 font-sans text-sm leading-relaxed text-ink-muted">
                <p>
                  {volunteerInfoThankYou.before}
                  <strong className="font-semibold text-ink">
                    {volunteerInfoThankYou.highlight}
                  </strong>
                  {volunteerInfoThankYou.after}
                </p>
                <p>
                  {volunteerArrivalExpectation.before}
                  <strong className="font-semibold text-ink">
                    {volunteerArrivalExpectation.highlight}
                  </strong>
                  {volunteerArrivalExpectation.after}
                </p>
                <p>{volunteerDayOverview}</p>
                <p>
                  {volunteerVoucherThankYou.before}
                  <strong className="font-semibold text-ink">
                    {volunteerVoucherThankYou.highlight}
                  </strong>
                  {volunteerVoucherThankYou.after}
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-[calc(3.5rem+env(safe-area-inset-top,0px)+1rem)]">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-crimson-400/20 via-gold-400/15 to-crimson-500/20 blur-sm"
                aria-hidden
              />
              <PaperCard
                torn={false}
                className="relative overflow-visible rounded-2xl border-2 border-crimson-400/35 bg-white px-4 py-4 shadow-xl shadow-crimson-900/10 sm:px-5 sm:py-5"
              >
                <div className="mb-4 border-b border-paper-200 pb-3">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-crimson-400">
                    Volunteer registration
                  </p>
                  <h2 className="mt-1 font-serif text-xl leading-tight text-ink sm:text-2xl">
                    Sign up in 30 seconds
                  </h2>
                  <VolunteerSignupSummary className="mt-1.5" />
                </div>
                <VolunteerForm />
              </PaperCard>
            </div>

            <p className="mt-3 text-center font-sans text-sm text-ink-muted lg:text-left">
              Prefer email?{" "}
              <Link
                href={`mailto:${siteConfig.email}?subject=Volunteer`}
                className="font-semibold text-crimson-400 underline-offset-2 hover:text-crimson-500"
              >
                {siteConfig.email}
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
