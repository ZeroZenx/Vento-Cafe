import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import {
  DeliverySection,
  FoundersPersonalitySection,
  HowToOrderSection,
  SocialSection,
  TrustBadges
} from "@/components/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ProductGrid compact />
      <HowToOrderSection />
      <DeliverySection />
      <FoundersPersonalitySection />
      <SocialSection />
    </>
  );
}
