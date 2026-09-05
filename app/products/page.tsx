import type { Metadata } from "next";
import Image from "next/image";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Vento Café & Market coffee, hair care, lotions, and personal care collections for WhatsApp ordering in Los Guayos, Carabobo."
};

export default function ProductsPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:py-18">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Productos</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Café, cuidado personal y productos para pedir fácil.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-matte/75">
            Tenemos café, cappuccino, shampoos, acondicionadores, cremas y lociones para el cuidado diario.
            Escríbenos por WhatsApp para confirmar disponibilidad, precio y entrega en Los Guayos.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { src: "/products/market/xtracare-lotion-collection.jpg", alt: "XtraCare skin care lotion collection" },
            { src: "/products/market/white-rain-verbena-violet.jpg", alt: "White Rain Verbena and Violet hair care" },
            { src: "/products/nescafe-clasico.png", alt: "Nescafe Clasico coffee for sale" },
            { src: "/products/market/soft-silky-fruit-collection.jpg", alt: "Soft and Silky fruit hair care collection" }
          ].map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-espresso/10 bg-beige/30 shadow-soft"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className={image.src.includes("/products/market/") ? "object-contain p-3" : "object-contain p-4"}
              />
            </div>
          ))}
        </div>
      </section>

      <ProductGrid />
      <WhatsAppCTA />
    </>
  );
}
