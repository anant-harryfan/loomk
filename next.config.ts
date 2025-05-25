import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '192.168.1.6:3000'],
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Set-Cookie',
            value: 'SameSite=None; Secure',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
