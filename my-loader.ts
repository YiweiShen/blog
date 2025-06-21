/**
 * A custom image loader for Next.js that uses Cloudinary to optimize images.
 * Constructs the URL for a given image source, width, and quality.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  const params = [
    'f_auto',
    'c_limit',
    `w_${width}`,
    `q_${quality || 'auto'}`,
  ]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(
    ','
  )}${src}`
}