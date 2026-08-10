import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/planovac')) {
    const auth = req.headers.get('authorization');
    const expected =
      'Basic ' + Buffer.from('petr:' + process.env.ADMIN_PASSWORD).toString('base64');

    if (auth !== expected) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Planovac"' },
      });
    }
    return NextResponse.next();
  }
  return intl(req);
}

export const config = {
  matcher: [
    '/',
    '/(cs|en)/:path*',
    '/planovac/:path*',
    '/((?!api|studio|planovac|rsvp|unsubscribe|_next|_vercel|.well-known|.*\\..*).*)',
  ],
};
