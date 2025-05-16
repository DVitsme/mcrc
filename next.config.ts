import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "shadcnblocks.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "plus.unsplash.com",
      },
      {
        hostname: "source.unsplash.com",
      },
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
