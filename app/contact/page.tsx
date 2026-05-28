import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage);

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Vento Café through WhatsApp in Valencia, Venezuela."
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid gap-7 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-espresso/10 bg-white/60 p-7 shadow-soft sm:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Contacto</p>
          <h1 className="mt-3 text-4xl font-semibold text-espresso sm:text-5xl">Pide café por WhatsApp</h1>
          <p className="mt-4 text-matte/75">
            Escríbenos para pedir, confirmar delivery en Valencia o preguntar por Pago Móvil y Binance.
          </p>

          <div className="mt-8 space-y-4 text-sm text-matte/85">
            <p>
              <span className="font-semibold text-espresso">Instagram:</span> @ventocafe (placeholder)
            </p>
            <p>
              <span className="font-semibold text-espresso">Location:</span> {siteConfig.location}
            </p>
            <p>
              <span className="font-semibold text-espresso">WhatsApp:</span> {siteConfig.whatsappNumber}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-espresso"
            >
                Pedir por WhatsApp
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso transition hover:bg-beige"
            >
              Visit Instagram
            </a>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-espresso/10 bg-beige/35 shadow-soft">
          <Image
            src="/founders/founders-04.jpg"
            alt="Vento Cafe founders portrait"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
