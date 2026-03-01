import Link from 'next/link';
import { getAllPosts, PostMeta } from '../lib/posts';

export const metadata = {
  title: 'Article List',
  description: 'Welcome to the blog article list page',
};

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const remaining = posts.slice(1);
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10">
        <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700">
          PRODUCT ENGINEERING JOURNAL
        </p>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Design, code, and systems thinking for modern builders.
            </h2>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              Essays, field notes, and practical playbooks on developer workflows, AI collaboration, and shipping better products.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/rss.xml" className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
              Subscribe RSS
            </Link>
            <a
              href="https://github.com/YiweiShen/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
            >
              View Source
            </a>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_30px_90px_-60px_rgba(8,47,73,0.55)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Latest</p>
          <Link href={`/posts/${featured.slug}`} className="group mt-3 block">
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-950 transition group-hover:text-sky-700 sm:text-4xl">
              {featured.title}
            </h3>
          </Link>
          {featured.summary ? (
            <p className="mt-4 max-w-3xl text-slate-600">{featured.summary}</p>
          ) : null}
          <time className="mt-6 block text-sm text-slate-500">
            {new Date(featured.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-slate-900">
            All Articles
          </h3>
          <p className="text-sm text-slate-500">{posts.length} posts</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {remaining.map((post: PostMeta) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-slate-900 transition group-hover:text-sky-700"
                  >
                    {post.title}
                  </Link>
                  {post.summary ? (
                    <p className="line-clamp-2 text-sm text-slate-600">{post.summary}</p>
                  ) : null}
                </div>
                <time className="shrink-0 text-sm text-slate-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </article>
          ))}
          {posts.length <= 1 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
              More posts coming soon.
            </p>
          ) : null}
        </div>
      </section>
      <div className="h-4" />
    </div>
  );
}
