export { middleware } from '@/lib/auth/middleware';
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - /auth (authentication routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)',
  ],
};
