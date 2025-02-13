/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    DIRECTUS_URL_DEV: process.env.DIRECTUS_URL_DEV,
    DIRECTUS_IMAGE_DOMAIN_DEV: process.env.DIRECTUS_IMAGE_DOMAIN_DEV,
  },
  images: {
    // domains: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}`],
    domains: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DEV}`],
    minimumCacheTTL: 60,
    /* add remotePatterns to fix issue of Un-configured Host*/
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
}

module.exports = (nextConfig);
