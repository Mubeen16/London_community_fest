import { aboutContent } from "@/data/about";
import { siteConfig } from "@/lib/config/site";
import { homepageSections } from "@/lib/config/landing-layout";
import { LandingSection } from "@/components/ui/landing-section";
import { PaperCard } from "@/components/ui/paper-card";

const { id } = homepageSections.about;

export function AboutSection() {
  return (
    <LandingSection id={id} section="about">
      <div className="about-fade-up mx-auto flex w-full max-w-3xl justify-center">
        <PaperCard className="relative w-full max-w-2xl px-7 py-9 text-left sm:px-11 sm:py-12">
          <span className="tape-strip" aria-hidden />

          <header className="border-b border-paper-300/70 pb-8">
            <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-crimson-400 sm:text-xs">
              {aboutContent.eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-5xl md:text-[3.25rem]"
            >
              {aboutContent.headline}
            </h2>
            <p className="mt-4 max-w-lg font-serif text-xl italic leading-relaxed text-ink-muted sm:text-2xl">
              {aboutContent.subheading}
            </p>
          </header>

          <div className="mt-9 space-y-7 border-b border-paper-300/50 pb-9">
            {aboutContent.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="font-serif text-[1.125rem] leading-[1.95] text-ink sm:text-[1.2rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-10 border-t border-paper-300/60 pt-9 text-left font-serif text-2xl italic leading-snug text-crimson-400 sm:text-[1.75rem]">
            {aboutContent.punchline}
          </p>

          <p className="mt-10 border-t border-paper-300/60 pt-6 text-left font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
            Organised by{" "}
            <span className="text-ink">{siteConfig.organisedBy}</span>
          </p>
        </PaperCard>
      </div>
    </LandingSection>
  );
}
