/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    wagmiConfig:process.env.wagmiConfig ,
    AMAX_CCRPT_APIKEY:process.env.AMAX_CCRPT_APIKEY ,
    AMAX_PORT:process.env.AMAX_PORT,
    WALLET:process.env.WALLET,
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
