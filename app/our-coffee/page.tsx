import type { Metadata } from "next";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PaymentSection } from "@/components/PaymentSection";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Nuestro Cafe",
  description: "Cafe instantaneo y cappuccino disponibles por WhatsApp con delivery en Valencia y Los Guayos, Carabobo."
};

export default function OurCoffeePage() {
  return <><InnerPageHero page="coffee" /><ProductGrid /><PaymentSection /><WhatsAppCTA /></>;
}
