import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/stars-map',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
