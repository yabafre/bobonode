import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'pl'],

    // Used when no locale matches
    defaultLocale: 'fr',
    localePrefix: 'always',
    // The directory where the translations are stored
    translationsDirectory: 'lang',
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/:locale([a-z]{2})', '/:locale([a-z]{2})/:path*'],
};