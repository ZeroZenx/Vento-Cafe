export type Language = "es" | "en";
export type LocalizedText = Record<Language, string>;

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      story: "Nuestra historia",
      coffee: "Nuestro cafe",
      pay: "Pagar",
      contact: "Contacto",
      menu: "Menu",
      close: "Cerrar"
    },
    hero: {
      eyebrow: "Cafe hecho con carino en Carabobo",
      title: "Cafe. Conexion. Cultura.",
      subtitle: "Creado con la calidez de Venezuela y Trinidad.",
      business: "Vendemos cafe instantaneo premium y mezclas de cappuccino en Valencia y Los Guayos, Carabobo.",
      coffeeCta: "Explora nuestros cafes",
      whatsappCta: "Pedir por WhatsApp"
    },
    trust: [
      "Pedidos por WhatsApp",
      "Delivery en Valencia y Los Guayos",
      "Aceptamos Pago Movil",
      "Aceptamos Binance",
      "Opciones de cafe frescas",
      "Respuesta rapida"
    ],
    story: {
      eyebrow: "Hecho por nosotros",
      title: "Creado por Darren y Francis",
      body: "Vento Cafe es nuestro pequeno sueno compartido: una marca construida con amor, trabajo y la idea de que una buena taza puede traer calma, conversacion y compania a la rutina diaria.",
      cta: "Conoce nuestra historia"
    },
    coffee: {
      eyebrow: "Nuestro cafe",
      title: "Favoritos sencillos para cada dia",
      body: "Cafe rico y facil de preparar, escogido para tus mananas, pausas y momentos compartidos.",
      flavor: "Como se siente",
      prepare: "Como prepararlo",
      price: "Consultar precio",
      order: "Pedir este cafe",
      all: "Ver todos los cafes"
    },
    lifestyle: {
      eyebrow: "Nuestra vida",
      title: "Momentos reales detras de Vento",
      body: "Viajes, naturaleza, familia y esas pausas sencillas que se disfrutan mejor con cafe."
    },
    order: {
      eyebrow: "Pide facil",
      title: "Como hacer tu pedido",
      steps: [
        "Elige tu cafe",
        "Escribenos por WhatsApp",
        "Confirma la entrega en Valencia o Los Guayos",
        "Paga con Pago Movil o Binance",
        "Recibe tu cafe"
      ],
      cta: "Pedir cafe ahora"
    },
    delivery: {
      eyebrow: "Entrega local",
      title: "Delivery en Valencia y Los Guayos",
      body: "Actualmente entregamos en Valencia y Los Guayos, Carabobo. Escribenos por WhatsApp para confirmar disponibilidad en tu zona.",
      cta: "Confirmar mi zona"
    },
    payment: {
      eyebrow: "Pago sencillo",
      title: "Paga online",
      body: "Elige Pago Movil o Binance. Te compartimos los datos finales por WhatsApp antes de pagar.",
      pago: "Pago Movil Venezuela",
      binance: "Binance Pay",
      scan: "Escanea para pagar",
      placeholder: "QR de muestra",
      instructions: "Confirma el monto con nosotros, escanea el codigo y envia tu comprobante.",
      cta: "Abrir modo de pago rapido"
    },
    social: {
      eyebrow: "Desde el camino",
      title: "Sigue nuestro camino",
      body: "Acompanamos mientras construimos Vento Cafe, una taza y un dia a la vez.",
      cta: "Seguir en Instagram",
      placeholder: "Instagram proximamente"
    },
    contact: {
      eyebrow: "Hablemos",
      title: "Tu proximo cafe empieza aqui",
      body: "Escribenos para consultar productos, disponibilidad y delivery en Valencia y Los Guayos.",
      whatsapp: "Escribir por WhatsApp",
      instagram: "Visitar Instagram"
    },
    pay: {
      eyebrow: "Vento Cafe Quick Pay",
      title: "Escanea, paga y muestranos la confirmacion.",
      select: "Selecciona un metodo",
      paid: "Ya pague, confirmar por WhatsApp",
      message: "Hola Vento Cafe, ya realice el pago. Aqui esta mi confirmacion.",
      back: "Volver a Vento Cafe",
      received: "Confirmacion de pago por WhatsApp"
    },
    floating: "Pedir Cafe Ahora",
    whatsappOrder: "Hola Vento Cafe, quiero hacer un pedido de cafe.",
    footer: {
      line: "Cafe, conexion y cultura, hecho por una pareja real.",
      delivery: "Delivery en Valencia y Los Guayos, Carabobo.",
      rights: "Vento Cafe. Hecho con calidez entre Venezuela y Trinidad."
    }
  },
  en: {
    nav: {
      home: "Home",
      story: "Our Story",
      coffee: "Our Coffee",
      pay: "Pay",
      contact: "Contact",
      menu: "Menu",
      close: "Close"
    },
    hero: {
      eyebrow: "Coffee made with care in Carabobo",
      title: "Coffee. Connection. Culture.",
      subtitle: "Built with warmth from Venezuela and Trinidad.",
      business: "We sell premium instant coffee and cappuccino mixes in Valencia and Los Guayos, Carabobo.",
      coffeeCta: "Explore Our Coffee",
      whatsappCta: "Order on WhatsApp"
    },
    trust: [
      "WhatsApp ordering",
      "Delivery in Valencia and Los Guayos",
      "Pago Movil accepted",
      "Binance accepted",
      "Fresh coffee options",
      "Fast response"
    ],
    story: {
      eyebrow: "Made by us",
      title: "Built by Darren and Francis",
      body: "Vento Cafe is our small shared dream: a brand built with love, work, and the belief that a good cup can bring calm, conversation and company to an ordinary day.",
      cta: "Read our story"
    },
    coffee: {
      eyebrow: "Our coffee",
      title: "Simple favorites for every day",
      body: "Good, easy coffee chosen for mornings, quiet breaks and moments shared together.",
      flavor: "What it feels like",
      prepare: "How to make it",
      price: "Ask for price",
      order: "Order this coffee",
      all: "See all coffee"
    },
    lifestyle: {
      eyebrow: "Our life",
      title: "The real moments behind Vento",
      body: "Travel, nature, family and the simple pauses that feel better with coffee."
    },
    order: {
      eyebrow: "Easy ordering",
      title: "How to order",
      steps: [
        "Choose your coffee",
        "Message us on WhatsApp",
        "Confirm delivery in Valencia or Los Guayos",
        "Pay with Pago Movil or Binance",
        "Receive your coffee"
      ],
      cta: "Order coffee now"
    },
    delivery: {
      eyebrow: "Local delivery",
      title: "Delivery in Valencia and Los Guayos",
      body: "We currently deliver in Valencia and Los Guayos, Carabobo. Message us on WhatsApp to confirm availability in your area.",
      cta: "Check my area"
    },
    payment: {
      eyebrow: "Simple payment",
      title: "Pay online",
      body: "Choose Pago Movil or Binance. We will confirm the final details on WhatsApp before you pay.",
      pago: "Pago Movil Venezuela",
      binance: "Binance Pay",
      scan: "Scan to pay",
      placeholder: "Sample QR",
      instructions: "Confirm the amount with us, scan the code and send your receipt.",
      cta: "Open quick pay mode"
    },
    social: {
      eyebrow: "From the journey",
      title: "Follow our journey",
      body: "Come along as we build Vento Cafe, one cup and one day at a time.",
      cta: "Follow on Instagram",
      placeholder: "Instagram coming soon"
    },
    contact: {
      eyebrow: "Let us talk",
      title: "Your next coffee starts here",
      body: "Message us about products, availability and delivery in Valencia and Los Guayos.",
      whatsapp: "Message on WhatsApp",
      instagram: "Visit Instagram"
    },
    pay: {
      eyebrow: "Vento Cafe Quick Pay",
      title: "Scan, pay, and show us your confirmation.",
      select: "Select a method",
      paid: "I Paid, Confirm on WhatsApp",
      message: "Hi Vento Cafe, I completed my payment. Here is my confirmation.",
      back: "Back to Vento Cafe",
      received: "Payment confirmation through WhatsApp"
    },
    floating: "Order Coffee Now",
    whatsappOrder: "Hi Vento Cafe, I would like to order coffee.",
    footer: {
      line: "Coffee and connection, built by a real couple.",
      delivery: "Delivery in Valencia and Los Guayos, Carabobo.",
      rights: "Vento Cafe. Crafted with warmth from Venezuela and Trinidad."
    }
  }
} as const;

export type TranslationDictionary = (typeof translations)[Language];
