import type { NextConfig } from "next";

const oneYear = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  output: "standalone",
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
      { source: "/_next/static/:path*", headers: cache },
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
