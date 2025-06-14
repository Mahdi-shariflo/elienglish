import { BASEURL, BASEURL_SITE } from '@/lib/variable';
import { Product } from '@/types/home';
import { MetadataRoute } from 'next';

const PRODUCTS_PER_SITEMAP = 1000; // تعداد محصولات در هر نقشه سایت
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getProducts({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<{ totalProducts: number; products: Product[] }> {
  await sleep(1500); // ۱ ثانیه تأخیر برای جلوگیری از rate-limit

  const base64 = btoa('asdl;l;,/.p,SDL:SADCw34352GR^(*@&#)*()@(F)');
  const response = await fetch(
    `${BASEURL}/user/product/all-sitemap?page=${page}&limit=${limit}&sort=createdAt_desc`,
    {
      cache: 'no-store',
      headers: {
        loginKey: base64,
        'Content-type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return {
    totalProducts: data?.data.totalProducts,
    products: data?.data.products,
  };
}

export async function generateSitemaps() {
  // دریافت تعداد کل محصولات
  const data = await getProducts({ limit: PRODUCTS_PER_SITEMAP });

  // محاسبه تعداد سایت‌مپ‌ها
  const sitemapsCount = Math.ceil(Number(data.totalProducts) / PRODUCTS_PER_SITEMAP);

  // ایجاد آرایه‌ای از سایت‌مپ‌ها
  return Array.from({ length: sitemapsCount }, (_, index) => ({
    id: index + 1,
  }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // دریافت محصولات صفحه خاص
  const data: any = await getProducts({
    page: id,
    limit: PRODUCTS_PER_SITEMAP,
  });

  // تولید لینک‌های محصولات
  return data?.products?.map((product: any) => ({
    url: `${BASEURL_SITE}/product/${encodeURIComponent(product.url)}/`,
    lastModified: new Date(product?.updatedAt).toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.6,
  }));
}
