import type { Metadata } from "next";
import { InnerPageHero } from "@/components/InnerPageHero";
import { StorySection } from "@/components/StorySection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description: "Conoce a Darren y Francis, la pareja detras de Vento Cafe en Valencia y Los Guayos, Carabobo."
};

export default function OurStoryPage() {
  return (
    <>
      <InnerPageHero page="story" />
      <StorySection />
      <WhatsAppCTA />
    </>
  );
}
