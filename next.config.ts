/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Enable SVG imports as React components with Turbopack
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

module.exports = nextConfig;
