// اضافه کردن صفحه اصلی به آرایه pages
const pages = [
  '/product',
  '/product-category',
  '/mag',
  '/about-us',
  '/brands',
  '/common-questions',
  '/contact-us',
  '/guide',
  '/product_brand',
  '/product-tag',
  '/result',
  '/shop',
  '/site-error-report',
  '/profile',
  '/cart',
  '/address',
  '/checkout',
  '/home',
  '/license',
  '/auth/',
  '/verify',
  '/admin/',
  '/festival',
  '/buy-now-pay-later',
  '/rosetime',
  '/nowruz-white-rose',
  '/yalda-festival',
  '/buy-one-get-two',
  '/search-and-win-a-prize',
  '/love-day',
  '/mother-day',
  '/fortune-wheel',
  '/career-opportunities',
  '/low-price-products',
  '/spring-and-summer-products',
  '/fathers-day',
  '/summer-off',
  '/magazine',
  '/pages',
  '/too-many-request',
  '/products',
  '/print',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source:
          '/%D8%B3%DB%8C%D8%A7%D8%B3%D8%AA-%D8%AD%D9%81%D8%B8-%D8%AD%DB%8C%D9%85-%D8%AE%D8%B5%D9%88%D8%B5%DB%8C/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/%D8%AC%D8%B4%D9%86%D9%88%D8%A7%D8%B1%D9%87/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/%D9%BE%DB%8C%DA%AF%DB%8C%D8%B1%DB%8C-%D8%B3%D9%81%D8%A7%D8%B1%D8%B4%D8%A7%D8%AA/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/or/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/compare/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/likes/',
        destination: '/',
        permanent: true,
      },
    ];
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.rozesefid.com',
      },
      {
        protocol: 'https',
        hostname: 'api-stage.rozesefid.com',
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
