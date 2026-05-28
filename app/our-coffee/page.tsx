import type { Metadata } from "next";
import Image from "next/image";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Our Coffee",
  description:
    "Explore Vento Cafe offerings including Cafe Negro, Cappuccino, Caramel Cappuccino, and Vanilla Cappuccino."
};

export default function OurCoffeePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:py-18">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Our Coffee</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Comfort-Driven Coffee for Slow, Meaningful Moments
          </h1>
          <p className="mt-5 text-base leading-relaxed text-matte/75">
            From bold black coffee to creamy flavored cappuccino options, each Vento Cafe product is
            selected to make premium daily coffee feel effortless.
          </p>
        </div>
        <div className="relative h-[430px] overflow-hidden rounded-3xl border border-espresso/10 shadow-soft">
          <Image
            src="/products/cafe-negro.jpg"
            alt="Vento Cafe product showcase"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      <ProductGrid />
      <WhatsAppCTA />
    </>
  );
}
