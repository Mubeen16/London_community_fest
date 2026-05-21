import { AboutSection } from "@/components/landing/about-section";
import { AttendSection } from "@/components/landing/attend-section";
import { CollageSection } from "@/components/landing/collage-section";
import { FaqSection } from "@/components/landing/faq-section";
import { GetInvolvedSection } from "@/components/landing/get-involved-section";
import { HeroSection } from "@/components/landing/hero-section";
import { TicketConversionStrip } from "@/components/landing/ticket-conversion-strip";
import { PageShell } from "@/components/layout/page-shell";
import { BrandBar } from "@/components/ui/brand-bar";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <BrandBar />
      <TicketConversionStrip variant="live" />
      <AboutSection />
      <BrandBar />
      <CollageSection />
      <TicketConversionStrip variant="story" />
      <BrandBar />
      <AttendSection />
      <BrandBar />
      <GetInvolvedSection />
      <BrandBar />
      <FaqSection />
      <BrandBar />
    </PageShell>
  );
}
