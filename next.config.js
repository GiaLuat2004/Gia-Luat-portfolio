/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages: set basePath to your repo name
  // basePath: '/Gia-Luat-portfolio',
  // assetPrefix: '/Gia-Luat-portfolio/',
}

module.exports = nextConfig
