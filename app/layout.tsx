import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/data/site";

const websiteUrl = "https://vento-cafe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(websiteUrl),
  title: {
    default: "Vento Cafe | Coffee. Connection. Culture.",
    template: "%s | Vento Cafe"
  },
  description: siteConfig.description,
  keywords: [
    "Vento Cafe",
    "Trinidad coffee",
    "Venezuelan coffee",
    "cappuccino",
    "coffee lifestyle brand"
  ],
  openGraph: {
    title: "Vento Cafe | Coffee. Connection. Culture.",
    description: siteConfig.description,
    url: websiteUrl,
    siteName: "Vento Cafe",
    locale: "en_US",
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
    title: "Vento Cafe | Coffee. Connection. Culture.",
    description: siteConfig.description,
    images: ["/founders/founders-10.jpg"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: websiteUrl,
  description: siteConfig.description,
  areaServed: ["Trinidad and Tobago", "Venezuela"],
  sameAs: [siteConfig.instagramUrl]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-warm-gradient font-sans text-matte antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
