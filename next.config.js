/** @type {import('next').NextConfig} */

// For GitHub Pages: set basePath to your repo name when deploying
const basePath = process.env.NODE_ENV === 'production' ? '/Gia-Luat-portfolio' : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  }
};

module.exports = nextConfig;
