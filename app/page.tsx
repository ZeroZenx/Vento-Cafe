import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { ProductGrid } from "@/components/ProductGrid";
import { LifestyleGallery } from "@/components/LifestyleGallery";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <Hero />

      <StorySection compact />

      <section className="mx-auto w-full max-w-7xl px-5 py-4 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-espresso/10 bg-matte shadow-soft">
          <Image
            src="/founders/founders-03.jpg"
            alt="Founders portrait"
            fill
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="relative p-7 sm:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-cream/80">Lifestyle Storytelling</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold text-cream sm:text-3xl">
              Built by two people who believe coffee can make everyday life softer and more connected.
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/our-story"
                className="rounded-full bg-cream px-5 py-3 text-sm font-semibold text-espresso transition hover:bg-beige"
              >
                Read Our Story
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-cream/65 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-cream hover:text-espresso"
              >
                Contact Vento Cafe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductGrid compact />
      <LifestyleGallery />
      <WhatsAppCTA />
    </>
  );
}
