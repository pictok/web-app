/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  reloadOnOnline: true,
});

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bmtbohuzvkdifffdwayv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = withPWA(nextConfig);
