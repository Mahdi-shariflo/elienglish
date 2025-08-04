import { NextRequest, NextResponse } from 'next/server';
import { handleAuthProtection } from './middleware.auth';
import { handleGonePaths } from './middleware.gone';
import { handleMagRedirect } from './middleware.mag-redirect';
import { handleNoIndex } from './middleware.noindex';
import { EXCLUDED_PATHS } from './middleware.constants';

export async function middleware(request: NextRequest) {
  // set log in middleware
  const response = NextResponse.next();
  const url = new URL(request.url);
  const pathname = url.pathname.toString();

  // Set cookies for fingerprint and viewport
  // handleFingerprint(request, response);

  // Allow static file extensions
  if (
    EXCLUDED_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(xml|json|txt|jpg|jpeg|png|svg|ico|webp)$/i.test(pathname)
  ) {
    return response;
  }

  // Add x-robots-tag for noindex rules
  handleNoIndex(request, response);

  // Handle 410 Gone paths
  const goneRes = await handleGonePaths(request);
  if (goneRes) return goneRes;

  // Redirect unauthorized users from protected routes
  const authRes = await handleAuthProtection(request);
  if (authRes) return authRes;

  return response;
}
