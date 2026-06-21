import Image from "next/image";

type SafeImageVariant = "portrait" | "landscape" | "product" | "hero";

type SafeImageProps = {
  src: string;
  alt: string;
  variant: SafeImageVariant;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const variantClasses: Record<SafeImageVariant, string> = {
  portrait: "object-contain object-top",
  landscape: "object-cover object-center",
  product: "object-contain object-center p-5 sm:p-7",
  hero: "object-contain object-top"
};

export function SafeImage({
  src,
  alt,
  variant,
  priority = false,
  sizes = "100vw",
  className = ""
}: SafeImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`${variantClasses[variant]} ${className}`}
    />
  );
}

