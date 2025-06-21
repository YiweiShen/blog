import { getPosts } from '../lib/posts';
import Link from 'next/link';

export const metadata = {
  title: 'Home Page with Post List',
  description: 'Welcome to the blog home page with a list of posts',
};

export default function Home() {
  const posts = getPosts();
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Home Page</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <h2 className="text-2xl font-semibold">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
