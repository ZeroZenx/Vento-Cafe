"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { SafeImage } from "@/components/SafeImage";

type InnerPageHeroProps = {
  page: "story" | "coffee" | "contact";
};

const pageImages = {
  story: "/founders/founders-07.jpg",
  coffee: "/products/nescafe-clasico.png",
  contact: "/founders/founders-04.jpg"
};

export function InnerPageHero({ page }: InnerPageHeroProps) {
  const { t } = useLanguage();
  const content = {
    story: { eyebrow: t.story.eyebrow, title: t.story.title, body: t.story.body },
    coffee: { eyebrow: t.coffee.eyebrow, title: t.coffee.title, body: t.coffee.body },
    contact: { eyebrow: t.contact.eyebrow, title: t.contact.title, body: t.contact.body }
  }[page];
  const variant = page === "coffee" ? "product" : "portrait";

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest">{content.eyebrow}</p>
        <h1 className="mt-4 text-balance font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-espresso sm:text-6xl">
          {content.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-matte/70 sm:text-lg">{content.body}</p>
      </div>
      <div className={`relative overflow-hidden rounded-[2rem] border border-espresso/10 shadow-soft ${page === "coffee" ? "aspect-[4/3] bg-[#f3eadc]" : "aspect-[3/4] max-h-[650px] bg-beige/50"}`}>
        <SafeImage src={pageImages[page]} alt={content.title} variant={variant} priority sizes="(max-width: 1024px) 92vw, 48vw" />
      </div>
    </section>
  );
}
