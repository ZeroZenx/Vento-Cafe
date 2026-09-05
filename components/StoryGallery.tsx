import { SafeImage } from "@/components/SafeImage";

const galleryImages = [
  {
    src: "/founders/founders-extra-0906.jpg",
    alt: "Darren and Francis together outdoors",
    variant: "portrait" as const,
    className: "aspect-[3/4]"
  },
  {
    src: "/founders/founders-studio-kiss.jpg",
    alt: "Darren and Francis sharing a moment",
    variant: "portrait" as const,
    className: "aspect-[3/4]"
  },
  {
    src: "/founders/founders-formal-black.jpg",
    alt: "Darren and Francis in a formal portrait",
    variant: "portrait" as const,
    className: "aspect-[3/4]"
  },
  {
    src: "/founders/founders-los-guayos-sky.jpg",
    alt: "Darren and Francis in Los Guayos",
    variant: "portrait" as const,
    className: "aspect-[3/4]"
  },
  {
    src: "/brand/vento-cup-counter.jpg",
    alt: "Vento Café branded cup on a counter",
    variant: "landscape" as const,
    className: "aspect-[16/10] sm:col-span-2"
  },
  {
    src: "/brand/vento-logo-counter.jpg",
    alt: "Vento Café logo on a counter",
    variant: "landscape" as const,
    className: "aspect-[16/10] sm:col-span-2"
  }
];

export function StoryGallery() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-8 sm:pb-24" aria-label="Vento Café & Market photo gallery">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map((image) => (
          <figure key={image.src} className={`relative overflow-hidden rounded-[1.5rem] border border-espresso/10 bg-beige/35 shadow-soft ${image.className}`}>
            <SafeImage src={image.src} alt={image.alt} variant={image.variant} sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}
