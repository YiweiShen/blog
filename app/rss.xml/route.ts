import { getAllPosts, getPostBySlug } from '../../lib/posts'

function escapeXml(str: string): string {
  return str.replace(/[<>&'"']/g, (char) => {
    switch (char) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '"': return '&quot;'
      case "'": return '&apos;'
      default: return char
    }
  })
}
export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const postsMeta = getAllPosts()
  const posts = postsMeta.map(meta => getPostBySlug(meta.slug))
  const siteUrl = process.env.SITE_URL || 'https://yiweishen.github.io'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const origin = `${siteUrl}${basePath}`
  const itemsXml = posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${origin}/posts/${post.slug}</link>
      <guid>${origin}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.summary ? `<description><![CDATA[${post.summary}]]></description>` : ''}
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>
  `).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>blog</title>
  <link>${origin}</link>
  <description>RSS feed for blog posts</description>
  <language>en-us</language>
  ${itemsXml}
</channel>
</rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml' }
  })
}