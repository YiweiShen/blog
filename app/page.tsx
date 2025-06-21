import { posts } from '../lib/posts';

export const metadata = {
  title: 'Home Page with Post List',
  description: 'Welcome to the blog home page with a list of posts',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-xl font-bold">MySite</h1>
          <nav className="mt-2 sm:mt-0">
            <ul className="flex flex-col sm:flex-row sm:space-x-4">
              <li className="mb-2 sm:mb-0">
                <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
              </li>
              <li className="mb-2 sm:mb-0">
                <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-6">Home Page</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} MySite. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
