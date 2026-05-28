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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/founders/founders-10.jpg"
          alt="Vento Cafe founders sharing a moment in nature"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[54%_35%] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-matte/70 via-matte/45 to-matte/40" />
      </div>

      <div className="relative mx-auto flex min-h-[82vh] w-full max-w-7xl items-end px-5 pb-16 pt-24 sm:px-8 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cream/90">
            {homeContent.hero.eyebrow[language]}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-7xl">
            {homeContent.hero.title[language]}
          </h1>
          <p className="mt-6 max-w-xl text-base text-cream/90 sm:text-lg">
            {homeContent.hero.subtitle[language]}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
            {homeContent.hero.support[language]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:bg-beige"
            >
              {homeContent.hero.primaryCta[language]}
            </a>
            <Link
              href="/our-coffee"
              className="rounded-full border border-cream/70 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream hover:text-espresso"
            >
              {homeContent.hero.secondaryCta[language]}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
