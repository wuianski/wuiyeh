/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    DIRECTUS_URL_DO: process.env.DIRECTUS_URL_DO,
    DIRECTUS_IMAGE_DOMAIN_DO: process.env.DIRECTUS_IMAGE_DOMAIN_DO,
  },
  images: {
    // domains: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}`],
    remotePatterns: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}`],
    minimumCacheTTL: 60,
    /* add remotePatterns to fix issue of Un-configured Host*/
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'data.i-yeh-wu.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/generative-data',
        permanent: true,
      },
    ]
  },
}

module.exports = (nextConfig);
