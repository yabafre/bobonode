import createNextIntlPlugin from 'next-intl/plugin';
import { withStoreConfig } from "./store.config.js";
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const withNextIntl = createNextIntlPlugin('./i18n.js');

// Créer un équivalent de __dirname en modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = withStoreConfig({
    reactStrictMode: true,
    eslint: {
        dirs: ['app', 'components', 'utils', 'core', 'modules', 'prisma', 'lib', 'services'],
    }
});

export default withNextIntl(nextConfig);
