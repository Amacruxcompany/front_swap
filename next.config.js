/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    wagmiConfig: "f9a407aed964f6bc3bfce4eabab7c045",
    AMAX_CCRPT_APIKEY: "xxxxx",
    AMAX_PORT: "http://localhost:4000",
    WALLET: "0x464100a0700b8101784cbb71ada5a5d138545a15",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
