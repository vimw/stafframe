import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Optional: Add this if you use next/image
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
