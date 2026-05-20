import type { NextConfig } from "next";

const djangoApi =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  // Django API routes require trailing slashes; do not strip them on /api/*.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    const apiBase = djangoApi.replace(/\/$/, "");
    return [
      {
        // Django requires trailing slashes on POST; Next strips them unless we add one here.
        source: "/api/:path*",
        destination: `${apiBase}/api/:path*/`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
