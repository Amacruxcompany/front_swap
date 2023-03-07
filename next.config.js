/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: ".",
    include: [
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx",
      "**/*.js"
    ]
  },
  env: {
    AMAX_PORT: 'http://localhost:4000',
    AMAX_API_KEY: 'xxxxx'
  },    
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
    ],
},
}

module.exports = nextConfig
