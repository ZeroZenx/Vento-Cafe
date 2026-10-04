import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: "Vento",
    description: siteConfig.description,
    lang: "es",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#204536",
    theme_color: "#204536",
    icons: [
      { src: "/icons/vento-192-v1.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/vento-512-v1.png", sizes: "512x512", type: "image/png", purpose: "any" }
    ]
  };
}
