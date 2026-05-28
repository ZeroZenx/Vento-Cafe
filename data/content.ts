import type { Language } from "@/lib/i18n";

type LocalizedText = Record<Language, string>;

export const whatsapp = {
  phone: "+58 424-9726415",
  orderMessage: {
    es: "Hola Vento Café, quiero hacer un pedido de café.",
    en: "Hi Vento Café, I would like to order coffee."
  },
  paidMessage: {
    es: "Hola Vento Café, ya realicé el pago. Aquí está mi confirmación.",
    en: "Hi Vento Café, I completed my payment. Here is my confirmation."
  }
} satisfies {
  phone: string;
  orderMessage: LocalizedText;
  paidMessage: LocalizedText;
};

export const navContent = {
  es: [
    { label: "Inicio", href: "/" },
    { label: "Nuestra historia", href: "/our-story" },
    { label: "Café", href: "/our-coffee" },
    { label: "Pago rápido", href: "/pay" },
    { label: "Contacto", href: "/contact" }
  ],
  en: [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/our-story" },
    { label: "Our Coffee", href: "/our-coffee" },
    { label: "Quick Pay", href: "/pay" },
    { label: "Contact", href: "/contact" }
  ]
};

export const homeContent = {
  hero: {
    eyebrow: { es: "Vento Café", en: "Vento Café" },
    title: { es: "Café para tu rutina diaria.", en: "Coffee for your daily routine." },
    subtitle: {
      es: "Vendemos café instantáneo premium y mezclas de cappuccino en Valencia, Venezuela.",
      en: "We sell premium instant coffee and cappuccino mixes in Valencia, Venezuela."
    },
    support: {
      es: "Pedidos simples por WhatsApp, entrega local y pago con Pago Móvil o Binance.",
      en: "Simple WhatsApp ordering, local delivery, and Pago Móvil or Binance payments."
    },
    primaryCta: { es: "Pedir Café Ahora", en: "Order Coffee Now" },
    secondaryCta: { es: "Ver cafés", en: "See coffee" }
  },
  trustBadges: {
    es: [
      "Pedidos por WhatsApp",
      "Delivery en Valencia",
      "Aceptamos Pago Móvil",
      "Aceptamos Binance",
      "Opciones de café frescas",
      "Respuesta rápida"
    ],
    en: [
      "WhatsApp ordering",
      "Delivery in Valencia",
      "Pago Móvil accepted",
      "Binance accepted",
      "Fresh coffee options",
      "Fast response"
    ]
  },
  order: {
    heading: { es: "Cómo pedir", en: "How to Order" },
    intro: {
      es: "Mantuvimos el proceso simple para que puedas pedir rápido y confirmar todo con una persona real.",
      en: "We keep ordering simple so you can choose quickly and confirm everything with a real person."
    },
    steps: {
      es: [
        "Elige tu café",
        "Escríbenos por WhatsApp",
        "Confirma la entrega en Valencia",
        "Paga con Pago Móvil o Binance",
        "Recibe tu café"
      ],
      en: [
        "Choose your coffee",
        "Message us on WhatsApp",
        "Confirm delivery in Valencia",
        "Pay with Pago Móvil or Binance",
        "Receive your coffee"
      ]
    },
    button: { es: "Pedir por WhatsApp", en: "Order on WhatsApp" }
  },
  delivery: {
    heading: { es: "Delivery en Valencia", en: "Delivery in Valencia" },
    body: {
      es: "Actualmente entregamos solo en Valencia, Venezuela. Escríbenos por WhatsApp para confirmar disponibilidad en tu zona.",
      en: "We currently deliver only in Valencia, Venezuela. Message us on WhatsApp to confirm availability in your area."
    }
  },
  founders: {
    heading: { es: "Creado por Darren y Francis", en: "Built by Darren and Francis" },
    body: {
      es: "Vento Café es un proyecto de pareja hecho con amor, trabajo y un sueño compartido. Para nosotros, el café es comodidad, conexión y esa pequeña pausa que acompaña la rutina de cada día.",
      en: "Vento Café is a couple-built coffee brand made with love, work, and a shared dream. For us, coffee is comfort, connection, and the small pause that makes daily life feel warmer."
    },
    cta: { es: "Conoce nuestra historia", en: "Read our story" }
  },
  social: {
    heading: { es: "Sigue nuestro camino", en: "Follow our journey" },
    body: {
      es: "Estamos preparando nuestro Instagram. Por ahora, aquí compartimos café, momentos reales y el crecimiento de Vento Café paso a paso.",
      en: "Our Instagram is getting ready. For now, here is a little look at the coffee, real moments, and step-by-step growth of Vento Café."
    },
    cta: { es: "Seguir en Instagram", en: "Follow on Instagram" },
    placeholder: { es: "@ventocafe próximamente", en: "@ventocafe coming soon" }
  }
};

