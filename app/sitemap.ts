import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vento-cafe.vercel.app";
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/our-story", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/our-coffee", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/pay", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 }
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
