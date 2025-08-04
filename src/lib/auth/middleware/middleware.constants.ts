export const pages = [
  '/',
  '/product',
  '/product-category',
  '/blog',
  '/categroy',
  '/faq',
  '/about',
  '/common-questions',
  '/contact-us',
  '/guide',
  '/faq-category',
  '/lpa',
  '/tag',
  '/product-tag',
  '/result',
  '/blog/sitemap',
  '/profile',
  '/checkout',
  '/auth',
  '/verify',
  '/admin',
  '/products',
  '/courses',
  'course-category',
  '/course-tag',
  '/terms',
];

export const noIndexPaths = ['/admin', '/auth', '/search', '/shop', '*/page/*'];

export const gonePaths = [
  '/product-tag/',
  '/shop/',
  '/benchmark/',
  '/brands/',
  '/برند/',
  '/%D8%A8%D8%B1%D9%86%D8%AF/',
] as string[];

export const protectedRoute = ['/checkout', '/address', '/admin', '/profile'];
export const EXCLUDED_PATHS = [
  '/auth',
  '/verify',
  '/favicon.ico',
  '/robots.txt',
  '/manifest.json',
  '/sitemap.xml',
];
