import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalWhatsAppActions } from "@/components/GlobalWhatsAppActions";
import { siteConfig } from "@/data/site";
import { LanguageProvider } from "@/lib/i18n";

const websiteUrl = "https://vento-cafe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(websiteUrl),
  title: {
    default: "Vento Café | Coffee and Cappuccino in Los Guayos, Carabobo",
    template: "%s | Vento Café"
  },
  description: siteConfig.descriptionEn,
  keywords: [
    "Vento Cafe",
    "Venezuelan coffee",
    "Los Guayos Carabobo coffee",
    "Pago Movil",
    "Binance",
    "cappuccino",
    "coffee delivery Los Guayos"
  ],
  openGraph: {
    title: "Vento Café | Coffee and Cappuccino in Los Guayos, Carabobo",
    description: siteConfig.descriptionEn,
    url: websiteUrl,
    siteName: "Vento Café",
    locale: "es_VE",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/brand/vento-cup-counter.jpg",
        width: 1200,
        height: 630,
        alt: "Vento Cafe branded cup"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vento Café | Coffee and Cappuccino in Los Guayos, Carabobo",
    description: siteConfig.descriptionEn,
    images: ["/brand/vento-cup-counter.jpg"]
  },
  alternates: {
    languages: {
      es: websiteUrl,
      en: websiteUrl
    }
  },
  other: {
    "title:es": "Vento Café | Café y Cappuccino en Los Guayos, Carabobo",
    "description:es": siteConfig.description
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: websiteUrl,
  description: siteConfig.description,
  areaServed: ["Los Guayos, Carabobo"],
  paymentAccepted: ["Pago Móvil Venezuela", "Binance"],
  telephone: siteConfig.whatsappNumber,
  sameAs: [siteConfig.instagramUrl]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="bg-warm-gradient pb-24 font-sans text-matte antialiased md:pb-0">
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <GlobalWhatsAppActions />
        </LanguageProvider>
      </body>
    </html>
  );
}
