import type { NextConfig } from 'next'
import { version } from './package.json'

const isProd = process.env.NODE_ENV === 'production'
const nextConfig: NextConfig = {
  basePath: isProd ? '/blog' : '',
  assetPrefix: isProd ? '/blog/' : '',
  // Disable built-in Image Optimization for static export
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/blog' : '',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_VERSION: version,
  },
}

export default nextConfig
