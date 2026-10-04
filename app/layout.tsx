import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/icons/vento-32-v1.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/vento-192-v1.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/icons/vento-apple-touch-v1.png", sizes: "180x180", type: "image/png" }]
  },
  appleWebApp: {
    capable: true,
    title: "Vento",
    statusBarStyle: "default"
  },
  title: {
    default: "Vento Café & Market | Products in Los Guayos, Carabobo",
    template: "%s | Vento Café & Market"
  },
  description: siteConfig.descriptionEn,
  keywords: [
    "Vento Cafe",
    "Vento Market",
    "Los Guayos Carabobo products",
    "coffee Los Guayos",
    "personal care Los Guayos",
    "household essentials Los Guayos",
    "Pago Movil",
    "Binance"
  ],
  alternates: {
    canonical: "/",
    languages: {
      es: siteConfig.websiteUrl,
      en: siteConfig.websiteUrl
    }
  },
  openGraph: {
    title: "Vento Café & Market | Products in Los Guayos, Carabobo",
    description: siteConfig.descriptionEn,
    url: siteConfig.websiteUrl,
    siteName: siteConfig.name,
    locale: "es_VE",
    alternateLocale: ["en_US"],
    type: "website",
    images: [{ url: "/brand/vento-cup-counter.jpg", width: 1600, height: 900, alt: "Vento Café branded cup on a counter" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vento Café & Market | Products in Los Guayos, Carabobo",
    description: siteConfig.descriptionEn,
    images: ["/brand/vento-cup-counter.jpg"]
  },
  other: {
    "title:es": "Vento Café & Market | Café y productos en Los Guayos, Carabobo",
    "description:es": siteConfig.description
  }
};

export const viewport: Viewport = {
  themeColor: "#204536"
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.websiteUrl,
  telephone: siteConfig.whatsappNumber,
  description: siteConfig.description,
  areaServed: [{ "@type": "City", name: "Los Guayos, Carabobo, Venezuela" }],
  sameAs: [siteConfig.instagramUrl]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-warm-gradient font-sans text-matte antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}
