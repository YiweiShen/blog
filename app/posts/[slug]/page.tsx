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

  return (
    <article className='rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.6)] backdrop-blur sm:p-10'>
      <nav aria-label='Breadcrumb' className='mb-6 text-sm'>
        <ol className='inline-flex list-none items-center gap-2 p-0 text-slate-500'>
          <li className='inline-flex items-center'>
            <Link href='/' className='transition hover:text-slate-900'>
              Home
            </Link>
            <span className='mx-1 text-slate-300'>/</span>
          </li>
          <li className='inline-flex items-center'>
            <Link href='/' className='transition hover:text-slate-900'>
              Blog
            </Link>
            <span className='mx-1 text-slate-300'>/</span>
          </li>
          <li className='inline-flex items-center truncate text-slate-700'>
            {title}
          </li>
        </ol>
      </nav>
      <header>
        <h1 className='font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl'>
          {title}
        </h1>
        <time dateTime={date} className='mt-4 block text-sm text-slate-500'>
          {formattedDate}
        </time>
        {summary && summary !== title && (
          <p className='mt-5 max-w-3xl text-lg text-slate-600'>{summary}</p>
        )}
      </header>
      <section className='mt-10 border-t border-slate-200 pt-8'>
        <CodeBlock html={content} />
      </section>

      <nav className='mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2'>
        {older && (
          <Link
            href={`/posts/${older.slug}`}
            className='rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
          >
            <span className='mb-1 block text-xs uppercase tracking-wide text-slate-400'>
              Older
            </span>
            <span className='font-medium'>{older.title}</span>
          </Link>
        )}
        {newer && (
          <Link
            href={`/posts/${newer.slug}`}
            className={`rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 ${
              older ? 'sm:text-right' : ''
            }`}
          >
            <span className='mb-1 block text-xs uppercase tracking-wide text-slate-400'>
              Newer
            </span>
            <span className='font-medium'>{newer.title}</span>
          </Link>
        )}
      </nav>

      {relatedPosts.length > 0 && (
        <section className='mt-12'>
          <details className='rounded-2xl border border-slate-200 bg-white'>
            <summary className='cursor-pointer p-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-slate-900'>
              Related Posts
            </summary>
            <div className='grid grid-cols-1 gap-3 p-5 pt-1 sm:grid-cols-2'>
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className='rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50'
                >
                  <div className='space-y-1'>
                    <h3 className='font-medium text-slate-900'>{post.title}</h3>
                    <p className='text-xs text-slate-500'>{post.date}</p>
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
