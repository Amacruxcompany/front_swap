/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: ".",
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js"],
  },
  env: {
    AMAX_PORT: "http://localhost:4000",
    AMAX_URL: "http://localhost:3000",
    AMAX_API_KEY: "xxxxx",
    API_KEY_MORALIS:
      "4Fc2vaDpUi8wka9mN8YUO6JjP1bJQICUE8q9Pd1UteeOFz3y2OIRlNTGeNqGvkWw",
    TOTAL_COINS: 600,
    WALLET: "0x464100a0700b8101784cbb71ada5a5d138545a15"
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
