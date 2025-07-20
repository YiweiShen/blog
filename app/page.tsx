import Link from 'next/link';
import { getAllPosts, PostMeta } from '../lib/posts';

export const metadata = {
  title: 'Article List',
  description: 'Welcome to the blog article list page',
};

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <nav className="mb-6">
        <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
          <li>
            <Link href="/" className="text-text-primary hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-text-primary hover:text-accent">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-text-primary hover:text-accent">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/slidev" className="text-text-primary hover:text-accent">
              Slides
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Article List</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: PostMeta) => (
          <div
            key={post.slug}
            className="bg-surface p-6 rounded-lg shadow-light hover:shadow-md transition-shadow duration-200"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="text-2xl font-semibold text-accent hover:text-accent-hover"
            >
              {post.title}
            </Link>
            <p className="mt-2 text-text-secondary">{post.date}</p>
          </div>
        ))}
      </div>
    </>
  );
}
