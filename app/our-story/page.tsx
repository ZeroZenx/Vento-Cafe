import type { Metadata } from "next";
import Image from "next/image";
import { StorySection } from "@/components/StorySection";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover Darren and Francis, the couple building Vento Café in Venezuela."
};

export default function OurStoryPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-18">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Nuestra historia</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Una marca de café creada por Darren y Francis
          </h1>
          <p className="mt-5 text-base leading-relaxed text-matte/75">
            Vento Café nació como un sueño compartido: trabajar con amor, vender café útil para la
            rutina diaria y atender a cada cliente de forma cercana en Valencia, Venezuela.
          </p>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-espresso/10 bg-beige/35 shadow-soft">
          <Image
            src="/founders/founders-11.jpg"
            alt="Vento Cafe founders embracing outdoors"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain"
          />
        </div>
      </section>

      <StorySection />

      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["/founders/founders-08.jpg", "/founders/founders-09.jpg", "/founders/founders-12.jpg"].map(
            (image) => (
              <div key={image} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-espresso/10 bg-beige/35 shadow-soft">
                <Image
                  src={image}
                  alt="Founders journey moment"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
