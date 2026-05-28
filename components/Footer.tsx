"use client";

import { siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-espresso/10 bg-cream/60">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-xl font-semibold text-espresso">Vento Café</p>
          <p className="mt-3 text-sm text-matte/75">
            {language === "es"
              ? "Café, conexión y trabajo real de pareja."
              : "Coffee and connection, built by a real couple."}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest">
            {language === "es" ? "Ubicación" : "Location"}
          </p>
          <p className="mt-3 text-sm text-matte/80">{siteConfig.location}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest">
            {language === "es" ? "Contacto" : "Contact"}
          </p>
          <p className="mt-3 text-sm text-matte/80">WhatsApp: {siteConfig.whatsappNumber}</p>
          <p className="mt-1 text-sm text-matte/80">Instagram: @ventocafe</p>
        </div>
      </div>
      <div className="border-t border-espresso/10 px-5 py-4 text-center text-xs text-matte/65 sm:px-8">
        © {new Date().getFullYear()} Vento Café.{" "}
        {language === "es"
          ? "Hecho con cariño en Venezuela."
          : "Crafted with warmth in Venezuela."}
      </div>
    </footer>
  );
}
