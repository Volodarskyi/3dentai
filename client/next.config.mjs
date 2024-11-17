/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.APP_ENV,
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_APP_IMAGE_STORE: process.env.NEXT_PUBLIC_APP_IMAGE_STORE,
    NEXT_PUBLIC_APP_BASE_URL_PRODUCTION: process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION || "http://backend:5001",
    NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT: process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT || "http://localhost:5001"
  },
  images: {
    unoptimized: true, // Disable image optimization. TODO: Remove this line once we know hostnames properly
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com"
      },
      {
        protocol: "https",
        hostname: "3dentai.paxel.ca",
      },
      {
        protocol: "https",
        hostname: "hackaton-server.paxel.ca",
      },
      {
        protocol: "https",
        hostname: "nginx-files.paxel.ca",
      },
      {
        protocol: "https",
        hostname: "3dentai.labofdev.com",
      },
      {
        protocol: "https",
        hostname: "3dentai-be.labofdev.com",
      }

    ],
    deviceSizes: [360, 414, 768, 1366, 1536, 1920],
    imageSizes: [40, 58, 140, 284, 484, 968]
  }
};

export default nextConfig;
