"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { coffeeProducts } from "@/data/products";

type ProductGridProps = {
  compact?: boolean;
};

export function ProductGrid({ compact = false }: ProductGridProps) {
  const products = compact ? coffeeProducts.slice(0, 2) : coffeeProducts;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="coffee">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-forest">Our Coffee</p>
        <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
          Everyday Favorites with Premium Comfort
        </h2>
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
            className="group overflow-hidden rounded-3xl border border-espresso/10 bg-white/70 shadow-soft"
          >
            <div className="relative h-72 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-espresso">{product.name}</h3>
                <span className="rounded-full bg-beige px-4 py-1 text-sm font-semibold text-espresso">
                  {product.price}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-matte/75">{product.shortDescription}</p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  Flavor Notes
                </h4>
                <p className="mt-2 text-sm text-matte/80">{product.flavorNotes.join(" • ")}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  Preparation
                </h4>
                <ol className="mt-2 space-y-1 text-sm text-matte/80">
                  {product.preparation.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
