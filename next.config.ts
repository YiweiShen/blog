import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Disable Next.js image optimization for static export; serve images directly from public/
  images: {
    unoptimized: true,
  },
}

export default nextConfig
