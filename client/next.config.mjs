/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com"
      }
    ],
    deviceSizes: [360, 414, 768, 1366, 1536, 1920],
    imageSizes: [40, 58, 140, 284, 484, 968]
  }
};

export default nextConfig;
