import { getPostBySlug, getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage(props: PageProps) {
  const params = await props.params;
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }
  const { title, date, summary, content } = post
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      <article className="max-w-3xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <time dateTime={date} className="text-gray-500">
          {formattedDate}
        </time>
        {summary && <p className="mt-4 text-lg text-gray-700">{summary}</p>}
      </header>
      <section className="mt-8" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <nav className="max-w-3xl mx-auto px-4 py-4 flex justify-between">
        {prevPost && (
          <Link href={`/posts/${prevPost.slug}`} className="text-blue-600 hover:underline">
            ← {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link href={`/posts/${nextPost.slug}`} className="text-blue-600 hover:underline ml-auto">
            {nextPost.title} →
          </Link>
        )}
      </nav>
    </>
  )
}
