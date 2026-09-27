import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductsMasthead } from "@/components/ProductsMasthead";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Vento Café & Market coffee, hair care, lotions, and personal care collections for WhatsApp ordering in Los Guayos, Carabobo."
};

export default function ProductsPage() {
  return (
    <>
      <ProductsMasthead />
      <ProductGrid showIntro={false} />
      <WhatsAppCTA />
    </>
  );
}
