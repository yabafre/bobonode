import { NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix} from "@/navigation";
import { auth } from "@/lib/auth";


const intlMiddleware = createMiddleware({
    locales,
    localePrefix,
    defaultLocale: 'fr',
    translationsDirectory: 'lang',
});
function getLocale(request) {
    const { locale } = request.cookies
    return locales.includes(locale) ? locale : 'fr'
}


export function middleware(request) {
    let { pathname } = request.nextUrl;
    // Check si le pathname contient un locale
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    request.locale =  getLocale(request);
    request.cookies.locale = request.locale;

    // Ignore the locale prefix for the admin
    if (pathname.startsWith('/admin_5dhb8A1a')) {
        console.log('Admin case', pathname)
        return auth(request);
    }

    // Ignore the locale prefix for the api
    if (pathname.startsWith('/api')) {
        console.log('special case', pathname)
        return NextResponse.next();
    }


    console.log('normal case', pathname)

    return intlMiddleware(request);
}


export const config = {
    matcher: [
        '/',
        '/((?!api|admin_5dhb8A1a|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
        "/((?!.+\\.[\\w]+$|_next).*)",
        '/admin_5dhb8A1a/:path*',
        '/(fr|en|pl)/:path*', // for static pages
        '/:locale([a-z]{2})',
        '/:locale([a-z]{2})/:path*',
        '/api/:path*',
        '/auth/:path*', // for auth
    ],
}