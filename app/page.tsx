import { Hero } from "@/components/Hero";
import { PaymentSection } from "@/components/PaymentSection";
import { ProductGrid } from "@/components/ProductGrid";
import { SocialSection } from "@/components/SocialSection";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductGrid compact />
      <WhatsAppCTA />
      <PaymentSection />
      <SocialSection />
    </>
  );
}
