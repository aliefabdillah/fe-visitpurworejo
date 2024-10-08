/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    HOST: process.env.HOST,
    MIDTRANS_SECRET: process.env.MIDTRANS_SECRET
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'daisyui.com',
      },
      {
        protocol: 'https',
        hostname: 'visitpurworejo-api.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com'
      }
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
