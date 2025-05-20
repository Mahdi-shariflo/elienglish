import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isStage = process.env.APP_ENV === 'stage';
  if (isStage) {
    // حالت استیج یا توسعه => هیچ رباتی اجازه ایندکس نداره
    return {
      rules: [
        {
          userAgent: '*',
          disallow: ['/'],
        },
      ],
      sitemap: '', // نقشه سایت ندیم تا تو استیج اصلاً نخونه
    };
  }

  // حالت production => تنظیمات واقعی و بهینه
  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/*?*',
          '/?search=*', // This is redundant but adds an extra safety layer
          '/result',
          '/auth',
          '/verify',
          '/profile',
          '/cart',
          '/address',
          '/checkout',
          '/admin',
          '/too-many-request',
          '/search',
        ],
      },
    ],
    sitemap: 'https://rozesefid.com/sitemap.xml',
  };
}
