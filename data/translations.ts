export type Language = "es" | "en";
export type LocalizedText = Record<Language, string>;

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      story: "Nuestra historia",
      coffee: "Productos",
      pay: "Pagar",
      contact: "Contacto",
      menu: "Menu",
      close: "Cerrar"
    },
    hero: {
      eyebrow: "Vento Café & Market en Carabobo",
      title: "Café. Cuidado. Hogar.",
      subtitle: "Productos útiles para tu rutina diaria.",
      business: "Vendemos café, cuidado personal y productos para el hogar en Los Guayos, Carabobo.",
      coffeeCta: "Ver productos",
      whatsappCta: "Pedir por WhatsApp"
    },
    trust: [
      "Pedidos por WhatsApp",
      "Delivery en Los Guayos",
      "Aceptamos Pago Móvil",
      "Aceptamos Binance",
      "Café y cuidado personal",
      "Respuesta rápida"
    ],
    story: {
      eyebrow: "Hecho por nosotros",
      title: "Creado por Darren y Francis",
      body: "Vento Café & Market es nuestro proyecto de pareja: café, productos útiles y atención cercana para familias en Los Guayos.",
      cta: "Conoce nuestra historia"
    },
    coffee: {
      eyebrow: "Productos",
      title: "Café, cuidado personal y ofertas para tu casa",
      body: "Compra café, cappuccino, shampoos, acondicionadores, cremas y lociones para el cuidado diario. Escríbenos para confirmar disponibilidad y precio.",
      flavor: "Bueno para",
      prepare: "Detalles",
      price: "Consultar precio",
      order: "Consultar por WhatsApp",
      all: "Ver todos los productos",
      filters: {
        all: "Todos",
        coffee: "Café",
        hair: "Cuidado del cabello",
        body: "Cuidado personal",
        lotions: "Cremas",
        offers: "Ofertas"
      }
    },
    lifestyle: {
      eyebrow: "Vida diaria",
      title: "Productos reales, servicio local",
      body: "Vento reúne café, cuidado personal y artículos útiles para la rutina de casa."
    },
    order: {
      eyebrow: "Pide fácil",
      title: "Cómo hacer tu pedido",
      steps: [
        "Elige tus productos",
        "Escríbenos por WhatsApp",
        "Confirma disponibilidad y delivery en Los Guayos",
        "Paga con Pago Móvil o Binance",
        "Recibe tu pedido"
      ],
      cta: "Pedir ahora"
    },
    delivery: {
      eyebrow: "Entrega local",
      title: "Delivery en Los Guayos",
      body: "Actualmente entregamos en Los Guayos, Carabobo. Escríbenos por WhatsApp para confirmar disponibilidad en tu zona.",
      cta: "Confirmar mi zona"
    },
    payment: {
      eyebrow: "Pago sencillo",
      title: "Paga online",
      body: "Elige Pago Móvil o Binance. Te compartimos los datos finales por WhatsApp antes de pagar.",
      pago: "Pago Móvil Venezuela",
      binance: "Binance Pay",
      scan: "Escanea para pagar",
      placeholder: "QR de muestra",
      instructions: "Confirma el monto con nosotros, escanea el código y envía tu comprobante.",
      cta: "Abrir pago rápido"
    },
    social: {
      eyebrow: "Desde el camino",
      title: "Sigue nuestro camino",
      body: "Acompáñanos mientras construimos Vento Café & Market con productos, momentos reales y servicio local.",
      cta: "Seguir en Instagram",
      placeholder: "Instagram próximamente"
    },
    contact: {
      eyebrow: "Hablemos",
      title: "Pide productos por WhatsApp",
      body: "Escríbenos para consultar café, cuidado personal, disponibilidad y delivery en Los Guayos.",
      whatsapp: "Escribir por WhatsApp",
      instagram: "Visitar Instagram"
    },
    pay: {
      eyebrow: "Vento Quick Pay",
      title: "Escanea, paga y muéstranos la confirmación.",
      select: "Selecciona un método",
      paid: "Ya pagué, confirmar por WhatsApp",
      message: "Hola Vento Café & Market, ya realicé el pago. Aquí está mi confirmación.",
      back: "Volver a Vento",
      received: "Confirmación de pago por WhatsApp"
    },
    floating: "Pedir ahora",
    whatsappOrder: "Hola Vento Café & Market, quiero hacer un pedido.",
    footer: {
      line: "Café, cuidado personal y productos útiles para la casa.",
      delivery: "Delivery en Los Guayos, Carabobo.",
      rights: "Vento Café & Market. Hecho con cariño en Venezuela."
    }
  },
  en: {
    nav: {
      home: "Home",
      story: "Our Story",
      coffee: "Products",
      pay: "Pay",
      contact: "Contact",
      menu: "Menu",
      close: "Close"
    },
    hero: {
      eyebrow: "Vento Café & Market in Carabobo",
      title: "Coffee. Care. Home.",
      subtitle: "Useful products for your daily routine.",
      business: "We sell coffee, personal care, and household essentials in Los Guayos, Carabobo.",
      coffeeCta: "View products",
      whatsappCta: "Order on WhatsApp"
    },
    trust: [
      "WhatsApp ordering",
      "Delivery in Los Guayos",
      "Pago Móvil accepted",
      "Binance accepted",
      "Coffee and personal care",
      "Fast response"
    ],
    story: {
      eyebrow: "Made by us",
      title: "Built by Darren and Francis",
      body: "Vento Café & Market is our couple-built project: coffee, useful products, and close service for families in Los Guayos.",
      cta: "Read our story"
    },
    coffee: {
      eyebrow: "Products",
      title: "Coffee, personal care, and offers for home",
      body: "Shop coffee, cappuccino, shampoos, conditioners, lotions, and daily personal care products. Message us to confirm availability and price.",
      flavor: "Good for",
      prepare: "Details",
      price: "Ask for price",
      order: "Ask on WhatsApp",
      all: "See all products",
      filters: {
        all: "All",
        coffee: "Coffee",
        hair: "Hair Care",
        body: "Body Care",
        lotions: "Lotions",
        offers: "Offers"
      }
    },
    lifestyle: {
      eyebrow: "Daily life",
      title: "Real products, local service",
      body: "Vento brings together coffee, personal care, and useful items for home routines."
    },
    order: {
      eyebrow: "Easy ordering",
      title: "How to order",
      steps: [
        "Choose your products",
        "Message us on WhatsApp",
        "Confirm availability and delivery in Los Guayos",
        "Pay with Pago Móvil or Binance",
        "Receive your order"
      ],
      cta: "Order now"
    },
    delivery: {
      eyebrow: "Local delivery",
      title: "Delivery in Los Guayos",
      body: "We currently deliver in Los Guayos, Carabobo. Message us on WhatsApp to confirm availability in your area.",
      cta: "Check my area"
    },
    payment: {
      eyebrow: "Simple payment",
      title: "Pay online",
      body: "Choose Pago Móvil or Binance. We will confirm the final details on WhatsApp before you pay.",
      pago: "Pago Móvil Venezuela",
      binance: "Binance Pay",
      scan: "Scan to pay",
      placeholder: "Sample QR",
      instructions: "Confirm the amount with us, scan the code and send your receipt.",
      cta: "Open quick pay"
    },
    social: {
      eyebrow: "From the journey",
      title: "Follow our journey",
      body: "Come along as we build Vento Café & Market with products, real moments, and local service.",
      cta: "Follow on Instagram",
      placeholder: "Instagram coming soon"
    },
    contact: {
      eyebrow: "Let us talk",
      title: "Order products on WhatsApp",
      body: "Message us about coffee, personal care, availability, and delivery in Los Guayos.",
      whatsapp: "Message on WhatsApp",
      instagram: "Visit Instagram"
    },
    pay: {
      eyebrow: "Vento Quick Pay",
      title: "Scan, pay, and show us your confirmation.",
      select: "Select a method",
      paid: "I Paid, Confirm on WhatsApp",
      message: "Hi Vento Café & Market, I completed my payment. Here is my confirmation.",
      back: "Back to Vento",
      received: "Payment confirmation through WhatsApp"
    },
    floating: "Order now",
    whatsappOrder: "Hi Vento Café & Market, I would like to place an order.",
    footer: {
      line: "Coffee, personal care, and useful home products.",
      delivery: "Delivery in Los Guayos, Carabobo.",
      rights: "Vento Café & Market. Built with care in Venezuela."
    }
  }
} as const;

export type TranslationDictionary = (typeof translations)[Language];
