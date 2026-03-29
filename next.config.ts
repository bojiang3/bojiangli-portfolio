import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "companieslogo.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "banner2.cleanpng.com" },
      { hostname: "brand.illinois.edu" },
      { hostname: "www.logo.wine" },
    ],
  },
};

export default nextConfig;
