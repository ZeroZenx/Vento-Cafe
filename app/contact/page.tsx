import type { Metadata } from "next";
import { ContactPanel } from "@/components/ContactPanel";
import { InnerPageHero } from "@/components/InnerPageHero";
import { SocialSection } from "@/components/SocialSection";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Pide cafe Vento Cafe por WhatsApp en Valencia y Los Guayos, Carabobo."
};

export default function ContactPage() {
  return <><InnerPageHero page="contact" /><ContactPanel /><SocialSection /></>;
}
