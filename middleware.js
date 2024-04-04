import { NextResponse } from "next/server";
import {withAuth} from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'fr', 'pl'];
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: 'fr',
    localePrefix: 'always',
    translationsDirectory: 'lang',
});
function getLocale(request) {
    const { locale } = request.cookies
    return locales.includes(locale) ? locale : 'fr'
}

const authMiddleware = withAuth({});

// if route (/:path*) set prefix locale to always, and if route (/admin_5dhb8A1a/:path*) or (/api/:path*) don't set prefix locale
export function middleware(req, res, next) {
    const { pathname } = req.nextUrl;
    const locale = getLocale(req);
    //if route (/admin_5dhb8A1a/:path*) or (/api/:path*) don't set prefix locale
    if (pathname.startsWith('/admin_5dhb8A1a/') || pathname.startsWith('/api')) {
        console.log('admin or api route')
        return next;
    }
    req.locale = locale;
    req.cookies.locale = locale;
    req.nextUrl.pathname = `/${locale}${pathname}`;

    return next;
}

export function notFoundHandler(req, res, next) {
    const { pathname } = req.nextUrl;

    // Si aucune route n'a été trouvée pour cette requête, renvoyer une réponse "Not Found"
    if (!pathname.startsWith('/admin_5dhb8A1a/') && !pathname.startsWith('/api') && !new RegExp(`^/(${locales.join('|')})`).test(pathname)) {
        return new NextResponse().status(404).text('Not Found');
    }

    return next;
}

export const config = {
    matcher: [
        '/',
        '/admin_5dhb8A1a/:path*', // Admin avec dynamique sous-routes
        '/:locale([a-z]{2})', // Locales
        '/:locale([a-z]{2})/:path*', // Chemins sous locales
        '/api/:path*', // API routes
    ],
};