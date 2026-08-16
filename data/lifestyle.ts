export type LifestyleImage = {
  src: string;
  shape: "portrait" | "landscape" | "square";
  variant: "portrait" | "landscape" | "product";
};

export const lifestyleImages: LifestyleImage[] = [
  { src: "/founders/founders-los-guayos-sky.jpg", shape: "portrait", variant: "portrait" },
  { src: "/founders/founders-beach-palm.jpg", shape: "portrait", variant: "portrait" },
  { src: "/founders/founders-formal-black.jpg", shape: "portrait", variant: "portrait" },
  { src: "/brand/vento-cup-counter.jpg", shape: "landscape", variant: "landscape" },
  { src: "/brand/vento-logo-counter.jpg", shape: "landscape", variant: "landscape" },
  { src: "/products/market/white-rain-body-wash-botanicals.jpg", shape: "portrait", variant: "landscape" }
];
