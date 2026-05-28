import Image from "next/image";
import { storyMilestones, storyValues } from "@/data/story";
import { AnimatedInView } from "@/components/AnimatedInView";

type StorySectionProps = {
  compact?: boolean;
};

export function StorySection({ compact = false }: StorySectionProps) {
  const items = compact ? storyMilestones.slice(0, 2) : storyMilestones;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="story">
      <AnimatedInView>
        <p className="text-xs uppercase tracking-[0.28em] text-forest">Our Story</p>
        <h2 className="mt-3 text-3xl font-semibold text-espresso sm:text-4xl">
          A Couple Building a Coffee Dream
        </h2>
        <p className="mt-4 max-w-3xl text-base text-matte/75">
          Vento Cafe was born from quiet moments, family values, and the beauty of sharing coffee
          across cultures. Our journey blends Venezuelan coffee warmth with the easy hospitality of
          Trinidad.
        </p>
      </AnimatedInView>

      <div className="mt-10 space-y-10">
        {items.map((milestone, index) => (
          <AnimatedInView key={milestone.title} delay={index * 0.08}>
            <article className="grid gap-6 rounded-3xl border border-espresso/10 bg-white/60 p-4 shadow-soft sm:p-6 md:grid-cols-[210px_1fr]">
              <div className="relative h-52 overflow-hidden rounded-2xl md:h-full">
                <Image
                  src={milestone.image}
                  alt={milestone.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 210px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-forest/90">
                  {milestone.year}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-espresso">{milestone.title}</h3>
                <p className="mt-3 text-matte/75">{milestone.description}</p>
              </div>
            </article>
          </AnimatedInView>
        ))}
      </div>

      {!compact && (
        <AnimatedInView className="mt-12 grid gap-4 rounded-3xl border border-forest/20 bg-forest px-6 py-8 text-cream sm:grid-cols-3">
          {storyValues.map((value) => (
            <p key={value} className="text-sm leading-relaxed text-cream/90">
              {value}
            </p>
          ))}
        </AnimatedInView>
      )}
    </section>
  );
}
