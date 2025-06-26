import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  summary?: string
  content?: string
}

export interface Post extends PostMeta {
  content: string
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const fullPath = fs.existsSync(mdPath) ? mdPath : mdxPath
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      ...(data as PostMeta),
      slug
    }
  })
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const mdPath = path.join(postsDirectory, `${realSlug}.md`)
  const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`)
  let fullPath = ''
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else {
    throw new Error(`Post file for slug "${slug}" not found.`)
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processed = remark().use(html).processSync(content)
  const contentHtml = processed.toString()
  return {
    content: contentHtml,
    ...(data as PostMeta),
    slug: realSlug
  }
}
