import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header section with breadcrumb, title, summary, and sidebar */}
      <section className="flex flex-col lg:flex-row justify-between items-start py-8">
        <div className="flex-1 lg:pr-8">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog">Blog</Link>
            <span className="mx-2">/</span>
            <Link href="/blog/jokes">Developer Jokes</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-4">Top Developer Jokes</h1>
          <p className="text-xl font-semibold mb-4">
            A curated list of developer jokes to brighten your coding day.
          </p>
          <p className="text-base text-gray-700">
            Whether you're debugging a tricky issue or waiting for a build to finish, these jokes are sure to bring a smile.
          </p>
        </div>
        <aside className="mt-8 lg:mt-0 w-full lg:w-64">
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center justify-between text-sm text-green-600 hover:underline">
                Become an Advisor <span>&rarr;</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between text-sm text-gray-700 hover:underline">
                Find an Advisor <span>&rarr;</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between text-sm text-gray-700 hover:underline">
                Share <span>&rarr;</span>
              </a>
            </li>
          </ul>
        </aside>
      </section>
      <hr className="border-gray-200" />
      {/* Post meta date */}
      <section className="py-4">
        <p className="text-xs text-gray-500">June 2025</p>
      </section>
      {/* Main article content with related stories */}
      <section className="flex flex-col lg:flex-row gap-8 py-8">
        <aside className="w-full lg:w-1/4">
          <div className="border p-4 rounded">
            <h2 className="text-sm font-bold mb-2">Related Stories</h2>
            <a href="#" className="block text-base text-green-600 hover:underline mb-1">
              Why do programmers prefer dark mode?
            </a>
            <p className="text-xs text-gray-500">August 2023</p>
          </div>
        </aside>
        <article className="flex-1 space-y-6 text-gray-800">
          <p>Why do programmers prefer dark mode? Because light attracts bugs.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">What did the Java code say to the C code?</h2>
          <p>You’ve got no class.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">How many programmers does it take to change a light bulb?</h2>
          <p>None. It's a hardware problem.</p>
          <p>Remember: In code we trust, but braces we must.</p>
        </article>
      </section>
    </div>
  );
}
