"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, t.whatsappOrder);
  const titleParts = t.hero.title.split(". ");

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:px-8 sm:pb-16 lg:pt-12">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-clay/15 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-forest/15 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest">
            <MapPin className="h-3.5 w-3.5" /> {t.hero.eyebrow}
          </p>
          <h1 className="mt-7 max-w-full font-serif text-[clamp(3.1rem,8vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-espresso">
            {titleParts.map((part) => (
              <span key={part} className="block">
                {part.endsWith(".") ? part : `${part}.`}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-matte/70 sm:text-xl">{t.hero.subtitle}</p>
          <p className="mt-5 max-w-xl border-l-2 border-clay pl-4 text-sm font-medium leading-relaxed text-matte/80 sm:text-base">
            {t.hero.business}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/our-coffee" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-cream transition hover:-translate-y-0.5 hover:bg-forest">
              {t.hero.coffeeCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-espresso/20 bg-white/60 px-6 py-3 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:bg-white">
              <WhatsAppIcon /> {t.hero.whatsappCta}
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative mx-auto w-full max-w-[620px]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-espresso/10 bg-[#9b4f40] shadow-[0_35px_90px_-42px_rgba(59,38,23,0.65)] sm:rounded-[2.75rem]">
            <SafeImage src="/founders/founders-11.jpg" alt="Darren and Francis, the founders of Vento Cafe" variant="hero" priority sizes="(max-width: 1024px) 92vw, 48vw" />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/40 bg-cream/95 px-5 py-4 shadow-soft backdrop-blur sm:left-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest">Darren + Francis</p>
            <p className="mt-1 text-sm text-matte/70">Venezuela × Trinidad</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
