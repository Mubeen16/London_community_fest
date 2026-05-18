import { aboutContent } from "@/data/about";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function AboutSection() {
  return (
    <section
      id="about"
      className={cn(
        sectionClasses("about"),
        "relative overflow-hidden py-16 sm:py-20",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper-50/90 via-paper-100/40 to-paper-200"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-crimson-400/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-gold-400/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="about-fade-up mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-crimson-400 sm:text-xs">
            {aboutContent.eyebrow}
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl md:text-[3.25rem]">
            {aboutContent.headline}
          </h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-ink-muted sm:text-xl">
            {aboutContent.subheading}
          </p>

          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-left sm:text-center">
            {aboutContent.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="font-sans text-base leading-[1.8] text-ink sm:text-[1.0625rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-sans text-base leading-[1.8] text-ink sm:text-[1.0625rem]">
            {aboutContent.closing.statement}
          </p>

          <div className="mx-auto mt-12 max-w-xl space-y-1 sm:mt-14">
            {aboutContent.closing.punchline.map((line) => (
              <p
                key={line}
                className="font-serif text-xl italic text-crimson-400 sm:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="mt-10 font-sans text-sm text-ink-muted">
            Organised by{" "}
            <span className="font-semibold text-ink">{siteConfig.organisedBy}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
