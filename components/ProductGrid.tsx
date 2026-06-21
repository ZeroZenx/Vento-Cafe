"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { coffeeProducts } from "@/data/products";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProductGridProps = {
  compact?: boolean;
};

export function ProductGrid({ compact = false }: ProductGridProps) {
  const { language, t } = useLanguage();
  const products = compact ? coffeeProducts.slice(0, 4) : coffeeProducts;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24" id="coffee">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest">{t.coffee.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-espresso sm:text-5xl">{t.coffee.title}</h2>
          <p className="mt-4 max-w-2xl text-matte/70">{t.coffee.body}</p>
        </div>
        {compact && (
          <Link href="/our-coffee" className="inline-flex items-center gap-2 text-sm font-bold text-forest">
            {t.coffee.all} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => {
          const productName = product.name[language];
          const orderMessage = language === "es"
            ? `Hola Vento Cafe, quiero pedir ${productName}. Me pueden confirmar precio y disponibilidad?`
            : `Hi Vento Cafe, I would like to order ${productName}. Can you confirm the price and availability?`;

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-white/65 shadow-[0_24px_65px_-42px_rgba(59,38,23,0.7)]"
            >
              <div className="relative aspect-[4/5] w-full bg-[#f3eadc]">
                <SafeImage src={product.image} alt={productName} variant="product" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-serif text-2xl font-semibold leading-tight text-espresso">{productName}</h3>
                <p className="mt-3 text-sm leading-6 text-matte/70">{product.description[language]}</p>
                <dl className="mt-5 space-y-4 border-t border-espresso/10 pt-5 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest">{t.coffee.flavor}</dt>
                    <dd className="mt-1 text-matte/70">{product.flavor[language]}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest">{t.coffee.prepare}</dt>
                    <dd className="mt-1 text-matte/70">{product.preparation[language]}</dd>
                  </div>
                </dl>
                <a href={buildWhatsAppUrl(siteConfig.whatsappNumber, orderMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-cream transition hover:bg-espresso">
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
