import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/blog' : '',
  assetPrefix: isProd ? '/blog/' : '',
  // Disable built-in Image Optimization for static export
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/blog' : '',
  },
}

export default nextConfig
