import type { Metadata } from "next";
import Image from "next/image";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Our Coffee",
  description:
    "Explore Vento Café instant coffee and cappuccino mixes for delivery in Los Guayos, Carabobo."
};

export default function OurCoffeePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:py-18">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Nuestros cafés</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Café instantáneo y cappuccino para pedir fácil en Los Guayos
          </h1>
          <p className="mt-5 text-base leading-relaxed text-matte/75">
            Tenemos café negro y mezclas de cappuccino para tu casa, oficina o evento. Escríbenos por
            WhatsApp para confirmar disponibilidad y entrega.
          </p>
        </div>
        <div className="relative min-h-[500px] overflow-hidden rounded-3xl border border-espresso/10 bg-beige/30 shadow-soft">
          <Image
            src="/products/nescafe-clasico.png"
            alt="Vento Cafe product showcase"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain"
          />
        </div>
      </section>

      <ProductGrid />
      <WhatsAppCTA />
    </>
  );
}
