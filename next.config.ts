import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    domains: ["res.cloudinary.com", 'via.placeholder.com', 'placehold.co', 'picsum.photos'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };
    return config;
  },
};

export default nextConfig;
