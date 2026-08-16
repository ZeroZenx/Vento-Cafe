import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd()
  },
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/our-coffee",
        destination: "/products",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
