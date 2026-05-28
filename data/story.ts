import type { Language } from "@/lib/i18n";

export type StoryMilestone = {
  year: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
};

export const storyMilestones: StoryMilestone[] = [
  {
    year: { es: "2025", en: "2025" },
    title: { es: "Un ritual compartido", en: "A Shared Ritual" },
    description: {
      es: "Nuestra historia empezó con conversaciones sencillas en la mañana, una taza a la vez, y la ilusión de crear algo juntos.",
      en: "Our coffee story started with simple morning conversations, one cup at a time, and the hope of building something together."
    },
    image: "/founders/founders-07.jpg"
  },
  {
    year: { es: "2026", en: "2026" },
    title: { es: "Un sueño de pareja", en: "A Couple-Built Dream" },
    description: {
      es: "Entre trabajo, pruebas y muchas ideas, estamos construyendo Vento Café como una marca cercana, útil y hecha con cariño.",
      en: "Through work, tastings, and many ideas, we are building Vento Café as a warm, practical brand made with care."
    },
    image: "/founders/founders-03.jpg"
  },
  {
    year: { es: "Hoy", en: "Today" },
    title: { es: "Café para Valencia", en: "Coffee for Valencia" },
    description: {
      es: "Nuestra primera etapa es Valencia, Venezuela: pedidos por WhatsApp, entrega local y café para la rutina diaria.",
      en: "Our first phase is Valencia, Venezuela: WhatsApp ordering, local delivery, and coffee for daily routines."
    },
    image: "/founders/founders-10.jpg"
  }
];

export const storyValues = [
  {
    es: "Marca de pareja con rituales reales de todos los días",
    en: "Couple-built brand with real daily rituals"
  },
  {
    es: "Hecha en Venezuela con un trato cálido y personal",
    en: "Built in Venezuela with a warm, personal touch"
  },
  {
    es: "Enfocada en comodidad, conexión y café fácil",
    en: "Focused on comfort, connection, and easy coffee"
  }
];
