/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        dirs: ['app', 'components', 'styles', 'utils', 'core', 'modules', 'prisma', 'lib', 'services'],
    },
};

export default withNextIntl(nextConfig);
