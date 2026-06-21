"use client";

import { Check, Clock3, Coffee, CreditCard, MessageCircle, Truck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const icons = [MessageCircle, Truck, CreditCard, Check, Coffee, Clock3];

export function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-espresso/10 bg-white/45 px-4 py-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {t.trust.map((badge, index) => {
          const Icon = icons[index];
          return (
            <div key={badge} className="flex min-h-16 items-center gap-2.5 rounded-2xl bg-cream/70 px-3 py-3 text-xs font-semibold leading-tight text-espresso">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest/10 text-forest">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              {badge}
            </div>
          );
        })}
      </div>
    </section>
  );
}

