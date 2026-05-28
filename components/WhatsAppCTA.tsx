"use client";

import { useEffect, useMemo, useState } from "react";
import { homeContent, productsContent, whatsapp } from "@/data/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n";

export function WhatsAppCTA() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(productsContent.items[0]?.name[language] ?? "Café Negro");

  useEffect(() => {
    setSelectedProduct(productsContent.items[0]?.name[language] ?? "Café Negro");
  }, [language]);

  const orderLink = useMemo(() => {
    const message =
      language === "es"
        ? `Hola Vento Café, quiero hacer un pedido de ${selectedProduct}.`
        : `Hi Vento Café, I would like to order ${selectedProduct}.`;
    return buildWhatsAppUrl(whatsapp.phone, message);
  }, [language, selectedProduct]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="order">
      <div className="rounded-3xl border border-forest/20 bg-forest p-6 shadow-soft sm:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-cream/80">WhatsApp</p>
        <h2 className="mt-3 text-3xl font-semibold text-cream sm:text-4xl">
          {homeContent.order.heading[language]}
        </h2>

        <ol className="mt-8 grid gap-5 md:grid-cols-5">
          {homeContent.order.steps[language].map((step, index) => (
            <li key={step} className="rounded-2xl bg-cream/10 p-4 text-cream/90">
              <p className="text-sm font-semibold">
                {index + 1}. {step}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="text-sm font-medium text-cream/90" htmlFor="coffee-select">
            {language === "es" ? "Elige café" : "Choose Coffee"}
          </label>
          <select
            id="coffee-select"
            value={selectedProduct}
            onChange={(event) => setSelectedProduct(event.target.value)}
            className="w-full rounded-full border border-cream/30 bg-cream/95 px-5 py-3 text-sm text-espresso outline-none ring-offset-2 focus:ring-2 focus:ring-beige sm:max-w-xs"
          >
            {productsContent.items.map((product) => (
              <option key={product.id} value={product.name[language]}>
                {product.name[language]}
              </option>
            ))}
          </select>
          <a
            href={orderLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-semibold text-forest transition hover:bg-beige"
          >
            {homeContent.order.button[language]}
          </a>
        </div>
      </div>
    </section>
  );
}
