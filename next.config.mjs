import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(/* optional config file path */);

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: ['cdn.dummyjson.com'],
  },
};

export default withNextIntl(nextConfig);
