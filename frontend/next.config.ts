import type { NextConfig } from "next";

const oneYear = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    // @prettier/plugin-php's browser build requires fs/path in a Node-only branch.
    resolveAlias: {
      fs: { browser: "./src/lib/empty-module.ts" },
      path: { browser: "./src/lib/empty-module.ts" },
    },
  },
  images: {
    // Local logos are already tiny. Skip /_next/image (Sharp) on the 1 GB EC2 box.
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
  async headers() {
    const cache = [{ key: "Cache-Control", value: oneYear }];
    return [
      { source: "/:path*.png", headers: cache },
      { source: "/:path*.svg", headers: cache },
      { source: "/:path*.ico", headers: cache },
      { source: "/:path*.webp", headers: cache },
      { source: "/icon.png", headers: cache },
      { source: "/apple-icon.png", headers: cache },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.codesimplify.org" }],
        destination: "https://codesimplify.org/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
