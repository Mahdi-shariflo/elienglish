// app/product_brand/[brand].tsx

import { SITE_NAME } from '@/lib/variable';
import { getRobotsMeta } from './common';

export const metadata = () => {
  return {
    title: `قیمت و خرید محصولات دیپ سنس اورجینال | ${SITE_NAME}`,
    robots: getRobotsMeta(),
    description: `دیپ سنس یکی از برندهای معتبری است که محصولاش به صورت تخصصی برای رفع مشکلات پوست و مو طراحی و تولید می‌شوند. این تولید کننده ایرانی بوده و شرکت دکتر اخوی...`,
    openGraph: {
      type: `article`,
      title: `قیمت و خرید محصولات دیپ سنس اورجینال | ${SITE_NAME}`,
      description: `دیپ سنس یکی از برندهای معتبری است که محصولاش به صورت تخصصی برای رفع مشکلات پوست و مو طراحی و تولید می‌شوند. این تولید کننده ایرانی بوده و شرکت دکتر اخوی...`,
      url: `https://rozesefid.com/product_brand/%d8%af%d8%b3%d9%be-%d8%b3%d9%86%d8%b3/`,
      siteName: `${SITE_NAME}`,
      locale: `fa_IR`,
      images: [
        {
          url: `https://rozesefid.com/wp-admin/admin-ajax.php?action=rank_math_overlay_thumb&id=52720&type=play&hash=0db4e995dc9be05d6fc5b7ef886cbd3c`, // تصویر مربوط به برند (اگر وجود دارد)
          width: 750,
          height: 748,
          alt: `محصولات دیپ سنس`,
        },
      ],
    },
    twitter: {
      card: `summary_large_image`,
      title: `قیمت و خرید محصولات دیپ سنس اورجینال | ${SITE_NAME}`,
      description: `دیپ سنس یکی از برندهای معتبری است که محصولاش به صورت تخصصی برای رفع مشکلات پوست و مو طراحی و تولید می‌شوند. این تولید کننده ایرانی بوده و شرکت دکتر اخوی...`,
      image: `https://rozesefid.com/wp-admin/admin-ajax.php?action=rank_math_overlay_thumb&id=52720&type=play&hash=0db4e995dc9be05d6fc5b7ef886cbd3c`,
    },
  };
};
