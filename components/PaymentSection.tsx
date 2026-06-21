"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BinanceIcon, PagoMovilIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";

export function PaymentSection() {
  const { t } = useLanguage();
  const methods = [
    { name: t.payment.pago, Icon: PagoMovilIcon, color: "bg-[#edf4ee] text-forest" },
    { name: t.payment.binance, Icon: BinanceIcon, color: "bg-[#fff5ce] text-[#8a6500]" }
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest">{t.payment.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-espresso sm:text-5xl">{t.payment.title}</h2>
          <p className="mt-5 max-w-lg leading-7 text-matte/70">{t.payment.body}</p>
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest"><ShieldCheck className="h-5 w-5" /> {t.payment.instructions}</p>
          <Link href="/pay" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-cream transition hover:bg-forest">
            {t.payment.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.map(({ name, Icon, color }) => (
            <Link key={name} href="/pay" className="group rounded-[1.75rem] border border-espresso/10 bg-white/65 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}><Icon /></span>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-clay">{t.payment.scan}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-espresso">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-matte/65">{t.payment.instructions}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest transition group-hover:gap-3">Quick Pay <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
