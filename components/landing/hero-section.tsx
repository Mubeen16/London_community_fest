import { HeroCountdown } from "@/components/landing/hero-countdown";
import { HeroEventBlock } from "@/components/landing/hero-event-block";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config/site";
import { sectionClasses } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      id="hero"
      className={cn(
        sectionClasses("hero"),
        "relative overflow-hidden py-10 sm:py-14",
      )}
    >
      <Container className="relative z-10">
        <div>
          <h1 className="font-sans text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.08em] sm:text-6xl sm:tracking-[0.12em] md:text-7xl">
            <span className="text-crimson-400">London</span>
            <br />
            <span className="text-cream">Community</span>
          </h1>
          <p className="relative z-10 -mt-1 font-serif text-5xl italic text-gold-400 sm:-mt-3 sm:text-8xl md:text-9xl">
            Fest
          </p>

          <p className="mt-4 font-serif text-xl italic text-cream-muted sm:text-2xl">
            {siteConfig.tagline}
          </p>
          <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-cream-muted sm:text-base">
            {siteConfig.description}
          </p>

          <HeroEventBlock />

          <HeroCountdown className="mt-6" />
        </div>
      </Container>
    </section>
  );
}
