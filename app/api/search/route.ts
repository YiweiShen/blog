import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Fuse from 'fuse.js'
import type { PostMeta } from '../../../lib/posts'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const q = query.trim().toLowerCase()
  const terms = q.split(/\s+/).filter(Boolean)

  const postFiles = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
  const posts: PostMeta[] = postFiles.map((file) => {
    const slug = file.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data: frontMatter, content } = matter(fileContents)
    return {
      slug,
      title: frontMatter.title as string,
      date: frontMatter.date as string,
      summary: frontMatter.summary as string | undefined,
      content,
    }
  })

  const fuse = new Fuse(posts, {
    keys: ['title', 'summary', 'content'],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    findAllMatches: true,
  })

  let results: PostMeta[] = []
  if (q) {
    const fuseResults = fuse.search(q, { limit: 5 })
    if (fuseResults.length > 0) {
      results = fuseResults.map((r) => r.item)
    } else {
      results = posts
        .filter((post) =>
          terms.every((t) =>
            (post.title && post.title.toLowerCase().includes(t)) ||
            (post.summary && post.summary.toLowerCase().includes(t)) ||
            (post.content && post.content.toLowerCase().includes(t))
          )
        )
        .slice(0, 5)
    }
  }

  return NextResponse.json(results)
}