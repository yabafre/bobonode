import createNextIntlPlugin from 'next-intl/plugin';
import { withStoreConfig } from "./store.config.js";


const withNextIntl = createNextIntlPlugin('./i18n.js');


const nextConfig = withStoreConfig({
    reactStrictMode: true,
    eslint: {
        dirs: ['app', 'components', 'utils', 'core', 'modules', 'prisma', 'lib', 'services'],
    }
});

export default withNextIntl(nextConfig);
