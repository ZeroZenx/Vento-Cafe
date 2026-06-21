"use client";

import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactPanel() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, t.whatsappOrder);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-8 sm:pb-24">
      <div className="grid gap-4 md:grid-cols-3">
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-[1.75rem] bg-forest p-6 text-cream shadow-soft transition hover:-translate-y-1">
          <WhatsAppIcon className="h-7 w-7" />
          <h2 className="mt-8 font-serif text-2xl font-semibold">WhatsApp</h2>
          <p className="mt-2 text-sm text-cream/70">{siteConfig.whatsappNumber}</p>
          <p className="mt-5 text-sm font-bold">{t.contact.whatsapp} →</p>
        </a>
        <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="rounded-[1.75rem] border border-espresso/10 bg-white/60 p-6 shadow-soft transition hover:-translate-y-1">
          <Instagram className="h-7 w-7 text-clay" />
          <h2 className="mt-8 font-serif text-2xl font-semibold text-espresso">Instagram</h2>
          <p className="mt-2 text-sm text-matte/65">{siteConfig.instagramHandle}</p>
          <p className="mt-5 text-sm font-bold text-forest">{t.contact.instagram} →</p>
        </a>
        <div className="rounded-[1.75rem] border border-espresso/10 bg-beige/70 p-6 shadow-soft">
          <MapPin className="h-7 w-7 text-forest" />
          <h2 className="mt-8 font-serif text-2xl font-semibold text-espresso">{t.delivery.title}</h2>
          <p className="mt-2 text-sm leading-6 text-matte/65">{t.delivery.body}</p>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-forest"><MessageCircle className="h-4 w-4" /> {siteConfig.location}</p>
        </div>
      </div>
    </section>
  );
}
