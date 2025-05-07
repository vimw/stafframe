import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Optional: Add this if you use next/image
  images: {
    unoptimized: true,
  },

  eslint: {
    // for debug only
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
