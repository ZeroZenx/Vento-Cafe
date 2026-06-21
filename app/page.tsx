import { Hero } from "@/components/Hero";
import { LifestyleGallery } from "@/components/LifestyleGallery";
import { PaymentSection } from "@/components/PaymentSection";
import { ProductGrid } from "@/components/ProductGrid";
import { SocialSection } from "@/components/SocialSection";
import { StorySection } from "@/components/StorySection";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StorySection compact />
      <ProductGrid compact />
      <WhatsAppCTA />
      <PaymentSection />
      <LifestyleGallery />
      <SocialSection />
    </>
  );
}
