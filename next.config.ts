import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Use a custom image loader (e.g., Cloudinary) for optimizing images in a static export
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
  },
}

export default nextConfig
