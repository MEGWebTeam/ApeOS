import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-1343222-6332275.cloudwaysapps.com',
      },
    ],
  },
};

export default nextConfig;
