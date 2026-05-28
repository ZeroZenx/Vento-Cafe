export type CoffeeProduct = {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  flavorNotes: string[];
  preparation: string[];
  price: string;
};

export const coffeeProducts: CoffeeProduct[] = [
  {
    id: "nescafe-clasico",
    name: "Nescafé Clásico",
    image: "/products/nescafe-clasico.png",
    shortDescription:
      "Classic instant black coffee, strong and practical for starting the day.",
    flavorNotes: ["Black coffee", "Classic taste", "25 cups"],
    preparation: [
      "Add one serving to hot water.",
      "Stir well.",
      "Drink it black or with sugar to taste."
    ],
    price: "Consultar"
  },
  {
    id: "colcafe-cappuccino-caramelo",
    name: "Colcafé Caramel Cappuccino",
    image: "/products/colcafe-cappuccino-caramelo.png",
    shortDescription:
      "Sweet caramel cappuccino for a simple, cozy snack break.",
    flavorNotes: ["Caramel", "Creamy", "6 sticks"],
    preparation: [
      "Open one stick.",
      "Add hot water.",
      "Stir until creamy."
    ],
    price: "Consultar"
  },
  {
    id: "colcafe-cappuccino-vainilla",
    name: "Colcafé Vanilla Cappuccino",
    image: "/products/colcafe-cappuccino-vainilla.png",
    shortDescription:
      "Vanilla cappuccino with soft foam for an easy, calm pause.",
    flavorNotes: ["Vanilla", "Extra foam", "6 sticks"],
    preparation: [
      "Place one stick in a cup.",
      "Add hot water.",
      "Stir until dissolved."
    ],
    price: "Consultar"
  },
  {
    id: "nescafe-cappuccino-vainilla",
    name: "Nescafé Vanilla Cappuccino",
    image: "/products/nescafe-cappuccino-vainilla.png",
    shortDescription:
      "Creamy vanilla cappuccino that is quick to make at home or at work.",
    flavorNotes: ["Vanilla", "Creamy", "6 cups"],
    preparation: [
      "Pour one serving into your cup.",
      "Add hot water.",
      "Stir and enjoy."
    ],
    price: "Consultar"
  }
];
