"use client";

import { Instagram } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";

const images = [
  { src: "/brand/vento-cup-counter.jpg", variant: "landscape" as const },
  { src: "/brand/vento-logo-counter.jpg", variant: "landscape" as const },
  { src: "/products/market/jergens-small-lotions.jpg", variant: "landscape" as const },
  { src: "/products/market/white-rain-body-wash-colors.jpg", variant: "landscape" as const },
  { src: "/products/market/soft-silky-mango-offer.jpg", variant: "landscape" as const },
  { src: "/products/nescafe-clasico.png", variant: "product" as const }
];

export function SocialSection() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-8 rounded-[2rem] border border-espresso/10 bg-white/50 p-5 shadow-soft sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div className="p-2 sm:p-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest">{t.social.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-espresso">{t.social.title}</h2>
          <p className="mt-4 leading-7 text-matte/70">{t.social.body}</p>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-espresso/20 px-5 py-3 text-sm font-bold text-espresso transition hover:bg-beige">
            <Instagram className="h-5 w-5" /> {t.social.cta}
          </a>
          <p className="mt-4 text-sm font-semibold text-forest">{t.social.placeholder}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {images.map((image) => (
            <div key={image.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-beige/50">
              <SafeImage src={image.src} alt="Vento Café & Market social preview" variant={image.variant} sizes="(max-width: 1024px) 46vw, 20vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
