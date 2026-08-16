import type { Metadata } from "next";
import { ContactPanel } from "@/components/ContactPanel";
import { InnerPageHero } from "@/components/InnerPageHero";
import { SocialSection } from "@/components/SocialSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Vento Café & Market through WhatsApp in Los Guayos, Carabobo."
};

export default function ContactPage() {
  return (
    <>
      <InnerPageHero page="contact" />
      <ContactPanel />
      <SocialSection />
    </>
  );
}
