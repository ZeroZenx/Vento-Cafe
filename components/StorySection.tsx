"use client";

import Image from "next/image";
import { storyMilestones, storyValues } from "@/data/story";
import { AnimatedInView } from "@/components/AnimatedInView";
import { homeContent } from "@/data/content";
import { useLanguage } from "@/lib/i18n";

type StorySectionProps = {
  compact?: boolean;
};

export function StorySection({ compact = false }: StorySectionProps) {
  const { language } = useLanguage();
  const items = compact ? storyMilestones.slice(0, 2) : storyMilestones;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="story">
      <AnimatedInView>
        <p className="text-xs uppercase tracking-[0.28em] text-forest">
          {language === "es" ? "Nuestra historia" : "Our Story"}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
          {homeContent.founders.heading[language]}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-matte/75">
          {homeContent.founders.body[language]}
        </p>
      </AnimatedInView>

      <div className="mt-10 space-y-10">
        {items.map((milestone, index) => (
          <AnimatedInView key={milestone.title.en} delay={index * 0.08}>
            <article className="grid gap-6 rounded-3xl border border-espresso/10 bg-white/65 p-4 shadow-soft sm:p-6 md:grid-cols-[220px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-beige/40">
                <Image
                  src={milestone.image}
                  alt={milestone.title[language]}
                  fill
                  sizes="(max-width: 768px) 100vw, 210px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-forest/90">
                  {milestone.year[language]}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-espresso">{milestone.title[language]}</h3>
                <p className="mt-3 text-matte/75">{milestone.description[language]}</p>
              </div>
            </article>
          </AnimatedInView>
        ))}
      </div>

      {!compact && (
        <AnimatedInView className="mt-12 grid gap-4 rounded-3xl border border-forest/20 bg-forest px-6 py-8 text-cream sm:grid-cols-3">
          {storyValues.map((value) => (
            <p key={value.en} className="text-sm leading-relaxed text-cream/90">
              {value[language]}
            </p>
          ))}
        </AnimatedInView>
      )}
    </section>
  );
}
