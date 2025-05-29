/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APIFY_API_TOKEN: process.env.APIFY_API_TOKEN,
  },
  images: {
    domains: ["media.licdn.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
