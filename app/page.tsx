import Link from 'next/link'
import { getAllPosts, PostMeta } from '../lib/posts'

export const metadata = {
  title: 'blog',
  description: 'Insights and tutorials on web development and coding.',
}

export default function Home() {
  const posts = getAllPosts()
  return (
    <>
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold">Welcome to the blog</h1>
        <p className="mt-4 text-lg text-text-secondary">
          Insights and tutorials on web development and coding.
        </p>
      </section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Latest Articles
        </h2>
        <div className="flex items-center space-x-6">
          <Link href="/rss.xml" className="text-accent hover:text-accent-hover">
            Subscribe via RSS
          </Link>
          <a
            href="https://github.com/YiweiShen/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent"
          >
            View Source on GitHub
          </a>
        </div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: PostMeta) => (
          <div key={post.slug} className="card">
            <Link
              href={`/posts/${post.slug}`}
              className="text-2xl font-semibold text-accent hover:text-accent-hover"
            >
              {post.title}
            </Link>
            <p className="mt-2 text-text-secondary">{post.date}</p>
          </div>
        ))}
      </section>
    </>
  )
}
