import { NextResponse, type NextRequest } from 'next/server';


import { languages, fallbackLng } from "@/i18n/settings";
import { getLangFromUrl } from "@/lang-utils";

const getDefaultLang = (request: NextRequest) =>
  request.cookies.get('lang')?.value.match((languages ?? []).join('|'))?.[0] ??
  request.headers.get('Accept-Language')?.match((languages ?? []).join('|'))?.[0] ??
  fallbackLng;

const isLegacyRoute = (route: string) => !!route.match(/^\/(trade|studio|auth|$)/)?.[0];

export async function middleware(request: NextRequest) {
  // Redirects all legacy routes and home route to the same localised routes
  // This is here to keep bookmarked urls working and if other applications start sessions with last visited url (such as mobile)
  if (isLegacyRoute(request.nextUrl.pathname)) {
    const lang = getDefaultLang(request);
    // This is an optimisation to avoid two redirects and redirect user directly to the trade page
    const formattedPathname =
      request.nextUrl.pathname === '/'
        ? ('/trade')
        : request.nextUrl.pathname;
    request.nextUrl.pathname = `/${lang}${formattedPathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const lang = getLangFromUrl(request.nextUrl.pathname);
  if (lang) {
    response.cookies.set('lang', lang, {
      maxAge: 60*60*24,
      sameSite: 'strict',
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
