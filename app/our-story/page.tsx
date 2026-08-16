import type { Metadata } from "next";
import { InnerPageHero } from "@/components/InnerPageHero";
import { StorySection } from "@/components/StorySection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Meet Darren and Francis, the couple building Vento Café & Market in Los Guayos, Carabobo."
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
