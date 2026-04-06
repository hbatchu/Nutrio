import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "h.cricapi.com",
      },
      {
        protocol: "https",
        hostname: "**.cricapi.com",
      },
    ],
  },
};

export default nextConfig;
