"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingActions() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, t.whatsappOrder);

  if (pathname === "/pay") return null;

  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={t.hero.whatsappCta}
        className="fixed bottom-6 right-5 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_35px_-12px_rgba(37,211,102,0.75)] transition hover:-translate-y-1 md:grid"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 p-3 backdrop-blur-xl md:hidden">
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#157f43] px-5 py-3 text-sm font-bold text-white shadow-soft">
          <WhatsAppIcon className="h-5 w-5" /> {t.floating}
        </a>
      </div>
    </>
  );
}
