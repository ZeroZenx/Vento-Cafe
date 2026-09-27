"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, t.whatsappOrder);
  const titleParts = t.hero.title.split(". ");
  const showcase = [
    { src: "/products/nescafe-clasico.png", alt: "Nescafé Clásico coffee" },
    { src: "/products/market/players-strawberry-500ml.jpg", alt: "Players strawberry hair care" },
    { src: "/products/market/body-element-pink-grapefruit.jpg", alt: "Body Element personal care" },
    { src: "/products/market/zinc-oxide-10g.png", alt: "Zinc oxide skin care" }
  ];

  return (
    <section className="relative overflow-hidden border-b border-espresso/10 px-4 pb-10 pt-8 sm:px-8 sm:pb-14 lg:pt-12">
      <div className="absolute inset-x-0 top-0 h-1 bg-clay" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="order-2 lg:order-1">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-forest">
            <MapPin className="h-3.5 w-3.5" /> {t.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-2xl font-serif text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-espresso">
            {titleParts.map((part) => (
              <span key={part} className="block">
                {part.endsWith(".") ? part : `${part}.`}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-matte/80 sm:text-xl">{t.hero.subtitle}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-matte/65 sm:text-base">{t.hero.business}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-bold text-cream transition hover:bg-espresso">
              <Search className="h-4 w-4" /> {t.hero.coffeeCta}
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-espresso/20 bg-white/60 px-6 py-3 text-sm font-bold text-espresso transition hover:bg-white">
              <WhatsAppIcon /> {t.hero.whatsappCta}
            </a>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-matte/45">{t.hero.browse}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative order-1 mx-auto w-full max-w-[640px] lg:order-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {showcase.map((image, index) => (
              <div
                key={image.src}
                className={`relative aspect-[5/4] overflow-hidden border border-espresso/10 bg-white/75 shadow-soft sm:aspect-[4/5] ${index === 0 ? "rounded-tl-[2rem]" : ""} ${index === 1 ? "rounded-tr-[2rem]" : ""} ${index === 2 ? "rounded-bl-[2rem]" : ""} ${index === 3 ? "rounded-br-[2rem]" : ""}`}
              >
                <SafeImage src={image.src} alt={image.alt} variant="product" priority={index < 2} sizes="(max-width: 1024px) 44vw, 27vw" />
              </div>
            ))}
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap border border-espresso/10 bg-cream px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-forest shadow-soft">
            {t.hero.shelf}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
