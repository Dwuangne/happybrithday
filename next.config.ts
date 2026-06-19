import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Tránh lỗi SegmentViewNode / manifest corrupt trên Windows dev (Next 15.5)
    devtoolSegmentExplorer: false,
  },
  serverExternalPackages: ["canvas-confetti"],
};

export default nextConfig;
