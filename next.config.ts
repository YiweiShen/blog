import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/blog',
  assetPrefix: '/blog/',
  // Disable built-in Image Optimization for static export
  images: {
    unoptimized: true,
  },
}

export default nextConfig
