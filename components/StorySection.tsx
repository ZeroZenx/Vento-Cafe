"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { AnimatedInView } from "@/components/AnimatedInView";
import { SafeImage } from "@/components/SafeImage";
import { useLanguage } from "@/components/LanguageProvider";

type StorySectionProps = {
  compact?: boolean;
};

export function StorySection({ compact = false }: StorySectionProps) {
  const { t, language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24" id="story">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <AnimatedInView className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-espresso/10 bg-forest/10 shadow-soft sm:rounded-[2.5rem]">
            <SafeImage src="/founders/founders-05.jpg" alt="Darren and Francis together in nature" variant="portrait" sizes="(max-width: 1024px) 92vw, 44vw" />
          </div>
          <span className="absolute -bottom-5 right-5 grid h-16 w-16 place-items-center rounded-full bg-clay text-cream shadow-soft">
            <Heart className="h-6 w-6" fill="currentColor" />
          </span>
        </AnimatedInView>

        <AnimatedInView delay={0.1}>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-forest">
            <Sparkles className="h-4 w-4" /> {t.story.eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-espresso sm:text-5xl lg:text-6xl">
            {t.story.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-matte/70 sm:text-lg">{t.story.body}</p>
          {!compact && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {(language === "es"
                ? ["Un sueno compartido", "Cafe como rutina", "Calidez de familia"]
                : ["A shared dream", "Coffee as a ritual", "Family warmth"]
              ).map((value) => (
                <div key={value} className="rounded-2xl border border-espresso/10 bg-white/55 p-4 text-sm font-semibold text-espresso">
                  {value}
                </div>
              ))}
            </div>
          )}
          <Link href="/our-story" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:gap-3">
            {t.story.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedInView>
      </div>
    </section>
  );
}
