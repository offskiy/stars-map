import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/stars-map',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['d3-celestial'],
};

export default nextConfig;
