import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Disable built-in Image Optimization for static export
  images: {
    unoptimized: true,
  },
}

export default nextConfig
