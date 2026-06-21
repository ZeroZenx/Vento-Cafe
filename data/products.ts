import type { LocalizedText } from "@/data/translations";

export type CoffeeProduct = {
  id: string;
  name: LocalizedText;
  image: string;
  description: LocalizedText;
  flavor: LocalizedText;
  preparation: LocalizedText;
  price: string;
};

export const coffeeProducts: CoffeeProduct[] = [
  {
    id: "nescafe-clasico",
    name: { es: "Nescafe Clasico", en: "Nescafe Classic" },
    image: "/products/nescafe-clasico.png",
    description: {
      es: "Cafe negro con sabor clasico para empezar la manana, listo en segundos.",
      en: "Classic black coffee for starting the morning, ready in seconds."
    },
    flavor: { es: "Intenso, tostado y directo", en: "Bold, roasted and straightforward" },
    preparation: {
      es: "Agrega una porcion a una taza de agua caliente y mezcla.",
      en: "Add one serving to a cup of hot water and stir."
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "colcafe-cappuccino-caramelo",
    name: { es: "Colcafe Cappuccino Caramelo", en: "Colcafe Caramel Cappuccino" },
    image: "/products/colcafe-cappuccino-caramelo.png",
    description: {
      es: "Un cappuccino dulce y cremoso con ese toque de caramelo que provoca.",
      en: "A sweet, creamy cappuccino with an easy caramel finish."
    },
    flavor: { es: "Caramelo suave y crema", en: "Soft caramel and cream" },
    preparation: {
      es: "Mezcla una porcion con agua caliente y bate un poco para mas espuma.",
      en: "Mix one serving with hot water and whisk briefly for extra foam."
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "colcafe-cappuccino-vainilla",
    name: { es: "Colcafe Cappuccino Vainilla", en: "Colcafe Vanilla Cappuccino" },
    image: "/products/colcafe-cappuccino-vainilla.png",
    description: {
      es: "Cappuccino de vainilla con espuma extra para una pausa facil y calientica.",
      en: "Vanilla cappuccino with extra foam for an easy, cozy break."
    },
    flavor: { es: "Vainilla suave y espuma cremosa", en: "Gentle vanilla and creamy foam" },
    preparation: {
      es: "Vierte una porcion, agrega agua caliente y mezcla bien.",
      en: "Pour in one serving, add hot water and stir well."
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "nescafe-cappuccino-vainilla",
    name: { es: "Nescafe Cappuccino Vainilla", en: "Nescafe Vanilla Cappuccino" },
    image: "/products/nescafe-cappuccino-vainilla.png",
    description: {
      es: "Ligero, aromatico y espumoso para una pausa tranquila durante el dia.",
      en: "Light, fragrant and foamy for a calm break in your day."
    },
    flavor: { es: "Vainilla suave y crema", en: "Gentle vanilla and cream" },
    preparation: {
      es: "Agrega una porcion al agua caliente, mezcla y disfruta.",
      en: "Add one serving to hot water, stir and enjoy."
    },
    price: "Precio por WhatsApp"
  }
];
