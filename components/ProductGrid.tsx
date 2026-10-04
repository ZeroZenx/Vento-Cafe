"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { featuredProductIds, productFilters, products as staticProducts, type Product } from "@/data/products";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProductGridProps = {
  compact?: boolean;
  showIntro?: boolean;
  initialProducts?: Product[];
};

export function ProductGrid({ compact = false, showIntro = true, initialProducts = staticProducts }: ProductGridProps) {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<(typeof productFilters)[number]["id"]>("all");
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const filtered = compact
      ? featuredProductIds
        .map((id) => initialProducts.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product))
      : activeFilter === "all"
        ? initialProducts
        : activeFilter === "offers"
          ? initialProducts.filter((product) => product.offer)
          : initialProducts.filter((product) => product.category === activeFilter);

    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery || compact) return filtered;

    return filtered.filter((product) => {
      const searchable = [
        product.name[language],
        product.description[language],
        ...product.highlights[language],
        ...product.details[language]
      ]
        .join(" ")
        .toLocaleLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [activeFilter, compact, initialProducts, language, query]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24" id="products">
      {showIntro && (
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
      )}

      {!compact && (
        <div className={`${showIntro ? "mt-8" : "mt-0"} border-y border-espresso/10 py-4`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-1" aria-label={t.coffee.filterLabel}>
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-forest" />
              {productFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-10 shrink-0 rounded-lg border px-4 text-sm font-semibold transition ${
                    activeFilter === filter.id
                      ? "border-forest bg-forest text-cream"
                      : "border-espresso/15 bg-white/70 text-espresso hover:bg-beige"
                  }`}
                >
                  {t.coffee.filters[filter.labelKey]}
                </button>
              ))}
            </div>
            <label className="relative block w-full lg:max-w-xs">
              <span className="sr-only">{t.coffee.search}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-matte/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.coffee.search}
                className="min-h-10 w-full rounded-lg border border-espresso/15 bg-white/80 py-2 pl-9 pr-10 text-sm text-espresso placeholder:text-matte/45 focus:border-forest focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t.coffee.clearSearch}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-matte/55 hover:bg-beige hover:text-espresso"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-matte/45">
            {visibleProducts.length} {t.coffee.results}
          </p>
        </div>
      )}

      <div className={`mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${compact ? "lg:gap-5" : ""}`}>
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
              className="flex flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-white/75 shadow-soft"
            >
              <div className="relative aspect-[4/5] w-full bg-[#f1e8da]">
                <SafeImage
                  src={product.image}
                  alt={productName}
                  variant="product"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                />
                {product.offer && (
                  <span className="absolute left-3 top-3 rounded-md bg-clay px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cream">
                    {t.coffee.filters.offers}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest">{t.coffee.filters[product.category]}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-espresso">{productName}</h3>
                <p className="mt-2 text-sm leading-6 text-matte/70">{product.description[language]}</p>
                <p className="mt-4 border-t border-espresso/10 pt-3 text-xs font-semibold leading-5 text-matte/60">
                  {product.highlights[language].slice(0, 3).join(" · ")}
                </p>
                <a
                  href={buildWhatsAppUrl(siteConfig.whatsappNumber, orderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-bold text-cream transition hover:bg-espresso"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {t.coffee.order}
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>

      {!visibleProducts.length && (
        <div className="mt-8 flex flex-col items-center border border-dashed border-espresso/20 bg-white/45 px-6 py-14 text-center">
          <SearchX className="h-8 w-8 text-forest" />
          <p className="mt-4 font-serif text-2xl font-semibold text-espresso">{t.coffee.empty}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveFilter("all");
            }}
            className="mt-5 min-h-11 rounded-lg bg-espresso px-5 py-2.5 text-sm font-bold text-cream hover:bg-forest"
          >
            {t.coffee.reset}
          </button>
        </div>
      )}
    </section>
  );
}
