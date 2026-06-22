import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exam-app.elevate-bootcamp.cloud',
      },
    ],
  },
};

export default nextConfig;