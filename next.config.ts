import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For static export to Netlify
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable SCSS
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  // Enable SVG imports as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // Enable SVG imports as React components with Turbopack (for dev mode)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
