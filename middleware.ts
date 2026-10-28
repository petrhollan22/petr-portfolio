import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isPlannerAuthorized } from "./lib/planner-auth";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.split("/").filter(Boolean).includes("planovac")) {
    const configured =
      process.env.PLANNER_ADMIN_USER &&
      process.env.PLANNER_ADMIN_PASSWORD;

    if (!configured) {
      return new NextResponse("Planner unavailable", {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const authorized = await isPlannerAuthorized(
      request.headers.get("authorization")
    );

    if (!authorized) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Planovac", charset="UTF-8"',
          "Cache-Control": "no-store",
        },
      });
    }
  }

  return intlMiddleware(request);
}


export const config = {
  matcher: ['/', '/planovac/:path*', '/(cs|en)/:path*', '/((?!api|studio|_next|_vercel|.well-known|.*\..*).*)'],
};
