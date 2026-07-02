import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['next-auth'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

export default nextConfig;
