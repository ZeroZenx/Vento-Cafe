"use client";

import { useState } from "react";
import { payContent, whatsapp } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Method = "pagoMovil" | "binance";

export function PayClient() {
  const { language } = useLanguage();
  const [method, setMethod] = useState<Method>("pagoMovil");
  const activeMethod = payContent.methods[method];
  const confirmHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.paidMessage[language]);

  return (
    <section className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-10">
      <div className="rounded-3xl border border-espresso/10 bg-white/75 p-5 shadow-soft sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-forest">Vento Café</p>
        <h1 className="mt-3 text-4xl font-semibold text-espresso sm:text-5xl">{payContent.title[language]}</h1>
        <p className="mt-4 text-lg leading-relaxed text-matte/75">{payContent.subtitle[language]}</p>

        <div className="mt-7">
          <p className="text-sm font-semibold text-espresso">{payContent.selectorLabel[language]}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-espresso/10 bg-beige/55 p-2">
            {(["pagoMovil", "binance"] as Method[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMethod(item)}
                className={`min-h-12 rounded-xl px-3 text-sm font-semibold transition ${
                  method === item ? "bg-forest text-cream shadow-soft" : "bg-white/70 text-espresso hover:bg-white"
                }`}
              >
                {payContent.methods[item].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-espresso/10 bg-cream p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-espresso">{activeMethod.label}</h2>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-forest">
              {method === "pagoMovil" ? "VE" : "USDT"}
            </span>
          </div>

          <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-espresso/25 bg-white p-5">
            <div className="grid aspect-square w-full max-w-[310px] place-items-center rounded-2xl bg-[linear-gradient(135deg,#f8f1e4_25%,#e9ddcc_25%,#e9ddcc_50%,#f8f1e4_50%,#f8f1e4_75%,#e9ddcc_75%)] bg-[length:32px_32px]">
              <div className="rounded-2xl bg-white/95 px-6 py-5 text-center shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest">{activeMethod.label}</p>
                <p className="mt-2 text-2xl font-semibold text-espresso">{payContent.qrPlaceholder[language]}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-matte/75">{activeMethod.instructions[language]}</p>
        </div>

        <a
          href={confirmHref}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-forest px-6 text-center text-base font-semibold text-cream transition hover:bg-espresso"
        >
          {payContent.confirmButton[language]}
        </a>

        <p className="mt-4 text-center text-xs leading-relaxed text-matte/60">{payContent.helper[language]}</p>
      </div>
    </section>
  );
}

