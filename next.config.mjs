import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    scrollRestoration: false,
  },
  async redirects() {
    return [
      { source: '/estimer-mon-projet', destination: '/devis', permanent: true },
      { source: '/agence-web-tel-aviv', destination: '/', permanent: true },
      { source: '/solutions', destination: '/', permanent: true },
      { source: '/lagence', destination: '/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
