import { getAllPosts } from '../../lib/posts'

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

export async function GET(request: Request) {
  const posts = getAllPosts()
  const origin = new URL(request.url).origin
  const itemsXml = posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${origin}/posts/${post.slug}</link>
      <guid>${origin}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.summary ? `<description><![CDATA[${post.summary}]]></description>` : ''}
    </item>
  `).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
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