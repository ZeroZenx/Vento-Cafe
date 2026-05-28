"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { homeContent, whatsapp } from "@/data/content";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { language } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.orderMessage[language]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-beige/60 to-sage/30">
      <div className="mx-auto grid min-h-[78vh] w-full max-w-7xl gap-10 px-5 pb-12 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-forest">
            {homeContent.hero.eyebrow[language]}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-espresso sm:text-5xl lg:text-7xl">
            {homeContent.hero.title[language]}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-matte/85 sm:text-lg">
            {homeContent.hero.subtitle[language]}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-matte/70 sm:text-base">
            {homeContent.hero.support[language]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-espresso"
            >
              {homeContent.hero.primaryCta[language]}
            </a>
            <Link
              href="/our-coffee"
              className="rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso transition hover:bg-white/70"
            >
              {homeContent.hero.secondaryCta[language]}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl border border-espresso/10 bg-clay/15 shadow-soft lg:mx-0 lg:justify-self-end"
        >
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/founders/founders-studio-hug.jpg"
              alt="Darren and Francis, founders of Vento Cafe"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
