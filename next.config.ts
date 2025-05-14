import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "shadcnblocks.com",
      },
    ],
  },
};

export default nextConfig;
