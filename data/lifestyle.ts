export type LifestyleImage = {
  src: string;
  alt: string;
  span?: "wide" | "tall";
};

export const lifestyleImages: LifestyleImage[] = [
  {
    src: "/founders/founders-01.jpg",
    alt: "Vento Cafe founders outdoors on a relaxed day",
    span: "wide"
  },
  {
    src: "/founders/founders-04.jpg",
    alt: "Founders sharing a candid moment",
    span: "tall"
  },
  {
    src: "/founders/founders-05.jpg",
    alt: "Founders together in nature"
  },
  {
    src: "/founders/founders-06.jpg",
    alt: "Founders smiling with tropical scenery",
    span: "wide"
  },
  {
    src: "/founders/founders-02.jpg",
    alt: "Founders close selfie outdoors"
  },
  {
    src: "/founders/founders-11.jpg",
    alt: "Founders portrait with natural light",
    span: "tall"
  }
];
