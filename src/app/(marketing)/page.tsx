import { HeroSection } from "@/components/marketing/hero-section";
import { EditorialSection } from "@/components/marketing/editorial-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { QuoteSection } from "@/components/marketing/quote-section";
import { DestinationsSection } from "@/components/marketing/destinations-section";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EditorialSection />
      <FeaturesSection />
      <QuoteSection />
      <DestinationsSection />
      <CtaSection />
    </>
  );
}
