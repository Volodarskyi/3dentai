/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_APP_BASE_URL_PRODUCTION: process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION,
    NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT: process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com"
      },
      {
        protocol: "https",
        hostname: "hackaton-server.paxel.ca"
      }
    ],
    deviceSizes: [360, 414, 768, 1366, 1536, 1920],
    imageSizes: [40, 58, 140, 284, 484, 968]
  }
};

export default nextConfig;
