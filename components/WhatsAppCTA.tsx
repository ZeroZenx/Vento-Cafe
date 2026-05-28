"use client";

import { useMemo, useState } from "react";
import { coffeeProducts } from "@/data/products";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppCTA() {
  const [selectedProduct, setSelectedProduct] = useState(coffeeProducts[0]?.name ?? "Cafe Negro");

  const orderLink = useMemo(() => {
    const message = `Hi Vento Cafe, I would like to order ${selectedProduct}. Can we arrange delivery or pickup?`;
    return buildWhatsAppUrl(siteConfig.whatsappNumber, message);
  }, [selectedProduct]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="order">
      <div className="rounded-3xl border border-forest/20 bg-forest p-6 shadow-soft sm:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-cream/80">Order</p>
        <h2 className="mt-3 text-3xl font-semibold text-cream sm:text-4xl">
          Simple Ordering in Three Steps
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-cream/10 p-4 text-cream/90">
            <p className="text-sm font-semibold">1. Choose your coffee</p>
            <p className="mt-2 text-sm text-cream/80">Select your favorite flavor below.</p>
          </div>
          <div className="rounded-2xl bg-cream/10 p-4 text-cream/90">
            <p className="text-sm font-semibold">2. Message us on WhatsApp</p>
            <p className="mt-2 text-sm text-cream/80">We confirm quantity and availability quickly.</p>
          </div>
          <div className="rounded-2xl bg-cream/10 p-4 text-cream/90">
            <p className="text-sm font-semibold">3. Arrange delivery or pickup</p>
            <p className="mt-2 text-sm text-cream/80">Fast and friendly service from our family to yours.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="text-sm font-medium text-cream/90" htmlFor="coffee-select">
            Choose Coffee
          </label>
          <select
            id="coffee-select"
            value={selectedProduct}
            onChange={(event) => setSelectedProduct(event.target.value)}
            className="w-full rounded-full border border-cream/30 bg-cream/95 px-5 py-3 text-sm text-espresso outline-none ring-offset-2 focus:ring-2 focus:ring-beige sm:max-w-xs"
          >
            {coffeeProducts.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <a
            href={orderLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-semibold text-forest transition hover:bg-beige"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
