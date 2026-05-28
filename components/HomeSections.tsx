"use client";

import Image from "next/image";
import Link from "next/link";
import { homeContent, whatsapp } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const socialImages = [
  { src: "/brand/vento-cup-counter.jpg", fit: "cover" },
  { src: "/brand/vento-logo-counter.jpg", fit: "cover" },
  { src: "/products/nescafe-clasico.png", fit: "contain" },
  { src: "/products/colcafe-cappuccino-caramelo.png", fit: "contain" },
  { src: "/founders/founders-beach-palm.jpg", fit: "cover" },
  { src: "/founders/founders-extra-0144.jpg", fit: "cover" },
  { src: "/products/colcafe-cappuccino-vainilla.png", fit: "contain" },
  { src: "/products/nescafe-cappuccino-vainilla.png", fit: "contain" },
  { src: "/founders/founders-extra-0395.jpg", fit: "cover" }
];

export function TrustBadges() {
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {homeContent.trustBadges[language].map((badge) => (
          <div
            key={badge}
            className="flex min-h-16 items-center rounded-2xl border border-espresso/10 bg-white/70 px-4 text-sm font-semibold text-espresso shadow-soft"
          >
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowToOrderSection() {
  const { language } = useLanguage();
  const orderHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.orderMessage[language]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="order">
      <div className="grid gap-8 rounded-3xl border border-forest/20 bg-forest p-6 text-cream shadow-soft sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cream/70">WhatsApp</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{homeContent.order.heading[language]}</h2>
          <p className="mt-4 leading-relaxed text-cream/80">{homeContent.order.intro[language]}</p>
          <a
            href={orderHref}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-semibold text-forest transition hover:bg-beige"
          >
            {homeContent.order.button[language]}
          </a>
        </div>

        <ol className="grid gap-4">
          {homeContent.order.steps[language].map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl bg-cream/10 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-sm font-bold text-forest">
                {index + 1}
              </span>
              <span className="self-center text-base font-semibold text-cream/95">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DeliverySection() {
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
      <div className="grid gap-6 rounded-3xl border border-espresso/10 bg-white/70 p-6 shadow-soft sm:p-10 lg:grid-cols-[0.75fr_1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Los Guayos</p>
          <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
            {homeContent.delivery.heading[language]}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-matte/75">{homeContent.delivery.body[language]}</p>
      </div>
    </section>
  );
}

export function BrandProofSection() {
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">
            {language === "es" ? "Marca Vento" : "Vento Brand"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
            {homeContent.brandProof.heading[language]}
          </h2>
          <p className="mt-4 leading-relaxed text-matte/75">{homeContent.brandProof.body[language]}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { src: "/brand/vento-cup-counter.jpg", alt: "Vento Cafe branded cup on a counter" },
            { src: "/brand/vento-logo-counter.jpg", alt: "Vento Cafe logo cards on a counter" }
          ].map((image) => (
            <figure
              key={image.src}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-espresso/10 bg-beige/25 shadow-soft"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 28vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FoundersPersonalitySection() {
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-espresso/10 bg-beige/40 shadow-soft">
          <Image
            src="/founders/founders-formal-black.jpg"
            alt="Darren and Francis, founders of Vento Cafe"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-2"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">
            {language === "es" ? "Fundadores" : "Founders"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
            {homeContent.founders.heading[language]}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-matte/75">{homeContent.founders.body[language]}</p>
          <Link
            href="/our-story"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-cream transition hover:bg-espresso"
          >
            {homeContent.founders.cta[language]}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SocialSection() {
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="social">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-forest">Instagram</p>
          <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
            {homeContent.social.heading[language]}
          </h2>
          <p className="mt-4 leading-relaxed text-matte/75">{homeContent.social.body[language]}</p>
          <a
            href="https://instagram.com/ventocafe"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-espresso/20 px-6 text-sm font-semibold text-espresso transition hover:bg-beige"
          >
            {homeContent.social.cta[language]}
          </a>
          <p className="mt-4 text-sm font-semibold text-forest">{homeContent.social.placeholder[language]}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {socialImages.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={`relative overflow-hidden rounded-2xl border border-espresso/10 bg-beige/25 shadow-soft ${
                image.src.startsWith("/brand/") ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={image.src}
                alt="Vento Cafe social preview"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className={image.fit === "contain" ? "object-contain" : "object-cover"}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
