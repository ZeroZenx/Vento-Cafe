import { Hero } from "@/components/Hero";
import { PaymentSection } from "@/components/PaymentSection";
import { ProductGrid } from "@/components/ProductGrid";
import { SocialSection } from "@/components/SocialSection";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getPublicProducts } from "@/lib/inventory/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const publicProducts = await getPublicProducts();
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductGrid compact initialProducts={publicProducts} />
      <WhatsAppCTA />
      <PaymentSection />
      <SocialSection />
    </>
  );
}