export const productsContent = {
  section: {
    eyebrow: { es: "Nuestros cafés", en: "Our Coffee" },
    heading: { es: "Café fácil para la casa, la oficina y la calle.", en: "Easy coffee for home, work, and busy days." },
    description: {
      es: "Opciones sencillas y ricas para cuando quieres café rápido sin complicarte.",
      en: "Simple, warm options for when you want good coffee without making it complicated."
    },
    notesLabel: { es: "Ideal para", en: "Good for" },
    prepLabel: { es: "Preparación", en: "Preparation" }
  },
  items: [
    {
      id: "nescafe-clasico",
      name: { es: "Nescafé Clásico", en: "Nescafé Clásico" },
      image: "/products/nescafe-clasico.png",
      shortDescription: {
        es: "Café negro soluble, fuerte y práctico para empezar el día.",
        en: "Classic instant black coffee, strong and practical for starting the day."
      },
      flavorNotes: {
        es: ["Café negro", "Sabor clásico", "25 tazas"],
        en: ["Black coffee", "Classic taste", "25 cups"]
      },
      preparation: {
        es: ["Agrega una porción a agua caliente.", "Mezcla bien.", "Tómalo negro o con azúcar al gusto."],
        en: ["Add one serving to hot water.", "Stir well.", "Drink it black or with sugar to taste."]
      },
      price: "Consultar"
    },
    {
      id: "colcafe-cappuccino-caramelo",
      name: { es: "Colcafé Cappuccino Caramelo", en: "Colcafé Caramel Cappuccino" },
      image: "/products/colcafe-cappuccino-caramelo.png",
      shortDescription: {
        es: "Cappuccino dulce de caramelo para una merienda sencilla y rica.",
        en: "Sweet caramel cappuccino for a simple, cozy snack break."
      },
      flavorNotes: {
        es: ["Caramelo", "Cremoso", "6 sobres"],
        en: ["Caramel", "Creamy", "6 sticks"]
      },
      preparation: {
        es: ["Abre un sobre.", "Agrega agua caliente.", "Revuelve hasta que quede cremoso."],
        en: ["Open one stick.", "Add hot water.", "Stir until creamy."]
      },
      price: "Consultar"
    },
    {
      id: "colcafe-cappuccino-vainilla",
      name: { es: "Colcafé Cappuccino Vainilla", en: "Colcafé Vanilla Cappuccino" },
      image: "/products/colcafe-cappuccino-vainilla.png",
      shortDescription: {
        es: "Cappuccino de vainilla con espuma suave para una pausa tranquila.",
        en: "Vanilla cappuccino with soft foam for an easy, calm pause."
      },
      flavorNotes: {
        es: ["Vainilla", "Extra espuma", "6 sobres"],
        en: ["Vanilla", "Extra foam", "6 sticks"]
      },
      preparation: {
        es: ["Coloca un sobre en una taza.", "Agrega agua caliente.", "Mezcla hasta disolver."],
        en: ["Place one stick in a cup.", "Add hot water.", "Stir until dissolved."]
      },
      price: "Consultar"
    },
    {
      id: "nescafe-cappuccino-vainilla",
      name: { es: "Nescafé Cappuccino Vainilla", en: "Nescafé Vanilla Cappuccino" },
      image: "/products/nescafe-cappuccino-vainilla.png",
      shortDescription: {
        es: "Cappuccino de vainilla cremoso para preparar rápido en casa o en la oficina.",
        en: "Creamy vanilla cappuccino that is quick to make at home or at work."
      },
      flavorNotes: {
        es: ["Vainilla", "Cremoso", "6 tazas"],
        en: ["Vanilla", "Creamy", "6 cups"]
      },
      preparation: {
        es: ["Vierte una porción en tu taza.", "Agrega agua caliente.", "Revuelve y disfruta."],
        en: ["Pour one serving into your cup.", "Add hot water.", "Stir and enjoy."]
      },
      price: "Consultar"
    }
  ]
};

export const payContent = {
  title: { es: "Pago rápido", en: "Quick Pay" },
  subtitle: {
    es: "Escanea, paga y muéstranos la confirmación.",
    en: "Scan, pay, and show us your confirmation."
  },
  selectorLabel: { es: "Método de pago", en: "Payment method" },
  methods: {
    pagoMovil: {
      label: "Pago Móvil Venezuela",
      instructions: {
        es: "Usa el QR de Pago Móvil cuando esté activo. Si estás en un evento, confirma el monto con nosotros antes de pagar.",
        en: "Use the Pago Móvil QR when it is active. If you are at an event, confirm the amount with us before paying."
      }
    },
    binance: {
      label: "Binance",
      instructions: {
        es: "Usa el QR de Binance cuando esté activo y guarda tu comprobante para confirmarlo por WhatsApp.",
        en: "Use the Binance QR when it is active and keep your receipt so we can confirm it on WhatsApp."
      }
    }
  },
  qrPlaceholder: { es: "QR próximamente", en: "QR coming soon" },
  confirmButton: { es: "Ya pagué, confirmar por WhatsApp", en: "I Paid, Confirm on WhatsApp" },
  helper: {
    es: "Esta pantalla es para ventas rápidas en calle o eventos. No es un checkout completo.",
    en: "This screen is for quick roadside or event sales. It is not a full ecommerce checkout."
  }
};
