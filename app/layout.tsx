import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { siteConfig } from "@/data/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  title: {
    default: "Vento Cafe | Cafe y Cappuccino en Valencia y Los Guayos",
    template: "%s | Vento Cafe"
  },
  description:
    "Pide cafe instantaneo premium y mezclas de cappuccino en Valencia y Los Guayos, Carabobo. Pedidos por WhatsApp, Pago Movil y Binance.",
  keywords: [
    "cafe Valencia Venezuela",
    "cappuccino Valencia",
    "cafe Los Guayos",
    "cafe instantaneo",
    "Pago Movil",
    "Binance",
    "Vento Cafe"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vento Cafe | Cafe y Cappuccino en Valencia y Los Guayos",
    description:
      "Pide cafe instantaneo premium y mezclas de cappuccino en Valencia y Los Guayos. Pedidos por WhatsApp, Pago Movil y Binance.",
    url: siteConfig.websiteUrl,
    siteName: "Vento Cafe",
    locale: "es_VE",
    alternateLocale: ["en_US"],
    type: "website",
    images: [{ url: "/founders/founders-11.jpg", width: 959, height: 1280, alt: "Darren y Francis, fundadores de Vento Cafe" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vento Cafe | Cafe y Cappuccino en Valencia y Los Guayos",
    description: "Cafe, conexion y cultura. Delivery en Valencia y Los Guayos, Carabobo.",
    images: ["/founders/founders-11.jpg"]
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Vento Cafe",
  url: siteConfig.websiteUrl,
  telephone: siteConfig.whatsappNumber,
  description: "Cafe instantaneo premium y mezclas de cappuccino con delivery en Valencia y Los Guayos, Carabobo.",
  areaServed: [
    { "@type": "City", name: "Valencia, Carabobo, Venezuela" },
    { "@type": "City", name: "Los Guayos, Carabobo, Venezuela" }
  ],
  sameAs: [siteConfig.instagramUrl]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
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
