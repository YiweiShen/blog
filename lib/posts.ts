import escapeHtml from 'escape-html'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

/**
 * Absolute path to the directory containing markdown posts.
 */
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

/**
 * Returns all post slugs (filenames without .md or .mdx extension).
 */
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => escapeHtml(file.replace(/\.mdx?$/, '')))
}

/**
 * Reads metadata for all posts and returns a sorted array by date (newest first).
 */
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const fullPath = fs.existsSync(mdPath) ? mdPath : mdxPath
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data: frontMatter } = matter(fileContents)
    return {
      ...(frontMatter as PostMeta),
      slug,
    }
  })
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Loads a single post by slug, converting its markdown to HTML and returning its metadata.
 * @param slug Post slug (filename without extension)
 * @throws Error if the post file does not exist
 */
export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const mdPath = path.join(postsDirectory, `${realSlug}.md`)
  const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`)
  let fullPath: string
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else {
    throw new Error(`Post file for slug "${slug}" not found.`)
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: frontMatter, content } = matter(fileContents)
  const processed = remark().use(html).processSync(content)
  const contentHtml = processed.toString()
  return {
    content: contentHtml,
    ...(frontMatter as PostMeta),
    slug: realSlug,
  }
}
