"use client";

import Link from "next/link";
import { homeContent, whatsapp } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.03 3.2A12.63 12.63 0 0 0 5.1 22.14L3.5 28.8l6.82-1.56A12.63 12.63 0 1 0 16.03 3.2Zm0 22.96a10.3 10.3 0 0 1-5.24-1.43l-.38-.23-4.04.93.96-3.93-.25-.4a10.33 10.33 0 1 1 8.95 5.06Zm5.83-7.73c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.36-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.75.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}

export function GlobalWhatsAppActions() {
  const { language } = useLanguage();
  const orderHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.orderMessage[language]);

  return (
    <>
      <a
        href={orderHref}
        target="_blank"
        rel="noreferrer"
        aria-label={language === "es" ? "Pedir por WhatsApp" : "Order on WhatsApp"}
        className="fixed bottom-24 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6"
      >
        <WhatsAppIcon />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 px-4 py-3 shadow-soft backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link
            href="/pay"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-espresso/15 px-4 text-sm font-semibold text-espresso"
          >
            {language === "es" ? "Pago" : "Pay"}
          </Link>
          <a
            href={orderHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 flex-[1.5] items-center justify-center rounded-full bg-forest px-4 text-sm font-semibold text-cream"
          >
            {homeContent.hero.primaryCta[language]}
          </a>
        </div>
      </div>
    </>
  );
}

