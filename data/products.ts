import type { LocalizedText } from "@/data/translations";

export type ProductCategory = "coffee" | "hair" | "body" | "lotions";

export type Product = {
  id: string;
  category: ProductCategory;
  offer?: boolean;
  name: LocalizedText;
  image: string;
  description: LocalizedText;
  highlights: Record<"es" | "en", string[]>;
  details: Record<"es" | "en", string[]>;
  price: string;
};

export const productFilters = [
  { id: "all", labelKey: "all" },
  { id: "coffee", labelKey: "coffee" },
  { id: "hair", labelKey: "hair" },
  { id: "body", labelKey: "body" },
  { id: "lotions", labelKey: "lotions" },
  { id: "offers", labelKey: "offers" }
] as const;

export const featuredProductIds = [
  "nescafe-clasico",
  "colcafe-cappuccino-caramelo",
  "ultra-hair-care",
  "xtracare-lotion-collection"
];

export const products: Product[] = [
  {
    id: "nescafe-clasico",
    category: "coffee",
    name: { es: "Nescafé Clásico", en: "Nescafé Classic" },
    image: "/products/nescafe-clasico.png",
    description: {
      es: "Café negro clásico para mañanas ocupadas o pausas de trabajo.",
      en: "Classic black coffee for busy mornings or work breaks."
    },
    highlights: {
      es: ["Café fuerte", "Sabor clásico", "Rápido de preparar"],
      en: ["Strong coffee", "Classic taste", "Quick to make"]
    },
    details: {
      es: ["Agrega una porción a agua caliente.", "Mezcla bien.", "Tómalo negro o con azúcar al gusto."],
      en: ["Add one serving to hot water.", "Stir well.", "Drink it black or with sugar to taste."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "colcafe-cappuccino-caramelo",
    category: "coffee",
    name: { es: "Colcafé Cappuccino Caramelo", en: "Colcafé Caramel Cappuccino" },
    image: "/products/colcafe-cappuccino-caramelo.png",
    description: {
      es: "Cappuccino dulce de caramelo, fácil de preparar y compartir.",
      en: "Sweet caramel cappuccino that is easy to make and easy to share."
    },
    highlights: {
      es: ["Caramelo", "Cremoso", "Pausa dulce"],
      en: ["Caramel", "Creamy", "Sweet break"]
    },
    details: {
      es: ["Abre un sobre.", "Agrega agua caliente.", "Mezcla hasta quedar cremoso."],
      en: ["Open one stick.", "Add hot water.", "Stir until creamy."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "colcafe-cappuccino-vainilla",
    category: "coffee",
    name: { es: "Colcafé Cappuccino Vainilla", en: "Colcafé Vanilla Cappuccino" },
    image: "/products/colcafe-cappuccino-vainilla.png",
    description: {
      es: "Cappuccino de vainilla con espuma para una pausa suave.",
      en: "Vanilla cappuccino with foam for a gentle break."
    },
    highlights: {
      es: ["Vainilla", "Espuma", "Café suave"],
      en: ["Vanilla", "Foam", "Smooth coffee"]
    },
    details: {
      es: ["Coloca un sobre en tu taza.", "Agrega agua caliente.", "Mezcla y disfruta."],
      en: ["Place one stick in your cup.", "Add hot water.", "Stir and enjoy."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "nescafe-cappuccino-vainilla",
    category: "coffee",
    name: { es: "Nescafé Cappuccino Vainilla", en: "Nescafé Vanilla Cappuccino" },
    image: "/products/nescafe-cappuccino-vainilla.png",
    description: {
      es: "Cappuccino de vainilla suave para casa, oficina o evento.",
      en: "Smooth vanilla cappuccino for home, office, or events."
    },
    highlights: {
      es: ["Vainilla", "Suave", "Cómodo"],
      en: ["Vanilla", "Smooth", "Easy comfort"]
    },
    details: {
      es: ["Agrega una porción a agua caliente.", "Mezcla bien.", "Pregunta por disponibilidad."],
      en: ["Add one serving to hot water.", "Stir well.", "Ask about availability."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "ultra-hair-care",
    category: "hair",
    name: { es: "Ultra Cuidado del Cabello", en: "Ultra Hair Care Collection" },
    image: "/products/market/ultra-hair-care-collection.jpg",
    description: {
      es: "Colección Ultra de shampoo y acondicionador en varias fórmulas frutales.",
      en: "Ultra shampoo and conditioner collection in several fruit-based formulas."
    },
    highlights: {
      es: ["Fresa", "Aloe", "Oliva", "Manteca de karité"],
      en: ["Strawberry", "Aloe", "Olive", "Shea butter"]
    },
    details: {
      es: ["Pregunta por fragancia disponible.", "Confirma precio por WhatsApp.", "Entrega local en Los Guayos."],
      en: ["Ask about available scent.", "Confirm price on WhatsApp.", "Local delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "xtracare-lotion-collection",
    category: "lotions",
    name: { es: "XtraCare Cremas para la Piel", en: "XtraCare Skin Care Lotions" },
    image: "/products/market/xtracare-lotion-collection.jpg",
    description: {
      es: "Cremas XtraCare para hidratación diaria y piel seca.",
      en: "XtraCare lotions for daily moisture and dry skin care."
    },
    highlights: {
      es: ["Sweet Pea Blossom", "Aloe Vera", "Cocoa & Shea Butter", "Cherry Almond"],
      en: ["Sweet Pea Blossom", "Aloe Vera", "Cocoa & Shea Butter", "Cherry Almond"]
    },
    details: {
      es: ["Consulta la fórmula disponible.", "Pedido por WhatsApp.", "Entrega local."],
      en: ["Ask about available formula.", "Order on WhatsApp.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "white-rain-verbena-violet",
    category: "hair",
    name: { es: "White Rain Verbena y Violeta", en: "White Rain Verbena & Violet" },
    image: "/products/market/white-rain-verbena-violet.jpg",
    description: {
      es: "Shampoo y acondicionador White Rain con fragancia de verbena y violeta.",
      en: "White Rain shampoo and conditioner with a verbena and violet fragrance."
    },
    highlights: {
      es: ["Shampoo", "Acondicionador", "Verbena", "Violeta"],
      en: ["Shampoo", "Conditioner", "Verbena", "Violet"]
    },
    details: {
      es: ["Pregunta por unidades disponibles.", "Confirma precio por WhatsApp.", "Entrega en Los Guayos."],
      en: ["Ask about available units.", "Confirm price on WhatsApp.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "fruit-tree-collection",
    category: "body",
    offer: true,
    name: { es: "Fruit Tree Cuidado Personal", en: "Fruit Tree Personal Care" },
    image: "/products/market/fruit-tree-personal-care.jpg",
    description: {
      es: "Shampoo, acondicionador y loción Fruit Tree en fórmulas de pepino y flores.",
      en: "Fruit Tree shampoo, conditioner, and lotion in cucumber and floral formulas."
    },
    highlights: {
      es: ["Pepino", "Chelsea Flowers", "Shampoo", "Loción"],
      en: ["Cucumber", "Chelsea Flowers", "Shampoo", "Lotion"]
    },
    details: {
      es: ["Oferta sujeta a inventario.", "Consulta precio por WhatsApp.", "Entrega en Los Guayos."],
      en: ["Offer subject to inventory.", "Ask for price on WhatsApp.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "white-rain-vanilla-shea",
    category: "hair",
    name: { es: "White Rain Vainilla y Manteca de Karité", en: "White Rain Vanilla & Shea Butter" },
    image: "/products/market/white-rain-vanilla-shea-butter.jpg",
    description: {
      es: "Shampoo y acondicionador White Rain con vainilla y manteca de karité.",
      en: "White Rain shampoo and conditioner with vanilla and shea butter."
    },
    highlights: {
      es: ["Shampoo", "Acondicionador", "Vainilla", "Manteca de karité"],
      en: ["Shampoo", "Conditioner", "Vanilla", "Shea butter"]
    },
    details: {
      es: ["Pregunta por unidades disponibles.", "Confirma precio por WhatsApp.", "Entrega local."],
      en: ["Ask about available units.", "Confirm price on WhatsApp.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "body-element-collection",
    category: "hair",
    offer: true,
    name: { es: "Body Element Toronja y Vainilla", en: "Body Element Grapefruit & Vanilla" },
    image: "/products/market/body-element-grapefruit-vanilla.jpg",
    description: {
      es: "Sets Body Element de shampoo y acondicionador en toronja rosada y vainilla.",
      en: "Body Element shampoo and conditioner sets in pink grapefruit and vanilla."
    },
    highlights: {
      es: ["Toronja rosada", "Vainilla", "Shampoo", "Acondicionador"],
      en: ["Pink grapefruit", "Vanilla", "Shampoo", "Conditioner"]
    },
    details: {
      es: ["Oferta sujeta a inventario.", "Pregunta por fragancia disponible.", "Entrega local."],
      en: ["Offer subject to inventory.", "Ask about available scent.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "personal-care-lotions",
    category: "lotions",
    name: { es: "Cremas Personal Care", en: "Personal Care Lotions" },
    image: "/products/market/personal-care-lotion-collection.jpg",
    description: {
      es: "Cremas Personal Care de manteca de karité, cocoa y vitamina E.",
      en: "Personal Care lotions with shea butter, cocoa butter, and vitamin E."
    },
    highlights: {
      es: ["Manteca de karité", "Cocoa", "Vitamina E"],
      en: ["Shea butter", "Cocoa butter", "Vitamin E"]
    },
    details: {
      es: ["Consulta la fórmula disponible.", "Pedido por WhatsApp.", "Entrega en Los Guayos."],
      en: ["Ask about available formula.", "Order on WhatsApp.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "soft-silky-fruit-collection",
    category: "hair",
    offer: true,
    name: { es: "Soft & Silky Colección Frutal", en: "Soft & Silky Fruit Collection" },
    image: "/products/market/soft-silky-fruit-collection.jpg",
    description: {
      es: "Sets Soft & Silky de shampoo, acondicionador y loción para el cabello.",
      en: "Soft & Silky shampoo, conditioner, and hair lotion sets."
    },
    highlights: {
      es: ["Durazno", "Mango", "Toronja", "Loción con aceite"],
      en: ["Peach", "Mango", "Grapefruit", "Oil lotion"]
    },
    details: {
      es: ["Oferta sujeta a inventario.", "Pregunta por fragancia disponible.", "Entrega en Los Guayos."],
      en: ["Offer subject to inventory.", "Ask about available scent.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "white-rain-pomegranate",
    category: "hair",
    name: { es: "White Rain Granada", en: "White Rain Pomegranate" },
    image: "/products/market/white-rain-pomegranate.jpg",
    description: {
      es: "Shampoo y acondicionador White Rain con fragancia de granada.",
      en: "White Rain shampoo and conditioner with a pomegranate fragrance."
    },
    highlights: {
      es: ["Shampoo", "Acondicionador", "Granada"],
      en: ["Shampoo", "Conditioner", "Pomegranate"]
    },
    details: {
      es: ["Pregunta por unidades disponibles.", "Confirma precio por WhatsApp.", "Entrega local."],
      en: ["Ask about available units.", "Confirm price on WhatsApp.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  }
];
