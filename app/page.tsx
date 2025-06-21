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
            <Link href="/blog/education">Education</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-4">Life Insurance Basics</h1>
          <p className="text-xl font-semibold mb-4">
            Life insurance is one of the most important financial purchases an individual can make.
          </p>
          <p className="text-base text-gray-700">
            In the event of a tragedy, life insurance proceeds can help pay bills, continue a family business,
            finance a child's education, protect a spouse's retirement plans, and much more.
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
        <p className="text-xs text-gray-500">November 2018</p>
      </section>
      {/* Main article content with related stories */}
      <section className="flex flex-col lg:flex-row gap-8 py-8">
        <aside className="w-full lg:w-1/4">
          <div className="border p-4 rounded">
            <h2 className="text-sm font-bold mb-2">Related Stories</h2>
            <a href="#" className="block text-base text-green-600 hover:underline mb-1">
              Tax reform presents new opportunities for tax professionals
            </a>
            <p className="text-xs text-gray-500">July 2016</p>
          </div>
        </aside>
        <article className="flex-1 space-y-6 text-gray-800">
          <p>
            With the ever-changing landscape of taxes, it is growing increasingly difficult to understand how
            legislation affects clients and could possibly impact their financial future. As a leader in the
            financial services industry for the past 30 years, we get it. That’s why HD Vest Financial Services®
            is constantly seeking ways to share the latest knowledge we acquire with you. We’ve created the{' '}
            <a href="#" className="text-green-600 hover:underline">
              Taxes &amp; Investments: Timely and Timeless Strategies Series
            </a>{' '}
            to share timely information and provide our Advisors and their clients with practical information and
            ideas they can build on.
          </p>
          <p>
            Life insurance is one of the most important financial purchases an individual can make. In the event of
            a tragedy, life insurance proceeds can help pay bills, continue a family business, finance a child's
            education, protect a spouse's retirement plans, and much more. If a wage earner passes away, a family
            could be devastated financially without life insurance.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">What is life insurance?</h2>
          <p>
            A life insurance policy is a contract with an insurance company. In exchange for premiums (payments),
            the insurance company provides a lump-sum payment, known as a death benefit, to beneficiaries in the
            event of the insured’s death. This benefit is typically tax free to the beneficiaries and bypasses
            probate.
          </p>
        </article>
      </section>
    </div>
  );
}
