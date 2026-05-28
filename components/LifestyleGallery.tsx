"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { lifestyleImages } from "@/data/lifestyle";

export function LifestyleGallery() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="lifestyle">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-forest">Lifestyle</p>
        <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
          Real Moments, Natural Warmth, Shared Coffee
        </h2>
        <p className="mt-4 text-matte/75">
          Vento Cafe is a relationship-first brand. Travel, nature, and small coffee rituals shape
          everything we create.
        </p>
      </div>

      <div className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lifestyleImages.map((image, index) => {
          const spanClass = image.span === "wide" ? "lg:col-span-2" : image.span === "tall" ? "sm:row-span-2" : "";

          return (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-espresso/10 shadow-soft ${spanClass}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain transition duration-700 group-hover:scale-[1.02]"
              />
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
