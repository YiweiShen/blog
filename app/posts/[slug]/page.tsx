import { getPostBySlug, getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default function PostPage({ params: { slug } }) {
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }
  const { title, date, summary, content } = post
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
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
  )
}