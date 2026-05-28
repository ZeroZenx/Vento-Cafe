"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { homeContent, productsContent, whatsapp } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProductGridProps = {
  compact?: boolean;
};

export function ProductGrid({ compact = false }: ProductGridProps) {
  const { language } = useLanguage();
  const products = compact ? productsContent.items.slice(0, 2) : productsContent.items;
  const orderHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.orderMessage[language]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="coffee">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-forest">{productsContent.section.eyebrow[language]}</p>
        <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
          {productsContent.section.heading[language]}
        </h2>
        <p className="mt-4 text-matte/75">{productsContent.section.description[language]}</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: index * 0.07 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-3xl border border-espresso/10 bg-white/75 shadow-soft"
          >
            <div className="relative h-80 overflow-hidden bg-beige/45 p-4">
              <Image
                src={product.image}
                alt={product.name[language]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 transition duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-espresso">{product.name[language]}</h3>
                <span className="rounded-full bg-beige px-4 py-1 text-sm font-semibold text-espresso">
                  {product.price}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-matte/75">{product.shortDescription[language]}</p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  {productsContent.section.notesLabel[language]}
                </h4>
                <p className="mt-2 text-sm text-matte/80">{product.flavorNotes[language].join(" | ")}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  {productsContent.section.prepLabel[language]}
                </h4>
                <ol className="mt-2 space-y-1 text-sm text-matte/80">
                  {product.preparation[language].map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <a
                href={orderHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-cream transition hover:bg-espresso"
              >
                {homeContent.hero.primaryCta[language]}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
