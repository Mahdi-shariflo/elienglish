import { NextRequest, NextResponse, userAgent } from 'next/server';
import { COOCIES_NAME } from '../variable';

function generateUniqueToken(length = 82) {
  const characters =
    'ABC2343423423DEFGHIJKLMNOPQR2351235STUVWX68757656545YZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

const pages = [
  '/',
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
  '/mag/sitemap',
  '/shop',
  '/site-error-report',
  '/profile',
  '/cart',
  '/address',
  '/checkout',
  '/home',
  '/license',
  '/auth',
  '/verify',
  '/admin',
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

const noIndexPaths = ['/admin', '/auth', '/search', '/shop'];
const gonePaths = [
  '/product-tag/',
  '/shop/',
  '/benchmark/',
  '/brands/',
  '/برند/',
  '/%D8%A8%D8%B1%D9%86%D8%AF/',
] as string[];
const protectedRoute = ['/checkout', '/address', '/admin', '/profile'];

export async function middleware(request: NextRequest) {
  const cookies = request.cookies as {
    get: (name: string) => { value: string } | undefined;
  };
  const rawSession = cookies.get(COOCIES_NAME)?.value;
  const finger = cookies.get('finger')?.value;
  const response = NextResponse.next();
  const url = new URL(request.url);
  const pathname = url.pathname.toString();
  const searchParams = url.searchParams.toString();
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  // اگر فینگرفینگر کوکی موجود نیست، یک توکن جدید بساز
  if (!finger) {
    const generateFinger = generateUniqueToken();
    response.cookies.set({
      name: 'finger',
      value: generateFinger,
      maxAge: 1000 * 24 * 60 * 60,
      expires: 1000 * 24 * 60 * 60,
    });
  }

  response.cookies.set({
    name: 'viewport',
    value: viewport,
    maxAge: 1000 * 24 * 60 * 60,
    expires: 1000 * 24 * 60 * 60,
  });
  // custom file has access
  if (/\.(xml|json|txt|jpg|png|svg|ico)$/i.test(pathname)) {
    return response;
  }

  // // Expired path
  // if (gonePaths.some((excludedPath) => pathname.startsWith(excludedPath))) {
  //   // If path name equal product-tag then check if product tag exist or not
  //   if (pathname.startsWith('/product-tag/')) {
  //     const slug = pathname.split('/')[2];
  //     const result = await fetch(`${BASEURL}/user/product/alltag?productTag=${slug}`, {
  //       headers: headers,
  //     });

  //     if (result) {
  //       const response = await result.json();
  //       const errors = response?.errors;
  //       if (errors && errors.statusCode === 410) {
  //         return new NextResponse('این صفحه توسط شرکت حذف شده است', {
  //           status: 410,
  //           headers: {
  //             'Content-Type': 'text/plain',
  //             'Cache-Control': 'no-store, max-age=0',
  //           },
  //         });
  //       }
  //     }
  //   } else if (pathname === '/brands/') {
  //     return response;
  //   } else {
  //     const title = 'این صفحه توسط شرکت حذف شده است';
  //     return new NextResponse(title, { status: 410 });
  //     // redirect
  //     // const url = new URL("/", request.url);
  //     // url.searchParams.set("from", pathname);
  //     // const response = NextResponse.redirect(url, { status: 410 });
  //     // response.headers.set(
  //     //   "Link",
  //     //   `<${request.url}>; rel="gone"; status="410"`
  //     // );
  //     // return response;
  //   }
  // }

  // noindex special path and all query params
  if (noIndexPaths.some((path) => pathname.startsWith(path)) || searchParams) {
    response.headers.set('x-robots-tag', 'noindex, nofollow');
  }

  // todo: Redirect only clean HTML paths to avoid breaking APIs or static files
  // redirect to end with /
  // if (!pathname.endsWith("/")) {
  //   return NextResponse.redirect(new URL(`${pathname}/`, request.url), 301); //308
  // }

  // stage need token
  if (process.env.APP_ENV === 'stage' && !rawSession) return redirectToSignIn(request);

  const isProtectedRoute = protectedRoute.find((page) => pathname.startsWith(page));

  // اگر روت محافظت شده هست و سشن موجود نیست، ریدایرکت به صفحه ورود
  if (!rawSession && isProtectedRoute) {
    return redirectToSignIn(request);
  }

  // const isAllowedPage = pages.some((page) => pathname === page || pathname.startsWith(page + '/'));

  // if (!isAllowedPage) {
  //   // چک می‌کنیم که آیا مسیر فعلی از نوع /mag/{id} هست یا نه تا از ایجاد لوپ جلوگیری کنیم
  //   if (!pathname.startsWith('/mag/')) {
  //     const pathParts = pathname.split('/').filter(Boolean);
  //     const newUrl = new URL(request.url);
  //     const result = await fetch(`${BASEURL}/user/mag/${pathParts[0]}`, {
  //       headers: headers,
  //     });
  //     if (result.status !== 404) {
  //       newUrl.pathname = `/mag/${pathParts[0]}`; // ریدایرکت به /mag/{id}
  //       return NextResponse.redirect(newUrl);
  //     }
  //   }
  // }

  return response;
}

function redirectToSignIn(request: NextRequest) {
  const url = new URL(request.url);
  url.pathname = '/auth';

  const response = NextResponse.redirect(url.toString());
  response.cookies.delete(COOCIES_NAME);

  return response;
}
