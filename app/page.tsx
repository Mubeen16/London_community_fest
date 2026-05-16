import { AboutSection } from "@/components/landing/about-section";
import { AttendSection } from "@/components/landing/attend-section";
import { CollageSection } from "@/components/landing/collage-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PricingBanner } from "@/components/landing/pricing-banner";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { SponsorsSection } from "@/components/landing/sponsors-section";
import { VendorsSection } from "@/components/landing/vendors-section";
import { BrandBar } from "@/components/ui/brand-bar";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-14">
        <HeroSection />
        <BrandBar />
        <AboutSection />
        <BrandBar />
        <CollageSection />
        <BrandBar />
        <AttendSection />
        <BrandBar />
        <PricingBanner />
        <BrandBar />
        <VendorsSection />
        <BrandBar />
        <SponsorsSection />
        <BrandBar />
        <FaqSection />
        <BrandBar />
        <SiteFooter />
      </main>
    </>
  );
}
