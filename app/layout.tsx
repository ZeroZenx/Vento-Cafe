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
    default: "Vento Café | Coffee and Cappuccino in Valencia, Venezuela",
    template: "%s | Vento Café"
  },
  description: siteConfig.descriptionEn,
  keywords: [
    "Vento Cafe",
    "Venezuelan coffee",
    "Valencia Venezuela coffee",
    "Pago Movil",
    "Binance",
    "cappuccino",
    "coffee delivery Valencia"
  ],
  openGraph: {
    title: "Vento Café | Coffee and Cappuccino in Valencia, Venezuela",
    description: siteConfig.descriptionEn,
    url: websiteUrl,
    siteName: "Vento Café",
    locale: "es_VE",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/founders/founders-10.jpg",
        width: 1200,
        height: 630,
        alt: "Vento Cafe founders"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vento Café | Coffee and Cappuccino in Valencia, Venezuela",
    description: siteConfig.descriptionEn,
    images: ["/founders/founders-10.jpg"]
  },
  alternates: {
    languages: {
      es: websiteUrl,
      en: websiteUrl
    }
  },
  other: {
    "title:es": "Vento Café | Café y Cappuccino en Valencia, Venezuela",
    "description:es": siteConfig.description
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: websiteUrl,
  description: siteConfig.description,
  areaServed: ["Valencia, Venezuela"],
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
