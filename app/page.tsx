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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold">Article List</h2>
        <div className="flex items-center space-x-6">
          <Link href="/rss.xml" className="text-blue-600 hover:underline">
            Subscribe via RSS
          </Link>
          <a
            href="https://github.com/YiweiShen/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-blue-600"
          >
            View Source on GitHub
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post: PostMeta) => (
          <div
            key={post.slug}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="text-2xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-2 text-gray-500">{post.date}</p>
          </div>
        ))}
      </div>
    </>
  );
}
