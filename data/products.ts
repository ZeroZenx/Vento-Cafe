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
  "jergens-lotions",
  "white-rain-body-wash"
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
    id: "soft-silky-mango",
    category: "hair",
    offer: true,
    name: { es: "Soft & Silky Mango Passion", en: "Soft & Silky Mango Passion" },
    image: "/products/market/soft-silky-mango-offer.jpg",
    description: {
      es: "Set promocional de shampoo, acondicionador y crema para el cabello.",
      en: "Promotional shampoo, conditioner, and hair lotion set."
    },
    highlights: {
      es: ["Cuidado del cabello", "Set promocional", "Oferta"],
      en: ["Hair care", "Promotional set", "Offer"]
    },
    details: {
      es: ["Pregunta por unidades disponibles.", "Ideal para uso familiar.", "Entrega local en Los Guayos."],
      en: ["Ask about available units.", "Good for family use.", "Local delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "soft-silky-colour-safe",
    category: "hair",
    offer: true,
    name: { es: "Soft & Silky Colour Safe", en: "Soft & Silky Colour Safe" },
    image: "/products/market/soft-silky-colour-safe-offer.jpg",
    description: {
      es: "Shampoo y acondicionador para cabello teñido, con crema para el cabello incluida.",
      en: "Shampoo and conditioner for color-treated hair, with hair lotion included."
    },
    highlights: {
      es: ["Cabello teñido", "Set completo", "Oferta"],
      en: ["Color-treated hair", "Full set", "Offer"]
    },
    details: {
      es: ["Confirma disponibilidad por WhatsApp.", "Fotos reales del producto.", "Entrega en Los Guayos."],
      en: ["Confirm availability on WhatsApp.", "Real product photos.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "body-element-sets",
    category: "hair",
    offer: true,
    name: { es: "Body Element Shampoo y Acondicionador", en: "Body Element Shampoo and Conditioner" },
    image: "/products/market/body-element-aloe-set.jpg",
    description: {
      es: "Sets Body Element en varias fragancias para cuidado diario del cabello.",
      en: "Body Element sets in several scents for daily hair care."
    },
    highlights: {
      es: ["Aloe", "Vainilla", "Pink Grapefruit"],
      en: ["Aloe", "Vanilla", "Pink Grapefruit"]
    },
    details: {
      es: ["Pregunta por fragancias disponibles.", "Set promocional.", "Entrega local."],
      en: ["Ask about available scents.", "Promotional set.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "fruit-tree-care",
    category: "body",
    offer: true,
    name: { es: "Fruit Tree Cuidado Personal", en: "Fruit Tree Personal Care" },
    image: "/products/market/fruit-tree-cucumber-set.jpg",
    description: {
      es: "Shampoo, acondicionador y loción Fruit Tree en empaque promocional.",
      en: "Fruit Tree shampoo, conditioner, and lotion in a promotional package."
    },
    highlights: {
      es: ["Cucumber", "Kiwi Papaya", "Chelsea Flowers"],
      en: ["Cucumber", "Kiwi Papaya", "Chelsea Flowers"]
    },
    details: {
      es: ["Varía por disponibilidad.", "Consulta precio por WhatsApp.", "Entrega en Los Guayos."],
      en: ["Availability varies.", "Ask for price on WhatsApp.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "players-strawberry",
    category: "hair",
    offer: true,
    name: { es: "Players Strawberry Shampoo y Conditioner", en: "Players Strawberry Shampoo and Conditioner" },
    image: "/products/market/players-strawberry-set.jpg",
    description: {
      es: "Set Players de fresa para lavar y acondicionar el cabello.",
      en: "Players strawberry set for shampoo and conditioner care."
    },
    highlights: {
      es: ["Fresa", "Shampoo", "Acondicionador"],
      en: ["Strawberry", "Shampoo", "Conditioner"]
    },
    details: {
      es: ["Pregunta por tamaño disponible.", "Producto sujeto a inventario.", "Pedido por WhatsApp."],
      en: ["Ask about available size.", "Subject to inventory.", "Order on WhatsApp."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "caribbean-players-care",
    category: "hair",
    offer: true,
    name: { es: "Caribbean Players Hair Care", en: "Caribbean Players Hair Care" },
    image: "/products/market/caribbean-players-care-set.jpg",
    description: {
      es: "Shampoo, acondicionador y crema hidratante para el cabello.",
      en: "Shampoo, conditioner, and hair moisturizer."
    },
    highlights: {
      es: ["Cabello natural", "Cuidado diario", "Oferta"],
      en: ["Natural hair", "Daily care", "Offer"]
    },
    details: {
      es: ["Consulta disponibilidad.", "Fotos reales.", "Entrega local."],
      en: ["Check availability.", "Real photos.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "jergens-lotions",
    category: "lotions",
    name: { es: "Jergens Cremas Corporales", en: "Jergens Body Lotions" },
    image: "/products/market/jergens-small-lotions.jpg",
    description: {
      es: "Cremas Jergens para hidratación diaria en varias fórmulas.",
      en: "Jergens lotions for daily moisturizing in several formulas."
    },
    highlights: {
      es: ["Daily Moisture", "Age Defying", "Ultra Healing"],
      en: ["Daily Moisture", "Age Defying", "Ultra Healing"]
    },
    details: {
      es: ["Pregunta por fórmula y tamaño.", "Disponibilidad cambia por inventario.", "Entrega en Los Guayos."],
      en: ["Ask about formula and size.", "Availability changes by inventory.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "xtracare-lotions",
    category: "lotions",
    name: { es: "XtraCare Skin Care Lotion", en: "XtraCare Skin Care Lotion" },
    image: "/products/market/xtracare-lotions.jpg",
    description: {
      es: "Cremas XtraCare para piel seca, aloe vera y cuidado diario.",
      en: "XtraCare lotions for dry skin, aloe vera, and daily care."
    },
    highlights: {
      es: ["Aloe Vera", "Intensive Moisture", "Vitamina y avena"],
      en: ["Aloe Vera", "Intensive Moisture", "Vitamin and oatmeal"]
    },
    details: {
      es: ["Consulta el tipo disponible.", "Pedido por WhatsApp.", "Entrega local."],
      en: ["Ask about available type.", "Order on WhatsApp.", "Local delivery."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "white-rain-body-wash",
    category: "body",
    name: { es: "White Rain Body Wash", en: "White Rain Body Wash" },
    image: "/products/market/white-rain-body-wash-colors.jpg",
    description: {
      es: "Body wash White Rain en varias fragancias para uso diario.",
      en: "White Rain body wash in several scents for daily use."
    },
    highlights: {
      es: ["Ocean Mist", "Coconut & Hibiscus", "Energizing Citrus"],
      en: ["Ocean Mist", "Coconut & Hibiscus", "Energizing Citrus"]
    },
    details: {
      es: ["Pregunta por fragancias disponibles.", "Consulta precio por WhatsApp.", "Entrega en Los Guayos."],
      en: ["Ask about available scents.", "Ask for price on WhatsApp.", "Delivery in Los Guayos."]
    },
    price: "Precio por WhatsApp"
  },
  {
    id: "white-rain-botanicals",
    category: "body",
    name: { es: "White Rain Botanicals Body Wash", en: "White Rain Botanicals Body Wash" },
    image: "/products/market/white-rain-body-wash-botanicals.jpg",
    description: {
      es: "Body wash White Rain con fórmulas botánicas para la rutina diaria.",
      en: "White Rain body wash with botanical formulas for daily routines."
    },
    highlights: {
      es: ["Aloe", "Verbena", "Vainilla"],
      en: ["Aloe", "Verbena", "Vanilla"]
    },
    details: {
      es: ["Varía por inventario.", "Pregunta por opciones disponibles.", "Pedido por WhatsApp."],
      en: ["Varies by inventory.", "Ask about available options.", "Order on WhatsApp."]
    },
    price: "Precio por WhatsApp"
  }
];
