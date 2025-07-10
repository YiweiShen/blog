import type { NextConfig } from 'next'
import { version } from './package.json'

/**
 * Indicates whether the app is running in a production environment.
 */
const isProduction = process.env.NODE_ENV === 'production'
/**
 * Next.js configuration object.
 *
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig: NextConfig = {
  // Export static HTML in production builds
  ...(isProduction && { output: 'export' }),

  // Ensure correct base path and asset prefix for GitHub Pages or similar hosting
  basePath: isProduction ? '/blog' : '',
  assetPrefix: isProduction ? '/blog/' : '',
  // Disable built-in Image Optimization for static export
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? '/blog' : '',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_VERSION: version,
  },
}

export default nextConfig
