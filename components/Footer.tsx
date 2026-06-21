"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Instagram, MapPin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/data/site";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === "/pay") return null;

  return (
    <footer className="border-t border-espresso/10 bg-[#efe3d3] pb-24 md:pb-0">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 text-xl font-semibold text-espresso">
            <Coffee className="h-5 w-5" /> Vento Cafe
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-matte/70">{t.footer.line}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">{t.delivery.title}</p>
          <p className="mt-4 flex items-start gap-2 text-sm text-matte/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" /> {t.footer.delivery}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">{t.nav.contact}</p>
          <p className="mt-4 text-sm text-matte/75">WhatsApp: {siteConfig.whatsappNumber}</p>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-espresso hover:text-forest">
            <Instagram className="h-4 w-4" /> {siteConfig.instagramHandle}
          </a>
        </div>
      </div>
      <div className="border-t border-espresso/10 px-5 py-5 text-center text-xs text-matte/60 sm:px-8">
        © {new Date().getFullYear()} {t.footer.rights} <Link href="/pay" className="ml-2 font-semibold text-forest">Quick Pay</Link>
      </div>
    </footer>
  );
}
