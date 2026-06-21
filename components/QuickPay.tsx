"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ChevronLeft, ShieldCheck } from "lucide-react";
import { BinanceIcon, PagoMovilIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/components/LanguageProvider";
import { QrPlaceholder } from "@/components/QrPlaceholder";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type PaymentMethod = "pago" | "binance";

export function QuickPay() {
  const { t } = useLanguage();
  const [method, setMethod] = useState<PaymentMethod>("pago");
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, t.pay.message);
  const paymentName = method === "pago" ? t.payment.pago : t.payment.binance;
  const PaymentIcon = method === "pago" ? PagoMovilIcon : BinanceIcon;

  return (
    <section className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-forest">
        <ChevronLeft className="h-4 w-4" /> {t.pay.back}
      </Link>
      <div className="mt-5 rounded-[2rem] border border-espresso/10 bg-white/70 p-5 shadow-[0_30px_90px_-50px_rgba(59,38,23,0.7)] sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay">{t.pay.eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.03em] text-espresso sm:text-5xl">{t.pay.title}</h1>
          <p className="mt-3 text-sm text-matte/60">{t.pay.select}</p>
        </div>

        <div className="mx-auto mt-7 grid max-w-md grid-cols-2 rounded-2xl bg-beige/70 p-1.5">
          <button type="button" onClick={() => setMethod("pago")} aria-pressed={method === "pago"} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition sm:text-sm ${method === "pago" ? "bg-white text-forest shadow-sm" : "text-matte/55"}`}>
            <PagoMovilIcon className="h-5 w-5" /> Pago Movil
          </button>
          <button type="button" onClick={() => setMethod("binance")} aria-pressed={method === "binance"} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition sm:text-sm ${method === "binance" ? "bg-white text-[#7d5b00] shadow-sm" : "text-matte/55"}`}>
            <BinanceIcon className="h-5 w-5" /> Binance
          </button>
        </div>

        <div className="mx-auto mt-8 max-w-md rounded-[1.75rem] bg-[#f4ecdf] p-5 text-center sm:p-7">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-forest shadow-sm"><PaymentIcon /></div>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-espresso">{paymentName}</h2>
          <p className="mt-2 text-sm text-matte/60">{t.payment.instructions}</p>
          <div className="mt-6"><QrPlaceholder label={t.payment.placeholder} /></div>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-forest"><ShieldCheck className="h-4 w-4" /> {t.payment.scan}</p>
        </div>

        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mx-auto mt-7 flex min-h-14 w-full max-w-md items-center justify-center gap-2 rounded-full bg-[#157f43] px-5 py-3 text-center text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5">
          <WhatsAppIcon className="h-5 w-5" /> {t.pay.paid}
        </a>
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-matte/55"><CheckCircle2 className="h-4 w-4 text-forest" /> {t.pay.received}</p>
      </div>
    </section>
  );
}
