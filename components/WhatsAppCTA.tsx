"use client";

import { Check, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppCTA() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, t.whatsappOrder);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24" id="order">
      <div className="overflow-hidden rounded-[2rem] bg-forest text-cream shadow-soft sm:rounded-[2.75rem]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-beige/75">{t.order.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{t.order.title}</h2>
            <ol className="mt-8 grid gap-3">
              {t.order.steps.map((step, index) => (
                <li key={step} className="flex min-h-14 items-center gap-4 rounded-2xl bg-cream/10 px-4 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-sm font-bold text-forest">{index + 1}</span>
                  <span className="text-sm font-semibold text-cream/90 sm:text-base">{step}</span>
                  <Check className="ml-auto h-4 w-4 text-beige/65" />
                </li>
              ))}
            </ol>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-forest transition hover:bg-beige sm:w-auto">
              <WhatsAppIcon /> {t.order.cta}
            </a>
          </div>

          <div className="flex flex-col justify-center bg-[#243c2c] p-6 sm:p-10 lg:p-12">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-clay text-cream"><MapPin className="h-5 w-5" /></span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-beige/70">{t.delivery.eyebrow}</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">{t.delivery.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-cream/70 sm:text-base">{t.delivery.body}</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-beige hover:text-cream">
              {t.delivery.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
