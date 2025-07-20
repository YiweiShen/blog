import escapeHtml from 'escape-html'
import { getPostBySlug, getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CodeBlock from '../../components/CodeBlock'

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
  const params = await props.params
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }
  const { slug, title, date, summary, content } = post
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const older =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const newer = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <article className='card max-w-screen-lg mx-auto'>
      <nav aria-label='Breadcrumb' className='text-sm mb-4'>
        <ol className='list-none p-0 inline-flex'>
          <li className='inline-flex items-center'>
            <Link href='/' className='text-accent hover:text-accent-hover'>
              Home
            </Link>
            <span className='mx-2 text-text-secondary'>›</span>
          </li>
          <li className='inline-flex items-center'>
            <Link href='/' className='text-accent hover:text-accent-hover'>
              Blog
            </Link>
            <span className='mx-2 text-text-secondary'>›</span>
          </li>
          <li
            className='inline-flex items-center text-text-secondary'
            aria-current='page'
          >
            {title}
          </li>
        </ol>
      </nav>
      <header>
        <h1 className='text-3xl sm:text-4xl font-bold mb-4'>{title}</h1>
        <time dateTime={date} className='text-text-secondary'>
          {formattedDate}
        </time>
        {summary && summary !== title && (
          <p className='mt-4 text-lg text-text-secondary'>{summary}</p>
        )}
      </header>
      <section className='mt-8'>
        <CodeBlock html={content} />
      </section>

      <nav className='mt-8 flex justify-between'>
        {older && (
          <Link
            href={`/posts/${older.slug}`}
            className='text-accent hover:text-accent-hover'
          >
            &larr; {older.title}
          </Link>
        )}
        {newer && (
          <Link
            href={`/posts/${newer.slug}`}
            className='text-accent hover:text-accent-hover'
          >
            {newer.title} &rarr;
          </Link>
        )}
      </nav>

      {relatedPosts.length > 0 && (
        <section className='mt-12'>
          <details className='bg-surface border border-secondary rounded-lg'>
            <summary className='p-4 text-2xl font-semibold cursor-pointer'>
              Related Posts
            </summary>
            <div className='p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${escapeHtml(post.slug)}`}
                  className='flex items-center space-x-4 p-4 border border-secondary rounded-lg hover:shadow-light'
                >
                  <img
                    src={`${basePath}/file.svg`}
                    alt={post.title}
                    className='w-16 h-16 object-cover rounded'
                  />
                  <div>
                    <h3 className='text-lg font-medium text-accent hover:text-accent-hover'>
                      {post.title}
                    </h3>
                    <p className='text-text-secondary'>{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </details>
        </section>
      )}
    </article>
  )
}
