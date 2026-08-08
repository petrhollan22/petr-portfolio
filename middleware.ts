import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(cs|en)/:path*', '/((?!api|studio|_next|_vercel|.well-known|.*\..*).*)'],
};
