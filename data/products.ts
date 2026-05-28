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
      "Bold instant black coffee with a clean finish for mornings that need focus.",
    flavorNotes: ["Dark cocoa", "Roasted walnut", "Velvety bitterness"],
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
      "Smooth cafe-style cappuccino mix with creamy foam and comforting body.",
    flavorNotes: ["Foamed milk", "Toasted sugar", "Soft espresso"],
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
      "Golden caramel sweetness layered over a creamy cappuccino profile.",
    flavorNotes: ["Caramel drizzle", "Sweet cream", "Light mocha"],
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
      "A fragrant vanilla cappuccino with airy foam and a silky aftertaste.",
    flavorNotes: ["Vanilla bean", "Buttery cream", "Mild roast"],
    preparation: [
      "Add 1 stick to 170ml hot water.",
      "Stir until dissolved.",
      "Finish with a touch of nutmeg."
    ],
    price: "$9.50"
  }
];
