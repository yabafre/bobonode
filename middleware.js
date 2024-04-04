import { NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix} from "@/navigation";

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
    const { pathname } = request.nextUrl;
    // Check si le pathname contient un locale
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    request.locale =  getLocale(request);
    request.cookies.locale = request.locale;

    //Ignoré les paths spéciaux
    if (pathname.startsWith('/admin_5dhb8A1a') || pathname.startsWith('/api')) {
        console.log('special case', pathname)
        return NextResponse.next();
    }

    // Si le pathname ne contient pas de locale, on redirige vers le bon path
    if (!pathnameHasLocale) {
        const locale = getLocale(request);
        const url = `/${locale}${pathname === '/' ? '' : pathname}`;
        console.log('redirecting to', url)
        request.nextUrl.pathname = url;
    }

    console.log('normal case', pathname)

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)",
        '/admin_5dhb8A1a/:path*',
        '/:locale([a-z]{2})',
        '/:locale([a-z]{2})/:path*',
        '/api/:path*',
    ],
}