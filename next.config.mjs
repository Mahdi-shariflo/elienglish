

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'dkstatics-public.digikala',
      },
      {
        protocol: 'https',
        hostname: 'dkstatics-public.digikala.com',
      },
      {
        protocol: 'https',
        hostname: 'eli-backend.liara.run',
      },
            {
        protocol: 'https',
        hostname: 'eli-backend-main.liara.run',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};


export default nextConfig;
