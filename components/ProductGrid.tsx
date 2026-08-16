"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { featuredProductIds, productFilters, products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProductGridProps = {
  compact?: boolean;
};

export function ProductGrid({ compact = false }: ProductGridProps) {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<(typeof productFilters)[number]["id"]>("all");

  const visibleProducts = useMemo(() => {
    if (compact) {
      return featuredProductIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is (typeof products)[number] => Boolean(product));
    }

    if (activeFilter === "all") return products;
    if (activeFilter === "offers") return products.filter((product) => product.offer);
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter, compact]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24" id="products">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest">{t.coffee.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-espresso sm:text-5xl">{t.coffee.title}</h2>
          <p className="mt-4 max-w-2xl text-matte/70">{t.coffee.body}</p>
        </div>
        {compact && (
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-forest">
            {t.coffee.all} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {!compact && (
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {productFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${
                activeFilter === filter.id
                  ? "border-forest bg-forest text-cream"
                  : "border-espresso/15 bg-white/70 text-espresso hover:bg-beige"
              }`}
            >
              {t.coffee.filters[filter.labelKey]}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product, index) => {
          const productName = product.name[language];
          const orderMessage =
            language === "es"
              ? `Hola Vento Café & Market, quiero consultar ${productName}. Me pueden confirmar precio y disponibilidad?`
              : `Hi Vento Café & Market, I would like to ask about ${productName}. Can you confirm price and availability?`;

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-white/70 shadow-soft"
            >
              <div className="relative aspect-[4/5] w-full bg-[#f3eadc]">
                <SafeImage
                  src={product.image}
                  alt={productName}
                  variant={product.category === "coffee" ? "product" : "landscape"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                />
                {product.offer && (
                  <span className="absolute left-4 top-4 rounded-full bg-clay px-3 py-1 text-xs font-bold text-cream">
                    {t.coffee.filters.offers}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-serif text-2xl font-semibold leading-tight text-espresso">{productName}</h3>
                <p className="mt-3 text-sm leading-6 text-matte/70">{product.description[language]}</p>
                <dl className="mt-5 space-y-4 border-t border-espresso/10 pt-5 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest">{t.coffee.flavor}</dt>
                    <dd className="mt-1 text-matte/70">{product.highlights[language].join(" | ")}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest">{t.coffee.prepare}</dt>
                    <dd className="mt-1 space-y-1 text-matte/70">
                      {product.details[language].map((detail) => (
                        <span key={detail} className="block">
                          {detail}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <a
                  href={buildWhatsAppUrl(siteConfig.whatsappNumber, orderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-cream transition hover:bg-espresso"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {t.coffee.order}
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
