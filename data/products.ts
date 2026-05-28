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
    id: "cafe-negro",
    name: "Cafe Negro",
    image: "/products/cafe-negro-pack.jpg",
    shortDescription:
      "Strong smooth coffee for busy mornings or work afternoons.",
    flavorNotes: ["Strong coffee", "Classic taste", "Quick to make"],
    preparation: [
      "Add 1 sachet to 180ml hot water.",
      "Stir for 10 seconds.",
      "Enjoy black or with a hint of brown sugar."
    ],
    price: "$7.50"
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    image: "/products/caramel-cappuccino.jpg",
    shortDescription:
      "Creamy cappuccino for a sweet pause at any time of day.",
    flavorNotes: ["Creamy", "Light sweetness", "Cozy foam"],
    preparation: [
      "Mix 1 stick with 160ml hot water.",
      "Whisk briefly for extra foam.",
      "Serve warm in your favorite mug."
    ],
    price: "$9.00"
  },
  {
    id: "caramel-cappuccino",
    name: "Caramel Cappuccino",
    image: "/products/cappuccino-caramel-box.jpg",
    shortDescription:
      "A sweet caramel cappuccino that is easy to make and easy to share.",
    flavorNotes: ["Caramel", "Creamy", "Snack-time coffee"],
    preparation: [
      "Pour 1 stick into a cup.",
      "Add 170ml hot water and stir.",
      "Top with cinnamon if desired."
    ],
    price: "$9.50"
  },
  {
    id: "vanilla-cappuccino",
    name: "Vanilla Cappuccino",
    image: "/products/vanilla-cappuccino.jpg",
    shortDescription:
      "Smooth vanilla cappuccino for anyone who likes a gentle, sweet coffee.",
    flavorNotes: ["Vanilla", "Smooth", "Easygoing comfort"],
    preparation: [
      "Add 1 stick to 170ml hot water.",
      "Stir until dissolved.",
      "Finish with a touch of nutmeg."
    ],
    price: "$9.50"
  }
];
