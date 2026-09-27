"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function ProductsMasthead() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-espresso/10 px-4 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-forest">{t.coffee.eyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-espresso sm:text-6xl">
            {t.coffee.title}.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-matte/70">{t.coffee.body}</p>
        </div>
        <p className="flex max-w-xs items-start gap-2 text-sm font-semibold leading-6 text-forest">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t.delivery.title}<br />{t.hero.whatsappCta}</span>
        </p>
      </div>
    </section>
  );
}
