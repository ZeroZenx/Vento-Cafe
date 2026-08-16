"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { SafeImage } from "@/components/SafeImage";
import { lifestyleImages } from "@/data/lifestyle";

const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square"
};

export function LifestyleGallery() {
  const { t } = useLanguage();

  return (
    <section className="overflow-hidden bg-matte py-16 text-cream sm:py-24" id="lifestyle">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-beige/70">{t.lifestyle.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{t.lifestyle.title}</h2>
          <p className="mt-4 max-w-2xl text-cream/65">{t.lifestyle.body}</p>
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {lifestyleImages.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
              className={`relative mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] border border-cream/10 bg-[#27231f] ${aspectClasses[image.shape]}`}
            >
              <SafeImage
                src={image.src}
                alt="Vento Café & Market lifestyle preview"
                variant={image.variant}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                className="transition duration-700 hover:scale-[1.015]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
