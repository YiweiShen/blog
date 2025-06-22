import Link from 'next/link';
import { getAllPosts, PostMeta } from '../lib/posts';

export const metadata = {
  title: 'Home Page with Post List',
  description: 'Welcome to the blog home page with a list of posts',
};

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6">Home Page</h2>
      <div className="mb-6">
        <Link href="/rss.xml" className="text-blue-600 hover:underline">
          Subscribe via RSS
        </Link>
      </div>
      <ul className="space-y-4">
        {posts.map((post: PostMeta) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
